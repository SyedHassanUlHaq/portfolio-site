import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      <h2 className="text-4xl font-bold text-center mb-12">🚀 Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            className="group relative rounded-3xl overflow-hidden border border-purple-600 shadow-2xl transition-transform hover:scale-[1.02] hover:border-pink-500"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-800 to-pink-600 opacity-20 group-hover:opacity-30 z-0 transition" />
            <div className="relative z-10 p-6 space-y-4">
              <h3 className="text-2xl font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-300">{project.description}</p>
              <div className="flex gap-2 flex-wrap">
                {project.tech.map((t, i) => (
                  <span key={i} className="bg-white/10 text-xs px-2 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
