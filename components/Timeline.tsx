const timelineData = [
  { year: "2024", role: "Senior Interaction Designer", company: "Company A" },
  { year: "2022", role: "Interaction Designer", company: "Company B" },
  { year: "2020", role: "UI Designer", company: "Company C" },
];

export function Timeline() {
  return (
    <div className="relative">
      <div className="absolute left-[7px] top-0 bottom-0 w-px bg-[var(--border)]" />
      <ul className="space-y-8">
        {timelineData.map((item, i) => (
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
