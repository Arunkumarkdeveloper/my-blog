"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../redux/AppSlice";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

function Header({ jwtToken, deleteCookie }) {
  const router = useRouter();
  const disPatch = useDispatch();
  const auth = useSelector((state) => state.app.auth);
  const [showNavbar, setShowNavbar] = useState(false);
  const [search, setSearch] = useState("");
  const [_search] = useDebounce(search, 1000);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (jwtToken) {
      const decoded = jwtDecode(jwtToken);
      disPatch(setAuth(decoded));
    }
  }, []);

  useEffect(() => {
    const fetchedSearchItems = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blog?type=search&search=${_search}`
      );
      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    };
    fetchedSearchItems();
  }, [_search]);

  return (
    <React.Fragment>
      <Toaster />
      <nav className="navbar">
        <div className="container">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              width={150}
              height={40}
              alt="Findbestone"
              className="logo"
            />
          </Link>
          <div className="search-container">
            <input
              type="search"
              className="input input-search input-shadow"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {data && data?.length > 0 && (
              <div className="select-search">
                <ul>
                  {data?.map((item, index) => (
                    <li
                      className="cursor-pointer mb-15"
                      key={index}
                      onClick={() => {
                        router?.push(`/blog/${item?._id?.pageUrl}`);
                        setSearch("");
                      }}>
                      {item?._id?.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {!showNavbar ? (
            <Image
              src="/images/menu.png"
              width={30}
              height={30}
              alt=""
              className="menu-icon"
              onClick={() => setShowNavbar(!showNavbar)}
            />
          ) : (
            <Image
              src="/images/close.png"
              width={30}
              height={30}
              alt=""
              className="menu-icon"
              onClick={() => setShowNavbar(!showNavbar)}
            />
          )}
          <div className={`nav-elements  ${showNavbar && "active"}`}>
            <ul>
              <li onClick={() => setShowNavbar(false)}>
                <Link href="/">Home</Link>
              </li>
              <li onClick={() => setShowNavbar(false)}>
                <Link href="/blog">Blog</Link>
              </li>
              <li onClick={() => setShowNavbar(false)}>
                <Link href="/about">About</Link>
              </li>
              {auth ? (
                <React.Fragment>
                  <li className="dropdown">
                    <div className="dropdown-arrow">
                      <Image
                        src="/images/profile.png"
                        width={30}
                        height={30}
                        alt=""
                        className="cursor-pointer dropbtn"
                      />
                      <Image
                        src="/images/drop-down-arrow.png"
                        width={20}
                        height={20}
                        alt=""
                        className="cursor-pointer dropbtn arrow"
                      />
                    </div>
                    <div className="dropdown-content">
                      <div
                        style={{ display: "flex", alignItems: "center" }}
                        className="cursor-pointer mb-20"
                        // onClick={() => setShowNavbar(false)}
                      >
                        <span>
                          <Image
                            src="/images/user.png"
                            width={20}
                            height={20}
                            alt=""
                            className="mr-10"
                          />
                        </span>
                        <span>Hi, {auth?.userName}</span>
                      </div>
                      {auth &&
                        auth?.email === "findbestonebusiness@gmail.com" && (
                          <React.Fragment>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                              className="cursor-pointer mb-20"
                              onClick={() =>
                                router?.push("/admin/blog/create")
                              }>
                              <span>
                                <Image
                                  src="/images/add.png"
                                  width={20}
                                  height={20}
                                  alt=""
                                  className="mr-10"
                                />
                              </span>
                              <span>Create Blog</span>
                            </div>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                              className="cursor-pointer mb-20"
                              onClick={() =>
                                router?.push("/admin/subscribers")
                              }>
                              <span>
                                <Image
                                  src="/images/input-email.png"
                                  width={20}
                                  height={20}
                                  alt=""
                                  className="mr-10"
                                />
                              </span>
                              <span>Subscribers</span>
                            </div>
                          </React.Fragment>
                        )}
                      <div
                        style={{ display: "flex", alignItems: "center" }}
                        className="cursor-pointer"
                        onClick={() => {
                          deleteCookie();
                          setShowNavbar(false);
                          disPatch(setAuth(null));
                          router.refresh();
                        }}>
                        <span>
                          <Image
                            src="/images/signOut.png"
                            width={25}
                            height={25}
                            alt=""
                            className="mr-5"
                          />
                        </span>
                        <span>SignOut</span>
                      </div>
                    </div>
                  </li>
                </React.Fragment>
              ) : (
                <li onClick={() => setShowNavbar(false)}>
                  <Link href="/login">
                    <Image
                      src="/images/signIn.png"
                      width={25}
                      height={25}
                      alt=""
                    />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Header;