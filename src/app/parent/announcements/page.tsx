import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";

// TODO Phase 2: Fetch announcements from Firestore collection "announcements"
// Order by pinned desc, createdAt desc

export default function ParentAnnouncementsPage() {
  return (
    <div>
      <PageHeader title="Announcements" subtitle="News and updates from the club" />

      <div className="space-y-3">
        {/* TODO Phase 2: Map over announcements from Firestore */}
        {[
          {
            pinned: true,
            title: "🏆 End-of-Season Tournament — Aug 24",
            body: "Join us for the season-ending tournament at Main Complex. Games start at 9 AM — please arrive 30 minutes early for warm-ups. Snacks provided!",
            when: "2 days ago",
          },
          {
            pinned: false,
            title: "🧢 New team jerseys have arrived",
            body: "Jerseys can be picked up from Mr. Shohug or Mr. Saif at your child's next practice. Sizes were ordered based on registration info.",
            when: "5 days ago",
          },
          {
            pinned: false,
            title: "🌧️ Practice moved indoors this Tuesday",
            body: "Due to expected rain, Tuesday's 5:30 PM practice will be held in the Main Complex gym instead of Field 1.",
            when: "1 week ago",
          },
        ].map((a, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center justify-between mb-1 gap-2">
              <p className="font-semibold text-sm text-gray-900">
                {a.pinned && <span className="text-amber-500 mr-1">📌</span>}
                {a.title}
              </p>
              <span className="text-xs text-gray-400 shrink-0">{a.when}</span>
            </div>
            <p className="text-sm text-gray-600">{a.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
