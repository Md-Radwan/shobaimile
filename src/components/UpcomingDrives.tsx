import React from "react";
import EventCard, { EventCardData } from "./EventCard";

const UpcomingDrives = async () => {
  // ?limit=6 → next 6 upcoming events (future dates, soonest first)
  // via MongoDB .limit() on the API server. no-store so events created
  // through the Create Event page show up without a rebuild.
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upcoming-events?limit=6`, {
    cache: "no-store",
  });
  const events: EventCardData[] = await res.json();
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700">
          LIVE SYNCHRONIZED STREAM
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Recent Upcoming Drives
        </h2>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingDrives;
