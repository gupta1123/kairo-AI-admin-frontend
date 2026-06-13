import { MessageCircle, MousePointerClick, Rows3, Zap } from "lucide-react";
import type { AdminUserDetail } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

export function UsageStatsGrid({ user }: { user: AdminUserDetail }) {
  const items = [
    {
      label: "Monthly chat sessions",
      value: user.usageByPeriod.currentMonthChatSessions,
      icon: MessageCircle
    },
    {
      label: "Monthly workspace actions",
      value: user.usageByPeriod.currentMonthWorkspaceActions,
      icon: MousePointerClick
    },
    {
      label: "Total chat messages",
      value: user.usageByPeriod.totalChatMessages,
      icon: Rows3
    },
    {
      label: "Last 7 day actions",
      value: user.usageByPeriod.lastSevenDayActions,
      icon: Zap
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-black uppercase tracking-[0.08em] text-stone-500">
                {item.label}
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-50 text-teal-700">
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-5 text-2xl font-black text-stone-950">
              {formatNumber(item.value)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
