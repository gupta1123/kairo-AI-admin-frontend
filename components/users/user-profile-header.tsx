import { Mail, MapPin, PlugZap } from "lucide-react";
import type { AdminUserDetail } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { SubscriptionBadge } from "./subscription-badge";

export function UserProfileHeader({ user }: { user: AdminUserDetail }) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-teal-700 text-base font-black text-white">
            {user.initials}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-black tracking-tight text-stone-950">
                {user.name}
              </h1>
              <SubscriptionBadge plan={user.plan} status={user.subscriptionStatus} />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-stone-500">
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {user.email}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {user.timezone}
              </span>
              <span className="inline-flex items-center gap-2">
                <PlugZap className="h-4 w-4" />
                {user.connectedServices.join(", ")}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-stone-50 px-4 py-3 text-sm">
          <div className="font-black text-stone-950">Last active</div>
          <div className="mt-1 font-semibold text-stone-500">
            {formatDateTime(user.lastActiveAt)}
          </div>
        </div>
      </div>
    </section>
  );
}
