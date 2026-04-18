import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

const projects = [
  {
    id: 'p_101', title: 'ResearchBridge',
    summary: 'An AI platform matching students with research opportunities.',
    projectStage: 'Idea', lookingForFunding: true,
    domainTags: ['AI', 'EdTech', 'Student Productivity'],
    targetUsers: ['Students', 'Professors', 'Research Labs'],
    technologies: ['Python', 'React', 'Recommendation Systems'],
    teamRolesFilled: ['Backend Engineer'],
    requiredRoles: ['Frontend Engineer', 'ML Engineer', 'UI/UX Designer']
  },
  {
    id: 'p_102', title: 'DermAssist',
    summary: 'A skin condition screening tool using image analysis and dermatologist discovery.',
    projectStage: 'MVP', lookingForFunding: true,
    domainTags: ['AI', 'HealthTech', 'Computer Vision'],
    targetUsers: ['Patients', 'Dermatologists'],
    technologies: ['Python', 'PyTorch', 'Computer Vision', 'Mobile App'],
    teamRolesFilled: ['ML Engineer', 'Backend Engineer'],
    requiredRoles: ['Frontend Engineer', 'Mobile Developer']
  },
  {
    id: 'p_103', title: 'Earnify',
    summary: 'A productivity and self-discipline platform with rewards and progress tracking.',
    projectStage: 'Prototype', lookingForFunding: true,
    domainTags: ['Productivity', 'SaaS', 'Behavior Tech'],
    targetUsers: ['Students', 'Professionals'],
    technologies: ['Spring Boot', 'React', 'MySQL'],
    teamRolesFilled: ['Backend Engineer', 'Frontend Engineer'],
    requiredRoles: ['UI/UX Designer']
  }
]

const users = [
  {
    id: 'u_2', name: 'Sarah', role: 'Frontend Engineer',
    experienceLevel: 'Intermediate', available: true,
    skills: ['React', 'TypeScript', 'Tailwind', 'Figma'],
    interests: ['AI', 'EdTech', 'Startups']
  },
  {
    id: 'u_3', name: 'David', role: 'Backend Engineer',
    experienceLevel: 'Senior', available: true,
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    interests: ['AI', 'SaaS', 'Education']
  },
  {
    id: 'u_4', name: 'Nina', role: 'ML Engineer',
    experienceLevel: 'Intermediate', available: true,
    skills: ['Python', 'PyTorch', 'Recommendation Systems', 'NLP'],
    interests: ['AI', 'Research', 'EdTech']
  },
  {
    id: 'u_5', name: 'Alex', role: 'UI/UX Designer',
    experienceLevel: 'Junior', available: true,
    skills: ['Figma', 'Wireframing', 'Prototyping', 'User Research'],
    interests: ['Startups', 'EdTech', 'Product Design']
  }
]

async function seed() {
  for (const p of projects) {
    await supabase.from('projects').upsert({
      id: p.id, title: p.title, summary: p.summary,
      project_stage: p.projectStage, looking_for_funding: p.lookingForFunding
    })
    for (const tag of p.domainTags)
      await supabase.from('project_domain_tags').upsert({ project_id: p.id, tag })
    for (const u of p.targetUsers)
      await supabase.from('project_target_users').upsert({ project_id: p.id, user_type: u })
    for (const t of p.technologies)
      await supabase.from('project_technologies').upsert({ project_id: p.id, technology: t })
    for (const r of p.teamRolesFilled)
      await supabase.from('project_team_roles_filled').upsert({ project_id: p.id, role: r })
    for (const r of p.requiredRoles)
      await supabase.from('project_required_roles').upsert({ project_id: p.id, role: r })
  }

  for (const u of users) {
    await supabase.from('users').upsert({
      id: u.id, name: u.name, role: u.role,
      experience_level: u.experienceLevel, available: u.available
    })
    for (const s of u.skills)
      await supabase.from('user_skills').upsert({ user_id: u.id, skill: s })
    for (const i of u.interests)
      await supabase.from('user_interests').upsert({ user_id: u.id, interest: i })
  }

  console.log('✅ Seeding done!')
}

seed()