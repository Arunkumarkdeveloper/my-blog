import AddPost from "@/components/AddPost";
import EditPost from "@/components/EditPost";

const getBlogs = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
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
