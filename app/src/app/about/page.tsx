import type { Metadata } from "next";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export const metadata: Metadata = {
  title: "About",
};

const aboutContent = `
# About Me

Hey, I'm **Mark Cena** — a Backend Software Engineer based in Calgary, AB.

I specialize in building scalable backend systems, APIs, and data pipelines. My work focuses on clean architecture, performance optimization, and creating great developer experiences.

## What I Do

- **Backend Development** — Designing and building robust APIs and services
- **Database Engineering** — Schema design, query optimization, and data modeling
- **System Architecture** — Making decisions about scalability, reliability, and maintainability
- **DevOps & Infrastructure** — CI/CD pipelines, containerization, and cloud deployments

## Tech Stack

| Category | Technologies |
|----------|-------------|
| Languages | TypeScript, Python, Java, C# |
| Frameworks | Node.js, Next.js, Express, Spring Boot |
| Databases | PostgreSQL, MongoDB, Redis |
| Cloud | AWS, Vercel, Supabase |
| Tools | Docker, Git, GitHub Actions |

## About This Site

This portfolio is designed to mirror GitHub's interface. It's built with **Next.js**, **Tailwind CSS**, and **Supabase**, and deployed on **Vercel**.

The source code is available on [GitHub](https://github.com/MarkJPC).

## Get in Touch

- **Email**: [markjpcena@gmail.com](mailto:markjpcena@gmail.com)
- **GitHub**: [github.com/MarkJPC](https://github.com/MarkJPC)
- **LinkedIn**: [linkedin.com/in/mark-cena-bb8658267](https://www.linkedin.com/in/mark-cena-bb8658267/)
`;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl rounded-md border border-gh-border bg-gh-card p-6">
      <MarkdownRenderer content={aboutContent} />
    </div>
  );
}
