import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

const organizations = [
  { id: "org_1", name: "Acme Inc", plan: "Pro", usage: "68%" },
  { id: "org_2", name: "Orbit Labs", plan: "Enterprise", usage: "42%" }
];

export default function OrganizationsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Organizations" }]} />
      <DataTable
        title="Organizations"
        data={organizations}
        total={48}
        page={1}
        pageSize={10}
        rowId={(row) => row.id}
        onPageChange={() => undefined}
        onSearch={() => undefined}
        onSort={() => undefined}
        columns={[
          { key: "name", header: "Organization" },
          { key: "plan", header: "Plan" },
          {
            key: "usage",
            header: "Usage",
            render: (row) => <Badge>{row.usage}</Badge>
          }
        ]}
      />
    </div>
  );
}
