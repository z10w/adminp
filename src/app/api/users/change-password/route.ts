import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/api-helpers";

export async function POST(request: NextRequest) {
  const guard = await requireSession(request);
  if (guard.response) return guard.response;

  const { currentPassword, newPassword } = (await request.json()) as {
    currentPassword: string;
    newPassword: string;
  };

  const user = await prisma.user.findUnique({ where: { id: guard.session!.user.id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  const hash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: hash } });

  return NextResponse.json({ ok: true });
}
