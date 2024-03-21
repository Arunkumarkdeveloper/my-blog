"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

const EditPost = ({ post }: { post: any }) => {
  const router = useRouter();
  const [image, setImage] = useState(post.image);
  const [blogTitle, setBlogTitle] = useState(post.blogTitle);
  const [description, setDescription] = useState(post.description);
  const [editorHtml, setEditorHtml] = useState(post.editorHtml);
  const [isEdit, setIsEdit] = useState(false);

  const [isConfirm, setIsConfirm] = useState(false);

  let link = blogTitle
    ?.match(/[^!@#$%^&*?{},.;:/+~()<>]/g)
    ?.join("")
    ?.toLocaleLowerCase()
    ?.replaceAll(" ", "-");

  const postData = {
    image: image,
    blogTitle: blogTitle,
    description: description,
    urlLink: link,
    editorHtml: editorHtml,
  };

  const post_deleted = () => toast.success("Post deleted!");
  const post_updated = () => toast.success("Post updated!");

  const editPost = async (id: string) => {
    setIsEdit(false);
    const response = await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (response.ok) {
      router.refresh();
      post_updated();
    }
  };

  const deletePost = async (id: string) => {
    setIsConfirm(false);
    const response = await fetch(`/api/blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response_cmts = await fetch(`/api/comment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response_likes = await fetch(`/api/like/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response_saved_posts = await fetch(`/api/saved-posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (
      response.ok &&
      response_cmts.ok &&
      response_likes.ok &&
      response_saved_posts.ok
    ) {
      router.refresh();
      post_deleted();
    }
  };

  const handleChange = (e: any, index: number) => {
    const updatedEditorHtml = [...editorHtml];
    updatedEditorHtml[index] = e.target.value;
    setEditorHtml(updatedEditorHtml);
  };

  return (
    <>
      {isConfirm && (
        <div className="d-flex justify-content-center">
          <div className="confirm-delete">
            <p>Are you delete this post permanently?</p>
            <button
              className="home-button"
              onClick={() => deletePost(post._id)}
            >
              Delete
            </button>
            <button
              className="home-button ml-10"
              onClick={() => setIsConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <Toaster position="top-center" />
      <div className="mb-30">
        <Link href={`/post/${post.urlLink}`}>
          <div className="post-group">
            <img
              src={post.image}
              className="posts-image mr-15"
              alt={post?.blogTitle}
              title={post?.blogTitle}
            />
            <div>
              <h6 className="fw-600 mb-10">{post.blogTitle}</h6>
              <p>{post.description.toString().slice(0, 145)} . . .</p>
            </div>
          </div>
        </Link>
        <img
          src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/edit.webp"
          width={15}
          height={15}
          onClick={() => setIsEdit(!isEdit)}
          alt="Edit post"
          title="Edit post"
          className="cursor-pointer mr-15 mt-10"
        />
        <img
          src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/delete.webp"
          width={15}
          height={15}
          onClick={() => setIsConfirm(!isConfirm)}
          alt="Delete post"
          title="Delete post"
          className="cursor-pointer mt-10"
        />
        {isEdit && (
          <div id="post" className="d-flex flex-column gap-3 mb-10 mt-20">
            <span className="fw-700">BlogTitle</span>
            <textarea
              placeholder="BlogTitle"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="auth-input"
              style={{ lineHeight: "2.5" }}
              rows={1}
            />
            <span className="fw-700">Description</span>
            <textarea
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="auth-input"
              style={{ lineHeight: "2.5" }}
              rows={2}
            />
            <span className="fw-700">Image URL</span>
            <textarea
              placeholder="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="auth-input"
              style={{ lineHeight: "2.5" }}
              rows={1}
            />
            <span className="fw-700">EditorHtml</span>
            {editorHtml.map((_editHtml: string, index: number) => (
              <textarea
                key={index}
                value={_editHtml}
                onChange={(e) => handleChange(e, index)}
                className="auth-input"
                style={{ lineHeight: "2.5" }}
                rows={4}
              />
            ))}
          </div>
        )}
        {isEdit && (
          <div onClick={() => editPost(post._id)} className="cursor-pointer">
            <img
              src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/update.webp"
              width={20}
              height={20}
              onClick={() => editPost(post._id)}
              alt="Update post"
              title="Update post"
              className="cursor-pointer mr-5"
            />
            <span>Update</span>
          </div>
        )}
      </div>
    </>
  );
};

export default EditPost;
