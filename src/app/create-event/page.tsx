// import RequireAuth from "@/components/RequireAuth";

// export default function CreateEventPage() {
//   return (
//     // <RequireAuth>
//       <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
//         <h1 className="text-2xl font-bold text-slate-900">Create Event</h1>
//         <p className="mt-2 text-slate-600">
//           Private route — event creation form goes here.
//         </p>
//       </section>
//     // </RequireAuth>
//   );
// }

"use client";

import { useSyncExternalStore, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PackageCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categories = ["Cleanup", "Plantation", "Donation", "Winter Relief", "Food Drive", "Health Camp"];

const initialForm = {
  title: "",
  location: "",
  eventType: "",
  eventDate: "",
  imageUrl: "",
  description: "",
};

/** Today's date as YYYY-MM-DD in the user's local timezone (avoids UTC drift). */
const getTodayLocal = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const emptySubscribe = () => () => {};

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const userEmail = session?.user?.email ?? "";
  const [form, setForm] = useState(initialForm);
  // Client-only "today" so the min attribute doesn't cause a hydration
  // mismatch between SSR and browser (and uses local, not UTC, time).
  const today = useSyncExternalStore(emptySubscribe, getTodayLocal, () => "");
  const [dateError, setDateError] = useState("");

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPending) {
      toast.info("Loading your session, please try again.");
      return;
    }
    if (!userEmail) {
      toast.error("You must be signed in to create an event.");
      return;
    }

    // Midnight-safe Date comparison: "today" still counts as valid.
    const [y, m, d] = form.eventDate.split("-").map(Number);
    const selected = new Date(y, (m ?? 1) - 1, d);
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (!form.eventDate || selected < startOfToday) {
      setDateError("Event date must be today or a future date.");
      return;
    }
    setDateError("");

    let data: { message?: string };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-event`,  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, email: userEmail }),
      });

      data = await res.json();

      if (!res.ok) {
        toast.error(data.message ?? "Failed to create event. Please try again.");
        return;
      }

      toast.success("Event created successfully!");
      // Give the user a moment to see the toast, then go to Upcoming Events.
      setTimeout(() => router.push("/"), 1500);
    } catch {
      toast.error("Failed to create event. Please try again.");
    }
  };


  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-slate-900">Create Event</h1>
          <p className="mt-2 text-slate-600">
            Private route — event creation form goes here.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-sm border border-border bg-white p-8 shadow-sm"
        >
          <div className="grid gap-5">
            {/* Event Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                placeholder="Winter Clothes Distribution"
                value={form.title}
                onChange={(event) => update("title", event.target.value)}
                required
              />
            </div>

            {/* Location + Event Type */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Mirpur"
                  value={form.location}
                  onChange={(event) => update("location", event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Event Type</Label>
                <Select
                  value={form.eventType}
                  onValueChange={(value) => update("eventType", value ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Cleanup" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((eventType) => (
                      <SelectItem key={eventType} value={eventType}>
                        {eventType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Event Date */}
            <div className="grid gap-2">
              <Label htmlFor="eventDate">Event Date</Label>
              <Input
                id="eventDate"
                type="date"
                min={today}
                value={form.eventDate}
                onChange={(event) => {
                  update("eventDate", event.target.value);
                  setDateError("");
                }}
                aria-invalid={dateError ? true : undefined}
                required
              />
              {dateError ? (
                <p className="text-sm text-destructive">{dateError}</p>
              ) : null}
            </div>

            {/* Image URL */}
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={(event) => update("imageUrl", event.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the event..."
                className="min-h-36"
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end gap-3">
            {/* <Button
              type="button"
              variant="outline"
              className="border-destructive/30 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive"
            >
              <Trash2 />
              Cancel
            </Button> */}
            <Button
              type="submit"
              className="bg-[#00A8E8] text-white hover:bg-[#0095d1]"
            >
              <PackageCheck />
              Create Event
            </Button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={2000} />
    </main>
  );
}
