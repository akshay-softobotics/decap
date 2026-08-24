import Link from "next/link";
import { PostContent } from "../lib/posts";

type Props = {
  previous?: PostContent;
  next?: PostContent;
};

export default function PostNav({ previous, next }: Props) {
  if (!previous && !next) {
    return null;
  }
  return (
    <nav className="post-nav" aria-label="More articles">
      {previous ? (
        <Link href={"/posts/" + previous.slug} className="nav-card prev">
          <span className="direction">← Previous</span>
          <span className="title">{previous.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={"/posts/" + next.slug} className="nav-card next">
          <span className="direction">Next →</span>
          <span className="title">{next.title}</span>
        </Link>
      ) : (
        <span />
      )}
      <style jsx>{`
        .post-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin: 3rem auto 0;
          max-width: 46rem;
          padding: 0 1.5rem;
        }
        :global(.nav-card) {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.25rem 1.5rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          color: var(--color-ink);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        :global(.nav-card:hover) {
          border-color: var(--color-accent);
          box-shadow: var(--shadow-sm);
          color: var(--color-ink);
        }
        :global(.nav-card.next) {
          text-align: right;
          align-items: flex-end;
        }
        .direction {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-muted);
        }
        .title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1rem;
          line-height: 1.35;
        }
      `}</style>
    </nav>
  );
}
