import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Home, MapPin, Users } from "lucide-react";

const stats = [
  {
    icon: Home,
    value: "12,400+",
    label: "Warm Clothes Distributed",
    iconClasses: "bg-orange-400 text-white",
  },
  {
    icon: Users,
    value: "450+",
    label: "Active Volunteers",
    iconClasses: "bg-emerald-500 text-white",
  },
  {
    icon: MapPin,
    value: "85",
    label: "Neighborhood Drives",
    iconClasses: "border border-slate-200 bg-white text-slate-800",
  },
  {
    icon: BadgeCheck,
    value: "100%",
    label: "Direct Verification",
    iconClasses: "bg-emerald-500 text-white",
  },
];

// Overlapping "trusted by" avatar circles (initials + count chip).
const trustedAvatars = [
  { initials: "KA", classes: "bg-red-500" },
  { initials: "SR", classes: "bg-orange-500" },
  { initials: "NZ", classes: "bg-emerald-700" },
  { initials: "+4k", classes: "bg-slate-800" },
];

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-20">
        {/* Left: copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
            Real-time Field Operations in Bangladesh
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Mobilizing Communities for{" "}
            <span className="text-emerald-700 underline decoration-emerald-500 decoration-wavy decoration-2 underline-offset-8">
              Direct Social Impact
            </span>{" "}
            in Bangladesh
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Coordinating hyper-local grassroots action from winter clothes
            handouts and flash-flood response to school supply packages and
            urban tree plantations across Dhaka, Chittagong, and Sylhet.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/upcoming-events"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-900"
            >
              <ArrowRight className="h-4 w-4" />
              Explore Upcoming Drives
            </Link>
            <Link
              href="/create-event"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-100 px-6 py-3 text-sm font-semibold text-indigo-950 transition-colors hover:bg-indigo-200"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-current">
                <span className="h-1.5 w-1.5 bg-current" />
              </span>
              Host a Community Drive
            </Link>
          </div>

          {/* Trusted by */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-2.5">
              {trustedAvatars.map((avatar) => (
                <span
                  key={avatar.initials}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white ring-2 ring-white ${avatar.classes}`}
                >
                  {avatar.initials}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-600">
              Trusted by 4,200+ registered civic stewards &amp; field leaders
            </p>
          </div>
        </div>

        {/* Right: image card */}
        <div className="relative h-[280px] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 sm:h-[360px] lg:h-[460px]">
          <Image
            src="/HeroSectionBannerImg.jpg"
            alt="Volunteers distributing blankets during a community relief drive"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          {/* Bottom overlay for the mission card text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-4 sm:p-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                Live Grassroots Mission
              </p>
              <h2 className="mt-1.5 text-lg font-semibold text-white sm:text-xl">
                Mohammadpur Town Hall Blanket Relief
              </h2>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-white/90 sm:text-sm">
                <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                Verified Field Dispatch
              </p>
            </div>
            <span className="rounded-md bg-white/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              Dhaka South
            </span>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-t border-white/60 bg-indigo-50/70">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:py-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.iconClasses}`}
              >
                <stat.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-lg font-bold text-slate-900 sm:text-xl">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-600 sm:text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
