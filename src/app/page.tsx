import Link from "next/link";
import Image from "next/image";
import { basePath } from "@/lib/basePath";
import PublicHeader from "@/components/layout/PublicHeader";
import Card from "@/components/ui/Card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <section className="bg-green-700 text-white px-6 py-12 text-center">
        <Image
          src={`${basePath}/logo.jpg`}
          alt="PBTSC Logo"
          width={120}
          height={120}
          className="mx-auto mb-3 rounded-full"
        />
        <h1 className="text-3xl font-bold tracking-tight">PBTSC</h1>
        <p className="text-green-200 mt-1 text-sm">Palm Beach Tigers Sporting Club</p>

        <p className="text-green-100 text-sm leading-relaxed max-w-sm mx-auto mt-5">
          Welcome to the Palm Beach Tigers Sporting Club Soccer Academy! We're a
          community-driven youth soccer program serving players ages 5–12. Browse
          our roster and coaching staff below, or sign in if you're a registered
          parent, coach, or admin.
        </p>

        <Link
          href="/login"
          className="inline-block w-full max-w-sm bg-white text-green-700 font-semibold py-3 rounded-xl shadow hover:bg-green-50 transition-colors mt-6"
        >
          Sign In
        </Link>

        <p className="text-green-300 text-xs mt-2">
          Contact your admin if you don&apos;t have an account.
        </p>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-3">
          <Link href="/players">
            <Card className="p-4 flex items-center gap-3 hover:border-green-200 transition-all">
              <span className="text-2xl">👦</span>
              <div>
                <p className="font-semibold text-sm">Our Players</p>
                <p className="text-xs text-gray-500">Meet the academy roster</p>
              </div>
            </Card>
          </Link>
          <Link href="/coaches">
            <Card className="p-4 flex items-center gap-3 hover:border-green-200 transition-all">
              <span className="text-2xl">🧑‍🏫</span>
              <div>
                <p className="font-semibold text-sm">Our Coaches</p>
                <p className="text-xs text-gray-500">Meet the coaching staff</p>
              </div>
            </Card>
          </Link>
          <Link href="/announcements">
            <Card className="p-4 flex items-center gap-3 hover:border-green-200 transition-all">
              <span className="text-2xl">📢</span>
              <div>
                <p className="font-semibold text-sm">Announcements</p>
                <p className="text-xs text-gray-500">News and updates</p>
              </div>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}
