import { Metadata } from "next";
import SearchFilter from "@/components/SearchFilter";
import { API_URL } from "@/frontend/Path";

const getPosts = async () => {
  const response = await fetch(`${API_URL}/api/blog`, {
    cache: "no-store",
  });

  return response.json();
};

export const metadata: Metadata = {
  title: "posts",
  description: "This is the posts page for findbestone.com",
  keywords: [
    "findbestone",
    "findbestone.com",
    "find",
    "best",
    "one",
    "product",
    "offers",
    "good",
    "findbest",
    "findone",
    "bestone",
    "posts",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${API_URL}/posts`,
    languages: {
      "en-US": `${API_URL}/posts`,
      "de-DE": `${API_URL}/posts`,
    },
  },
  openGraph: {
    title: "posts",
    description: "This is the posts page for findbestone.com",
    url: `${API_URL}/posts`,
    siteName: "findbestone.com",
    locale: "en_US",
    type: "article",
    authors: ["Arunkumarkdeveloper"],
  },
  twitter: {
    card: "summary_large_image",
    site: "findbestone.com",
    title: "posts",
    description: "This is the posts page for findbestone.com",
    creator: "Arunkumarkdeveloper",
  },
};

export default async function post() {
  if (!API_URL) {
    return null;
  }
  const postData = await getPosts();

  return (
    <div style={{ minHeight: "50vh" }}>
      <SearchFilter postData={postData.reverse()} />
    </div>
  );
}
