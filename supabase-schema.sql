-- Osho Audio App: Supabase Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Discourses table (synced from Osho World)
CREATE TABLE discourses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  series TEXT NOT NULL,
  series_slug TEXT,
  track_number INTEGER,
  duration TEXT,
  duration_seconds INTEGER DEFAULT 0,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  mood TEXT[] DEFAULT '{}',
  thumbnail TEXT,
  audio_url TEXT,
  date TEXT,
  language TEXT DEFAULT 'english',
  description TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  listen_count INTEGER DEFAULT 0,
  speaker TEXT DEFAULT 'Osho',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User favorites
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  discourse_id TEXT NOT NULL REFERENCES discourses(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, discourse_id)
);

-- Listening history
CREATE TABLE listening_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  discourse_id TEXT NOT NULL REFERENCES discourses(id) ON DELETE CASCADE,
  progress_seconds INTEGER DEFAULT 0,
  duration_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  listened_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, discourse_id)
);

-- Bookmarks (saved timestamps with notes)
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  discourse_id TEXT NOT NULL REFERENCES discourses(id) ON DELETE CASCADE,
  timestamp_seconds INTEGER NOT NULL,
  note TEXT DEFAULT '',
  label TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Playlists (user-created)
CREATE TABLE playlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Playlist items
CREATE TABLE playlist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  playlist_id UUID NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  discourse_id TEXT NOT NULL REFERENCES discourses(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(playlist_id, discourse_id)
);

-- Row Level Security
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE discourses ENABLE ROW LEVEL SECURITY;

-- RLS policies: users can only see their own data
CREATE POLICY "Users can view own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites" ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON favorites FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own history" ON listening_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own history" ON listening_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own history" ON listening_history FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own bookmarks" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bookmarks" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own bookmarks" ON bookmarks FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own playlists" ON playlists FOR SELECT USING (auth.uid() = user_id OR is_public = TRUE);
CREATE POLICY "Users can insert own playlists" ON playlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own playlists" ON playlists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own playlists" ON playlists FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view playlist items" ON playlist_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM playlists WHERE id = playlist_items.playlist_id AND (user_id = auth.uid() OR is_public = TRUE))
);
CREATE POLICY "Users can manage own playlist items" ON playlist_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM playlists WHERE id = playlist_items.playlist_id AND user_id = auth.uid())
);
CREATE POLICY "Users can delete own playlist items" ON playlist_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM playlists WHERE id = playlist_items.playlist_id AND user_id = auth.uid())
);

-- Discourses are public
CREATE POLICY "Discourses are public" ON discourses FOR SELECT USING (TRUE);

-- Indexes
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_history_user ON listening_history(user_id);
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_discourse ON bookmarks(discourse_id);
CREATE INDEX idx_playlists_user ON playlists(user_id);
CREATE INDEX idx_playlist_items_playlist ON playlist_items(playlist_id);
CREATE INDEX idx_discourses_category ON discourses(category);
CREATE INDEX idx_discourses_language ON discourses(language);
CREATE INDEX idx_discourses_series ON discourses(series);
