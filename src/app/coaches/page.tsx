"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import { getActiveCoaches } from "@/lib/firebase/services/coaches";
import { Coach } from "@/types";

export default function PublicCoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActiveCoaches().then((data) => {
      setCoaches(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <PageHeader title="Our Coaches" subtitle="Meet the PBTSC coaching staff" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {coaches.map((coach) => (
            <Link key={coach.id} href={`/coaches/view?id=${coach.id}`}>
              <Card className="p-4 flex items-center gap-4 hover:border-green-200 transition-all">
                <Avatar name={`${coach.firstName} ${coach.lastName}`} size={56} className="mx-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {coach.firstName} {coach.lastName}
                  </p>
                  {coach.bio && (
                    <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{coach.bio}</p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {!loading && coaches.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No coaches yet.</p>
        )}
        {loading && <p className="text-center text-gray-400 text-sm py-8">Loading…</p>}
      </main>
    </div>
  );
}
