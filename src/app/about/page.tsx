import React from "react";
import type { Metadata } from "next";
import { API_URL } from "@/frontend/Path";

export const metadata: Metadata = {
  title: "About",
  description: "This is the about page for findbestone.com",
  keywords: [
    "findbestone",
    "findbestone.com",
    "find",
    "best",
    "one",
    "product",
    "offers",
    "good",
    "findbest",
    "findone",
    "bestone",
    "about",
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
      "en-US": `${API_URL}/about`,
      "de-DE": `${API_URL}/about`,
    },
  },
  openGraph: {
    title: "About",
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
    title: "About",
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
          At <b>Findbestone.com</b>, we're passionate about assisting clients
          make informed purchasing choices by way of supplying honest and
          thorough product reviews. Whether you're searching for the proper
          splendor product, the today's tech machine, or essential domestic home
          equipment, we've were given you protected.
        </p>
        <p>
          Our mission is simple: to discover and show off the satisfactory
          products in the marketplace, so you can save with self belief. We
          understand that navigating the countless sea of alternatives may be
          overwhelming, that's why we're here to do the research for you. Our
          team of professionals fastidiously exams and evaluates each product to
          make certain that simplest the pinnacle performers make it onto our
          website online.
        </p>
        <p>What sets us apart:</p>

        <ol>
          <li>
            <u>Unbiased Reviews:</u> We pleasure ourselves on our honesty and
            integrity. Our critiques are continually independent and obvious,
            and we never let sponsorships or partnerships have an effect on our
            evaluations.
          </li>
          <li>
            <u>Comprehensive Analysis:</u> We go past the floor to offer you
            with in-depth insights into every product. From special
            specifications to real-international overall performance
            assessments, we cover all the bases to give you a whole image.
          </li>
          <li>
            <u>User-Focused Approach:</u> Our remaining goal is to serve our
            readers. That's why we prioritize your wishes and options in the
            whole lot we do. Whether you are a finances-aware client or a tech
            enthusiast searching out the modern improvements, we've were given
            some thing for every person.
          </li>
          <li>
            <u>Community Engagement:</u> We cost the input and feedback of our
            readers. That's why we inspire you to enroll in the verbal exchange
            with the aid of leaving remarks, asking questions, and sharing your
            own studies. Your insights assist us enhance and tailor our content
            to higher serve you.
          </li>
        </ol>
        <p>
          Thank you for deciding on <b>Findbestone.com</b> as your depended on
          supply for product reviews. We're dedicated to supplying you with the
          facts you need to make smart buying choices and discover the
          exceptional merchandise on your life-style.
        </p>

        <p>Happy shopping!</p>
      </div>
    </div>
  );
}
