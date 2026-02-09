"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject: subject || null, message }),
    });

    if (res.ok) {
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      setStatus("error");
    }
    setSubmitting(false);
  }

  return (
    <section id="contact" className="scroll-mt-16 border-t border-gh-border py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex items-center gap-3">
          <svg className="h-6 w-6 text-gh-muted" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.5 1.75V13.5h13.006c.272 0 .494.22.494.5s-.222.5-.494.5H.75a.75.75 0 0 1-.75-.75V1.75a.75.75 0 0 1 1.5 0Zm14.28 2.53-5.25 5.25a.75.75 0 0 1-1.06 0L7 7.06 4.28 9.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.25-3.25a.75.75 0 0 1 1.06 0L10 7.94l4.72-4.72a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z" />
          </svg>
          <h2 className="text-xl font-semibold text-gh-text">Get in Touch</h2>
        </div>
        <div className="overflow-hidden rounded-md border border-gh-border">
          <div className="flex items-center gap-2 border-b border-gh-border bg-gh-card px-5 py-3">
            <svg className="h-5 w-5 text-gh-green" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
            </svg>
            <span className="text-base font-medium text-gh-text">New Message</span>
          </div>

          <div className="bg-gh-bg p-8">
            {status === "success" && (
              <div className="mb-4 rounded-md border border-gh-green bg-gh-green/10 px-5 py-3.5 text-base text-gh-green">
                Message sent! I&apos;ll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="mb-4 rounded-md border border-gh-red bg-gh-red/10 px-5 py-3.5 text-base text-gh-red">
                Failed to send message. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm text-gh-muted">Name</label>
                  <input
                    className="input"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-gh-muted">Email</label>
                  <input
                    className="input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-gh-muted">Subject</label>
                <input
                  className="input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-gh-muted">Message</label>
                <textarea
                  className="input min-h-[160px] resize-y"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a comment..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-md bg-gh-green px-6 py-2.5 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Submit new message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
