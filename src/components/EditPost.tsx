"use client";
import React, { useState } from "react";
import EditorQuill from "./EditorQuill";
import { useRouter } from "next/navigation";

const EditPost = ({ post }: { post: any }) => {
  const router = useRouter();
  const [blogTitle, setBlogTitle] = useState(post.blogTitle);
  const [editorHtml, setEditorHtml] = useState(post.editorHtml);
  const [affliteLink, setAffliteLink] = useState(post.affliteLink);
  const [isEdit, setIsEdit] = useState(false);

  const postData = {
    blogTitle,
    editorHtml,
    affliteLink,
  };

  const editPost = async (id: string) => {
    setIsEdit(false);
    const response = await fetch(`http://localhost:3000/api/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(postData),
    });
    if (response.ok) {
      router.refresh();
    }
  };

  const deletePost = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      },
    });
    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <>
      <div>
        <h2>{post.blogTitle}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.editorHtml }} />
        <button onClick={() => setIsEdit(true)}>edit</button>
        <button onClick={() => deletePost(post._id)}>delete</button>
      </div>

      {isEdit && (
        <div>
          <input
            placeholder="BlogTitle"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
          />
          <EditorQuill editorHtml={editorHtml} setEditorHtml={setEditorHtml} />
          <input
            placeholder="AffliteLink"
            value={affliteLink}
            onChange={(e) => setAffliteLink(e.target.value)}
          />
          <button onClick={() => editPost(post._id)}>Post</button>
        </div>
      )}
    </>
  );
};

export default EditPost;
