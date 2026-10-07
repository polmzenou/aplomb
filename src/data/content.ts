import type { ImageKey } from "@/lib/images";
import type { L } from "@/lib/utils";
import type { Article } from "./types";

export const team: { name: string; role: L; office: string; portrait: ImageKey; languages: string }[] = [
  { name: "Camille Arendt", role: { fr: "Fondatrice & directrice", en: "Founder & director" }, office: "Paris", portrait: "p2", languages: "FR · EN · DE" },
  { name: "Thomas Leroux", role: { fr: "Directeur Paris", en: "Head of Paris office" }, office: "Paris", portrait: "p1", languages: "FR · EN" },
  { name: "Sophie Navarro", role: { fr: "Directrice Côte basque", en: "Head of Basque Coast" }, office: "Biarritz", portrait: "p6", languages: "FR · ES · EN" },
  { name: "Julien Morel", role: { fr: "Directeur Lyon & Alpes", en: "Head of Lyon & Alps" }, office: "Lyon", portrait: "p8", languages: "FR · IT" },
  { name: "Léa Fontaine", role: { fr: "Architecte-conseil", en: "Consulting architect" }, office: "Paris", portrait: "p9", languages: "FR · EN" },
];

export const testimonials: { quote: L; name: string; context: L }[] = [
  {
    quote: {
      fr: "Ils ont parlé de notre maison comme Hélène Vasseur en parlait elle-même. Les acheteurs sont venus pour l'architecture, pas pour le nombre de chambres.",
      en: "They spoke about our house the way Hélène Vasseur herself did. Buyers came for the architecture, not the number of bedrooms.",
    },
    name: "Anne & Pierre D.",
    context: { fr: "Vendeurs · Biarritz", en: "Sellers · Biarritz" },
  },
  {
    quote: {
      fr: "Léa est venue aux visites avec les plans d'origine. Nous avons compris la maison avant même d'y entrer. Rare.",
      en: "Léa came to the viewings with the original drawings. We understood the house before we even stepped inside. Rare.",
    },
    name: "Mathilde R.",
    context: { fr: "Acquéreuse · Lyon", en: "Buyer · Lyon" },
  },
  {
    quote: {
      fr: "Trois visites, une offre au prix, quarante et un jours. Le dossier photo et la maquette ont fait tout le travail.",
      en: "Three viewings, a full-price offer, forty-one days. The photo set and the scale model did all the work.",
    },
    name: "Olivier B.",
    context: { fr: "Vendeur · Bordeaux", en: "Seller · Bordeaux" },
  },
  {
    quote: {
      fr: "Nous cherchions depuis deux ans. APLOMB nous a présenté le loft avant sa mise en ligne, parce qu'ils avaient compris ce que nous cherchions vraiment.",
      en: "We had been looking for two years. APLOMB showed us the loft before it went online, because they had understood what we were really after.",
    },
    name: "Yanis & Clémence T.",
    context: { fr: "Acquéreurs · Paris", en: "Buyers · Paris" },
  },
];

export const timeline: { year: number; title: L; text: L }[] = [
  {
    year: 2009,
    title: { fr: "Une agence, une seule maison", en: "One agency, one house" },
    text: {
      fr: "Camille Arendt, architecte DPLG, ouvre l'agence rue Vieille-du-Temple pour vendre une maison de Jean Prouvé laissée de côté par les réseaux classiques.",
      en: "Camille Arendt, a qualified architect, opens the agency on rue Vieille-du-Temple to sell a Jean Prouvé house overlooked by mainstream networks.",
    },
  },
  {
    year: 2013,
    title: { fr: "La méthode APLOMB", en: "The APLOMB method" },
    text: {
      fr: "Premières maquettes et relevés réalisés en interne. Chaque bien est présenté avec ses plans, son histoire et son architecte.",
      en: "First in-house scale models and surveys. Every property is presented with its drawings, its story and its architect.",
    },
  },
  {
    year: 2016,
    title: { fr: "Ouverture de Biarritz", en: "Biarritz opens" },
    text: {
      fr: "La côte basque et les Landes deviennent notre deuxième territoire, avec une équipe dédiée.",
      en: "The Basque Coast and the Landes become our second territory, with a dedicated team.",
    },
  },
  {
    year: 2019,
    title: { fr: "Lyon & les Alpes", en: "Lyon & the Alps" },
    text: {
      fr: "Ouverture du bureau du quai Saint-Vincent, pour les Monts d'Or, Annecy et les maisons de montagne.",
      en: "The quai Saint-Vincent office opens, covering the Monts d'Or, Annecy and mountain houses.",
    },
  },
  {
    year: 2022,
    title: { fr: "Fonds Salvat", en: "The Salvat archive" },
    text: {
      fr: "Les héritiers de Bruno Salvat nous confient la transmission de ses villas et la valorisation de ses archives.",
      en: "Bruno Salvat's heirs entrust us with passing on his villas and showcasing his archives.",
    },
  },
  {
    year: 2026,
    title: { fr: "340 maisons plus tard", en: "340 houses later" },
    text: {
      fr: "Dix-sept ans, trois bureaux, un réseau de 62 architectes partenaires — et toujours une seule question : la maison est-elle d'aplomb ?",
      en: "Seventeen years, three offices, a network of 62 partner architects — and still a single question: is the house true?",
    },
  },
];

