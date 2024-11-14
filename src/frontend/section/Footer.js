import Image from "next/image";
import Link from "next/link";
import Subscribe from "./Subscribe";

export const Footer = () => {
  return (
    <footer className="mt-30">
      <div className="footer-group">
        <div>
          <Link href="/">
            <Image
              src="/images/logo.svg"
              width={150}
              height={40}
              alt="Findbestone"
              className="logo"
            />
          </Link>
          <p>© 2024 Findbestone.com. All Rights Reserved.</p>
        </div>
        <div>
          <h3>Website</h3>
          <p className="mb-20">
            <Link href="/" className="color-black">
              Home
            </Link>
          </p>
          <p className="mb-20">
            <Link href="/about" className="color-black">
              About
            </Link>
          </p>
          <p className="mb-20">
            <Link href="/privacy-policy" className="color-black">
              Privacy & Policy
            </Link>
          </p>
          <p>
            <Link href="/disclaimer" className="color-black">
              Disclaimer
            </Link>
          </p>
        </div>
        <div>
          <h3>Newsletters</h3>
          <p>Subscribe for the newsletter and receive future updates.</p>
          <Subscribe />
        </div>
        <div>
          <h3>Follow Us</h3>
          <div className="social-icons">
            <Link href="https://x.com/findbestone_" target="_blank">
              <Image src="/images/twitter.png" width={20} height={20} alt="" />
            </Link>
            <Image src="/images/facebook.svg" width={20} height={20} alt="" />
            <Link
              href="https://www.linkedin.com/in/findbestone-business-380a01333"
              target="_blank">
              <Image src="/images/linkedin.svg" width={20} height={20} alt="" />
            </Link>
            <Link href="https://www.youtube.com/@find_best_one" target="_blank">
              <Image src="/images/youtube.svg" width={20} height={20} alt="" />
            </Link>
            <Image src="/images/instagram.svg" width={20} height={20} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};
