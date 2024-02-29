"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function ViewPost({
  post,
  comment,
  suggestPosts,
  like,
}: {
  post: any;
  comment: any;
  suggestPosts: any;
  like: any;
}) {
  const { _id, image, blogTitle, description, editorHtml } = post;

  const postComments = comment.filter((cmt: any) => {
    return _id === cmt?.postId;
  });

  const router = useRouter();
  const [comments, setComments] = useState("");
  const { data: session } = useSession();

  const toast_success = () => toast.success("Comment added!");
  const please_login = () => toast.error("Login please!");

  const AddComment = async () => {
    if (session) {
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
        toast_success();
      }
    } else {
      please_login();
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  const _likes = like.filter((count: any) => {
    return _id === count.postId;
  });

  const [likeCount, setLikeCount] = useState(_likes.length);

  const _active_like = _likes.filter(
    (item: any) => session?.user?.email === item.userId
  );

  console.log(_active_like);

  const AddLike = async () => {
    if (session && _active_like.length === 0) {
      setLikeCount(_likes.length + 1);

      const response = await fetch(`/api/like/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ userId: session?.user?.email }),
      });

      if (response.ok) {
        router.refresh();
      }
    } else if (!session) {
      please_login();
      setTimeout(() => {
        router.push("/login");
      }, 3000);
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
          {editorHtml.map((_html_editor: string, index: number) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: _html_editor }}
            ></div>
          ))}
          <div className="d-flex w-25 align-items-center gap-3">
            <span>
              <Image
                src={
                  _active_like.length === 0
                    ? "/image/like.png"
                    : "/image/like_active.png"
                }
                alt="like"
                width={25}
                height={25}
                onClick={AddLike}
                className={
                  _active_like.length === 0 && session ? "cursor-pointer" : ""
                }
              />
            </span>
            <span className="fw-600 mt-5">{_likes.length}</span>
          </div>
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
          <Toaster position="top-center" />
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
