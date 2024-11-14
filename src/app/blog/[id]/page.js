import dynamic from "next/dynamic";
const ViewBlog = dynamic(() => import("@/frontend/section/ViewBlog"), {
  ssr: false,
});

const getBlog = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`,
    { cache: "no-store" }
  );
  if (response.ok) {
    return response.json();
  }
};

const getBlogs = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog?type=featured-posts&pageUrl=${id}`,
    {
      cache: "no-store",
    }
  );
  if (response.ok) {
    return response.json();
  }
};

export async function generateMetadata({ params }) {
  const data = await getBlog(params?.id);
  const myTitle = `${data?.blogData?.title} | Findbestone`;
  const myDescription = data?.blogData?.description;
  return {
    title: myTitle,
    description: myDescription,
    keywords: data?.keywords,
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
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/${data?.pageUrl}`
    ),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_API_URL}/blog/${data?.pageUrl}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_API_URL}/blog/${data?.pageUrl}/en-US`,
        "de-DE": `${process.env.NEXT_PUBLIC_API_URL}/blog/${data?.pageUrl}/de-DE`,
      },
    },
    openGraph: {
      title: myTitle,
      description: myDescription,
      url: `${process.env.NEXT_PUBLIC_API_URL}/blog/${data?.pageUrl}`,
      siteName: "findbestone.com",
      type: "website",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_API_URL}/images/logo.png`,
          secureUrl: `${process.env.NEXT_PUBLIC_API_URL}/images/logo.png`,
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
}

export default async function page({ params }) {
  const blog = await getBlog(params.id);
  const blogs = await getBlogs(params.id);
  return <ViewBlog blog={blog} blogs={blogs} isEdit={true} type="view" />;
}
