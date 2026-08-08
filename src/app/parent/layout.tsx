"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/layout/NavBar";
import TabNav, { NavItem } from "@/components/layout/TabNav";

const parentNav: NavItem[] = [
  { label: "Home", href: "/parent", icon: "🏠" },
  { label: "Schedule", href: "/parent/schedule", icon: "📅" },
  { label: "Announcements", href: "/parent/announcements", icon: "📢" },
  { label: "Attendance", href: "/parent/attendance", icon: "✅" },
];

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "parent")) {
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
      <NavBar title="Parent Portal" />
      <TabNav items={parentNav} />
      <main className="max-w-2xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
