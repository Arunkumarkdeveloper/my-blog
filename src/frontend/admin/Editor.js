"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";

const EditorQuill = ({ data, setData }) => {
  const handleChange = (html) => {
    setData({ ...data, ["content"]: html });
  };

  return (
    <React.Fragment>
      <ReactQuill
        theme={"snow"}
        onChange={handleChange}
        value={data?.content}
        modules={EditorQuill.modules}
        formats={EditorQuill.formats}
        bounds={".app"}
      />
    </React.Fragment>
  );
};

const imageHandler = () => {
  const imageUrl = prompt("Please enter the image URL");
  const altText = prompt("Please enter the alt text for the image");

  if (imageUrl) {
    const quillEditor = document.querySelector(".ql-editor");
    const imgTag = `<img src="${imageUrl}" alt="${altText || "Image"}" />`;
    quillEditor.innerHTML += imgTag;
  }
};

EditorQuill.propTypes = {
  placeholder: PropTypes.string,
};

// Modify the modules to include custom image handler
EditorQuill.modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      [{ color: [] }, { background: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      [{ "code-block": true }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      [{ direction: "rtl" }],
      ["formula"],
      ["clean"],
    ],
    handlers: {
      image: imageHandler, // Use the custom image handler
    },
  },
  clipboard: {
    matchVisual: false,
  },
};

EditorQuill.formats = [
  "header",
  "font",
  "size",
  "color",
  "background",
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
  "code-block",
  "script",
  "align",
  "direction",
  "formula",
];

export default EditorQuill;
