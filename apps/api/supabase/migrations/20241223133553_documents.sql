create type document_kind as ENUM('TEXT', 'CODE');

create table public.documents (
    id uuid primary key default gen_random_uuid (),
    team_id uuid not null references public.teams (id) on delete cascade,
    user_id uuid references public.users (id) on delete cascade,
    kind document_kind not null,
    content TEXT not null,
    created_at TIMESTAMPTZ not null default now(),
    updated_at TIMESTAMPTZ not null default now()
);

-- Enable RLS
alter table public.documents enable row level security;


-- Document policies
create policy "allow select for team members" on public.documents for
select
    using (public.is_member_of (auth.uid (), team_id));

create policy "allow insert for team members" on public.documents for insert
with
    check (public.is_member_of (auth.uid (), team_id));

create policy "allow update for team members" on public.documents for update
using (public.is_member_of (auth.uid (), team_id));

create policy "allow delete for team members" on public.documents for delete using (public.is_member_of (auth.uid (), team_id));


-- Triggers for updated_at
create trigger documents_updated_at before
update on public.documents for each row
execute function update_updated_at ();

-- Indexes
create index idx_documents_team on public.documents (team_id);

create index idx_documents_user on public.documents (user_id);

create index idx_documents_kind on public.documents (kind);
