import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import ComingSoon from "@/components/ui/ComingSoon";

export default function CoachPracticesPage() {
  return (
    <div>
      <PageHeader title="My Practices" subtitle="Your assigned practice sessions" />

      <Card>
        <ComingSoon
          icon="📅"
          title="Practice schedule"
          description="Viewing your assigned practice sessions is coming in a future update."
        />
      </Card>
    </div>
  );
}