export const faq: { category: L; items: { q: L; a: L }[] }[] = [
  {
    category: { fr: "Acheter", en: "Buying" },
    items: [
      {
        q: { fr: "Comment organiser une visite ?", en: "How do I arrange a viewing?" },
        a: {
          fr: "Depuis la fiche du bien, choisissez un créneau dans le formulaire de visite. Un conseiller vous rappelle sous 24 h ouvrées pour confirmer. Les visites ont lieu en présence d'un membre de l'équipe et, quand c'est possible, de l'architecte.",
          en: "From the property page, pick a slot in the viewing form. An advisor will call you back within one business day to confirm. Viewings take place with a team member and, whenever possible, the architect.",
        },
      },
      {
        q: { fr: "Certains biens ne sont-ils pas publiés ?", en: "Are some properties not published?" },
        a: {
          fr: "Oui. Environ un tiers de nos mandats sont proposés en « off-market », à la demande des vendeurs. Créez une alerte via le formulaire de contact pour être informé en priorité.",
          en: "Yes. About a third of our listings are offered off-market at the sellers' request. Set up an alert through the contact form to be informed first.",
        },
      },
      {
        q: { fr: "Accompagnez-vous les acheteurs étrangers ?", en: "Do you assist foreign buyers?" },
        a: {
          fr: "Notre équipe parle français, anglais, espagnol, italien et allemand. Nous travaillons avec des notaires et des courtiers habitués aux acquisitions internationales.",
          en: "Our team speaks French, English, Spanish, Italian and German. We work with notaries and brokers experienced in international acquisitions.",
        },
      },
    ],
  },
  {
    category: { fr: "Vendre", en: "Selling" },
    items: [
      {
        q: { fr: "Quels biens acceptez-vous ?", en: "Which properties do you take on?" },
        a: {
          fr: "Des maisons et appartements dont l'architecture est le premier argument : maisons d'architecte, réhabilitations remarquables, patrimoine du XXe siècle. Nous refusons environ la moitié des demandes de mandat.",
          en: "Houses and apartments whose architecture is the main selling point: architect-designed houses, remarkable rehabilitations, 20th-century heritage. We decline about half of listing requests.",
        },
      },
      {
        q: { fr: "Combien coûte l'estimation ?", en: "How much does a valuation cost?" },
        a: {
          fr: "L'avis de valeur est gratuit et sans engagement. Il est rédigé après une visite et une analyse des ventes comparables.",
          en: "The valuation is free and with no commitment. It is written after a visit and an analysis of comparable sales.",
        },
      },
      {
        q: { fr: "Que comprend votre accompagnement ?", en: "What does your service include?" },
        a: {
          fr: "Reportage photo et vidéo, relevé et plans redessinés, maquette numérique, récit de la maison, diffusion ciblée, visites qualifiées et suivi jusqu'à l'acte authentique.",
          en: "Photo and video shoot, survey and redrawn plans, digital model, the story of the house, targeted marketing, qualified viewings and follow-up through to completion.",
        },
      },
    ],
  },
  {
    category: { fr: "Honoraires & financement", en: "Fees & financing" },
    items: [
      {
        q: { fr: "Qui paie les honoraires ?", en: "Who pays the fees?" },
        a: {
          fr: "Nos honoraires sont à la charge du vendeur et inclus dans le prix affiché. Le barème complet est consultable sur la page Honoraires.",
          en: "Our fees are paid by the seller and included in the listed price. The full schedule is available on the Fees page.",
        },
      },
      {
        q: { fr: "Le simulateur de prêt est-il fiable ?", en: "Is the mortgage calculator reliable?" },
        a: {
          fr: "Il donne un ordre de grandeur (mensualité hors assurance, frais de notaire estimés). Seul un établissement bancaire ou un courtier peut vous faire une offre de prêt.",
          en: "It gives an estimate (monthly payment excluding insurance, estimated notary fees). Only a bank or broker can make you a loan offer.",
        },
      },
    ],
  },
];

