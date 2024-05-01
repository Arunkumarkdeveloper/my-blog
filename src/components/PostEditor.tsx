"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function PostEditor({
  affiliateLink,
  postData,
  setEditorHtml,
  NewtBlog,
  editorHtml,
  router,
}: {
  affiliateLink: any;
  postData: any;
  setEditorHtml: any;
  NewtBlog: any;
  editorHtml: any;
  router: any;
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

  const [htmlTags, setHtmlTags]: any = useState(0);

  let keyTag: any;

  if (_tags[htmlTags]?._openTag === `<p>`) {
    keyTag = `<p>${input1}</p>`;
  } else if (_tags[htmlTags]?._openTag === `<b>`) {
    keyTag = `<b>${input1}</b>`;
  } else if (_tags[htmlTags]?._openTag === `<u>`) {
    keyTag = `<u>${input1}</u>`;
  } else if (_tags[htmlTags]?._openTag === `<i>`) {
    keyTag = `<i>${input1}</i>`;
  } else if (_tags[htmlTags]?._openTag === `<h1>`) {
    keyTag = `<h1>${input1}</h1>`;
  } else if (_tags[htmlTags]?._openTag === `<h2>`) {
    keyTag = `<h2>${input1}</h2>`;
  } else if (_tags[htmlTags]?._openTag === `<ul><li>`) {
    keyTag = `<ul><li>${input1}</li></ul>`;
  } else if (_tags[htmlTags]?._openTag === `<button>`) {
    keyTag = `<div class="d-flex justify-content-center" ><a href="" target="_blank" ><button>${input1}</button></a></div>`;
  } else if (_tags[htmlTags]?._openTag === `<img>`) {
    keyTag = `<div class="d-flex justify-content-center" ><a href="" target="_blank" ><img src="${input1}" alt="${postData?.blogTitle}" title="${postData?.blogTitle}" /></a></div>`;
  }

  const addItem = () => {
    setEditorHtml([...postData.editorHtml, keyTag]);
  };

  useEffect(() => {
    setInput1("");
  }, [postData.editorHtml.length]);

  const handleChange = (e: any, index: number) => {
    const updatedEditorHtml = [...editorHtml];
    updatedEditorHtml[index] = e.target.value;
    setEditorHtml(updatedEditorHtml);
  };

  const deleteHTML = (index: number) => {
    editorHtml.splice(index, 1);
    setEditorHtml(editorHtml);
    router.refresh();
  };

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
      <div className="d-flex align-items-center gap-2 mb-25">
        <textarea
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          className="auth-input mr-10 mb-10"
          placeholder={`Type ${_tags[htmlTags]?._openTag} text`}
          rows={4}
        />
        <img
          src="/image/add.webp"
          width={25}
          height={25}
          onClick={addItem}
          alt="Delete post"
          title="Delete post"
          className="cursor-pointer"
          style={{ width: "25px" }}
        />
      </div>
      <p className="fw-700">EditorHtml</p>
      {editorHtml.map((_editHtml: string, index: number) => (
        <div className="d-flex align-items-center" key={index}>
          <textarea
            key={index}
            value={_editHtml}
            onChange={(e) => handleChange(e, index)}
            className="auth-input mr-10 mb-10"
            style={{ lineHeight: "2" }}
            rows={1}
          />
          <img
            src="/image/delete.webp"
            width={15}
            height={15}
            onClick={() => deleteHTML(index)}
            alt="Delete post"
            title="Delete post"
            className="cursor-pointer"
          />
        </div>
      ))}
      <div className="d-flex align-items-end justify-content-between gap-2 mt-40">
        <span className="fw-800">Preview Post</span>

        <div onClick={NewtBlog} className="cursor-pointer">
          <span className="mr-10">
            <img
              src="/image/add_post.webp"
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
