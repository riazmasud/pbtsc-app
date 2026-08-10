"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { getUpcomingPractices } from "@/lib/firebase/services/practices";
import { Practice } from "@/types";

function dayBadge(dateStr: string): { day: string; date: string } {
  const d = new Date(`${dateStr}T00:00:00`);
  return {
    day: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
    date: String(d.getDate()),
  };
}

export default function ParentSchedulePage() {
  const [practices, setPractices] = useState<Practice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUpcomingPractices().then((data) => {
      setPractices(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <PageHeader title="Practice Schedule" subtitle="All upcoming sessions" />

      <div className="space-y-3">
        {practices.map((practice) => (
          <Card key={practice.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex flex-col items-center justify-center shrink-0">
                <p className="text-[10px] font-semibold text-green-700">
                  {dayBadge(practice.date).day}
                </p>
                <p className="text-lg font-bold text-green-800">
                  {dayBadge(practice.date).date}
                </p>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  {practice.startTime} – {practice.endTime} · {practice.location}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{practice.coachName}</p>
              </div>
            </div>
          </Card>
        ))}

        {!loading && practices.length === 0 && (
          <Card className="p-8 text-center text-gray-400">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-sm font-medium text-gray-600">No practices scheduled</p>
          </Card>
        )}
        {loading && <p className="text-center text-gray-400 text-sm py-8">Loading…</p>}
      </div>
    </div>
  );
}
