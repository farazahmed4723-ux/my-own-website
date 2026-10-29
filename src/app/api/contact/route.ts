import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, description, budget, honeypot } = body;

    // 1. Anti-spam honeypot check
    if (honeypot) {
      return NextResponse.json(
        { success: false, error: "Spam detected." },
        { status: 400 }
      );
    }

    // 2. Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!service || typeof service !== "string") {
      return NextResponse.json(
        { success: false, error: "Please select a required service." },
        { status: 400 }
      );
    }

    if (!description || typeof description !== "string" || description.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please describe your project (minimum 10 characters)." },
        { status: 400 }
      );
    }

    const sanitizedData = {
      name: name.trim(),
      email: email.trim(),
      service: service.trim(),
      description: description.trim(),
      budget: budget ? String(budget).trim() : "Not specified",
      submittedAt: new Date().toISOString(),
    };

    console.log("=== [AI BY FARAZ] NEW PROJECT INQUIRY ===");
    console.log(JSON.stringify(sanitizedData, null, 2));

    // 3. Check for live email delivery credentials
    const hasLiveSmtp =
      Boolean(process.env.SMTP_HOST) &&
      Boolean(process.env.SMTP_USER) &&
      Boolean(process.env.SMTP_PASS);
    const hasResend = Boolean(process.env.RESEND_API_KEY);

    if (hasResend) {
      // Dispatches via Resend API
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
            subject: `[Project Inquiry] ${sanitizedData.name} - ${sanitizedData.service}`,
            text: `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\nService: ${sanitizedData.service}\nBudget: ${sanitizedData.budget}\n\nProject Description:\n${sanitizedData.description}`,
          }),
        });

        if (resendRes.ok) {
          return NextResponse.json({
            success: true,
            isLiveDelivery: true,
            message: "Thank you! Your project inquiry has been securely sent directly to Faraz Ahmed.",
          });
        }
      } catch (err) {
        console.error("Live email provider error:", err);
      }
    }

    // If live credentials are not configured, explicitly notify the user without fake claims
    return NextResponse.json({
      success: true,
      isLiveDelivery: false,
      message:
        "Your project inquiry has been recorded and logged securely! Note: Live email service credentials (RESEND_API_KEY or SMTP) are not yet configured in .env.local. You can also contact Faraz directly via WhatsApp at +1 (437) 434-8789 or email faraz.ahmed4724@gmail.com for immediate response.",
      data: sanitizedData,
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred. Please try again or reach out on WhatsApp." },
      { status: 500 }
    );
  }
}
