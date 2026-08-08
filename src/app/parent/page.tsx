import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Link from "next/link";

// TODO Phase 2: Fetch next practice, latest announcement, and attendance summary
// for the logged-in parent's child from Firestore.

export default function ParentDashboard() {
  return (
    <div>
      <PageHeader title="Welcome" subtitle="Here's what's happening" />

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Next Practice
        </h2>
        <Card className="p-4">
          {/* TODO Phase 2: Render next upcoming practice */}
          <div className="text-center py-5 text-gray-400">
            <p className="text-3xl mb-2">📅</p>
            <p className="text-sm">No upcoming practices scheduled.</p>
          </div>
        </Card>
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Latest Announcement
        </h2>
        <Card className="p-4">
          {/* TODO Phase 2: Render the most recent pinned or latest announcement */}
          <div className="text-center py-5 text-gray-400">
            <p className="text-3xl mb-2">📢</p>
            <p className="text-sm">No announcements yet.</p>
          </div>
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
