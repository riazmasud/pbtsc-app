import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";

// TODO Phase 2: Fetch all upcoming (non-cancelled) practices from Firestore
// collection "practices", ordered by date ascending

export default function ParentSchedulePage() {
  return (
    <div>
      <PageHeader title="Practice Schedule" subtitle="All upcoming sessions" />

      <div className="space-y-3">
        {/* TODO Phase 2: Map over practices from Firestore */}
        {[
          { day: "SAT", date: "16", time: "9:00 – 10:00 AM", location: "Field 3, Main Complex", coach: "Mr. Shohug" },
          { day: "TUE", date: "19", time: "5:30 – 6:30 PM", location: "Field 1, Main Complex", coach: "Mr. Shohug" },
          { day: "SAT", date: "23", time: "9:00 – 10:00 AM", location: "Field 3, Main Complex", coach: "Mr. Saif" },
        ].map((practice, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex flex-col items-center justify-center shrink-0">
                <p className="text-[10px] font-semibold text-green-700">{practice.day}</p>
                <p className="text-lg font-bold text-green-800">{practice.date}</p>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">{practice.time}</p>
                <p className="text-xs text-gray-500 mt-0.5">{practice.location}</p>
                <p className="text-xs text-gray-500">{practice.coach}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
