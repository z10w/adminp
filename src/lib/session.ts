import { prisma } from "@/lib/prisma";

export async function validateSession(sessionToken?: string) {
  if (!sessionToken) return false;
  const session = await prisma.session.findUnique({ where: { token: sessionToken } });
  if (!session) return false;
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { token: sessionToken } });
    return false;
  }
  return true;
}
