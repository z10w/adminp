import { DataTable } from "@/components/data-table";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

const logs = [
  { id: "log_1", action: "USER_UPDATED", actor: "Alicia", time: "2024-02-10", ip: "10.1.2.3" },
  { id: "log_2", action: "ORG_CREATED", actor: "Devon", time: "2024-02-09", ip: "10.1.5.9" }
];

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Audit Logs" }]} />
      <DataTable
        title="Audit Logs"
        data={logs}
        total={212}
        page={1}
        pageSize={10}
        rowId={(row) => row.id}
        onPageChange={() => undefined}
        onSearch={() => undefined}
        onSort={() => undefined}
        columns={[
          { key: "action", header: "Action" },
          { key: "actor", header: "Actor" },
          { key: "time", header: "Timestamp" },
          { key: "ip", header: "IP Address" }
        ]}
      />
    </div>
  );
}
