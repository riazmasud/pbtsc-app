"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  getAllCoaches,
  updateCoach,
  deactivateCoach,
  reactivateCoach,
} from "@/lib/firebase/services/coaches";
import { Coach } from "@/types";

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadCoaches() {
    setLoading(true);
    setCoaches(await getAllCoaches());
    setLoading(false);
  }

  useEffect(() => {
    loadCoaches();
  }, []);

  function startEdit(coach: Coach) {
    setEditingId(coach.id);
    setPhone(coach.phone || "");
    setBio(coach.bio || "");
  }

  async function saveEdit(id: string) {
    setSaving(true);
    await updateCoach(id, { phone: phone || undefined, bio: bio || undefined });
    setSaving(false);
    setEditingId(null);
    await loadCoaches();
  }

  async function toggleActive(coach: Coach) {
    if (coach.active) {
      await deactivateCoach(coach.id);
    } else {
      await reactivateCoach(coach.id);
    }
    await loadCoaches();
  }

  return (
    <div>
      <PageHeader
        title="Coaches"
        subtitle="Manage coaching staff"
        action={
          <Link href="/admin/users?role=coach">
            <Button type="button">+ Add Coach</Button>
          </Link>
        }
      />

      <Card>
        <div className="divide-y divide-gray-50">
          {coaches.map((coach) => (
            <div key={coach.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    {coach.firstName} {coach.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{coach.email}</p>
                  {coach.phone && editingId !== coach.id && (
                    <p className="text-xs text-gray-500">{coach.phone}</p>
                  )}
                  {coach.bio && editingId !== coach.id && (
                    <p className="text-sm text-gray-600 mt-2">{coach.bio}</p>
                  )}
                </div>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                    coach.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {coach.active ? "Active" : "Inactive"}
                </span>
              </div>

              {editingId === coach.id ? (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio (shown on the public coaches page)
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" disabled={saving} onClick={() => saveEdit(coach.id)}>
                      {saving ? "Saving…" : "Save"}
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => startEdit(coach)}
                    className="text-xs text-green-700 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleActive(coach)}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    {coach.active ? "Deactivate" : "Reactivate"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {!loading && coaches.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-3xl mb-2">🧑‍🏫</p>
            <p className="text-sm">No coaches yet.</p>
            <p className="text-xs text-gray-400 mt-1">
              Add one from{" "}
              <a href="/admin/users" className="text-green-700 hover:underline">
                Users
              </a>{" "}
              with role "Coach".
            </p>
          </div>
        )}
        {loading && <div className="text-center py-8 text-gray-400 text-sm">Loading…</div>}
      </Card>
    </div>
  );
}
