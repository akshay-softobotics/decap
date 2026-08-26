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
      <div className="header-content">
        <Link href="/posts" className="back-link">
          ← Back to blog
        </Link>
        <span className="kicker">
          {category ? category.name : "Blog"}
        </span>
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
      </div>
      <div className="toc-spacer" aria-hidden="true" />
      <style jsx>{`
        .article-header {
          max-width: var(--content-width);
          margin: 0 auto;
          padding: 3.5rem 1.5rem 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .header-content {
          width: 100%;
          max-width: 48rem;
          margin: 0 auto;
          text-align: left;
        }
        .toc-spacer {
          display: none;
        }
        @media (min-width: 1024px) {
          .article-header {
            flex-direction: row;
            align-items: flex-start;
            gap: 3rem;
          }
          .header-content {
            margin: 0;
            order: 1;
          }
          .toc-spacer {
            display: block;
            flex: 0 0 14rem;
            order: 2;
          }
        }
        :global(.back-link) {
          display: block;
          margin-bottom: 2rem;
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-muted);
        }
        :global(.back-link:hover) {
          color: var(--color-ink);
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
          margin-bottom: 1.25rem;
        }
        .kicker::before {
          content: "";
          display: inline-block;
          width: 1.5em;
          height: 2px;
          background: currentColor;
        }
        h1 {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2.25rem, 5.5vw, 3.25rem);
          line-height: 1.12;
          letter-spacing: -0.02em;
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
