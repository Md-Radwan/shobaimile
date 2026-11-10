"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUp, Clock, Mail, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const exploreLinks = [
  { href: "/upcoming-events", label: "Upcoming Events" },
  { href: "/create-event", label: "Create Event" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/joined-events", label: "Joined Events" },
];

const accountLinks = [
  { href: "/", label: "Home" },
  { href: "/sign-in", label: "Sign In" },
  { href: "/sign-up", label: "Sign Up" },
];

const contactRows: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}[] = [
  { icon: MapPin, label: "Field HQ", value: "Dhaka, Bangladesh" },
  {
    icon: Mail,
    label: "Email",
    value: "hello@shobaimile.org",
    href: "mailto:hello@shobaimile.org",
  },
  {
    icon: Clock,
    label: "Dispatch hours",
    value: "Sat-Thu, 9:00-18:00 BST",
  },
];

// Placeholder social profiles — swap href="#" for the real URLs.
const socials = ["Facebook", "YouTube", "LinkedIn"];

function LinkList({
  links,
  label,
}: {
  links: { href: string; label: string }[];
  label: string;
}) {
  return (
    <nav aria-label={label} className="mt-4">
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-emerald-300"
            >
              {/* Dash grows from the left on hover without shifting the label */}
              <span
                aria-hidden
                className="h-px w-3 origin-left scale-x-0 bg-emerald-400 transition-transform duration-300 group-hover:scale-x-100"
              />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white px-3 pt-4 pb-4 sm:px-6 sm:pt-6 sm:pb-6 bg-gradient-to-b from-[#06362a] via-[#04291f] to-[#031d16]">
      <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[28px]  text-white">
        {/* Dot-grid texture + glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:26px_26px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-emerald-500/25 blur-[110px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 right-0 h-52 w-52 rounded-full bg-amber-500/15 blur-[80px]"
        />


        {/* Main footer body */}
        <div className="relative z-10 pb-28 sm:pb-32">
          <div className="grid grid-cols-1 gap-10 px-5 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-12">
            {/* Brand block */}
            <div className="sm:col-span-2 lg:col-span-5">
              <div className="inline-flex rounded-xl bg-white p-2.5 shadow-lg shadow-black/20 ring-1 ring-white/20">
                <Image
                  src="/shobaimile-logo.svg"
                  alt="ShobaiMile"
                  width={180}
                  height={65}
                />
              </div>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
                ShobaiMile mobilizes neighborhood volunteers for verified
                grassroots drives across Bangladesh — from winter blanket
                handouts to flash-flood response.
              </p>
              <p className="mt-3 text-sm font-semibold text-emerald-300">
                ছোট উদ্যোগ, বড় পরিবর্তন
              </p>
            </div>

            {/* Explore */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                Explore
              </h3>
              <LinkList links={exploreLinks} label="Explore" />
            </div>

            {/* Account */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                Account
              </h3>
              <LinkList links={accountLinks} label="Account" />
            </div>

            {/* Field HQ contact */}
            <div className="sm:col-span-2 lg:col-span-3">
              <h3 className="text-xs font-bold tracking-widest text-amber-400 uppercase">
                Field HQ
              </h3>
              <ul className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                {contactRows.map((row) => (
                  <li key={row.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
                      <row.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                        {row.label}
                      </p>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="block truncate text-sm text-white/85 transition-colors hover:text-emerald-300"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <p className="text-sm text-white/85">{row.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>



          {/* Bottom bar */}
          <div className="mx-5 mt-8 border-t border-white/10 pt-6 sm:mx-8 lg:mx-12">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-center text-xs text-white/50 sm:text-left">
                © {new Date().getFullYear()} ShobaiMile · All rights reserved.
              </p>
              <p className="text-center text-xs text-white/40 sm:text-center">
                Built for Bangladesh&apos;s grassroots civic networks
              </p>
              <button
                type="button"
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-emerald-400/40 hover:bg-white/10 hover:text-emerald-300"
              >
                <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
                Back to top
              </button>
            </div>
          </div>
        </div>

        {/* Oversized clipped tagline (decorative) */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-10 left-1/2 w-max -translate-x-1/2 translate-y-[28%] text-[clamp(2rem,8vw,7rem)] leading-none font-bold whitespace-nowrap text-white/10 select-none"
        >
          ছোট উদ্যোগ, বড় পরিবর্তন
        </span>
      </div>
    </footer>
  );
}
