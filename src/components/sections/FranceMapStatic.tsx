import { corsicaPath, francePath, MAP_VIEWBOX, project } from "@/lib/geo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Offices on a drafted map of France. Decorative: the addresses are listed in text next to it. */
export function FranceMapStatic({ className }: { className?: string }) {
  return (
    <div className={cn("graph-paper border border-line bg-paper p-4", className)} aria-hidden="true">
      <svg viewBox={`0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}`} className="h-auto w-full">
        <path d={francePath} fill="var(--color-paper-2)" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d={corsicaPath} fill="var(--color-paper-2)" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinejoin="round" />
        {site.offices.map((o) => {
          const p = project(o.lon, o.lat);
          return (
            <g key={o.key} transform={`translate(${p.x} ${p.y})`}>
              <circle r="26" fill="var(--color-terra)" opacity="0.15">
                <animate attributeName="r" values="10;30;10" dur="3s" repeatCount="indefinite" />
              </circle>
              <rect x="-7" y="-7" width="14" height="14" fill="var(--color-terra)" />
              <text x="16" y="-10" fontSize="22" style={{ fontFamily: "var(--font-jetbrains)" }} fill="var(--color-ink)">
                {o.city.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
