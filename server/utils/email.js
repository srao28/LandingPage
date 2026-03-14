import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send an email.
 * @param {Object} options - { to, subject, text, html }
 */
export async function sendEmail({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    text: text || undefined,
    html: html || undefined,
  });
  return info;
}

/**
 * Send contact form notification (email).
 */
export async function sendContactNotification({ name, email, message }) {
  const notifyEmail = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
  if (!notifyEmail) return;

  await sendEmail({
    to: notifyEmail,
    subject: `New message from ${name}`,
    text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
  });
}
