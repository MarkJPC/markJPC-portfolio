import { supabaseAdmin } from "@/lib/supabase/server";
import type { Education } from "@/lib/types";
import EducationTable from "@/components/EducationTable";

export default async function AdminEducationPage() {
  const { data } = await supabaseAdmin
    .from("education")
    .select("*")
    .order("sort_order", { ascending: true });

  return <EducationTable initialData={(data as Education[]) ?? []} />;
}
