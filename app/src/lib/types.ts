export interface Project {
  id: string;
  title: string;
  company: string | null;
  role: string | null;
  location: string | null;
  type: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  description: string;
  content: string | null;
  tech_stack: string[];
  github_url: string | null;
  live_url: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at">;

export type ProjectUpdate = Partial<ProjectInsert>;

export interface Experience {
  company: string;
  role: string;
}

export type Skills = { [category: string]: string[] };

export interface Profile {
  id: string;
  name: string;
  role: string | null;
  tagline: string;
  location: string | null;
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  avatar_url: string | null;
  bio: string | null;
  passionate_about: string[];
  experiences: Experience[];
  skills: Skills;
  resume_url: string | null;
  about_content: string | null;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  location: string | null;
  gpa: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
}

export interface ProjectFormData {
  title: string;
  company: string;
  role: string;
  location: string;
  type: string;
  status: string;
  start_date: string;
  end_date: string;
  description: string;
  content: string;
  tech_stack: string;
  github_url: string;
  live_url: string;
  is_featured: boolean;
  sort_order: number;
}
