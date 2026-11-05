import RequireAuth from "@/components/RequireAuth";

export default function ManageEventsPage() {
  return (
    <RequireAuth>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Manage Events</h1>
        <p className="mt-2 text-slate-600">
          Private route — event management dashboard goes here.
        </p>
      </section>
    </RequireAuth>
  );
}
