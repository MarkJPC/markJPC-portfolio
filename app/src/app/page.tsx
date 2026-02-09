import { supabaseAdmin } from "@/lib/supabase/server";
import type { Profile, Project, Education, Skills } from "@/lib/types";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationSection from "@/components/sections/EducationSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

const DEFAULT_PROFILE: Profile = {
  id: "",
  name: "Mark Cena",
  role: "Software Engineer",
  tagline: "Building scalable backend systems and APIs.",
  location: "Calgary, AB",
  email: "markjpcena@gmail.com",
  github_url: "https://github.com/MarkJPC",
  linkedin_url: "https://www.linkedin.com/in/mark-cena-bb8658267/",
  avatar_url: "https://github.com/MarkJPC.png",
  bio: "Backend Software Engineer building scalable systems and APIs.",
  passionate_about: [],
  experiences: [],
  skills: {},
  resume_url: null,
  about_content: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default async function Home() {
  const [profileResult, projectsResult, educationResult] = await Promise.all([
    supabaseAdmin.from("profile").select("*").limit(1).single(),
    supabaseAdmin.from("projects").select("*").order("sort_order", { ascending: true }),
    supabaseAdmin.from("education").select("*").order("sort_order", { ascending: true }),
  ]);

  const profile: Profile = profileResult.data ?? DEFAULT_PROFILE;
  const projects: Project[] = projectsResult.data ?? [];
  const education: Education[] = educationResult.data ?? [];
  const skills: Skills = profile.skills ?? {};

  return (
    <div>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <ProjectsSection projects={projects} />
      <EducationSection education={education} />
      <SkillsSection skills={skills} />
      <ContactSection />
    </div>
  );
}
