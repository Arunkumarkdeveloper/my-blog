"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PostEditor from "./PostEditor";

const AddPost = () => {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editorHtml, setEditorHtml] = useState([]);

  console.log("editorHtml: ", editorHtml);

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

  return (
    <React.Fragment>
      <div
        id="post"
        className="d-flex flex-column justify-content-center gap-2 w-50"
      >
        <button onClick={NewtBlog}>Post</button>
        <input
          placeholder="BlogTitle"
          onChange={(e) => setBlogTitle(e.target.value)}
          className="auth-input"
        />
        <input
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          className="auth-input"
        />
        <input
          placeholder="image"
          onChange={(e) => setImage(e.target.value)}
          className="auth-input"
        />

        <PostEditor postData={postData} setEditorHtml={setEditorHtml} />
      </div>
    </React.Fragment>
  );
};

export default AddPost;
