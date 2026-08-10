"use client";

import Image from "next/image";
import Link from "next/link";
import { basePath } from "@/lib/basePath";

export default function PublicHeader() {
  return (
    <header className="bg-green-700 text-white shadow-md sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3 max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={`${basePath}/logo.jpg`}
            alt="PBTSC"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-bold text-sm">PBTSC</span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <Link href="/players" className="hover:underline">
            Players
          </Link>
          <Link href="/coaches" className="hover:underline">
            Coaches
          </Link>
          <Link href="/announcements" className="hover:underline">
            Announcements
          </Link>
          <Link
            href="/login"
            className="bg-green-800 hover:bg-green-900 px-3 py-1.5 rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
