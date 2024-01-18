import PostsList from "@/components/PostsList";

const getPosts = async () => {
  const response = await fetch(`${process.env.API_URL}/api/blog`, {
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
