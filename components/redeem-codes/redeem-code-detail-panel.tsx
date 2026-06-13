import Link from "next/link";
import { Clock3, KeyRound, ShieldCheck, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { StatusBadge } from "@/components/common/status-badge";
import type { RedeemCodeDetail } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

export function RedeemCodeDetailPanel({ code }: { code: RedeemCodeDetail }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-5">
          <div>
            <div className="font-mono text-2xl font-black text-stone-950">
              {code.codePreview}
            </div>
            <p className="mt-1 text-sm font-medium text-stone-500">
              Normalized lookup hint: {code.normalizedCodeHint}
            </p>
          </div>
          <StatusBadge label={code.status} tone={code.status} />
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <InfoTile icon={KeyRound} label="Grant" value="30 days Pro access" />
          <InfoTile icon={Clock3} label="Expires" value={formatDateTime(code.expiresAt)} />
          <InfoTile icon={ShieldCheck} label="Created by" value={code.createdBy} />
          <InfoTile icon={UserRound} label="Redemption" value={code.redemption?.userName || "Not redeemed"} />
        </div>

        <div className="mt-5 rounded-lg border border-teal-100 bg-teal-50 p-4">
          <div className="text-xs font-black uppercase tracking-[0.08em] text-teal-700">
            Backend rule
          </div>
          <p className="mt-2 text-sm font-semibold leading-6 text-teal-950">
            {code.backendRule}
          </p>
        </div>
      </section>

      <aside className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-black uppercase tracking-[0.08em] text-stone-500">
          Audit timeline
        </h2>
        <div className="mt-4 space-y-4">
          {code.auditTimeline.map((event) => (
            <div key={event.id} className="relative border-l border-stone-200 pl-4">
              <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-teal-600 ring-4 ring-teal-50" />
              <div className="text-sm font-black text-stone-950">{event.label}</div>
              <div className="mt-1 text-sm font-medium leading-5 text-stone-600">
                {event.description}
              </div>
              <div className="mt-2 text-xs font-bold text-stone-400">
                {event.actor} - {formatDateTime(event.createdAt)}
              </div>
            </div>
          ))}
        </div>

        {code.redemption ? (
          <Link
            href={`/users/${code.redemption.userId}`}
            className="mt-5 inline-flex h-10 items-center justify-center rounded-md bg-stone-950 px-4 text-sm font-black text-white"
          >
            View redeemed user
          </Link>
        ) : null}
      </aside>
    </div>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.08em] text-stone-500">
        <Icon className="h-4 w-4 text-teal-700" />
        {label}
      </div>
      <div className="mt-2 text-sm font-black text-stone-950">{value}</div>
    </div>
  );
}
