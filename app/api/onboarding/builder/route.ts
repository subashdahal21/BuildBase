import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(req: Request) {
  const { userId, data } = await req.json()

  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })

  const { error } = await supabase.from('profiles').upsert({
    id: userId,
    full_name: data.fullName,
    username: data.username,
    role: 'builder',
    location: data.location,
    bio: data.bio,
    avatar_url: data.avatar,
    github: data.github,
    linkedin: data.linkedin,
    skills: data.skills,
    interests: data.interests,
    goals: data.goals,
    onboarding_complete: true,
    updated_at: new Date().toISOString(),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
