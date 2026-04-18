-- Run this in your Supabase SQL Editor to set up the profiles table

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  username TEXT UNIQUE,
  role TEXT CHECK (role IN ('builder', 'investor')),
  location TEXT,
  bio TEXT,
  avatar_url TEXT,
  github TEXT,
  linkedin TEXT,
  website TEXT,
  company TEXT,
  title TEXT,
  ticket_size TEXT,
  portfolio_size TEXT,
  stage_preference JSONB DEFAULT '[]',
  skills JSONB DEFAULT '[]',
  interests JSONB DEFAULT '[]',
  goals JSONB DEFAULT '[]',
  sectors JSONB DEFAULT '[]',
  onboarding_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS for development (enable and add policies in production)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
