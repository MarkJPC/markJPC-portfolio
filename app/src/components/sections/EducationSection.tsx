"use client";

import { motion } from "motion/react";
import type { Education } from "@/lib/types";

export default function EducationSection({
  education,
}: {
  education: Education[];
}) {
  if (education.length === 0) return null;

  return (
    <section id="education" className="scroll-mt-16 border-t border-gh-border py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 flex items-center gap-3">
          <svg className="h-6 w-6 text-gh-muted" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16zM14.5 4.5h-2.75A1.75 1.75 0 0 1 10 2.75V.5H1.75a.25.25 0 0 0-.25.25v13.5c0 .138.112.25.25.25h11.5a.25.25 0 0 0 .25-.25zM11.5.5v2.25c0 .138.112.25.25.25h2.25zM4 7.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 4 7.25m0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75" />
          </svg>
          <h2 className="text-xl font-semibold text-gh-text">Education</h2>
        </div>

        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="rounded-md border border-gh-border border-l-[3px] border-l-gh-link bg-gh-card p-6"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0 text-gh-muted" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16zM14.5 4.5h-2.75A1.75 1.75 0 0 1 10 2.75V.5H1.75a.25.25 0 0 0-.25.25v13.5c0 .138.112.25.25.25h11.5a.25.25 0 0 0 .25-.25zM11.5.5v2.25c0 .138.112.25.25.25h2.25zM4 7.25a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 4 7.25m0 3a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75" />
                    </svg>
                    <h4 className="text-base font-semibold text-gh-link">
                      {edu.institution}
                    </h4>
                  </div>
                  <p className="mt-1 text-base text-gh-text">
                    {edu.degree}
                    {edu.field_of_study && ` in ${edu.field_of_study}`}
                  </p>
                </div>
                {edu.gpa && (
                  <span className="shrink-0 rounded-full border border-gh-border px-2.5 py-1 text-sm text-gh-muted">
                    GPA: {edu.gpa}
                  </span>
                )}
              </div>
              {edu.location && (
                <p className="mt-1 text-sm text-gh-muted">{edu.location}</p>
              )}
              {(edu.start_date || edu.end_date) && (
                <p className="mt-1 text-sm text-gh-muted">
                  {edu.start_date ?? ""}
                  {edu.start_date && edu.end_date && " — "}
                  {edu.end_date ?? ""}
                </p>
              )}
              {edu.description && (
                <p className="mt-3 text-sm text-gh-muted">
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
