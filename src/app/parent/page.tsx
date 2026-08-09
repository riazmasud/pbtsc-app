"use client";

import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

// TODO Phase 2: Fetch next practice, latest announcement, and attendance summary
// for the logged-in parent's child from Firestore.

export default function ParentDashboard() {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(" ")[0] || "there";

  return (
    <div>
      <PageHeader title={`Welcome back, ${firstName} 👋`} subtitle="Here's what's happening at PBTSC" />

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Next Practice
        </h2>
        <Card className="p-4">
          {/* TODO Phase 2: Render next upcoming practice */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex flex-col items-center justify-center shrink-0">
              <p className="text-[10px] font-semibold text-green-700">SAT</p>
              <p className="text-lg font-bold text-green-800">16</p>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">
                9:00 – 10:00 AM · Field 3, Main Complex
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Mr. Shohug</p>
              <p className="text-xs text-gray-500">Jaylen Johnson</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Latest Announcement
        </h2>
        <Card className="p-4">
          {/* TODO Phase 2: Render the most recent pinned or latest announcement */}
          <div className="flex items-center justify-between mb-1">
            <p className="font-semibold text-sm text-gray-900">
              🏆 End-of-Season Tournament — Aug 24
            </p>
            <span className="text-xs text-gray-400 shrink-0 ml-2">2 days ago</span>
          </div>
          <p className="text-sm text-gray-600">
            Join us for the season-ending tournament at Main Complex. Games start at 9 AM —
            please arrive 30 minutes early for warm-ups. Snacks provided!
          </p>
        </Card>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Quick Links
        </h2>
        <div className="grid gap-3">
          <Link href="/parent/schedule">
            <Card className="p-4 flex items-center gap-3 hover:border-green-200 transition-all">
              <span className="text-2xl">📅</span>
              <div>
                <p className="font-semibold text-sm">Full Schedule</p>
                <p className="text-xs text-gray-500">See all upcoming practices</p>
              </div>
            </Card>
          </Link>
          <Link href="/parent/announcements">
            <Card className="p-4 flex items-center gap-3 hover:border-green-200 transition-all">
              <span className="text-2xl">📢</span>
              <div>
                <p className="font-semibold text-sm">Announcements</p>
                <p className="text-xs text-gray-500">News and updates from the club</p>
              </div>
            </Card>
          </Link>
          <Link href="/parent/attendance">
            <Card className="p-4 flex items-center gap-3 hover:border-green-200 transition-all">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-sm">Attendance Record</p>
                <p className="text-xs text-gray-500">Your child's attendance history</p>
              </div>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
