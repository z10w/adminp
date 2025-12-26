import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const permissions = [
    { key: "users.read", description: "Read users" },
    { key: "users.write", description: "Manage users" },
    { key: "settings.manage", description: "Manage settings" },
    { key: "logs.read", description: "Read audit logs" },
    { key: "roles.manage", description: "Manage roles" },
    { key: "notifications.send", description: "Send notifications" }
  ];

  const permissionRecords = await Promise.all(
    permissions.map((permission) =>
      prisma.permission.upsert({
        where: { key: permission.key },
        update: permission,
        create: permission
      })
    )
  );

  const roles = [
    { name: "Super Admin", isSystem: true },
    { name: "Admin", isSystem: true },
    { name: "Manager", isSystem: true },
    { name: "Editor", isSystem: true },
    { name: "Viewer", isSystem: true }
  ];

  const roleRecords = await Promise.all(
    roles.map((role) =>
      prisma.role.upsert({
        where: { name: role.name },
        update: role,
        create: role
      })
    )
  );

  const superAdminRole = roleRecords[0];
  await Promise.all(
    permissionRecords.map((permission) =>
      prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: superAdminRole.id, permissionId: permission.id } },
        update: {},
        create: { roleId: superAdminRole.id, permissionId: permission.id }
      })
    )
  );

  const organization = await prisma.organization.upsert({
    where: { name: "Acme Inc" },
    update: {},
    create: { name: "Acme Inc" }
  });

  const passwordHash = await bcrypt.hash("Admin123!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@adminp.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@adminp.com",
      passwordHash
    }
  });

  await prisma.membership.upsert({
    where: {
      userId_organizationId: { userId: admin.id, organizationId: organization.id }
    },
    update: { roleId: superAdminRole.id },
    create: {
      userId: admin.id,
      organizationId: organization.id,
      roleId: superAdminRole.id
    }
  });

  await prisma.setting.upsert({
    where: { organizationId_key: { organizationId: organization.id, key: "branding.name" } },
    update: { value: "AdminP" },
    create: { organizationId: organization.id, key: "branding.name", value: "AdminP" }
  });

  console.log("Seeded admin user: admin@adminp.com / Admin123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
