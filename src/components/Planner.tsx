import { useState } from "react";
import Link from "next/link";
import { destinations } from "../lib/site";

const AGES = ["Babies", "Toddlers", "Young Kids", "Tweens", "Teens"];
const STYLES = ["Beach", "Adventure", "Relaxing", "Educational", "Theme Parks", "Outdoors"];
const DURATIONS = ["Weekend", "3–5 days", "1 week", "2+ weeks"];

// Lightweight mock matcher — maps a style to a sensible sample destination.
const STYLE_MATCH: Record<string, string> = {
  Beach: "hawaii",
  Adventure: "yellowstone",
  Relaxing: "florida-keys",
  Educational: "washington-dc",
  "Theme Parks": "orlando",
  Outdoors: "california",
};

type PillsProps = {
  legend: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
};

function PillGroup({ legend, options, value, onChange }: PillsProps) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <div className="pills">
        {options.map((opt) => (
          <button
            type="button"
            key={opt}
            className={`pill ${value === opt ? "active" : ""}`}
            aria-pressed={value === opt}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <style jsx>{`
        fieldset {
          border: none;
          padding: 0;
          margin: 0;
        }
        legend {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--color-ink);
          margin-bottom: 0.7rem;
          padding: 0;
        }
        .pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .pill {
          border: 1.5px solid var(--color-border);
          background: var(--color-surface);
          color: var(--color-ink);
          border-radius: var(--radius-pill);
          padding: 0.5rem 0.95rem;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .pill:hover {
          border-color: var(--color-ocean);
        }
        .pill.active {
          background: var(--color-ocean);
          border-color: var(--color-ocean);
          color: #fff;
        }
      `}</style>
    </fieldset>
  );
}

export default function Planner() {
  const [age, setAge] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const match = result ? destinations.find((d) => d.slug === result) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = (style && STYLE_MATCH[style]) || "orlando";
    setResult(slug);
  };

  return (
    <section className="planner" id="planner">
      <div className="container">
        <div className="card">
          <div className="head">
            <span className="eyebrow">Smart discovery</span>
            <h2>Where should we go?</h2>
            <p>
              Tell us a little about your crew and we&apos;ll point you toward a
              vacation that fits.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="fields">
              <PillGroup legend="Kids' age" options={AGES} value={age} onChange={setAge} />
              <PillGroup legend="Vacation style" options={STYLES} value={style} onChange={setStyle} />
              <PillGroup legend="Trip duration" options={DURATIONS} value={duration} onChange={setDuration} />
            </div>
            <button type="submit" className="btn btn-primary submit arrow-parent">
              Find My Vacation <span className="arrow" aria-hidden="true">→</span>
            </button>
          </form>

          {match && (
            <div className="result" role="status">
              <span className="result-label">Great match for your family</span>
              <div className="result-body">
                <div>
                  <h3>{match.name}</h3>
                  <p>{match.blurb}</p>
                </div>
                <Link href={`/destinations/${match.slug}`} className="btn btn-secondary">
                  See the guide
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .planner {
          padding: 4rem 0;
        }
        .card {
          position: relative;
          background: linear-gradient(
            135deg,
            var(--color-surface),
            var(--color-surface-2)
          );
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          padding: clamp(1.5rem, 4vw, 3rem);
          overflow: hidden;
        }
        .head {
          max-width: 40rem;
        }
        h2 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.6rem, 4vw, 2.4rem);
          margin: 0.5rem 0 0;
        }
        .head p {
          color: var(--color-muted);
          font-size: 1.05rem;
          line-height: 1.6;
          margin: 0.75rem 0 0;
        }
        form {
          margin-top: 2rem;
        }
        .fields {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }
        .submit {
          margin-top: 1.75rem;
        }
        .result {
          margin-top: 1.75rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-left: 4px solid var(--color-green);
          border-radius: var(--radius);
          padding: 1.25rem 1.5rem;
        }
        .result-label {
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-green);
        }
        .result-body {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }
        .result-body h3 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.4rem;
          margin: 0;
        }
        .result-body p {
          margin: 0.3rem 0 0;
          color: var(--color-muted);
          max-width: 34rem;
        }
        @media (max-width: 760px) {
          .fields {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
