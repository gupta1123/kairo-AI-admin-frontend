import {
  KeyRound,
  MessageCircle,
  MousePointerClick,
  TicketCheck,
  UserCheck,
  UsersRound,
  Zap
} from "lucide-react";
import { MetricCard } from "@/components/common/metric-card";
import type { AdminAnalyticsSummary } from "@/lib/types";

const icons = [
  UsersRound,
  UserCheck,
  MessageCircle,
  MousePointerClick,
  Zap,
  KeyRound,
  TicketCheck
];

export function AnalyticsSummaryGrid({ summary }: { summary: AdminAnalyticsSummary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summary.metricCards.map((card, index) => (
        <MetricCard
          key={card.label}
          label={card.label}
          value={card.value}
          deltaLabel={card.deltaLabel}
          href={card.href}
          icon={icons[index]}
        />
      ))}
    </div>
  );
}
