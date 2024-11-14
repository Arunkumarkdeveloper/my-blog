const myTitle =
  "Disclaimer | Findbestone - Your Guide to Top Products and Services";
const myDescription =
  "Explore the terms, and limitations of our site's information, reviews, and recommendations for clear, reliable guidance on top choices.";

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
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_API_URL}/disclaimer`),
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_API_URL}/disclaimer`,
    languages: {
      "en-US": `${process.env.NEXT_PUBLIC_API_URL}/disclaimer/en-US`,
      "de-DE": `${process.env.NEXT_PUBLIC_API_URL}/disclaimer/de-DE`,
    },
  },
  openGraph: {
    title: myTitle,
    description: myDescription,
    url: `${process.env.NEXT_PUBLIC_API_URL}/disclaimer`,
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
        <h3 className="mb-auto">Disclaimer</h3>
        <p>
          Greetings, to the newcomer of our website www.findbestone.com. The
          goal of this website is to offer you valuable information which will
          help you to make correct choices concerning different services,
          products, technologies and many others. However, it is important to
          note the following:
        </p>
        <h4>General Information</h4>
        <p>
          All the information which is presented on the site is intended for
          reference only. We do not warrant that the functions contained in the
          website will be uninterrupted or error-free, that defects will be
          corrected, or that this website or the server that makes it available
          are free of viruses or other harmful components. You should therefore
          rely on such information only at your own risk.
        </p>
        <h4>Personal Opinions</h4>
        <p>
          All the reviews, comparisons and recommendations made on this site are
          of the authors and contributors, opinions only. The following are
          based on the work we have done and the research we have conducted and
          as such may not hold true especially with all users. Based on the
          findings, we advise you to make further research on any topic
          highlighted or seek professional assistance before making a purchasing
          or a service decision.
        </p>
        <h4>Affiliate Disclosure</h4>
        <p>
          In case we have any affiliated links on the website, it should be
          noted that we can earn a few bucks if you decide to make a purchase
          through the said link and with no additional coin out of your pocket.
          This in turn aids in the sustenance and development of the website but
          it does not sway any recommendation made here. The Veblen Rules only
          vouch for products and services that we think will benefit our readers
          in some way.
        </p>
        <h4>No Professional Advice</h4>
        <p>
          This website does not offer any legal advice and the information
          depicted on this website should not be taken as legal advice. Despite
          whether it is a product, service, or any other content, we are not
          specialists in law you health, finances or any other specialized
          subject, please consult where necessary. All of the suggestions
          provided on our website are for general audience and should not be
          considered specific professional advice.
        </p>
        <h4>Accuracy of Information</h4>
        <p>
          However, we use our best efforts to ensure that the information
          presented on the website is accurate and up to date, we cannot
          guarantee that the information on this website is entirely up to date
          or free from errors. The cost, characteristics, availability, or other
          specifications of products or services may be adjusted later. Please
          do not consider any of the information in this post as being
          gospel-truth, or fact; check with the relevant service providers or
          retailers.
        </p>
        <h4>Liability</h4>
        <p>
          In no event will the owners, authors, or contributors to this website
          be held responsible or held liable for any loss, injury, claim,
          liability or damage, direct or indirect, consequential, special or
          otherwise, arising out of or relating to the content on this website.
        </p>
        <h4>External Links</h4>
        <p>
          We may provide links on our website to other websites that are not
          operated or maintained by us. We do not own, operate or control any of
          those external sites that may be linked through this website and will
          not be held liable for any damages or injury, including those caused
          by viruses, resulting from use of those sites. Using these links is to
          your sole risk.
        </p>
        <h4>Changes to the Disclaimer</h4>
        <p>
          Changes to this disclaimer become effective when we post the revised
          disclaimer on the Website which was published on October 17, 2017, so
          please review it frequently. By using this website in any way after
          the changes to the disclaimer have been made, you signify your
          agreement to the changes.
        </p>
      </div>
    </div>
  );
}
