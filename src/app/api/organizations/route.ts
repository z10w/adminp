import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/api-helpers";

export async function GET(request: NextRequest) {
  const guard = await requirePermission(request, "users.read");
  if (guard.response) return guard.response;

  const organizations = await prisma.organization.findMany();
  return NextResponse.json({ data: organizations });
}
