-- Create provider enum
create type provider as ENUM(
  'OPENAI',
  'ANTHROPIC',
  'GOOGLE',
  'AZURE',
  'XAI',
  'GROQ',
  'MISTRAL'
);

create type credential_type as ENUM('API_KEY', 'URL');

-- Create credentials table
create table public.credentials (
  id uuid primary key default gen_random_uuid (),
  team_id uuid not null references public.teams (id) on delete cascade,
  created_by_id uuid not null references public.users (id) on delete cascade,
  name TEXT not null,
  provider provider not null,
  type credential_type not null,
  value TEXT not null,
  masked_value TEXT generated always as (
    substring(value, 1, 4) || '********' || right(value, 2)
  ) stored,
  is_default BOOLEAN default false,
  default_model TEXT,
  default_temperature NUMERIC,
  metadata jsonb default '{}'::jsonb,
  created_at TIMESTAMPTZ not null default now(),
  updated_at TIMESTAMPTZ not null default now(),
  last_used_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ
);

-- Enable RLS
alter table public.credentials enable row level security;

-- Credential policies
create policy "allow select for team members" on public.credentials using (public.is_member_of (auth.uid (), team_id));

create policy "allow insert for team owners" on public.credentials for insert
with
  check (
    public.is_owner_of (auth.uid (), team_id)
    and created_by_id = auth.uid ()
  );

create policy "allow update for team owners" on public.credentials
for update
  using (public.is_owner_of (auth.uid (), team_id));

create policy "allow delete for team owners" on public.credentials for delete using (public.is_owner_of (auth.uid (), team_id));
