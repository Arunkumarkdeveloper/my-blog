"use client";
import React, { useLayoutEffect, useState } from "react";

export default function ScreenWidth() {
  const [screenWidth, setScreenWidth]: any = useState(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return [screenWidth];
}
