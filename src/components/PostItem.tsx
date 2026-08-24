import { PostContent } from "../lib/posts";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";
import { getTag } from "../lib/tags";
import { getAuthor } from "../lib/authors";
import PostCover from "./PostCover";
import Author from "./Author";

type Props = {
  post: PostContent;
};
export default function PostItem({ post }: Props) {
  const primaryTag =
    post.tags && post.tags.length > 0 ? getTag(post.tags[0]) : undefined;
  const category = primaryTag?.name ?? "Travel";
  const author = post.author ? getAuthor(post.author) : undefined;

  return (
    <Link href={"/posts/" + post.slug} className="post-item-link arrow-parent">
      <div className="cover-wrap">
        <PostCover post={post} />
        <span className="category">{category}</span>
      </div>
      <div className="body">
        <h2>{post.title}</h2>
        {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
        <div className="foot">
          <div className="meta">
            {author ? (
              <Author author={author} withAvatar />
            ) : (
              <Date date={parseISO(post.date)} />
            )}
            <span className="dot" aria-hidden="true">
              •
            </span>
            <span className="read-time">{post.readTimeMinutes} min read</span>
          </div>
          <span className="more">
            Read <span className="arrow" aria-hidden="true">→</span>
          </span>
        </div>
      </div>
      <style jsx>
        {`
          .cover-wrap {
            position: relative;
          }
          /* Soft scrim so the category chip stays legible on busy photos. */
          .cover-wrap::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
              180deg,
              rgba(15, 42, 67, 0.28) 0%,
              rgba(15, 42, 67, 0) 45%
            );
            pointer-events: none;
          }
          .category {
            position: absolute;
            top: 0.85rem;
            left: 0.85rem;
            z-index: 2;
            background: rgba(255, 255, 255, 0.94);
            color: var(--color-ink);
            font-weight: 700;
            font-size: 0.72rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            padding: 0.3rem 0.65rem;
            border-radius: var(--radius-pill);
            box-shadow: 0 2px 8px rgba(15, 42, 67, 0.18);
            backdrop-filter: blur(4px);
          }
          .body {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            padding: 1.25rem 1.4rem 1.4rem;
          }
          h2 {
            margin: 0;
            font-family: var(--font-display);
            font-weight: 700;
            font-size: 1.25rem;
            line-height: 1.25;
            transition: color 0.2s ease;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .excerpt {
            margin: 0.55em 0 0;
            color: var(--color-muted);
            font-size: 0.95rem;
            line-height: 1.55;
            /* Fixed line count keeps card footers on a common baseline. */
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .foot {
            margin-top: auto;
            padding-top: 1.15em;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
          }
          .meta {
            display: flex;
            align-items: center;
            gap: 0.5em;
            font-size: 0.85rem;
            color: var(--color-muted);
            min-width: 0;
          }
          /* Truncate rather than wrap the byline in narrow grid columns. */
          .meta :global(.author) {
            min-width: 0;
          }
          .meta :global(.author .name) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .dot {
            opacity: 0.5;
          }
          .read-time {
            font-weight: 600;
            white-space: nowrap;
          }
          .more {
            display: inline-flex;
            align-items: center;
            gap: 0.3em;
            font-weight: 700;
            font-size: 0.85rem;
            color: var(--color-ocean);
            white-space: nowrap;
            opacity: 0;
            transform: translateX(-4px);
            transition: opacity 0.25s ease, transform 0.25s ease;
          }
        `}
      </style>
      <style jsx global>{`
        .post-item-link {
          position: relative;
          display: flex;
          flex-direction: column;
          color: var(--color-ink);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: box-shadow 0.25s ease, transform 0.25s ease,
            border-color 0.25s ease;
        }
        .post-item-link:hover {
          color: var(--color-ink);
          border-color: transparent;
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }
        .post-item-link:hover h2 {
          color: var(--color-ocean);
        }
        .post-item-link:hover .more {
          opacity: 1;
          transform: none;
        }
        .post-item-link:hover .cover img {
          transform: scale(1.06);
        }
        /* Keyboard parity with the hover affordances above. */
        .post-item-link:focus-visible .more {
          opacity: 1;
          transform: none;
        }
        @media (hover: none) {
          .post-item-link .more {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </Link>
  );
}
