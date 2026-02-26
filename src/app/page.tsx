"use client";

import "~/styles/globals.css";
import SendRequests from "./SendRequests";
import ReadRequests from "./ReadRequests";

export default function HomePage() {
  return (
    <main className="grid gap-6 md:grid-cols-2">
      <SendRequests />
      <ReadRequests />
    </main>
  );
}
