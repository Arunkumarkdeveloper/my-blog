"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function SearchFilter({ postData }: { postData: any }) {
  const _search = useSelector((state: any) => state.search.value);

  const data = postData?.filter((post: any) => {
    return (
      post?.blogTitle?.toLowerCase()?.includes(_search?.toLowerCase()) ||
      post?.description?.toLowerCase()?.includes(_search?.toLowerCase()) ||
      post?.editorHtml
        ?.toString()
        .toLowerCase()
        ?.includes(_search?.toLowerCase())
    );
  });

  const [screenWidth, setScreenWidth]: any = useState(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mt-30">
      {data?.map((post: any) => (
        <div key={post?._id} className="d-flex justify-content-center mb-15">
          <div className="posts">
            <Link href={`/${post?.urlLink}`}>
              <div className="post-group">
                <img
                  src={post?.image}
                  className="posts-image"
                  alt={post?.blogTitle}
                  title={post?.blogTitle}
                />
                <div>
                  <h1
                    className="fw-600 mb-10 line-height-normal"
                    style={{ fontSize: screenWidth < 600 ? "13px" : "14px" }}
                  >
                    {post?.blogTitle}
                  </h1>
                  {screenWidth > 600 && (
                    <p className="line-height-normal">
                      {post?.description.toString().slice(0, 141)} . . .
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
      {data.length === 0 && (
        <div className="no-posts">
          <h2 className="fw-600">No Related Posts!</h2>
        </div>
      )}
    </div>
  );
}
