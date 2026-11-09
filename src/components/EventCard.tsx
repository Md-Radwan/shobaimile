import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  HeartPulse,
  Leaf,
  MapPin,
  ShowerHead,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export interface EventCardData {
  _id: string;
  title: string;
  location: string;
  eventType: string;
  eventDate: string; // "YYYY-MM-DD"
  imageUrl: string;
  description: string;
}

// Per-type icon for the top-right badge; falls back to a generic calendar icon
const typeIcons: Record<string, LucideIcon> = {
  "Food Drive": UtensilsCrossed,
  Healthcare: HeartPulse,
  Education: BookOpen,
  Environment: Leaf,
  Cleanup: ShowerHead,
  "Community": Users,
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const EventCard = ({ event }: { event: EventCardData }) => {
  // Parse "YYYY-MM-DD" manually to avoid timezone shifting the date
  const [, month, day] = event.eventDate.split("-");
  const monthLabel = MONTHS[Number(month) - 1] ?? "";
  const TypeIcon = typeIcons[event.eventType] ?? CalendarClock;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image with date & type badges */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* Remote event URLs (e.g. per-user uploads), so plain img is used
        instead of next/image (which needs remotePatterns config). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        {/* Date badge */}
        <div className="absolute left-4 top-4 rounded-xl bg-white px-3 py-2 text-center shadow-md">
          <p className="text-xl font-bold leading-none text-slate-900">
            {Number(day)}
          </p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600">
            {monthLabel}
          </p>
        </div>

        {/* Event type badge */}
        <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-lg bg-slate-900/80 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
          <TypeIcon className="h-3.5 w-3.5" />
          {event.eventType}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
          <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
          {event.location}
        </p>

        <h3 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl">
          {event.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
          {event.description}
        </p>

        {/* Spacer so the button sits at the card bottom on all rows */}
        <div className="flex-1" />

        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
        >
          View Event
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
};

export default EventCard;
