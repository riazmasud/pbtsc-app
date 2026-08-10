"use client";

import { useState, useEffect } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { getAllAnnouncements } from "@/lib/firebase/services/announcements";
import { Announcement } from "@/types";

export default function PublicAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAnnouncements().then((data) => {
      setAnnouncements(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />
      <main className="max-w-2xl mx-auto px-4 py-6">
        <PageHeader title="Announcements" subtitle="News and updates from PBTSC" />

        <div className="space-y-3">
          {announcements.map((a) => (
            <Card key={a.id} className="p-4">
              <div className="flex items-center justify-between mb-1 gap-2">
                <p className="font-semibold text-sm text-gray-900">
                  {a.pinned && <span className="text-amber-500 mr-1">📌</span>}
                  {a.title}
                </p>
                <span className="text-xs text-gray-400 shrink-0">
                  {new Date(a.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-line">{a.body}</p>
            </Card>
          ))}
        </div>

        {!loading && announcements.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No announcements yet.</p>
        )}
        {loading && <p className="text-center text-gray-400 text-sm py-8">Loading…</p>}
      </main>
    </div>
  );
}
