"use server";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    cache: "no-store",
  });

  const posts = await response.json();

  const postEntries: MetadataRoute.Sitemap = posts.map(
    ({ urlLink, updatedAt }: any) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/post/${urlLink}`,
      lastModified: new Date(updatedAt),
    })
  );

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/home`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/post`,
      lastModified: new Date(),
    },
    ...postEntries,
  ];
}
