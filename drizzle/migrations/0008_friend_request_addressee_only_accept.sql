drop policy if exists "respond to friend request" on public.friendships;

create policy "respond to friend request" on public.friendships
for update to authenticated
using (addressee_id = auth.uid() or requester_id = auth.uid())
with check (
  (addressee_id = auth.uid() and status in ('accepted','declined'))
  or (requester_id = auth.uid() and status = 'pending')
);