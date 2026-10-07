import type { Architect } from "./types";

export const architects: Architect[] = [
  {
    slug: "helene-vasseur",
    name: "Hélène Vasseur",
    studio: "Atelier Vasseur",
    base: "Biarritz",
    since: 2004,
    portrait: "p4",
    signature: { fr: "Béton, lumière rasante, horizon", en: "Concrete, raking light, horizon" },
    bio: {
      fr: "Formée à Bordeaux puis chez Alberto Campo Baeza à Madrid, Hélène Vasseur construit des maisons qui cadrent le paysage plutôt que de s'y imposer. Ses villas de la côte basque sont étudiées dans plusieurs écoles d'architecture.",
      en: "Trained in Bordeaux and then with Alberto Campo Baeza in Madrid, Hélène Vasseur builds houses that frame the landscape rather than impose on it. Her Basque Coast villas are studied in several architecture schools.",
    },
    materials: [
      { fr: "Béton blanc", en: "White concrete" },
      { fr: "Chêne massif", en: "Solid oak" },
      { fr: "Terrazzo", en: "Terrazzo" },
    ],
    quote: {
      fr: "Une maison réussie, c'est d'abord une fenêtre bien placée.",
      en: "A successful house is, first of all, a well-placed window.",
    },
  },
  {
    slug: "studio-ordinal",
    name: "Inès Moreau & Marc Ferrand",
    studio: "Studio Ordinal",
    base: "Lyon",
    since: 2011,
    portrait: "p10",
    signature: { fr: "Volumes empilés, matières brutes", en: "Stacked volumes, raw materials" },
    bio: {
      fr: "Le duo lyonnais travaille la maison comme un empilement de boîtes qui pivotent pour chercher la lumière. Lauréats de l'Équerre d'argent catégorie habitat en 2019.",
      en: "The Lyon duo treats the house as a stack of boxes that pivot in search of light. Winners of the Équerre d'argent housing award in 2019.",
    },
    materials: [
      { fr: "Béton matricé", en: "Board-marked concrete" },
      { fr: "Brique de réemploi", en: "Reclaimed brick" },
      { fr: "Acier corten", en: "Corten steel" },
    ],
    quote: {
      fr: "Chaque niveau mérite sa propre vue.",
      en: "Every level deserves its own view.",
    },
  },
  {
    slug: "kenji-arnaud",
    name: "Kenji Arnaud",
    studio: "Arnaud Architecture Bois",
    base: "Cap Ferret",
    since: 2008,
    portrait: "p3",
    signature: { fr: "Bois, pieux, sol préservé", en: "Timber, piles, untouched ground" },
    bio: {
      fr: "Franco-japonais, charpentier avant d'être architecte, Kenji Arnaud construit exclusivement en bois et sans terrassement. Ses maisons sur pieux du bassin d'Arcachon ont fait école.",
      en: "Franco-Japanese, a carpenter before becoming an architect, Kenji Arnaud builds exclusively in timber and without earthworks. His pile houses around Arcachon Bay have set a standard.",
    },
    materials: [
      { fr: "Pin des Landes", en: "Landes pine" },
      { fr: "Mélèze", en: "Larch" },
      { fr: "Bois brûlé", en: "Charred timber" },
    ],
    quote: {
      fr: "Le meilleur terrain est celui qu'on ne touche pas.",
      en: "The best ground is the ground you leave untouched.",
    },
  },
  {
    slug: "atelier-lune",
    name: "Clara Duhamel",
    studio: "Atelier Lune",
    base: "Paris",
    since: 2013,
    portrait: "p7",
    signature: { fr: "Réhabilitation, lumière zénithale", en: "Rehabilitation, overhead light" },
    bio: {
      fr: "Clara Duhamel transforme ateliers, entrepôts et attiques parisiens en lieux de vie, avec une obsession : faire entrer la lumière par le haut. Elle enseigne à l'ENSA Paris-Belleville.",
      en: "Clara Duhamel turns Parisian workshops, warehouses and penthouses into homes, with one obsession: bringing light in from above. She teaches at ENSA Paris-Belleville.",
    },
    materials: [
      { fr: "Acier plié", en: "Folded steel" },
      { fr: "Chêne fumé", en: "Smoked oak" },
      { fr: "Verre armé", en: "Wired glass" },
    ],
    quote: {
      fr: "Réhabiliter, c'est écouter ce que le bâtiment voulait devenir.",
      en: "To rehabilitate is to listen to what the building wanted to become.",
    },
  },
  {
    slug: "bruno-salvat",
    name: "Bruno Salvat",
    studio: "Fonds Salvat (1931 – 2014)",
    base: "Marseille",
    since: 1959,
    portrait: "p5",
    signature: { fr: "Modernisme méditerranéen", en: "Mediterranean modernism" },
    bio: {
      fr: "Figure discrète du modernisme méditerranéen, Bruno Salvat a construit une trentaine de villas entre Marseille et Toulon. APLOMB accompagne ses héritiers dans la transmission de ses maisons.",
      en: "A discreet figure of Mediterranean modernism, Bruno Salvat built some thirty villas between Marseille and Toulon. APLOMB assists his heirs in passing on his houses.",
    },
    materials: [
      { fr: "Enduit blanc", en: "White render" },
      { fr: "Grès de Salernes", en: "Salernes stoneware" },
      { fr: "Acier", en: "Steel" },
    ],
    quote: {
      fr: "La mer est le seul ornement dont j'aie besoin.",
      en: "The sea is the only ornament I need.",
    },
  },
];

export function getArchitect(slug: string) {
  return architects.find((a) => a.slug === slug);
}
