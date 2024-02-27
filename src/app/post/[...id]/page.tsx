import { Metadata } from "next";
import dynamic from "next/dynamic";
const ViewPost = dynamic(() => import("@/components/ViewPost"));
import { API_URL } from "@/frontend/Path";

const getPost = async (postId: any) => {
  const response = await fetch(`${API_URL}/api/blog/${postId}`, {
    cache: "no-store",
  });
  return response.json();
};

const getPosts = async () => {
  const response = await fetch(`${API_URL}/api/blog`, {
    cache: "no-store",
  });

  return response.json();
};

const getCommands = async () => {
  const response = await fetch(`${API_URL}/api/comment`, {
    cache: "no-store",
  });

  return response.json();
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await getPost(params?.id);
  return {
    title: post?.blogTitle,
    description: `This is the page of ${post?.blogTitle}`,
    keywords: [post?.blogTitle, "product", "offer", "best"],
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
    alternates: {
      canonical: `/post/${post?.blogTitle}`,
      languages: {
        "en-US": `/en-US/post/${post?.blogTitle}`,
        "de-DE": `/de-DE/post/${post?.blogTitle}`,
      },
    },
    openGraph: {
      title: post?.blogTitle,
      description: post?.blogTitle,
      url: `${API_URL}/post/${post?.blogTitle}`,
      siteName: "Find Best One",
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function page({ params }: { params: { id: any } }) {
  if (!API_URL) {
    return null;
  }
  const post = await getPost(params.id);
  const comment = await getCommands();
  const postData = await getPosts();
  return <ViewPost post={post} comment={comment} suggestPosts={postData} />;
}
