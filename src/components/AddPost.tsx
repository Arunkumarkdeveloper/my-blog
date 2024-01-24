"use client";
import React, { useState } from "react";
import EditorQuill from "./EditorQuill";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddPost = () => {
  const router = useRouter();
  const [blogTitle, setBlogTitle] = useState("");
  const [editorHtml, setEditorHtml] = useState("");
  const [affliteLink, setAffliteLink] = useState("");

  const postData = {
    blogTitle,
    editorHtml,
    affliteLink,
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
    <div>
      <h2>email: {session?.user?.email}</h2>
      <input
        placeholder="BlogTitle"
        onChange={(e) => setBlogTitle(e.target.value)}
      />
      <EditorQuill editorHtml={editorHtml} setEditorHtml={setEditorHtml} />
      <input
        placeholder="AffliteLink"
        onChange={(e) => setAffliteLink(e.target.value)}
      />
      <button onClick={NewtBlog}>Post</button>
    </div>
  );
};

export default AddPost;
