import { BlogList } from "@/frontend/section/BlogList";

const getBlogs = async (searchParams) => {
  const params = await searchParams;
  const page = params?.page || "";
  const query = `page=${page}`;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog?${query}`,
    {
      cache: "no-store",
    }
  );
  if (response.ok) {
    return response.json();
  }
};

const getBlogsPagination = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog?type=sitemap`,
    {
      cache: "no-store",
    }
  );
  if (response.ok) {
    return response.json();
  }
};

const myTitle =
  "Explore Top Reviews, Guides & Best Product Comparisons | Blog List - findbestone";
const myDescription =
  "Get the latest expert reviews, in-depth buying guides, and product comparisons on findbestone. Discover the best tech, gadgets, tools, and more to help you make informed decisions.";

export const metadata = {
  title: myTitle,
  description: myDescription,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_API_URL}/blog`),
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_API_URL}/blog`,
    languages: {
      "en-US": `${process.env.NEXT_PUBLIC_API_URL}/blog/en-US`,
      "de-DE": `${process.env.NEXT_PUBLIC_API_URL}/blog/de-DE`,
    },
  },
  openGraph: {
    title: myTitle,
    description: myDescription,
    url: `${process.env.NEXT_PUBLIC_API_URL}/blog`,
    siteName: "findbestone.com",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}/images/logo.svg`,
        secureUrl: `${process.env.NEXT_PUBLIC_API_URL}/images/logo.svg`,
        width: 1200,
        height: 630,
        alt: "Preview image for findbestone.com",
      },
    ],
    locale: "en_US",
    authors: ["findbestone admin"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@findbestone_",
    title: myTitle,
    description: myDescription,
    creator: "@findbestone_",
    images: {
      url: `${process.env.NEXT_PUBLIC_API_URL}/images/logo.svg`,
      alt: "Preview image for findbestone.com",
    },
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_API_URL}/favicon.ico`,
    shortcut: `${process.env.NEXT_PUBLIC_API_URL}/favicon.ico`,
    apple: `${process.env.NEXT_PUBLIC_API_URL}/favicon.ico`,
    other: {
      rel: "apple-touch-icon-precomposed",
      url: `${process.env.NEXT_PUBLIC_API_URL}/favicon.ico`,
    },
  },
  category: "Blog",
};

export default async function page({ searchParams }) {
  const blogs = await getBlogs(searchParams);
  const blogsPagination = await getBlogsPagination();
  return (
    <BlogList
      blogs={blogs}
      blogsPagination={blogsPagination}
      isPagination={true}
    />
  );
}