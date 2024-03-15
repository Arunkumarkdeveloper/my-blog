import React from "react";
import type { Metadata } from "next";
import { API_URL } from "@/frontend/Path";

export const metadata: Metadata = {
  title: "disclaimer",
  description: "This is the disclaimer page for findbestone.com",
  keywords: [
    "find,best,one,findbestone,findbestone.com,product,offers,good,disclaimer,findbest,findone,bestone",
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
    canonical: `${API_URL}/disclaimer`,
    languages: {
      "en-US": `/en-US/`,
      "de-DE": `/de-DE/`,
    },
  },
  openGraph: {
    title: "disclaimer",
    description: "This is the disclaimer page for findbestone.com",
    url: `${API_URL}/disclaimer`,
    siteName: "findbestone.com",
    locale: "en_US",
    type: "article",
    authors: ["Arunkumarkdeveloper"],
  },
  twitter: {
    card: "summary_large_image",
    site: "findbestone.com",
    title: "disclaimer",
    description: "This is the disclaimer page for findbestone.com",
    creator: "Arunkumarkdeveloper",
  },
};

export default function page() {
  return (
    <div id="about" className="d-flex justify-content-center mt-20 mb-30">
      <div className="about-page">
        <h6 className="fw-700 mb-15">Disclaimer</h6>
        <p>
          <b>Affiliate Links:</b> Our website may contain affiliate links, which
          means we may earn a commission if you click on a link and make a
          purchase. However, this will not affect the price you pay or influence
          our opinions. We only recommend products and services that we believe
          will add value to our readers.
        </p>
        <p>
          <b>Product Reviews:</b> The views and opinions expressed on our
          website are purely our own. Any product claim, statistic, quote, or
          other representation about a product or service should be verified
          with the manufacturer or provider.
        </p>
        <p>
          <b>Earnings Disclaimer:</b> We cannot guarantee that you will make any
          specific amount of money or achieve any specific results from using
          the products or services mentioned on our website. Your success
          depends on various factors, including your skills, knowledge, and
          dedication.
        </p>
        <p>
          <b>Testimonials:</b> Testimonials and success stories featured on our
          website are not necessarily typical results. Individual results may
          vary, and testimonials are not intended to represent or guarantee that
          anyone will achieve the same results.
        </p>
        <p>
          <b>Accuracy of Information:</b> While we strive to provide accurate
          and up-to-date information, we make no representations or warranties
          of any kind, express or implied, about the completeness, accuracy,
          reliability, suitability, or availability of any information,
          products, services, or related graphics contained on our website for
          any purpose.
        </p>
        <p>
          <b>External Links:</b> Our website may contain links to third-party
          websites or services that are not owned or controlled by us. We have
          no control over, and assume no responsibility for, the content,
          privacy policies, or practices of any third-party websites or
          services. We encourage you to read the terms of use and privacy policy
          of any third-party website you visit.
        </p>
        <p>
          <b>Changes to Disclaimer:</b> We reserve the right to update, amend,
          or change this disclaimer at any time without prior notice. Any
          changes will be posted on this page.
        </p>
        <p>
          By using our website, you agree to accept all terms and conditions
          outlined in this disclaimer.
        </p>
      </div>
    </div>
  );
}
