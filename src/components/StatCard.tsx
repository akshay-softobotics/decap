type Props = {
  value: string;
  label: string;
};

export default function StatCard({ value, label }: Props) {
  return (
    <div className="stat">
      <span className="value">{value}</span>
      <span className="label">{label}</span>
      <style jsx>{`
        .stat {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding: 1.5rem;
          border-radius: var(--radius-md);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          text-align: center;
        }
        .value {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 600;
          color: var(--color-accent);
        }
        .label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-muted);
        }
      `}</style>
    </div>
  );
}
