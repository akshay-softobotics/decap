type Props = {
  query: string;
  onQueryChange: (value: string) => void;
};

export default function BlogHero({ query, onQueryChange }: Props) {
  return (
    <div className="hero">
      <span className="kicker">Explore our articles</span>
      <h1>Insights &amp; Ideas</h1>
      <p>
        Stories, guides, and practical ideas to help you build better digital
        products.
      </p>
      <div className="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M20 20l-5-5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          placeholder="Search articles…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search posts"
        />
      </div>
      <style jsx>{`
        .hero {
          padding: 6rem 1.5rem 3.5rem;
          max-width: var(--content-width);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }
        .kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.6em;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-cta);
          margin-bottom: 1.5rem;
        }
        .kicker::before {
          content: "";
          display: inline-block;
          width: 1.5em;
          height: 2px;
          background: currentColor;
        }
        h1 {
          font-family: var(--font-display);
          font-size: clamp(2.75rem, 7vw, 5rem);
          font-weight: 600;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.02;
          max-width: 20ch;
        }
        p {
          color: var(--color-muted);
          margin: 1.5rem 0 0;
          max-width: 34rem;
          font-size: 1.125rem;
          line-height: 1.6;
        }
        .search {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: transparent;
          border-bottom: 1px solid var(--color-border);
          padding: 0.7rem 0;
          width: 100%;
          max-width: 22rem;
          margin-top: 2.5rem;
          transition: border-color 0.2s ease;
        }
        .search:focus-within {
          border-color: var(--color-ink);
        }
        .search svg {
          width: 1.1rem;
          height: 1.1rem;
          color: var(--color-muted);
          flex-shrink: 0;
        }
        .search input {
          border: none;
          outline: none;
          background: transparent;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--color-ink);
          width: 100%;
        }
        .search input::placeholder {
          color: var(--color-muted);
        }

        @media (min-width: 768px) {
          .hero {
            padding: 7.5rem 1.5rem 4rem;
          }
        }
      `}</style>
    </div>
  );
}
