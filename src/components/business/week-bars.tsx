import { cn } from "@/lib/utils";

export function WeekBars({
  data,
  className,
}: {
  data: { day: string; value: number }[];
  className?: string;
}) {
  return (
    <div className={cn("flex h-40 items-end gap-2", className)}>
      {data.map((item) => (
        <div
          key={item.day}
          className="flex h-full flex-1 flex-col items-center justify-end gap-1"
        >
          <div
            className="w-full rounded-t bg-gradient-to-t from-lime-300 to-lime-400"
            style={{ height: `${item.value}%` }}
            aria-hidden="true"
          />
          <span className="text-caption text-ink-500">{item.day}</span>
        </div>
      ))}
    </div>
  );
}
