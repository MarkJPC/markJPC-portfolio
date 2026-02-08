import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
import ProjectList from "@/components/ProjectList";

export const metadata: Metadata = {
  title: "Repositories",
};

export default async function ProjectsPage() {
  const { data: projects } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <ProjectList projects={(projects as Project[]) || []} />
    </div>
  );
}
