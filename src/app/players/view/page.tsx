"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import { getPlayerById } from "@/lib/firebase/services/players";
import { Player } from "@/types";

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
      setPlayer(p && p.active ? p : null);
      setLoading(false);
    });
  }, [id]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <Link href="/players" className="text-sm text-green-700 hover:underline">
        ← Back to Players
      </Link>

      {loading && <p className="text-sm text-gray-400 mt-6">Loading…</p>}

      {!loading && !player && (
        <Card className="p-6 mt-4 text-center text-gray-400">
          <p className="text-3xl mb-2">👦</p>
          <p className="text-sm">Player not found.</p>
        </Card>
      )}

      {!loading && player && (
        <>
          <div className="text-center mt-4 mb-6">
            <Avatar name={`${player.firstName} ${player.lastName}`} size={96} />
            <h1 className="text-xl font-bold text-gray-900 mt-3">
              {player.firstName} {player.lastName}
            </h1>
            <p className="text-sm text-gray-500">{player.ageGroup}</p>
          </div>
        </>
      )}
    </main>
  );
}

export default function PlayerViewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />
      <Suspense fallback={<p className="text-sm text-gray-400 px-4 py-6">Loading…</p>}>
        <PlayerDetail />
      </Suspense>
    </div>
  );
}
