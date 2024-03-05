import { API_URL } from "@/frontend/Path";
import Link from "next/link";
import { decode as base64_decode, encode as base64_encode } from "base-64";

const getSavedPosts = async (userId: any) => {
  const response = await fetch(`${API_URL}/api/saved-posts/${userId}`, {
    cache: "no-store",
  });

  return response.json();
};

export default async function page({ params }: { params: { id: any } }) {
  const userId = params.id;
  const savedPostsLists = await getSavedPosts(userId);

  return (
    <div>
      {savedPostsLists?.reverse().map((post: any) => (
        <div
          key={post?._id}
          className="d-flex justify-content-center mb-50 mt-50"
        >
          <div className="posts">
            <Link href={`/post/${post?.urlLink}`} prefetch={true}>
              <div className="post-group">
                <img src={post?.image} className="posts-image mr-25" />
                <div>
                  <h6 className="fw-600 mb-10">{post?.blogTitle}</h6>
                  <p>{post?.description.toString().slice(0, 145)} . . .</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
