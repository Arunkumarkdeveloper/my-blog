"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="footer pt-50 pb-50">
      <div>
        <div className="d-flex align-items-center mb-20">
          <Image
            src="/image/logo.png"
            width={45}
            height={45}
            alt="Find Best One"
            quality={100}
            className="mr-20"
          />
          <span className="fw-700 font-18">FIND BEST ONE</span>
        </div>
        <p>©2024, findbestone.com, All rights reserved</p>
      </div>
      <div>
        <h6 className="fw-700 mb-20 footer-header">Website</h6>
        <p>Home</p>
        <p>About</p>
        <p>Disclaimer</p>
        <p>Terms and Privacy</p>
      </div>
      <div>
        <h6 className="fw-700 mb-20 footer-header">Company</h6>
        <p>Products</p>
        <p>Latest posts</p>
        <p>New offers</p>
        <p>Login</p>
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
