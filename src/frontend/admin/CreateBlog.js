"use client";
import React, { useState } from "react";
import EditorQuill from "./Editor";
import Image from "next/image";
import Keywords from "./Keywords";
import ViewBlog from "../section/ViewBlog";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const newBlog = {
  blogData: {
    title: "",
    description: "",
    titleImage: "",
    content: "",
  },
  keywords: [],
  pageUrl: "",
};

const CreateBlog = ({ type, blog, jwtToken }) => {
  const disPatch = useDispatch();
  const router = useRouter();

  const originalData = type === "create" ? newBlog : blog;
  const [data, setData] = useState(originalData?.blogData);
  const [keywords, setKeywords] = useState(originalData?.keywords);
  const [isEditKeyword, setIsEditKeyword] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const pageUrl = data?.title
    ?.match(/[^!@#$%^&*?{},.;:/+~()<>]/g)
    ?.join("")
    ?.toLocaleLowerCase()
    ?.replaceAll(" ", "-");

  const updatedData = { blogData: data, keywords, pageUrl };

  function uploadFile(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      // setFile(reader.result);
      setData({ ...data, ["titleImage"]: reader.result });
    };

    reader.readAsDataURL(selectedFile);
  }

  const handleChange = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const createBlog = async () => {
    const response = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        blogData: data,
        keywords: keywords,
        pageUrl: pageUrl,
      }),
    });
    if (response.ok) {
      alert("blog created");
      router?.push(`/blog/${pageUrl}`);
    }
  };

  const editBlog = async () => {
    const response = await fetch(`/api/blog/${originalData?.pageUrl}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        blogData: data,
        keywords: keywords,
        pageUrl: pageUrl,
      }),
    });
    if (response.ok) {
      alert("blog updated");
      router?.push(`/blog/${pageUrl}`);
    }
  };

  const deleteBlog = async () => {
    const response = await fetch(`/api/blog/${originalData?.pageUrl}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (response.ok) {
      alert("blog deleted");
      router?.push("/blog");
    }
  };

  return (
    <React.Fragment>
      {!isPreview ? (
        <div className="layout-center">
          <div className="blog-edit-layout mt-30">
            {isEditKeyword ? (
              <Keywords
                data={keywords}
                setData={setKeywords}
                setIsEditKeyword={setIsEditKeyword}
              />
            ) : (
              <React.Fragment>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <Image
                      src="/images/keyword.png"
                      width={20}
                      height={20}
                      alt=""
                      onClick={() => setIsEditKeyword(true)}
                      className="cursor-pointer"
                    />
                    <Image
                      src="/images/preview.png"
                      width={30}
                      height={30}
                      alt=""
                      className="cursor-pointer ml-10"
                      onClick={() => setIsPreview(true)}
                    />
                  </div>
                </div>
                <input
                  className="input"
                  placeholder="Title Image"
                  style={{ padding: "15px 20px 12px 20px" }}
                  value={data?.titleImage}
                  name="titleImage"
                  onChange={handleChange}
                />
                <input
                  className="input"
                  placeholder="Title"
                  style={{ padding: "15px 20px 12px 20px" }}
                  value={data?.title}
                  name="title"
                  onChange={handleChange}
                />
                <textarea
                  className="input"
                  placeholder="Description"
                  style={{ padding: "15px 20px 12px 20px", resize: "none" }}
                  rows={5}
                  value={data?.description}
                  name="description"
                  onChange={handleChange}
                />
                <div className="scroll-x">
                  <EditorQuill data={data} setData={setData} />
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="blog-edit-icons mt-10 mr-25">
            <Image
              src="/images/edit.png"
              width={20}
              height={20}
              alt=""
              title="Edit"
              onClick={() => setIsPreview(false)}
              className="cursor-pointer"
            />
            {type === "create" && (
              <Image
                src="/images/add.png"
                width={20}
                height={20}
                alt=""
                title="Create"
                onClick={createBlog}
                className="cursor-pointer"
              />
            )}
            {type === "edit" && (
              <React.Fragment>
                <Image
                  src="/images/update.png"
                  width={20}
                  height={20}
                  alt=""
                  title="Update"
                  onClick={editBlog}
                  className="cursor-pointer"
                />
                <Image
                  src="/images/delete.png"
                  width={20}
                  height={20}
                  alt=""
                  title="Delete"
                  onClick={deleteBlog}
                  className="cursor-pointer"
                />
              </React.Fragment>
            )}
          </div>
          <ViewBlog
            blog={updatedData}
            type={type}
            createBlog={createBlog}
            deleteBlog=""
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CreateBlog;
