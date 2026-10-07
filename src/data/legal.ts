import { site } from "@/lib/site";
import type { L } from "@/lib/utils";

export type LegalSection = { id: string; title: L; body: L[]; list?: L[] };
export type LegalDoc = { updated: string; intro: L; sections: LegalSection[] };

const c = site.company;

export const legalNotice: LegalDoc = {
  updated: "2026-09-01",
  intro: {
    fr: "Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, et à la loi Hoguet n° 70-9 du 2 janvier 1970, voici les informations relatives à l'éditeur du site.",
    en: "In accordance with Articles 6-III and 19 of French Law No. 2004-575 of 21 June 2004 on confidence in the digital economy, and the Hoguet Law No. 70-9 of 2 January 1970, here is the information about the publisher of this website.",
  },
  sections: [
    {
      id: "editor",
      title: { fr: "Éditeur du site", en: "Publisher" },
      body: [
        {
          fr: `${c.legalName}, société par actions simplifiée au capital de ${c.capital}, immatriculée au ${c.rcs}, SIRET ${c.siret}, TVA intracommunautaire ${c.vat}.`,
          en: `${c.legalName}, a simplified joint-stock company with share capital of ${c.capital}, registered with the ${c.rcs}, SIRET ${c.siret}, EU VAT ${c.vat}.`,
        },
        {
          fr: `Siège social : ${site.offices[0].street}, ${site.offices[0].zip} Paris, France. Téléphone : ${site.phone}. E-mail : ${site.email}.`,
          en: `Registered office: ${site.offices[0].street}, ${site.offices[0].zip} Paris, France. Phone: ${site.phone}. Email: ${site.email}.`,
        },
        { fr: `Directrice de la publication : ${c.director}.`, en: `Publication director: ${c.director}.` },
      ],
    },
    {
      id: "profession",
      title: { fr: "Activité réglementée", en: "Regulated activity" },
      body: [
        {
          fr: `Carte professionnelle « Transactions sur immeubles et fonds de commerce » n° ${c.card}, délivrée par la ${c.cardIssuer}. La société ne doit recevoir ni détenir aucun fonds, effet ou valeur autre que ses honoraires.`,
          en: `Professional licence “Property and business transactions” No. ${c.card}, issued by the ${c.cardIssuer}. The company may not receive or hold any funds, instruments or securities other than its fees.`,
        },
        {
          fr: `Garantie financière : ${c.guarantee}. Assurance responsabilité civile professionnelle : ${c.insurance}.`,
          en: `Financial guarantee: ${c.guarantee}. Professional liability insurance: ${c.insurance}.`,
        },
        {
          fr: "Médiateur de la consommation : Médiation de la consommation immobilière (MCI), 12 rue de la Paix, 75002 Paris. Le barème des honoraires est disponible sur la page Honoraires et affiché dans nos agences.",
          en: "Consumer mediator: Médiation de la consommation immobilière (MCI), 12 rue de la Paix, 75002 Paris. The fee schedule is available on the Fees page and displayed in our offices.",
        },
      ],
    },
    {
      id: "hosting",
      title: { fr: "Hébergement", en: "Hosting" },
      body: [
        {
          fr: "Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis — vercel.com.",
          en: "The website is hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States — vercel.com.",
        },
      ],
    },
    {
      id: "ip",
      title: { fr: "Propriété intellectuelle", en: "Intellectual property" },
      body: [
        {
          fr: "L'ensemble des contenus de ce site (textes, plans, maquettes, logo, charte graphique) est protégé par le droit d'auteur. Les œuvres architecturales présentées restent la propriété intellectuelle de leurs auteurs. Toute reproduction sans autorisation écrite est interdite.",
          en: "All content on this site (text, plans, models, logo, visual identity) is protected by copyright. The architectural works presented remain the intellectual property of their authors. Any reproduction without written permission is prohibited.",
        },
        {
          fr: "Crédits photographiques : Unsplash (licence Unsplash), à titre d'illustration. Les plans et maquettes sont des représentations non contractuelles.",
          en: "Photo credits: Unsplash (Unsplash licence), for illustration purposes. Plans and models are non-contractual representations.",
        },
      ],
    },
    {
      id: "liability",
      title: { fr: "Responsabilité", en: "Liability" },
      body: [
        {
          fr: "Les informations relatives aux biens (surfaces, prix, diagnostics) sont fournies à titre indicatif et ne constituent pas une offre contractuelle. Seuls les documents signés chez le notaire font foi.",
          en: "Property information (areas, prices, surveys) is provided for guidance only and does not constitute a contractual offer. Only documents signed before the notary are binding.",
        },
      ],
    },
  ],
};

