import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <div className="home_bg mb-50">
        <div className="d-flex flex-column align-items-center">
          <h1
            className="text mb-20 fw-900 text-center font-30"
            data-text="Find Best One"
          >
            Find Best One
          </h1>
          <p
            className="text-center mb-20"
            style={{
              lineHeight: "2",
              color: "#292929",
              fontSize: "14px",
              opacity: "100%",
            }}
          >
            Finding the best products can depend on various factors!
          </p>
          <Link href="/posts">
            <button className="home-button">Find yours</button>
          </Link>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center mb-50">
        <div className="feedback mb-30">
          <div className="finding-group-icons mb-40">
            <div className="d-flex flex-column align-items-center justify-content-center card">
              <img
                src="/image/need.webp"
                alt="Need"
                title="Need"
                width={70}
                height={70}
                className="finding-icon"
              />
              <p className="mt-15">Need</p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center card">
              <img
                src="/image/choice.webp"
                alt="Preference"
                title="Preference"
                width={70}
                height={70}
                className="finding-icon"
              />
              <p className="mt-15">Preference</p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center card">
              <img
                src="/image/budget.webp"
                alt="Budget"
                title="Budget"
                width={70}
                height={70}
                className="finding-icon"
              />
              <p className="mt-15">Budget</p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center card">
              <img
                src="/image/quality.webp"
                alt="Quality"
                title="Quality"
                width={70}
                height={70}
                className="finding-icon"
              />
              <p className="mt-15">Quality</p>
            </div>
          </div>
          <p className="text-center">
            Finding the first-rate merchandise for yourself can be a mixture of
            several elements, together with your needs, preferences, budget, and
            the fine of the product.
          </p>
        </div>
        <div className="feedback">
          <div className="d-flex flex-column align-items-start">
            <div className="feed-group card">
              <p className="fw-600">⭐ Define Your Needs</p>
              <p>
                Clearly outline what you need the product for and what features
                are essential for you. Understanding your necessities will help
                slim down your alternatives.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="feed-group card">
              <p className="fw-600">⭐ Research</p>
              <p>
                Use dependable assets which include customer review web sites,
                forums, and social media platforms to research the product class
                you are interested in. Pay attention to both professional
                evaluations and consumer feedback to get a comprehensive
                knowledge of the product's performance, durability, and value
                for money.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-start">
            <div className="feed-group card">
              <p className="fw-600">⭐ Compare Products</p>
              <p>
                Make a listing of top-rated merchandise based for your research
                and compare them aspect by using facet. Look at elements which
                includes price, functions, specifications, warranties, and
                patron reviews to determine which product great meets your
                desires.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="feed-group card">
              <p className="fw-600">⭐ Check Reliability and Reputation</p>
              <p>
                Consider the reliability and popularity of the brand or
                producer. A properly-installed logo with a great tune document
                of first-class products and customer service is generally a
                safer guess.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-start">
            <div className="feed-group card">
              <p className="fw-600">⭐ Read User Reviews</p>
              <p>
                User opinions can provide treasured insights into the real-world
                overall performance of a product. Look for patterns in critiques
                to become aware of commonplace problems or strengths.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="feed-group card">
              <p className="fw-600">⭐ Consider Long-Term Costs</p>
              <p>
                Evaluate no longer best the upfront cost of the product however
                additionally any ongoing charges which include maintenance,
                substitute parts, or subscription fees.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-start">
            <div className="feed-group card">
              <p className="fw-600">⭐ Seek Recommendations</p>
              <p>
                Ask buddies, circle of relatives members, or colleagues who have
                experience with similar products for suggestions. Personal
                guidelines can often be very beneficial in you make a decision.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="feed-group card">
              <p className="fw-600">⭐ Look for Deals and Discounts</p>
              <p>
                Keep an eye out for deals, reductions, or promotions that let
                you keep cash to your purchase. However, be cautious of offers
                that appear too properly to be true, as they'll imply inferior
                exceptional or hidden costs.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-start">
            <div className="feed-group card">
              <p className="fw-600">⭐ Check Return Policies and Warranties</p>
              <p>
                Make certain to check the go back policy and guarantee phrases
                before making a buy. A generous go back coverage and a reliable
                guarantee can provide added peace of thoughts.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="feed-group card">
              <p className="fw-600">⭐ Trust Your Instincts</p>
              <p>
                Ultimately, accept as true with your instincts and go together
                with the product that feels right for you. If some thing appears
                too precise to be proper or when you have doubts about a
                product's quality, it's ok to discover different options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
