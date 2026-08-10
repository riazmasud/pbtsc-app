"use client";

import { Suspense, useState, useEffect, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getAllUsers, createUserProfile } from "@/lib/firebase/services/users";
import { createCoach } from "@/lib/firebase/services/coaches";
import { createAuthAccount } from "@/lib/firebase/adminCreateUser";
import { UserProfile, UserRole } from "@/types";

function UsersPageInner() {
  const searchParams = useSearchParams();
  const presetRole = searchParams.get("role");
  const isValidRole = presetRole === "admin" || presetRole === "coach" || presetRole === "parent";

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(isValidRole);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState<UserRole>(isValidRole ? (presetRole as UserRole) : "parent");

  async function loadUsers() {
    setLoading(true);
    const data = await getAllUsers();
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function resetForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setBio("");
    setRole("parent");
    setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const displayName = `${firstName} ${lastName}`.trim();
      const uid = await createAuthAccount(email, password);
      await createUserProfile(uid, {
        email,
        displayName,
        role,
        phone: phone || undefined,
      });
      if (role === "coach") {
        await createCoach({
          firstName,
          lastName,
          email,
          phone: phone || undefined,
          bio: bio || undefined,
          uid,
          active: true,
        });
      }
      resetForm();
      setShowForm(false);
      await loadUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle="Manage login accounts for admins, coaches & parents"
        action={
          <Button type="button" onClick={() => setShowForm((v) => !v)}>
            {showForm ? "Cancel" : "+ Add User"}
          </Button>
        }
      />

      {showForm && (
        <Card className="p-4 mb-5">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="min. 6 characters"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (optional)
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="parent">Parent</option>
                  <option value="coach">Coach</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {role === "coach" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coach bio (optional, shown on the public coaches page)
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  placeholder="Coaching background, certifications, fun facts…"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            )}

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating…" : "Create User"}
            </Button>
          </form>
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Email</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">Role</th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium hidden sm:table-cell">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.uid} className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-3">{u.displayName}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3 capitalize">{u.role}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">{u.phone || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && users.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-3xl mb-2">👤</p>
            <p className="text-sm">No users yet.</p>
          </div>
        )}
        {loading && <div className="text-center py-8 text-gray-400 text-sm">Loading…</div>}
      </Card>
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<p className="text-sm text-gray-400">Loading…</p>}>
      <UsersPageInner />
    </Suspense>
  );
}
