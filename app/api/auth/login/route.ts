import { NextResponse } from "next/server";

import { getAdminApiBaseUrl } from "@/lib/admin-api";
import { setAdminAccessToken } from "@/lib/admin-session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(`${getAdminApiBaseUrl()}/api/admin/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: body?.email,
        password: body?.password
      })
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.accessToken) {
      return NextResponse.json(
        { error: data?.error || "Invalid admin credentials." },
        { status: response.status || 401 }
      );
    }

    await setAdminAccessToken(data.accessToken, Number(data.expiresIn || 3600));

    return NextResponse.json({
      adminUser: data.adminUser
    });
  } catch {
    return NextResponse.json(
      { error: "Could not sign in. Try again." },
      { status: 500 }
    );
  }
}
