import EventCard, { type EventCardData } from "@/components/EventCard";

const UpcomingEventPage = async () => {
  const res = await fetch("http://localhost:4000/upcoming-events");
  const events: EventCardData[] = await res.json();

  return (
    <section className="bg-indigo-50/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        {/* Header */}
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
          </svg>
          What&apos;s Ahead
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Upcoming Events
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
          Join a community drive near you — browse what&apos;s coming up and
          save your spot as a volunteer.
        </p>

        {/* Event cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventPage;
