import {
  BarChart3,
  CircleCheck,
  Clock,
  MousePointerClick,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

const features = [
  {
    title: "1. Verified Local Events",
    description:
      "Every initiative is geotagged down to specific landmarks like Mirpur 10 roundabout or Mohammadpur Town Hall with direct coordinator phone contacts and transparent inventory gear manifests.",
    icon: ShieldCheck,
    tileClasses: "bg-emerald-400 text-white",
    chipIcon: CircleCheck,
    chipIconClasses: "text-emerald-600",
    chipClasses: "bg-emerald-50 text-emerald-700",
    chipText: "Zero ghost campaigns; 100% physically audited",
  },
  {
    title: "2. Instant RSVP & Volunteer Tracking",
    description:
      "One-click volunteer joining with live slot availability, role assignments (distribution, crowd safety, sorting), and automatic SMS/Push field reminders 12hours prior to dispatch.",
    icon: MousePointerClick,
    tileClasses: "bg-amber-300 text-white",
    chipIcon: Clock,
    chipIconClasses: "text-amber-600",
    chipClasses: "bg-indigo-50 text-amber-600",
    chipText: "Instant capacity status & slot reserves",
  },
  {
    title: "3. Organizer Tooling & Inventory",
    description:
      "Host your own social drive with our full coordinator dashboard. Update logistical requirements, declare emergency supply shortages, and broadcast field updates live to all registered attendees.",
    icon: SlidersHorizontal,
    tileClasses: "bg-indigo-200 text-indigo-900",
    chipIcon: BarChart3,
    chipIconClasses: "text-slate-800",
    chipClasses: "bg-indigo-50 text-slate-800",
    chipText: "Live volunteer rosters and logistics board",
  },
];

export default function FeatureSection() {
  return (
    <section className="bg-indigo-50/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        {/* Header */}
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700">
          {/* Spark/asterisk mark */}
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
          Civic Operating Model
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          How ShobaiMile Empowers Grassroots Action
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
          Bridging enthusiastic neighborhood volunteers with direct grassroots
          logistics, transparent rosters, and real-time community
          accountability.
        </p>

        {/* Feature cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.tileClasses}`}
              >
                <feature.icon className="h-6 w-6" />
              </span>

              <h3 className="mt-5 text-lg font-bold text-slate-900 sm:text-xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>

              {/* Spacer so footer chips align to the card bottom on all rows */}
              <div className="flex-1" />

              {/* Footer chip */}
              <div
                className={`mt-6 flex items-center gap-2 rounded-lg px-3.5 py-2.5 ${feature.chipClasses}`}
              >
                <feature.chipIcon
                  className={`h-4 w-4 shrink-0 ${feature.chipIconClasses}`}
                />
                <span className="text-xs font-semibold sm:text-sm">
                  {feature.chipText}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
