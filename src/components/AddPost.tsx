"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PostEditor from "./PostEditor";
import toast, { Toaster } from "react-hot-toast";
import SEOKeywords from "./SEOKeywords";

const AddPost = () => {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editorHtml, setEditorHtml] = useState([]);
  const [keywords, setKeywords] = useState([]);

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
    seoKeywords: keywords,
  };

  const new_post_added = () => toast.success("New Post added!");

  const NewtBlog = async () => {
    const response = await fetch(`/api/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "Application",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      router.refresh();
      new_post_added();
    }
  };

  return (
    <React.Fragment>
      <Toaster position="top-center" />
      <div className="d-flex flex-column justify-content-center gap-2 editor-post">
        <SEOKeywords postData={postData} setKeywords={setKeywords} />
        {postData.seoKeywords.map((keyword: any, index: number) => (
          <ul key={index}>
            <li>{keyword}</li>
          </ul>
        ))}
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
        <PostEditor
          postData={postData}
          setEditorHtml={setEditorHtml}
          NewtBlog={NewtBlog}
        />
      </div>
    </React.Fragment>
  );
};

export default AddPost;
