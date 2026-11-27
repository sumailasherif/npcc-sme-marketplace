import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/ssr";

export function SectionHeader({
  id,
  title,
  note,
  href,
  linkLabel = "See all",
}: {
  id: string;
  title: string;
  note?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <h2 id={id} className="text-h2 text-ink-900">
          {title}
        </h2>
        {note ? <p className="text-caption text-ink-500">{note}</p> : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="flex min-h-11 shrink-0 items-center gap-0.5 text-body font-semibold text-teal-700 hover:underline"
        >
          {linkLabel}
          <CaretRight aria-hidden="true" className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
