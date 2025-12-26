"use client";

import { useState } from "react";
import { ChevronDown, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const organizations = [
  { id: "org_1", name: "Acme Inc" },
  { id: "org_2", name: "Orbit Labs" }
];

export function TopNav({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [orgId, setOrgId] = useState(organizations[0].id);

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          ☰
        </Button>
        <div className="hidden text-sm text-muted-foreground md:block">Workspace</div>
        <button
          className="flex items-center gap-2 rounded-md border border-border px-3 py-1 text-sm"
          onClick={() => {
            const next = organizations.find((org) => org.id !== orgId)?.id ?? orgId;
            setOrgId(next);
          }}
        >
          {organizations.find((org) => org.id === orgId)?.name}
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="sm">Admin</Button>
      </div>
    </header>
  );
}
