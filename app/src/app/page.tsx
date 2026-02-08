import { supabaseAdmin } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
import ProfileCard from "@/components/ProfileCard";
import RepoCard from "@/components/RepoCard";

export default async function Home() {
  const { data: projects } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("sort_order", { ascending: true });

  const featured = (projects as Project[]) || [];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[296px_1fr]">
      <aside>
        <ProfileCard />
      </aside>
      <section>
        <h2 className="mb-4 text-base text-gh-muted">
          Pinned
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {featured.map((project) => (
            <RepoCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
