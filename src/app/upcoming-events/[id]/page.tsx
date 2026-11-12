import Link from "next/link";
import { CalendarClock, MapPin, Users, Share2 } from "lucide-react";

export interface EventData {
  _id: string;
  title: string;
  location: string;
  eventType: string;
  eventDate: string; // "YYYY-MM-DD"
  imageUrl: string;
  description: string;
  /** Who created the event — attached by `create-event` as `email`; may include a `name`. */
  organizer?: { name?: string; email?: string };
  /** Users who have joined this event. */
  volunteers?: Array<{ name?: string; avatar?: string }>;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UpcomingEventDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  let event: EventData | null = null;
  let error = "";

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to load event");
    event = await res.json();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load event";
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h2 className="text-xl font-bold text-slate-900">
            {error || "Event not found"}
          </h2>
          <p className="mt-2 text-slate-600">
            The event details could not be loaded.
          </p>
          <Link
            href="/upcoming-events"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline"
          >
            ← Back to Upcoming Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Back link */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-emerald-600"
        >
          ← Back to Upcoming Events
        </Link>
      </div>

      {/* Hero image section */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-100 object-cover"
          />
          {/* Event type badge */}
          <span className="absolute left-6 top-6 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-sm">
            <CalendarClock className="h-3 w-3 text-emerald-600" />
            {event.eventType}
          </span>

          {/* Title overlay on image bottom */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="flex items-center gap-2 text-sm font-medium text-white mt-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
              <p>{event.location}</p>
              <span className="h-3.5 w-0.5 bg-white/40 mx-1"></span>
              <time className="flex items-center gap-1">
                <CalendarClock className="h-3 w-3 shrink-0 text-emerald-400" />
                {event.eventDate}
              </time>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content card */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10">
          {/* Volunteer count + Join button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Joined as a volunteer</p>
                <p className="text-sm text-slate-500">
                  Sign up to join hands for this drive
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <Link
                href="/joined-events"
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
              >
                Join Event
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left column: About + Guidelines */}
            <div className="lg:col-span-7 space-y-8">
              <section>
                <h2 className="text-lg font-bold text-slate-900">
                  About this Social Initiative
                </h2>
                <p className="mt-3 text-slate-600 leading-relaxed">
                  {event.description}
                </p>
              </section>

              <section className="border-t border-slate-100 pt-8">
                <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Volunteer Guidelines
                </h2>
                <ul className="mt-4 space-y-3 text-slate-600 leading-relaxed">
                  <li className="flex gap-3">
                    <span className="flex shrink-0 items-center text-emerald-500">
                      ●
                    </span>
                    <p>
                      Please arrive 15 minutes before the scheduled time at the
                      designated location.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex shrink-0 items-center text-emerald-500">
                      ●
                    </span>
                    <p>
                      Wear comfortable clothing suitable for physical social work
                      and distribution.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex shrink-0 items-center text-emerald-500">
                      ●
                    </span>
                    <p>
                      Bring any pre-coordinated relief packages or distribution
                      items if requested.
                    </p>
                  </li>
                </ul>
              </section>
            </div>

            {/* Right column: Organizer + Confirmed Volunteers */}
            <div className="lg:col-span-5 space-y-6">
              <section className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Initiative Organizer
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://i.pravatar.cc/150?img=11"
                    alt="Organizer"
                    className="h-10 w-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">raihan</p>
                    <p className="text-xs text-slate-500">
                      raihan@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-medium text-emerald-600">
                    Verified Platform Member
                  </span>
                </div>
              </section>

              {/* <section className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Confirmed Volunteers (1)
                  </h3>
                </div>
                <div className="flex items-center gap-3"> */}
                  {/* <img
                    src="https://i.pravatar.cc/150?img=11"
                    alt="Volunteer"
                    className="h-10 w-10 rounded-full object-cover border border-slate-200"
                  />
                  <p className="text-sm font-medium text-slate-900">raihan</p>
                </div>
              </section> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
