import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

const permissions = [
  "users.read",
  "users.write",
  "settings.manage",
  "logs.read",
  "roles.manage",
  "notifications.send"
];

const roles = [
  { name: "Super Admin", permissions: permissions },
  { name: "Admin", permissions: permissions.slice(0, 4) },
  { name: "Manager", permissions: permissions.slice(0, 3) },
  { name: "Editor", permissions: permissions.slice(0, 2) },
  { name: "Viewer", permissions: permissions.slice(0, 1) }
];

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Roles & Permissions" }]} />
      <Card>
        <CardHeader>
          <div className="text-lg font-semibold">Permission matrix</div>
          <p className="text-sm text-muted-foreground">Manage role mapping with safe deletion checks.</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left">Role</th>
                  {permissions.map((permission) => (
                    <th key={permission} className="px-3 py-2 text-left">
                      {permission}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.name} className="border-b border-border">
                    <td className="px-3 py-2 font-medium">{role.name}</td>
                    {permissions.map((permission) => (
                      <td key={permission} className="px-3 py-2">
                        {role.permissions.includes(permission) ? "✓" : "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
