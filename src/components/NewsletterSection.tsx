
"use client";

import { useState, FormEvent } from "react";

const priorityAreas = [
  "Dhaka North",
  "Dhaka South",
  "Chittagong Coastal",
  "Sylhet Sadar",
];

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Connect your newsletter API here
    console.log("Subscribed email:", email);
    setEmail("");
  };

  return (
    <section className="bg-[#f0f4ff] px-4 py-10 sm:px-6">
      <div className="relative mx-auto flex min-h-[376px] max-w-[850px] flex-col items-center justify-center overflow-hidden rounded-[14px] bg-white px-5 py-10 text-center shadow-md sm:px-10">

        {/* Background Gradient */}
        <div className="pointer-events-none absolute right-0 top-0 h-60 w-64 rounded-full bg-emerald-100/50 blur-[70px]" />

        {/* Content */}
        <div className="relative z-10 flex w-full flex-col items-center">

          {/* Icon */}
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f1ee] text-[#007653]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold tracking-tight text-[#111e30] sm:text-[36px] sm:leading-[1.2]">
            Stay Notified of Urgent Drives
          </h2>

          {/* Description */}
          <p className="mt-2 max-w-[600px] text-sm leading-[26px] text-[#46534c] sm:text-[16px]">
            Receive prompt emergency relief calls, flash winter donation
            locations, and upcoming weekend drives delivered straight to
            your inbox.
          </p>

          {/* Subscription Form */}
          <form
            onSubmit={handleSubscribe}
            className="mt-4 flex w-full max-w-[448px] flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="h-12 min-w-0 flex-1 rounded-lg border border-[#e1e8f5] bg-[#f0f4ff] py-5 lg:py-0 px-4 text-sm text-[#172438] outline-none transition placeholder:text-[#7b857e] focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />

            <button
              type="submit"
              className="flex h-12 shrink-0 items-center justify-center gap-1 rounded-lg bg-[#006c4b] px-6 text-sm font-semibold text-white transition hover:bg-[#00563c] active:scale-[0.98]"
            >
              Subscribe to Alerts
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 14-7-7 14-2-6-5-1Z" />
              </svg>
            </button>
          </form>

          {/* Priority Areas */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
            <span className="font-semibold text-[#15243a]">
              Priority Dispatches for:
            </span>

            {priorityAreas.map((area) => (
              <span
                key={area}
                className="rounded bg-[#e5edff] px-1.5 py-0.5 font-medium text-[#15243a]"
              >
                {area}
              </span>
            ))}
          </div>

          {/* Privacy Text */}
          <p className="mt-4 text-xs leading-5 text-[#737e77]">
            Zero spam. Unsubscribe anytime with one tap. 100% community
            audited and private.
          </p>

        </div>
      </div>
    </section>
  );
}
