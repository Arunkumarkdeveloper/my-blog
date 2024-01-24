"use client";
import React, { useState } from "react";

export default function SearchFilter({ postData }: { postData: any }) {
  const [searchPost, setSearchPost] = useState("");

  const data = postData.filter((post: any) => {
    return (
      post?.blogTitle.includes(searchPost) ||
      post?.editorHtml.includes(searchPost)
    );
  });

  console.log(data);

  return (
    <div>
      <input
        value={searchPost}
        onChange={(e) => setSearchPost(e.target.value)}
        placeholder="search posts"
      />
      {data.map((post: any) => (
        <div key={post._id}>
          {searchPost && (
            <React.Fragment>
              <h1>{post.blogTitle}</h1>
              <div dangerouslySetInnerHTML={{ __html: post.editorHtml }} />
              <button>
                <a href={post.affliteLink} target="_blank">
                  link
                </a>
              </button>
            </React.Fragment>
          )}
        </div>
      ))}
    </div>
  );
}
