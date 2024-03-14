"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="d-flex justify-content-center align-items-center mt-50 mb-50">
      <div className="not-found">
        <h2 className="mb-15">SORRY! This Page is Not Available!</h2>
        <p className="mb-30">Page is Not Found.</p>
        <div className="d-flex gap-3">
          <button
            onClick={() => router.back()}
            className="home-button pl-25 pr-25"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
