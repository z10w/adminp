import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/api-helpers";

export async function POST(request: NextRequest, context: { params: { id: string } }) {
  const guard = await requirePermission(request, "users.write");
  if (guard.response) return guard.response;

  await prisma.session.deleteMany({ where: { userId: context.params.id } });
  return NextResponse.json({ ok: true });
}
