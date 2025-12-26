import crypto from "crypto";
import { NextRequest } from "next/server";

export function generateCsrfToken() {
  return crypto.randomBytes(24).toString("hex");
}

export function validateCsrf(request: NextRequest) {
  const cookieToken = request.cookies.get("csrf-token")?.value;
  const headerToken = request.headers.get("x-csrf-token");
  if (!cookieToken || !headerToken) return false;
  return crypto.timingSafeEqual(Buffer.from(cookieToken), Buffer.from(headerToken));
}
