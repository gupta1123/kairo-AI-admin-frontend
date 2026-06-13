import {
  KeyRound,
  MessageCircle,
  MousePointerClick,
  TicketCheck,
  UserCheck,
  UsersRound,
  Zap
} from "lucide-react";
import { AnalyticsSummaryGrid } from "@/components/analytics/analytics-summary-grid";
import { UsageTrendChart } from "@/components/analytics/usage-trend-chart";
import { MetricCard } from "@/components/common/metric-card";
import { PageHeader } from "@/components/common/page-header";
import { RedeemCodesTable } from "@/components/redeem-codes/redeem-codes-table";
import { UsersTable } from "@/components/users/users-table";
import { getDashboardData } from "@/lib/admin-api";

const primaryMetricIcons = [
  UsersRound,
  UserCheck,
  MessageCircle,
  MousePointerClick,
  Zap,
  KeyRound,
  TicketCheck
];

export default async function DashboardPage() {
  const { summary, recentCodes, recentUsers } = await getDashboardData();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin dashboard"
        description="Internal command center for user growth, usage, Pro entitlements, and redeem-code operations."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.metricCards.slice(0, 4).map((card, index) => (
          <MetricCard
            key={card.label}
            label={card.label}
            value={card.value}
            deltaLabel={card.deltaLabel}
            href={card.href}
            icon={primaryMetricIcons[index]}
          />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_0.9fr]">
        <UsageTrendChart data={summary.usageSeries} />
        <section className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <h2 className="text-base font-black text-stone-950">Backend status</h2>
          <div className="mt-4 space-y-3 text-sm font-medium leading-6 text-stone-600">
            <p>
              These screens read from `/api/admin/*` endpoints through the configured admin API.
            </p>
            <p>
              Redeem codes grant 30 days of Pro after normal sign-in. The backend owns one-time use, hashing, and subscription grants.
            </p>
          </div>
        </section>
      </div>

      <section className="space-y-3">
        <div>
          <h2 className="text-base font-black text-stone-950">Recent redeem codes</h2>
          <p className="mt-1 text-sm font-medium text-stone-500">
            Latest generated, used, and expired code records.
          </p>
        </div>
        <RedeemCodesTable codes={recentCodes} />
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-base font-black text-stone-950">Recently active users</h2>
          <p className="mt-1 text-sm font-medium text-stone-500">
            Top operational view for support and entitlement checks.
          </p>
        </div>
        <UsersTable users={recentUsers} />
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-base font-black text-stone-950">All admin metrics</h2>
          <p className="mt-1 text-sm font-medium text-stone-500">
            Linkable cards route to the matching future list filters.
          </p>
        </div>
        <AnalyticsSummaryGrid summary={summary} />
      </section>
    </div>
  );
}
