import React from "react";
import type { Metadata } from "next";
import { API_URL } from "@/frontend/Path";

export const metadata: Metadata = {
  title: "terms-privacy",
  description: "This is the terms-privacy page for findbestone.com",
  keywords: [
    "find,best,one,findbestone,findbestone.com,product,offers,good,terms-privacy",
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
    canonical: `${API_URL}/terms-privacy`,
    languages: {
      "en-US": `/en-US/`,
      "de-DE": `/de-DE/`,
    },
  },
  openGraph: {
    title: "terms-privacy",
    description: "This is the terms-privacy page for findbestone.com",
    url: `${API_URL}/about`,
    siteName: "findbestone.com",
    locale: "en_US",
    type: "article",
    authors: ["Arunkumarkdeveloper"],
  },
  twitter: {
    card: "summary_large_image",
    site: "findbestone.com",
    title: "terms-privacy",
    description: "This is the terms-privacy page for findbestone.com",
    creator: "Arunkumarkdeveloper",
  },
};

export default function page() {
  return (
    <div id="about" className="d-flex justify-content-center mt-20 mb-30">
      <div className="about-page">
        <h6 className="fw-600 mb-15">Terms of Service</h6>
        <p className="mb-25">
          Welcome to findbestone.com! These terms of service ("Terms") govern
          your access to and use of our website, including any content,
          functionality, and services offered on or through findbestone.com (the
          "Website"). Please read these Terms carefully before using the
          Website.
        </p>

        <h6 className="fw-600 mb-15">Acceptance of Terms</h6>
        <p className="mb-25">
          By accessing or using the Website, you agree to be bound by these
          Terms and our Privacy Policy. If you do not agree to these Terms, you
          may not use the Website.
        </p>

        <h6 className="fw-600 mb-15">Use of Website</h6>
        <p className="mb-10">
          You may use the Website only for lawful purposes and in accordance
          with these Terms. You agree not to use the Website:
        </p>

        <ul className="mb-25">
          <li>
            In any way that violates any applicable federal, state, local, or
            international law or regulation.
          </li>
          <li>
            To engage in any conduct that restricts or inhibits anyone's use or
            enjoyment of the Website.
          </li>
          <li>
            To impersonate or attempt to impersonate findbestone.com, a
            findbestone.com employee, another user, or any other person or
            entity.
          </li>
        </ul>

        <h6 className="fw-600 mb-15">Intellectual Property</h6>
        <p className="mb-25">
          The Website and its entire contents, features, and functionality
          (including but not limited to all information, software, text,
          displays, images, video, and audio, and the design, selection, and
          arrangement thereof) are owned by findbestone.com, its licensors, or
          other providers of such material and are protected by United States
          and international copyright, trademark, patent, trade secret, and
          other intellectual property or proprietary rights laws.
        </p>

        <h6 className="fw-600 mb-15">Links to Other Websites</h6>
        <p className="mb-25">
          The Website may contain links to third-party websites or services that
          are not owned or controlled by findbestone.com. findbestone.com has no
          control over, and assumes no responsibility for, the content, privacy
          policies, or practices of any third-party websites or services. You
          further acknowledge and agree that findbestone.com shall not be
          responsible or liable, directly or indirectly, for any damage or loss
          caused or alleged to be caused by or in connection with the use of or
          reliance on any such content, goods, or services available on or
          through any such websites or services.
        </p>

        <h6 className="fw-600 mb-15">Modifications to Terms</h6>
        <p className="mb-25">
          findbestone.com reserves the right to modify or amend these Terms at
          any time. All changes are effective immediately when we post them and
          apply to all access to and use of the Website thereafter. Your
          continued use of the Website following the posting of revised Terms
          means that you accept and agree to the changes.
        </p>

        <h6 className="fw-600 mb-15">Contact Us</h6>
        <p className="mb-25">
          If you have any questions about these Terms, please contact us at{" "}
          <b>findbestone1@gmail.com.</b>
        </p>
      </div>
    </div>
  );
}
