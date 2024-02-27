import { Metadata } from "next";
import SearchFilter from "@/components/SearchFilter";
import { API_URL } from "@/frontend/Path";

const getPosts = async () => {
  const response = await fetch(`${API_URL}/api/blog`, {
    cache: "no-store",
  });

  return response.json();
};

export const metadata: Metadata = {
  title: "posts",
  description: "post lists",
};

export default async function post() {
  if (!API_URL) {
    return null;
  }
  const postData = await getPosts();

  return (
    <div>
      <SearchFilter postData={postData.reverse()} />
    </div>
  );
}
