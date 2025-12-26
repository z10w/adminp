import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "users.read");
  if (guard.response) return guard.response;

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, status: true }
  });

  return NextResponse.json({ data: users });
}

export async function POST(request: NextRequest) {
  const guard = await requirePermission(request, "users.write");
  if (guard.response) return guard.response;

  const body = await request.json();
  const { name, email } = body as { name: string; email: string };
  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: "placeholder"
    }
  });

  return NextResponse.json({ data: user }, { status: 201 });
}
