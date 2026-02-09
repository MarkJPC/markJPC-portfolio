import { supabaseAdmin } from "@/lib/supabase/server";
import type { ContactMessage } from "@/lib/types";
import ContactMessagesTable from "@/components/ContactMessagesTable";

export default async function AdminMessagesPage() {
  const { data } = await supabaseAdmin
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return <ContactMessagesTable messages={(data as ContactMessage[]) ?? []} />;
}
