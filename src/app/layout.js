import "../../public/css/header.css";
import "../../public/css/main.css";
import "../../public/css/layout.css";
import "../../public/css/responsive.css";
import Header from "@/frontend/section/Header";
import { Footer } from "@/frontend/section/Footer";
import ReduxProvider from "@/frontend/redux/ReduxProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cookies } from "next/headers";

const myTitle =
  "FindBestOne - Top Recommendations for the Best Services, Products & More";
const myDescription =
  "Get our best recommendations with expert reviews to help you find the best services, products, and more. It makes it easier to choose the right one for you";

export const metadata = {
  title: myTitle,
  description: myDescription,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_API_URL}`),
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_API_URL}`,
    languages: {
      "en-US": `${process.env.NEXT_PUBLIC_API_URL}/en-US`,
      "de-DE": `${process.env.NEXT_PUBLIC_API_URL}/de-DE`,
    },
  },
  openGraph: {
    title: myTitle,
    description: myDescription,
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: "findbestone.com",
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_API_URL}/images/logo.svg`,
        secureUrl: `${process.env.NEXT_PUBLIC_API_URL}/images/logo.svg`,
        width: 1200,
        height: 630,
        alt: "Preview image for findbestone.com",
      },
    ],
    locale: "en_US",
    authors: ["findbestone admin"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@findbestone_",
    title: myTitle,
    description: myDescription,
    creator: "@findbestone_",
    images: {
      url: `${process.env.NEXT_PUBLIC_API_URL}/images/logo.svg`,
      alt: "Preview image for findbestone.com",
    },
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_API_URL}/favicon.ico`,
    shortcut: `${process.env.NEXT_PUBLIC_API_URL}/favicon.ico`,
    apple: `${process.env.NEXT_PUBLIC_API_URL}/favicon.ico`,
    other: {
      rel: "apple-touch-icon-precomposed",
      url: `${process.env.NEXT_PUBLIC_API_URL}/favicon.ico`,
    },
  },
  category: "Blog",
};

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const jwtToken =
    cookieStore.get("jwtToken") && cookieStore.get("jwtToken").value;

  async function deleteCookie() {
    "use server";
    cookies().delete("jwtToken");
  }
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="Qh7lQXkM_Z6toIJpdaNnFzBIV8sVNornDVnZ-wlk2vk"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Inter"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Quicksand"
          rel="stylesheet"></link>
      </head>
      <GoogleAnalytics gaId="G-X9VZGNEVBR" />
      <body>
        <ReduxProvider>
          <Header jwtToken={jwtToken} deleteCookie={deleteCookie} />
          <div style={{ minHeight: "100vh" }}>{children}</div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}