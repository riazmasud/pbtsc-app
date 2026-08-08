import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// TODO Phase 2: Fetch coaches from Firestore collection "coaches"
// Use addCoach(), updateCoach(), deactivateCoach() from @/lib/firebase/firestore

export default function CoachesPage() {
  return (
    <div>
      <PageHeader
        title="Coaches"
        subtitle="Manage coaching staff"
        action={
          // TODO Phase 2: Open add-coach modal / form
          <Button>+ Add Coach</Button>
        }
      />

      <Card>
        {/* TODO Phase 2: Populate with real coach data from Firestore */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Email</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium hidden sm:table-cell">Phone</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 2 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-100 rounded w-28 animate-pulse" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-100 rounded w-36 animate-pulse" />
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="h-4 bg-gray-100 rounded w-24 animate-pulse" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-100 rounded w-16 animate-pulse" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-100 rounded w-10 animate-pulse" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center py-8 text-gray-400">
          <p className="text-3xl mb-2">🧑‍🏫</p>
          <p className="text-sm">No coaches added yet.</p>
          <p className="text-xs text-gray-400 mt-1">
            Phase 2: coaches will be loaded from Firestore.
          </p>
        </div>
      </Card>
    </div>
  );
}
