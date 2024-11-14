"use client";
import React, { useState } from "react";
import Image from "next/image";

const Keywords = ({ data, setData, setIsEditKeyword }) => {
  const [input, setInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [index, setIndex] = useState(false);

  const addItem = () => {
    if (isEdit) {
      let temp = [...data];
      temp[index] = input;
      setData(temp);
      setInput("");
      setIsEdit(false);
    } else {
      if (input.length > 1) {
        let temp = [...data];
        temp?.push(input);
        setData(temp);
        setInput("");
      }
    }
  };

  const deleteKeyword = (index) => {
    let temp = [...data];
    temp.splice(index, 1);
    setData(temp);
  };

  const editKeyword = (index) => {
    setIndex(index);
    setIsEdit(true);
    let temp = [...data];
    setInput(temp[index]);
  };

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <h4># SEO Keywords</h4>
        <Image
          src="/images/edit.png"
          width={20}
          height={20}
          alt=""
          title="Edit"
          className="cursor-pointer"
          onClick={() => setIsEditKeyword(false)}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          className="input"
          placeholder="Keywords"
          style={{ padding: "15px 20px 12px 20px", width: "90%" }}
          value={input}
          name="keywords"
          onChange={(e) => setInput(e.target.value)}
        />
        <Image
          src="/images/add.png"
          width={30}
          height={30}
          alt=""
          onClick={addItem}
          className="cursor-pointer ml-10"
        />
      </div>
      <ol>
        {data?.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
            <Image
              src="/images/edit.png"
              width={15}
              height={15}
              alt=""
              onClick={() => editKeyword(index)}
              className="cursor-pointer ml-10"
            />
            <Image
              src="/images/delete.png"
              width={15}
              height={15}
              alt=""
              onClick={() => deleteKeyword(index)}
              className="cursor-pointer ml-10"
            />
          </li>
        ))}
      </ol>
    </React.Fragment>
  );
};

export default Keywords;
