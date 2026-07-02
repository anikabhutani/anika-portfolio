-- Run this in the Supabase SQL editor (Project > SQL Editor > New query).

create table if not exists reading_list (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  cover_url text,
  progress_pct int not null default 0 check (progress_pct between 0 and 100),
  takeaway text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  ip text,
  created_at timestamptz not null default now()
);

-- Row Level Security: lock both tables down by default.
alter table reading_list enable row level security;
alter table contact_submissions enable row level security;

-- Public (anon) read-only access to the reading list, for the widget on the site.
create policy "Public can read reading list"
  on reading_list for select
  using (true);

-- No public policies on contact_submissions — only the service role key
-- (used server-side in /api/contact) can read or write it.

-- Seed a couple of rows so the widget has something to show immediately.
insert into reading_list (title, author, progress_pct, takeaway)
values
  ('Designing Data-Intensive Applications', 'Martin Kleppmann', 40,
   'Replication and partitioning trade-offs are the same trade-off wearing different clothes.'),
  ('The Alignment Problem', 'Brian Christian', 15,
   'Reward specification is a design problem long before it is a technical one.')
on conflict do nothing;
