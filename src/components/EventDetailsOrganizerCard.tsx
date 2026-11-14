"use client"

import { authClient } from "@/lib/auth-client";
import {Person} from '@gravity-ui/icons';

const EventDetailsOrganizerCard = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
  return (
    <section className="bg-slate-50 rounded-xl border border-slate-200 p-5">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
        Initiative Organizer
      </h3>
      <div className="flex items-center gap-3 mb-3">
        {user?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user?.name ?? "Organizer"}
            className="h-10 w-10 rounded-full object-cover border border-slate-200"
          />
        ) : (
          <div className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500">
            <Person />
          </div>
        )}
        <div>
          <p className="font-semibold text-slate-900">{user?.name ?? "Organizer"}</p>
          
          <p className="text-xs text-slate-500">{user?.email ?? ""}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
        <span className="text-xs font-medium text-emerald-600">
          Verified Platform Member
        </span>
      </div>
    </section>
  );
};

export default EventDetailsOrganizerCard;
