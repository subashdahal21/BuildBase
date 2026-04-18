import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

interface Project {
  id: string
  title: string
  summary: string
  project_stage: string
  looking_for_funding: boolean
}

export async function GET() {
  const { data: projects, error } = await supabase.from('projects').select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const full = await Promise.all((projects as Project[]).map(async (p) => {
    const [tags, users, techs, filled, required] = await Promise.all([
      supabase.from('project_domain_tags').select('tag').eq('project_id', p.id),
      supabase.from('project_target_users').select('user_type').eq('project_id', p.id),
      supabase.from('project_technologies').select('technology').eq('project_id', p.id),
      supabase.from('project_team_roles_filled').select('role').eq('project_id', p.id),
      supabase.from('project_required_roles').select('role').eq('project_id', p.id),
    ])

    return {
      id: p.id,
      title: p.title,
      summary: p.summary,
      projectStage: p.project_stage,
      lookingForFunding: p.looking_for_funding,
      domainTags: tags.data?.map(r => r.tag) ?? [],
      targetUsers: users.data?.map(r => r.user_type) ?? [],
      technologies: techs.data?.map(r => r.technology) ?? [],
      teamRolesFilled: filled.data?.map(r => r.role) ?? [],
      requiredRoles: required.data?.map(r => r.role) ?? [],
    }
  }))

  return NextResponse.json(full)
}