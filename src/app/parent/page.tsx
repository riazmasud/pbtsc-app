"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getUpcomingPractices } from "@/lib/firebase/services/practices";
import { getAllAnnouncements } from "@/lib/firebase/services/announcements";
import { Practice, Announcement } from "@/types";

function dayBadge(dateStr: string): { day: string; date: string } {
  const d = new Date(`${dateStr}T00:00:00`);
  return {
    day: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
    date: String(d.getDate()),
  };
}

export default function ParentDashboard() {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(" ")[0] || "there";

  const [nextPractice, setNextPractice] = useState<Practice | null>(null);
  const [latestAnnouncement, setLatestAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getUpcomingPractices(), getAllAnnouncements()]).then(
      ([practices, announcements]) => {
        setNextPractice(practices[0] || null);
        setLatestAnnouncement(announcements[0] || null);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div>
      <PageHeader title={`Welcome back, ${firstName} 👋`} subtitle="Here's what's happening at PBTSC" />

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Next Practice
        </h2>
        <Card className="p-4">
          {loading && <p className="text-sm text-gray-400">Loading…</p>}
          {!loading && !nextPractice && (
            <div className="text-center py-5 text-gray-400">
              <p className="text-3xl mb-2">📅</p>
              <p className="text-sm">No upcoming practices scheduled.</p>
            </div>
          )}
          {!loading && nextPractice && (
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex flex-col items-center justify-center shrink-0">
                <p className="text-[10px] font-semibold text-green-700">
                  {dayBadge(nextPractice.date).day}
                </p>
                <p className="text-lg font-bold text-green-800">
                  {dayBadge(nextPractice.date).date}
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  {nextPractice.startTime} – {nextPractice.endTime} · {nextPractice.location}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{nextPractice.coachName}</p>
              </div>
            </div>
          )}
        </Card>
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Latest Announcement
        </h2>
        <Card className="p-4">
          {loading && <p className="text-sm text-gray-400">Loading…</p>}
          {!loading && !latestAnnouncement && (
            <div className="text-center py-5 text-gray-400">
              <p className="text-3xl mb-2">📢</p>
              <p className="text-sm">No announcements yet.</p>
            </div>
          )}
          {!loading && latestAnnouncement && (
            <>
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-sm text-gray-900">{latestAnnouncement.title}</p>
                <span className="text-xs text-gray-400 shrink-0 ml-2">
                  {new Date(latestAnnouncement.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600">{latestAnnouncement.body}</p>
            </>
          )}
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
          <Link href="/players">
            <Card className="p-4 flex items-center gap-3 hover:border-green-200 transition-all">
              <span className="text-2xl">👦</span>
              <div>
                <p className="font-semibold text-sm">Players</p>
                <p className="text-xs text-gray-500">Meet the academy roster</p>
              </div>
            </Card>
          </Link>
          <Link href="/coaches">
            <Card className="p-4 flex items-center gap-3 hover:border-green-200 transition-all">
              <span className="text-2xl">🧑‍🏫</span>
              <div>
                <p className="font-semibold text-sm">Coaches</p>
                <p className="text-xs text-gray-500">Meet the coaching staff</p>
              </div>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
