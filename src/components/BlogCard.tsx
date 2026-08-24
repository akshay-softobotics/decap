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
      </div>
      <div className="body">
        {primaryTag && <span className="category">{primaryTag.name}</span>}
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
      <style jsx>{`
        .media {
          overflow: hidden;
          border-radius: var(--radius-lg);
        }
        .media :global(.cover) {
          transition: transform 0.5s var(--ease-out);
        }
        .body {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          padding: 1.35rem 0 0;
        }
        .category {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: capitalize;
          color: var(--color-accent);
        }
        h3 {
          margin: 0.6em 0 0;
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
          color: var(--color-ink);
        }
        .read-more svg {
          width: 0.9em;
          height: 0.9em;
          transition: transform 0.2s ease;
        }
        :global(.card-link:hover) .read-more svg {
          transform: translateX(3px);
        }
      `}</style>
      <style jsx global>{`
        .card-link {
          position: relative;
          display: flex;
          flex-direction: column;
          color: var(--color-ink);
          height: 100%;
          transition: transform 0.25s var(--ease-out);
        }
        .card-link:hover {
          color: var(--color-ink);
        }
        .card-link:hover .media :global(.cover) {
          transform: scale(1.03);
        }
      `}</style>
    </Link>
  );
}
