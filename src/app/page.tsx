import Image from "next/image";

export default async function Page() {
  return (
    <div>
      <div className="home_bg">
        <div className="text-center home_bg_text">
          <h5 className="fw-900 mb-30">FIND BEST ONE FOR YOU</h5>
          <p style={{ lineHeight: "2" }}>
            Finding the best products can depend on various factors including
            your specific needs, preferences, budget, and the quality of the
            products available in the market.
          </p>
        </div>
        <div>
          <Image
            src="/image/home_bg.png"
            alt="FindBestOne"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div style={{ height: "100vh" }}></div>
    </div>
  );
}
