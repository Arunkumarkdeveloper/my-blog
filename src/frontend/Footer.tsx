"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Footer() {
  return (
    <div className="footer pt-50 pb-50">
      <div>
        <div className="d-flex align-items-center mb-20">
          <Link href="/">
            <img
              src="/image/logo.webp"
              width={40}
              height={40}
              alt="findbestone"
              title="findbestone"
            />
          </Link>
          <span className="fw-700 font-16 pl-10">FIND BEST ONE</span>
        </div>
        <p>Copyright ©{new Date().getFullYear()} findbestone.com</p>
      </div>
      <div>
        <p className="fw-700 mb-20 footer-header font-16">Website</p>
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
        <p className="fw-700 mb-20 footer-header font-16">Company</p>
        <p>Products</p>
        <p>New offers</p>
        <p>
          <Link href="/posts" className="footer-points">
            Latest posts
          </Link>
        </p>
      </div>
      <div className="d-flex flex-column">
        <p className="fw-700 mb-20 footer-header font-16">Subscribe</p>
        <input className="footer-input mb-20" placeholder="Enter your name" />
        <input className="footer-input mb-20" placeholder="Enter your email" />
        <button className="footer-btn">Send</button>
      </div>
    </div>
  );
}
