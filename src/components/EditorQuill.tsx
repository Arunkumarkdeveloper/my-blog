"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const EditorQuill = ({
  placeholder,
  editorHtml,
  setEditorHtml,
}: {
  placeholder: any;
  editorHtml: any;
  setEditorHtml: any;
}) => {
  const handleChange = (html: any) => {
    setEditorHtml(html);
  };

  useEffect(() => {
    // Any side effects can be placed here
    // For example, if you want to do something when editorHtml or theme changes
    // You can put that logic here.
  }, [editorHtml]);

  return (
    <>
      <div>
        <ReactQuill
          theme={"snow"}
          onChange={handleChange}
          value={editorHtml}
          modules={EditorQuill.modules}
          formats={EditorQuill.formats}
          bounds={".app"}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

EditorQuill.propTypes = {
  placeholder: PropTypes.string,
};

EditorQuill.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

EditorQuill.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default EditorQuill;
