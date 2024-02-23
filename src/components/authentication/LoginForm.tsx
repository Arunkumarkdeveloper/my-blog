"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        setError("invalid credentials");
      }

      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="d-flex flex-column w-25">
        <h4 className="mb-20 fw-800">Login</h4>
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
        {error && <div>{error}</div>}
        <button className="auth-btn mb-20">Login</button>
        <Link href={"/register"}>Register</Link>
      </form>
    </div>
  );
}
