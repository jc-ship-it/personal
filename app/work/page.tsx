import { getWorkProjects } from "@/lib/content";
import { ProjectCard } from "@/components/ProjectCard";

export const revalidate = 60;

export default async function WorkPage() {
  const projects = await getWorkProjects();

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--fg)]">
        Work
      </h1>
      <p className="mt-2 text-[var(--fg-muted)]">
        Selected projects in interaction design, design systems, and AI products.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            description={project.description}
            image={project.image}
            slug={project.slug}
            tags={project.tags}
          />
        ))}
      </div>
    </div>
  );
}
