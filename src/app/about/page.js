const myTitle = "About | Discover Top Recommendations at Findbestone";
const myDescription =
  "We provide and are dedicated to helping you find the best products, services, and expert recommendations for informed decision-making.";

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
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_API_URL}/about`),
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_API_URL}/about`,
    languages: {
      "en-US": `${process.env.NEXT_PUBLIC_API_URL}/about/en-US`,
      "de-DE": `${process.env.NEXT_PUBLIC_API_URL}/about/de-DE`,
    },
  },
  openGraph: {
    title: myTitle,
    description: myDescription,
    url: `${process.env.NEXT_PUBLIC_API_URL}/about`,
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

export default function Page() {
  return (
    <div className="layout-center">
      <div id="blog" className="blog-responsive mt-20">
        <h3 className="mb-auto">About Findbestone.com</h3>
        <p>
          Sincerely at Findbestone, we aim to make our mission to help you find
          the best products, technologies, and services out there. Our objective
          remains clear, and preparing our audience with a list of handpicked
          articles in all the available categories to ensure they do not make a
          wrong decision. Whether customers come directly to our site from a web
          search for the newest gadgets, or following a recommendation for a
          trusted provider of household items and much more, we want to help
          make their decision easier. We look for information, differentiate
          sources, and evaluate so that you have credible sources and genuine
          reviews in one location.
        </p>
        <h4 className="mb-auto">Our Mission</h4>
        <p>
          It is for this reason that we feel the process of defining and
          identifying the right products should be a smooth one. That is why we
          take time and best effort to provide you with the best choices in
          every category that we offer. Our drive is to enable you to enact
          choices that will prove beneficial thus the detailed reviews,
          comparisons, and recommendations that you will find here.
        </p>
        <h4 className="mb-auto">What We Offer</h4>
        <p>At Find Best One, you'll find:</p>
        <ul>
          <li>
            <strong>Expert Reviews:</strong> This means that we look at all the
            possibilities such as the additional attributes of each product so
            that you do not have to.
          </li>
          <li>
            <strong>Top Recommendations:</strong> We pointed out the best
            technology, home appliances and gadgets, lifestyle products, and
            many others.
          </li>
          <li>
            <strong>Comparisons & Guides:</strong> We make your shopping process
            easier by providing you with comparisons and buying guides to help
            you make purchase decisions.
          </li>
        </ul>
        <h4 className="mb-auto">Why Trust Us?</h4>
        <p>
          You can be assured that all the information we deliver is
          well-researched and not swayed by any particular angle. We pride
          ourselves in providing recommendations that are unique, sensible, and
          based on practical knowledge.
        </p>
        <h4 className="mb-auto">Stay Connected</h4>
        <p>
          Come and be part of our team to discover the best products and
          services out in the market. Whether it's computer technology or some
          necessity of life that you are looking to replace we are here to guide
          you to the right ones. We hope you have a great time visiting Find
          Best One, the ultimate strategist on how to make the right choice.
        </p>
      </div>
    </div>
  );
}
