"use client";
import React, { useState } from "react";
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

  return (
    <div>
      {data?.map((post: any) => (
        <div
          key={post?._id}
          className="d-flex justify-content-center mb-50 mt-50"
        >
          <div className="posts">
            <Link href={`/post/${post?.urlLink}`} prefetch={true}>
              <div className="post-group">
                <img src={post?.image} className="posts-image mr-25" />
                <div>
                  <h6 className="fw-600 mb-10">{post?.blogTitle}</h6>
                  <p>{post?.description.toString().slice(0, 145)} . . .</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
