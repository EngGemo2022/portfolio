import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gamal Abdlhafez — Portfolio",
    short_name: "Gamal Abdlhafez",
    description:
      "Portfolio of Gamal Abdlhafez Hamood — Graphic Designer & Web Designer based in Riyadh, Saudi Arabia.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#d4af37",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
