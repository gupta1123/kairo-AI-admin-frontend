import Link from "next/link";

export function Pagination({
  total,
  page,
  pageSize,
  basePath,
  queryParams
}: {
  total: number;
  page: number;
  pageSize: number;
  basePath: string;
  queryParams?: Record<string, string | number | undefined>;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const previousPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);
  const buildPageHref = (targetPage: number) => {
    const params = new URLSearchParams();

    Object.entries(queryParams || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, String(value));
      }
    });
    params.set("page", String(targetPage));

    return `${basePath}?${params.toString()}`;
  };

  return (
    <div className="mt-4 flex items-center justify-between gap-3 text-sm font-bold text-stone-600">
      <span>
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        <Link
          className="rounded-md border border-stone-200 bg-white px-3 py-2 text-stone-700 aria-disabled:pointer-events-none aria-disabled:opacity-50"
          href={buildPageHref(previousPage)}
          aria-disabled={page <= 1}
        >
          Previous
        </Link>
        <Link
          className="rounded-md border border-stone-200 bg-white px-3 py-2 text-stone-700 aria-disabled:pointer-events-none aria-disabled:opacity-50"
          href={buildPageHref(nextPage)}
          aria-disabled={page >= totalPages}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
