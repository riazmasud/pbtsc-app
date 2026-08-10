import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import ComingSoon from "@/components/ui/ComingSoon";

export default function PracticesPage() {
  return (
    <div>
      <PageHeader title="Practices" subtitle="Schedule and manage practice sessions" />

      <Card>
        <ComingSoon
          icon="📅"
          title="Practice scheduling"
          description="Scheduling, editing, and cancelling practice sessions is coming in a future update."
        />
      </Card>
    </div>
  );
}
