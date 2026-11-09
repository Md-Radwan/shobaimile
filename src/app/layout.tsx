import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { cn } from "@/lib/utils";
  import { ToastContainer } from 'react-toastify';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "ShobaiMile || ছোট উদ্যোগ, বড় পরিবর্তন",
  description: "Social Development Events Platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", plusJakartaSans.className, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <ToastContainer />
      </body>
    </html>
  );
}
