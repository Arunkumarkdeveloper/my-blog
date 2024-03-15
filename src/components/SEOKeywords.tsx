"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function SEOKeywords({
  postData,
  setKeywords,
}: {
  postData: any;
  setKeywords: any;
}) {
  const [input, setInput]: any = useState("");

  const addItem = () => {
    setKeywords([...postData.seoKeywords, input.toLowerCase()]);
  };

  useEffect(() => {
    setInput("");
  }, [postData.seoKeywords.length]);

  return (
    <div className="d-flex gap-3">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="auth-input"
        placeholder="SEO Keywords"
      />
      <div
        className="cursor-pointer d-flex align-items-center"
        onClick={addItem}
      >
        <span className="mr-10">
          <img
            src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/add.webp"
            width={30}
            height={30}
            alt="Delete post"
            className="cursor-pointer"
            style={{ width: "30px" }}
          />
        </span>
        <span className="fw-600">keyword</span>
      </div>
    </div>
  );
}
