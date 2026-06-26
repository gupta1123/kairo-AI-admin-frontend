import { NextResponse } from "next/server";

import { createRedeemCode } from "@/lib/admin-api";
import { redeemCodePlans } from "@/lib/redeem-code-plans";
import type { RedeemCodePlanId } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const planId = normalizePlanId(body?.planId);

    return NextResponse.json(await createRedeemCode({ planId }), { status: 201 });
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

function normalizePlanId(value: unknown): RedeemCodePlanId {
  const planId = String(value || "").trim();
  return Object.prototype.hasOwnProperty.call(redeemCodePlans, planId)
    ? (planId as RedeemCodePlanId)
    : "pro_monthly";
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
