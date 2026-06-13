import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DataTable, TableCell } from "@/components/common/data-table";
import type { AdminUserSummary } from "@/lib/types";
import { formatDate, formatNumber } from "@/lib/utils";
import { SubscriptionBadge } from "./subscription-badge";

export function UsersTable({ users }: { users: AdminUserSummary[] }) {
  return (
    <DataTable columns={["User", "Company", "Plan", "Last active", "Chat sessions", "Workspace actions", ""]}>
      {users.map((user) => (
        <tr key={user.id} className="hover:bg-stone-50/80">
          <TableCell>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-teal-700 text-xs font-black text-white">
                {user.initials}
              </div>
              <div>
                <Link href={`/users/${user.id}`} className="font-black text-stone-950 hover:text-teal-700">
                  {user.name}
                </Link>
                <div className="text-xs font-semibold text-stone-500">{user.email}</div>
              </div>
            </div>
          </TableCell>
          <TableCell className="font-semibold text-stone-600">{user.company}</TableCell>
          <TableCell>
            <SubscriptionBadge plan={user.plan} status={user.subscriptionStatus} />
          </TableCell>
          <TableCell className="text-stone-600">{formatDate(user.lastActiveAt)}</TableCell>
          <TableCell className="font-black text-stone-900">{formatNumber(user.chatSessions)}</TableCell>
          <TableCell className="font-black text-stone-900">{formatNumber(user.workspaceActions)}</TableCell>
          <TableCell>
            <Link
              href={`/users/${user.id}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-stone-500 hover:bg-stone-100 hover:text-teal-700"
              aria-label={`View ${user.name}`}
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </TableCell>
        </tr>
      ))}
    </DataTable>
  );
}
