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
          flex: 0 0 18rem;
          width: 100%;
        }
        @media (min-width: 1024px) {
          .sidebar {
            position: sticky;
            top: calc(var(--header-h) + 1.5rem);
          }
        }
        .panel {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-sm);
        }
        h3 {
          margin: 0 0 1.1rem;
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--color-ink);
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
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-ocean);
          background: var(--color-surface-2);
          border-radius: var(--radius-pill);
          padding: 0.4em 0.8em;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        :global(.tag-pill:hover) {
          background: var(--color-ocean);
          color: #fff;
        }
        .tag-count {
          opacity: 0.65;
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
          font-family: var(--font-display);
          font-size: 0.95rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0.25em;
          color: var(--color-ink);
        }
        .newsletter {
          background: linear-gradient(
            160deg,
            var(--color-surface-2),
            var(--color-surface)
          );
        }
        .newsletter p {
          margin: 0 0 0.9rem;
          color: var(--color-muted);
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .newsletter input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-pill);
          padding: 0.7em 1em;
          font-family: var(--font-body);
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
          background: var(--color-surface);
          color: var(--color-ink);
        }
        .newsletter input:focus {
          outline: none;
          border-color: var(--color-ocean);
        }
        .newsletter button {
          width: 100%;
          border: none;
          border-radius: var(--radius-pill);
          padding: 0.75em 0.8em;
          background: var(--color-coral);
          color: #fff;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .newsletter button:hover {
          background: var(--color-cta-hover);
          transform: translateY(-1px);
        }
        .thanks {
          margin: 0;
          color: var(--color-green);
          font-size: 0.9rem;
          font-weight: 700;
        }
      `}</style>
    </aside>
  );
}
