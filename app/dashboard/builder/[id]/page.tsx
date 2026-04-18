'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, GitBranch, Users, TrendingUp } from 'lucide-react';

export default function BuilderProjectDetail() {
  const params = useParams();
  const projectId = params?.id as string;

  const [activeTab, setActiveTab] = useState<'overview' | 'team' | 'github' | 'investors'>('overview');

  const project = {
    id: projectId,
    title: 'CloudSync Pro',
    subtitle: 'Real-time file synchronization platform for distributed teams',
    stage: 'MVP Stage',
    type: 'SaaS',
    description:
      'CloudSync Pro is a next-generation file synchronization platform designed for modern distributed teams. It provides real-time syncing across multiple devices, advanced conflict resolution, and seamless integration with popular development tools. Our platform ensures data consistency while maintaining high performance even with large file sets.',
    commits: 127,
    openRoles: 2,
    techStack: ['React', 'Node.js', 'AWS S3', 'PostgreSQL', 'Redis', 'Docker'],
    admin: {
      name: 'Alex Chen',
      avatar: 'AC',
      role: 'Project Admin',
    },
  };

  const githubActivity = [
    { time: '2 hours ago', message: 'Merged pull request #42: Add real-time conflict resolution' },
    { time: 'Yesterday', message: 'Added Redis caching layer for improved performance' },
    { time: '3 days ago', message: 'Updated AWS S3 integration with new versioning' },
    { time: '1 week ago', message: 'Initial MVP deployment to production' },
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Alex Chen',
      role: 'Full Stack Developer',
      avatar: 'AC',
      skills: ['React', 'Node.js', 'PostgreSQL'],
      availability: 'Full-time',
      status: 'Core Team',
    },
    {
      id: 2,
      name: 'Sarah Kim',
      role: 'UI/UX Designer',
      avatar: 'SK',
      skills: ['Figma', 'Design Systems', 'User Research'],
      availability: 'Part-time',
      status: 'Open to Collaboration',
    },
    {
      id: 3,
      name: 'David Miller',
      role: 'Backend Engineer',
      avatar: 'DM',
      skills: ['AWS', 'Redis', 'Docker'],
      availability: 'Full-time',
      status: 'Core Team',
    },
    {
      id: 4,
      name: 'Priya Patel',
      role: 'Product Manager',
      avatar: 'PP',
      skills: ['Roadmapping', 'Agile', 'Market Research'],
      availability: 'Flexible',
      status: 'Advising',
    },
  ];

  const investorInterest = [
    {
      id: 1,
      name: 'Horizon Ventures',
      avatar: 'HV',
      focus: 'SaaS, DevTools, Cloud Infrastructure',
      interestLevel: 'High Interest',
      stagePreference: 'Pre-Seed / Seed',
      checkSize: '$50k - $250k',
      lastContact: '2 days ago',
    },
    {
      id: 2,
      name: 'Maya Thompson',
      avatar: 'MT',
      focus: 'B2B SaaS, Productivity Tools',
      interestLevel: 'Medium Interest',
      stagePreference: 'Seed',
      checkSize: '$25k - $100k',
      lastContact: '1 week ago',
    },
    {
      id: 3,
      name: 'NorthStar Capital',
      avatar: 'NC',
      focus: 'Enterprise Software, AI, Data Platforms',
      interestLevel: 'Very High Interest',
      stagePreference: 'Seed / Series A',
      checkSize: '$100k - $500k',
      lastContact: 'Yesterday',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-zinc-100">
      <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-[#0A0F1C]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/builder"
              className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Builder Dashboard
            </Link>

            <div className="mx-4 h-6 w-px bg-zinc-800" />
            <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-semibold">
              {project.admin.avatar}
            </div>
            <div>
              <p className="text-sm font-medium">{project.admin.name}</p>
              <p className="text-xs text-zinc-500">{project.admin.role}</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
                {project.stage}
              </span>
              <span className="rounded-full bg-zinc-800 px-4 py-1.5 text-sm font-medium text-zinc-400">
                {project.type}
              </span>
            </div>

            <h2 className="mb-3 text-5xl font-bold tracking-tight">{project.title}</h2>
            <p className="max-w-2xl text-xl text-zinc-400">{project.subtitle}</p>
            <p className="mt-3 text-sm text-zinc-500">Project ID: {project.id}</p>
          </div>

          <a
            href="#"
            className="flex items-center gap-2 rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-sm font-medium transition-colors hover:bg-zinc-800"
          >
            <GitBranch className="h-4 w-4" />
            View Repository
          </a>
        </div>

        <div className="mb-12 flex gap-10">
          <div className="flex items-center gap-3">
            <div className="text-xl text-emerald-400">↗</div>
            <div>
              <p className="font-mono text-2xl font-medium">{project.commits}</p>
              <p className="text-zinc-500">commits</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-zinc-400" />
            <div>
              <p className="font-mono text-2xl font-medium">{project.openRoles}</p>
              <p className="text-zinc-500">open roles</p>
            </div>
          </div>
        </div>

        <div className="mb-10 border-b border-zinc-800">
          <div className="flex gap-10 text-sm font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 transition-colors ${
                activeTab === 'overview'
                  ? 'border-b-2 border-violet-500 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`pb-4 transition-colors ${
                activeTab === 'team'
                  ? 'border-b-2 border-violet-500 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Team
            </button>

            <button
              onClick={() => setActiveTab('github')}
              className={`pb-4 transition-colors ${
                activeTab === 'github'
                  ? 'border-b-2 border-violet-500 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              GitHub Activity
            </button>

            <button
              onClick={() => setActiveTab('investors')}
              className={`pb-4 transition-colors ${
                activeTab === 'investors'
                  ? 'border-b-2 border-violet-500 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Investor Interest
            </button>
          </div>
        </div>

        <div className="min-h-[400px]">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
                  <h3 className="mb-6 text-xl font-semibold">Description</h3>
                  <p className="text-[15.5px] leading-relaxed text-zinc-300">{project.description}</p>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
                  <h3 className="mb-6 text-xl font-semibold">Tech Stack</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.techStack.map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-2xl border border-zinc-700 bg-[#0F1629] p-4 transition-all hover:border-violet-500/30"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-800 font-mono text-xs text-violet-400">
                          &lt;&gt;
                        </div>
                        <span className="text-sm font-medium">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                <GitBranch className="h-5 w-5" />
                Recent GitHub Activity
              </h3>

              <div className="space-y-6">
                {githubActivity.map((activity, index) => (
                  <div key={index} className="flex gap-4 border-l-2 border-violet-500 pl-6">
                    <div className="whitespace-nowrap pt-1 text-xs text-zinc-500">{activity.time}</div>
                    <p className="text-zinc-300">{activity.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">Team Members</h3>
                  <p className="mt-1 text-zinc-500">
                    Sample data for now. You can replace this with Supabase later.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
                  {teamMembers.length} members
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 transition-all hover:border-violet-500/30"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-semibold">
                          {member.avatar}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">{member.name}</h4>
                          <p className="text-sm text-zinc-400">{member.role}</p>
                        </div>
                      </div>

                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                        {member.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="mb-3 text-xs uppercase tracking-wide text-zinc-500">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="rounded-full border border-zinc-700 bg-[#0F1629] px-3 py-1.5 text-sm text-zinc-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                      <div>
                        <p className="text-xs text-zinc-500">Availability</p>
                        <p className="text-sm font-medium text-zinc-300">{member.availability}</p>
                      </div>

                      <button className="rounded-2xl bg-violet-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-violet-500">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'investors' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-semibold">Investor Interest</h3>
                  <p className="mt-1 text-zinc-500">
                    Sample investor data for now. You can connect this to Supabase later.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
                  {investorInterest.length} interested
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {investorInterest.map((investor) => (
                  <div
                    key={investor.id}
                    className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 transition-all hover:border-cyan-500/30"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400 text-sm font-semibold text-black">
                          {investor.avatar}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold">{investor.name}</h4>
                          <p className="text-sm text-zinc-400">{investor.stagePreference}</p>
                        </div>
                      </div>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${
                          investor.interestLevel === 'Very High Interest'
                            ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400'
                            : investor.interestLevel === 'High Interest'
                              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                              : 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400'
                        }`}
                      >
                        {investor.interestLevel}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="mb-1 text-xs uppercase tracking-wide text-zinc-500">
                          Investment Focus
                        </p>
                        <p className="text-sm text-zinc-300">{investor.focus}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-zinc-800 bg-[#0F1629] p-4">
                          <p className="mb-1 text-xs text-zinc-500">Check Size</p>
                          <p className="text-sm font-medium text-zinc-200">{investor.checkSize}</p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-[#0F1629] p-4">
                          <p className="mb-1 text-xs text-zinc-500">Last Contact</p>
                          <p className="text-sm font-medium text-zinc-200">{investor.lastContact}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4">
                      <p className="text-sm text-zinc-500">Potential fit for your current stage</p>
                      <button className="rounded-2xl bg-zinc-800 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-700">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}