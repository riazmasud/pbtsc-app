import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import ComingSoon from "@/components/ui/ComingSoon";

export default function CoachAttendancePage() {
  return (
    <div>
      <PageHeader title="Mark Attendance" subtitle="Record which players attended a practice" />

      <Card>
        <ComingSoon
          icon="✅"
          title="Attendance marking"
          description="Marking players present or absent for a practice is coming in a future update."
        />
      </Card>
    </div>
  );
}
