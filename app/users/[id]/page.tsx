import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DataTable, TableCell } from "@/components/common/data-table";
import { EmptyState } from "@/components/common/empty-state";
import { PageHeader } from "@/components/common/page-header";
import { RedeemHistoryTable } from "@/components/users/redeem-history-table";
import { UsageStatsGrid } from "@/components/users/usage-stats-grid";
import { UserProfileHeader } from "@/components/users/user-profile-header";
import { getUserDetail } from "@/lib/admin-api";
import { formatDateTime, getActivityTone } from "@/lib/utils";

type UserDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;
  const user = await getUserDetail(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/users"
        className="inline-flex items-center gap-2 text-sm font-black text-stone-600 hover:text-teal-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to users
      </Link>
      <PageHeader
        title="User details"
        description="Subscription, usage, redeem history, and recent activity for an individual account."
      />
      <UserProfileHeader user={user} />
      <UsageStatsGrid user={user} />

      <section className="space-y-3">
        <div>
          <h2 className="text-base font-black text-stone-950">Redeem code history</h2>
          <p className="mt-1 text-sm font-medium text-stone-500">
            Pro grants created through one-time codes.
          </p>
        </div>
        {user.redeemCodeHistory.length > 0 ? (
          <RedeemHistoryTable history={user.redeemCodeHistory} />
        ) : (
          <EmptyState
            title="No redeem history"
            description="This user has not redeemed a Pro access code yet."
          />
        )}
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-base font-black text-stone-950">Recent activity</h2>
          <p className="mt-1 text-sm font-medium text-stone-500">
            Recent chat, workspace, billing, and redeem-code events from the backend.
          </p>
        </div>
        <DataTable columns={["Type", "Activity", "Metadata", "Created"]}>
          {user.recentActivity.map((activity) => (
            <tr key={activity.id}>
              <TableCell>
                <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-black text-stone-700">
                  {getActivityTone(activity.type)}
                </span>
              </TableCell>
              <TableCell className="font-black text-stone-950">{activity.label}</TableCell>
              <TableCell className="text-stone-600">{activity.metadata}</TableCell>
              <TableCell className="text-stone-600">{formatDateTime(activity.createdAt)}</TableCell>
            </tr>
          ))}
        </DataTable>
      </section>
    </div>
  );
}
