export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm text-[var(--fg-muted)]">
          © {year} Zhang Jiachang. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
