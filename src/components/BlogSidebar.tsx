import { useState } from "react";
import Link from "next/link";
import { TagContent } from "../lib/tags";
import { PostContent } from "../lib/posts";
import PostCover from "./PostCover";
import Date from "./Date";
import { parseISO } from "date-fns";

type Props = {
  tagCounts: { tag: TagContent; count: number }[];
  popularPosts: PostContent[];
};

export default function BlogSidebar({ tagCounts, popularPosts }: Props) {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <aside className="sidebar">
      <section className="panel">
        <h3>Browse by tag</h3>
        <div className="tag-grid">
          {tagCounts.map(({ tag, count }) => (
            <Link key={tag.slug} href={`/posts/tags/${tag.slug}`} className="tag-pill">
              <span className="tag-name">#{tag.name}</span>
              <span className="tag-count">{count}</span>
            </Link>
          ))}
        </div>
      </section>

      {popularPosts.length > 0 && (
        <section className="panel">
          <h3>Popular posts</h3>
          <ul className="popular-list">
            {popularPosts.map((post) => (
              <li key={post.slug}>
                <Link href={"/posts/" + post.slug} className="popular-link">
                  <PostCover post={post} variant="thumb" />
                  <div>
                    <span className="popular-title">{post.title}</span>
                    <Date date={parseISO(post.date)} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="panel newsletter">
        <h3>Stay in the loop</h3>
        {subscribed ? (
          <p className="thanks">You're on the list — thanks for subscribing.</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
            }}
          >
            <p>Get new posts delivered to your inbox.</p>
            <input type="email" required placeholder="you@example.com" aria-label="Email address" />
            <button type="submit">Subscribe</button>
          </form>
        )}
      </section>

      <style jsx>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          flex: 0 0 16rem;
        }
        .panel {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          padding: 1.25rem;
        }
        h3 {
          margin: 0 0 1rem;
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
        }
        .tag-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        :global(.tag-pill) {
          display: flex;
          align-items: center;
          gap: 0.4em;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-accent);
          background: var(--color-accent-dim);
          border-radius: 3px;
          padding: 0.3em 0.6em;
        }
        :global(.tag-pill:hover) {
          background: var(--color-accent);
          color: #fff;
        }
        .tag-count {
          opacity: 0.7;
        }
        .popular-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        :global(.popular-link) {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--color-ink);
        }
        .popular-title {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.35;
          margin-bottom: 0.2em;
        }
        .newsletter p {
          margin: 0 0 0.9rem;
          color: var(--color-muted);
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .newsletter input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid var(--color-border);
          border-radius: 0.375rem;
          padding: 0.6em 0.8em;
          font-family: var(--font-body);
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          background: var(--color-paper);
          color: var(--color-ink);
        }
        .newsletter button {
          width: 100%;
          border: none;
          border-radius: 0.375rem;
          padding: 0.65em 0.8em;
          background: var(--color-accent);
          color: #fff;
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .newsletter button:hover {
          background: var(--color-cta);
        }
        .thanks {
          margin: 0;
          color: var(--color-accent);
          font-size: 0.875rem;
          font-weight: 500;
        }
      `}</style>
    </aside>
  );
}
