import nodemailer from 'nodemailer';

// Create reusable transporter using Gmail SMTP
function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn('[Email] GMAIL_USER or GMAIL_APP_PASSWORD not configured — emails disabled');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

export async function sendWaitlistEmail(name: string, email: string): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) return false;

  const greeting = name || 'there';
  const year = new Date().getFullYear();

  try {
    await transporter.sendMail({
      from: `"FORA" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Welcome to FORA! You're on the waitlist",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <div style="text-align:center;padding:12px 0;">
            <h1 style="margin:0;">FORA</h1>
          </div>
          <div style="background:#f6f6f6;border-radius:12px;padding:24px;">
            <h2 style="margin-top:0;">Hey ${greeting} 👋</h2>
            <p>Thanks for joining the waitlist. We'll email you when early access opens!</p>
          </div>
          <p style="color:#999;font-size:12px;text-align:center;margin-top:16px;">
            &copy; ${year} FORA
          </p>
        </div>
      `,
    });
    console.log(`[Email] Waitlist confirmation sent to ${email}`);
    return true;
  } catch (error: any) {
    console.error(`[Email] Failed to send waitlist email to ${email}:`, error.message);
    return false;
  }
}

export async function sendContactEmail(name: string, email: string): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) return false;

  const greeting = name ? `, ${name}` : '';
  const year = new Date().getFullYear();

  try {
    await transporter.sendMail({
      from: `"FORA" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'We got your message - FORA',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <div style="text-align:center;padding:12px 0;">
            <h1 style="margin:0;">FORA</h1>
          </div>
          <div style="background:#f6f6f6;border-radius:12px;padding:24px;">
            <h2 style="margin-top:0;">Thanks for reaching out${greeting}.</h2>
            <p>We received your message and will respond soon!</p>
          </div>
          <p style="color:#999;font-size:12px;text-align:center;margin-top:16px;">
            &copy; ${year} FORA
          </p>
        </div>
      `,
    });
    console.log(`[Email] Contact confirmation sent to ${email}`);
    return true;
  } catch (error: any) {
    console.error(`[Email] Failed to send contact email to ${email}:`, error.message);
    return false;
  }
}
