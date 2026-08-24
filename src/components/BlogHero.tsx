type Props = {
  query: string;
  onQueryChange: (value: string) => void;
};

export default function BlogHero({ query, onQueryChange }: Props) {
  return (
    <div className="hero">
      <div className="copy">
        <span className="eyebrow">Our Blog</span>
        <h1>Insights, Ideas &amp; Stories</h1>
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
            placeholder="Search posts…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Search posts"
          />
        </div>
      </div>
      <svg className="illustration" viewBox="0 0 220 180" fill="none" aria-hidden="true">
        <circle cx="150" cy="70" r="62" fill="var(--color-accent-dim)" />
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={172 + col * 10}
              cy={18 + row * 10}
              r="1.4"
              fill="var(--color-border)"
            />
          ))
        )}
        <rect x="18" y="24" width="144" height="120" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" />
        <circle cx="32" cy="38" r="2.5" fill="var(--color-cta)" />
        <circle cx="41" cy="38" r="2.5" fill="var(--color-border)" />
        <circle cx="50" cy="38" r="2.5" fill="var(--color-border)" />
        <rect x="30" y="52" width="26" height="26" rx="4" fill="var(--color-accent)" />
        <text x="38" y="70" fontFamily="var(--font-display)" fontSize="16" fill="#fff">T</text>
        <rect x="66" y="56" width="80" height="6" rx="3" fill="var(--color-border)" />
        <rect x="66" y="68" width="60" height="6" rx="3" fill="var(--color-border)" />
        <rect x="30" y="92" width="90" height="6" rx="3" fill="var(--color-border)" />
        <rect x="30" y="104" width="70" height="6" rx="3" fill="var(--color-border)" />
        <rect x="106" y="90" width="40" height="30" rx="4" fill="var(--color-accent-dim)" />
        <circle cx="118" cy="102" r="4" fill="var(--color-cta)" />
        <path d="M108 116l10-10 8 8 8-6 10 8" stroke="var(--color-accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <style jsx>{`
        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          padding: 4.5rem 1.5rem 3rem;
          max-width: var(--content-width);
          margin: 0 auto;
        }
        .copy {
          max-width: 32rem;
        }
        .copy :global(.eyebrow) {
          margin-bottom: 1.1rem;
        }
        h1 {
          font-family: var(--font-display);
          font-size: clamp(2.25rem, 4.5vw, 3rem);
          font-weight: 600;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.15;
        }
        p {
          color: var(--color-muted);
          margin: 1rem 0 1.75rem;
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
          max-width: 22rem;
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
        .illustration {
          width: 14rem;
          height: auto;
          flex-shrink: 0;
          display: none;
        }

        @media (min-width: 900px) {
          .illustration {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
