import type { MetadataRoute } from "next";
import { absoluteUrl, siteIndexable } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: siteIndexable ? absoluteUrl("/sitemap.xml") : undefined,
  };
}
