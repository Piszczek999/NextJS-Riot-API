"use client";

import Link from "next/link";
import Searchbar from "./Searchbar";

const navLinks = [{ href: "/stats", label: "Statistics" }];

const authLinks = [
  { href: "/login", label: "Log in" },
  { href: "/register", label: "Sign up" },
];

export default function Navbar() {
  return (
    <nav className="navbar md:flex">
      <div className="flex justify-between">
        <Link href="/" className="md:border-r-2 md:pr-4">
          <h1 className="text-4xl hover:text-blue-700">LoLStats</h1>
        </Link>
        <div className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10"
            onClick={() => {
              const menu = document.getElementById("menu");
              menu.classList.contains("hidden")
                ? menu.classList.remove("hidden")
                : menu.classList.add("hidden");
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>

      <div className="hidden md:flex justify-between grow gap-4" id="menu">
        <div className="md:flex gap-4 md:ml-4 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-item block">
              {link.label}
            </Link>
          ))}
          <Searchbar />
        </div>
        <div className="md:flex gap-4 items-center">
          {authLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-item block">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
