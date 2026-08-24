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

export default function FeaturedPost({ post }: Props) {
  const primaryTag = post.tags && post.tags.length > 0 ? getTag(post.tags[0]) : undefined;
  const author = post.author ? getAuthor(post.author) : undefined;

  return (
    <Link href={"/posts/" + post.slug} className="featured">
      <div className="media">
        <PostCover post={post} variant="large" />
      </div>
      <div className="body">
        <span className="eyebrow">Featured</span>
        <h2>{post.title}</h2>
        {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
        <div className="meta">
          <div className="meta-left">
            {author && <Author author={author} withAvatar />}
            <Date date={parseISO(post.date)} />
            {primaryTag && <span className="category">{primaryTag.name}</span>}
          </div>
          <span className="read-more">
            Read Article
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
      <style jsx>{`
        :global(.featured) {
          display: flex;
          flex-direction: column;
          color: var(--color-ink);
        }
        :global(.featured:hover) {
          color: var(--color-ink);
        }
        .media {
          overflow: hidden;
          border-radius: var(--radius-lg);
        }
        .media :global(.cover) {
          transition: transform 0.5s var(--ease-out);
        }
        :global(.featured:hover) .media :global(.cover) {
          transform: scale(1.02);
        }
        .body {
          padding: 1.75rem 0 0;
          border-top: 1px solid var(--color-border);
          margin-top: 1.75rem;
        }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6em;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-cta);
        }
        .eyebrow::before {
          content: "";
          display: inline-block;
          width: 1.5em;
          height: 2px;
          background: currentColor;
        }
        h2 {
          margin: 1rem 0 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          line-height: 1.15;
          letter-spacing: -0.01em;
          max-width: 28ch;
        }
        .excerpt {
          margin: 1rem 0 0;
          color: var(--color-muted);
          font-size: 1.0625rem;
          line-height: 1.6;
          max-width: 42rem;
        }
        .meta {
          margin-top: 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .meta-left {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.9rem;
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--color-muted);
        }
        .category {
          text-transform: capitalize;
          color: var(--color-accent);
        }
        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.4em;
          font-weight: 500;
          font-size: 0.9375rem;
          color: var(--color-ink);
        }
        .read-more svg {
          width: 0.9em;
          height: 0.9em;
          transition: transform 0.2s ease;
        }
        :global(.featured:hover) .read-more svg {
          transform: translateX(3px);
        }

        @media (min-width: 768px) {
          .body {
            padding: 2.25rem 0 0;
          }
        }
      `}</style>
    </Link>
  );
}
