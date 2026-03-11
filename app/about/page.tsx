import { Timeline } from "@/components/Timeline";
import { Education } from "@/components/Education";
import { Volunteer } from "@/components/Volunteer";
import { Certifications } from "@/components/Certifications";
import { FadeInSection } from "@/components/FadeInSection";
import { Avatar } from "@/components/Avatar";
import {
  bio,
  timeline,
  education,
  volunteer,
  certifications,
  getGitHubEditUrl,
} from "@/lib/site-config";
import { DevEditLink } from "@/components/DeveloperMode";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-24">
      {/* Hero: Avatar + Bio */}
      <FadeInSection>
        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          <Avatar />
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--fg)]">
              About
            </h1>
            <p className="mt-6 text-lg font-medium text-[var(--fg)]">
              {bio.tagline}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--fg)]">
              {bio.paragraph1}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--fg)]">
              <strong>{bio.paragraph2}</strong>
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* Career Timeline */}
      <FadeInSection>
        <div className="mt-20">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
              Career
            </h2>
            <DevEditLink href={getGitHubEditUrl("content/site.json")}>
              Edit timeline
            </DevEditLink>
          </div>
          <div className="mt-8">
            <Timeline data={timeline} />
          </div>
        </div>
      </FadeInSection>

      {/* Education */}
      <FadeInSection>
        <div className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
            Education
          </h2>
          <div className="mt-8">
            <Education data={education} />
          </div>
        </div>
      </FadeInSection>

      {/* Volunteer */}
      <FadeInSection>
        <div className="mt-20">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
              Volunteer
            </h2>
            <DevEditLink href={getGitHubEditUrl("content/site.json")}>
              Edit
            </DevEditLink>
          </div>
          <div className="mt-8">
            <Volunteer data={volunteer} />
          </div>
        </div>
      </FadeInSection>

      {/* Certifications */}
      <FadeInSection>
        <div className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
            Certifications
          </h2>
          <div className="mt-8">
            <Certifications data={certifications} />
          </div>
        </div>
      </FadeInSection>

      {/* CTA */}
      <FadeInSection>
        <div className="mt-24 py-12 text-center">
          <p className="text-sm text-[var(--fg-muted)]">
            Open to design collaborations. Let&apos;s connect.
          </p>
        </div>
      </FadeInSection>
    </div>
  );
}
