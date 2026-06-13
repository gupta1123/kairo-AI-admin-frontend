# Kairo Admin Web

Next.js admin console for Kairo users, analytics, and redeem-code operations.

## Environment

Create `.env.local` from `.env.example`.

```bash
cp .env.example .env.local
```

`ADMIN_API_URL` points to the Express API. `ADMIN_API_BEARER_TOKEN` must be a Supabase access token for a user present in `public.app_admins`.

To promote an existing signed-in Supabase user:

```bash
cd ../api-server
npm run admin:bootstrap -- --email user@example.com --role owner
```

To create or reset an admin email/password user through Supabase Auth:

```bash
cd ../api-server
npm run admin:create-user -- --email admin@kairo.com --password 'ChangeMe123!' --role owner
```

This command requires `SUPABASE_SERVICE_ROLE_KEY` in `api-server/.env`.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```
