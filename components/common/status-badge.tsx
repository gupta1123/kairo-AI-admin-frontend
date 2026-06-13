import { cn } from "@/lib/utils";

const variants = {
  active: "border-teal-200 bg-teal-50 text-teal-800",
  used: "border-indigo-200 bg-indigo-50 text-indigo-800",
  expired: "border-rose-200 bg-rose-50 text-rose-800",
  revoked: "border-stone-300 bg-stone-100 text-stone-700",
  pro: "border-teal-200 bg-teal-50 text-teal-800",
  free: "border-stone-200 bg-stone-100 text-stone-700",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  neutral: "border-stone-200 bg-white text-stone-600"
};

export function StatusBadge({
  label,
  tone = "neutral"
}: {
  label: string;
  tone?: keyof typeof variants;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full border px-2.5 text-xs font-black capitalize",
        variants[tone]
      )}
    >
      {label}
    </span>
  );
}
