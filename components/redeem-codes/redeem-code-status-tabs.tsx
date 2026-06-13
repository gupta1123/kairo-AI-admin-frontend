import Link from "next/link";
import type { RedeemCodeStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const tabs: Array<{ label: string; value: RedeemCodeStatus | "all" }> = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Used", value: "used" },
  { label: "Expired", value: "expired" },
  { label: "Revoked", value: "revoked" }
];

export function RedeemCodeStatusTabs({
  activeStatus,
  search
}: {
  activeStatus: RedeemCodeStatus | "all";
  search?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const query = new URLSearchParams();
        if (tab.value !== "all") {
          query.set("status", tab.value);
        }
        if (search) {
          query.set("search", search);
        }
        const href = `/redeem-codes${query.toString() ? `?${query.toString()}` : ""}`;

        return (
          <Link
            key={tab.value}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-black ring-1",
              activeStatus === tab.value
                ? "bg-teal-700 text-white ring-teal-700"
                : "bg-white text-stone-600 ring-stone-200 hover:text-stone-950"
            )}
            href={href}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
