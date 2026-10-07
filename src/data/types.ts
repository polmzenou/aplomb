import type { ImageKey } from "@/lib/images";
import type { L } from "@/lib/utils";

export type Side = "n" | "s" | "e" | "w";
export type Finish = "concrete" | "wood" | "white" | "dark";

/** One box of the parametric house model, in metres. */
export type Volume = {
  level: number;
  w: number;
  d: number;
  h?: number;
  x?: number;
  z?: number;
  glass?: Side[];
  finish?: Finish;
};

export type HouseParams = {
  volumes: Volume[];
  pool?: { w: number; d: number; x: number; z: number };
  deck?: { w: number; d: number; x: number; z: number };
  pilotis?: boolean;
  trees?: [x: number, z: number, scale: number][];
  site: { w: number; d: number };
};

export type Room = {
  id: string;
  name: L;
  x: number;
  y: number;
  w: number;
  h: number;
  outdoor?: boolean;
};

export type FloorPlan = { width: number; depth: number; label: L; rooms: Room[] };

export type PropertyType = "villa" | "loft" | "house" | "apartment";
export type PropertyStatus = "available" | "exclusive" | "underOffer" | "sold";
export type EnergyClass = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type Property = {
  slug: string;
  ref: string;
  title: string;
  tagline: L;
  type: PropertyType;
  status: PropertyStatus;
  area: L;
  city: string;
  lon: number;
  lat: number;
  price: number;
  surface: number;
  land?: number;
  terrace?: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  year: number;
  renovated?: number;
  architect: string;
  energy: EnergyClass;
  ghg: EnergyClass;
  energyValue: number;
  ghgValue: number;
  cover: ImageKey;
  gallery: ImageKey[];
  excerpt: L;
  description: L[];
  features: L[];
  plan: FloorPlan;
  model: HouseParams;
  featured?: boolean;
};

export type Architect = {
  slug: string;
  name: string;
  studio: string;
  base: string;
  since: number;
  portrait: ImageKey;
  signature: L;
  bio: L;
  materials: L[];
  quote: L;
};

export type Article = {
  slug: string;
  category: L;
  title: L;
  excerpt: L;
  cover: ImageKey;
  date: string;
  readingTime: number;
  author: string;
  body: { heading?: L; text: L; quote?: boolean }[];
};
