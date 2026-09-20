-- 1. Fix the broken block check when adding a member to a group.
drop policy if exists "members add friends" on public.group_members;

create policy "members add friends"
on public.group_members
for insert
to authenticated
with check (
  (
    user_id = auth.uid()
    and exists (
      select 1 from public.groups g
      where g.id = group_members.group_id and g.created_by = auth.uid()
    )
  )
  or (
    public.is_group_member(group_members.group_id, auth.uid())
    and public.are_friends(auth.uid(), group_members.user_id)
    and not exists (
      select 1 from public.group_members gm
      where gm.group_id = group_members.group_id
        and public.is_blocked_between(gm.user_id, group_members.user_id)
    )
  )
);

-- 2. Trigger-only functions must not be callable through the API at all.
revoke all on function public.add_group_creator() from anon, authenticated;
revoke all on function public.enforce_friend_request() from anon, authenticated;
revoke all on function public.handle_new_user() from anon, authenticated;
revoke all on function public.notify_friendship() from anon, authenticated;
revoke all on function public.notify_group_add() from anon, authenticated;
revoke all on function public.notify_task_assignment() from anon, authenticated;
revoke all on function public.touch_group_activity() from anon, authenticated;

-- 3. Signed-in-only helpers and RPCs: no anonymous access.
revoke all on function public.are_friends(uuid, uuid) from anon;
revoke all on function public.has_friend_link(uuid, uuid) from anon;
revoke all on function public.is_blocked_between(uuid, uuid) from anon;
revoke all on function public.is_group_member(uuid, uuid) from anon;
revoke all on function public.shares_group(uuid, uuid) from anon;
revoke all on function public.search_users(text) from anon;
revoke all on function public.export_my_data() from anon;
revoke all on function public.create_group_with_members(text, text, timestamptz, uuid[]) from anon;