import { useState } from "react";

type Props = {
  title?: string;
  description?: string;
  tone?: "surface" | "ink";
};

export default function Newsletter({
  title = "Get the latest insights",
  description = "One email a month — new articles, guides and updates. No spam.",
  tone = "surface",
}: Props) {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className={`card ${tone}`}>
      <h3>{title}</h3>
      {subscribed ? (
        <p className="thanks" role="status">
          You're on the list — thanks for subscribing.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubscribed(true);
          }}
        >
          <p>{description}</p>
          <label htmlFor="newsletter-email" className="visually-hidden">
            Email address
          </label>
          <div className="row">
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
            />
            <button type="submit">Subscribe</button>
          </div>
        </form>
      )}
      <style jsx>{`
        .card {
          border-radius: var(--radius-md);
          padding: 1.5rem;
        }
        .card.surface {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
        }
        .card.ink {
          background: rgba(247, 245, 240, 0.05);
          border: 1px solid var(--color-on-ink-border);
        }
        h3 {
          margin: 0 0 0.6rem;
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-ink);
        }
        .ink h3 {
          color: var(--color-on-ink);
        }
        p {
          margin: 0 0 1rem;
          color: var(--color-muted);
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .ink p {
          color: var(--color-on-ink-muted);
        }
        .row {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
        }
        input {
          flex: 1 1 12rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 0.65em 0.9em;
          font-family: var(--font-body);
          font-size: 0.875rem;
          background: var(--color-paper);
          color: var(--color-ink);
        }
        .ink input {
          background: rgba(247, 245, 240, 0.08);
          border-color: var(--color-on-ink-border);
          color: var(--color-on-ink);
        }
        .ink input::placeholder {
          color: var(--color-on-ink-muted);
        }
        button {
          border: none;
          border-radius: var(--radius-sm);
          padding: 0.65em 1.2em;
          background: var(--color-cta);
          color: #fff;
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
          flex-shrink: 0;
        }
        button:hover {
          background: var(--color-cta-hover);
        }
        .thanks {
          margin: 0;
          color: var(--color-accent);
          font-weight: 500;
        }
        .ink .thanks {
          color: var(--color-on-ink);
        }
      `}</style>
    </div>
  );
}
