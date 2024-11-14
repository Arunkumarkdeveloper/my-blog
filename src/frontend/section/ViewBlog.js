"use client";
import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { BlogList } from "./BlogList";
import { calculateReadingTime, currentDate } from "../utility";
import Link from "next/link";

const ViewBlog = ({ blog, blogs, isEdit, type }) => {
  const router = useRouter();
  const blogData = blog?.blogData;
  const auth = useSelector((state) => state.app.auth);

  const readingTime = calculateReadingTime(blogData?.content);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      {isEdit && auth && auth?.email === "findbestonebusiness@gmail.com" && (
        <div className="blog-edit-icons mt-10 mr-25">
          <Image
            src="/images/edit.png"
            width={20}
            height={20}
            alt=""
            title="Edit"
            className="cursor-pointer"
            onClick={() => router?.push(`/admin/blog/edit/${blog?.pageUrl}`)}
          />
        </div>
      )}
      <div className="layout-center">
        <div id="blog" className="blog-responsive">
          <h1 className="mb-15">{blogData?.title}</h1>
          <div className="color-grey">
            <small>{readingTime} min read,</small>
            <small className="ml-20">
              {blog?.date?.length > 0 ? blog?.date : currentDate()}
            </small>
          </div>
          <p>{blogData?.description}</p>
          {blogData?.titleImage && <img src={blogData?.titleImage} alt="" />}
          <div dangerouslySetInnerHTML={{ __html: blogData?.content }}></div>
          {type === "view" && (
            <React.Fragment>
              <hr className="mb-30 mt-30" />
              <h3 className="color-green" style={{ margin: "auto" }}>
                Featured Posts
              </h3>
            </React.Fragment>
          )}
        </div>
      </div>
      <BlogList blogs={blogs} />
      {type === "view" && (
        <div className="text-center">
          <Link href="/blog" className="color-green">
            <span>View More...</span>
          </Link>
        </div>
      )}
    </React.Fragment>
  );
};
export default ViewBlog;