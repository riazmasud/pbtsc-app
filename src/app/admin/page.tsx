import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Card from "@/components/ui/Card";
import Link from "next/link";

// TODO Phase 2: Replace static values with Firestore counts
const stats = [
  { label: "Total Players", value: "—", icon: "👦", color: "bg-blue-50 text-blue-700" },
  { label: "Active Coaches", value: "—", icon: "🧑‍🏫", color: "bg-purple-50 text-purple-700" },
  { label: "Upcoming Practices", value: "—", icon: "📅", color: "bg-green-50 text-green-700" },
  { label: "Announcements", value: "—", icon: "📢", color: "bg-yellow-50 text-yellow-700" },
];

const quickLinks = [
  { label: "Manage Players", href: "/admin/players", icon: "👦", desc: "Add, edit, or deactivate players" },
  { label: "Manage Coaches", href: "/admin/coaches", icon: "🧑‍🏫", desc: "Add coaches and view details" },
  { label: "Schedule Practices", href: "/admin/practices", icon: "📅", desc: "Create and manage practice sessions" },
  { label: "Post Announcement", href: "/admin/announcements", icon: "📢", desc: "Send updates to all parents" },
  { label: "View Attendance", href: "/admin/attendance", icon: "✅", desc: "Review attendance by practice" },
  { label: "Coach Payments", href: "/admin/coach-payments", icon: "💰", desc: "Track and record coach payments" },
];

export default function AdminDashboard() {
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
                <p className="font-semibold text-sm text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
