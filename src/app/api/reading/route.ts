import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { FALLBACK_READING } from "@/lib/data";

export const revalidate = 3600;

export async function GET() {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ items: FALLBACK_READING, source: "fallback" });
  }

  try {
    const { data, error } = await supabase
      .from("reading_list")
      .select("id, title, author, cover_url, progress_pct, takeaway")
      .order("updated_at", { ascending: false })
      .limit(3);

    if (error || !data || data.length === 0) {
      return NextResponse.json({ items: FALLBACK_READING, source: "fallback" });
    }

    return NextResponse.json({ items: data, source: "supabase" });
  } catch {
    // Third-party call was slow or failed — never let the page hang.
    return NextResponse.json({ items: FALLBACK_READING, source: "fallback" });
  }
}
