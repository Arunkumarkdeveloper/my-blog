"use client";
import React, { useState, useLayoutEffect } from "react";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import Link from "next/link";
import ScreenWidth from "@/frontend/ScreenWidth";

export default function SavedPosts({
  savedPostsLists,
}: {
  savedPostsLists: any;
}) {
  const [screenWidth] = ScreenWidth();
  return (
    <div className="mt-30 mb-30" style={{ minHeight: "50vh" }}>
      {savedPostsLists?.reverse().map((post: any) => (
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
    </div>
  );
}
