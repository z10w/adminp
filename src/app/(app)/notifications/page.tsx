import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

const notifications = [
  { title: "Platform update", scope: "All orgs", status: "Scheduled" },
  { title: "Billing downtime", scope: "Orbit Labs", status: "Sent" }
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Notifications" }]} />
      <Card>
        <CardHeader>
          <div className="text-lg font-semibold">Notification center</div>
          <p className="text-sm text-muted-foreground">Broadcast to all admins or target organizations.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((notification) => (
            <div key={notification.title} className="flex items-center justify-between rounded-md border border-border p-3">
              <div>
                <div className="font-medium">{notification.title}</div>
                <div className="text-xs text-muted-foreground">{notification.scope}</div>
              </div>
              <Badge>{notification.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
