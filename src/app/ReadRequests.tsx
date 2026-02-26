import { useEffect, useState } from "react";

export default function ReadRequests() {
  const [requests, setRequests] = useState<{
    id: number;
    requestText: string;
    createdAt: string;
  }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);

  const loadRequests = async () => {
    setIsLoading(true);
    const response = await fetch("/api", {
      method: "GET",
    });

    const data = (await response.json()) as {
      id: number;
      requestText: string;
      createdAt: string;
    }[];

    setRequests(data);
    setIsLoading(false);
  };

  useEffect(() => {
    void loadRequests();
  }, []);

  const clearRequests = async () => {
    setIsClearing(true);
    await fetch("/api", {
      method: "DELETE",
    });
    setRequests([]);
    setIsClearing(false);
  };

  return (
    <section className="rounded-lg border border-white p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Read Request</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadRequests}
            disabled={isLoading || isClearing}
            className="rounded-lg border border-white px-3 py-1 text-sm font-semibold transition-colors enabled:hover:bg-white enabled:hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            Refetch
          </button>
          <button
            type="button"
            onClick={clearRequests}
            disabled={isLoading || isClearing}
            className="rounded-lg border border-white px-3 py-1 text-sm font-semibold transition-colors enabled:hover:bg-white enabled:hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isClearing ? "Clearing..." : "Clear"}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-white">
        <table className="w-full border-collapse text-left font-mono text-sm">
          <thead>
            <tr className="border-b border-white">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Request</th>
              <th className="px-3 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="px-3 py-2">
                  Loading...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-3 py-2">
                  No requests found.
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request.id} className="border-t border-white/30 align-top">
                  <td className="px-3 py-2">{request.id}</td>
                  <td className="max-w-xs whitespace-pre-wrap wrap-break-word px-3 py-2">
                    {request.requestText}
                  </td>
                  <td className="px-3 py-2">
                    {new Date(request.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}