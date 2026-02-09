import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  const session = request.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files allowed" }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
  }

  // Get current profile to check for existing resume
  const { data: profile } = await supabaseAdmin
    .from("profile")
    .select("id, resume_url")
    .limit(1)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "No profile found" }, { status: 404 });
  }

  // Delete old file if exists
  if (profile.resume_url) {
    const oldPath = profile.resume_url.split("/resumes/")[1];
    if (oldPath) {
      await supabaseAdmin.storage.from("resumes").remove([oldPath]);
    }
  }

  // Upload new file
  const fileName = `resume-${Date.now()}.pdf`;
  const { error: uploadError } = await supabaseAdmin.storage
    .from("resumes")
    .upload(fileName, file, { contentType: "application/pdf", upsert: true });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Get public URL
  const { data: urlData } = supabaseAdmin.storage
    .from("resumes")
    .getPublicUrl(fileName);

  // Update profile with resume URL
  const { error: updateError } = await supabaseAdmin
    .from("profile")
    .update({ resume_url: urlData.publicUrl, updated_at: new Date().toISOString() })
    .eq("id", profile.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ resume_url: urlData.publicUrl });
}

export async function DELETE(request: NextRequest) {
  const session = request.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabaseAdmin
    .from("profile")
    .select("id, resume_url")
    .limit(1)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "No profile found" }, { status: 404 });
  }

  // Delete file from storage
  if (profile.resume_url) {
    const path = profile.resume_url.split("/resumes/")[1];
    if (path) {
      await supabaseAdmin.storage.from("resumes").remove([path]);
    }
  }

  // Clear resume_url in profile
  const { error } = await supabaseAdmin
    .from("profile")
    .update({ resume_url: null, updated_at: new Date().toISOString() })
    .eq("id", profile.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
