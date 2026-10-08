# APLOMB — Immobilier d'architecture

Site vitrine d'une agence immobilière (fictive) spécialisée dans les maisons d'architecte, les lofts et le patrimoine du XXe siècle. Bureaux à Paris, Lyon et Biarritz.

Projet 100 % front-end : les formulaires sont validés côté client puis simulés, les données sont des fichiers TypeScript.

## Stack

- **Next.js 16** (App Router, Turbopack, génération statique) · **React 19** · **TypeScript**
- **Tailwind CSS 4** — design tokens dans `src/app/globals.css`
- **next-intl** — FR / EN avec URL traduites (`/fr/biens` ↔ `/en/properties`)
- **Three.js** via **React Three Fiber** + **drei** — maquettes 3D paramétriques
- **Motion**, **GSAP ScrollTrigger**, **Lenis** — animations, sections épinglées, défilement doux
- **React Hook Form** + **Zod** — formulaires et validation

## Fonctionnalités

- **Accueil** : maquette 3D qui s'éclate étage par étage au défilement, modes jour / nuit / plan bleu, manifeste révélé mot à mot, carrousel horizontal épinglé, compteurs, curseur plan ↔ photo, index des architectes, témoignages.
- **Catalogue** : filtres (type, région, budget, surface, chambres, architecte), tri, vues grille / liste / carte de France, sélection enregistrée dans le navigateur, comparateur (3 biens).
- **Fiche bien** : galerie avec visionneuse plein écran, plan interactif (surfaces au survol), maquette 3D orientable générée depuis les données du bien, DPE / GES, simulateur de prêt, demande de visite, données structurées `RealEstateListing`.
- **Pages** : architectes, estimation en ligne en 3 étapes, agence (frise chronologique), journal, sélection, contact, FAQ.
- **Légal** : mentions légales (loi Hoguet), confidentialité (RGPD), politique cookies avec gestion du consentement, CGU, barème d'honoraires, accessibilité, plan du site.
- **Erreurs** : 404 et 403 en 3D, 500, 404 hors langue.
- **SEO** : métadonnées par page, hreflang, sitemap, robots, manifest, images Open Graph générées, JSON-LD.
- **Accessibilité** : navigation clavier, focus visibles, `prefers-reduced-motion` respecté, alternatives sans WebGL.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000 (redirige vers `/fr`).

```bash
npm run build   # build de production
npm run lint    # ESLint
```

## Structure

```
messages/            Traductions FR / EN
src/app/[locale]/    Pages localisées
src/components/      layout · sections · property · forms · three · ui · cookies
src/data/            Biens, architectes, articles, contenus légaux
src/i18n/            Routage et URL traduites
src/lib/             Utilitaires (formatage, prêt, carte, favoris, métadonnées)
src/proxy.ts         Détection de la langue et réécriture des URL traduites
```

## Crédits

Photographies : [Unsplash](https://unsplash.com) (licence Unsplash). Agence, architectes, biens et personnes sont fictifs.
