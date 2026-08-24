type Props = {
  query: string;
  onQueryChange: (value: string) => void;
};

export default function BlogHero({ query, onQueryChange }: Props) {
  return (
    <div className="blog-hero">
      <div className="container inner">
        <span className="eyebrow">The magazine</span>
        <h1>Family travel tips &amp; stories</h1>
        <p>
          Real advice from parents who&apos;ve been there — packing hacks,
          destination guides and the little things that make big trips easier.
        </p>
        <div className="search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M20 20l-5-5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Where does your family want to go?"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Search articles"
          />
        </div>
      </div>
      <style jsx>{`
        .blog-hero {
          background: radial-gradient(
            100% 130% at 85% 0%,
            rgba(79, 176, 217, 0.16),
            transparent 60%
          );
          padding: 3rem 0 2.5rem;
        }
        .inner {
          max-width: 44rem;
        }
        h1 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2.25rem, 5vw, 3.5rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0.75rem 0 0;
        }
        p {
          color: var(--color-muted);
          margin: 1rem 0 1.75rem;
          font-size: 1.15rem;
          line-height: 1.6;
        }
        .search {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-pill);
          padding: 0.85rem 1.25rem;
          max-width: 30rem;
          box-shadow: var(--shadow-sm);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .search:focus-within {
          border-color: var(--color-ocean);
          box-shadow: var(--shadow-md);
        }
        .search svg {
          width: 1.25rem;
          height: 1.25rem;
          color: var(--color-muted);
          flex-shrink: 0;
        }
        .search input {
          border: none;
          outline: none;
          background: transparent;
          font-family: var(--font-body);
          font-size: 1rem;
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
