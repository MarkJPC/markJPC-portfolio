import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function GET(request: NextRequest) {
  const session = request.cookies.get("admin_session");
  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("contact_messages")
    .insert({ name, email, subject: subject || null, message });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Send email notification if Resend is configured
  if (resend && process.env.CONTACT_EMAIL) {
    try {
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL,
        subject: subject || `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
    } catch {
      // Email send failure shouldn't block the response
    }
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
