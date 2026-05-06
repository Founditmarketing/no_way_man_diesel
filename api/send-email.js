import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, truckYear, makeModel, engineType, message, service } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  // Build clean HTML table from submitted fields
  const fields = [
    email      && `<tr><td style="padding:8px 16px 8px 0;color:#999;font-weight:bold;white-space:nowrap;">Email</td><td style="padding:8px 0;">${email}</td></tr>`,
    phone      && `<tr><td style="padding:8px 16px 8px 0;color:#999;font-weight:bold;white-space:nowrap;">Phone</td><td style="padding:8px 0;">${phone}</td></tr>`,
    service    && `<tr><td style="padding:8px 16px 8px 0;color:#999;font-weight:bold;white-space:nowrap;">Service</td><td style="padding:8px 0;">${service}</td></tr>`,
    truckYear  && `<tr><td style="padding:8px 16px 8px 0;color:#999;font-weight:bold;white-space:nowrap;">Truck Year</td><td style="padding:8px 0;">${truckYear}</td></tr>`,
    makeModel  && `<tr><td style="padding:8px 16px 8px 0;color:#999;font-weight:bold;white-space:nowrap;">Make / Model</td><td style="padding:8px 0;">${makeModel}</td></tr>`,
    engineType && `<tr><td style="padding:8px 16px 8px 0;color:#999;font-weight:bold;white-space:nowrap;">Engine Type</td><td style="padding:8px 0;">${engineType}</td></tr>`,
    message    && `<tr><td style="padding:8px 16px 8px 0;color:#999;font-weight:bold;white-space:nowrap;vertical-align:top;">Message</td><td style="padding:8px 0;white-space:pre-wrap;">${message}</td></tr>`,
  ].filter(Boolean).join('\n');

  const html = `
    <div style="font-family:sans-serif;max-width:620px;margin:auto;background:#111;color:#f0f0f0;border-radius:8px;overflow:hidden;">
      <div style="background:#c0392b;padding:20px 28px;">
        <h1 style="margin:0;font-size:20px;color:#fff;letter-spacing:3px;font-style:italic;">NO WAY MAN DIESEL — New Inquiry</h1>
      </div>
      <div style="padding:28px;">
        <h2 style="color:#c0392b;margin:0 0 20px;font-size:18px;font-style:italic;">From: ${name}</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${fields}
        </table>
        <hr style="border:none;border-top:1px solid #333;margin:24px 0;" />
        <p style="margin:0;font-size:11px;color:#555;">Submitted via nowaymandiesel.com contact form.</p>
      </div>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: 'No Way Man Diesel <hello@nowaymandiesel.com>',
      to: ['Sales@nowaymandiesel.com'],
      reply_to: email,
      subject: `New Inquiry from ${name} — No Way Man Diesel`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email.' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
}
