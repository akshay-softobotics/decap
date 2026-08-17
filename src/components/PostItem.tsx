import { PostContent } from "../lib/posts";
import Date from "./Date";
import Link from "next/link";
import { parseISO } from "date-fns";
import { getTag } from "../lib/tags";
import PostCover from "./PostCover";

type Props = {
  post: PostContent;
};
export default function PostItem({ post }: Props) {
  return (
    <Link href={"/posts/" + post.slug} className="post-item-link">
      <PostCover post={post} />
      <div className="body">
        <Date date={parseISO(post.date)} />
        <h2>{post.title}</h2>
        {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
        <div className="meta">
          {post.tags && post.tags.length > 0 && (
            <div className="tags">
              {post.tags.map((slug) => (
                <span key={slug} className="tag-chip">
                  {getTag(slug)?.name ?? slug}
                </span>
              ))}
            </div>
          )}
          <span className="read-time">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
              <circle cx="8" cy="8" r="6.3" />
              <path d="M8 4.5V8l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {post.readTimeMinutes} min read
          </span>
        </div>
      </div>
      <style jsx>
        {`
          .body {
            display: flex;
            flex-direction: column;
            flex: 1 1 auto;
            padding: 1.25rem 1.5rem 1.5rem;
          }
          h2 {
            margin: 0.6em 0 0;
            font-family: var(--font-display);
            font-weight: 600;
            font-size: 1.25rem;
            line-height: 1.3;
          }
          .excerpt {
            margin: 0.6em 0 0;
            color: var(--color-muted);
            font-size: 0.9375rem;
            line-height: 1.5;
          }
          .meta {
            margin-top: auto;
            padding-top: 1em;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.75em;
          }
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4em;
          }
          .tag-chip {
            display: inline-block;
            border-radius: 3px;
            background-color: var(--color-accent-dim);
            color: var(--color-accent);
            font-family: var(--font-mono);
            padding: 0.15em 0.45em;
            font-size: 0.75rem;
          }
          .tag-chip::before {
            content: "#";
            opacity: 0.6;
          }
          .read-time {
            display: flex;
            align-items: center;
            gap: 0.3em;
            flex-shrink: 0;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--color-muted);
          }
          .read-time svg {
            width: 0.85em;
            height: 0.85em;
          }
        `}
      </style>
      <style jsx global>{`
        .post-item-link {
          display: flex;
          flex-direction: column;
          color: var(--color-ink);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 0.25rem;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
          transition: box-shadow 0.2s ease, transform 0.2s ease,
            border-color 0.2s ease;
        }
        .post-item-link:hover {
          color: var(--color-ink);
          border-color: var(--color-accent);
          box-shadow: 0 10px 24px rgba(28, 27, 26, 0.08);
          transform: translateY(-2px);
        }
      `}</style>
    </Link>
  );
}
