import type { ReactNode } from "react";

export function DataTable({
  columns,
  children
}: {
  columns: string[];
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stone-200">
          <thead className="bg-stone-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-black uppercase tracking-[0.08em] text-stone-500"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export function TableCell({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td className={`whitespace-nowrap px-4 py-4 text-sm ${className || ""}`}>
      {children}
    </td>
  );
}
