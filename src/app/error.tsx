"use client";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="d-flex justify-content-center align-items-center mt-50 mb-50">
          <div className="not-found">
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button>
            <Link href="/">Home</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
