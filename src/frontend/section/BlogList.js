"use client";
import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import PaginationComponent from "./PaginatedItems";

export const BlogList = ({ blogs, blogsPagination, isPagination }) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const router = useRouter();

  return (
    <div className="layout-center">
      <div className="blog-responsive mt-20">
        {blogs?.map((item, index) => (
          <div
            key={index}
            className="blog-card mb-30"
            onClick={() => {
              router.replace(`/blog/${item?._id?.pageUrl}`);
            }}>
            <img className="blog-card-image" src={item?._id?.titleImage} />
            <div className="blog-card-content">
              <h4 className="blog-card-title two-line-text">
                {item?._id?.title}
              </h4>
              <p className="two-line-text mt-10">{item?._id?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {isPagination && (
        <PaginationComponent blogsPagination={blogsPagination} />
      )}
    </div>
  );
};
