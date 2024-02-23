"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ViewPost({
  post,
  comment,
  suggestPosts,
}: {
  post: any;
  comment: any;
  suggestPosts: any;
}) {
  const { _id, image, blogTitle, description, editorHtml } = post;

  const postComments = comment.filter((cmt: any) => {
    return _id === cmt?.postId;
  });

  const router = useRouter();
  const [comments, setComments] = useState("");
  const { data: session } = useSession();

  const AddComment = async () => {
    const response = await fetch(`/api/comment/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        postId: _id,
        user: session?.user?.name,
        commentText: comments,
      }),
    });

    if (response.ok) {
      router.refresh();
      setComments("");
    }
  };

  return (
    <React.Fragment>
      <div id="post" className="d-flex justify-content-center">
        <div className="view-post mt-20">
          <h2 className="fw-900">{blogTitle}</h2>
          <hr />
          <p>{description}</p>
          <img src={image} />
          <div
            className="mb-30"
            dangerouslySetInnerHTML={{ __html: editorHtml }}
          />
          <hr />
        </div>
      </div>
      <div id="post-comment" className="d-flex justify-content-center">
        <div className="view-post">
          <h6 className="fw-700 mb-15 mt-10">Comments</h6>
          <div className="mb-10">
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Add a comment"
            />
          </div>
          <button className="mb-30 cmt-btn" onClick={AddComment}>
            Send
          </button>
          {postComments?.reverse()?.map((cmts: any) => (
            <div key={cmts._id} className="d-flex gap-3 mb-15">
              <div className="user-circle">
                {cmts.user.toString().slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p>{cmts.user}</p>
                <p style={{ lineHeight: "2" }}>{cmts.commentText}</p>
              </div>
            </div>
          ))}
          <hr />
          {suggestPosts
            ?.slice(0, 10)
            ?.reverse()
            .map((post: any) => (
              <>
                <div
                  key={post._id}
                  className="d-flex justify-content-center mb-30 mt-30"
                >
                  <div className="posts w-100">
                    <Link href={`/post/${post.urlLink}`} prefetch={true}>
                      <div className="post-group">
                        <img src={post.image} className="posts-image mr-25" />
                        <div>
                          <h6 className="fw-600 mb-10">{post.blogTitle}</h6>
                          <p>
                            {post.description.toString().slice(0, 145)} . . .
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
}
