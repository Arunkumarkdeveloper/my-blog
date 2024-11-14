import Image from "next/image";
import React from "react";
import Subscribe from "./Subscribe";

const Home = () => {
  return (
    <React.Fragment>
      <div className="home">
        <div className="home-content mb-50 mt-100">
          <h1
            style={{ fontSize: "25px" }}
            className="text"
            data-text="FIND BEST ONE FOR YOU">
            FIND BEST ONE FOR YOU
          </h1>
          <p>
            Get Our Best Recommendations To Help You Find The Best Services,
            Products, And More!
          </p>
          <Subscribe />
        </div>
      </div>
      <div className="home-section mt-30">
        <div className="home-section-width">
          <h3 className="text-center color-green mb-25">
            HOW TO CHOOSE BEST THING FOR YOU
          </h3>
          <p className="text-center">
            There are 3 main steps for choosing the best thing for you
          </p>
          <div className="choose-image-group mt-20">
            <div>
              <Image
                src="/images/research.webp"
                width={150}
                height={150}
                alt=""
              />
              <p className="text-center">Research and Reviews</p>
            </div>
            <div>
              <Image
                src="/images/analysis.webp"
                width={150}
                height={150}
                alt=""
              />
              <p className="text-center">Comparative Analysis</p>
            </div>
            <div>
              <Image
                src="/images/preference.webp"
                width={150}
                height={150}
                alt=""
              />
              <p className="text-center">Personal Preferences</p>
            </div>
          </div>
        </div>
      </div>
      <div className="layout-center">
        <div className="home-section-width mt-50">
          <div className="points-group-list mb-10">
            <div className="circle-green">1</div>
            <div className="ml-20">
              <h4 className="color-green">Expertly Curated Content</h4>
              <p>
                All the best products and services, chosen by expert reviewers
              </p>
            </div>
          </div>
          <div className="points-group-list mb-10">
            <div className="circle-green">2</div>
            <div className="ml-20">
              <h4 className="color-green">Diverse Categories</h4>
              <p>
                Here, you will find the best in various categories from
                technology and lifestyle to health.
              </p>
            </div>
          </div>
          <div className="points-group-list mb-10">
            <div className="circle-green">3</div>
            <div className="ml-20">
              <h4 className="color-green">In-Depth Reviews</h4>
              <p>
                It explains the pros and cons, as well as shares real-life
                experiences in reviewing every product or service; all with the
                aim of making sure that users make educated choices.
              </p>
            </div>
          </div>
          <div className="points-group-list mb-10">
            <div className="circle-green">4</div>
            <div className="ml-20">
              <h4 className="color-green">Comparisons Made Easy</h4>
              <p>
                Head-to-head comparisons of best options make it obvious as to
                which product or service is going to suit your needs.
              </p>
            </div>
          </div>
          <div className="points-group-list mb-10">
            <div className="circle-green">5</div>
            <div className="ml-20">
              <h4 className="color-green">User-Centric Design</h4>
              <p>
                It is also user-friendly for easy access to recommendations/
                information.
              </p>
            </div>
          </div>
          <div className="points-group-list">
            <div className="circle-green">6</div>
            <div className="ml-20">
              <h4 className="color-green">Trusted and Reliable</h4>
              <p>
                It conducts extensive research on every recommendation, so you
                can trust that the site will guide you to what is actually the
                best.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
