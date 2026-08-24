import Link from "next/link";
import { TagContent } from "../lib/tags";
import { PostContent } from "../lib/posts";
import PostCover from "./PostCover";
import Date from "./Date";
import Newsletter from "./Newsletter";
import { parseISO } from "date-fns";

type Props = {
  tagCounts: { tag: TagContent; count: number }[];
  popularPosts: PostContent[];
};

export default function BlogSidebar({ tagCounts, popularPosts }: Props) {
  return (
    <aside className="sidebar">
      {popularPosts.length > 0 && (
        <section className="panel">
          <h3>Popular posts</h3>
          <ul className="popular-list">
            {popularPosts.map((post, i) => (
              <li key={post.slug}>
                <Link href={"/posts/" + post.slug} className="popular-link">
                  <span className="number">{String(i + 1).padStart(2, "0")}</span>
                  <PostCover post={post} variant="thumb" />
                  <div className="popular-copy">
                    <span className="popular-title">{post.title}</span>
                    <Date date={parseISO(post.date)} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="panel">
        <h3>Categories</h3>
        <div className="tag-grid">
          {tagCounts.map(({ tag, count }) => (
            <Link key={tag.slug} href={`/posts/tags/${tag.slug}`} className="tag-pill">
              <span>{tag.name}</span>
              <span className="tag-count">{count}</span>
            </Link>
          ))}
        </div>
      </section>

      <Newsletter />

      <style jsx>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          flex: 0 0 18rem;
        }
        .panel {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.5rem;
        }
        h3 {
          margin: 0 0 1.25rem;
          font-family: var(--font-display);
          font-size: 1.0625rem;
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
          font-size: 0.8125rem;
          font-weight: 500;
          text-transform: capitalize;
          color: var(--color-muted);
          background: var(--color-paper);
          border: 1px solid var(--color-border);
          border-radius: 999px;
          padding: 0.4em 0.85em;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        :global(.tag-pill:hover) {
          background: var(--color-ink);
          border-color: var(--color-ink);
          color: var(--color-paper);
        }
        .tag-count {
          opacity: 0.65;
          font-family: var(--font-mono);
          font-size: 0.75rem;
        }
        .popular-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        :global(.popular-link) {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--color-ink);
        }
        .number {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-border);
          font-weight: 500;
          flex-shrink: 0;
        }
        .popular-copy {
          min-width: 0;
        }
        .popular-title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.35;
          margin-bottom: 0.25em;
        }
      `}</style>
    </aside>
  );
}
