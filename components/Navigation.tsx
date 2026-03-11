"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useDeveloperMode } from "./DeveloperMode";
import { getGitHubNewBlogUrl } from "@/lib/site-config";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDevMode } = useDeveloperMode() ?? {};

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border)] bg-white/80 backdrop-blur-md dark:bg-black/80"
      style={{ transition: "background-color 200ms" }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[var(--fg)] hover:text-[var(--accent)]"
          onClick={() => setMobileOpen(false)}
        >
          Zhang Jiachang
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--accent)] underline decoration-[var(--accent)] underline-offset-4"
                    : "text-[var(--fg-muted)] hover:text-[var(--accent)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {isDevMode && (
            <a
              href={getGitHubNewBlogUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-sm font-medium text-white hover:opacity-90"
            >
              Write
            </a>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-[var(--fg)]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-16 bg-[var(--bg)] md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex flex-col gap-6 px-8 py-12">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-2xl font-medium transition-colors ${
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {isDevMode && (
              <a
                href={getGitHubNewBlogUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-medium text-[var(--accent)]"
              >
                Write
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
