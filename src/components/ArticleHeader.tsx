import Link from "next/link";
import { AuthorContent } from "../lib/authors";
import { TagContent } from "../lib/tags";
import Author from "./Author";
import Date from "./Date";

type Props = {
  title: string;
  description?: string;
  category?: TagContent;
  author: AuthorContent;
  date: Date;
  readTimeMinutes: number;
};

export default function ArticleHeader({
  title,
  description,
  category,
  author,
  date,
  readTimeMinutes,
}: Props) {
  return (
    <header className="article-header">
      <Link href="/posts" className="back-link">
        ← Back to blog
      </Link>
      {category && (
        <Link href={`/posts/tags/${category.slug}`} className="category">
          {category.name}
        </Link>
      )}
      <h1>{title}</h1>
      {description && <p className="description">{description}</p>}
      <div className="meta">
        <Author author={author} withAvatar />
        <span className="dot" aria-hidden="true">
          &middot;
        </span>
        <Date date={date} />
        <span className="dot" aria-hidden="true">
          &middot;
        </span>
        <span className="read-time">{readTimeMinutes} min read</span>
      </div>
      <style jsx>{`
        .article-header {
          max-width: 46rem;
          margin: 0 auto;
          padding: 3rem 1.5rem 0;
          text-align: left;
        }
        .back-link {
          display: inline-block;
          margin-bottom: 1.75rem;
          font-family: var(--font-mono);
          font-size: 0.875rem;
          color: var(--color-accent);
          font-weight: 500;
        }
        .back-link:hover {
          text-decoration: underline;
        }
        .category {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: capitalize;
          color: var(--color-accent);
          background: var(--color-accent-dim);
          border-radius: 999px;
          padding: 0.35em 0.9em;
          margin-bottom: 1.25rem;
        }
        h1 {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2rem, 5vw, 2.875rem);
          line-height: 1.16;
          letter-spacing: -0.015em;
          color: var(--color-ink);
        }
        .description {
          margin: 1.25rem 0 0;
          color: var(--color-muted);
          font-size: 1.125rem;
          line-height: 1.6;
        }
        .meta {
          margin-top: 1.75rem;
          padding-bottom: 1.75rem;
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          gap: 0.75em;
          flex-wrap: wrap;
        }
        .dot {
          color: var(--color-muted);
          opacity: 0.6;
        }
        .read-time {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--color-muted);
        }
      `}</style>
    </header>
  );
}
