import { NextResponse } from "next/server";

import { clearAdminAccessToken } from "@/lib/admin-session";

export async function POST() {
  await clearAdminAccessToken();
  return NextResponse.json({ ok: true });
}
