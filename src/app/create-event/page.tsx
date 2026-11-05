import RequireAuth from "@/components/RequireAuth";

export default function CreateEventPage() {
  return (
    <RequireAuth>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Create Event</h1>
        <p className="mt-2 text-slate-600">
          Private route — event creation form goes here.
        </p>
      </section>
    </RequireAuth>
  );
}
