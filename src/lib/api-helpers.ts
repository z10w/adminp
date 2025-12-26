import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserPermissions } from "@/lib/permissions";
import { validateSession } from "@/lib/session";

export async function requireSession(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { session: null, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;
  const valid = await validateSession(sessionToken);
  if (!valid) {
    return { session: null, response: NextResponse.json({ error: "Session expired" }, { status: 401 }) };
  }
  return { session, response: null };
}

export async function requirePermission(request: NextRequest, permission: string) {
  const { session, response } = await requireSession(request);
  if (!session) {
    return { session: null, response };
  }
  const organizationId = session.user.organizationId;
  if (!organizationId) {
    return { session: null, response: NextResponse.json({ error: "No organization" }, { status: 400 }) };
  }
  const permissions = await getUserPermissions(session.user.id, organizationId);
  if (!permissions.includes(permission)) {
    return { session: null, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { session, response: null };
}
