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
  eyebrow?: string;
};

export default function FeaturedPost({ post, eyebrow = "Featured" }: Props) {
  const primaryTag = post.tags && post.tags.length > 0 ? getTag(post.tags[0]) : undefined;
  const author = post.author ? getAuthor(post.author) : undefined;

  return (
    <article className="featured">
      <Link href={"/posts/" + post.slug} className="media">
        <PostCover post={post} variant="large" />
      </Link>
      <div className="body">
        <span className="eyebrow">{eyebrow}</span>
        {primaryTag && <span className="category">{primaryTag.name}</span>}
        <h2>
          <Link href={"/posts/" + post.slug} className="title-link">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
        <div className="meta">
          {author && <Author author={author} withAvatar />}
          <Date date={parseISO(post.date)} />
          <span className="read-time">{post.readTimeMinutes} min read</span>
        </div>
        <Link href={"/posts/" + post.slug} className="btn-primary">
          Read Article
        </Link>
      </div>
      <style jsx>{`
        .featured {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          padding: 1.25rem;
        }
        :global(.media) {
          display: block;
          overflow: hidden;
        }
        .body {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0 0.75rem 0.5rem;
        }
        .category {
          display: inline-block;
          margin: 0.9rem 0 0;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--color-accent);
          background: var(--color-accent-dim);
          border-radius: 999px;
          padding: 0.3em 0.8em;
        }
        h2 {
          margin: 0.9rem 0 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.5rem, 3.2vw, 2.125rem);
          line-height: 1.2;
        }
        :global(.title-link) {
          color: var(--color-ink);
        }
        .excerpt {
          margin: 1rem 0 0;
          color: var(--color-muted);
          font-size: 1.0625rem;
          line-height: 1.6;
        }
        .meta {
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--color-muted);
          flex-wrap: wrap;
        }
        :global(.btn-primary) {
          margin-top: 1.75rem;
        }

        @media (min-width: 860px) {
          .featured {
            flex-direction: row;
            align-items: stretch;
            padding: 1.5rem;
          }
          :global(.media) {
            flex: 1 1 46%;
          }
          :global(.media .cover) {
            height: 100%;
          }
          .body {
            flex: 1 1 54%;
            justify-content: center;
            padding: 1rem 1rem 1rem 2rem;
          }
        }
      `}</style>
    </article>
  );
}
