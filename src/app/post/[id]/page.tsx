import ViewPost from "@/components/ViewPost";
import { Metadata } from "next";

const getPost = async (postId: any) => {
  const response = await fetch(`http://localhost:3000/api/blog/${postId}`, {
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