export const articles: Article[] = [
  {
    slug: "lire-un-plan-d-architecte",
    category: { fr: "Guide", en: "Guide" },
    title: { fr: "Lire un plan d'architecte en cinq minutes", en: "Reading an architect's plan in five minutes" },
    excerpt: {
      fr: "Cotes, trames, sens d'ouverture, orientation : ce qu'un plan dit d'une maison avant même la visite.",
      en: "Dimensions, grids, door swings, orientation: what a plan tells you about a house before you even visit.",
    },
    cover: "drawing",
    date: "2026-09-18",
    readingTime: 6,
    author: "Léa Fontaine",
    body: [
      {
        text: {
          fr: "Un plan n'est pas un dessin technique réservé aux spécialistes. C'est la carte d'identité d'une maison, et il suffit de quelques repères pour le lire avec justesse.",
          en: "A plan isn't a technical drawing reserved for specialists. It is a house's identity card, and a few landmarks are enough to read it accurately.",
        },
      },
      {
        heading: { fr: "1. Cherchez le nord", en: "1. Find north" },
        text: {
          fr: "La flèche du nord est le premier élément à repérer. Elle vous dit où sera le soleil le matin, à midi, le soir, et donc quelles pièces seront baignées de lumière ou à l'ombre en été.",
          en: "The north arrow is the first thing to look for. It tells you where the sun will be in the morning, at noon and in the evening — and therefore which rooms will be flooded with light or shaded in summer.",
        },
      },
      {
        heading: { fr: "2. Suivez les cotes", en: "2. Follow the dimensions" },
        text: {
          fr: "Les traits de cote, avec leurs petites barres obliques, donnent les dimensions intérieures. Un séjour de 6 × 8 mètres n'a rien à voir avec un séjour de 4 × 12, même si les deux font 48 m².",
          en: "Dimension lines, with their small slashes, give the interior measurements. A 6 × 8 metre living room has nothing in common with a 4 × 12 one, even though both are 48 m².",
        },
      },
      {
        text: {
          fr: "« Une surface ne dit rien. Une proportion dit tout. »",
          en: "“An area says nothing. A proportion says everything.”",
        },
        quote: true,
      },
      {
        heading: { fr: "3. Regardez les circulations", en: "3. Look at circulation" },
        text: {
          fr: "Tracez mentalement le chemin de l'entrée à la cuisine, de la chambre à la salle de bains. Une bonne maison minimise les couloirs et offre des parcours en boucle plutôt que des impasses.",
          en: "Mentally trace the path from the entrance to the kitchen, from the bedroom to the bathroom. A good house minimises corridors and offers loops rather than dead ends.",
        },
      },
    ],
  },
  {
    slug: "beton-brut-vieillir-avec-elegance",
    category: { fr: "Matières", en: "Materials" },
    title: { fr: "Béton brut : vieillir avec élégance", en: "Raw concrete: ageing gracefully" },
    excerpt: {
      fr: "Patine, entretien, isolation : ce qu'il faut savoir avant d'acheter une maison en béton apparent.",
      en: "Patina, upkeep, insulation: what to know before buying an exposed-concrete house.",
    },
    cover: "concreteNight",
    date: "2026-08-27",
    readingTime: 5,
    author: "Camille Arendt",
    body: [
      {
        text: {
          fr: "Le béton apparent fascine autant qu'il inquiète. Bien conçu, il est pourtant l'un des matériaux qui vieillit le mieux, à condition de comprendre comment il a été coulé.",
          en: "Exposed concrete fascinates as much as it worries. Well designed, it is nonetheless one of the materials that ages best — provided you understand how it was cast.",
        },
      },
      {
        heading: { fr: "La patine n'est pas un défaut", en: "Patina isn't a flaw" },
        text: {
          fr: "Les nuances, les traces de coffrage, les légères efflorescences font partie du matériau. Un hydrofuge incolore tous les dix ans suffit généralement à le protéger.",
          en: "Variations in tone, formwork marks and slight efflorescence are part of the material. A colourless water repellent every ten years is usually enough to protect it.",
        },
      },
      {
        heading: { fr: "La vraie question : l'isolation", en: "The real question: insulation" },
        text: {
          fr: "Un béton apparent dedans et dehors suppose une isolation intégrée (béton isolant, rupteurs) ou un mur double. Demandez systématiquement le DPE et les plans de coupe.",
          en: "Concrete exposed both inside and out requires built-in insulation (insulating concrete, thermal breaks) or a double wall. Always ask for the energy rating and the section drawings.",
        },
      },
    ],
  },
  {
    slug: "acheter-une-maison-d-architecte",
    category: { fr: "Conseils", en: "Advice" },
    title: { fr: "Acheter une maison d'architecte : 7 points de vigilance", en: "Buying an architect-designed house: 7 things to check" },
    excerpt: {
      fr: "Droit d'auteur, matériaux atypiques, assurances : notre check-list avant de signer.",
      en: "Copyright, unusual materials, insurance: our checklist before you sign.",
    },
    cover: "villaPoolWhite",
    date: "2026-07-09",
    readingTime: 8,
    author: "Thomas Leroux",
    body: [
      {
        text: {
          fr: "Une maison d'architecte n'est pas un bien comme les autres. Son originalité fait sa valeur, mais impose quelques vérifications supplémentaires.",
          en: "An architect-designed house is not like other properties. Its originality is what makes it valuable, but it calls for a few extra checks.",
        },
      },
      {
        heading: { fr: "Le droit moral de l'architecte", en: "The architect's moral right" },
        text: {
          fr: "En France, l'architecte conserve un droit moral sur son œuvre. Une transformation lourde de la façade peut nécessiter son accord. Renseignez-vous avant d'envisager des travaux.",
          en: "In France, the architect retains a moral right over their work. A major change to the façade may require their consent. Find out before planning any works.",
        },
      },
      {
        heading: { fr: "La garantie décennale", en: "The ten-year guarantee" },
        text: {
          fr: "Pour une maison de moins de dix ans, demandez les attestations d'assurance décennale de toutes les entreprises intervenues, en particulier pour les structures atypiques.",
          en: "For a house under ten years old, ask for the ten-year insurance certificates of every contractor involved, particularly for unusual structures.",
        },
      },
    ],
  },
  {
    slug: "cap-ferret-laboratoire-maison-bois",
    category: { fr: "Territoires", en: "Places" },
    title: { fr: "Le Cap Ferret, laboratoire de la maison bois", en: "Cap Ferret, a laboratory for timber houses" },
    excerpt: {
      fr: "Des cabanes ostréicoles aux maisons sur pieux : comment la presqu'île a inventé une architecture légère.",
      en: "From oyster shacks to pile houses: how the peninsula invented a light architecture.",
    },
    cover: "houseTreeDark",
    date: "2026-06-12",
    readingTime: 7,
    author: "Sophie Navarro",
    body: [
      {
        text: {
          fr: "Sur la presqu'île, les règles d'urbanisme protègent la forêt et limitent l'emprise au sol. Les architectes ont répondu par des maisons légères, posées plutôt que fondées.",
          en: "On the peninsula, planning rules protect the forest and limit ground coverage. Architects responded with light houses, set down rather than founded.",
        },
      },
      {
        heading: { fr: "Le pieu plutôt que la dalle", en: "Piles rather than slabs" },
        text: {
          fr: "Surélever la maison laisse passer l'eau, le sable et les racines. C'est aussi une protection naturelle contre l'humidité et les termites.",
          en: "Raising the house lets water, sand and roots pass beneath. It is also natural protection against damp and termites.",
        },
      },
    ],
  },
  {
    slug: "rehabiliter-sans-trahir",
    category: { fr: "Projet", en: "Project" },
    title: { fr: "Réhabiliter sans trahir : le Loft Saint-Paul", en: "Rehabilitating without betraying: Loft Saint-Paul" },
    excerpt: {
      fr: "Comment l'Atelier Lune a transformé un atelier d'ébéniste du Marais sans effacer son histoire.",
      en: "How Atelier Lune transformed a Marais cabinetmaker's workshop without erasing its history.",
    },
    cover: "loftStair",
    date: "2026-05-21",
    readingTime: 5,
    author: "Léa Fontaine",
    body: [
      {
        text: {
          fr: "Quand Clara Duhamel découvre l'atelier en 2020, la verrière est opacifiée par des décennies de goudron et la charpente cachée sous des faux plafonds.",
          en: "When Clara Duhamel discovered the workshop in 2020, the skylight was blacked out by decades of tar and the frame hidden behind false ceilings.",
        },
      },
      {
        heading: { fr: "Tout enlever, puis presque rien ajouter", en: "Remove everything, then add almost nothing" },
        text: {
          fr: "La première année de chantier a consisté à dégager : faux plafonds, cloisons, revêtements. Les ajouts se limitent à une mezzanine, un escalier et une cuisine.",
          en: "The first year on site was about clearing: false ceilings, partitions, coverings. The additions are limited to a mezzanine, a staircase and a kitchen.",
        },
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
