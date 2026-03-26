-- ============================================================
-- Card Flip App — Supabase Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. Scores table (public leaderboard, anonymous play)
create table if not exists card_scores (
  id            uuid primary key default gen_random_uuid(),
  player_name   text not null check (char_length(player_name) between 1 and 20),
  difficulty    text not null check (difficulty in ('4x4', '6x6')),
  moves         integer not null check (moves > 0),
  time_seconds  integer not null check (time_seconds > 0),
  created_at    timestamptz not null default now()
);

-- Index for leaderboard queries (difficulty + moves + time)
create index if not exists card_scores_leaderboard_idx
  on card_scores (difficulty, moves asc, time_seconds asc);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table card_scores enable row level security;

-- Anyone can read (public leaderboard)
create policy "card_scores_select_public"
  on card_scores for select
  using (true);

-- Anyone can insert (anonymous play, no auth required)
create policy "card_scores_insert_public"
  on card_scores for insert
  with check (
    char_length(player_name) between 1 and 20
    and difficulty in ('4x4', '6x6')
    and moves > 0
    and time_seconds > 0
  );
