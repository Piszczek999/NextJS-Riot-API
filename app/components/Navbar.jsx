import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="border-r-2 pr-4">
        <h1 className="text-4xl hover:text-blue-500">LoLStats</h1>
      </Link>
      <div className="flex justify-between grow gap-4">
        <div className="flex gap-4 ml-4">
          <Link href="/" className="nav-item">
            Home Page
          </Link>
          <Link href="/stats" className="nav-item">
            Statistics
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="nav-item">
            Log in
          </Link>
          <Link href="/register" className="nav-item">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
