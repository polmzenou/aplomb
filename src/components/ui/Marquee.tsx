import { cn } from "@/lib/utils";

/** Infinite horizontal ticker; content is duplicated for a seamless loop. */
export function Marquee({ items, className, separator = "✕", reverse = false }: { items: string[]; className?: string; separator?: string; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="whitespace-nowrap px-8">{item}</span>
          <span className="text-[0.4em] text-terra">{separator}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div className={cn("flex w-max animate-marquee group-hover:[animation-play-state:paused]", reverse && "[animation-direction:reverse]")}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
