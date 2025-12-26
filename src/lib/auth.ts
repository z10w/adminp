import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";
import { logger } from "@/lib/logger";

const MAX_ATTEMPTS = 5;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, request) {
        const email = credentials?.email?.toLowerCase();
        const password = credentials?.password ?? "";

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
          include: { memberships: true }
        });

        const ip = request?.headers?.["x-forwarded-for"] ?? "";

        if (!user) {
          await prisma.loginAttempt.create({
            data: { email, success: false, ipAddress: String(ip) }
          });
          return null;
        }

        if (user.status !== "ACTIVE") {
          await prisma.loginAttempt.create({
            data: { email, success: false, ipAddress: String(ip), userId: user.id }
          });
          return null;
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
          const failedAttempts = user.failedAttempts + 1;
          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedAttempts,
              status: failedAttempts >= MAX_ATTEMPTS ? "LOCKED" : user.status
            }
          });
          await prisma.loginAttempt.create({
            data: { email, success: false, ipAddress: String(ip), userId: user.id }
          });
          return null;
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { failedAttempts: 0, lastLoginAt: new Date() }
        });
        await prisma.loginAttempt.create({
          data: { email, success: true, ipAddress: String(ip), userId: user.id }
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: config.sessionTtlDays * 24 * 60 * 60
  },
  jwt: {
    maxAge: config.sessionTtlDays * 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        const membership = await prisma.membership.findFirst({
          where: { userId: user.id },
          include: { organization: true }
        });
        if (membership) {
          token.organizationId = membership.organizationId;
        }
      }
      if (token.userId && !token.sessionToken) {
        const sessionToken = crypto.randomBytes(32).toString("hex");
        token.sessionToken = sessionToken;
        await prisma.session.create({
          data: {
            userId: token.userId as string,
            token: sessionToken,
            expiresAt: new Date(Date.now() + config.sessionTtlDays * 24 * 60 * 60 * 1000)
          }
        });
      }
      return token;
    },
    async session({ session, token }) {
      if (token.userId) {
        session.user.id = token.userId as string;
        session.user.organizationId = token.organizationId as string | undefined;
      }
      return session;
    }
  },
  events: {
    async signOut({ token }) {
      if (!token?.userId || !token.sessionToken) return;
      await prisma.session.deleteMany({ where: { token: token.sessionToken as string } });
      logger.info("User signed out", { userId: token.userId });
    }
  },
  pages: {
    signIn: "/login"
  }
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      organizationId?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    organizationId?: string;
    sessionToken?: string;
  }
}
