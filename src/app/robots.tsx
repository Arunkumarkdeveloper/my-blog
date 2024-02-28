import { MetadataRoute } from "next";
import { API_URL } from "@/frontend/Path";

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private",
    },
    sitemap: `${API_URL}/sitemap.xml`,
  };
}
