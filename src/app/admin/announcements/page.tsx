import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// TODO Phase 2: Fetch announcements from Firestore collection "announcements"
// Use addAnnouncement(), deleteAnnouncement(), pinAnnouncement() from @/lib/firebase/firestore

export default function AnnouncementsPage() {
  return (
    <div>
      <PageHeader
        title="Announcements"
        subtitle="Post updates visible to all parents"
        action={
          // TODO Phase 2: Open compose-announcement modal / form
          <Button>+ New</Button>
        }
      />

      <div className="space-y-3">
        {/* TODO Phase 2: Map over announcements from Firestore */}
        <div className="text-center py-6">
          <Card className="p-8 text-gray-400">
            <p className="text-4xl mb-3">📢</p>
            <p className="text-sm font-medium text-gray-600">No announcements posted</p>
            <p className="text-xs mt-1">
              Phase 2: announcements will be loaded from Firestore.
            </p>
          </Card>
        </div>

        {/* Placeholder announcement shape */}
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="p-4 opacity-40">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-48 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded w-full animate-pulse" />
                <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded w-24 animate-pulse" />
              </div>
              <div className="h-6 bg-gray-100 rounded w-12 animate-pulse shrink-0" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
