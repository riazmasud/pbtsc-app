"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { getAllPlayers } from "@/lib/firebase/services/players";
import { getActiveCoaches } from "@/lib/firebase/services/coaches";
import { getUpcomingPractices } from "@/lib/firebase/services/practices";
import { getAllAnnouncements } from "@/lib/firebase/services/announcements";

const quickLinks = [
  { label: "Manage Players", href: "/admin/players", icon: "👦", desc: "Add, edit, or deactivate players" },
  { label: "Manage Coaches", href: "/admin/coaches", icon: "🧑‍🏫", desc: "Add coaches and view details" },
  { label: "Manage Users", href: "/admin/users", icon: "👤", desc: "Create admin, coach & parent accounts" },
  { label: "Post Announcement", href: "/admin/announcements", icon: "📢", desc: "Send updates to all parents" },
  { label: "Schedule Practices", href: "/admin/practices", icon: "📅", desc: "Create and manage practice sessions", comingSoon: true },
  { label: "View Attendance", href: "/admin/attendance", icon: "✅", desc: "Review attendance by practice", comingSoon: true },
  { label: "Coach Payments", href: "/admin/coach-payments", icon: "💰", desc: "Track and record coach payments", comingSoon: true },
];

interface Stat {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat[]>([
    { label: "Total Players", value: "—", icon: "👦", color: "bg-blue-50 text-blue-700" },
    { label: "Active Coaches", value: "—", icon: "🧑‍🏫", color: "bg-purple-50 text-purple-700" },
    { label: "Upcoming Practices", value: "—", icon: "📅", color: "bg-green-50 text-green-700" },
    { label: "Announcements", value: "—", icon: "📢", color: "bg-yellow-50 text-yellow-700" },
  ]);

  useEffect(() => {
    Promise.all([
      getAllPlayers(),
      getActiveCoaches(),
      getUpcomingPractices(),
      getAllAnnouncements(),
    ]).then(([players, coaches, practices, announcements]) => {
      setStats([
        { label: "Total Players", value: players.length, icon: "👦", color: "bg-blue-50 text-blue-700" },
        { label: "Active Coaches", value: coaches.length, icon: "🧑‍🏫", color: "bg-purple-50 text-purple-700" },
        { label: "Upcoming Practices", value: practices.length, icon: "📅", color: "bg-green-50 text-green-700" },
        { label: "Announcements", value: announcements.length, icon: "📢", color: "bg-yellow-50 text-yellow-700" },
      ]);
    });
  }, []);

  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="Overview of the academy" />

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Quick Access
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {quickLinks.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="p-4 flex items-start gap-3 hover:border-green-200 hover:shadow-md transition-all">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-sm text-gray-800 flex items-center gap-2">
                  {item.label}
                  {item.comingSoon && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                      Soon
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
