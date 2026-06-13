import { NextResponse } from "next/server";

import { createRedeemCode } from "@/lib/admin-api";

export async function POST() {
  try {
    return NextResponse.json(await createRedeemCode(), { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not create redeem code."
      },
      { status: getStatusCode(error) }
    );
  }
}

function getStatusCode(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof (error as { statusCode?: unknown }).statusCode === "number"
  ) {
    return (error as { statusCode: number }).statusCode;
  }

  return 500;
}
