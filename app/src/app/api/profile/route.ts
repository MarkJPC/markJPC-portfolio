import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const DEFAULT_PROFILE = {
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
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("profile")
    .select("*")
    .limit(1)
    .single();

  if (error || !data) {
    return NextResponse.json(DEFAULT_PROFILE);
  }

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const session = request.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // Get the existing profile row
  const { data: existing } = await supabaseAdmin
    .from("profile")
    .select("id")
    .limit(1)
    .single();

  if (!existing) {
    return NextResponse.json({ error: "No profile found" }, { status: 404 });
  }

  const { data, error } = await supabaseAdmin
    .from("profile")
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", existing.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
