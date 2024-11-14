export const dynamic = "force-dynamic";

export default async function robots() {
  dynamic;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${process.env.NEXT_PUBLIC_API_URL}/sitemap.xml`,
  };
}
