# AdminP — Premium Full-Stack Admin Panel / SaaS Starter Kit

AdminP is a production-grade, resellable admin panel starter kit built for freelancers, agencies, indie SaaS founders, and internal enterprise tools. It delivers a clean architecture, modern UI, and a security-first backend so you can launch new admin experiences fast.

## Screenshots (placeholders)

- Dashboard overview
- Users management
- Roles & permissions matrix
- Organization switcher

> Replace with your own screenshots before resale.

## Features

### Authentication & Account Management
- Credentials-based login/logout (NextAuth)
- Admin-only registration toggle
- Token-based password reset (email mocked, pluggable)
- Change password & session expiry handling
- Account disable/lock after failed attempts
- Login attempt tracking

### Advanced RBAC
- Roles: Super Admin, Admin, Manager, Editor, Viewer
- Permission strings and DB-backed role → permission mapping
- UI permission matrix
- Server-side permission enforcement
- Client-side guards for action visibility

### Multi-tenancy
- Organizations / workspaces
- Users can belong to multiple organizations
- Role per organization
- Organization switcher in UI
- Tenant isolation via server-side checks

### Admin Dashboard
- KPI cards
- Chart placeholders (line, bar, pie)
- Date range filters
- Recent activity feed
- System alerts widget

### Core Modules
- Users (CRUD, activate/deactivate, reset password, bulk actions)
- Organizations (CRUD, owners, feature flags, plan assignment stub)
- Roles & Permissions (visual matrix, safe deletion checks)
- Audit Logs (actor, entity, IP, before/after)
- Notifications (broadcast + per-org, in-app center, email queue stub)
- Settings (branding, toggles, environment flags, SMTP/API placeholders)

### Developer Experience
- Strong typing with strict TypeScript
- Reusable component system (shadcn-style patterns)
- Centralized error handling & logging
- Prisma ORM with seed data
- Ready for Docker/Vercel/VPS

## Tech Stack

**Frontend**
- Next.js (App Router)
- TypeScript (strict)
- Tailwind CSS
- Radix UI primitives

**Backend**
- Next.js API routes
- Prisma ORM
- PostgreSQL

**Security**
- NextAuth (Credentials provider)
- Password hashing (bcrypt)
- JWT/session hybrid handling
- Rate limiting (in-memory, pluggable)
- CSRF token utility
- Secure HTTP headers via middleware

## Installation

```bash
pnpm install
# or
npm install
```

## Environment Variables

Copy `.env.example` and update values:

```bash
cp .env.example .env
```

Variables:
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `APP_NAME`
- `ADMIN_REGISTRATION_ENABLED`
- `SESSION_TTL_DAYS`
- `RATE_LIMIT_MAX`
- `RATE_LIMIT_WINDOW_MS`

## Database Setup

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

## Seed / Demo Credentials

```
Email: admin@adminp.com
Password: Admin123!
```

## Running the App

```bash
npm run dev
```

## How to Rebrand

- Update `APP_NAME` in `.env`
- Replace the logo in `src/components/layout/sidebar.tsx`
- Update metadata in `src/app/layout.tsx`
- Adjust Tailwind CSS variables in `src/app/globals.css`

## How to Add New Modules

1. Create a new route under `src/app/(app)/<module-name>/page.tsx`.
2. Add navigation entry in `src/components/layout/sidebar.tsx`.
3. Add API routes under `src/app/api/<module-name>`.
4. Define Prisma models and run migrations as needed.

## Deployment Notes

- Works on Vercel or any Node.js VPS.
- Ensure PostgreSQL is reachable in production.
- Set `NEXTAUTH_URL` to your domain.
- Use strong secrets for `NEXTAUTH_SECRET`.

## License Notes

This project is intended for commercial resale. Replace this note with your own license before distribution.
