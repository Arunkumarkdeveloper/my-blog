"use client";
import React, { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Loading from "@/frontend/Loading";

export default function ViewPost({
  post,
  comment,
  suggestPosts,
  like,
  savedPosts,
}: {
  post: any;
  comment: any;
  suggestPosts: any;
  like: any;
  savedPosts: any;
}) {
  const { _id, affiliateLink, image, blogTitle, description, editorHtml } =
    post;

  const postComments = comment.filter((cmt: any) => {
    return _id === cmt?.postId;
  });

  const _suggests = suggestPosts.filter((post: any) => {
    return _id !== post._id;
  });

  const router = useRouter();
  const { data: session } = useSession();

  const [comments, setComments] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [commentId, setIsCommentId] = useState(comments);
  const [text, setText] = useState(comments);
  const [isEditComment, setIsEditComment] = useState(false);

  const toast_success = () => toast.success("Comment added!");
  const please_login = () => toast.error("Login please!");

  const liked = () => toast.success("You are Liked this post!");
  const unliked = () => toast.success("You are Unliked this post!");

  const saved = () => toast.success("This post are Saved!");
  const unsaved = () => toast.success("This post are Unsaved!");

  const edit_comment = () => toast.success("comment Updated!");
  const delete_comment = () => toast.success("comment Deleted!");

  const _likes = like.filter((count: any) => {
    return _id === count.postId;
  });

  const _active_like = _likes.filter(
    (item: any) => session?.user?.email === item.userId
  );

  const savedCount = savedPosts.filter((post: any) => {
    return _id === post.postId;
  });

  const checkIsSavedPost = savedCount.filter((checkSaved: any) => {
    return session?.user?.email === checkSaved.userId;
  });

  useEffect(() => {
    setIsLike(false);
    setIsSaved(false);
  }, [_likes.length, savedCount.length]);

  const AddComment = async () => {
    if (session) {
      const response = await fetch(`/api/comment/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: _id,
          userName: session?.user?.name,
          userId: session?.user?.email,
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

  const UpdateComment = async (cmts: any) => {
    setIsEditComment(false);
    const response = await fetch(`/api/edit-comment/${cmts._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Applcation/json",
      },
      body: JSON.stringify({
        postId: cmts.postId,
        userName: cmts.userName,
        userId: cmts.userId,
        commentText: text,
        currentUserId: session?.user?.email,
      }),
    });

    if (response.ok) {
      router.refresh();
      edit_comment();
    }
  };

  const DeleteComment = async (commentId: any) => {
    const response = await fetch(`/api/edit-comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      router.refresh();
      delete_comment();
    }
  };

  const EditComment = async (cmts: any) => {
    setIsEditComment(!isEditComment);
    setIsCommentId(cmts._id);
    setText(cmts.commentText);
  };

  const AddLike = async () => {
    if (session && _active_like.length <= 0 && !isLike) {
      setIsLike(true);

      const response = await fetch(`/api/like/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user?.email }),
      });

      if (response.ok) {
        router.refresh();
        liked();
      }
    } else if (!session) {
      please_login();
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else if (session && _active_like.length === 1) {
      const response_likes = await fetch(`/api/like/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user?.email }),
      });

      if (response_likes.ok) {
        router.refresh();
        unliked();
      }
    }
  };

  const SavedPost = async () => {
    if (session && checkIsSavedPost.length <= 0 && !isSaved) {
      setIsSaved(true);
      const response = await fetch(`/api/saved-post/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user?.email }),
      });

      if (response.ok) {
        router.refresh();
        saved();
      }
    } else if (!session) {
      please_login();
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else if (session && checkIsSavedPost.length === 1) {
      const response = await fetch(`/api/saved-post/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user?.email }),
      });

      if (response.ok) {
        router.refresh();
        unsaved();
      }
    }
  };

  const [screenWidth, setScreenWidth]: any = useState(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <React.Suspense fallback={<Loading />}>
      <React.Fragment>
        <div id="post" className="d-flex justify-content-center">
          <div className="view-post mt-20">
            <h1 className="fw-900 line-height-normal font-25">{blogTitle}</h1>
            <hr />
            <p>{description}</p>
            <div className="d-flex justify-content-center">
              <a href={affiliateLink} target="_blank">
                <img src={image} alt={blogTitle} title={blogTitle} />
              </a>
            </div>
            {editorHtml.map((_html_editor: string, index: number) => (
              <div
                className={
                  _html_editor.slice(0, 2) == "<a" ||
                  _html_editor.slice(0, 4) == "<img"
                    ? "d-flex justify-content-center"
                    : ""
                }
                key={index}
                dangerouslySetInnerHTML={{ __html: _html_editor }}
              ></div>
            ))}
            <div className="d-flex align-items-center gap-5 mt-40 mb-20">
              <span className="d-flex align-items-center gap-2">
                <span id="activity">
                  <img
                    src={
                      _active_like.length === 0
                        ? "https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/like.webp"
                        : "https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/like_active.webp"
                    }
                    alt="like"
                    title="like"
                    width={20}
                    height={20}
                    onClick={AddLike}
                    className="cursor-pointer"
                  />
                </span>
                <span className="fw-600 mt-5">{_likes.length}</span>
              </span>
              <span className="d-flex align-items-center gap-2">
                <span id="activity">
                  <img
                    src={
                      checkIsSavedPost.length === 0
                        ? "https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/unsaved.webp"
                        : "https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/saved.webp"
                    }
                    alt="saved"
                    title="saved"
                    width={20}
                    height={20}
                    onClick={SavedPost}
                    className="cursor-pointer w-100"
                  />
                </span>
                <span className="fw-600 mt-5">{savedCount.length}</span>
              </span>
              <span className="d-flex align-items-center gap-2">
                <span id="activity">
                  <img
                    src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/comments.webp"
                    alt="comments"
                    title="comments"
                    width={20}
                    height={20}
                    className="cursor-pointer w-100"
                  />
                </span>
                <span className="fw-600 mt-5">{postComments.length}</span>
              </span>
            </div>
            <hr />
          </div>
        </div>

        <div id="post-comment" className="d-flex justify-content-center">
          <div className="view-post">
            <p className="fw-700 mb-15 mt-10 font-16">Comments</p>
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
                  {cmts.userName.toString().slice(0, 1).toUpperCase()}
                </div>
                <div className="w-100">
                  <p className="fw-600">{cmts.userName}</p>

                  {isEditComment === true &&
                  commentId === cmts._id &&
                  session?.user?.email === cmts.userId ? (
                    <div className="mb-10">
                      <div
                        className="d-flex mb-10 justify-content-end cursor-pointer"
                        onClick={() => UpdateComment(cmts)}
                      >
                        <img
                          src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/update.webp"
                          width={20}
                          height={20}
                          alt="Delete post"
                          title="Delete post"
                          className="cursor-pointer"
                        />
                        <span className="ml-10">Update</span>
                      </div>
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add a comment"
                      />
                    </div>
                  ) : (
                    <p style={{ lineHeight: "2" }}>{cmts.commentText}</p>
                  )}
                  {session?.user?.email === cmts.userId && (
                    <div className="d-flex gap-3 mb-15">
                      <img
                        src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/edit.webp"
                        width={15}
                        height={15}
                        alt="edit post"
                        title="edit post"
                        className="cursor-pointer"
                        onClick={() => EditComment(cmts)}
                      />
                      <img
                        src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/delete.webp"
                        width={15}
                        height={15}
                        alt="Delete post"
                        title="Delete post"
                        className="cursor-pointer"
                        onClick={() => DeleteComment(cmts._id)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <hr />
            <p className="fw-700 mb-20 font-16">Suggests Posts</p>
            {_suggests
              ?.slice(0, 50)
              ?.reverse()
              .map((post: any) => (
                <>
                  <div
                    key={post._id}
                    className="d-flex justify-content-center mb-15"
                  >
                    <div className="posts w-100">
                      <Link href={`/${post.urlLink}`}>
                        <div className="post-group">
                          <img
                            src={post.image}
                            className="posts-image"
                            alt={post.blogTitle}
                            title={post.blogTitle}
                          />
                          <div>
                            <h1
                              className="fw-600 mb-10 line-height-normal"
                              style={{
                                fontSize: screenWidth < 600 ? "13px" : "14px",
                              }}
                            >
                              {post?.blogTitle}
                            </h1>
                            {screenWidth > 600 && (
                              <p className="line-height-normal">
                                {post?.description.toString().slice(0, 141)} . .
                                .
                              </p>
                            )}
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
    </React.Suspense>
  );
}
