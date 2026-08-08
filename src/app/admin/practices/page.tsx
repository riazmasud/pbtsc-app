import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// TODO Phase 2: Fetch practices from Firestore collection "practices"
// Use addPractice(), updatePractice(), cancelPractice() from @/lib/firebase/firestore

export default function PracticesPage() {
  return (
    <div>
      <PageHeader
        title="Practices"
        subtitle="Schedule and manage practice sessions"
        action={
          // TODO Phase 2: Open schedule-practice modal / form
          <Button>+ Schedule</Button>
        }
      />

      <div className="space-y-3">
        {/* TODO Phase 2: Map over practices from Firestore */}
        <div className="text-center py-12">
          <Card className="p-8 text-gray-400">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-sm font-medium text-gray-600">No practices scheduled</p>
            <p className="text-xs mt-1">
              Phase 2: practices will be loaded from Firestore.
            </p>
            <div className="mt-4">
              {/* TODO Phase 2: wire up */}
              <Button>Schedule First Practice</Button>
            </div>
          </Card>
        </div>

        {/* Placeholder practice card shape */}
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="p-4 opacity-40">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-xl">
                📅
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-32 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded w-48 animate-pulse" />
              </div>
              <div className="h-6 bg-gray-100 rounded w-16 animate-pulse" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
