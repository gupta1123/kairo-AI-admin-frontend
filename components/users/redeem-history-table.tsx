import Link from "next/link";
import { DataTable, TableCell } from "@/components/common/data-table";
import type { RedeemHistoryItem } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

export function RedeemHistoryTable({ history }: { history: RedeemHistoryItem[] }) {
  return (
    <DataTable columns={["Code", "Redeemed", "Grant", "Pro access ends"]}>
      {history.map((item) => (
        <tr key={item.codeId}>
          <TableCell>
            <Link
              href={`/redeem-codes/${item.codeId}`}
              className="font-mono font-black text-stone-950 hover:text-teal-700"
            >
              {item.codePreview}
            </Link>
          </TableCell>
          <TableCell className="text-stone-600">{formatDateTime(item.redeemedAt)}</TableCell>
          <TableCell className="font-bold text-stone-900">{item.grantLabel}</TableCell>
          <TableCell className="text-stone-600">{formatDateTime(item.proAccessEndsAt)}</TableCell>
        </tr>
      ))}
    </DataTable>
  );
}
