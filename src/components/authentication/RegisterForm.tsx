"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function RegisterForm() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register_success = () => toast.success("Registerd successfully!");
  const fields_necessary = () => toast.error("All fields are necessary.");
  const user_exist = () => toast.error("User already exist!");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      fields_necessary();
      return;
    }

    const existUser = await fetch("/api/exist-user", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ email }),
    });

    const user = await existUser.json();

    if (user) {
      user_exist();
      return;
    }

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ name: userName, email, password }),
    });

    if (response.ok) {
      register_success();
      const form = e.target;
      form.reset();
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <div className="auth-page">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <h4 className="mb-20 fw-800">Register</h4>
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
        <Link href={"/login"}>login</Link>
      </form>
    </div>
  );
}
