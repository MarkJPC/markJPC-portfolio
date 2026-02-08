import { supabaseAdmin } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
import AdminEditor from "@/components/AdminEditor";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditorPage({ params }: Props) {
  const { id } = await params;

  let project: Project | null = null;

  if (id !== "new") {
    const { data } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    project = data as Project | null;
  }

  return <AdminEditor project={project} />;
}
