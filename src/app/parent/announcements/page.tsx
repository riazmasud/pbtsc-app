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
        <div className="text-center py-8">
          <Card className="p-8 text-gray-400">
            <p className="text-4xl mb-3">📢</p>
            <p className="text-sm font-medium text-gray-600">No announcements yet</p>
            <p className="text-xs mt-1">
              Phase 2: announcements will be loaded from Firestore.
            </p>
          </Card>
        </div>

        {/* Placeholder announcement card shape */}
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="p-4 opacity-40">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-gray-100 rounded w-48 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded w-16 animate-pulse" />
              </div>
              <div className="h-3 bg-gray-100 rounded w-full animate-pulse" />
              <div className="h-3 bg-gray-100 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-100 rounded w-28 animate-pulse" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
