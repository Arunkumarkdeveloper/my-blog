"use client";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Subscribe() {
  const [email, setEmail] = useState("");

  const subscribed = () =>
    toast.success("Congratulations! Expect more updates in the future");
  const alreadyExist = () => toast.success("You're already subscribed!");
  const enterValid = () => toast.error("Please enter a valid email address");

  const Subscribe = async () => {
    const testEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (testEmail.test(email)) {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          email: email,
        }),
      });
      if (response.ok) {
        subscribed();
      } else if (!response.ok) {
        alreadyExist();
      }
      setEmail("");
    } else {
      enterValid();
    }
  };
  return (
    <div className="subscribe mt-20">
      <input
        type="email"
        className="input input-email input-shadow"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn ml-20" onClick={Subscribe}>
        Subscribe
      </button>
    </div>
  );
}
