import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";
import { rateLimit } from "@/lib/rate-limit";
import { requirePermission } from "@/lib/api-helpers";

export async function POST(request: NextRequest) {
  const limit = rateLimit(`register:${request.ip}`, config.rateLimitMax, config.rateLimitWindowMs);
  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (!config.allowAdminRegistration) {
    const guard = await requirePermission(request, "users.write");
    if (guard.response) {
      return guard.response;
    }
  }

  const body = await request.json();
  const { name, email, password } = body as { name: string; email: string; password: string };

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already used" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash }
  });

  return NextResponse.json({ id: user.id });
}
