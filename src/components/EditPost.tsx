"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const EditPost = ({ post }: { post: any }) => {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editorHtml, setEditorHtml] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  let link = blogTitle
    ?.match(/[^!@#$%^&*?{},.;:/+~()<>]/g)
    ?.join("")
    ?.toLocaleLowerCase()
    ?.replaceAll(" ", "-");

  const postData = {
    image: image,
    blogTitle: blogTitle,
    description: description,
    urlLink: link,
    editorHtml: editorHtml,
  };
  const editPost = async (id: string) => {
    setIsEdit(false);
    const response = await fetch(`/api/blog/${id}`, {
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
    const response = await fetch(`/api/blog/${id}`, {
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
            placeholder="image"
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            placeholder="BlogTitle"
            onChange={(e) => setBlogTitle(e.target.value)}
          />
          <input
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            value={editorHtml}
            onChange={(e) => setEditorHtml(e.target.value)}
            rows={20}
          />
          <button onClick={() => editPost(post._id)}>Post</button>
        </div>
      )}
    </>
  );
};

export default EditPost;
