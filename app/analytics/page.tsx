import { AnalyticsSummaryGrid } from "@/components/analytics/analytics-summary-grid";
import { RedeemCodeFunnel } from "@/components/analytics/redeem-code-funnel";
import { TopUsersTable } from "@/components/analytics/top-users-table";
import { UsageTrendChart } from "@/components/analytics/usage-trend-chart";
import { DateRangeFilter } from "@/components/common/date-range-filter";
import { PageHeader } from "@/components/common/page-header";
import { getAnalyticsSummary } from "@/lib/admin-api";
import { formatDateTime, formatPercent } from "@/lib/utils";

export default async function AnalyticsPage() {
  const summary = await getAnalyticsSummary();
  const usageRate =
    (summary.metrics.redeemCodesUsed / summary.metrics.redeemCodesGenerated) * 100;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics"
        description="MVP analytics for users, activity, Pro access, and redeem-code performance."
        action={<DateRangeFilter label={summary.dateRangeLabel} />}
      />

      <AnalyticsSummaryGrid summary={summary} />

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.9fr]">
        <UsageTrendChart data={summary.usageSeries} />
        <RedeemCodeFunnel data={summary.redeemCodeFunnel} />
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-black uppercase tracking-[0.08em] text-stone-500">
            Code usage rate
          </div>
          <div className="mt-4 text-3xl font-black text-stone-950">
            {formatPercent(usageRate)}
          </div>
          <p className="mt-2 text-sm font-semibold text-stone-500">
            Used codes divided by generated codes.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-black uppercase tracking-[0.08em] text-stone-500">
            Pro conversion source
          </div>
          <div className="mt-4 text-3xl font-black text-stone-950">Redeem</div>
          <p className="mt-2 text-sm font-semibold text-stone-500">
            MVP tracks manual Pro grants separately from paid billing later.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-black uppercase tracking-[0.08em] text-stone-500">
            Generated at
          </div>
          <div className="mt-4 text-lg font-black text-stone-950">
            {formatDateTime(summary.generatedAt)}
          </div>
          <p className="mt-2 text-sm font-semibold text-stone-500">
            Fixture timestamp for future cache freshness display.
          </p>
        </div>
      </section>

      <TopUsersTable users={summary.topUsers} />
    </div>
  );
}
