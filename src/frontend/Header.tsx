"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "../../public/css/header.css";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "@/redux/searchSlice";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(false);

  const handleShowNavbar = () => {
    setShowHeader(!showHeader);
  };

  const disPatch = useDispatch();
  const _search = useSelector((state: any) => state.search.value);

  const handleChange = (e: any) => {
    router.push("/post");
    disPatch(setValue(e.target.value));
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Image
          src="/image/logo.png"
          width={50}
          height={50}
          alt="Find Best One"
          quality={100}
        />
        <input
          value={_search}
          className="search"
          placeholder="Search post"
          onChange={handleChange}
        />
        <Image
          src="/image/hamburger.png"
          className="menu-icon"
          width={30}
          height={30}
          alt="Hamburger"
          quality={100}
          onClick={handleShowNavbar}
        />
        <div className={`nav-elements  ${showHeader && "active"}`}>
          <div className="header-items">
            <span>
              <Link href="/" prefetch={false}>
                Home
              </Link>
            </span>
            <span>
              <Link href="/post" prefetch={false}>
                Posts
              </Link>
            </span>
            {/* <span>Disclaimer</span> */}
            <span>About</span>
            <span>
              <Link href="/login" prefetch={false}>
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
