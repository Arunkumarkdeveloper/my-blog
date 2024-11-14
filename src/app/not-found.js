import Link from "next/link";

export default function NotFound() {
  return (
    <div className="layout-center">
      <div className="mt-25">
        <h2 className="color-green">Sorry, This Page is Not Found</h2>
        <Link href="/">
          <bsutton className="btn">Go to Home</bsutton>
        </Link>
      </div>
    </div>
  );
}
