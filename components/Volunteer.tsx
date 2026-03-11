interface VolunteerItem {
  period: string;
  role: string;
  org: string;
  school: string;
  duration: string;
}

interface VolunteerProps {
  data: VolunteerItem[];
}

export function Volunteer({ data }: VolunteerProps) {
  return (
    <div className="relative">
      <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[var(--border)]" />
      <ul className="space-y-10">
        {data.map((item, i) => (
          <li key={i} className="relative flex gap-8">
            <span className="flex h-4 w-4 shrink-0 rounded-full bg-[var(--border)] ring-4 ring-[var(--bg)]" />
            <div>
              <p className="text-sm text-[var(--fg-muted)]">{item.period}</p>
              <p className="mt-1 font-medium text-[var(--fg)]">{item.role}</p>
              <p className="font-semibold text-[var(--fg)]">{item.org}</p>
              <p className="text-sm text-[var(--fg-muted)]">{item.school}</p>
              <p className="mt-1 text-sm text-[var(--fg-muted)]">{item.duration}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
