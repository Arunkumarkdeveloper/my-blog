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
import { decode as base64_decode, encode as base64_encode } from "base-64";

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
    router.push("/posts");
    disPatch(setValue(e.target.value));
  };

  const userId: any = session?.user?.email;
  const encodeUserId = base64_encode(userId);

  const [isProfile, setIsPrifile] = useState(false);

  const openProfile = () => setIsPrifile(!isProfile);
  const closeProfile = () => setIsPrifile(false);

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

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/">
          <img
            src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/logo.webp"
            width={40}
            height={40}
            alt="findbestone"
            title="findbestone"
          />
        </Link>
        <input
          value={_search}
          className="search"
          placeholder="Search"
          onChange={handleChange}
        />
        <img
          src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/hamburger.webp"
          className="menu-icon"
          width={30}
          height={30}
          alt="Hamburger"
          title="Hamburger"
          onClick={handleShowNavbar}
        />
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
            <span>
              <Link href="/posts">Posts</Link>
            </span>
            <span>
              <Link href="/about">About</Link>
            </span>
            {session?.user?.email === "arunkumarkdeveloper@gmail.com" && (
              <span>
                <Link href="/add">Editor</Link>
              </span>
            )}
            {screenWidth > 1200 && (
              <span className="cursor-pointer" onClick={openProfile}>
                {session ? (
                  <span className="header-profile">
                    {session?.user?.name?.slice(0, 1).toUpperCase()}
                  </span>
                ) : (
                  !session && (
                    <img
                      src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/profile.webp"
                      width={35}
                      height={35}
                      alt="Profile"
                      title="Profile"
                      onClick={handleShowNavbar}
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
                  <React.Fragment>
                    <span>
                      <Link href="/login">Login</Link>
                    </span>
                    <span>
                      <Link href="/register">Register</Link>
                    </span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <a className="cursor-pointer d-flex flex-column justify-content-center gap-3">
                      <span
                        className="cursor-pointer"
                        onClick={() => signOut()}
                      >
                        <span className="mr-10">
                          <img
                            src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/logout.webp"
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
            {isProfile && screenWidth > 1200 && (
              <div className="profile-popup">
                {!session ? (
                  <React.Fragment>
                    <span onClick={() => setIsPrifile(false)}>
                      <span className="mr-15">
                        <img
                          src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/login.webp"
                          alt="login"
                          title="login"
                          width={20}
                          height={20}
                        />
                      </span>
                      <span>
                        <Link href="/login">Login</Link>
                      </span>
                    </span>
                    <span onClick={() => setIsPrifile(false)}>
                      <span className="mr-15">
                        <img
                          src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/register.webp"
                          alt="register"
                          title="register"
                          width={20}
                          height={20}
                        />
                      </span>
                      <span>
                        <Link href="/register">Register</Link>
                      </span>
                    </span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <span
                      className="cursor-pointer"
                      onClick={() => setIsPrifile(false)}
                    >
                      <span className="mr-10">
                        <img
                          src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/user.webp"
                          alt="User"
                          title="User"
                          width={20}
                          height={20}
                        />
                      </span>
                      <span>{session?.user?.name}</span>
                    </span>
                    {session && (
                      <span onClick={() => setIsPrifile(false)}>
                        <span className="mr-10">
                          <img
                            src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/saved.webp"
                            alt="saved"
                            title="saved"
                            width={20}
                            height={20}
                          />
                        </span>
                        <span>
                          <Link href={`/saved/${encodeUserId}`}>
                            Saved Posts
                          </Link>
                        </span>
                      </span>
                    )}
                    <span className="cursor-pointer" onClick={() => signOut()}>
                      <div onClick={() => setIsPrifile(false)}>
                        <span className="mr-10">
                          <img
                            src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/logout.webp"
                            alt="logout"
                            title="logout"
                            width={20}
                            height={20}
                          />
                        </span>
                        <span>Logout</span>
                      </div>
                    </span>
                  </React.Fragment>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
