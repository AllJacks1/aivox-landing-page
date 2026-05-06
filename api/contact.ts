import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body: {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
    service?: string;
    message?: string;
  };

  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const { name, email, company, phone, service, message } = body;

  // Basic validation
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Missing required fields: name, email, message" });
  }

  const serviceLabelMap: Record<string, string> = {
    starter: "Starter Website",
    growth: "Growth Package",
    advanced: "Advanced / Enterprise",
    custom: "Custom Project",
    other: "Not sure yet",
  };

  const serviceLabel = service
    ? serviceLabelMap[service] || service
    : "Not specified";

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1️⃣ Internal notification email to AivoxTech
    await transporter.sendMail({
      from: `"AivoxTech Lead" <${process.env.EMAIL_USER}>`,
      to: "aivoxtech@astragroupph.com",
      subject: `New Consultation: ${serviceLabel} — ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: Inter, system-ui, sans-serif; background:#f8fafc; padding:40px 0;">
          <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.08); border:1px solid #e2e8f0;">
            
            <!-- Header -->
            <div style="background:linear-gradient(135deg,#10381A,#22C55E); padding:28px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:800; letter-spacing:-0.02em;">AIVOX<span style="color:#4ade80;">TECH</span></h1>
              <p style="color:rgba(255,255,255,0.85); margin:8px 0 0; font-size:13px; font-weight:500;">New Consultation Request</p>
            </div>

            <!-- Body -->
            <div style="padding:28px; color:#0f172a;">
              <h2 style="margin:0 0 20px; font-size:16px; font-weight:700; color:#0f172a; text-transform:uppercase; letter-spacing:0.05em;">Lead Details</h2>
              
              <table style="width:100%; border-collapse:collapse; font-size:14px;">
                <tr>
                  <td style="padding:10px 0; color:#64748b; width:140px; font-weight:600;">Full Name</td>
                  <td style="padding:10px 0; color:#0f172a; font-weight:500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0; color:#64748b; font-weight:600;">Email</td>
                  <td style="padding:10px 0; color:#0f172a; font-weight:500;">
                    <a href="mailto:${email}" style="color:#22C55E; text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; color:#64748b; font-weight:600;">Company</td>
                  <td style="padding:10px 0; color:#0f172a; font-weight:500;">${company || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0; color:#64748b; font-weight:600;">Phone</td>
                  <td style="padding:10px 0; color:#0f172a; font-weight:500;">${phone || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0; color:#64748b; font-weight:600;">Service</td>
                  <td style="padding:10px 0;">
                    <span style="background:#22C55E; color:#ffffff; padding:4px 12px; border-radius:999px; font-size:12px; font-weight:700;">${serviceLabel}</span>
                  </td>
                </tr>
              </table>

              ${
                message
                  ? `
              <hr style="border:none; border-top:1px solid #e2e8f0; margin:24px 0;" />
              <p style="margin:0 0 10px; font-size:12px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Project Details</p>
              <div style="background:#f8fafc; padding:16px; border-radius:12px; border-left:4px solid #22C55E;">
                <p style="margin:0; font-size:14px; color:#0f172a; line-height:1.7; white-space:pre-wrap;">${message}</p>
              </div>
              `
                  : ""
              }
            </div>

            <!-- Footer -->
            <div style="background:#f1f5f9; padding:16px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#94a3b8;">Received on ${new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" })}</p>
            </div>
          </div>
        </div>
      `,
    });

    // 2️⃣ Confirmation email to the lead
    const confirmationHtml = `
      <div style="font-family: Inter, system-ui, sans-serif; background:#f8fafc; padding:40px 0;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.08); border:1px solid #e2e8f0;">

          <!-- Header -->
          <div style="background:linear-gradient(135deg,#10381A,#22C55E); padding:28px; text-align:center;">
            <h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:800; letter-spacing:-0.02em;">AIVOX<span style="color:#4ade80;">TECH</span></h1>
            <p style="color:rgba(255,255,255,0.85); margin:8px 0 0; font-size:13px; font-weight:500;">We received your consultation request</p>
          </div>

          <!-- Body -->
          <div style="padding:28px; color:#0f172a;">
            <h2 style="margin:0 0 12px; font-size:18px; font-weight:700; color:#0f172a;">Thank you, ${name} 👋</h2>
            <p style="margin:0 0 20px; color:#475569; font-size:14px; line-height:1.7;">
              We've successfully received your request${service ? ` for a <b>${serviceLabel}</b>` : ""}. Our team will review your project details and get back to you within <b>24 hours</b> to schedule your free consultation.
            </p>

            ${
              service
                ? `
            <!-- Service Card -->
            <div style="background:#f8fafc; border-left:4px solid #22C55E; padding:14px 16px; border-radius:8px; margin-bottom:20px;">
              <p style="margin:0; font-size:12px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Service Interested In</p>
              <p style="margin:6px 0 0; font-weight:700; color:#0f172a; font-size:15px;">${serviceLabel}</p>
            </div>
            `
                : ""
            }

            ${
              message
                ? `
            <!-- Message Box -->
            <div style="background:#ffffff; border:1px solid #e2e8f0; padding:16px; border-radius:12px; margin-bottom:20px;">
              <p style="margin:0 0 10px; font-size:12px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.05em;">Your Message</p>
              <p style="margin:0; font-size:14px; color:#0f172a; line-height:1.7; white-space:pre-wrap;">${message}</p>
            </div>
            `
                : ""
            }

            <hr style="border:none; border-top:1px solid #e2e8f0; margin:24px 0;" />

            <p style="margin:0; font-size:13px; color:#64748b; line-height:1.6;">
              If you have any urgent questions, feel free to reply to this email or call us at <a href="tel:+63XXXXXXXXXX" style="color:#22C55E; text-decoration:none; font-weight:600;">+63 XXX XXX XXXX</a>.
            </p>

            <p style="margin:16px 0 0; font-size:13px; font-weight:700; color:#10381A;">
              — The AivoxTech Team
            </p>
          </div>

          <!-- Footer -->
          <div style="background:#10381A; padding:20px; text-align:center;">
            <p style="margin:0 0 4px; font-size:12px; color:rgba(255,255,255,0.6);">
              Affordable IT & SaaS solutions for startups and SMEs
            </p>
            <p style="margin:0; font-size:11px; color:rgba(255,255,255,0.4);">
              © ${new Date().getFullYear()} AivoxTech Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"AivoxTech Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your consultation request — AivoxTech",
      html: confirmationHtml,
    });

    return res.status(200).json({
      success: true,
      message: "Consultation request submitted successfully",
    });
  } catch (err) {
    console.error("Contact form submission error:", err);

    return res.status(500).json({
      error: "Failed to process your request. Please try again later.",
    });
  }
}
