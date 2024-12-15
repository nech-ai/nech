insert into
  storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true);

create policy "Users can upload their own avatar" on storage.objects for insert
with
  check (
    bucket_id = 'avatars'
    and owner = auth.uid ()
  );

create policy "Everyone can view avatars" on storage.objects for
select
  using (true);

create policy "Users can update their own avatar" on storage.objects
for update
  using (
    bucket_id = 'avatars'
    and owner = auth.uid ()
  );
