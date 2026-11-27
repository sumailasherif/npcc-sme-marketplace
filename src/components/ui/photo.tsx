import Image from "next/image";

import { cn } from "@/lib/utils";

export function Photo({
  name,
  alt,
  className,
  sizes = "(max-width: 768px) 50vw, 33vw",
  priority = false,
}: {
  name: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/photos/${name}.jpg`}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
