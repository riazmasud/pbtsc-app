import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";

// TODO Phase 2:
//   1. Load coach's practices for the selector
//   2. When a practice is selected, fetch all players (roster)
//   3. Allow coach to toggle present/absent for each player
//   4. On save, batch-write AttendanceRecords to Firestore collection "attendance"

export default function CoachAttendancePage() {
  return (
    <div>
      <PageHeader
        title="Mark Attendance"
        subtitle="Record which players attended a practice"
      />

      <Card className="p-4 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Practice
        </label>
        {/* TODO Phase 2: Populate with coach's practices from Firestore */}
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
            Select a practice to begin marking attendance
          </p>
          <p className="text-xs mt-1">
            Phase 2: player roster and attendance data loaded from Firestore.
          </p>
        </div>

        {/* Placeholder player attendance list shape */}
        <div className="px-4 pb-4 space-y-2 opacity-40">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
                <div className="h-4 bg-gray-100 rounded w-32 animate-pulse" />
              </div>
              <div className="w-12 h-6 bg-gray-100 rounded-full animate-pulse" />
            </div>
          ))}
          <div className="pt-3">
            <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
          </div>
        </div>
      </Card>
    </div>
  );
}
