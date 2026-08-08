import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";

// TODO Phase 2:
//   1. Get logged-in parent's player(s) from Firestore "players" where parentId === uid
//   2. Fetch all AttendanceRecords for those players from "attendance"
//   3. Join with practices to show date, location, and present/absent per session

export default function ParentAttendancePage() {
  return (
    <div>
      <PageHeader title="Attendance" subtitle="Your child's attendance history" />

      <Card className="mb-4 p-4">
        {/* TODO Phase 2: Show a summary — e.g., "8 of 10 practices attended (80%)" */}
        <div className="flex gap-4 text-center">
          <div className="flex-1">
            <p className="text-2xl font-bold text-green-700">—</p>
            <p className="text-xs text-gray-500 mt-1">Attended</p>
          </div>
          <div className="w-px bg-gray-100" />
          <div className="flex-1">
            <p className="text-2xl font-bold text-gray-400">—</p>
            <p className="text-xs text-gray-500 mt-1">Absent</p>
          </div>
          <div className="w-px bg-gray-100" />
          <div className="flex-1">
            <p className="text-2xl font-bold text-blue-600">—%</p>
            <p className="text-xs text-gray-500 mt-1">Rate</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-center py-8 text-gray-400">
          <p className="text-4xl mb-3">✅</p>
          <p className="text-sm font-medium text-gray-600">No attendance records yet</p>
          <p className="text-xs mt-1">
            Phase 2: records will be loaded from Firestore.
          </p>
        </div>

        {/* Placeholder attendance row shape */}
        <div className="px-4 pb-4 space-y-2 opacity-40">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="space-y-1.5">
                <div className="h-4 bg-gray-100 rounded w-32 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded w-24 animate-pulse" />
              </div>
              <div className="h-6 bg-gray-100 rounded-full w-16 animate-pulse" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
