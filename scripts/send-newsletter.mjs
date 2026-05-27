#!/usr/bin/env node
// Send a newsletter to every subscriber in Supabase via Resend.
//
// Usage:
//   node --env-file=.env scripts/send-newsletter.mjs "Your subject line" path/to/body.html
//
// The body file can be plain HTML. Plain text will also work.

import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const [, , subject, bodyPath] = process.argv;

if (!subject || !bodyPath) {
  console.error('Usage: node --env-file=.env scripts/send-newsletter.mjs "Subject" body.html');
  process.exit(1);
}

const {
  VITE_SUPABASE_URL: supabaseUrl,
  SUPABASE_SERVICE_ROLE_KEY: serviceKey,
  RESEND_API_KEY: resendKey,
  NEWSLETTER_FROM: fromAddress,
} = process.env;

for (const [name, value] of Object.entries({
  VITE_SUPABASE_URL: supabaseUrl,
  SUPABASE_SERVICE_ROLE_KEY: serviceKey,
  RESEND_API_KEY: resendKey,
  NEWSLETTER_FROM: fromAddress,
})) {
  if (!value) {
    console.error(`Missing env var: ${name}`);
    process.exit(1);
  }
}

const html = readFileSync(bodyPath, 'utf8');

const supabase = createClient(supabaseUrl, serviceKey);

const { data: subscribers, error } = await supabase
  .from('subscribers')
  .select('email')
  .eq('confirmed', true);

if (error) {
  console.error('Failed to load subscribers:', error);
  process.exit(1);
}

if (!subscribers?.length) {
  console.log('No subscribers yet.');
  process.exit(0);
}

console.log(`Sending "${subject}" to ${subscribers.length} subscriber(s)...`);

let sent = 0;
let failed = 0;

// Resend rate limit on the free tier is 2 requests/sec — throttle accordingly.
for (const { email } of subscribers) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: email,
      subject,
      html,
    }),
  });

  if (res.ok) {
    sent++;
    console.log(`  ok  ${email}`);
  } else {
    failed++;
    const body = await res.text();
    console.error(`  fail ${email} → ${res.status} ${body}`);
  }

  await new Promise((r) => setTimeout(r, 600));
}

console.log(`\nDone. Sent: ${sent}, Failed: ${failed}`);
