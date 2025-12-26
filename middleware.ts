import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { rateLimit } from "@/lib/rate-limit";
import { config } from "@/lib/config";

const protectedRoutes = [
  "/dashboard",
  "/users",
  "/organizations",
  "/roles",
  "/audit-logs",
  "/notifications",
  "/settings"
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/auth") || pathname.startsWith("/api/admin")) {
    const limit = rateLimit(`api:${pathname}:${request.ip}`, config.rateLimitMax, config.rateLimitWindowMs);
    if (!limit.allowed) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = await getToken({ req: request });
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
