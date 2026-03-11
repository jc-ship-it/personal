"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const DEV_MODE_KEY = "zhangjiachang-dev-mode";

interface DeveloperModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
}

const DeveloperModeContext = createContext<DeveloperModeContextType | null>(
  null
);

export function useDeveloperMode() {
  const ctx = useContext(DeveloperModeContext);
  return ctx;
}

export function DeveloperModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDevMode, setIsDevMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(DEV_MODE_KEY);
    setIsDevMode(saved === "true");
  }, []);

  const toggleDevMode = useCallback(() => {
    setIsDevMode((prev) => {
      const next = !prev;
      localStorage.setItem(DEV_MODE_KEY, String(next));
      return next;
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "D") {
        e.preventDefault();
        toggleDevMode();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleDevMode]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <DeveloperModeContext.Provider value={{ isDevMode, toggleDevMode }}>
      {children}
    </DeveloperModeContext.Provider>
  );
}

export function DeveloperModeToggle() {
  const { isDevMode, toggleDevMode } = useDeveloperMode() ?? {};

  if (!useDeveloperMode()) return null;

  return (
    <button
      onClick={toggleDevMode}
      title="开发者模式 (Cmd+Shift+D)"
      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
        isDevMode
          ? "bg-[var(--accent)] text-white"
          : "text-[var(--fg-muted)] hover:bg-[var(--border)] hover:text-[var(--fg)]"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      Dev
    </button>
  );
}

export function DeveloperModeBanner() {
  const { isDevMode } = useDeveloperMode() ?? {};
  if (!isDevMode) return null;

  return (
    <div className="sticky top-16 z-40 flex items-center justify-center gap-2 border-b border-[var(--accent)] bg-[var(--accent)]/10 py-2 text-xs font-medium text-[var(--accent)]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      Developer Mode — Edit links visible
    </div>
  );
}

export function DevEditLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { isDevMode } = useDeveloperMode() ?? {};
  if (!isDevMode) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded border border-[var(--accent)] px-3 py-1.5 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
      {children}
    </a>
  );
}
