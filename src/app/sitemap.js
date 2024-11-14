import { unstable_noStore as noStore } from "next/cache";

export default async function sitemap() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog?type=sitemap`,
    {
      cache: "no-store",
    }
  );
  noStore();
  const colleges = await response.json();

  const postEntries = colleges.map((item) => ({
    url: `${process.env.NEXT_PUBLIC_API_URL}/blog/${item?._id?.pageUrl}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/disclaimer`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}/blog`,
      lastModified: new Date(),
    },
    ...postEntries,
  ];
}
