import { API_URL } from "@/frontend/Path";;
import SavedPosts from "@/components/SavedPosts";

const getSavedPosts = async (userId: any) => {
  const response = await fetch(`${API_URL}/api/saved-posts/${userId}`, {
    cache: "no-store",
  });

  return response.json();
};

export default async function page({ params }: { params: { id: any } }) {
  const userId = params.id;
  const savedPostsLists = await getSavedPosts(userId);

  return <SavedPosts savedPostsLists={savedPostsLists} />;
}
