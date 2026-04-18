import { createClient } from '@supabase/supabase-js'
import { NextResponse, NextRequest } from 'next/server'

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get('projectId')

  if (!projectId) {
    return NextResponse.json({ error: 'projectId is required' }, { status: 400 })
  }

  const [rolesRes, techRes] = await Promise.all([
    supabase.from('project_required_roles').select('role').eq('project_id', projectId),
    supabase.from('project_technologies').select('technology').eq('project_id', projectId),
  ])

  const requiredRoles: string[] = rolesRes.data?.map(r => r.role) ?? []
  const requiredTech: string[] = techRes.data?.map(r => r.technology) ?? []

  const { data: allUsers, error } = await supabase
    .from('users')
    .select('*')
    .eq('available', true)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const matches: MatchedUser[] = await Promise.all(
    (allUsers as User[]).map(async (u) => {
      const [skillsRes, interestsRes] = await Promise.all([
        supabase.from('user_skills').select('skill').eq('user_id', u.id),
        supabase.from('user_interests').select('interest').eq('user_id', u.id),
      ])

      const skills: string[] = skillsRes.data?.map(r => r.skill) ?? []
      const interests: string[] = interestsRes.data?.map(r => r.interest) ?? []
      const roleMatch = requiredRoles.includes(u.role)
      const techOverlap = skills.filter(s => requiredTech.includes(s))
      const score = (roleMatch ? 10 : 0) + techOverlap.length * 2

      return { id: u.id, name: u.name, role: u.role, skills, interests, score, roleMatch }
    })
  )

  const ranked = matches
    .filter(u => u.score > 0)
    .sort((a, b) => b.score - a.score)

  return NextResponse.json({ projectId, matches: ranked })
}