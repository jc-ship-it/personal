interface CertificationItem {
  name: string;
  issuer: string;
  issued: string;
  validUntil: string;
  certNo: string;
}

interface CertificationsProps {
  data: CertificationItem[];
}

export function Certifications({ data }: CertificationsProps) {
  return (
    <div className="space-y-6">
      {data.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6"
        >
          <p className="font-medium text-[var(--fg)]">{item.name}</p>
          <p className="mt-1 text-[var(--fg)]">{item.issuer}</p>
          <p className="mt-2 text-sm text-[var(--fg-muted)]">
            Issued {item.issued} · Valid until {item.validUntil}
          </p>
          <p className="mt-1 text-xs text-[var(--fg-muted)]">
            Certification No. {item.certNo}
          </p>
        </div>
      ))}
    </div>
  );
}
