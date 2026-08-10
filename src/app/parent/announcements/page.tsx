"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import { getAllAnnouncements } from "@/lib/firebase/services/announcements";
import { Announcement } from "@/types";

export default function ParentAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAnnouncements().then((data) => {
      setAnnouncements(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <PageHeader title="Announcements" subtitle="News and updates from the club" />

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

        {!loading && announcements.length === 0 && (
          <Card className="p-8 text-center text-gray-400">
            <p className="text-4xl mb-3">📢</p>
            <p className="text-sm font-medium text-gray-600">No announcements yet</p>
          </Card>
        )}
        {loading && <p className="text-center text-gray-400 text-sm py-8">Loading…</p>}
      </div>
    </div>
  );
}
