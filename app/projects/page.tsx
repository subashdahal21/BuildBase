// app/projects/page.tsx
import Link from 'next/link';

const demoProjects = [
  {
    id: "1",
    title: "CloudSync Pro",
    description: "Real-time file synchronization platform for distributed teams with advanced conflict resolution.",
    image: "https://picsum.photos/id/1015/600/340",
    stage: "MVP Stage",
    type: "SaaS",
    tech: ["React", "Node.js", "AWS"],
    members: 142,
  },
  {
    id: "2",
    title: "NeuralSearch",
    description: "AI-powered semantic search engine for codebases using vector embeddings.",
    image: "https://picsum.photos/id/106/600/340",
    stage: "Building",
    type: "Developer Tool",
    tech: ["TypeScript", "Python", "OpenAI"],
    members: 89,
  },
  {
    id: "3",
    title: "FinFlow",
    description: "Open-source personal finance tracker with real-time team budgeting.",
    image: "https://picsum.photos/id/201/600/340",
    stage: "Idea",
    type: "FinTech",
    tech: ["Next.js", "Supabase", "Stripe"],
    members: 67,
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top Navigation */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              B
            </div>
            <span className="text-2xl font-semibold tracking-tight">BuildBase</span>
          </div>

          <div className="flex items-center gap-8 text-sm">
            <Link href="/projects" className="font-medium text-white">Discover</Link>
            <Link href="/dashboard" className="text-zinc-400 hover:text-white transition">Dashboard</Link>
            <Link 
              href="/projects/create" 
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 rounded-2xl font-medium transition-colors"
            >
              + Submit Project
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">Discover Projects</h1>
            <p className="text-zinc-400 mt-3 text-lg">
              Find and invest in amazing products built by developers
            </p>
          </div>
          
          <Link 
            href="/projects/create"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-medium flex items-center gap-2 transition"
          >
            + New Project
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-violet-500 transition-all duration-300"
            >
              {/* Image - Fixed with regular <img> */}
              <div className="h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 text-xs font-medium bg-emerald-600/90 rounded-full">
                    {project.stage}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium bg-zinc-800 rounded-full">
                    {project.type}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold mb-3 line-clamp-1">{project.title}</h3>
                
                <p className="text-zinc-400 text-sm line-clamp-3 mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.slice(0, 3).map((t) => (
                    <span 
                      key={t} 
                      className="text-xs px-3 py-1 bg-zinc-800 rounded-full text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-zinc-500">
                    👥 {project.members} builders
                  </div>

                  <Link
                    href={`/projects/${project.id}`}
                    className="px-6 py-2.5 bg-white text-black font-semibold rounded-2xl hover:bg-zinc-100 transition-colors"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}