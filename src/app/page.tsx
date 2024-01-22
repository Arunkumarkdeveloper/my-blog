import AddPost from "@/components/AddPost";
import EditPost from "@/components/EditPost";
import { headers } from "next/headers";

const getBlogs = async () => {
  const host = headers().get("host");
  const response = await fetch(`https://${host}/api/blog`, {
    cache: "no-store",
  });
  return response.json();
};

export default async function Page() {
  const posts = await getBlogs();

  return (
    <>
      <AddPost />
      <div>
        {posts.map((post: any) => (
          <EditPost key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}
