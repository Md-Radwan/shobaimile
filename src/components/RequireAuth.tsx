// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useSession } from "@/lib/auth-client";

// /**
//  * Client-side route guard for private/protected pages.
//  * Renders children only for signed-in users; redirects to /login otherwise.
//  */
// export default function RequireAuth({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { data: session, isPending } = useSession();
//   const router = useRouter();
//   const isAuthenticated = Boolean(session?.user);

//   useEffect(() => {
//     if (!isPending && !isAuthenticated) {
//       router.replace("/login");
//     }
//   }, [isPending, isAuthenticated, router]);

//   if (isPending) {
//     return (
//       <div className="flex min-h-[40vh] items-center justify-center text-slate-500">
//         Loading…
//       </div>
//     );
//   }

//   if (!isAuthenticated) return null;

//   return <>{children}</>;
// }
