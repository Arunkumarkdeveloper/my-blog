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
    if (input.length > 1) {
      setKeywords([...postData.seoKeywords, input.toLowerCase()]);
    }
  };

  useEffect(() => {
    setInput("");
  }, [postData.seoKeywords.length]);

  return (
    <div className="d-flex gap-3 mb-20 mt-20">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="auth-input"
        placeholder="SEO Keywords"
      />
      <div className="cursor-pointer d-flex align-items-center">
        <img
          src="/image/add.webp"
          width={25}
          height={25}
          alt="Delete post"
          title="Delete post"
          className="cursor-pointer"
          style={{ width: "25px" }}
          onClick={addItem}
        />
      </div>
    </div>
  );
}
