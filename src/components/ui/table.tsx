import { cn } from "@/lib/utils";

export function Table({
  headers,
  children,
  className,
}: {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("-mx-1 overflow-x-auto", className)}>
      <table className="w-full min-w-[560px] border-collapse text-body">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-ink-100 px-2 pb-2 text-left text-caption font-semibold uppercase tracking-wide text-ink-500"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td
      className={cn(
        "border-b border-ink-100 px-2 py-3 align-middle",
        className,
      )}
    >
      {children}
    </td>
  );
}
