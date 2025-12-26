export const config = {
  appName: process.env.APP_NAME ?? "AdminP",
  allowAdminRegistration: process.env.ADMIN_REGISTRATION_ENABLED === "true",
  sessionTtlDays: Number(process.env.SESSION_TTL_DAYS ?? 7),
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX ?? 10),
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60000)
};
