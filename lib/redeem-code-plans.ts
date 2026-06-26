import type { RedeemCodePlanId } from "@/lib/types";

export const redeemCodePlans: Record<
  RedeemCodePlanId,
  {
    durationDays: number;
    label: string;
    shortLabel: string;
  }
> = {
  pro_monthly: {
    durationDays: 30,
    label: "Pro Monthly",
    shortLabel: "Monthly"
  },
  pro_yearly: {
    durationDays: 365,
    label: "Pro Yearly",
    shortLabel: "Yearly"
  }
};

export function getRedeemCodePlan(planId: RedeemCodePlanId) {
  return redeemCodePlans[planId] || redeemCodePlans.pro_monthly;
}

export function getRedeemCodeGrantLabel({
  durationDays,
  planGrant
}: {
  durationDays: number;
  planGrant: RedeemCodePlanId;
}) {
  const plan = getRedeemCodePlan(planGrant);
  return `${plan.label} - ${durationDays} days`;
}
