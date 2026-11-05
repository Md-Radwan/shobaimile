import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

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
      className={`${plusJakartaSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
