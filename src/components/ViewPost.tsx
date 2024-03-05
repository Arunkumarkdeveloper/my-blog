"use client";
import React, { useEffect } from "react";
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
  savedPosts,
}: {
  post: any;
  comment: any;
  suggestPosts: any;
  like: any;
  savedPosts: any;
}) {
  const { _id, image, blogTitle, description, editorHtml } = post;

  const postComments = comment.filter((cmt: any) => {
    return _id === cmt?.postId;
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
          "Content-Type": "Application/json",
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
        "Content-Type": "Application/json",
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
          "Content-Type": "Application/json",
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
          "Content-Type": "Application/json",
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
          "Content-Type": "Application/json",
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
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ userId: session?.user?.email }),
      });

      if (response.ok) {
        router.refresh();
        unsaved();
      }
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
              className={
                _html_editor.slice(0, 2) == "<a"
                  ? "d-flex justify-content-center"
                  : ""
              }
              key={index}
              dangerouslySetInnerHTML={{ __html: _html_editor }}
            ></div>
          ))}
          <div className="d-flex align-items-center gap-5">
            <span className="d-flex align-items-center gap-2">
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
                  className="cursor-pointer"
                />
              </span>
              <span className="fw-600 mt-5">{_likes.length}</span>
            </span>
            <span className="d-flex align-items-center gap-2">
              <span>
                <Image
                  src={
                    checkIsSavedPost.length === 0
                      ? "/image/unsaved.png"
                      : "/image/saved.png"
                  }
                  alt="like"
                  width={25}
                  height={25}
                  onClick={SavedPost}
                  className="cursor-pointer"
                />
              </span>
              <span className="fw-600 mt-5">{savedCount.length}</span>
            </span>
            <span className="d-flex align-items-center gap-2">
              <span>
                <Image
                  src="/image/comments.png"
                  alt="comments"
                  width={25}
                  height={25}
                  className="cursor-pointer"
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
                {cmts.userName.toString().slice(0, 1).toUpperCase()}
              </div>
              <div className="w-100">
                <p>{cmts.userName}</p>

                {isEditComment === true &&
                commentId === cmts._id &&
                session?.user?.email === cmts.userId ? (
                  <div className="mb-10">
                    <div
                      className="d-flex mb-10 justify-content-end cursor-pointer"
                      onClick={() => UpdateComment(cmts)}
                    >
                      <Image
                        src="/image/update.png"
                        width={20}
                        height={20}
                        alt="Delete post"
                        className="cursor-pointer"
                        quality={100}
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
                    <Image
                      src="/image/edit.png"
                      width={15}
                      height={15}
                      alt="Delete post"
                      className="cursor-pointer"
                      quality={100}
                      onClick={() => EditComment(cmts)}
                    />
                    <Image
                      src="/image/delete.png"
                      width={15}
                      height={15}
                      alt="Delete post"
                      className="cursor-pointer"
                      quality={100}
                      onClick={() => DeleteComment(cmts._id)}
                    />
                  </div>
                )}
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
