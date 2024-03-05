"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Footer() {
  const { data: session } = useSession();
  return (
    <div className="footer pt-50 pb-50">
      <div>
        <div className="d-flex align-items-center mb-20">
          <Link href="/">
            <Image
              src="/image/logo.png"
              width={45}
              height={45}
              alt="Find Best One"
              quality={100}
            />
          </Link>
          <span className="fw-700 font-18 pl-10">FIND BEST ONE</span>
        </div>
        <p> Findbestone.com ©2024, All rights reserved</p>
      </div>
      <div>
        <h6 className="fw-700 mb-20 footer-header">Website</h6>
        <p>
          <Link href="/" className="footer-points">
            Home
          </Link>
        </p>
        <p>
          <Link href="/about" className="footer-points">
            About
          </Link>
        </p>
        <p>
          <Link href="/disclaimer" className="footer-points">
            Disclaimer
          </Link>
        </p>
        <p>
          <Link href="/terms-privacy" className="footer-points">
            Terms and Privacy
          </Link>
        </p>
      </div>
      <div>
        <h6 className="fw-700 mb-20 footer-header">Company</h6>
        <p>Products</p>
        <p>New offers</p>
        <p>
          <Link href="/post" className="footer-points">
            Latest posts
          </Link>
        </p>
        {!session ? (
          <p>
            <Link href="/login" className="footer-points">
              Login
            </Link>
          </p>
        ) : (
          <p onClick={() => signOut()}>Logout</p>
        )}
      </div>
      <div className="d-flex flex-column">
        <h6 className="fw-700 mb-20 footer-header">Subscribe</h6>
        <input className="footer-input mb-20" placeholder="Enter your name" />
        <input className="footer-input mb-20" placeholder="Enter your email" />
        <button className="footer-btn">Send</button>
      </div>
    </div>
  );
}
