import { StatusBadge } from "@/components/common/status-badge";
import type { SubscriptionPlan, SubscriptionStatus } from "@/lib/types";

export function SubscriptionBadge({
  plan,
  status
}: {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
}) {
  if (plan === "pro" && status === "active") {
    return <StatusBadge label="Pro active" tone="pro" />;
  }

  if (status === "expired" || status === "past_due") {
    return <StatusBadge label={status.replace("_", " ")} tone="warning" />;
  }

  return <StatusBadge label={plan} tone="free" />;
}
