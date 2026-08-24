import Link from "next/link";
import { parseISO } from "date-fns";
import { PostContent } from "../lib/posts";
import { getTag } from "../lib/tags";
import PostCover from "./PostCover";
import Date from "./Date";

type Props = {
  post: PostContent;
};

export default function FeaturedBlog({ post }: Props) {
  const primaryTag =
    post.tags && post.tags.length > 0 ? getTag(post.tags[0]) : undefined;
  // Only show a category when it adds information beyond the "Featured" pill.
  const category = primaryTag?.name;

  return (
    <Link href={"/posts/" + post.slug} className="featured arrow-parent">
      <div className="media">
        <PostCover post={post} variant="feature" />
      </div>
      <div className="content">
        <span className="kicker">
          <span className="pill">Featured</span>
          {category && <span className="cat">{category}</span>}
        </span>
        <h2>{post.title}</h2>
        {post.excerpt && <p>{post.excerpt}</p>}
        <div className="meta">
          <Date date={parseISO(post.date)} />
          <span className="dot" aria-hidden="true">•</span>
          <span>{post.readTimeMinutes} min read</span>
        </div>
        <span className="cta">
          Read article <span className="arrow" aria-hidden="true">→</span>
        </span>
      </div>
      <style jsx>{`
        .media {
          position: relative;
          min-height: 100%;
        }
        .content {
          padding: clamp(1.5rem, 4vw, 2.75rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .kicker {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .pill {
          background: var(--color-coral);
          color: #fff;
          font-weight: 700;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-pill);
        }
        .cat {
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-ocean);
        }
        h2 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          line-height: 1.1;
          margin: 1rem 0 0;
        }
        .content > p {
          margin: 0.85rem 0 0;
          color: var(--color-muted);
          font-size: 1.05rem;
          line-height: 1.6;
        }
        .meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 1.15rem 0 0;
          font-size: 0.9rem;
          color: var(--color-muted);
        }
        .dot {
          opacity: 0.5;
        }
        .cta {
          margin-top: 1.5rem;
          font-weight: 700;
          color: var(--color-ocean);
        }
      `}</style>
      <style jsx global>{`
        .featured {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          color: var(--color-ink);
          box-shadow: var(--shadow-md);
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .featured:hover {
          color: var(--color-ink);
          box-shadow: var(--shadow-lg);
          transform: translateY(-3px);
        }
        .featured:hover .cover img {
          transform: scale(1.05);
        }
        @media (max-width: 820px) {
          .featured {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Link>
  );
}
