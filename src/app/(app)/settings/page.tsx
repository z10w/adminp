import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Settings" }]} />
      <Card>
        <CardHeader>
          <div className="text-lg font-semibold">Branding</div>
          <p className="text-sm text-muted-foreground">Customize app name, logo, and colors.</p>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">App name</label>
            <Input placeholder="AdminP" />
          </div>
          <div>
            <label className="text-sm font-medium">Logo URL</label>
            <Input placeholder="https://" />
          </div>
          <div>
            <label className="text-sm font-medium">Primary color</label>
            <Input placeholder="#3b82f6" />
          </div>
          <div>
            <label className="text-sm font-medium">SMTP Provider</label>
            <Input placeholder="SendGrid / SES" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="text-lg font-semibold">Feature toggles</div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">Enable SSO</Button>
          <Button variant="outline" size="sm">Enable Audit Exports</Button>
          <Button variant="outline" size="sm">Maintenance Mode</Button>
        </CardContent>
      </Card>
    </div>
  );
}
