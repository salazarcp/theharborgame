// Supabase Edge Function — newsletter subscription with double opt-in.
// Runtime: Deno.
//
// Flow:
//   1. Client posts { email } to this function.
//   2. Function upserts subscriber with confirmed=false and a fresh UUID token.
//   3. Function sends a confirmation email containing a link to /confirm?token=...
//   4. User clicks link → confirm-subscription function flips confirmed=true.
//
// Required function secrets (set in Supabase dashboard → Edge Functions → Secrets):
//   RESEND_API_KEY     — Resend API key
//   NEWSLETTER_FROM    — verified sender, e.g. "Castilva Games <news@castilva.com>"
//   SITE_URL           — public site base URL, e.g. https://castilva.com
//
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically by the platform.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const NEWSLETTER_FROM = Deno.env.get('NEWSLETTER_FROM') ?? '';
const SITE_URL = (Deno.env.get('SITE_URL') ?? '').replace(/\/$/, '');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const buildEmail = (confirmUrl: string) => ({
  subject: 'Confirm your Castilva Games subscription',
  html: `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1a1410;">
      <h2 style="margin: 0 0 16px; color: #c2410c;">Confirm your subscription</h2>
      <p style="margin: 0 0 16px; line-height: 1.6;">
        Thanks for signing up for Castilva Games updates. Tap the button below to confirm your email
        and we'll keep you posted on news from the wasteland.
      </p>
      <p style="margin: 24px 0;">
        <a href="${escapeHtml(confirmUrl)}"
           style="display: inline-block; padding: 12px 22px; background: #ea580c; color: #fff7ed; text-decoration: none; border-radius: 8px; font-weight: 600;">
          Confirm subscription
        </a>
      </p>
      <p style="margin: 0 0 8px; font-size: 13px; color: #6b7280;">Or paste this link into your browser:</p>
      <p style="margin: 0 0 24px; font-size: 13px; word-break: break-all;">
        <a href="${escapeHtml(confirmUrl)}" style="color: #c2410c;">${escapeHtml(confirmUrl)}</a>
      </p>
      <p style="margin: 0; font-size: 12px; color: #9ca3af;">
        If you didn't sign up, you can safely ignore this email. The address won't receive any messages
        unless you confirm.
      </p>
    </div>
  `,
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  if (!RESEND_API_KEY || !NEWSLETTER_FROM || !SITE_URL || !SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return jsonResponse({ error: 'Server is missing required configuration' }, 500);
  }

  let payload: { email?: string };
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const email = (payload.email ?? '').toString().trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return jsonResponse({ error: 'Invalid email' }, 400);
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: existing, error: selectError } = await admin
    .from('subscribers')
    .select('id, confirmed')
    .eq('email', email)
    .maybeSingle();

  if (selectError) {
    console.error('Select error:', selectError);
    return jsonResponse({ error: 'Database error' }, 500);
  }

  if (existing?.confirmed) {
    return jsonResponse({ status: 'already_confirmed' });
  }

  const token = crypto.randomUUID();

  if (existing) {
    const { error: updateError } = await admin
      .from('subscribers')
      .update({ confirmation_token: token, confirmed: false })
      .eq('id', existing.id);
    if (updateError) {
      console.error('Update error:', updateError);
      return jsonResponse({ error: 'Database error' }, 500);
    }
  } else {
    const { error: insertError } = await admin
      .from('subscribers')
      .insert({ email, confirmation_token: token, confirmed: false });
    if (insertError) {
      console.error('Insert error:', insertError);
      return jsonResponse({ error: 'Database error' }, 500);
    }
  }

  const confirmUrl = `${SITE_URL}/confirm.html?token=${encodeURIComponent(token)}`;
  const { subject, html } = buildEmail(confirmUrl);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: NEWSLETTER_FROM,
      to: email,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error('Resend error:', res.status, errorBody);
    return jsonResponse({ error: 'Failed to send confirmation email' }, 502);
  }

  return jsonResponse({ status: existing ? 'resent' : 'sent' });
});
