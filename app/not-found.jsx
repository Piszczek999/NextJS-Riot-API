import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="text-center">
      <h1 className="text-2xl text-blue-500 mt-5">There was a problem.</h1>
      <p>We could not find the page you were looking for.</p>
      <p>
        Go back to the{" "}
        <Link href="/" className="nav-item text-blue-500">
          Home Page
        </Link>
      </p>
    </main>
  );
}