export const privacyPolicy: LegalDoc = {
  updated: "2026-09-01",
  intro: {
    fr: "APLOMB Immobilier accorde une importance particulière à la protection de vos données personnelles. Cette politique explique quelles données nous collectons, pourquoi, et comment exercer vos droits, conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés.",
    en: "APLOMB Immobilier attaches great importance to protecting your personal data. This policy explains what data we collect, why, and how to exercise your rights, in accordance with Regulation (EU) 2016/679 (GDPR) and the French Data Protection Act.",
  },
  sections: [
    {
      id: "controller",
      title: { fr: "Responsable du traitement", en: "Data controller" },
      body: [
        {
          fr: `${c.legalName}, ${site.offices[0].street}, ${site.offices[0].zip} Paris. Délégué à la protection des données : dpo@aplomb-immobilier.fr.`,
          en: `${c.legalName}, ${site.offices[0].street}, ${site.offices[0].zip} Paris. Data protection officer: dpo@aplomb-immobilier.fr.`,
        },
      ],
    },
    {
      id: "data",
      title: { fr: "Données collectées", en: "Data collected" },
      body: [
        {
          fr: "Nous ne collectons que les données que vous nous transmettez volontairement via nos formulaires :",
          en: "We only collect data you voluntarily send us through our forms:",
        },
      ],
      list: [
        { fr: "Identité : civilité, nom, prénom", en: "Identity: title, last name, first name" },
        { fr: "Coordonnées : e-mail, téléphone", en: "Contact details: email, phone" },
        { fr: "Projet : critères de recherche, bien à vendre, message libre", en: "Project: search criteria, property to sell, free message" },
        { fr: "Données de navigation, uniquement avec votre consentement", en: "Browsing data, only with your consent" },
      ],
    },
    {
      id: "purposes",
      title: { fr: "Finalités et bases légales", en: "Purposes and legal bases" },
      body: [
        {
          fr: "Répondre à vos demandes de contact, de visite ou d'estimation (mesures précontractuelles) ; vous adresser notre lettre d'information (consentement) ; mesurer l'audience du site (consentement) ; respecter nos obligations légales, notamment en matière de lutte contre le blanchiment (obligation légale).",
          en: "Responding to your contact, viewing or valuation requests (pre-contractual measures); sending our newsletter (consent); measuring site audience (consent); complying with our legal obligations, particularly anti-money-laundering rules (legal obligation).",
        },
      ],
    },
    {
      id: "retention",
      title: { fr: "Durées de conservation", en: "Retention periods" },
      body: [
        {
          fr: "Prospects : 3 ans à compter du dernier contact. Clients : durée du mandat puis 5 ans (obligations comptables et LCB-FT). Newsletter : jusqu'à désinscription. Cookies de mesure : 13 mois maximum.",
          en: "Prospects: 3 years from last contact. Clients: term of the mandate plus 5 years (accounting and AML obligations). Newsletter: until you unsubscribe. Analytics cookies: 13 months maximum.",
        },
      ],
    },
    {
      id: "recipients",
      title: { fr: "Destinataires", en: "Recipients" },
      body: [
        {
          fr: "Vos données sont destinées aux seules équipes d'APLOMB et, le cas échéant, aux notaires et vendeurs concernés par votre projet. Elles ne sont jamais vendues ni louées.",
          en: "Your data is intended solely for APLOMB's teams and, where relevant, for the notaries and sellers involved in your project. It is never sold or rented.",
        },
      ],
    },
    {
      id: "rights",
      title: { fr: "Vos droits", en: "Your rights" },
      body: [
        {
          fr: "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition, ainsi que du droit de définir des directives post-mortem. Écrivez à dpo@aplomb-immobilier.fr en joignant un justificatif d'identité. Vous pouvez également introduire une réclamation auprès de la CNIL (cnil.fr).",
          en: "You have the right of access, rectification, erasure, restriction, portability and objection, as well as the right to set post-mortem instructions. Write to dpo@aplomb-immobilier.fr enclosing proof of identity. You may also lodge a complaint with the CNIL (cnil.fr).",
        },
      ],
    },
    {
      id: "security",
      title: { fr: "Sécurité", en: "Security" },
      body: [
        {
          fr: "Les échanges avec le site sont chiffrés (HTTPS). L'accès aux données est limité aux personnes habilitées et journalisé.",
          en: "Exchanges with the site are encrypted (HTTPS). Access to data is restricted to authorised staff and logged.",
        },
      ],
    },
  ],
};

