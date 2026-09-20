-- Update policies: restrict what rows can be changed INTO, not just which rows.
drop policy if exists "respond to friend request" on public.friendships;
create policy "respond to friend request"
on public.friendships for update to authenticated
using (addressee_id = auth.uid() or requester_id = auth.uid())
with check (
  (addressee_id = auth.uid() or requester_id = auth.uid())
  and status in ('pending','accepted','declined')
);

drop policy if exists "members update group" on public.groups;
create policy "members update group"
on public.groups for update to authenticated
using (public.is_group_member(id, auth.uid()))
with check (public.is_group_member(id, auth.uid()));

drop policy if exists "tasks update for members" on public.tasks;
create policy "tasks update for members"
on public.tasks for update to authenticated
using (public.is_group_member(group_id, auth.uid()))
with check (public.is_group_member(group_id, auth.uid()));

drop policy if exists "notes update own" on public.notes;
create policy "notes update own"
on public.notes for update to authenticated
using (created_by = auth.uid())
with check (created_by = auth.uid() and public.is_group_member(group_id, auth.uid()));

drop policy if exists "own notifications update" on public.notifications;
create policy "own notifications update"
on public.notifications for update to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- Functions inherit EXECUTE from PUBLIC, so revoke there too.
revoke all on function public.add_group_creator() from public;
revoke all on function public.enforce_friend_request() from public;
revoke all on function public.handle_new_user() from public;
revoke all on function public.notify_friendship() from public;
revoke all on function public.notify_group_add() from public;
revoke all on function public.notify_task_assignment() from public;
revoke all on function public.touch_group_activity() from public;
revoke all on function public.cleanup_inactive_groups() from public;

revoke all on function public.are_friends(uuid, uuid) from public;
revoke all on function public.has_friend_link(uuid, uuid) from public;
revoke all on function public.is_blocked_between(uuid, uuid) from public;
revoke all on function public.is_group_member(uuid, uuid) from public;
revoke all on function public.shares_group(uuid, uuid) from public;
revoke all on function public.search_users(text) from public;
revoke all on function public.export_my_data() from public;
revoke all on function public.create_group_with_members(text, text, timestamptz, uuid[]) from public;

-- Grant back only what signed-in users genuinely need.
grant execute on function public.are_friends(uuid, uuid) to authenticated;
grant execute on function public.has_friend_link(uuid, uuid) to authenticated;
grant execute on function public.is_blocked_between(uuid, uuid) to authenticated;
grant execute on function public.is_group_member(uuid, uuid) to authenticated;
grant execute on function public.shares_group(uuid, uuid) to authenticated;
grant execute on function public.search_users(text) to authenticated;
grant execute on function public.export_my_data() to authenticated;
grant execute on function public.create_group_with_members(text, text, timestamptz, uuid[]) to authenticated;
grant execute on function public.cleanup_inactive_groups() to service_role;