"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function ViewPost({
  post,
  comment,
}: {
  post: any;
  comment: any;
}) {
  const { _id, blogTitle, editorHtml, affliteLink } = post;

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
    }
  };

  return (
    <div>
      <h1>{blogTitle}</h1>
      <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
      <button>
        <a href={affliteLink} target="_blank">
          visit
        </a>
      </button>
      <input
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        placeholder="add a comment"
      />
      <button onClick={AddComment}>add comment</button>
      {postComments.map((cmts: any) => (
        <div key={cmts._id}>
          <span>{cmts.user}</span>---
          <span>{cmts.commentText}</span>
        </div>
      ))}
    </div>
  );
}
