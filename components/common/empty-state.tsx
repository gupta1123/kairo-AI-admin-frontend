import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-stone-300 bg-white px-6 py-10 text-center">
      <h2 className="text-base font-black text-stone-950">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-stone-600">
        {description}
      </p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
