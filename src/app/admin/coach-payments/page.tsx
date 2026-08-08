import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// TODO Phase 2: Fetch coach payments from Firestore collection "coachPayments"
// Use addCoachPayment(), markPaid() from @/lib/firebase/firestore

export default function CoachPaymentsPage() {
  return (
    <div>
      <PageHeader
        title="Coach Payments"
        subtitle="Track and record payments to coaches"
        action={
          // TODO Phase 2: Open add-payment modal / form
          <Button>+ Add Payment</Button>
        }
      />

      <Card>
        {/* TODO Phase 2: Populate with real payment data from Firestore */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Coach</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium hidden sm:table-cell">Period</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Amount</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-100 rounded w-28 animate-pulse" />
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="h-4 bg-gray-100 rounded w-32 animate-pulse" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-100 rounded w-16 animate-pulse" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-100 rounded w-16 animate-pulse" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 bg-gray-100 rounded w-12 animate-pulse" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center py-8 text-gray-400">
          <p className="text-3xl mb-2">💰</p>
          <p className="text-sm">No payment records yet.</p>
          <p className="text-xs text-gray-400 mt-1">
            Phase 2: payments will be loaded from Firestore.
          </p>
        </div>
      </Card>
    </div>
  );
}
