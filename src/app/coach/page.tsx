import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Link from "next/link";

// TODO Phase 2: Fetch upcoming practice and recent attendance from Firestore

export default function CoachDashboard() {
  return (
    <div>
      <PageHeader title="Coach Dashboard" subtitle="Your upcoming schedule" />

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Next Practice
        </h2>
        <Card className="p-4">
          {/* TODO Phase 2: Render next upcoming practice from Firestore */}
          <div className="text-center py-6 text-gray-400">
            <p className="text-3xl mb-2">📅</p>
            <p className="text-sm">No upcoming practices scheduled.</p>
            <p className="text-xs mt-1 text-gray-400">
              Practices will appear here once added by admin.
            </p>
          </div>
        </Card>
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Quick Actions
        </h2>
        <div className="grid gap-3">
          <Link href="/coach/practices">
            <Card className="p-4 flex items-center gap-3 hover:border-green-200 transition-all">
              <span className="text-2xl">📅</span>
              <div>
                <p className="font-semibold text-sm">My Practices</p>
                <p className="text-xs text-gray-500">View your practice schedule</p>
              </div>
            </Card>
          </Link>
          <Link href="/coach/attendance">
            <Card className="p-4 flex items-center gap-3 hover:border-green-200 transition-all">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-sm">Mark Attendance</p>
                <p className="text-xs text-gray-500">Record player attendance for a practice</p>
              </div>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
