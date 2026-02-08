import { supabaseAdmin } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
import AdminProjectTable from "@/components/AdminProjectTable";

export default async function AdminPage() {
  const { data: projects } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return <AdminProjectTable projects={(projects as Project[]) || []} />;
}
