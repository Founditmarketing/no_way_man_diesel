import 'dotenv/config';
import express from 'express';
import { Resend } from 'resend';

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, truckYear, makeModel, engineType, message, service } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  // Build a clean HTML body from whatever fields were submitted
  const fields = [
    email       && `<tr><td><strong>Email</strong></td><td>${email}</td></tr>`,
    phone       && `<tr><td><strong>Phone</strong></td><td>${phone}</td></tr>`,
    service     && `<tr><td><strong>Service</strong></td><td>${service}</td></tr>`,
    truckYear   && `<tr><td><strong>Truck Year</strong></td><td>${truckYear}</td></tr>`,
    makeModel   && `<tr><td><strong>Make / Model</strong></td><td>${makeModel}</td></tr>`,
    engineType  && `<tr><td><strong>Engine Type</strong></td><td>${engineType}</td></tr>`,
    message     && `<tr><td><strong>Message / Symptoms</strong></td><td style="white-space:pre-wrap">${message}</td></tr>`,
  ].filter(Boolean).join('\n');

  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#1a1a1a;color:#f0f0f0;padding:32px;border-radius:8px;">
      <div style="background:#c0392b;padding:16px 24px;margin-bottom:24px;">
        <h1 style="margin:0;font-size:22px;color:#fff;font-style:italic;letter-spacing:2px;">NO WAY MAN DIESEL — New Inquiry</h1>
      </div>
      <h2 style="color:#c0392b;margin-bottom:4px;">From: ${name}</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        ${fields}
      </table>
      <p style="margin-top:32px;font-size:11px;color:#666;">This message was submitted via the No Way Man Diesel website contact form.</p>
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
      return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ API server running on http://localhost:${PORT}`);
});
