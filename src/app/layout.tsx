import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "hackathon-tester",
  description: "to test the project for the hackathon",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="p-8">
        <header className="mb-8 text-center text-xl font-semibold tracking-wide">
          COLBA HACKATHON TESTER 2026
        </header>
        {children}
      </body>
    </html>
  );
}
