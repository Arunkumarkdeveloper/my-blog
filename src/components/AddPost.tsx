"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddPost = () => {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editorHtml, setEditorHtml] = useState("");

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

  const NewtBlog = async () => {
    await fetch(`/api/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "Application",
      },
      body: JSON.stringify(postData),
    });
    router.refresh();
  };
  const { data: session } = useSession();

  return (
    <div className="d-flex flex-column gap-2 w-50">
      <h2>email: {session?.user?.email}</h2>
      <input placeholder="image" onChange={(e) => setImage(e.target.value)} />
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
      <button onClick={NewtBlog}>Post</button>
    </div>
  );
};

export default AddPost;
