"use client";

import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const _error = () => {
    router.back();
    reset();
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-50 mb-50">
      <div className="not-found">
        <h2 className="mb-15">SORRY! This Page is Not Available!</h2>
        <p className="mb-30">Page is Not Found.</p>
        <button onClick={_error} className="home-button pl-25 pr-25">
          Back
        </button>
      </div>
    </div>
  );
}
