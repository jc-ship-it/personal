const links = [
  { label: "Email", href: "mailto:hello@zhangjiachang.com", value: "hello@zhangjiachang.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/zhangjiachang", value: "linkedin.com/in/zhangjiachang" },
  { label: "GitHub", href: "https://github.com/zhangjiachang", value: "github.com/zhangjiachang" },
  { label: "Twitter / X", href: "https://x.com/zhangjiachang", value: "@zhangjiachang" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--fg)]">
        Contact
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--fg)]">
        Open to opportunities in interaction design. Let's talk.
      </p>

      {/* Links */}
      <ul className="mt-12 space-y-4">
        {links.map((link) => (
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

      {/* Form placeholder - Phase 1 仅 UI 展示 */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold text-[var(--fg)]">
          Send a message
        </h2>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">
          Form integration coming in Phase 3.
        </p>
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Your name"
            disabled
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--fg)] placeholder:text-[var(--fg-muted)] disabled:opacity-60"
          />
          <input
            type="email"
            placeholder="Your email"
            disabled
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--fg)] placeholder:text-[var(--fg-muted)] disabled:opacity-60"
          />
          <textarea
            placeholder="Your message"
            rows={4}
            disabled
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-[var(--fg)] placeholder:text-[var(--fg-muted)] disabled:opacity-60"
          />
          <button
            disabled
            className="rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white opacity-60"
          >
            Send message
          </button>
        </div>
      </div>
    </div>
  );
}
