import AddPost from "@/components/AddPost";
import EditPost from "@/components/EditPost";
import Link from "next/link";

const getBlogs = async () => {
  const response = await fetch(`http://localhost:3000/api/blog`, {
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
