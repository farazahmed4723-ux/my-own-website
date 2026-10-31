import { NextResponse } from "next/server";
import {
  checkRateLimit,
  createCustomerReviewInSupabase,
  fetchVerifiedReviewsFromSupabase,
  getClientIp,
} from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const { reviews, source } = await fetchVerifiedReviewsFromSupabase();
  const avg =
    reviews.length > 0
      ? Number(
          (
            reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) /
            reviews.length
          ).toFixed(1)
        )
      : 5.0;

  return NextResponse.json(
    {
      success: true,
      source,
      count: reviews.length,
      averageRating: avg,
      reviews,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`reviews:${ip}`, 3, 15 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many review submissions. Please try again in ${rate.retryAfterSec} seconds.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      clientName,
      role,
      company,
      companyUrl,
      projectType,
      rating,
      highlight,
      quote,
      honeypot,
    } = body;

    if (honeypot) {
      return NextResponse.json(
        { success: false, error: "Spam submission rejected." },
        { status: 400 }
      );
    }

    if (
      !clientName ||
      typeof clientName !== "string" ||
      clientName.trim().length < 2 ||
      clientName.trim().length > 80
    ) {
      return NextResponse.json(
        { success: false, error: "Please enter your name (2–80 characters)." },
        { status: 400 }
      );
    }

    if (
      !company ||
      typeof company !== "string" ||
      company.trim().length < 2 ||
      company.trim().length > 100
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your company or business name (2–100 characters).",
        },
        { status: 400 }
      );
    }

    if (
      !quote ||
      typeof quote !== "string" ||
      quote.trim().length < 15 ||
      quote.trim().length > 900
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please share your review experience (15–900 characters).",
        },
        { status: 400 }
      );
    }

    const parsedRating = Math.min(5, Math.max(1, Math.round(Number(rating) || 5)));

    let cleanUrl: string | undefined;
    if (companyUrl && typeof companyUrl === "string" && companyUrl.trim().length > 0) {
      const candidate = companyUrl.trim().startsWith("http")
        ? companyUrl.trim()
        : `https://${companyUrl.trim()}`;
      try {
        const u = new URL(candidate);
        if (u.protocol === "https:" || u.protocol === "http:") {
          cleanUrl = u.toString();
        }
      } catch {
        // Ignore malformed optional URL
      }
    }

    const result = await createCustomerReviewInSupabase({
      clientName: clientName.trim(),
      role:
        role && typeof role === "string" && role.trim().length >= 2
          ? role.trim().slice(0, 80)
          : "Verified Client",
      company: company.trim(),
      companyUrl: cleanUrl,
      projectType:
        projectType && typeof projectType === "string" && projectType.trim().length > 0
          ? projectType.trim().slice(0, 80)
          : "Web & AI Engineering",
      rating: parsedRating,
      highlight:
        highlight && typeof highlight === "string" ? highlight.trim().slice(0, 95) : undefined,
      quote: quote.trim(),
    });

    return NextResponse.json({
      success: true,
      saved: result.saved,
      storage: {
        postgres: result.storedInPostgres,
        vault: result.storedInVault,
      },
      review: result.review,
      message: `Thank you, ${clientName.trim()}! Your ${parsedRating}-star review is now live on AI by Faraz.`,
    });
  } catch (error) {
    console.error("Review Submission Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to publish review right now. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
