-- Create enum for message types
create type message_type as ENUM('image', 'text');

-- create enum for role
create type role as ENUM('user', 'assistant', 'system', 'tool');

-- Create chats table
create table public.chats (
  id uuid primary key default gen_random_uuid (),
  team_id uuid not null references public.teams (id) on delete cascade,
  created_by_id uuid not null references public.users (id) on delete cascade,
  credential_id uuid not null references public.credentials (id) on delete cascade,
  role_id uuid references public.roles (id) on delete set null,
  title TEXT not null default 'New Chat',
  model TEXT not null,
  system_prompt TEXT,
  metadata jsonb default '{}'::jsonb,
  created_at TIMESTAMPTZ not null default now(),
  updated_at TIMESTAMPTZ not null default now()
);

-- Create messages table
create table public.messages (
  id uuid primary key default gen_random_uuid (),
  chat_id uuid not null references public.chats (id) on delete cascade,
  type message_type not null,
  content TEXT not null,
  role role not null,
  tokens_used INT,
  metadata jsonb default '{}'::jsonb, -- For tool calls, function details, etc
  parent_id uuid references public.messages (id), -- For threaded responses
  created_at TIMESTAMPTZ not null default now(),
  updated_at TIMESTAMPTZ not null default now()
);

-- Enable RLS
alter table public.chats enable row level security;

alter table public.messages enable row level security;

-- Chat policies
create policy "allow select for team members" on public.chats for
select
  using (public.is_member_of (auth.uid (), team_id));

create policy "allow insert for team members" on public.chats for insert
with
  check (
    public.is_member_of (auth.uid (), team_id)
    and created_by_id = auth.uid ()
  );

create policy "allow update for chat creator" on public.chats
for update
  using (created_by_id = auth.uid () or public.is_owner_of (auth.uid (), team_id));

create policy "allow delete for chat creator or team owner" on public.chats for delete using (
  created_by_id = auth.uid ()
  or public.is_owner_of (auth.uid (), team_id)
);

-- Message policies
create policy "allow select for chat members" on public.messages for
select
  using (
    exists (
      select
        1
      from
        public.chats
      where
        id = messages.chat_id
        and public.is_member_of (auth.uid (), team_id)
    )
  );

create policy "allow insert for chat members" on public.messages for insert
with
  check (
    exists (
      select
        1
      from
        public.chats
      where
        id = messages.chat_id
        and public.is_member_of (auth.uid (), team_id)
    )
  );

create policy "allow delete for chat members" on public.messages for delete using (
  exists (
    select
      1
    from
      public.chats
    where
      id = messages.chat_id
      and public.is_member_of (auth.uid (), team_id)
  )
);

-- Triggers for updated_at
create trigger chats_updated_at before
update on public.chats for each row
execute function update_updated_at ();

create trigger messages_updated_at before
update on public.messages for each row
execute function update_updated_at ();

-- Indexes
create index idx_chats_team on public.chats (team_id);

create index idx_chats_created_by on public.chats (created_by_id);

create index idx_chats_role on public.chats (role_id);

create index idx_messages_chat on public.messages (chat_id);

create index idx_messages_parent on public.messages (parent_id);

create index idx_messages_type on public.messages (type);
