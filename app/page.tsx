// app/page.tsx
import Link from 'next/link';

const demoProjects = [
  {
    id: "1",
    title: "CloudSync Pro",
    description: "Real-time file synchronization platform for distributed teams.",
    image: "https://picsum.photos/id/1015/600/340",
    stage: "MVP",
  },
  {
    id: "2",
    title: "NeuralSearch",
    description: "AI-powered semantic search for codebases.",
    image: "https://picsum.photos/id/106/600/340",
    stage: "Building",
  },
  {
    id: "3",
    title: "FinFlow",
    description: "Personal finance tracker with team budgeting.",
    image: "https://picsum.photos/id/201/600/340",
    stage: "Idea",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold tracking-tight leading-tight mb-6">
            Where Builders<br />Meet Investors
          </h1>
          <p className="text-2xl text-zinc-400 mb-10">
            A platform for developers to collaborate and showcase their products. 
            Investors discover and fund the next big thing.
          </p>

          <div className="flex gap-4">
            <Link
              href="/auth"
              className="px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:bg-zinc-200 transition"
            >
              Get Started
            </Link>
            <Link
              href="/projects"
              className="px-8 py-4 border border-white/30 hover:bg-white/10 rounded-2xl font-medium transition"
            >
              Browse Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Projects Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-semibold">Featured Projects</h2>
            <p className="text-zinc-400 mt-2">Discover what builders are creating right now</p>
          </div>
          <Link
            href="/projects"
            className="group flex items-center gap-3 text-lg font-medium hover:text-violet-400 transition"
          >
            View all projects
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-violet-500 transition-all"
            >
              {/* Fixed Image */}
              <div className="h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="inline-block px-4 py-1 bg-black/70 text-xs rounded-full mb-4">
                  {project.stage}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                <p className="text-zinc-400 line-clamp-3 mb-8">{project.description}</p>

                <Link
                  href={`/projects/${project.id}`}
                  className="block text-center py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl font-medium transition"
                >
                  View Project
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-zinc-800 py-12 text-center text-zinc-500 text-sm">
        © 2026 BuildBase • Connecting builders and investors
      </footer>
    </div>
  );
}