import AddPost from "@/components/AddPost";
import EditPost from "@/components/EditPost";
import { API_URL } from "@/frontend/Path";

const getBlogs = async () => {
  const response = await fetch(`${API_URL}/api/blog`, {
    cache: "no-store",
  });
  return response.json();
};

export default async function Page() {
  if (!API_URL) {
    return null;
  }
  const posts = await getBlogs();

  return (
    <>
      <div className="d-flex justify-content-center mt-30 mb-50">
        <AddPost />
      </div>
      <div className="d-flex justify-content-center mt-30 mb-50 flex-column align-items-center">
        <div className="w-50">
          {posts.reverse().map((post: any) => (
            <EditPost key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
