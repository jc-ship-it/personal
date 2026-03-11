interface TimelineItem {
  year: string;
  role: string;
  company: string;
}

interface TimelineProps {
  data: TimelineItem[];
}

export function Timeline({ data }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[var(--border)]" />
      <ul className="space-y-8">
        {data.map((item, i) => (
          <li key={i} className="relative flex gap-8">
            <span className="flex h-4 w-4 shrink-0 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg)]" />
            <div>
              <p className="text-sm font-medium text-[var(--fg-muted)]">
                {item.year}
              </p>
              <p className="font-medium text-[var(--fg)]">{item.role}</p>
              <p className="text-sm text-[var(--fg-muted)]">{item.company}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
