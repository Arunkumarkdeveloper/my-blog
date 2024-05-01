"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "../../public/css/header.css";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setValue, setIsAuth, setNotify } from "@/redux/searchSlice";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import ScreenWidth from "./ScreenWidth";
import AuthPage from "@/components/AuthPage";
import Notify from "@/components/Notify";

export default function Header() {
  const router = useRouter();
  const path = usePathname();
  const { data: session } = useSession();
  const [showHeader, setShowHeader] = useState(false);

  const [screenWidth] = ScreenWidth();
  const [input, setInput] = useState("");

  const handleShowNavbar = () => {
    setShowHeader(!showHeader);
  };

  const disPatch = useDispatch();
  const _search = useSelector((state: any) => state.search.value);
  const isAuth = useSelector((state: any) => state.search.auth);

  const handleChange = (e: any) => {
    disPatch(setValue(e.target.value));
  };

  if (input == "searchPosts") {
    router.push("/posts");
    setTimeout(() => {
      setInput("");
    }, 1000);
  }

  useEffect(() => {
    disPatch(setValue(""));
  }, [path]);

  const userId: any = session?.user?.email;
  const encodeUserId = base64_encode(userId);

  const [isProfile, setIsProfile] = useState(false);

  const openProfile = () => setIsProfile(!isProfile);

  const Logout = () => {
    signOut();
    disPatch(setNotify("logout"));
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/">
          <img
            src="/image/logo.webp"
            width={40}
            height={40}
            alt="findbestone"
            title="findbestone"
          />
        </Link>
        <input
          value={_search}
          className="search"
          placeholder="Search posts"
          onChange={handleChange}
          onFocus={() => setInput("searchPosts")}
        />
        {showHeader ? (
          <img
            src="/image/close.webp"
            className="menu-icon"
            width={30}
            height={30}
            alt="Hamburger"
            title="Hamburger"
            onClick={handleShowNavbar}
          />
        ) : (
          <img
            src="/image/hamburger.webp"
            className="menu-icon"
            width={30}
            height={30}
            alt="Hamburger"
            title="Hamburger"
            onClick={handleShowNavbar}
          />
        )}

        <div className={showHeader ? "nav-elements active" : "nav-elements"}>
          <div className="header-items" onClick={() => setShowHeader(false)}>
            {session && (
              <span className="fw-700" style={{ color: "#000" }}>
                <a>Hi, {session?.user?.name}!</a>
              </span>
            )}
            <span>
              <Link href="/">Home</Link>
            </span>
            {/* <span>
              <Link href="/ecommerce">E-commerce</Link>
            </span> */}
            <span>
              <Link href="/posts">Posts</Link>
            </span>
            {screenWidth > 1200 && (
              <span className="cursor-pointer">
                {session ? (
                  <span className="header-profile" onClick={openProfile}>
                    {session?.user?.name?.slice(0, 1).toUpperCase()}
                  </span>
                ) : (
                  !session && (
                    <img
                      src="/image/profile.webp"
                      width={35}
                      height={35}
                      alt="Profile"
                      title="Profile"
                      onClick={() => disPatch(setIsAuth(true))}
                    />
                  )
                )}
              </span>
            )}
            {screenWidth < 1200 && (
              <>
                {session && (
                  <span>
                    <Link href={`/saved/${encodeUserId}`}>Saved Posts</Link>
                  </span>
                )}
                {!session ? (
                  <span onClick={() => disPatch(setIsAuth(true))}>Login</span>
                ) : (
                  <React.Fragment>
                    <a className="cursor-pointer d-flex flex-column justify-content-center gap-3">
                      <span className="cursor-pointer" onClick={Logout}>
                        <span className="mr-10">
                          <img
                            src="/image/logout.webp"
                            alt="logout"
                            title="logout"
                            width={20}
                            height={20}
                          />
                        </span>
                        <span>Logout</span>
                      </span>
                    </a>
                  </React.Fragment>
                )}
              </>
            )}
            {isProfile && session && screenWidth > 1200 && (
              <div className="profile-popup">
                <span
                  className="cursor-pointer"
                  onClick={() => setIsProfile(false)}
                >
                  <span className="mr-10">
                    <img
                      src="/image/user.webp"
                      alt="User"
                      title="User"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span>{session?.user?.name}</span>
                </span>
                {session && (
                  <span onClick={() => setIsProfile(false)}>
                    <span className="mr-10">
                      <img
                        src="/image/saved.webp"
                        alt="saved"
                        title="saved"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span>
                      <Link href={`/saved/${encodeUserId}`}>Saved Posts</Link>
                    </span>
                  </span>
                )}
                <span className="cursor-pointer" onClick={Logout}>
                  <div onClick={() => setIsProfile(false)}>
                    <span className="mr-10">
                      <img
                        src="/image/logout.webp"
                        alt="logout"
                        title="logout"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span>Logout</span>
                  </div>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Notify />
      {isAuth && !session && <AuthPage />}
    </nav>
  );
}
