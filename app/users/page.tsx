import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Pagination } from "@/components/common/pagination";
import { SearchInput } from "@/components/common/search-input";
import { UsersTable } from "@/components/users/users-table";
import { getUsers } from "@/lib/admin-api";
import type { SubscriptionPlan } from "@/lib/types";
import { getFirstParam } from "@/lib/utils";
import Link from "next/link";
import { cn } from "@/lib/utils";

type UsersPageProps = {
  searchParams: Promise<{
    search?: string | string[];
    plan?: string | string[];
    page?: string | string[];
  }>;
};

const planTabs: Array<{ label: string; value: SubscriptionPlan | "all" }> = [
  { label: "All", value: "all" },
  { label: "Pro", value: "pro" },
  { label: "Free", value: "free" }
];

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams;
  const search = getFirstParam(params.search) || "";
  const rawPlan = getFirstParam(params.plan) || "all";
  const plan = rawPlan === "pro" || rawPlan === "free" ? rawPlan : "all";
  const page = Number(getFirstParam(params.page) || 1);
  const result = await getUsers({ search, plan, page, pageSize: 20 });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Search users, inspect subscription state, usage, and redeem-code history."
      />

      <div className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {planTabs.map((tab) => {
            const query = new URLSearchParams();
            if (tab.value !== "all") {
              query.set("plan", tab.value);
            }
            if (search) {
              query.set("search", search);
            }

            return (
              <Link
                key={tab.value}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-black ring-1",
                  plan === tab.value
                    ? "bg-teal-700 text-white ring-teal-700"
                    : "bg-white text-stone-600 ring-stone-200 hover:text-stone-950"
                )}
                href={`/users${query.toString() ? `?${query.toString()}` : ""}`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
        <SearchInput
          defaultValue={search}
          hiddenFields={plan !== "all" ? { plan } : undefined}
          placeholder="Search name, email, company, or plan"
        />
      </div>

      {result.items.length > 0 ? (
        <>
          <UsersTable users={result.items} />
          <Pagination
            basePath="/users"
            page={result.page}
            pageSize={result.pageSize}
            total={result.total}
          />
        </>
      ) : (
        <EmptyState
          title="No users found"
          description="Try a different search or plan filter."
        />
      )}
    </div>
  );
}
