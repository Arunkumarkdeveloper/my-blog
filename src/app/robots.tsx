"use server";
import { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private",
    },
    //sitemap: `${process.env.NEXT_PUBLIC_API_URL}/sitemap.xml`,
  };
}
