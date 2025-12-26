import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { config } from "@/lib/config";
import { logger } from "@/lib/logger";
import { enqueueEmail } from "@/lib/email-queue";

export async function POST(request: NextRequest) {
  const limit = rateLimit(`forgot:${request.ip}`, config.rateLimitMax, config.rateLimitWindowMs);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { email } = (await request.json()) as { email: string };
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const token = crypto.randomBytes(32).toString("hex");
  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000)
    }
  });

  await enqueueEmail({
    to: email,
    subject: "Reset your password",
    html: `Reset token: ${token}`
  });

  logger.info("Password reset requested", { email, token });
  return NextResponse.json({ ok: true });
}
