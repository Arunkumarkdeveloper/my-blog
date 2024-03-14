import React, { Suspense } from "react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const ViewPost = dynamic(() => import("@/components/ViewPost"));
import { API_URL } from "@/frontend/Path";
import { unstable_noStore as noStore } from "next/cache";
import Loading from "@/frontend/Loading";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await getPost(params?.id);
  return {
    title: post?.blogTitle,
    description: post?.description,
    keywords: post?.seoKeywords,
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
      canonical: `${API_URL}/post/${post?.urlLink}`,
      languages: {
        "en-US": `/en-US/post/${post?.blogTitle}`,
        "de-DE": `/de-DE/post/${post?.blogTitle}`,
      },
    },
    openGraph: {
      title: post?.blogTitle,
      description: post?.description,
      url: `${API_URL}/post/${post?.blogTitle}`,
      siteName: "findbestone.com",
      locale: "en_US",
      type: "article",
      authors: ["Arunkumarkdeveloper"],
      images: [
        {
          url: post?.image,
          secureUrl: post?.image,
          alt: `Preview image for ${post?.blogTitle}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "findbestone.com",
      title: post?.blogTitle,
      description: post?.description,
      creator: "Arunkumarkdeveloper",
      images: {
        url: post?.image,
        alt: `Preview image for ${post?.blogTitle}`,
      },
    },
  };
}

const getPost = async (postId: any) => {
  const response = await fetch(`${API_URL}/api/blog/${postId}`, {
    cache: "no-store",
  });
  noStore();
  return response.json();
};

const getPosts = async () => {
  const response = await fetch(`${API_URL}/api/blog`, {
    cache: "no-store",
  });
  noStore();
  return await response.json();
};

const getCommands = async (postId: any) => {
  const response = await fetch(`${API_URL}/api/comment`, {
    cache: "no-store",
  });
  noStore();
  return response.json();
};

const getLikes = async (postId: any) => {
  const response = await fetch(`${API_URL}/api/like`, {
    cache: "no-store",
  });
  noStore();
  return response.json();
};

const getSavedPosts = async () => {
  const response = await fetch(`${API_URL}/api/saved-post`, {
    cache: "no-store",
  });
  noStore();
  return response.json();
};

export default async function page({ params }: { params: { id: any } }) {
  if (!API_URL) {
    return null;
  }

  const _post = getPost(params.id);
  const _comment = getCommands(params.id);
  const _postData = getPosts();
  const _likes = getLikes(params.id);
  const _savedPosts = getSavedPosts();

  const [post, comment, postData, like, savedPosts] = await Promise.all([
    _post,
    _comment,
    _postData,
    _likes,
    _savedPosts,
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <ViewPost
        post={post}
        comment={comment}
        suggestPosts={postData}
        like={like}
        savedPosts={savedPosts}
      />
    </Suspense>
  );
}
