import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];

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

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only PNG, JPG, SVG, and WebP files allowed" },
      { status: 400 },
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "png";
  const fileName = `logo-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from("logos")
    .upload(fileName, file, { contentType: file.type, upsert: true });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: urlData } = supabaseAdmin.storage
    .from("logos")
    .getPublicUrl(fileName);

  return NextResponse.json({ logo_url: urlData.publicUrl });
}

export async function DELETE(request: NextRequest) {
  const session = request.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { logo_url } = await request.json();

  if (!logo_url) {
    return NextResponse.json({ error: "No logo_url provided" }, { status: 400 });
  }

  const path = logo_url.split("/logos/")[1];
  if (path) {
    await supabaseAdmin.storage.from("logos").remove([path]);
  }

  return NextResponse.json({ success: true });
}
