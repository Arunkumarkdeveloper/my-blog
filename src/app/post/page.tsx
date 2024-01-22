import PostsList from "@/components/PostsList";
import { headers } from "next/headers";

const getPosts = async () => {
  const host = headers().get("host");
  const response = await fetch(`https://${host}/api/blog`, {
    cache: "no-store",
  });

  return response.json();
};

export default async function post() {
  const posts = await getPosts();
  return (
    <div>
      {posts.map((post: any) => (
        <PostsList key={post._id} post={post} />
      ))}
    </div>
  );
}
