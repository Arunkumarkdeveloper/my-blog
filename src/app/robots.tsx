import { MetadataRoute } from "next";
import { API_URL } from "@/frontend/Path";
export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  dynamic;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private",
    },
    sitemap: `${API_URL}/sitemap.xml`,
  };
}
