interface EducationItem {
  period: string;
  degree: string;
  field: string;
  school: string;
  department?: string;
  gpa?: string;
  note?: string;
}

interface EducationProps {
  data: EducationItem[];
}

export function Education({ data }: EducationProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {data.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6"
        >
          <p className="text-sm text-[var(--fg-muted)]">{item.period}</p>
          <p className="mt-1 font-semibold text-[var(--fg)]">{item.degree}</p>
          <p className="text-[var(--fg)]">{item.field}</p>
          <p className="mt-2 font-medium text-[var(--fg)]">{item.school}</p>
          {item.department && (
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              {item.department}
            </p>
          )}
          {item.gpa && (
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{item.gpa}</p>
          )}
          {item.note && (
            <p className="mt-2 text-sm text-[var(--accent)]">{item.note}</p>
          )}
        </div>
      ))}
    </div>
  );
}