export const cookieRows: { name: string; purpose: L; duration: L; category: "necessary" | "analytics" | "marketing" }[] = [
  { name: "aplomb_consent", purpose: { fr: "Mémorise vos choix en matière de cookies", en: "Stores your cookie choices" }, duration: { fr: "6 mois", en: "6 months" }, category: "necessary" },
  { name: "NEXT_LOCALE", purpose: { fr: "Mémorise la langue choisie", en: "Remembers your chosen language" }, duration: { fr: "1 an", en: "1 year" }, category: "necessary" },
  { name: "aplomb_selection", purpose: { fr: "Conserve votre sélection de biens (stockage local)", en: "Keeps your property shortlist (local storage)" }, duration: { fr: "Jusqu'à suppression", en: "Until deleted" }, category: "necessary" },
  { name: "_pk_id, _pk_ses", purpose: { fr: "Mesure d'audience anonymisée (Matomo)", en: "Anonymised audience measurement (Matomo)" }, duration: { fr: "13 mois", en: "13 months" }, category: "analytics" },
  { name: "_fbp, li_fat_id", purpose: { fr: "Mesure des campagnes publicitaires", en: "Advertising campaign measurement" }, duration: { fr: "3 mois", en: "3 months" }, category: "marketing" },
];

export const cookiePolicy: LegalDoc = {
  updated: "2026-09-01",
  intro: {
    fr: "Lors de votre navigation, des cookies et traceurs peuvent être déposés sur votre terminal. Certains sont indispensables, d'autres ne sont activés qu'avec votre accord, que vous pouvez modifier à tout moment.",
    en: "While you browse, cookies and trackers may be stored on your device. Some are essential; others are only enabled with your consent, which you can change at any time.",
  },
  sections: [
    {
      id: "what",
      title: { fr: "Qu'est-ce qu'un cookie ?", en: "What is a cookie?" },
      body: [
        {
          fr: "Un cookie est un petit fichier texte déposé par un site sur votre navigateur. Il permet de mémoriser des informations d'une page à l'autre ou d'une visite à l'autre.",
          en: "A cookie is a small text file a website stores in your browser. It allows information to be remembered from one page or visit to the next.",
        },
      ],
    },
    {
      id: "categories",
      title: { fr: "Catégories utilisées", en: "Categories used" },
      body: [
        {
          fr: "Cookies nécessaires : indispensables au fonctionnement du site, ils ne requièrent pas votre consentement. Cookies de mesure d'audience : nous aident à comprendre l'usage du site. Cookies marketing : mesurent l'efficacité de nos campagnes.",
          en: "Necessary cookies: essential for the site to work, they do not require your consent. Audience measurement cookies: help us understand how the site is used. Marketing cookies: measure the effectiveness of our campaigns.",
        },
      ],
    },
    {
      id: "list",
      title: { fr: "Liste des traceurs", en: "List of trackers" },
      body: [],
    },
    {
      id: "manage",
      title: { fr: "Gérer vos choix", en: "Managing your choices" },
      body: [
        {
          fr: "Vous pouvez modifier vos préférences à tout moment via le bouton ci-dessous ou le lien « Cookies » en pied de page. Votre choix est conservé 6 mois, après quoi il vous sera de nouveau demandé. Refuser n'a aucune incidence sur votre accès au site.",
          en: "You can change your preferences at any time using the button below or the “Cookies” link in the footer. Your choice is kept for 6 months, after which you will be asked again. Refusing has no effect on your access to the site.",
        },
      ],
    },
  ],
};

