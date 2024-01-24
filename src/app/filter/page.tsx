import SearchFilter from "@/components/SearchFilter";

const getPosts = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`, {
    cache: "no-store",
  });

  return response.json();
};

export default async function page() {
  const postData = await getPosts();

  return (
    <div>
      <SearchFilter postData={postData} />
    </div>
  );
}
