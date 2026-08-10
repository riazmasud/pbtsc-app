"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import { getCoachById } from "@/lib/firebase/services/coaches";
import { Coach } from "@/types";

function CoachDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [coach, setCoach] = useState<Coach | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    getCoachById(id).then((c) => {
      setCoach(c && c.active ? c : null);
      setLoading(false);
    });
  }, [id]);

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">
      <Link href="/coaches" className="text-sm text-green-700 hover:underline">
        ← Back to Coaches
      </Link>

      {loading && <p className="text-sm text-gray-400 mt-6">Loading…</p>}

      {!loading && !coach && (
        <Card className="p-6 mt-4 text-center text-gray-400">
          <p className="text-3xl mb-2">🧑‍🏫</p>
          <p className="text-sm">Coach not found.</p>
        </Card>
      )}

      {!loading && coach && (
        <div className="text-center mt-4">
          <Avatar name={`${coach.firstName} ${coach.lastName}`} size={96} />
          <h1 className="text-xl font-bold text-gray-900 mt-3">
            {coach.firstName} {coach.lastName}
          </h1>
          {coach.bio && (
            <Card className="p-4 mt-4 text-left">
              <p className="text-sm text-gray-600 whitespace-pre-line">{coach.bio}</p>
            </Card>
          )}
        </div>
      )}
    </main>
  );
}

export default function CoachViewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />
      <Suspense fallback={<p className="text-sm text-gray-400 px-4 py-6">Loading…</p>}>
        <CoachDetail />
      </Suspense>
    </div>
  );
}
