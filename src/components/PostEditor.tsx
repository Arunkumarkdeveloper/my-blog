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
    { id: 5, _openTag: "<button>", _closeTag: "</button>" },
    { id: 6, _openTag: "<img>", _closeTag: "</img>" },
    { id: 7, _openTag: "<h1>", _closeTag: "</h1>" },
    { id: 8, _openTag: "<h2>", _closeTag: "</h2>" },
    { id: 9, _openTag: "<h3>", _closeTag: "</h3>" },
    { id: 10, _openTag: "<h4>", _closeTag: "</h4>" },
    { id: 11, _openTag: "<h5>", _closeTag: "</h5>" },
    { id: 12, _openTag: "<h6>", _closeTag: "</h6>" },
    { id: 13, _openTag: "<ul><li>", _closeTag: "</li></ul>" },
  ];

  const [htmlTags, setHtmlTags]: any = useState(0);

  let keyTag: any;

  if (_tags[htmlTags]?._openTag === `<button>`) {
    keyTag =
      `<a ` +
      `href=` +
      `"${affiliateLink}"` +
      " " +
      `target="_blank"` +
      `>` +
      _tags[htmlTags]?._openTag +
      `${input1}` +
      `${_tags[htmlTags]?._closeTag}` +
      `</a>`;
  } else if (_tags[htmlTags]?._openTag === `<img>`) {
    keyTag =
      `<a href="${affiliateLink}" target="_blank" ><img ` +
      `src=` +
      `"${input1}"` +
      ` /></a>`;
  } else {
    keyTag = `${_tags[htmlTags]?._openTag}${input1}${_tags[htmlTags]?._closeTag}`;
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
        className="auth-input mb-10 mt-25 editor-select"
      >
        {_tags.map((tag, index) => (
          <option key={tag.id} value={index}>
            {tag._openTag}
          </option>
        ))}
      </select>
      {affiliateLink.length > 0 && (
        <div className="d-flex align-items-center gap-2">
          <textarea
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            className="auth-input mr-10 mb-10"
            placeholder={`Type ${_tags[htmlTags]?._openTag} text`}
          />
          <img
            src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/add.webp"
            width={30}
            height={30}
            onClick={addItem}
            alt="Delete post"
            title="Delete post"
            className="cursor-pointer"
            style={{ width: "30px" }}
          />
        </div>
      )}

      <div className="d-flex align-items-end justify-content-between gap-2 mt-30">
        <h6 className="fw-800">Preview Post</h6>

        <div onClick={NewtBlog} className="cursor-pointer">
          <span className="mr-10">
            <img
              src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/add_post.webp"
              alt="Add post"
              title="Add post"
              width={30}
              height={30}
              style={{ width: "30px" }}
            />
          </span>
          <span className="fw-600">Add New Post</span>
        </div>
      </div>
      <hr />
      <div id="post">
        <div className="mt-20">
          <h2 className="fw-900">{postData.blogTitle}</h2>
          <p>{postData.description}</p>
          <div className="d-flex justify-content-center">
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
              className={
                _html_editor.slice(0, 2) == "<a" ||
                _html_editor.slice(0, 4) == "<img"
                  ? "d-flex justify-content-center"
                  : ""
              }
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
