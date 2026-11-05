"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";

// Private/protected routes shown in the profile dropdown / mobile menu.
const protectedLinks = [
  { href: "/create-event", label: "Create Event" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/joined-events", label: "Joined Events" },
];

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false); // desktop profile dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // mobile slide-down menu
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click (profile dropdown) or Escape (both).
  useEffect(() => {
    if (!menuOpen && !mobileOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, mobileOpen]);

  async function handleLogout() {
    setMenuOpen(false);
    setMobileOpen(false);
    await signOut();
    router.push("/");
    router.refresh();
  }

  function closeMenus() {
    setMenuOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* App logo / name */}
        <Link href="/" onClick={closeMenus} className="shrink-0">
          <Image
            src="/shobaimile-logo.svg"
            alt="ShobaiMile"
            width={200}
            height={100}
            priority
            // className="h-9 w-auto md:h-10"
          />
        </Link>

        {/* Center: upcoming events (desktop) */}
        <nav className="hidden flex-1 justify-center md:flex">
          <Link
            href="/"
            onClick={closeMenus}
            className="text-sm font-semibold text-slate-800 transition-colors hover:text-emerald-600 md:text-base"
          >
            Upcoming Events
          </Link>
        </nav>

        {/* Desktop auth area */}
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-slate-100" />
          ) : user ? (
            <>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
              >
                Logout
              </button>

              {/* Profile picture with dropdown */}
              <div ref={menuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((open) => !open)}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  aria-label="Profile menu"
                  className="group flex items-center gap-0.5 rounded-full bg-slate-100 p-1 pr-1.5 transition-colors hover:bg-slate-200"
                >
                  <span className="relative flex">
                    {user.image ? (
                      // Remote avatar URLs vary by provider, so plain img is used
                      // instead of next/image (which needs remotePatterns config).
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.image}
                        alt={user.name ?? "Profile"}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                        {user.name?.charAt(0).toUpperCase() ?? "U"}
                      </span>
                    )}

                    {/* Display name tooltip on hover over the picture */}
                    <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {user.name ?? "User"}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-600 transition-transform ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {menuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-lg border border-slate-100 bg-white py-1 shadow-lg"
                  >
                    {protectedLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        onClick={closeMenus}
                        className="block px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-emerald-700"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/login"
              onClick={closeMenus}
              className="rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            <Link
              href="/"
              onClick={closeMenus}
              className="rounded-md px-3 py-2 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 hover:text-emerald-600"
            >
              Upcoming Events
            </Link>

            {user
              ? protectedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    className="rounded-md px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-emerald-700"
                  >
                    {link.label}
                  </Link>
                ))
              : isPending && (
                  <div className="mx-3 mt-2 h-9 animate-pulse rounded-md bg-slate-100" />
                )}

            {/* Auth area */}
            <div className="mt-2 border-t border-slate-100 pt-3">
              {isPending ? null : user ? (
                <div className="flex items-center justify-between gap-2 px-3">
                  <div className="flex min-w-0 items-center gap-2">
                    {user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.image}
                        alt={user.name ?? "Profile"}
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                        {user.name?.charAt(0).toUpperCase() ?? "U"}
                      </span>
                    )}
                    <span className="truncate text-sm font-medium text-slate-800">
                      {user.name ?? "User"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="shrink-0 rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="block rounded-md bg-slate-100 px-4 py-2 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
