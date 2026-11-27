import {
  CaretDown,
  MagnifyingGlass,
  MapPin,
  SquaresFour,
} from "@phosphor-icons/react/ssr";

import { categories, districts } from "@/lib/catalog/queries";
import { cn } from "@/lib/utils";

/**
 * Find a product or a business, optionally by district and category.
 * A plain GET form to /search, so it works without JavaScript.
 * One bar on desktop; stacked on phones.
 */
export function BusinessSearch({
  query = "",
  district = "",
  category = "",
  className,
}: {
  query?: string;
  district?: string;
  category?: string;
  className?: string;
}) {
  return (
    <form
      action="/search"
      role="search"
      className={cn(
        "grid gap-2 rounded-card bg-white p-2 shadow-e3 ring-1 ring-ink-100 tablet:grid-cols-[1.6fr_1fr_1fr_auto] tablet:gap-0 tablet:rounded-full tablet:p-1.5",
        className,
      )}
    >
      <label className="flex min-h-12 items-center gap-2 rounded-button px-3 ring-1 ring-ink-100 tablet:ring-0">
        <MagnifyingGlass
          aria-hidden="true"
          className="size-5 shrink-0 text-ink-700"
        />
        <span className="sr-only">What are you looking for?</span>
        <input
          name="q"
          type="search"
          defaultValue={query}
          placeholder='Try "car rental" or "biryani"'
          className="min-h-11 w-full bg-transparent text-body-l text-ink-900 outline-none placeholder:text-ink-500"
        />
      </label>

      <div className="grid grid-cols-2 gap-2 tablet:contents">
        <SelectField
          name="district"
          label="District"
          value={district}
          icon={<MapPin aria-hidden="true" className="size-4 shrink-0" />}
          options={[
            { value: "", label: "All of Mauritius" },
            ...districts().map((d) => ({ value: d, label: d })),
          ]}
        />
        <SelectField
          name="cat"
          label="Category"
          value={category}
          icon={<SquaresFour aria-hidden="true" className="size-4 shrink-0" />}
          options={[
            { value: "", label: "All categories" },
            ...categories.map((c) => ({ value: c.slug, label: c.name })),
          ]}
        />
      </div>

      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-button bg-lime-400 px-6 text-body font-semibold text-ink-900 hover:bg-lime-300 tablet:rounded-full"
      >
        Search
        <MagnifyingGlass aria-hidden="true" className="size-4" weight="bold" />
      </button>
    </form>
  );
}

function SelectField({
  name,
  label,
  value,
  icon,
  options,
}: {
  name: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="relative flex min-h-12 items-center gap-1.5 rounded-button px-3 text-ink-700 ring-1 ring-ink-100 tablet:rounded-none tablet:border-l tablet:border-ink-100 tablet:ring-0">
      {icon}
      <span className="sr-only">{label}</span>
      <select
        name={name}
        defaultValue={value}
        className="min-h-11 w-full min-w-0 cursor-pointer appearance-none truncate bg-transparent pr-5 text-body text-ink-900 outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <CaretDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 size-4 text-ink-500"
      />
    </label>
  );
}
