import PostsList from "@/components/PostsList";
import { headers } from "next/headers";

const getPosts = async () => {
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";
  const response = await fetch(`${protocal}://${host}/api/blog`, {
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
