import nodemailer from "nodemailer";

export async function sendLeadEmail(lead) {
  if (!process.env.SMTP_HOST) return; // skip if not configured
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });

  const html = `
    <h2>New Booking Inquiry</h2>
    <p><strong>Name:</strong> ${lead.firstName} ${lead.lastName}</p>
    <p><strong>Contact:</strong> ${lead.email} | ${lead.phone}</p>
    <p><strong>Event:</strong> ${new Date(lead.event_date).toDateString()} ${lead.event_time}</p>
    <p><strong>Guests:</strong> ${lead.guests}</p>
    <p><strong>Address:</strong> ${lead.address?.street}, ${lead.address?.city}, ${lead.address?.state} ${lead.address?.zip}</p>
    <p><strong>Notes:</strong> ${lead.notes || "-"}</p>
  `;

  await transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: process.env.MAIL_TO || process.env.SMTP_USER,
    subject: "New Booking Inquiry",
    html
  });
}
