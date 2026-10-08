import type { LabelRefs } from "./HouseModel";

/** Level annotations drawn over the canvas; HouseModel moves each one to its level every frame. */
export function LevelLabels({ labels, refs }: { labels: string[]; refs: LabelRefs }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      {labels.map((label, i) => (
        <div
          key={label}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="mono absolute left-0 top-0 flex items-center gap-2 whitespace-nowrap text-[10px] uppercase tracking-[0.14em] text-ink opacity-0 transition-opacity duration-500"
        >
          <span className="bg-paper/90 px-1.5 py-0.5">{label}</span>
          <span className="h-px w-8 bg-terra" />
        </div>
      ))}
    </div>
  );
}
