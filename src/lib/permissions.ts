import { prisma } from "@/lib/prisma";

export async function getUserPermissions(userId: string, organizationId: string) {
  const membership = await prisma.membership.findFirst({
    where: { userId, organizationId },
    include: { role: { include: { permissions: { include: { permission: true } } } } }
  });

  if (!membership) return [];
  return membership.role.permissions.map((rp) => rp.permission.key);
}

export async function requirePermission(
  userId: string,
  organizationId: string,
  permission: string
) {
  const permissions = await getUserPermissions(userId, organizationId);
  return permissions.includes(permission);
}
