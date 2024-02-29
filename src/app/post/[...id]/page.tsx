import { Metadata } from "next";
import dynamic from "next/dynamic";
const ViewPost = dynamic(() => import("@/components/ViewPost"));
import { API_URL } from "@/frontend/Path";
import { unstable_noStore as noStore } from "next/cache";

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

const getCommands = async () => {
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

  const _post = getPost(params.id);
  const _comment = getCommands();
  const _postData = getPosts();
  const _likes = getLikes(params.id);

  const [post, comment, postData, like] = await Promise.all([
    _post,
    _comment,
    _postData,
    _likes,
  ]);

  return (
    <ViewPost
      post={post}
      comment={comment}
      suggestPosts={postData}
      like={like}
    />
  );
}
