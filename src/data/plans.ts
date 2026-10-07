import type { FloorPlan } from "./types";

/** Main-level plans, in metres. Areas shown on the site are computed from these rectangles. */
export const plans = {
  villa: {
    width: 20,
    depth: 12,
    label: { fr: "Rez-de-jardin", en: "Garden level" },
    rooms: [
      { id: "living", name: { fr: "Séjour", en: "Living room" }, x: 0, y: 0, w: 10, h: 8 },
      { id: "kitchen", name: { fr: "Cuisine", en: "Kitchen" }, x: 10, y: 0, w: 5, h: 6 },
      { id: "suite", name: { fr: "Suite parentale", en: "Master suite" }, x: 15, y: 0, w: 5, h: 7 },
      { id: "bath", name: { fr: "Salle de bains", en: "Bathroom" }, x: 15, y: 7, w: 5, h: 5 },
      { id: "entry", name: { fr: "Entrée & bureau", en: "Entrance & study" }, x: 10, y: 6, w: 5, h: 6 },
      { id: "terrace", name: { fr: "Terrasse", en: "Terrace" }, x: 0, y: 8, w: 10, h: 4, outdoor: true },
    ],
  },
  loft: {
    width: 16,
    depth: 10,
    label: { fr: "Plateau principal", en: "Main floor" },
    rooms: [
      { id: "living", name: { fr: "Espace de vie", en: "Living space" }, x: 0, y: 0, w: 9, h: 10 },
      { id: "kitchen", name: { fr: "Cuisine", en: "Kitchen" }, x: 9, y: 0, w: 7, h: 4 },
      { id: "bedroom", name: { fr: "Chambre", en: "Bedroom" }, x: 9, y: 4, w: 4, h: 6 },
      { id: "shower", name: { fr: "Salle d'eau", en: "Shower room" }, x: 13, y: 4, w: 3, h: 3 },
      { id: "studio", name: { fr: "Atelier", en: "Studio" }, x: 13, y: 7, w: 3, h: 3 },
    ],
  },
  apartment: {
    width: 18,
    depth: 10,
    label: { fr: "Niveau principal", en: "Main level" },
    rooms: [
      { id: "living", name: { fr: "Séjour", en: "Living room" }, x: 0, y: 0, w: 8, h: 6 },
      { id: "kitchen", name: { fr: "Cuisine", en: "Kitchen" }, x: 8, y: 0, w: 4, h: 6 },
      { id: "bed1", name: { fr: "Chambre 1", en: "Bedroom 1" }, x: 12, y: 0, w: 6, h: 5 },
      { id: "bed2", name: { fr: "Chambre 2", en: "Bedroom 2" }, x: 12, y: 5, w: 6, h: 5 },
      { id: "bath", name: { fr: "Salle de bains", en: "Bathroom" }, x: 8, y: 6, w: 4, h: 4 },
      { id: "terrace", name: { fr: "Terrasse", en: "Terrace" }, x: 0, y: 6, w: 8, h: 4, outdoor: true },
    ],
  },
} satisfies Record<string, FloorPlan>;
