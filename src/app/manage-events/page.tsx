"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Trash2,
  Edit3,
  Save,
  Loader2,
  X,
} from "lucide-react";
import Image from "next/image";

interface EventData {
  _id: string;
  title: string;
  location: string;
  eventType: string;
  eventDate: string; // "YYYY-MM-DD"
  imageUrl: string;
  description: string;
  email?: string; // creator email, attached by create-event
}

interface EditFormData {
  title: string;
  location: string;
  eventType: string;
  eventDate: string;
  imageUrl: string;
  description: string;
}

export default function ManageEventsPage() {
  const { data: session, isPending } = useSession();
  const userEmail = session?.user?.email ?? "";

  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditFormData | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:4000/upcoming-events", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load events");
      const allEvents: EventData[] = await res.json();
      // Only show events created by the current user
      setEvents(allEvents.filter((e) => e.email === userEmail));
    } catch {
      toast.error("Failed to load your events.");
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (!isPending && userEmail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchEvents();
    }
  }, [isPending, userEmail, fetchEvents]);

  async function handleUpdate(id: string) {
    if (!editForm) return;
    setSavingId(id);
    try {
      const res = await fetch(`http://localhost:4000/update-event/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Update failed");
      toast.success("Event updated successfully.");
      setEditingId(null);
      setEditForm(null);
      fetchEvents();
    } catch {
      toast.error("Failed to update event.");
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:4000/delete-event/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Event deleted successfully.");
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch {
      toast.error("Failed to delete event.");
    } finally {
      setDeletingId(null);
    }
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="animate-pulse rounded-md bg-slate-100 h-9 w-24 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-slate-900">Loading session…</h2>
        </div>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Manage Events</h1>
        <p className="mt-2 text-slate-600">
          You must be signed in to manage events.
        </p>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <ToastContainer position="top-center" autoClose={2000} />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900">Manage Events</h1>
        <p className="mt-2 text-slate-600">
          Events created by you. Update or delete any event below.
        </p>

        {loading ? (
          <div className="mt-8 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
          </div>
        ) : events.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center text-center text-slate-500 py-12">
            <p>No events created yet.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6">
            {events.map((event) => (
              <article
                key={event._id}
                className="rounded-xl border border-border bg-white shadow-sm overflow-hidden"
              >
                {event.imageUrl ? (
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                ) : null}
                <div className="p-5">
                  {editingId === event._id && editForm ? (
                    <div className="space-y-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Event Title
                          </label>
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) =>
                              setEditForm({ ...editForm, title: e.target.value })
                            }
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={editForm.location}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                location: e.target.value,
                              })
                            }
                            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Event Type
                        </label>
                        <select
                          value={editForm.eventType}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              eventType: e.target.value,
                            })
                          }
                          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                          required
                        >
                          <option value="Cleanup">Cleanup</option>
                          <option value="Plantation">Plantation</option>
                          <option value="Donation">Donation</option>
                          <option value="Winter Relief">Winter Relief</option>
                          <option value="Food Drive">Food Drive</option>
                          <option value="Health Camp">Health Camp</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Event Date
                        </label>
                        <input
                          type="date"
                          value={editForm.eventDate}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              eventDate: e.target.value,
                            })
                          }
                          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Image URL
                        </label>
                        <input
                          type="url"
                          value={editForm.imageUrl}
                          onChange={(e) =>
                            setEditForm({ ...editForm, imageUrl: e.target.value })
                          }
                          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              description: e.target.value,
                            })
                          }
                          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none min-h-32"
                          required
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => handleUpdate(event._id)}
                          disabled={savingId === event._id}
                          className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {savingId === event._id ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Saving…
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4 mr-2" />
                              Save Changes
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditForm(null);
                          }}
                          className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                        >
                          <X className="h-4 w-4 mr-2" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {event.eventType}
                        </span>
                        <time className="text-xs font-medium text-slate-500">
                          {event.eventDate}
                        </time>
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mb-1">
                        {event.title}
                      </h2>
                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                        <span>{event.location}</span>
                      </div>
                      <p className="mt-4 text-slate-600 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={() => {
                            setEditingId(event._id);
                            setEditForm({
                              title: event.title,
                              location: event.location,
                              eventType: event.eventType,
                              eventDate: event.eventDate,
                              imageUrl: event.imageUrl,
                              description: event.description,
                            });
                          }}
                          className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                        >
                          <Edit3 className="h-4 w-4" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          disabled={deletingId === event._id}
                          className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 bg-background px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deletingId === event._id ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Deleting
                            </>
                          ) : (
                            <>
                              <Trash2 className="h-4 w-4" /> Delete
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
