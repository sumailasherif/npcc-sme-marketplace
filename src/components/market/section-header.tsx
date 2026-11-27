import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/ssr";

export function SectionHeader({
  id,
  title,
  note,
  href,
  linkLabel = "See all",
  level = 2,
}: {
  id: string;
  title: string;
  note?: string;
  href?: string;
  linkLabel?: string;
  /** Heading level; use 3 for rows inside a section. */
  level?: 2 | 3;
}) {
  const Heading = level === 3 ? "h3" : "h2";
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        <Heading
          id={id}
          className={
            level === 3 ? "text-h3 text-ink-900" : "text-h2 text-ink-900"
          }
        >
          {title}
        </Heading>
        {note ? <p className="text-caption text-ink-500">{note}</p> : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="flex min-h-11 shrink-0 items-center gap-0.5 text-body font-semibold text-lime-700 hover:underline"
        >
          {linkLabel}
          <CaretRight aria-hidden="true" className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}
