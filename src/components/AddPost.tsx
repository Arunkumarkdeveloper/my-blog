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
  const [affiliateLink, setAffiliateLink] = useState("");
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
    affiliateLink: affiliateLink,
    blogTitle: blogTitle,
    description: description,
    urlLink: link,
    editorHtml: editorHtml,
    seoKeywords: keywords,
  };

  const new_post_added = () => toast.success("New Post added!");
  const requiredAll = () => toast.error("All fields are required!");

  const NewtBlog = async () => {
    if (
      image.length > 0 &&
      affiliateLink.length > 0 &&
      blogTitle.length > 0 &&
      description.length > 0 &&
      editorHtml.length > 0 &&
      keywords.length > 0
    ) {
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
    } else {
      requiredAll();
    }
  };

  return (
    <React.Fragment>
      <Toaster position="top-center" />
      <div className="d-flex flex-column justify-content-center gap-2 editor-post">
        <input
          placeholder="Affilite Link"
          onChange={(e) => setAffiliateLink(e.target.value)}
          className="auth-input"
        />
        <SEOKeywords postData={postData} setKeywords={setKeywords} />
        {postData.seoKeywords.map((keyword: any, index: number) => (
          <ul key={index}>
            <li>{keyword}</li>
          </ul>
        ))}
        <br />
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
          affiliateLink={affiliateLink}
          postData={postData}
          setEditorHtml={setEditorHtml}
          NewtBlog={NewtBlog}
        />
      </div>
    </React.Fragment>
  );
};

export default AddPost;
