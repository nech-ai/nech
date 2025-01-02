-- Create roles table
create table public.roles (
  id uuid primary key default gen_random_uuid (),
  team_id uuid not null references public.teams (id) on delete cascade,
  created_by_id uuid not null references public.users (id) on delete cascade,
  name TEXT not null,
  content TEXT not null,
  description TEXT,
  is_default BOOLEAN default false,
  metadata jsonb default '{}'::jsonb,
  created_at TIMESTAMPTZ not null default now(),
  updated_at TIMESTAMPTZ not null default now(),
  archived_at TIMESTAMPTZ,
  temperature NUMERIC(3, 2) check (
    temperature >= 0
    AND temperature <= 1
  ),
  constraint unique_role_name_per_team unique (team_id, name)
);

-- Enable RLS
alter table public.roles enable row level security;

-- Role policies
create policy "allow select for team members" on public.roles for
select
  using (public.is_member_of (auth.uid (), team_id));

create policy "allow insert for team members" on public.roles for insert
with
  check (
    public.is_member_of (auth.uid (), team_id)
    and created_by_id = auth.uid ()
  );

create policy "allow update for team members" on public.roles
for update
  using (public.is_member_of (auth.uid (), team_id));

create policy "allow delete for team owners" on public.roles for delete using (public.is_owner_of (auth.uid (), team_id));

-- Add updated_at trigger
create trigger roles_updated_at before
update on public.roles for each row
execute function update_updated_at ();

-- Create indexes
create index idx_roles_team on public.roles (team_id);

create index idx_roles_created_by on public.roles (created_by_id);
