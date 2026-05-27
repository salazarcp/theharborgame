// Supabase Edge Function — send contact form notification to site owner.
// Runtime: Deno.
//
// Required function secrets (set in Supabase dashboard):
//   RESEND_API_KEY  — Resend API key
//   NOTIFY_TO       — recipient address, e.g. info@castilva.com
//   NOTIFY_FROM     — verified sender, e.g. "Castilva Games <news@castilva.com>"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const NOTIFY_TO = Deno.env.get('NOTIFY_TO') ?? '';
const NOTIFY_FROM = Deno.env.get('NOTIFY_FROM') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  if (!RESEND_API_KEY || !NOTIFY_TO || !NOTIFY_FROM) {
    return jsonResponse({ error: 'Server is missing required configuration' }, 500);
  }

  let payload: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    website?: string;
    openedAt?: number;
  };
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const name = (payload.name ?? '').toString().trim();
  const email = (payload.email ?? '').toString().trim();
  const subject = (payload.subject ?? '').toString().trim();
  const message = (payload.message ?? '').toString().trim();
  const website = (payload.website ?? '').toString().trim();
  const openedAt = Number(payload.openedAt ?? 0);

  // Spam heuristics — return 200 so bots don't learn what tripped them,
  // but don't actually send the email.
  if (website !== '') {
    return jsonResponse({ ok: true });
  }
  if (openedAt > 0 && Date.now() - openedAt < 1500) {
    return jsonResponse({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    return jsonResponse({ error: 'Missing required fields' }, 400);
  }

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1a1410;">
      <h2 style="margin: 0 0 16px; color: #c2410c;">New contact message</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr>
          <td style="padding: 6px 0; color: #6b7280; width: 90px;">From</td>
          <td style="padding: 6px 0;"><strong>${escapeHtml(name)}</strong></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Email</td>
          <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Subject</td>
          <td style="padding: 6px 0;">${escapeHtml(subject)}</td>
        </tr>
      </table>
      <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.5;">${escapeHtml(message)}</p>
      </div>
      <p style="margin: 24px 0 0; font-size: 12px; color: #9ca3af;">
        Sent from castilva.com contact form
      </p>
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      reply_to: email,
      subject: `[Contact] ${subject}`,
      html,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error('Resend error:', res.status, errorBody);
    return jsonResponse({ error: 'Failed to send notification' }, 502);
  }

  return jsonResponse({ ok: true });
});
