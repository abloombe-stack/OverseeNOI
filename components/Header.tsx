"use client";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 h-12 flex items-center justify-between">
        <Link href="/" className="font-semibold">OverseeNOI</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/">Dashboard</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </div>
  );
}