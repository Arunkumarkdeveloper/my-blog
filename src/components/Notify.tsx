"use client";
import { setNotify } from "@/redux/searchSlice";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Notify() {
  const login = () => toast.success("Login Successfully!");
  const invalid = () => toast.error("invalid credentials!");
  const register = () => toast.success("Registerd successfully!");
  const necessary = () => toast.error("All fields are necessary.");
  const exist = () => toast.error("User already exist!");
  const logout = () => toast.success("Logout Successfully!");

  const message = useSelector((state: any) => state.search.notification);

  useEffect(() => {
    if (message === "login") {
      login();
    }
    if (message === "invalid") {
      invalid();
    }
    if (message === "register") {
      register();
    }
    if (message === "necessary") {
      necessary();
    }
    if (message === "exist") {
      exist();
    }
    if (message === "logout") {
      logout();
    }
  }, [message]);

  return <Toaster position="top-center" />;
}
