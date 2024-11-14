const myTitle = "Privacy Policy | Your Data Protection at Findbestone";
const myDescription =
  "Learn about our data collection practices, how we use your information, and your privacy rights in our privacy policy rules. Stay informed and secure with us.";

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
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_API_URL}/privacy-policy`),
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_API_URL}/privacy-policy`,
    languages: {
      "en-US": `${process.env.NEXT_PUBLIC_API_URL}/privacy-policy/en-US`,
      "de-DE": `${process.env.NEXT_PUBLIC_API_URL}/privacy-policy/de-DE`,
    },
  },
  openGraph: {
    title: myTitle,
    description: myDescription,
    url: `${process.env.NEXT_PUBLIC_API_URL}/privacy-policy`,
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
        <h3 className="mb-auto">Privacy Policy</h3>
        <p>
          When visiting the website Find Best One for You available at{" "}
          <a href="/">www.findbestone.com</a> your privacy is of most importance
          to us. This website privacy policy outlines the nature of the personal
          information we collect and our use of such information. By using our
          site, you agree to our collecting and processing of your info
          according to the information stated here.
        </p>
        <h4>Information We Collect</h4>
        <p>Here's the kind of info we might collect:</p>
        <ul>
          <li>
            <strong>Personal Data:</strong> When you participate in what we do
            here, by providing your name or e-mail address or any other contact
            details as seen in subscribing to our newsletter or even when you
            decide to leave a comment.
          </li>
          <li>
            <strong>Usage Info:</strong> To understand how you use our website,
            we store information about your visits, your IP address, the type of
            browser you have, the pages you access, and other details that we
            use to improve the site for your future visits.
          </li>
          <li>
            <strong>Cookies:</strong> We may utilize cookies and related
            technologies to track your interactions with our website and such
            activities may entail collecting particular details. Cookies help us
            increase our site functionality by storing your settings and
            preferences, thus improving our services.
          </li>
        </ul>
        <h4>How We Use Your Information</h4>
        <p>We use the info we collect in these ways:</p>
        <ul>
          <li>For the operation and functioning of our website</li>
          <li>To improve your experience on the site we would use cookies</li>
          <li>
            If you registered on our email list, to send you newsletters or
            updates
          </li>
          <li>
            As a purpose to better understand the usage and activity of the
            users on our website, and the type of traffic we attract.
          </li>
          <li>
            To avoid hitting on this kind of fraud and also for our website
            security measures.
          </li>
        </ul>
        <h4>Third-Party Services</h4>
        <p>
          We partner with reputable third-party services, such as Google
          Analytics, to maintain an understanding of the flow of traffic to our
          website and engagement of our material. These tools collect data from
          your browser every time you visit our website and assist in enhancing
          your stay on the site. There is some information on our site that is
          affiliated with an external link. This means that if you choose to
          purchase something through one of these links, we receive a small
          commission on your purchase - at no additional cost to you. We use
          cookies to have our affiliate partners track your purchase and so that
          we can get credit for the referral Beneath that, your private
          information is secure and will not be forwarded to the affiliate
          placed.
        </p>
        <h4>Data Security</h4>
        <p>
          It remains our prerogative to guarantee the safety of the given
          information. Of course, no form of electronic transfer is 100% secure,
          so we use the most commercially reasonable measures to ensure that
          your information is safe.
        </p>
        <p>Your Rights</p>
        <ul>
          <li>
            When you order one of our services, do not hesitate to provide
            addresses where We can direct the corresponding personal information
            concerning you.
          </li>
          <li>
            Update modifications to your sensible information if it is
            inaccurate or incomplete.
          </li>
          <li>
            Request that we delete or cease to process your data in some
            specific circumstances.
          </li>
          <li>
            For the exercise of any of these rights, please send an email to
            findbestonebusiness@gmail.com
          </li>
        </ul>
        <h4>Changes to This Privacy Policy</h4>
        <p>
          These amendments may be published once in a while, and it is also
          hereby notified that we may change our Privacy Policy occasionally.
          Any changes will be updated on this page so to help you understand
          changes without having to look at the entire policy document, this
          revised policy will contain changes on how we deal with your data. We
          would like to notify you that you need to review this Privacy Policy
          occasionally.
        </p>
        <h4>Contact Us</h4>
        <p>
          If you have any questions about this Privacy Policy or our data
          practices, please feel free to contact us at:
        </p>
        <p>
          <strong>Email:</strong> findbestonebusiness@gmail.com
        </p>
      </div>
    </div>
  );
}
