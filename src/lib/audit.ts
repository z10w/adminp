import { prisma } from "@/lib/prisma";

type AuditPayload = {
  action: string;
  entity: string;
  entityId: string;
  actorId?: string;
  organizationId?: string;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
  ipAddress?: string;
  userAgent?: string;
};

export async function writeAuditLog(payload: AuditPayload) {
  await prisma.auditLog.create({
    data: {
      action: payload.action,
      entity: payload.entity,
      entityId: payload.entityId,
      actorId: payload.actorId,
      organizationId: payload.organizationId,
      before: payload.before,
      after: payload.after,
      ipAddress: payload.ipAddress,
      userAgent: payload.userAgent
    }
  });
}
