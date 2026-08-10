"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import { getActivePlayers } from "@/lib/firebase/services/players";
import { Player } from "@/types";

export default function PublicPlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivePlayers().then((data) => {
      setPlayers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <PageHeader title="Our Players" subtitle="Meet the PBTSC academy roster" />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {players.map((player) => (
            <Link key={player.id} href={`/players/view?id=${player.id}`}>
              <Card className="p-4 text-center hover:border-green-200 transition-all">
                <Avatar name={`${player.firstName} ${player.lastName}`} size={64} />
                <p className="mt-2 text-sm font-semibold text-gray-900">
                  {player.firstName} {player.lastName}
                </p>
                <p className="text-xs text-gray-500">{player.ageGroup}</p>
              </Card>
            </Link>
          ))}
        </div>

        {!loading && players.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No players yet.</p>
        )}
        {loading && <p className="text-center text-gray-400 text-sm py-8">Loading…</p>}
      </main>
    </div>
  );
}
