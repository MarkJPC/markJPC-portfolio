import { supabaseAdmin } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";
import ProfileEditor from "@/components/ProfileEditor";

export default async function AdminProfilePage() {
  const { data } = await supabaseAdmin
    .from("profile")
    .select("*")
    .limit(1)
    .single();

  if (!data) {
    return (
      <div className="rounded-md border border-gh-border bg-gh-card p-6 text-center">
        <p className="text-gh-muted">
          No profile found. Create a profile row in Supabase first.
        </p>
      </div>
    );
  }

  return <ProfileEditor profile={data as Profile} />;
}
