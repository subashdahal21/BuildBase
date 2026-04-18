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

interface MatchedUser {
  id: string
  name: string
  role: string
  skills: string[]
  interests: string[]
  score: number
  roleMatch: boolean
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      founderId,
      projectId,
      requiredRoles = [],
      requiredSkills = []
    } = body

    if (!projectId) {
      return NextResponse.json({ error: 'projectId is required' }, { status: 400 })
    }

    const normalizedRoles = requiredRoles.map((r: string) => r.toLowerCase().trim())
    const normalizedSkills = requiredSkills.map((s: string) => s.toLowerCase().trim())

    const { data: allUsers, error } = await supabase
      .from('users')
      .select('*')
      .eq('available', true)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const matches: MatchedUser[] = await Promise.all(
      (allUsers as User[])
        .filter((u) => String(u.id) !== String(founderId))
        .map(async (u) => {
          const [skillsRes, interestsRes] = await Promise.all([
            supabase.from('user_skills').select('skill').eq('user_id', u.id),
            supabase.from('user_interests').select('interest').eq('user_id', u.id),
          ])

          const skills: string[] = skillsRes.data?.map(r => r.skill) ?? []
          const interests: string[] = interestsRes.data?.map(r => r.interest) ?? []

          const normalizedUserRole = (u.role || '').toLowerCase().trim()
          const normalizedUserSkills = skills.map(s => s.toLowerCase().trim())

          const roleMatch = normalizedRoles.includes(normalizedUserRole)
          const techOverlap = normalizedUserSkills.filter(s => normalizedSkills.includes(s))

          const score = (roleMatch ? 10 : 0) + techOverlap.length * 2

          return {
            id: u.id,
            name: u.name,
            role: u.role,
            skills,
            interests,
            score,
            roleMatch
          }
        })
    )

    const ranked = matches
      .filter(u => u.score > 0)
      .sort((a, b) => b.score - a.score)

    return NextResponse.json({ projectId, matches: ranked })
  } catch (err) {
    console.error('POST /api/match error:', err)
    return NextResponse.json({ error: 'Invalid request body or server error' }, { status: 500 })
  }
}