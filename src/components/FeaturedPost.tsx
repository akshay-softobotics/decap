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
        <span className="badge">Featured</span>
        <PostCover post={post} variant="large" />
        <div className="media-meta">
          {author && <Author author={author} withAvatar />}
          <Date date={parseISO(post.date)} />
        </div>
      </div>
      <div className="body">
        {primaryTag && <span className="category">{primaryTag.name}</span>}
        <h2>{post.title}</h2>
        {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
      </div>
      <style jsx>{`
        :global(.featured) {
          display: flex;
          flex-direction: column;
          height: 100%;
          color: var(--color-ink);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: box-shadow 0.25s var(--ease-out), border-color 0.25s ease;
        }
        :global(.featured:hover) {
          color: var(--color-ink);
          border-color: var(--color-accent);
          box-shadow: var(--shadow-lg);
        }
        .media {
          position: relative;
        }
        .badge {
          position: absolute;
          top: 0.9rem;
          left: 0.9rem;
          z-index: 1;
          background: var(--color-cta);
          color: #fff;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.35em 0.7em;
          border-radius: var(--radius-sm);
        }
        .media-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-top: 1px solid var(--color-border);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-muted);
        }
        .body {
          padding: 0 1.25rem 1.5rem;
        }
        .category {
          display: inline-block;
          margin: 1.1rem 0 0;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--color-accent);
        }
        h2 {
          margin: 0.6rem 0 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.375rem, 2.6vw, 1.75rem);
          line-height: 1.25;
        }
        .excerpt {
          margin: 0.75rem 0 0;
          color: var(--color-muted);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        @media (min-width: 640px) {
          :global(.featured) {
            flex-direction: row;
          }
          .media {
            flex: 1 1 46%;
            display: flex;
            flex-direction: column;
          }
          .media :global(.cover) {
            flex: 1 0 auto;
          }
          .body {
            flex: 1 1 54%;
            padding: 1.5rem 1.5rem 1.5rem 0;
          }
        }
      `}</style>
    </Link>
  );
}
