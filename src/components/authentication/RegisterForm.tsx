"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!userName || !email || !password) {
      setError("All fields are necessary.");
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
      setError("user already exist!");
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
      setError("Registerd successfully!");
      const form = e.target;
      form.reset();
    }
  };

  return (
    <div className="auth-page">
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
        {error && <div>{error}</div>}
        <button className="auth-btn mb-20">Register</button>
        <Link href={"/login"}>login</Link>
      </form>
    </div>
  );
}
