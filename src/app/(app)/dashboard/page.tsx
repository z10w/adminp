import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

const kpis = [
  { label: "Total users", value: "2,493", change: "+12%" },
  { label: "Active users", value: "1,974", change: "+6%" },
  { label: "Organizations", value: "128", change: "+3%" },
  { label: "System health", value: "99.98%", change: "Stable" }
];

const activity = [
  { action: "Admin updated permissions", time: "2 min ago" },
  { action: "New organization created", time: "1 hour ago" },
  { action: "User password reset", time: "Yesterday" }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Dashboard" }]} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader>
              <div className="text-sm text-muted-foreground">{kpi.label}</div>
              <div className="text-2xl font-semibold">{kpi.value}</div>
            </CardHeader>
            <CardContent>
              <Badge>{kpi.change}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="text-sm font-semibold">Usage trends</div>
            <div className="text-xs text-muted-foreground">Line + bar chart placeholders</div>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-center justify-center rounded-md border border-dashed border-border text-muted-foreground">
              Charts go here
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="text-sm font-semibold">Recent activity</div>
          </CardHeader>
          <CardContent className="space-y-3">
            {activity.map((item) => (
              <div key={item.action} className="text-sm">
                <div className="font-medium">{item.action}</div>
                <div className="text-xs text-muted-foreground">{item.time}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="text-sm font-semibold">System alerts</div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="rounded-md border border-border p-3">No critical alerts.</div>
              <div className="rounded-md border border-border p-3">2 maintenance reminders.</div>
            </div>
          </CardContent>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="text-sm font-semibold">Date range filters</div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Badge>Last 7 days</Badge>
              <Badge>Last 30 days</Badge>
              <Badge>Custom</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
