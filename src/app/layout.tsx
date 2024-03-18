import Header from "@/frontend/Header";
import { AuthProvider } from "./providers";
import { Metadata } from "next";
import Footer from "@/frontend/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "../../public/css/footer.css";
import "../../public/css/header.css";
import "../../public/css/main.css";
import "../../public/css/post.css";
import "../../public/css/home.css";
import "../../public/css/responsive.css";
import { API_URL } from "@/frontend/Path";
import Loading from "@/frontend/Loading";
import { GoogleAnalytics } from "@next/third-parties/google";

import ReduxProvider from "@/redux/ReduxProvider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "findbestone",
    template: "%s | findbestone",
  },
  description:
    "Finding the best products for yourself can be a combination of several factors, including your needs, preferences, budget, and the quality of the product. This is the findbestone.com website.",
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
    canonical: `${API_URL}`,
    languages: {
      "en-US": `/en-US/`,
      "de-DE": `/de-DE/`,
    },
  },
  openGraph: {
    title: "About-findbestone",
    description: "This is the findbestone.com",
    url: `${API_URL}`,
    siteName: "findbestone.com",
    locale: "en_US",
    type: "article",
    authors: ["Arunkumarkdeveloper"],
  },
  twitter: {
    card: "summary_large_image",
    site: "findbestone.com",
    title: "About-findbestone",
    description: "This is the findbestone.com",
    creator: "Arunkumarkdeveloper",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        ></link>
      </head>
      <GoogleAnalytics gaId="G-738JLNP7ZV" />
      <body>
        <ReduxProvider>
          <AuthProvider>
            <Header />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Footer />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
