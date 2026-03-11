interface TimelineItem {
  period: string;
  role: string;
  org: string;
  location: string;
  highlight: string;
  current: boolean;
}

interface TimelineProps {
  data: TimelineItem[];
}

export function Timeline({ data }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[var(--border)]" />
      <ul className="space-y-10">
        {data.map((item, i) => (
          <li key={i} className="relative flex gap-8">
            <span
              className={`flex h-4 w-4 shrink-0 rounded-full ring-4 ring-[var(--bg)] ${
                item.current ? "bg-[var(--accent)]" : "bg-[var(--border)]"
              }`}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-[var(--fg-muted)]">{item.period}</p>
              <p className="mt-1 text-lg font-medium text-[var(--fg)]">
                {item.role}
              </p>
              <p className="font-semibold text-[var(--fg)]">{item.org}</p>
              <p className="text-sm text-[var(--fg-muted)]">{item.location}</p>
              <p className="mt-2 text-[var(--fg)]">{item.highlight}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
