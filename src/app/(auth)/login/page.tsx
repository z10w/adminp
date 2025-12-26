import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">Access your admin workspace.</p>
      </div>
      <form className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input type="email" placeholder="admin@example.com" />
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <Input type="password" placeholder="••••••••" />
        </div>
        <Button className="w-full" type="submit">
          Sign in
        </Button>
      </form>
      <div className="text-sm text-muted-foreground">
        <Link href="/forgot-password" className="text-primary hover:underline">
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
