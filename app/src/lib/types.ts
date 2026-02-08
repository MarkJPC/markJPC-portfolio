export interface Project {
  id: string;
  title: string;
  company: string | null;
  role: string | null;
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

export interface ProjectFormData {
  title: string;
  company: string;
  role: string;
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
