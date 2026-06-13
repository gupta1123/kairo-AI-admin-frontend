import Link from "next/link";

export function Pagination({
  total,
  page,
  pageSize,
  basePath
}: {
  total: number;
  page: number;
  pageSize: number;
  basePath: string;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const previousPage = Math.max(1, page - 1);
  const nextPage = Math.min(totalPages, page + 1);

  return (
    <div className="mt-4 flex items-center justify-between gap-3 text-sm font-bold text-stone-600">
      <span>
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        <Link
          className="rounded-md border border-stone-200 bg-white px-3 py-2 text-stone-700 aria-disabled:pointer-events-none aria-disabled:opacity-50"
          href={`${basePath}?page=${previousPage}`}
          aria-disabled={page <= 1}
        >
          Previous
        </Link>
        <Link
          className="rounded-md border border-stone-200 bg-white px-3 py-2 text-stone-700 aria-disabled:pointer-events-none aria-disabled:opacity-50"
          href={`${basePath}?page=${nextPage}`}
          aria-disabled={page >= totalPages}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
