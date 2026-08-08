import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-700 px-6 text-white">
      <div className="max-w-sm w-full text-center space-y-6">
        <div>
          <Image src="/logo.jpg" alt="PBTSC Logo" width={120} height={120} className="mx-auto mb-3 rounded-full" />
          <h1 className="text-3xl font-bold tracking-tight">PBTSC</h1>
          <p className="text-green-200 mt-1 text-sm">
            Palm Beach Tigers Sporting Club
          </p>
        </div>

        <p className="text-green-100 text-sm leading-relaxed">
          The all-in-one portal for our Soccer Academy.
        </p>

        <Link
          href="/login"
          className="block w-full bg-white text-green-700 font-semibold py-3 rounded-xl shadow hover:bg-green-50 transition-colors"
        >
          Sign In
        </Link>

        <p className="text-green-300 text-xs">
          Contact your admin if you don&apos;t have an account.
        </p>
      </div>
    </main>
  );
}
