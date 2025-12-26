import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Reset password</h1>
        <p className="text-sm text-muted-foreground">We'll send a reset link to your email.</p>
      </div>
      <form className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input type="email" placeholder="admin@example.com" />
        </div>
        <Button className="w-full" type="submit">
          Send reset link
        </Button>
      </form>
      <Link href="/login" className="text-sm text-primary hover:underline">
        Back to sign in
      </Link>
    </div>
  );
}
