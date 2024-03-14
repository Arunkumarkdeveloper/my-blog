import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <div className="home_bg mb-50">
        <div className="d-flex flex-column align-items-center">
          <h2
            className="text mb-20 fw-900 text-center"
            data-text="Find Best One"
          >
            Find Best One
          </h2>
          <p
            className="text-center mb-20"
            style={{
              lineHeight: "2",
              color: "#c8c8c8",
              fontSize: "14px",
              opacity: "100%",
            }}
          >
            Finding the best products can depend on various factors!
          </p>
          <Link href="/post">
            <button className="home-button">Find yours</button>
          </Link>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center mb-50">
        <div className="feedback mb-30">
          <div className="finding-group-icons mb-40">
            <div className="d-flex flex-column align-items-center justify-content-center card">
              <img
                src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/need.webp"
                alt="Need"
                width={70}
                height={70}
                className="finding-icon"
              />
              <p className="mt-15">Need</p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center card">
              <img
                src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/choice.webp"
                alt="Preference"
                width={70}
                height={70}
                className="finding-icon"
              />
              <p className="mt-15">Preference</p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center card">
              <img
                src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/budget.webp"
                alt="Budget"
                width={70}
                height={70}
                className="finding-icon"
              />
              <p className="mt-15">Budget</p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center card">
              <img
                src="https://raw.githubusercontent.com/Arunkumarkdeveloper/BlogAppImages/main/icons/quality.webp"
                alt="Quality"
                width={70}
                height={70}
                className="finding-icon"
              />
              <p className="mt-15">Quality</p>
            </div>
          </div>
          <p className="text-center">
            Finding the best products for yourself can be a combination of
            several factors, including your needs, preferences, budget, and the
            quality of the product.
          </p>
        </div>
        <div className="feedback">
          <div className="d-flex flex-column align-items-start">
            <div className="feed-group card">
              <p className="fw-600">⭐ Define Your Needs</p>
              <p>
                Clearly outline what you need the product for and what features
                are essential for you. Understanding your requirements will help
                narrow down your options.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="feed-group card">
              <p className="fw-600">⭐ Research</p>
              <p>
                Use reliable sources such as consumer review websites, forums,
                and social media platforms to research the product category
                you're interested in. Pay attention to both expert reviews and
                user feedback to get a comprehensive understanding of the
                product's performance, durability, and value for money.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-start">
            <div className="feed-group card">
              <p className="fw-600">⭐ Compare Products</p>
              <p>
                Make a list of top-rated products based on your research and
                compare them side by side. Look at factors such as price,
                features, specifications, warranties, and customer reviews to
                determine which product best meets your needs.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="feed-group card">
              <p className="fw-600">⭐ Check Reliability and Reputation</p>
              <p>
                Consider the reliability and reputation of the brand or
                manufacturer. A well-established brand with a good track record
                of quality products and customer service is generally a safer
                bet.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-start">
            <div className="feed-group card">
              <p className="fw-600">⭐ Read User Reviews</p>
              <p>
                User reviews can provide valuable insights into the real-world
                performance of a product. Look for patterns in reviews to
                identify common issues or strengths.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="feed-group card">
              <p className="fw-600">⭐ Consider Long-Term Costs</p>
              <p>
                Evaluate not only the upfront cost of the product but also any
                ongoing costs such as maintenance, replacement parts, or
                subscription fees.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-start">
            <div className="feed-group card">
              <p className="fw-600">⭐ Seek Recommendations</p>
              <p>
                Ask friends, family members, or colleagues who have experience
                with similar products for recommendations. Personal
                recommendations can often be very helpful in making a decision.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="feed-group card">
              <p className="fw-600">⭐ Look for Deals and Discounts</p>
              <p>
                Keep an eye out for deals, discounts, or promotions that can
                help you save money on your purchase. However, be cautious of
                deals that seem too good to be true, as they may indicate
                inferior quality or hidden costs.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-start">
            <div className="feed-group card">
              <p className="fw-600">⭐ Check Return Policies and Warranties</p>
              <p>
                Make sure to review the return policy and warranty terms before
                making a purchase. A generous return policy and a reliable
                warranty can provide added peace of mind.
              </p>
            </div>
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="feed-group card">
              <p className="fw-600">⭐ Trust Your Instincts</p>
              <p>
                Ultimately, trust your instincts and go with the product that
                feels right for you. If something seems too good to be true or
                if you have doubts about a product's quality, it's okay to
                explore other options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
