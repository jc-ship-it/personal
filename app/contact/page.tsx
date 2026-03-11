import { contact, getGitHubEditUrl } from "@/lib/site-config";
import { DevEditLink } from "@/components/DeveloperMode";

const contactLinks = [
  { label: "Email", href: `mailto:${contact.email}`, value: contact.email },
  { label: "LinkedIn", href: contact.linkedin, value: contact.linkedin.replace(/^https?:\/\//, "").replace(/\/$/, "") },
  { label: "GitHub", href: contact.github, value: contact.github.replace(/^https?:\/\//, "").replace(/\/$/, "") },
  { label: "Twitter / X", href: contact.twitter, value: contact.twitter.replace(/^https?:\/\//, "").replace(/\/$/, "") },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--fg)]">
            Contact
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--fg)]">
            Open to opportunities in interaction design. Let&apos;s talk.
          </p>
        </div>
        <DevEditLink href={getGitHubEditUrl("content/site.json")}>
          Edit contact
        </DevEditLink>
      </div>

      <ul className="mt-12 space-y-4">
        {contactLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group flex items-center justify-between border-b border-[var(--border)] py-4 text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
            >
              <span className="font-medium">{link.label}</span>
              <span className="text-[var(--fg-muted)] group-hover:text-[var(--accent)]">
                {link.value}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