export const terms: LegalDoc = {
  updated: "2026-09-01",
  intro: {
    fr: "Les présentes conditions générales d'utilisation encadrent l'accès et l'usage du site aplomb-immobilier.fr. En naviguant sur le site, vous les acceptez sans réserve.",
    en: "These terms of use govern access to and use of aplomb-immobilier.fr. By browsing the site, you accept them without reservation.",
  },
  sections: [
    {
      id: "object",
      title: { fr: "Objet du site", en: "Purpose of the site" },
      body: [
        {
          fr: "Le site présente l'activité d'APLOMB Immobilier et les biens dont la commercialisation lui est confiée. Il permet de formuler des demandes d'information, de visite ou d'estimation.",
          en: "The site presents APLOMB Immobilier's business and the properties it has been entrusted to market. It allows you to request information, viewings or valuations.",
        },
      ],
    },
    {
      id: "access",
      title: { fr: "Accès", en: "Access" },
      body: [
        {
          fr: "Le site est accessible gratuitement, 24 h/24, sauf interruption pour maintenance ou cas de force majeure. L'espace propriétaires est réservé aux mandants disposant d'identifiants.",
          en: "The site is freely accessible 24/7, except for maintenance or force majeure. The owner area is reserved for clients holding credentials.",
        },
      ],
    },
    {
      id: "content",
      title: { fr: "Contenus et informations", en: "Content and information" },
      body: [
        {
          fr: "Les annonces sont mises à jour régulièrement mais peuvent ne plus être disponibles. Les simulations (prêt, estimation) sont indicatives et n'engagent pas APLOMB.",
          en: "Listings are updated regularly but may no longer be available. Simulations (mortgage, valuation) are indicative and do not bind APLOMB.",
        },
      ],
    },
    {
      id: "user",
      title: { fr: "Engagements de l'utilisateur", en: "User commitments" },
      body: [
        {
          fr: "Vous vous engagez à fournir des informations exactes et à ne pas utiliser le site à des fins illicites, ni extraire massivement ses contenus.",
          en: "You agree to provide accurate information and not to use the site for unlawful purposes or extract its content on a large scale.",
        },
      ],
    },
    {
      id: "law",
      title: { fr: "Droit applicable", en: "Governing law" },
      body: [
        {
          fr: "Les présentes CGU sont soumises au droit français. À défaut de résolution amiable, les tribunaux de Paris sont compétents.",
          en: "These terms are governed by French law. Failing an amicable settlement, the courts of Paris have jurisdiction.",
        },
      ],
    },
  ],
};

