import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

const users = [
  { id: "u_1", name: "Alicia Stone", email: "alicia@acme.com", role: "Admin", status: "Active" },
  { id: "u_2", name: "Devon Lane", email: "devon@acme.com", role: "Manager", status: "Active" },
  { id: "u_3", name: "Brooklyn Simmons", email: "brooklyn@acme.com", role: "Viewer", status: "Disabled" }
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Users" }]} />
      <DataTable
        title="Users"
        data={users}
        total={120}
        page={1}
        pageSize={10}
        rowId={(row) => row.id}
        onPageChange={() => undefined}
        onSearch={() => undefined}
        onSort={() => undefined}
        onBulkAction={() => undefined}
        columns={[
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "role", header: "Role" },
          {
            key: "status",
            header: "Status",
            render: (row) => <Badge>{row.status}</Badge>
          }
        ]}
      />
    </div>
  );
}
