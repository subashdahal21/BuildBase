import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

interface User {
  id: string
  name: string
  role: string
  experience_level: string
  available: boolean
}

export async function GET() {
  const { data: users, error } = await supabase.from('users').select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const full = await Promise.all((users as User[]).map(async (u) => {
    const [skills, interests] = await Promise.all([
      supabase.from('user_skills').select('skill').eq('user_id', u.id),
      supabase.from('user_interests').select('interest').eq('user_id', u.id),
    ])

    return {
      id: u.id,
      name: u.name,
      role: u.role,
      experienceLevel: u.experience_level,
      available: u.available,
      skills: skills.data?.map(r => r.skill) ?? [],
      interests: interests.data?.map(r => r.interest) ?? [],
    }
  }))

  return NextResponse.json(full)
}