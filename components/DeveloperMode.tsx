"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

const DEV_MODE_KEY = "zhangjiachang-dev-mode";
const DEV_MODE_PASSWORD = (process.env.NEXT_PUBLIC_DEV_MODE_PASSWORD ?? "").trim();

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
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(DEV_MODE_KEY);
    setIsDevMode(saved === "true");
  }, []);

  const enableDevMode = useCallback(() => {
    setIsDevMode(true);
    localStorage.setItem(DEV_MODE_KEY, "true");
    setShowPasswordModal(false);
    setWrongPassword(false);
    setConfigError(false);
  }, []);

  const disableDevMode = useCallback(() => {
    setIsDevMode(false);
    localStorage.setItem(DEV_MODE_KEY, "false");
  }, []);

  const toggleDevMode = useCallback(() => {
    if (isDevMode) {
      disableDevMode();
    } else {
      setShowPasswordModal(true);
    }
  }, [isDevMode, disableDevMode]);

  const handlePasswordSubmit = useCallback(
    (password: string) => {
      const trimmed = password.trim();
      if (!DEV_MODE_PASSWORD) {
        setConfigError(true);
        return;
      }
      setConfigError(false);
      if (trimmed === DEV_MODE_PASSWORD) {
        enableDevMode();
      } else {
        setWrongPassword(true);
      }
    },
    [enableDevMode]
  );

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

  const contextValue = { isDevMode, toggleDevMode };
  return (
    <DeveloperModeContext.Provider value={contextValue}>
      {children}
      {showPasswordModal && (
        <DevModePasswordModal
          onSubmit={handlePasswordSubmit}
          onClose={() => {
            setShowPasswordModal(false);
            setWrongPassword(false);
            setConfigError(false);
          }}
          wrongPassword={wrongPassword}
          configError={configError}
        />
      )}
    </DeveloperModeContext.Provider>
  );
}

function DevModePasswordModal({
  onSubmit,
  onClose,
  wrongPassword,
  configError,
}: {
  onSubmit: (password: string) => void;
  onClose: () => void;
  wrongPassword?: boolean;
  configError?: boolean;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (wrongPassword) setValue("");
  }, [wrongPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
    setValue("");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-[var(--fg)]">
          开发者模式
        </h3>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          输入密码以启用开发者模式
        </p>
        {wrongPassword && (
          <p className="mt-2 text-sm text-red-500">密码错误，请重试</p>
        )}
        {configError && (
          <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">
            NEXT_PUBLIC_DEV_MODE_PASSWORD 未配置，请在 .env.local 或 Vercel 环境变量中设置
          </p>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="密码"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2 text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:border-[var(--accent)] focus:outline-none"
            autoComplete="current-password"
          />
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-[var(--border)] py-2 text-sm font-medium text-[var(--fg-muted)] hover:bg-[var(--border)] hover:text-[var(--fg)]"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-[var(--accent)] py-2 text-sm font-medium text-white hover:opacity-90"
            >
              确认
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function DeveloperModeToggle() {
  const ctx = useDeveloperMode();
  if (!ctx) return null;
  const { isDevMode, toggleDevMode } = ctx;

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
    <div className="sticky top-11 z-40 flex items-center justify-center gap-2 border-b border-[var(--accent)] bg-[var(--accent)]/10 py-2 text-xs font-medium text-[var(--accent)]">
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
      Developer Mode — Write & edit links visible
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
