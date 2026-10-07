import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.fullName,
    short_name: site.name,
    description: "Immobilier d'architecture — Paris, Lyon, Côte basque",
    start_url: "/fr",
    display: "standalone",
    background_color: "#ece8e1",
    theme_color: "#ece8e1",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
