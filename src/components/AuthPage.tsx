"use client";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth, setNotify } from "@/redux/searchSlice";

export default function AuthPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useState("login");

  const disPatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (auth === "login") {
      try {
        const response = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (response?.error) {
          disPatch(setNotify("invalid"));
        }

        if (response?.ok) {
          disPatch(setNotify("login"));
          disPatch(setIsAuth(false));
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (auth === "register") {
      if (!userName || !email || !password) {
        disPatch(setNotify("necessary"));
        return;
      }

      const existUser = await fetch("/api/exist-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const user = await existUser.json();

      if (user) {
        disPatch(setNotify("exist"));
        return;
      }

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName, email, password }),
      });

      if (response.ok) {
        disPatch(setNotify("register"));
        setUserName("");
        setPassword("");
        setAuth("login");
      }
    }
  };

  return (
    <div className="authentiaction-page">
      <div className="d-flex justify-content-end mt-15 mr-15 mb-25">
        <img
          src="/image/close.webp"
          width={15}
          height={15}
          onClick={() => disPatch(setIsAuth(false))}
          className="cursor-pointer"
        />
      </div>
      {auth === "login" && (
        <div className="auth-page mb-50">
          <form onSubmit={handleSubmit} className="d-flex flex-column">
            <h4 className="mb-20 fw-800 font-20">Login</h4>
            <input
              type="email"
              className="auth-input mb-20"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="auth-input mb-20"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="auth-btn mb-20">Login</button>
            <p onClick={() => setAuth("register")} className="cursor-pointer">
              Create a new account! <span className="fw-600">Register</span>
            </p>
          </form>
        </div>
      )}
      {auth === "register" && (
        <div className="auth-page mb-50">
          <form onSubmit={handleSubmit} className="d-flex flex-column">
            <h4 className="mb-20 fw-800 font-20">Register</h4>
            <input
              type="text"
              placeholder="Enter your username"
              className="auth-input mb-20"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email address"
              className="auth-input mb-20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="auth-input mb-20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="auth-btn mb-20">Register</button>
            <p onClick={() => setAuth("login")} className="cursor-pointer">
              Already have an account? <span className="fw-600">Login</span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
