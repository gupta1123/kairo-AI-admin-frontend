import { NextResponse } from "next/server";

import { getAdminApiBaseUrl } from "@/lib/admin-api";
import { clearAdminAccessToken, getAdminAccessToken } from "@/lib/admin-session";

export async function POST() {
  const token = await getAdminAccessToken();

  if (token) {
    await fetch(`${getAdminApiBaseUrl()}/api/admin/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }).catch(() => null);
  }

  await clearAdminAccessToken();
  return NextResponse.json({ ok: true });
}
