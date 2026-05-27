// Supabase Edge Function — confirm a newsletter subscription via token.
// Runtime: Deno.
//
// Called by /confirm.html after the user clicks the link in their confirmation email.
// Verifies the UUID token, marks the subscriber confirmed, and clears the token.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return jsonResponse({ error: 'Server is missing required configuration' }, 500);
  }

  let payload: { token?: string };
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const token = (payload.token ?? '').toString().trim();
  if (!token || !UUID_RE.test(token)) {
    return jsonResponse({ status: 'invalid' }, 400);
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: row, error: selectError } = await admin
    .from('subscribers')
    .select('id, email, confirmed')
    .eq('confirmation_token', token)
    .maybeSingle();

  if (selectError) {
    console.error('Select error:', selectError);
    return jsonResponse({ error: 'Database error' }, 500);
  }

  if (!row) {
    // Token already consumed or never existed. Don't reveal which.
    return jsonResponse({ status: 'invalid' });
  }

  if (row.confirmed) {
    // Defensive — shouldn't happen because confirmed rows have token cleared.
    return jsonResponse({ status: 'already_confirmed', email: row.email });
  }

  const { error: updateError } = await admin
    .from('subscribers')
    .update({ confirmed: true, confirmation_token: null, confirmed_at: new Date().toISOString() })
    .eq('id', row.id);

  if (updateError) {
    console.error('Update error:', updateError);
    return jsonResponse({ error: 'Database error' }, 500);
  }

  return jsonResponse({ status: 'confirmed', email: row.email });
});
