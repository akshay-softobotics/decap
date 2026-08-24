type Props = {
  query: string;
  onQueryChange: (value: string) => void;
};

export default function BlogHero({ query, onQueryChange }: Props) {
  return (
    <div className="hero">
      <h1>Insights, Ideas &amp; Stories</h1>
      <div className="row">
        <p>
          Explore practical insights, expert perspectives, guides and ideas
          on building and shipping better products.
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
      </div>
      <style jsx>{`
        .hero {
          padding: 4.5rem 1.5rem 3rem;
          max-width: var(--content-width);
          margin: 0 auto;
        }
        h1 {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5.5vw, 3.75rem);
          font-weight: 600;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }
        .row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-top: 1.25rem;
        }
        p {
          color: var(--color-muted);
          margin: 0;
          max-width: 34rem;
          line-height: 1.6;
        }
        .search {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 0.7rem 1rem;
          width: 100%;
          max-width: 20rem;
          flex-shrink: 0;
          transition: border-color 0.2s ease;
        }
        .search:focus-within {
          border-color: var(--color-accent);
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
      `}</style>
    </div>
  );
}
