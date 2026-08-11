import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET User Chart Settings
export async function GET(req: Request) {
  try {
    const { data: authData } = await supabase.auth.getUser();
    const userId = authData?.user?.id;

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("user_chart_settings")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      settings: data || {
        symbol: "OANDA:XAUUSD",
        interval: "5",
        favorite_tools: [],
        favorite_indicators: [],
        chart_layout: {},
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST / Save User Chart Settings
export async function POST(req: Request) {
  try {
    const { data: authData } = await supabase.auth.getUser();
    const userId = authData?.user?.id;

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { symbol, interval, favorite_tools, favorite_indicators, chart_layout } = body;

    const { data, error } = await supabase
      .from("user_chart_settings")
      .upsert({
        user_id: userId,
        symbol: symbol || "OANDA:XAUUSD",
        interval: interval || "5",
        favorite_tools: favorite_tools || [],
        favorite_indicators: favorite_indicators || [],
        chart_layout: chart_layout || {},
        updated_at: new Date().toISOString(),
      });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, settings: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
