import { Metadata } from "next";
// import SearchFilter from "@/components/SearchFilter";
import dynamic from "next/dynamic";
const SearchFilter = dynamic(() => import("@/components/SearchFilter"));

const getPosts = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`, {
    cache: "no-store",
  });

  return response.json();
};

export const metadata: Metadata = {
  title: "posts",
  description: "post lists",
};

export default async function post() {
  const postData = await getPosts();

  return (
    <div>
      <SearchFilter postData={postData.reverse()} />
    </div>
  );
}
