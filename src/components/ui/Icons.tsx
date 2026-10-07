import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.25, "aria-hidden": true } as const;

export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 12" {...base} {...p}>
    <path d="M0 6h22M17 1l5 5-5 5" />
  </svg>
);
export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 14 14" {...base} {...p}>
    <path d="M2 12L12 2M4 2h8v8" />
  </svg>
);
export const ArrowUp = (p: P) => (
  <svg viewBox="0 0 12 16" {...base} {...p}>
    <path d="M6 16V2M1 7l5-5 5 5" />
  </svg>
);
export const Close = (p: P) => (
  <svg viewBox="0 0 16 16" {...base} {...p}>
    <path d="M2 2l12 12M14 2L2 14" />
  </svg>
);
export const Plus = (p: P) => (
  <svg viewBox="0 0 16 16" {...base} {...p}>
    <path d="M8 1v14M1 8h14" />
  </svg>
);
export const Bookmark = ({ filled, ...p }: P & { filled?: boolean }) => (
  <svg viewBox="0 0 16 20" {...base} {...p}>
    <path d="M2 1h12v18l-6-5-6 5z" fill={filled ? "currentColor" : "none"} />
  </svg>
);
export const Compare = (p: P) => (
  <svg viewBox="0 0 20 16" {...base} {...p}>
    <path d="M1 1h7v14H1zM12 1h7v14h-7z" />
  </svg>
);
export const Grid = (p: P) => (
  <svg viewBox="0 0 16 16" {...base} {...p}>
    <path d="M1 1h6v6H1zM9 1h6v6H9zM1 9h6v6H1zM9 9h6v6H9z" />
  </svg>
);
export const List = (p: P) => (
  <svg viewBox="0 0 16 16" {...base} {...p}>
    <path d="M1 3h14M1 8h14M1 13h14" />
  </svg>
);
export const MapIcon = (p: P) => (
  <svg viewBox="0 0 18 16" {...base} {...p}>
    <path d="M1 3l5-2 6 2 5-2v12l-5 2-6-2-5 2zM6 1v12M12 3v12" />
  </svg>
);
export const Sun = (p: P) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <circle cx="10" cy="10" r="4" />
    <path d="M10 0v3M10 17v3M0 10h3M17 10h3M2.9 2.9l2.1 2.1M15 15l2.1 2.1M2.9 17.1L5 15M15 5l2.1-2.1" />
  </svg>
);
export const Moon = (p: P) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <path d="M16 13.5A8 8 0 0 1 6.5 4a7.5 7.5 0 1 0 9.5 9.5z" />
  </svg>
);
export const Cube = (p: P) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <path d="M10 1l8 4.5v9L10 19l-8-4.5v-9zM10 10l8-4.5M10 10v9M10 10L2 5.5" />
  </svg>
);
export const Layers = (p: P) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <path d="M10 1l9 4.5-9 4.5-9-4.5zM1 10l9 4.5 9-4.5M1 14.5L10 19l9-4.5" />
  </svg>
);
export const Blueprint = (p: P) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <path d="M1 1h18v18H1zM1 7h8v12M9 7h10M14 7v5" />
  </svg>
);
export const Expand = (p: P) => (
  <svg viewBox="0 0 16 16" {...base} {...p}>
    <path d="M1 6V1h5M10 1h5v5M15 10v5h-5M6 15H1v-5" />
  </svg>
);
export const Chevron = (p: P) => (
  <svg viewBox="0 0 10 16" {...base} {...p}>
    <path d="M2 1l7 7-7 7" />
  </svg>
);
export const Check = (p: P) => (
  <svg viewBox="0 0 16 12" {...base} {...p}>
    <path d="M1 6l5 5L15 1" />
  </svg>
);
export const Lock = (p: P) => (
  <svg viewBox="0 0 16 20" {...base} {...p}>
    <path d="M2 9h12v10H2zM4.5 9V5.5a3.5 3.5 0 0 1 7 0V9M8 13v2.5" />
  </svg>
);
export const Pin = (p: P) => (
  <svg viewBox="0 0 14 20" {...base} {...p}>
    <path d="M7 19s6-6.5 6-11A6 6 0 0 0 1 8c0 4.5 6 11 6 11z" />
    <circle cx="7" cy="8" r="2" />
  </svg>
);
export const Compass = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}>
    <circle cx="12" cy="12" r="11" />
    <path d="M12 3l3 9h-6z" fill="currentColor" />
    <path d="M12 21l-3-9h6z" />
  </svg>
);
export const Instagram = (p: P) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <rect x="1" y="1" width="18" height="18" rx="5" />
    <circle cx="10" cy="10" r="4" />
    <circle cx="15" cy="5" r="0.6" fill="currentColor" />
  </svg>
);
export const LinkedIn = (p: P) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <path d="M1 7h4v12H1zM3 1.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM8 7h4v2c.6-1.2 2-2.3 4-2.3 3 0 4 2 4 5V19h-4v-6.5c0-1.5-.5-2.5-2-2.5s-2 1.2-2 2.5V19H8z" />
  </svg>
);
export const Pinterest = (p: P) => (
  <svg viewBox="0 0 20 20" {...base} {...p}>
    <circle cx="10" cy="10" r="9" />
    <path d="M8.5 19l2-8.5M8 12.5c.5 1.5 4.5 2 5.5-1.5S12 5 9.5 5.5 5.5 9 7 10.5" />
  </svg>
);
