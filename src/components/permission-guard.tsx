"use client";

export function PermissionGuard({
  allowed,
  children
}: {
  allowed: boolean;
  children: React.ReactNode;
}) {
  if (!allowed) return null;
  return <>{children}</>;
}
