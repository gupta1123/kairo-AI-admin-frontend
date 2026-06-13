import { Search } from "lucide-react";

export function SearchInput({
  placeholder,
  defaultValue,
  hiddenFields
}: {
  placeholder: string;
  defaultValue?: string;
  hiddenFields?: Record<string, string | undefined>;
}) {
  return (
    <form className="flex w-full items-center gap-2" action="">
      {hiddenFields
        ? Object.entries(hiddenFields).map(([name, value]) =>
            value ? <input key={name} type="hidden" name={name} value={value} /> : null
          )
        : null}
      <label className="relative block w-full">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
        <input
          className="h-10 w-full rounded-md border border-stone-200 bg-white pl-9 pr-3 text-sm font-medium text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
          defaultValue={defaultValue}
          name="search"
          placeholder={placeholder}
          type="search"
        />
      </label>
      <button
        className="h-10 rounded-md bg-stone-950 px-4 text-sm font-black text-white transition hover:bg-stone-800"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
