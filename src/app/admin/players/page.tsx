"use client";

import { useState, useEffect, FormEvent } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  getAllPlayers,
  createPlayer,
  deactivatePlayer,
  reactivatePlayer,
} from "@/lib/firebase/services/players";
import { getUsersByRole } from "@/lib/firebase/services/users";
import { Player, UserProfile } from "@/types";

function calcAge(dateOfBirth: string): number {
  const birth = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [parents, setParents] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [notes, setNotes] = useState("");
  const [parentId, setParentId] = useState("");

  async function loadData() {
    setLoading(true);
    const [playerData, parentData] = await Promise.all([
      getAllPlayers(),
      getUsersByRole("parent"),
    ]);
    setPlayers(playerData);
    setParents(parentData);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function resetForm() {
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setNotes("");
    setParentId("");
    setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const parent = parents.find((p) => p.uid === parentId);
    if (!parent) {
      setError("Please select a parent.");
      return;
    }

    setSubmitting(true);
    try {
      await createPlayer({
        firstName,
        lastName,
        dateOfBirth,
        age: calcAge(dateOfBirth),
        parentId: parent.uid,
        parentName: parent.displayName,
        notes: notes || undefined,
        active: true,
      });
      resetForm();
      setShowForm(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add player.");
    } finally {
      setSubmitting(false);
    }
  }

  async function toggleActive(player: Player) {
    if (player.active) {
      await deactivatePlayer(player.id);
    } else {
      await reactivatePlayer(player.id);
    }
    await loadData();
  }

  return (
    <div>
      <PageHeader
        title="Players"
        subtitle="Manage all registered players"
        action={
          <Button type="button" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Cancel" : "+ Add Player"}
          </Button>
        }
      />

      {showForm && (
        <Card className="p-4 mb-5">
          {parents.length === 0 ? (
            <p className="text-sm text-gray-500">
              No parent accounts exist yet. Go to{" "}
              <a href="/admin/users" className="text-green-700 hover:underline">
                Users
              </a>{" "}
              and add a parent account first, then come back to add their player.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First name
                  </label>
                  <input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last name
                  </label>
                  <input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of birth
                </label>
                <input
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent</label>
                <select
                  required
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">Select a parent…</option>
                  {parents.map((p) => (
                    <option key={p.uid} value={p.uid}>
                      {p.displayName} ({p.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Allergies, medical notes, etc."
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <Button type="submit" disabled={submitting}>
                {submitting ? "Adding…" : "Add Player"}
              </Button>
            </form>
          )}
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Age</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Parent</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-3">
                    {player.firstName} {player.lastName}
                  </td>
                  <td className="px-4 py-3">{player.age}</td>
                  <td className="px-4 py-3">{player.parentName}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        player.active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {player.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(player)}
                      className="text-xs text-gray-500 hover:text-gray-700 underline"
                    >
                      {player.active ? "Deactivate" : "Reactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && players.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-3xl mb-2">👦</p>
            <p className="text-sm">No players added yet.</p>
          </div>
        )}
        {loading && <div className="text-center py-8 text-gray-400 text-sm">Loading…</div>}
      </Card>
    </div>
  );
}
