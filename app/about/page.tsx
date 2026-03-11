import { Timeline } from "@/components/Timeline";
import { timeline, getGitHubEditUrl } from "@/lib/site-config";
import { DevEditLink } from "@/components/DeveloperMode";

const skills = [
  "Interaction Design",
  "Mobile OS",
  "AI Product Design",
  "Prototyping",
  "Design Systems",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-24">
      <div className="flex flex-col gap-12 md:flex-row md:gap-16">
        {/* Photo placeholder */}
        <div className="aspect-square w-full max-w-[280px] shrink-0 rounded-xl bg-neutral-200 dark:bg-neutral-800" />

        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--fg)]">
            About
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--fg)]">
            I&apos;m Zhang Jiachang, an interaction designer with a passion for
            creating interfaces that feel inevitable. My work spans mobile
            operating systems, AI-powered products, and design systems that
            scale.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-[var(--fg)]">
            I believe the best design disappears — when an interaction feels so
            natural that using it becomes second nature. That&apos;s the standard I
            aim for in every project.
          </p>

          {/* Skills */}
          <div className="mt-10">
            <h2 className="text-sm font-medium text-[var(--fg-muted)]">
              Skills & Focus
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--fg)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-20">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
            Experience
          </h2>
          <DevEditLink href={getGitHubEditUrl("content/site.json")}>
            Edit timeline
          </DevEditLink>
        </div>
        <div className="mt-8">
          <Timeline data={timeline} />
        </div>
      </div>

      {/* Resume CTA */}
      <div className="mt-20">
        <a
          href="/resume.pdf"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card-bg)] px-6 py-3 font-medium text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
}
