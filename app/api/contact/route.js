import { Resend } from "resend";

const TO_EMAIL = "hello@thirdspacesmarketing.com";
// Until a domain is verified in Resend, use their shared onboarding sender.
// After verifying thirdspacesmarketing.com, set FROM_EMAIL in .env.local.
const FROM_EMAIL = process.env.FROM_EMAIL || "Third Spaces Leads <onboarding@resend.dev>";

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, phone, budget, message } = data || {};

  // Minimal validation — name, email and message are required.
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return Response.json(
      { error: "The form isn't configured yet. Please reach us on WhatsApp." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2>New lead from the website</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone) || "Not provided"}</p>
    <p><strong>Monthly budget:</strong> ${escapeHtml(budget) || "Not provided"}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New lead: ${name}${budget ? ` (${budget})` : ""}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Couldn't send your message. Try again." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return Response.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
