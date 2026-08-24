import Link from "next/link";
import { parseISO } from "date-fns";
import { PostContent } from "../lib/posts";
import { getTag } from "../lib/tags";
import { getAuthor } from "../lib/authors";
import PostCover from "./PostCover";
import Date from "./Date";
import Author from "./Author";

type Props = {
  post: PostContent;
};

export default function BlogCard({ post }: Props) {
  const primaryTag = post.tags && post.tags.length > 0 ? getTag(post.tags[0]) : undefined;
  const author = post.author ? getAuthor(post.author) : undefined;

  return (
    <Link href={"/posts/" + post.slug} className="card-link">
      <div className="media">
        <PostCover post={post} />
        {primaryTag && <span className="badge">{primaryTag.name}</span>}
      </div>
      <div className="body">
        <h3>{post.title}</h3>
        {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
        <div className="meta">
          {author && <Author author={author} withAvatar />}
          <Date date={parseISO(post.date)} />
        </div>
        <span className="read-more">
          Read Article
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <span className="arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <style jsx>{`
        .media {
          position: relative;
          overflow: hidden;
        }
        .media :global(.cover) {
          transition: transform 0.4s var(--ease-out);
        }
        .badge {
          position: absolute;
          top: 0.9rem;
          left: 0.9rem;
          background: var(--color-surface);
          color: var(--color-ink);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.35em 0.7em;
          border-radius: 999px;
          box-shadow: var(--shadow-sm);
        }
        .body {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          padding: 1.35rem 1.5rem 1.5rem;
        }
        h3 {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.25rem;
          line-height: 1.32;
        }
        .excerpt {
          margin: 0.6em 0 0;
          color: var(--color-muted);
          font-size: 0.9375rem;
          line-height: 1.55;
          flex: 1 0 auto;
        }
        .meta {
          margin-top: 1.1em;
          padding-top: 1em;
          border-top: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5em;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-muted);
        }
        .meta :global(.name) {
          color: var(--color-muted);
        }
        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.4em;
          margin-top: 0.9em;
          font-weight: 500;
          font-size: 0.875rem;
          color: var(--color-accent);
        }
        .read-more svg {
          width: 0.9em;
          height: 0.9em;
          transition: transform 0.2s ease;
        }
        .arrow {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          background: var(--color-ink);
          color: var(--color-paper);
          opacity: 0;
          transform: translateY(-6px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .arrow svg {
          width: 0.9rem;
          height: 0.9rem;
        }
      `}</style>
      <style jsx global>{`
        .card-link {
          position: relative;
          display: flex;
          flex-direction: column;
          color: var(--color-ink);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          height: 100%;
          overflow: hidden;
          transition: box-shadow 0.25s var(--ease-out), transform 0.25s var(--ease-out),
            border-color 0.25s ease;
        }
        .card-link:hover {
          color: var(--color-ink);
          border-color: var(--color-accent);
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }
        .card-link:hover .media :global(.cover) {
          transform: scale(1.05);
        }
        .card-link:hover .arrow {
          opacity: 1;
          transform: translateY(0);
        }
        .card-link:hover .read-more svg {
          transform: translateX(3px);
        }
      `}</style>
    </Link>
  );
}
