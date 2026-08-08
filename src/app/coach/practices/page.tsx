import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";

// TODO Phase 2: Fetch practices assigned to the logged-in coach from Firestore
// Filter collection "practices" where coachId === auth.currentUser.uid

export default function CoachPracticesPage() {
  return (
    <div>
      <PageHeader title="My Practices" subtitle="Your assigned practice sessions" />

      <div className="space-y-3">
        {/* TODO Phase 2: Map over practices from Firestore */}
        <div className="text-center py-8">
          <Card className="p-8 text-gray-400">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-sm font-medium text-gray-600">No practices scheduled</p>
            <p className="text-xs mt-1">
              Phase 2: your practices will be loaded from Firestore.
            </p>
          </Card>
        </div>

        {/* Placeholder practice card shape */}
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="p-4 opacity-40">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl shrink-0">
                ⚽
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-32 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded w-48 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded w-24 animate-pulse" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
