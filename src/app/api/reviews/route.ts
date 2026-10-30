import { NextResponse } from "next/server";
import { fetchVerifiedReviewsFromSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const { reviews, source } = await fetchVerifiedReviewsFromSupabase();

  return NextResponse.json(
    {
      success: true,
      source,
      count: reviews.length,
      averageRating: 5.0,
      reviews,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}

