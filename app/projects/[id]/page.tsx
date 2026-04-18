// app/projects/[id]/page.tsx
import Link from 'next/link';
import { ArrowLeft, Users, GitBranch } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  // TODO: Later replace with real data fetch from DB
  const project = {
    id,
    title: "CloudSync Pro",
    subtitle: "Real-time file synchronization platform for distributed teams",
    stage: "MVP Stage",
    type: "SaaS",
    description: "CloudSync Pro is a next-generation file synchronization platform designed for modern distributed teams. It provides real-time syncing across multiple devices, advanced conflict resolution, and seamless integration with popular development tools. Our platform ensures data consistency while maintaining high performance even with large file sets.",
    techStack: ["React", "Node.js", "AWS S3", "PostgreSQL", "Redis", "Docker"],
    commits: 127,
    openRoles: 2,
    repositoryUrl: "#",
    admin: {
      name: "Alex Chen",
      avatar: "AC",
      role: "Project Admin"
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top Navigation Bar */}
      <nav className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/projects" 
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </Link>
            <div className="h-6 w-px bg-zinc-800 mx-4" />
            <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-semibold text-sm">
              {project.admin.avatar}
            </div>
            <div>
              <p className="font-medium text-sm">{project.admin.name}</p>
              <p className="text-xs text-zinc-500">{project.admin.role}</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Header Section */}
        <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full border border-emerald-500/20">
                {project.stage}
              </span>
              <span className="px-4 py-1.5 bg-zinc-800 text-zinc-400 text-sm font-medium rounded-full">
                {project.type}
              </span>
            </div>

            <h2 className="text-5xl font-bold tracking-tight mb-3">{project.title}</h2>
            <p className="text-xl text-zinc-400 max-w-2xl">{project.subtitle}</p>
          </div>

          <a
            href={project.repositoryUrl}
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-2xl text-sm font-medium transition-colors"
          >
            <GitBranch className="w-4 h-4" />
            View Repository
          </a>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-8 mb-12 text-sm">
          <div className="flex items-center gap-3">
            <div className="text-emerald-400">↗</div>
            <div>
              <p className="font-mono font-medium">{project.commits}</p>
              <p className="text-zinc-500">commits</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-zinc-400" />
            <div>
              <p className="font-mono font-medium">{project.openRoles}</p>
              <p className="text-zinc-500">open roles</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-zinc-800 mb-10">
          <div className="flex gap-10 text-sm">
            <button className="pb-4 border-b-2 border-violet-500 text-white font-medium">Overview</button>
            <button className="pb-4 text-zinc-400 hover:text-zinc-200 transition-colors">Team</button>
            <button className="pb-4 text-zinc-400 hover:text-zinc-200 transition-colors">GitHub Activity</button>
            <button className="pb-4 text-zinc-400 hover:text-zinc-200 transition-colors">Investor Interest</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Description */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
              <h3 className="text-xl font-semibold mb-6">Description</h3>
              <p className="text-zinc-300 leading-relaxed text-[15.5px]">
                {project.description}
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-4">
                {project.techStack.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-zinc-950 border border-zinc-800 hover:border-violet-500/30 transition-all rounded-2xl p-4 flex items-center gap-3"
                  >
                    <div className="w-7 h-7 bg-zinc-800 rounded-lg flex items-center justify-center text-xs text-violet-400 font-mono">
                      &lt;&gt;
                    </div>
                    <span className="font-medium text-sm">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}