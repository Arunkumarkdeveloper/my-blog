import Link from "next/link";

export default function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center mt-50 mb-50">
      <div className="not-found">
        <h2 className="mb-15">SORRY! This Page is Not Available!</h2>
        <p className="mb-30">Page is Not Found.</p>
        <div className="d-flex gap-5">
          <Link href="/">
            <p>Home</p>
          </Link>
          <Link href="/post">
            <p>Posts</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
