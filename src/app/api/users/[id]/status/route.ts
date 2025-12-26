import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/api-helpers";
import { writeAuditLog } from "@/lib/audit";

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  const guard = await requirePermission(request, "users.write");
  if (guard.response) return guard.response;

  const { status } = (await request.json()) as { status: "ACTIVE" | "DISABLED" | "LOCKED" };
  const before = await prisma.user.findUnique({ where: { id: context.params.id } });
  const user = await prisma.user.update({ where: { id: context.params.id }, data: { status } });

  await writeAuditLog({
    action: "USER_STATUS_UPDATED",
    entity: "User",
    entityId: user.id,
    actorId: guard.session?.user.id,
    organizationId: guard.session?.user.organizationId,
    before: before ? { status: before.status } : null,
    after: { status: user.status },
    ipAddress: request.ip ?? undefined,
    userAgent: request.headers.get("user-agent") ?? undefined
  });
  return NextResponse.json({ data: user });
}
