import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import ComingSoon from "@/components/ui/ComingSoon";

export default function AdminAttendancePage() {
  return (
    <div>
      <PageHeader title="Attendance" subtitle="Review attendance by practice session" />

      <Card>
        <ComingSoon
          icon="✅"
          title="Attendance review"
          description="Reviewing attendance by practice session is coming in a future update."
        />
      </Card>
    </div>
  );
}
