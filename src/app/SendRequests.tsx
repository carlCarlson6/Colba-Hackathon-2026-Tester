import { useState } from "react";

export default function SendRequests() {
  const [requestText, setRequestText] = useState("");
  
  return (
      <section className="rounded-lg border border-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Write Request</h2>
        <textarea
          placeholder="write your payload here"
          rows={10}
          value={requestText}
          onChange={(event) => setRequestText(event.target.value)}
          className="min-h-40 w-full resize-y rounded-lg border border-white bg-black px-3 py-2 font-mono text-sm leading-6 text-white [tab-size:2]"
        />
      </section>

  );
}