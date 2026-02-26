import { useState } from "react";

export default function SendRequests() {
  const [destinationUrl, setDestinationUrl] = useState("");
  const [requestText, setRequestText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const isDestinationUrlValid = (() => {
    const value = destinationUrl.trim();
    if (!value) return false;
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  })();

  const handleSend = () => {
    if (isSending) {
      fetch("/api/send", { 
        method: "DELETE",
        body: JSON.stringify({ 
          id: "request-loop-id",
        }),
       });
      setIsSending(false);
    } else {
      fetch("/api/send", { 
        method: "POST",
        body: JSON.stringify({ 
          "id": "request-loop-id",
          "destinationUrl": destinationUrl.trim(),
          "payload": requestText.trim(),
        }),
       });
      setIsSending(true);
    }
  };
  
  return (
      <section className="rounded-lg border border-white p-4">
        <h2 className="mb-3 text-lg font-semibold">Write Request</h2>
        <input
          type="url"
          placeholder="https://api.example.com/endpoint"
          value={destinationUrl}
          onChange={(event) => setDestinationUrl(event.target.value)}
          className="mb-3 w-full rounded-lg border border-white bg-black px-3 py-2 font-mono text-sm text-white"
        />
        <textarea
          placeholder="write your payload here"
          rows={10}
          value={requestText}
          onChange={(event) => setRequestText(event.target.value)}
          className="min-h-40 w-full resize-y rounded-lg border border-white bg-black px-3 py-2 font-mono text-sm leading-6 text-white [tab-size:2]"
        />
        <button
          type="button"
          disabled={!isDestinationUrlValid}
          className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white px-4 py-2 font-semibold text-white transition-colors enabled:hover:bg-white enabled:hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleSend}
        >
          {isSending && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {isSending ? "Cancel Request" : "Send Request"}
        </button>
      </section>

  );
}