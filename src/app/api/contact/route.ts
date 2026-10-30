import { NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIp,
  saveInquiryToSupabase,
} from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rate = checkRateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many requests. Please wait ${rate.retryAfterSec} seconds or message Faraz directly on WhatsApp.`,
        },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSec) },
        }
      );
    }

    const body = await request.json();
    const { name, email, phone, service, description, budget, honeypot } = body;

    // 1. Anti-spam honeypot check
    if (honeypot) {
      return NextResponse.json(
        { success: false, error: "Spam submission rejected." },
        { status: 400 }
      );
    }

    // 2. Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2 || name.trim().length > 120) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid full name (2–120 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim()) || email.trim().length > 160) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!service || typeof service !== "string" || service.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: "Please select a required service." },
        { status: 400 }
      );
    }

    if (
      !description ||
      typeof description !== "string" ||
      description.trim().length < 10 ||
      description.trim().length > 5000
    ) {
      return NextResponse.json(
        { success: false, error: "Please describe your project (10–5000 characters)." },
        { status: 400 }
      );
    }

    const cleanPhone =
      phone && typeof phone === "string" && phone.trim().length > 0
        ? phone.trim().slice(0, 40)
        : undefined;

    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      service: service.trim(),
      description: description.trim(),
      budget: budget ? String(budget).trim().slice(0, 80) : "Not specified",
    };

    // 3. Persist inquiry to Supabase Backend (PostgreSQL + Private Storage Vault)
    const supabaseResult = await saveInquiryToSupabase({
      ...sanitizedData,
      source: "website_contact_form",
      metadata: {
        userAgent: request.headers.get("user-agent") || "unknown",
        referer: request.headers.get("referer") || "",
      },
    });

    // 4. Optional live email notification via Resend
    let emailSent = false;
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || "AI by Faraz <onboarding@resend.dev>",
            to: process.env.EMAIL_TO || "faraz.ahmed4724@gmail.com",
            reply_to: sanitizedData.email,
            subject: `[${supabaseResult.referenceCode}] ${sanitizedData.name} — ${sanitizedData.service}`,
            text: [
              `Reference ID: ${supabaseResult.referenceCode}`,
              `Name: ${sanitizedData.name}`,
              `Email: ${sanitizedData.email}`,
              `Phone / WhatsApp: ${sanitizedData.phone || "Not provided"}`,
              `Service: ${sanitizedData.service}`,
              `Budget: ${sanitizedData.budget}`,
              ``,
              `Project Description:`,
              sanitizedData.description,
            ].join("\n"),
          }),
        });
        emailSent = resendRes.ok;
      } catch (err) {
        console.error("Optional email provider dispatch error:", err);
      }
    }

    if (supabaseResult.saved || emailSent) {
      return NextResponse.json({
        success: true,
        isLiveDelivery: true,
        referenceCode: supabaseResult.referenceCode,
        storage: {
          postgres: supabaseResult.storedInPostgres,
          vault: supabaseResult.storedInVault,
          email: emailSent,
        },
        message: `Thank you, ${sanitizedData.name}! Your inquiry (${supabaseResult.referenceCode}) has been securely saved to Faraz Ahmed's backend. Expect a personal reply within 24 hours.`,
      });
    }

    return NextResponse.json({
      success: true,
      isLiveDelivery: false,
      referenceCode: supabaseResult.referenceCode,
      message:
        "Your inquiry details were validated! For immediate priority assistance, please also message Faraz directly on WhatsApp at +1 (437) 434-8789 or email faraz.ahmed4724@gmail.com.",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred. Please try again or reach out directly on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
