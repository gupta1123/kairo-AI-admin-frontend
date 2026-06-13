import "server-only";

import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "kairo_admin_access_token";

const cookieOptions = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production"
};

export async function getAdminAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value || "";
}

export async function setAdminAccessToken(token: string, maxAge: number) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    ...cookieOptions,
    maxAge,
  });
}

export async function clearAdminAccessToken() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, "", {
    ...cookieOptions,
    expires: new Date(0),
    maxAge: 0
  });
}
