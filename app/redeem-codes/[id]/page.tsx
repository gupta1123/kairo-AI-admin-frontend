import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { RedeemCodeDetailPanel } from "@/components/redeem-codes/redeem-code-detail-panel";
import { getRedeemCodeDetail } from "@/lib/admin-api";

type RedeemCodeDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function RedeemCodeDetailPage({
  params
}: RedeemCodeDetailPageProps) {
  const { id } = await params;
  const code = await getRedeemCodeDetail(id);

  if (!code) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/redeem-codes"
        className="inline-flex items-center gap-2 text-sm font-black text-stone-600 hover:text-teal-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to redeem codes
      </Link>
      <PageHeader
        title="Redeem code details"
        description="Operational view of one-time status, redemption state, grant behavior, and future audit history."
      />
      <RedeemCodeDetailPanel code={code} />
    </div>
  );
}
