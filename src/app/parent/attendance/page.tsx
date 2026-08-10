"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import { getPlayersByParent } from "@/lib/firebase/services/players";
import { getAttendanceSummary, getAttendanceByPlayer } from "@/lib/firebase/services/attendance";
import { Player, AttendanceRecord } from "@/types";

interface PlayerAttendance {
  player: Player;
  summary: { attended: number; total: number; rate: number };
  records: AttendanceRecord[];
}

export default function ParentAttendancePage() {
  const { user } = useAuth();
  const [data, setData] = useState<PlayerAttendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getPlayersByParent(user.uid).then(async (players) => {
      const results = await Promise.all(
        players.map(async (player) => ({
          player,
          summary: await getAttendanceSummary(player.id),
          records: await getAttendanceByPlayer(player.id),
        }))
      );
      setData(results);
      setLoading(false);
    });
  }, [user]);

  return (
    <div>
      <PageHeader title="Attendance" subtitle="Your kids' attendance history" />

      {loading && <p className="text-center text-gray-400 text-sm py-8">Loading…</p>}

      {!loading && data.length === 0 && (
        <Card className="p-8 text-center text-gray-400">
          <p className="text-4xl mb-3">✅</p>
          <p className="text-sm font-medium text-gray-600">No players linked to your account</p>
        </Card>
      )}

      {data.map(({ player, summary, records }) => (
        <div key={player.id} className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            {player.firstName} {player.lastName}
          </h2>

          <Card className="mb-4 p-4">
            <div className="flex gap-4 text-center">
              <div className="flex-1">
                <p className="text-2xl font-bold text-green-700">{summary.attended}</p>
                <p className="text-xs text-gray-500 mt-1">Attended</p>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="flex-1">
                <p className="text-2xl font-bold text-gray-400">
                  {summary.total - summary.attended}
                </p>
                <p className="text-xs text-gray-500 mt-1">Absent</p>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="flex-1">
                <p className="text-2xl font-bold text-blue-600">{summary.rate}%</p>
                <p className="text-xs text-gray-500 mt-1">Rate</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="px-4 py-2 space-y-1">
              {records.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                >
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(`${r.practiceDate}T00:00:00`).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      r.present ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {r.present ? "Present" : "Absent"}
                  </span>
                </div>
              ))}
              {records.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No records yet.</p>
              )}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
