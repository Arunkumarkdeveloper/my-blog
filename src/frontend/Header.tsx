"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "../../public/css/header.css";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "@/redux/searchSlice";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
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
        <div className={showHeader ? "nav-elements active" : "nav-elements"}>
          <div className="header-items" onClick={() => setShowHeader(false)}>
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>
              <Link href="/post">Posts</Link>
            </span>
            <span>
              <Link href="/add">add post</Link>
            </span>
            <span>About</span>

            {!session ? (
              <span>
                <Link href="/login">Login</Link>{" "}
              </span>
            ) : (
              <span className="cursor-pointer" onClick={() => signOut()}>
                Logout
              </span>
            )}

            <span className="header-profile">
              {session
                ? session?.user?.name?.slice(0, 1).toUpperCase()
                : !session && (
                    <Image
                      src="/image/profile.svg"
                      width={45}
                      height={45}
                      alt="Profile"
                      quality={100}
                      onClick={handleShowNavbar}
                    />
                  )}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
