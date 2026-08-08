"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/layout/NavBar";
import TabNav, { NavItem } from "@/components/layout/TabNav";

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: "🏠" },
  { label: "Players", href: "/admin/players", icon: "👦" },
  { label: "Coaches", href: "/admin/coaches", icon: "🧑‍🏫" },
  { label: "Practices", href: "/admin/practices", icon: "📅" },
  { label: "Announcements", href: "/admin/announcements", icon: "📢" },
  { label: "Attendance", href: "/admin/attendance", icon: "✅" },
  { label: "Payments", href: "/admin/coach-payments", icon: "💰" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar title="Admin" />
      <TabNav items={adminNav} />
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
