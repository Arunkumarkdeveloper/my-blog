"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function PostEditor({
  affiliateLink,
  postData,
  setEditorHtml,
  NewtBlog,
}: {
  affiliateLink: any;
  postData: any;
  setEditorHtml: any;
  NewtBlog: any;
}) {
  const [input1, setInput1] = useState("");

  const _tags = [
    { id: 1, _openTag: "<p>", _closeTag: "</p>" },
    { id: 2, _openTag: "<b>", _closeTag: "</b>" },
    { id: 3, _openTag: "<u>", _closeTag: "</u>" },
    { id: 4, _openTag: "<i>", _closeTag: "</i>" },
    { id: 5, _openTag: "<h1>", _closeTag: "</h1>" },
    { id: 6, _openTag: "<h2>", _closeTag: "</h2>" },
    { id: 7, _openTag: "<ul><li>", _closeTag: "</li></ul>" },
    { id: 8, _openTag: "<button>", _closeTag: "</button>" },
    { id: 9, _openTag: "<img>", _closeTag: "</img>" },
  ];

  const _space = [
    "mb-0",
    "mb-10",
    "mb-12",
    "mb-15",
    "mb-17",
    "mb-20",
    "mb-25",
    "mb-30",
    "mb-35",
    "mb-40",
    "mb-45",
    "mb-50",
  ];

  const [htmlTags, setHtmlTags]: any = useState(0);
  const [space, setSpace]: any = useState(0);

  let keyTag: any;

  if (_tags[htmlTags]?._openTag === `<button>`) {
    keyTag =
      `<div class="d-flex justify-content-center ${_space[space]}"><a ` +
      `href=" "` +
      " " +
      `target="_blank"` +
      `>` +
      _tags[htmlTags]?._openTag +
      `${input1}` +
      `${_tags[htmlTags]?._closeTag}` +
      `</a></div>`;
  } else if (_tags[htmlTags]?._openTag === `<img>`) {
    keyTag =
      `<div class="d-flex justify-content-center ${_space[space]}">
      <a href=" " target="_blank" ><img ` +
      `src=` +
      `"${input1}"` +
      ` alt="${postData.blogTitle}" title="${postData.blogTitle}" /></a></div>`;
  } else {
    keyTag = `<div class=${_space[space]} >${_tags[htmlTags]?._openTag} ${input1}${_tags[htmlTags]?._closeTag}</div>`;
  }

  const addItem = () => {
    setEditorHtml([...postData.editorHtml, keyTag]);
  };

  useEffect(() => {
    setInput1("");
  }, [postData.editorHtml.length]);

  return (
    <div style={{ height: "100%" }}>
      <select
        onChange={(e: any) => setHtmlTags(e.target.value)}
        className="auth-input mb-10 mt-25 editor-select mr-20"
      >
        {_tags.map((tag, index) => (
          <option key={tag.id} value={index}>
            {tag._openTag}
          </option>
        ))}
      </select>
      <select
        onChange={(e: any) => setSpace(e.target.value)}
        className="auth-input mb-10 mt-25 editor-select"
      >
        {_space.map((tag, index) => (
          <option key={index} value={index}>
            {tag}
          </option>
        ))}
      </select>
      <div className="d-flex align-items-center gap-2">
        <textarea
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          className="auth-input mr-10 mb-10"
          placeholder={`Type ${_tags[htmlTags]?._openTag} text`}
        />
        <img
          src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/add.webp"
          width={25}
          height={25}
          onClick={addItem}
          alt="Delete post"
          title="Delete post"
          className="cursor-pointer"
          style={{ width: "25px" }}
        />
      </div>

      <div className="d-flex align-items-end justify-content-between gap-2 mt-30">
        <h6 className="fw-800">Preview Post</h6>

        <div onClick={NewtBlog} className="cursor-pointer">
          <span className="mr-10">
            <img
              src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/add_post.webp"
              alt="Add post"
              title="Add post"
              width={25}
              height={25}
              style={{ width: "25px" }}
            />
          </span>
          <span className="fw-600">Add New Post</span>
        </div>
      </div>
      <hr />
      <div id="post">
        <div className="mt-20">
          <h2 className="fw-900">{postData.blogTitle}</h2>
          <p className="mb-25">{postData.description}</p>
          <div className="d-flex justify-content-center mb-25">
            <a href={postData.affiliateLink} target="_blank">
              <img
                src={postData.image}
                alt={postData.blogTitle}
                title={postData.blogTitle}
              />
            </a>
          </div>
          {postData.editorHtml.map((_html_editor: string, index: number) => (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: _html_editor }}
            ></div>
          ))}
          <hr />
        </div>
      </div>
    </div>
  );
}
