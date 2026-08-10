"use client";

import { useState, useEffect, FormEvent } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuth } from "@/context/AuthContext";
import {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  pinAnnouncement,
  deleteAnnouncement,
} from "@/lib/firebase/services/announcements";
import { Announcement } from "@/types";

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [pinned, setPinned] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  async function loadAnnouncements() {
    setLoading(true);
    setAnnouncements(await getAllAnnouncements());
    setLoading(false);
  }

  useEffect(() => {
    loadAnnouncements();
  }, []);

  function resetForm() {
    setTitle("");
    setBody("");
    setPinned(false);
    setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!user) return;

    setSubmitting(true);
    try {
      await createAnnouncement({
        title,
        body,
        authorId: user.uid,
        authorName: user.displayName,
        pinned,
      });
      resetForm();
      setShowForm(false);
      await loadAnnouncements();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post announcement.");
    } finally {
      setSubmitting(false);
    }
  }

  async function togglePin(a: Announcement) {
    await pinAnnouncement(a.id, !a.pinned);
    await loadAnnouncements();
  }

  function startEdit(a: Announcement) {
    setEditingId(a.id);
    setEditTitle(a.title);
    setEditBody(a.body);
  }

  async function saveEdit(id: string) {
    setSavingEdit(true);
    await updateAnnouncement(id, { title: editTitle, body: editBody });
    setSavingEdit(false);
    setEditingId(null);
    await loadAnnouncements();
  }

  async function handleDelete(a: Announcement) {
    if (!confirm(`Delete "${a.title}"? This can't be undone.`)) return;
    await deleteAnnouncement(a.id);
    await loadAnnouncements();
  }

  return (
    <div>
      <PageHeader
        title="Announcements"
        subtitle="Post updates visible to all parents"
        action={
          <Button type="button" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Cancel" : "+ New"}
          </Button>
        }
      />

      {showForm && (
        <Card className="p-4 mb-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
              <textarea
                required
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
              />
              Pin to top
            </label>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <Button type="submit" disabled={submitting}>
              {submitting ? "Posting…" : "Post Announcement"}
            </Button>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {announcements.map((a) =>
          editingId === a.id ? (
            <Card key={a.id} className="p-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                  <textarea
                    rows={4}
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="button" disabled={savingEdit} onClick={() => saveEdit(a.id)}>
                    {savingEdit ? "Saving…" : "Save"}
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card key={a.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm text-gray-900">
                      {a.pinned && <span className="text-amber-500 mr-1">📌</span>}
                      {a.title}
                    </p>
                    <span className="text-xs text-gray-400 shrink-0">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{a.body}</p>
                  <p className="text-xs text-gray-400 mt-2">— {a.authorName}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => startEdit(a)}
                  className="text-xs text-green-700 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => togglePin(a)}
                  className="text-xs text-green-700 hover:underline"
                >
                  {a.pinned ? "Unpin" : "Pin"}
                </button>
                <button
                  onClick={() => handleDelete(a)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </Card>
          )
        )}
      </div>

      {!loading && announcements.length === 0 && (
        <Card className="p-8 text-center text-gray-400">
          <p className="text-4xl mb-3">📢</p>
          <p className="text-sm font-medium text-gray-600">No announcements posted</p>
        </Card>
      )}
      {loading && <div className="text-center py-8 text-gray-400 text-sm">Loading…</div>}
    </div>
  );
}
