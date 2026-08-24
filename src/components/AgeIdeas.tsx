import { useState } from "react";
import { ageGroups } from "../lib/site";

export default function AgeIdeas() {
  const [active, setActive] = useState(ageGroups[0].id);
  const current = ageGroups.find((g) => g.id === active) ?? ageGroups[0];

  return (
    <div className="age-ideas">
      <div className="tabs no-scrollbar" role="tablist" aria-label="Age groups">
        {ageGroups.map((group) => (
          <button
            key={group.id}
            role="tab"
            aria-selected={active === group.id}
            className={`tab ${active === group.id ? "active" : ""}`}
            onClick={() => setActive(group.id)}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="panel" role="tabpanel">
        <div className="panel-head">
          <span className="age-chip">{current.label}</span>
          <h3>{current.headline}</h3>
        </div>
        <div className="cols">
          <div className="col">
            <h4>Recommended destinations</h4>
            <ul>
              {current.destinations.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div className="col">
            <h4>Activity ideas</h4>
            <ul>
              {current.activities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div className="col tip">
            <h4>Planning tip</h4>
            <p>{current.tip}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tabs {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          margin-bottom: 1.5rem;
          scroll-snap-type: x mandatory;
        }
        .tab {
          flex: 0 0 auto;
          scroll-snap-align: start;
          border: 1.5px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-ink);
          border-radius: var(--radius-pill);
          padding: 0.6rem 1.15rem;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
        }
        .tab:hover {
          border-color: var(--color-ocean);
        }
        .tab.active {
          background: var(--color-coral);
          border-color: var(--color-coral);
          color: #fff;
        }
        .panel {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          padding: clamp(1.5rem, 3vw, 2.25rem);
        }
        .age-chip {
          display: inline-block;
          background: var(--color-accent-dim);
          color: var(--color-ocean);
          font-weight: 700;
          font-size: 0.8rem;
          padding: 0.3rem 0.7rem;
          border-radius: var(--radius-pill);
        }
        .panel-head h3 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.4rem, 3vw, 1.9rem);
          margin: 0.75rem 0 0;
        }
        .cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 1.75rem;
        }
        h4 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1rem;
          margin: 0 0 0.75rem;
          color: var(--color-ink);
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        li {
          position: relative;
          padding-left: 1.4rem;
          color: var(--color-muted);
          line-height: 1.4;
        }
        li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.45em;
          width: 0.55rem;
          height: 0.55rem;
          border-radius: 50%;
          background: var(--color-sun);
        }
        .tip p {
          margin: 0;
          color: var(--color-muted);
          line-height: 1.6;
        }
        @media (max-width: 760px) {
          .cols {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
