import type { MetadataRoute } from "next";
import { absoluteUrl, creditServices } from "@/lib/site";

const publicPaths = [
  "/",
  ...creditServices.map(({ slug }) => `/${slug}`),
  "/sobre",
  "/contato",
  "/politica-de-privacidade",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({ url: absoluteUrl(path) }));
}
