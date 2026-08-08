import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";

// TODO Phase 2:
//   1. Load list of practices from Firestore for the selector
//   2. When a practice is selected, fetch all AttendanceRecords for that practice
//   3. Show summary: present count, absent count, percentage

export default function AdminAttendancePage() {
  return (
    <div>
      <PageHeader
        title="Attendance"
        subtitle="Review attendance by practice session"
      />

      <Card className="p-4 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Practice
        </label>
        {/* TODO Phase 2: Populate <select> with practices from Firestore */}
        <select
          disabled
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-400 bg-gray-50"
        >
          <option>— Loading practices… (Phase 2) —</option>
        </select>
      </Card>

      <Card>
        <div className="text-center py-10 text-gray-400">
          <p className="text-4xl mb-3">✅</p>
          <p className="text-sm font-medium text-gray-600">
            Select a practice to view attendance
          </p>
          <p className="text-xs mt-1">
            Phase 2: attendance data will be loaded from Firestore.
          </p>
        </div>

        {/* Placeholder attendance list shape */}
        <div className="px-4 pb-4 space-y-2 opacity-40">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="h-4 bg-gray-100 rounded w-36 animate-pulse" />
              <div className="h-6 bg-gray-100 rounded-full w-16 animate-pulse" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
