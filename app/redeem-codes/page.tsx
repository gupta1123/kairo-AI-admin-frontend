import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { Pagination } from "@/components/common/pagination";
import { SearchInput } from "@/components/common/search-input";
import { RedeemCodeCreateDialog } from "@/components/redeem-codes/redeem-code-create-dialog";
import { RedeemCodeStatusTabs } from "@/components/redeem-codes/redeem-code-status-tabs";
import { RedeemCodesTable } from "@/components/redeem-codes/redeem-codes-table";
import { getRedeemCodes } from "@/lib/admin-api";
import type { RedeemCodeStatus } from "@/lib/types";
import { getFirstParam } from "@/lib/utils";

type RedeemCodePageProps = {
  searchParams: Promise<{
    search?: string | string[];
    status?: string | string[];
    page?: string | string[];
  }>;
};

const validStatuses = new Set(["all", "active", "used", "expired", "revoked"]);

export default async function RedeemCodesPage({ searchParams }: RedeemCodePageProps) {
  const params = await searchParams;
  const search = getFirstParam(params.search) || "";
  const rawStatus = getFirstParam(params.status) || "all";
  const status = validStatuses.has(rawStatus)
    ? (rawStatus as RedeemCodeStatus | "all")
    : "all";
  const page = Number(getFirstParam(params.page) || 1);
  const result = await getRedeemCodes({ search, status, page, pageSize: 20 });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Redeem codes"
        description="Create and monitor one-time Pro access codes backed by the production API."
        action={<RedeemCodeCreateDialog />}
      />

      <div className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
        <RedeemCodeStatusTabs activeStatus={status} search={search} />
        <SearchInput
          defaultValue={search}
          hiddenFields={status !== "all" ? { status } : undefined}
          placeholder="Search code preview, creator, user, or status"
        />
      </div>

      {result.items.length > 0 ? (
        <>
          <RedeemCodesTable codes={result.items} />
          <Pagination
            basePath="/redeem-codes"
            page={result.page}
            pageSize={result.pageSize}
            total={result.total}
          />
        </>
      ) : (
        <EmptyState
          title="No redeem codes found"
          description="Try a different search or status filter."
          action={<RedeemCodeCreateDialog />}
        />
      )}
    </div>
  );
}
