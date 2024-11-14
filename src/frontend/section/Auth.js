"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../redux/AppSlice";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const Auth = ({ authType, createCookie }) => {
  const disPatch = useDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const alreadyExist = () => toast.error("User already exist");
  const accountCreated = () => toast.success("Registered Successfully");
  const loginSuccessfull = () => toast.success("Login Successfully");
  const invalidCredentials = () => toast.error("Invalid Credentials");

  const testEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const testPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isValidEmail = testEmail.test(userData.email);
  const isStrongPassword = testPassword.test(userData.password);
  const WeekPassword = !isStrongPassword && userData.password.length > 1;

  const sendAuth = async (authType) => {
    if (authType === "login") {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        createCookie(data.token);
        const decoded = jwtDecode(data.token);
        disPatch(setAuth(decoded));
        setUserData({
          userName: "",
          email: "",
          password: "",
        });
        router.back();
        loginSuccessfull();
      } else {
        invalidCredentials();
      }
    } else if (authType === "register") {
      if (isValidEmail && isStrongPassword) {
        const response = await fetch(`/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          setUserData({
            userName: "",
            email: "",
            password: "",
          });
          accountCreated();
          router.push("/login");
        }
        if (!response.ok) {
          alreadyExist();
          router.refresh();
        }
      }
    }
  };

  return (
    <div className="layout-center mt-50 mb-50">
      <div className="form-group">
        <h3 className="text-center color-green mt-0">
          {authType === "register"
            ? "Create New Account"
            : "Log in to Your Account"}
        </h3>
        {authType === "register" && (
          <input
            value={userData.userName}
            name="userName"
            onChange={handleChange}
            type="text"
            placeholder="UserName"
            className="input input-user mt-10"
          />
        )}
        <input
          value={userData.email}
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email Address"
          className="input input-email mt-20"
        />
        <div style={{ position: "relative" }} className="mt-20">
          <input
            value={userData.password}
            name="password"
            onChange={handleChange}
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className="input input-password"
            id="myInput"
            style={{ width: "81%" }}
          />
          <Image
            src={`/images/${passwordVisible ? "preview" : "hide"}.png`}
            width="20"
            height="20"
            className="show-password"
            onClick={() => setPasswordVisible(!passwordVisible)}
          />
        </div>
        {WeekPassword && authType === "register" && (
          <React.Fragment>
            <span>Password must contain the following:</span>
            <ul>
              <li>1 capital letter [A, B, C]</li>
              <li>1 small letter [a, b, c]</li>
              <li>1 number [1, 2, 3]</li>
              <li>1 special character [@, $, #]</li>
              <li>Minimum length 8 character</li>
            </ul>
          </React.Fragment>
        )}
        <button
          onClick={() => sendAuth(authType)}
          className="btn mt-20"
          style={{ width: "100%" }}>
          {authType === "register" ? "Register" : "Login"}
        </button>
        {authType === "register" ? (
          <span className="mt-15">
            Already have an account?{" "}
            <Link href="/login" className="color-link">
              Login
            </Link>
          </span>
        ) : (
          <span className="mt-15">
            Don't have an Account?{" "}
            <Link href="/register" className="color-link">
              Create Account
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default Auth;
