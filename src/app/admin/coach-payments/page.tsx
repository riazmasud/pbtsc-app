import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import ComingSoon from "@/components/ui/ComingSoon";

export default function CoachPaymentsPage() {
  return (
    <div>
      <PageHeader title="Coach Payments" subtitle="Track and record payments to coaches" />

      <Card>
        <ComingSoon
          icon="💰"
          title="Coach payment tracking"
          description="Recording and tracking coach payments is coming in a future update."
        />
      </Card>
    </div>
  );
}
