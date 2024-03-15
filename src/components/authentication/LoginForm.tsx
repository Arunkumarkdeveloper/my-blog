"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        toast_error();
      }

      if (response?.ok) {
        toast_success();
        setTimeout(() => {
          router.back();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toast_success = () => toast.success("Login Successfully!");
  const toast_error = () => toast.error("invalid credentials!");

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="d-flex flex-column">
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
        <button className="auth-btn mb-20">Login</button>
        <Toaster position="top-center" />
        <Link href={"/register"}>
          Create a new account! <span className="fw-600">Register</span>
        </Link>
      </form>
    </div>
  );
}
