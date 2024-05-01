"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import ScreenWidth from "@/frontend/ScreenWidth";
import { useSession } from "next-auth/react";

export default function SearchFilter({ postData }: { postData: any }) {
  const { data: session } = useSession();
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

  const [screenWidth] = ScreenWidth();

  return (
    <React.Fragment>
      {session?.user?.email === "arunkumarkdeveloper@gmail.com" && (
        <div className="mt-10 d-flex justify-content-center">
          <span className="mr-10">
            <Link href="/add">Create</Link>
          </span>
          <span>
            <Link href="/edit-post">Edit</Link>
          </span>
        </div>
      )}
      {data?.map((post: any) => (
        <div
          key={post?._id}
          className="d-flex justify-content-center mb-15 mt-30"
        >
          <div className="posts">
            <Link href={`/${post?.urlLink}`}>
              <div className="post-group">
                <img
                  src={post?.image}
                  className="posts-image"
                  alt={post?.blogTitle}
                  title={post?.blogTitle}
                  style={{ minWidth: "20%" }}
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
          <h2 className="fw-600 font-16">No Related Posts!</h2>
        </div>
      )}
    </React.Fragment>
  );
}
