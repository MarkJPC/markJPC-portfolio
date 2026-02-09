"use client";

import type { ContactMessage } from "@/lib/types";

export default function ContactMessagesTable({
  messages,
}: {
  messages: ContactMessage[];
}) {
  if (messages.length === 0) {
    return (
      <div className="rounded-md border border-gh-border bg-gh-card p-6 text-center">
        <p className="text-gh-muted">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-gh-border bg-gh-card">
      <div className="border-b border-gh-border px-4 py-3">
        <h2 className="text-sm font-semibold text-gh-text">
          Messages ({messages.length})
        </h2>
      </div>
      <div className="divide-y divide-gh-border">
        {messages.map((msg) => (
          <div key={msg.id} className="px-4 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gh-text">
                    {msg.name}
                  </span>
                  <span className="text-xs text-gh-muted">{msg.email}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      msg.status === "new"
                        ? "border border-gh-green bg-gh-green/10 text-gh-green"
                        : "border border-gh-border text-gh-muted"
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>
                {msg.subject && (
                  <p className="mt-1 text-sm font-medium text-gh-text">
                    {msg.subject}
                  </p>
                )}
                <p className="mt-1 text-sm text-gh-muted whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
              <span className="shrink-0 text-xs text-gh-muted">
                {new Date(msg.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
