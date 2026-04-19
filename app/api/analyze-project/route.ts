import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

interface RawUser {
  id: string
  name: string
  role: string
  experience_level: string
  available: boolean
  avatar_url?: string
}

interface Collaborator {
  id: string
  name: string
  role: string
  skills: string[]
  interests: string[]
  score: number
  roleMatch: boolean
  matchedSkills: string[]
  avatarUrl: string | null
}

interface GroqAnalysis {
  techStack: string[]
  requiredRoles: string[]
  requiredSkills: string[]
  summary: string
  projectType: string
}

const DOMAIN_FALLBACK_STACK: Record<string, string[]> = {
  'AI/ML':          ['Python', 'FastAPI', 'PyTorch', 'OpenAI', 'Pinecone', 'Docker'],
  'FinTech':        ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Plaid', 'Redis'],
  'HealthTech':     ['React', 'Node.js', 'PostgreSQL', 'FHIR API', 'AWS', 'Tailwind'],
  'EdTech':         ['Next.js', 'Supabase', 'React', 'WebRTC', 'Tailwind', 'Stripe'],
  'SaaS':           ['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind', 'Vercel'],
  'Web3':           ['Solidity', 'Ethers.js', 'Next.js', 'Hardhat', 'IPFS', 'Wagmi'],
  'DevTools':       ['TypeScript', 'Node.js', 'GitHub API', 'Docker', 'SQLite'],
  'Consumer':       ['React Native', 'Expo', 'Supabase', 'Tailwind', 'Firebase'],
  'Infrastructure': ['Go', 'Kubernetes', 'Terraform', 'AWS', 'Docker', 'Prometheus'],
  'Other':          ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind', 'Supabase'],
}

async function callGroq(projectText: string, domain: string): Promise<GroqAnalysis | null> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) return null

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.2,
        messages: [
          {
            role: 'system',
            content: 'You are a technical startup advisor. Extract structured requirements from project descriptions. Return ONLY valid JSON, no markdown or extra text.',
          },
          {
            role: 'user',
            content: `Analyze this ${domain} project and return a JSON object with exactly these fields:
{
  "techStack": ["list of 6-8 specific technologies recommended"],
  "requiredRoles": ["list of 3-5 job roles needed"],
  "requiredSkills": ["list of 6-10 specific technical skills"],
  "summary": "1-2 sentence project summary",
  "projectType": "short project type label"
}

Project description: ${projectText}`,
          },
        ],
      }),
    })

    if (!res.ok) return null

    const data = await res.json()
    const content: string = data.choices?.[0]?.message?.content ?? ''
    const start = content.indexOf('{')
    const end = content.lastIndexOf('}')
    if (start === -1 || end === -1) return null

    return JSON.parse(content.slice(start, end + 1)) as GroqAnalysis
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { projectText, domain = 'Other', founderId } = body

    if (!projectText || projectText.trim().length < 20) {
      return NextResponse.json({ error: 'Description too short' }, { status: 400 })
    }

    // Step 1: AI analysis via Groq
    const groqAnalysis = await callGroq(projectText, domain)

    const techStack = groqAnalysis?.techStack ?? DOMAIN_FALLBACK_STACK[domain] ?? DOMAIN_FALLBACK_STACK['Other']
    const requiredRoles = groqAnalysis?.requiredRoles ?? []
    const requiredSkills = groqAnalysis?.requiredSkills ?? techStack
    const summary = groqAnalysis?.summary ?? ''
    const projectType = groqAnalysis?.projectType ?? domain

    // Step 2: Find matching collaborators from Supabase
    const normalizedRoles = requiredRoles.map((r: string) => r.toLowerCase().trim())
    const normalizedSkills = requiredSkills.map((s: string) => s.toLowerCase().trim())

    const { data: allUsers, error } = await supabase
      .from('users')
      .select('*')
      .eq('available', true)

    if (error || !allUsers) {
      return NextResponse.json({ techStack, requiredRoles, summary, projectType, collaborators: [] })
    }

    const collaborators: Collaborator[] = await Promise.all(
      (allUsers as RawUser[])
        .filter(u => String(u.id) !== String(founderId))
        .map(async (u) => {
          const [skillsRes, interestsRes] = await Promise.all([
            supabase.from('user_skills').select('skill').eq('user_id', u.id),
            supabase.from('user_interests').select('interest').eq('user_id', u.id),
          ])

          const skills: string[] = skillsRes.data?.map(r => r.skill) ?? []
          const interests: string[] = interestsRes.data?.map(r => r.interest) ?? []

          const normalizedUserRole = (u.role ?? '').toLowerCase().trim()
          const normalizedUserSkills = skills.map(s => s.toLowerCase().trim())

          const roleMatch = normalizedRoles.some(
            r => normalizedUserRole.includes(r) || r.includes(normalizedUserRole)
          )
          const matchedSkills = normalizedUserSkills.filter(s => normalizedSkills.includes(s))
          const score = (roleMatch ? 10 : 0) + matchedSkills.length * 2

          return {
            id: u.id,
            name: u.name,
            role: u.role,
            skills,
            interests,
            score,
            roleMatch,
            matchedSkills: skills.filter(s => normalizedSkills.includes(s.toLowerCase().trim())),
            avatarUrl: u.avatar_url ?? null,
          }
        })
    )

    const ranked = collaborators
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)

    return NextResponse.json({
      techStack,
      requiredRoles,
      summary,
      projectType,
      collaborators: ranked,
    })
  } catch (err) {
    console.error('POST /api/analyze-project error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
