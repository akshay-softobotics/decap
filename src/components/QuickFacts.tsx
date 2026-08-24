import { Destination } from "../lib/site";

type Props = {
  destination: Destination;
};

export default function QuickFacts({ destination }: Props) {
  const facts: { label: string; value: string }[] = [
    { label: "Best For", value: destination.bestFor },
    { label: "Ages", value: destination.ageRange },
    { label: "Ideal Trip", value: destination.duration },
    { label: "Best Season", value: destination.season },
  ];
  return (
    <aside className="facts-card" aria-label="Quick facts">
      <h3>Quick facts</h3>
      <dl>
        {facts.map((f) => (
          <div className="row" key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
      <a href="/#planner" className="btn btn-primary">
        Plan this trip
      </a>
      <style jsx>{`
        .facts-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          padding: 1.5rem;
        }
        h3 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.2rem;
          margin: 0 0 1rem;
        }
        dl {
          margin: 0 0 1.25rem;
        }
        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.7rem 0;
          border-top: 1px solid var(--color-border);
        }
        .row:first-child {
          border-top: none;
        }
        dt {
          color: var(--color-muted);
          font-size: 0.9rem;
        }
        dd {
          margin: 0;
          font-weight: 700;
          text-align: right;
        }
        .btn {
          width: 100%;
        }
      `}</style>
    </aside>
  );
}
