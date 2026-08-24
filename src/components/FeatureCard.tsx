import { FeatureContent } from "../lib/features";

type Props = {
  feature: FeatureContent;
};

function FeatureIcon({ name }: { name: string }) {
  switch (name) {
    case "team":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M15.5 14.3c2.5.4 4.5 2.6 4.5 5.7" strokeLinecap="round" />
        </svg>
      );
    case "technology":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <rect x="3" y="5" width="18" height="12" rx="2" />
          <path d="M8 21h8M12 17v4" strokeLinecap="round" />
        </svg>
      );
    case "delivery":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M4 8l8-4 8 4-8 4-8-4z" strokeLinejoin="round" />
          <path d="M4 8v8l8 4 8-4V8" strokeLinejoin="round" />
          <path d="M12 12v8" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M9 12.5l2 2 4-4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

export default function FeatureCard({ feature }: Props) {
  return (
    <div className="card">
      <div className="icon-tile">
        <FeatureIcon name={feature.icon} />
      </div>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
      <style jsx>{`
        .card {
          padding: 1.75rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
        }
        .icon-tile {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: var(--radius-sm);
          background: var(--color-accent-dim);
          color: var(--color-accent);
          margin-bottom: 1.25rem;
        }
        .icon-tile :global(svg) {
          width: 1.375rem;
          height: 1.375rem;
        }
        h3 {
          margin: 0 0 0.5rem;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.0625rem;
          color: var(--color-ink);
        }
        p {
          margin: 0;
          color: var(--color-muted);
          font-size: 0.9375rem;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
