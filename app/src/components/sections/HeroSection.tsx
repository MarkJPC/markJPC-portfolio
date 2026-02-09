"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Profile } from "@/lib/types";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden scroll-mt-16"
    >
      {/* Background radial gradient spots for depth */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(600px circle at 20% 80%, rgba(88,166,255,0.04), transparent 60%), radial-gradient(600px circle at 80% 20%, rgba(88,166,255,0.04), transparent 60%)",
        }}
      />

      <motion.div
        className="relative grid w-full grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Column 1: Text content */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <motion.p
            variants={item}
            className="mb-3 text-sm uppercase tracking-[0.15em] text-gh-link"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="mb-4 text-5xl font-bold tracking-tight text-gh-text sm:text-6xl"
          >
            {profile.name}
          </motion.h1>

          {profile.role && (
            <motion.p
              variants={item}
              className="mb-2 text-xl text-gh-muted sm:text-2xl"
            >
              {profile.role}
            </motion.p>
          )}

          <motion.p
            variants={item}
            className="mb-6 text-lg font-light text-gh-muted sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          {profile.bio && (
            <motion.p
              variants={item}
              className="mb-8 max-w-[480px] text-lg leading-relaxed text-gh-muted opacity-90"
            >
              {profile.bio}
            </motion.p>
          )}

          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            {profile.github_url && (
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-gh-border bg-gh-card px-5 py-2.5 text-base text-gh-text transition-all hover:-translate-y-0.5 hover:border-gh-link hover:text-gh-link"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
                GitHub
              </a>
            )}
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-gh-border bg-gh-card px-5 py-2.5 text-base text-gh-text transition-all hover:-translate-y-0.5 hover:border-gh-link hover:text-gh-link"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
                LinkedIn
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 rounded-md border border-gh-border bg-gh-card px-5 py-2.5 text-base text-gh-text transition-all hover:-translate-y-0.5 hover:border-gh-link hover:text-gh-link"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>
                Email
              </a>
            )}
          </motion.div>

          {profile.resume_url && (
            <motion.div variants={item} className="mt-4">
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-gh-green px-6 py-3 text-sm font-medium uppercase tracking-[0.05em] text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:opacity-90"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </motion.div>
          )}
        </div>

        {/* Column 2: Avatar */}
        <motion.div variants={item} className="flex justify-center md:justify-center">
          <Image
            src={profile.avatar_url || "https://github.com/MarkJPC.png"}
            alt={profile.name}
            width={240}
            height={240}
            className="rounded-full border-2 border-gh-border"
            style={{
              boxShadow:
                "0 0 0 12px rgba(88,166,255,0.06), 0 20px 40px rgba(0,0,0,0.3)",
            }}
            priority
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-gh-muted">Scroll</span>
        <span className="block h-12 w-px animate-pulse bg-gradient-to-b from-gh-link to-transparent" />
      </div>
    </section>
  );
}
