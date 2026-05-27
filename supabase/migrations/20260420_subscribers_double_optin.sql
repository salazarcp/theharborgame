-- Double opt-in for newsletter subscribers.
-- Run this in Supabase SQL editor (Database → SQL Editor → New query → paste → Run).

alter table subscribers
  add column if not exists confirmed boolean not null default false,
  add column if not exists confirmation_token uuid unique,
  add column if not exists confirmed_at timestamptz;

-- Grandfather existing subscribers: they predate double opt-in, so treat them as confirmed.
update subscribers
set confirmed = true,
    confirmed_at = coalesce(confirmed_at, created_at)
where confirmed = false
  and confirmation_token is null;

create index if not exists subscribers_confirmation_token_idx
  on subscribers (confirmation_token)
  where confirmation_token is not null;