export const accessibility: LegalDoc = {
  updated: "2026-09-01",
  intro: {
    fr: "APLOMB Immobilier s'engage à rendre son site accessible conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.",
    en: "APLOMB Immobilier is committed to making its website accessible in accordance with Article 47 of French Law No. 2005-102 of 11 February 2005.",
  },
  sections: [
    {
      id: "status",
      title: { fr: "État de conformité", en: "Compliance status" },
      body: [
        {
          fr: "Le site est partiellement conforme au RGAA 4.1. Un audit interne réalisé en septembre 2026 relève un taux de conformité de 87 %.",
          en: "The site is partially compliant with RGAA 4.1. An internal audit carried out in September 2026 found a compliance rate of 87%.",
        },
      ],
    },
    {
      id: "measures",
      title: { fr: "Mesures mises en place", en: "Measures in place" },
      body: [],
      list: [
        { fr: "Navigation complète au clavier, focus visible", en: "Full keyboard navigation, visible focus" },
        { fr: "Respect de la préférence « réduire les animations »", en: "Respects the “reduce motion” preference" },
        { fr: "Alternative textuelle pour les visuels 3D", en: "Text alternative for 3D visuals" },
        { fr: "Contrastes conformes AA sur les textes courants", en: "AA-compliant contrast on body text" },
      ],
    },
    {
      id: "limits",
      title: { fr: "Contenus non accessibles", en: "Non-accessible content" },
      body: [
        {
          fr: "Les maquettes 3D interactives ne sont pas entièrement utilisables au lecteur d'écran ; les informations qu'elles contiennent (surfaces, niveaux) sont reprises en texte sur chaque fiche.",
          en: "Interactive 3D models are not fully usable with a screen reader; the information they contain (areas, levels) is repeated as text on each listing.",
        },
      ],
    },
    {
      id: "contact",
      title: { fr: "Signaler un problème", en: "Report an issue" },
      body: [
        {
          fr: "Si vous rencontrez une difficulté, écrivez-nous à accessibilite@aplomb-immobilier.fr. Sans réponse satisfaisante, vous pouvez saisir le Défenseur des droits.",
          en: "If you encounter a difficulty, write to accessibilite@aplomb-immobilier.fr. Without a satisfactory reply, you may contact the Défenseur des droits.",
        },
      ],
    },
  ],
};

export const feeSchedule: { range: L; fee: L }[] = [
  { range: { fr: "Jusqu'à 150 000 €", en: "Up to €150,000" }, fee: { fr: "Forfait 9 000 € TTC", en: "Flat fee €9,000 incl. VAT" } },
  { range: { fr: "De 150 001 € à 500 000 €", en: "€150,001 to €500,000" }, fee: { fr: "6 % TTC", en: "6% incl. VAT" } },
  { range: { fr: "De 500 001 € à 1 000 000 €", en: "€500,001 to €1,000,000" }, fee: { fr: "5 % TTC", en: "5% incl. VAT" } },
  { range: { fr: "De 1 000 001 € à 2 000 000 €", en: "€1,000,001 to €2,000,000" }, fee: { fr: "4,5 % TTC", en: "4.5% incl. VAT" } },
  { range: { fr: "Au-delà de 2 000 000 €", en: "Above €2,000,000" }, fee: { fr: "4 % TTC", en: "4% incl. VAT" } },
];

export const fees: LegalDoc = {
  updated: "2026-01-01",
  intro: {
    fr: "Barème des honoraires applicable aux transactions à compter du 1er janvier 2026, conformément à l'arrêté du 10 janvier 2017. Honoraires à la charge du vendeur, inclus dans les prix affichés.",
    en: "Fee schedule applicable to transactions from 1 January 2026, in accordance with the French decree of 10 January 2017. Fees payable by the seller, included in listed prices.",
  },
  sections: [
    { id: "sale", title: { fr: "Transactions — vente", en: "Transactions — sale" }, body: [] },
    {
      id: "other",
      title: { fr: "Autres prestations", en: "Other services" },
      body: [],
      list: [
        { fr: "Avis de valeur : offert", en: "Valuation: free of charge" },
        { fr: "Relevé et plans redessinés : inclus dans le mandat exclusif", en: "Survey and redrawn plans: included with an exclusive mandate" },
        { fr: "Maquette numérique 3D : incluse dans le mandat exclusif", en: "3D digital model: included with an exclusive mandate" },
        { fr: "Recherche personnalisée (mandat de recherche) : 3 % TTC du prix net vendeur, à la charge de l'acquéreur", en: "Personal search (search mandate): 3% incl. VAT of the net seller price, payable by the buyer" },
      ],
    },
    {
      id: "notes",
      title: { fr: "Précisions", en: "Notes" },
      body: [
        {
          fr: "Les honoraires sont calculés sur le prix de vente net vendeur et s'entendent TVA au taux de 20 % incluse. Ils ne sont dus qu'à la signature de l'acte authentique.",
          en: "Fees are calculated on the net seller price and include VAT at 20%. They are only due upon signing of the deed of sale.",
        },
      ],
    },
  ],
};
