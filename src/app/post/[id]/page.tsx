import ViewPost from "@/components/ViewPost";
import { Metadata } from "next";
import { headers } from "next/headers";

const getPost = async (postId: any) => {
  const headersData = headers();
  const protocol = headersData.get("x-forwarded-proto");
  const host = headersData.get("host");
  const response = await fetch(`${protocol}://${host}/api/blog/${postId}`, {
    cache: "no-store",
  });
  return response.json();
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await getPost(params.id);
  return {
    title: post.blogTitle,
    description: `This is the page of ${post.blogTitle}`,
  };
}

export default async function page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  return (
    <div>
      <ViewPost post={post} />
    </div>
  );
}
