# Hub — build roadmap

## Design

- [x] Theme: blurred-blob background (v1) + glass top bar & slogan bubble (v2) + card/progress layout (v3)
- [x] Multiple themes: light (Frost) + dark (Chalk), switchable in top bar and Profile, persisted

## Backend (Lovable Cloud)

- [x] Schema: profiles, friendships, blocks, groups, group_members, tasks, notes, reports, notifications
- [x] RLS on every table + GRANTs
- [x] Triggers: last_activity_at bump on task/note change; notification rows
- [x] SQL functions: friend requests, create group from friends, block rules
- [x] Scheduled cleanup: daily 03:15 UTC job hard-deletes groups inactive > 30 days OR > 14 days past deadline
- [x] Google sign-in

## Screens

- [x] Auth + onboarding (display name, school)
- [x] Groups home (active = last_activity_at within 30 days and not 14+ days past deadline) + create group (friends only)
- [x] Group detail: info, members, tasks (assign/deadline/complete), notes, leave
- [x] Friends: search, list, requests, unfriend, block/unblock
- [x] Notifications list (realtime + derived deadline alerts, mark read)
- [x] Profile: edit, theme, export data, delete account, sign out, replay tour
- [x] Calendar tab: month grid of project deadlines + task due dates, day detail, coming up
- [x] Calendar filters: everything/projects/tasks, per-project chips, hide finished
- [x] Drag (or tap-to-move on phones) a deadline to a new day; moving a project shifts all its dated tasks by the same offset (rescheduleProject)
- [x] Guided tour (src/components/hub/TourGuide.tsx) — first visit + replay from Profile
      NOTE: when a new screen/feature ships, add a TOUR_STEPS entry + data-tour anchor and bump TOUR_VERSION

## Responsive

- [x] <768px bottom tabs, single column, bottom sheets
- [x] >=768px left sidebar, group grid, two-column group detail, centered dialogs

## Open

- [ ] End-to-end check of signed-in flows — needs a first Google sign-in in the preview (no accounts exist yet)
- [x] Help system: lifebuoy button in the top bar (quick tips + "Take the tour") and a "?" hint
      next to Groups, Calendar, Project progress, Friends, Alerts, Tasks and Notes headings
      (src/components/hub/HelpHint.tsx)
- [x] Tour improvements: 8 steps with per-step Tip box, progress bar, keyboard arrows/Esc,
      auto scroll-to-target, step for calendar filters and the help button (TOUR_VERSION 4)
