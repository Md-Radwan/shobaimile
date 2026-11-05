"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await signIn.email({ email, password });

    if (signInError) {
      setError(signInError.message ?? "Failed to sign in");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <section className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Login</h1>
      <p className="mt-1 text-sm text-slate-600">
        Sign in to create, manage, and join events.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>
    </section>
  );
}
