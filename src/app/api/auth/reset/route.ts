import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { token, password } = (await request.json()) as { token: string; password: string };
  if (!token || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const reset = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!reset || reset.expiresAt < new Date() || reset.usedAt) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);
  await prisma.user.update({ where: { id: reset.userId }, data: { passwordHash: hash } });
  await prisma.passwordResetToken.update({
    where: { id: reset.id },
    data: { usedAt: new Date() }
  });

  return NextResponse.json({ ok: true });
}
