import { CalendarDays } from "lucide-react";

export function DateRangeFilter({ label = "Last 30 days" }: { label?: string }) {
  return (
    <button
      className="inline-flex h-10 items-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-black text-stone-700 shadow-sm"
      type="button"
    >
      <CalendarDays className="h-4 w-4 text-teal-700" />
      {label}
    </button>
  );
}
