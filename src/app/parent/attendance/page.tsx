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
            <p className="text-2xl font-bold text-green-700">8</p>
            <p className="text-xs text-gray-500 mt-1">Attended</p>
          </div>
          <div className="w-px bg-gray-100" />
          <div className="flex-1">
            <p className="text-2xl font-bold text-gray-400">2</p>
            <p className="text-xs text-gray-500 mt-1">Absent</p>
          </div>
          <div className="w-px bg-gray-100" />
          <div className="flex-1">
            <p className="text-2xl font-bold text-blue-600">80%</p>
            <p className="text-xs text-gray-500 mt-1">Rate</p>
          </div>
        </div>
      </Card>

      <Card>
        {/* TODO Phase 2: Map over AttendanceRecords joined with practices from Firestore */}
        <div className="px-4 py-2 space-y-1">
          {[
            { date: "Sat, Aug 9", location: "Field 3, Main Complex", present: true },
            { date: "Tue, Aug 5", location: "Field 1, Main Complex", present: true },
            { date: "Sat, Aug 2", location: "Field 3, Main Complex", present: false },
            { date: "Tue, Jul 29", location: "Field 1, Main Complex", present: true },
            { date: "Sat, Jul 26", location: "Field 3, Main Complex", present: true },
          ].map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{row.date}</p>
                <p className="text-xs text-gray-500">{row.location}</p>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  row.present ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`}
              >
                {row.present ? "Present" : "Absent"}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
