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

import ReduxProvider from "@/redux/ReduxProvider";

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "findbestone",
    template: "%s | findbestone",
  },
  description: "This is the findbestone.com website",
  keywords: [
    "find,best,one,findbestone,findbestone.com,product,offers,good,about",
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
    title: "About-findbestone",
    description: "This is the About page for findbestone.com",
    url: `${API_URL}/about`,
    siteName: "findbestone.com",
    locale: "en_US",
    type: "article",
    authors: ["Arunkumarkdeveloper"],
  },
  twitter: {
    card: "summary_large_image",
    site: "findbestone.com",
    title: "About-findbestone",
    description: "This is the About page for findbestone.com",
    creator: "Arunkumarkdeveloper",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <ReduxProvider>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
