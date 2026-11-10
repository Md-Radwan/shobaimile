"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Link from "next/link";

const AuthLinks = () => {
  const { data: session } = useSession();
  // console.log("user session in navbar", session);
  return (
    <>
      {session?.user ? (
        <>
          <Link href={"/profile"} className="flex items-center gap-2">
            <Avatar>
              <Avatar.Image
                alt={session.user.name}
                src={session.user?.image ?? undefined}
              />
              <Avatar.Fallback>{session.user.name.slice(0, 1)}</Avatar.Fallback>
            </Avatar>
            <span>{session.user?.name}</span>
          </Link>

          <button
            onClick={() => signOut()}
            className="btn py-2.5 px-4.5 rounded-lg bg-[#05893E] text-white text-sm font-semibold leading-5"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link className="text-sm font-semibold leading-5" href={"/sign-in"}>
            Sign In
          </Link>
          <Link href={"/sign-up"}>
            <button className="btn py-2.5 px-4.5 rounded-lg bg-[#05893E] text-white text-sm font-semibold leading-5">
              Sign Up
            </button>
          </Link>
        </>
      )}
    </>
  );
};

export default AuthLinks;