import EventCard, { type EventCardData } from "@/components/EventCard";
import Link from "next/link";
import { Button } from "@heroui/react";
import { PlusCircle } from "lucide-react";

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
        

    {/* Community impact call out */}
      <div
      aria-labelledby="callout-heading"
      className="bg-[#EEF3FF] px-4 py-8 sm:px-6 md:py-10"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl bg-gradient-to-br from-[#006B45] to-[#008760] px-6 py-8 shadow-[0_4px_16px_rgba(0,80,50,0.18)] sm:px-10 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
            Organize in your ward
          </p>
          <h2
            id="callout-heading"
            className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-[28px]"
          >
            Want to lead a drive in your local district?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/90">
            Every verified neighborhood organizer gets immediate transparent ledger tracking,
            volunteer sign-up lists, and Kormoshala logistics support.
          </p>
        </div>
 
        {/* /create-event is protected: middleware sends guests to login first */}
        <Link href="/create-event">
          <Button
            size="md"
            className="shrink-0 bg-white px-5 font-semibold text-[#006B45] shadow-sm hover:bg-emerald-50"
          >
            <PlusCircle size={18} aria-hidden />
            Host an Initiative
          </Button>
        </Link>
      </div>
    </div>
    </section>
  );
};

export default UpcomingEventPage;
