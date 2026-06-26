import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DataTable, TableCell } from "@/components/common/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { getRedeemCodeGrantLabel, getRedeemCodePlan } from "@/lib/redeem-code-plans";
import type { RedeemCodeSummary } from "@/lib/types";
import { formatDate, formatDateTime } from "@/lib/utils";

export function RedeemCodesTable({ codes }: { codes: RedeemCodeSummary[] }) {
  return (
    <DataTable columns={["Code", "Status", "Grant", "Created", "Expires", "Redeemed by", ""]}>
      {codes.map((code) => (
        <tr key={code.id} className="hover:bg-stone-50/80">
          <TableCell>
            <div className="font-mono text-sm font-black text-stone-950">
              {code.codePreview}
            </div>
            <div className="text-xs font-semibold text-stone-500">ID {code.id}</div>
          </TableCell>
          <TableCell>
            <StatusBadge label={code.status} tone={code.status} />
          </TableCell>
          <TableCell>
            <div className="font-bold text-stone-800">
              {getRedeemCodePlan(code.planGrant).label}
            </div>
            <div className="text-xs font-semibold text-stone-500">
              {getRedeemCodeGrantLabel(code)}
            </div>
          </TableCell>
          <TableCell className="text-stone-600">{formatDate(code.createdAt)}</TableCell>
          <TableCell className="text-stone-600">{formatDate(code.expiresAt)}</TableCell>
          <TableCell>
            {code.redemption ? (
              <div>
                <Link
                  href={`/users/${code.redemption.userId}`}
                  className="font-bold text-stone-900 hover:text-teal-700"
                >
                  {code.redemption.userName}
                </Link>
                <div className="text-xs font-semibold text-stone-500">
                  {formatDateTime(code.redemption.redeemedAt)}
                </div>
              </div>
            ) : (
              <span className="text-stone-400">Not redeemed</span>
            )}
          </TableCell>
          <TableCell>
            <Link
              href={`/redeem-codes/${code.id}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-stone-500 hover:bg-stone-100 hover:text-teal-700"
              aria-label={`View ${code.codePreview}`}
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </TableCell>
        </tr>
      ))}
    </DataTable>
  );
}
