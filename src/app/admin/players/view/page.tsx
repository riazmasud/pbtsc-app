"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { getPlayerById } from "@/lib/firebase/services/players";
import { Player } from "@/types";

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

function PlayerDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    getPlayerById(id).then((p) => {
      setPlayer(p);
      setLoading(false);
    });
  }, [id]);

  return (
    <div>
      <Link href="/admin/players" className="text-sm text-green-700 hover:underline">
        ← Back to Players
      </Link>

      {loading && (
        <p className="text-sm text-gray-400 mt-6">Loading…</p>
      )}

      {!loading && !player && (
        <Card className="p-6 mt-4 text-center text-gray-400">
          <p className="text-3xl mb-2">👦</p>
          <p className="text-sm">Player not found.</p>
        </Card>
      )}

      {!loading && player && (
        <>
          <PageHeader
            title={`${player.firstName} ${player.lastName}`}
            subtitle="Player details"
          />
          <Card className="p-4">
            <Row label="Age" value={player.age} />
            <Row label="Age group" value={player.ageGroup} />
            <Row label="Date of birth" value={player.dateOfBirth} />
            <Row label="Parent" value={player.parentName} />
            <Row label="Status" value={player.active ? "Active" : "Inactive"} />
            {player.notes && <Row label="Notes" value={player.notes} />}
            <Row label="Added" value={new Date(player.createdAt).toLocaleDateString()} />
          </Card>
        </>
      )}
    </div>
  );
}

export default function PlayerViewPage() {
  return (
    <Suspense fallback={<p className="text-sm text-gray-400">Loading…</p>}>
      <PlayerDetail />
    </Suspense>
  );
}
