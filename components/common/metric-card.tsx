import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { ArrowUpRight } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  deltaLabel,
  href,
  icon: Icon
}: {
  label: string;
  value: number;
  deltaLabel: string;
  href?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  const content = (
    <div className="h-full rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition hover:border-teal-200 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.08em] text-stone-500">
          {label}
        </p>
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-stone-100 text-stone-600">
          {Icon ? <Icon className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
        </div>
      </div>
      <div className="mt-5 text-3xl font-black tracking-tight text-stone-950">
        {formatNumber(value)}
      </div>
      <p className="mt-2 text-sm font-semibold text-stone-500">{deltaLabel}</p>
    </div>
  );

  return href ? (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  ) : (
    content
  );
}
