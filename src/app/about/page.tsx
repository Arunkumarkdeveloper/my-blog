import React from "react";
import type { Metadata } from "next";
import { API_URL } from "@/frontend/Path";

export const metadata: Metadata = {
  title: "about",
  description: "This is the about page for findbestone.com",
  keywords: [
    "find,best,one,findbestone,findbestone.com,product,offers,good,about,findbest,findone,bestone",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${API_URL}/about`,
    languages: {
      "en-US": `/en-US/`,
      "de-DE": `/de-DE/`,
    },
  },
  openGraph: {
    title: "about",
    description: "This is the about page for findbestone.com",
    url: `${API_URL}/about`,
    siteName: "findbestone.com",
    locale: "en_US",
    type: "article",
    authors: ["Arunkumarkdeveloper"],
  },
  twitter: {
    card: "summary_large_image",
    site: "findbestone.com",
    title: "about",
    description: "This is the about page for findbestone.com",
    creator: "Arunkumarkdeveloper",
  },
};

export default function page() {
  return (
    <div id="about" className="d-flex justify-content-center mt-20 mb-30">
      <div className="about-page">
        <p>
          Welcome to <b>Findbestone.com</b>!
        </p>
        <p>
          At <b>Findbestone.com</b>, we are passionate about helping consumers
          make informed purchasing decisions by providing honest and thorough
          product reviews. Whether you're searching for the perfect beauty
          product, the latest tech gadget, or essential home appliances, we've
          got you covered.
        </p>
        <p>
          Our mission is simple: to find and showcase the best products on the
          market, so you can shop with confidence. We understand that navigating
          the endless sea of options can be overwhelming, which is why we're
          here to do the research for you. Our team of experts rigorously tests
          and evaluates each product to ensure that only the top performers make
          it onto our site.
        </p>
        <p>What sets us apart:</p>

        <ol>
          <li>
            <u>Unbiased Reviews:</u> We pride ourselves on our honesty and
            integrity. Our reviews are always unbiased and transparent, and we
            never let sponsorships or partnerships influence our opinions.
          </li>
          <li>
            <u>Comprehensive Analysis:</u> We go beyond the surface to provide
            you with in-depth insights into each product. From detailed
            specifications to real-world performance tests, we cover all the
            bases to give you a complete picture.
          </li>
          <li>
            <u>User-Focused Approach:</u> Our ultimate goal is to serve our
            readers. That's why we prioritize your needs and preferences in
            everything we do. Whether you're a budget-conscious shopper or a
            tech enthusiast looking for the latest innovations, we've got
            something for everyone.
          </li>
          <li>
            <u>Community Engagement:</u> We value the input and feedback of our
            readers. That's why we encourage you to join the conversation by
            leaving comments, asking questions, and sharing your own
            experiences. Your insights help us improve and tailor our content to
            better serve you.
          </li>
        </ol>
        <p>
          Thank you for choosing <b>Findbestone.com</b> as your trusted source
          for product reviews. We're committed to providing you with the
          information you need to make smart purchasing decisions and find the
          best products for your lifestyle.
        </p>

        <p>Happy shopping!</p>
      </div>
    </div>
  );
}
