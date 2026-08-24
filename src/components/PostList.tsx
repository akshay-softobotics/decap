import React, { useMemo, useState } from "react";
import { PostContent } from "../lib/posts";
import PostItem from "./PostItem";
import FeaturedBlog from "./FeaturedBlog";
import Pagination from "./Pagination";
import BlogHero from "./BlogHero";
import BlogSidebar from "./BlogSidebar";
import { TagContent } from "../lib/tags";

type Props = {
  posts: PostContent[];
  allPosts: PostContent[];
  popularPosts: PostContent[];
  tagCounts: { tag: TagContent; count: number }[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function PostList({
  posts,
  allPosts,
  popularPosts,
  tagCounts,
  pagination,
}: Props) {
  const [query, setQuery] = useState("");
  const trimmed = query.trim().toLowerCase();
  const isSearching = trimmed.length > 0;

  const results = useMemo(() => {
    if (!isSearching) {
      return posts;
    }
    return allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(trimmed) ||
        (post.tags ?? []).some((tag) => tag.toLowerCase().includes(trimmed))
    );
  }, [isSearching, trimmed, posts, allPosts]);

  const showFeatured = !isSearching && pagination.current === 1;
  const featured = showFeatured ? results[0] : undefined;
  const gridPosts = showFeatured ? results.slice(1) : results;

  return (
    <div className="page">
      <BlogHero query={query} onQueryChange={setQuery} />

      {featured && (
        <div className="container featured-row">
          <FeaturedBlog post={featured} />
        </div>
      )}

      <div className="container layout">
        <div className="posts">
          <div className="list-head">
            {isSearching ? (
              <p className="search-status" role="status">
                {results.length === 0
                  ? `No stories match "${query}"`
                  : `${results.length} article${
                      results.length === 1 ? "" : "s"
                    } matching "${query}"`}
              </p>
            ) : (
              <>
                <h2 className="list-title">Latest family travel tips</h2>
                <span className="count">
                  {gridPosts.length} article
                  {gridPosts.length === 1 ? "" : "s"}
                </span>
              </>
            )}
          </div>

          {gridPosts.length === 0 ? (
            <div className="empty">
              <span className="empty-icon" aria-hidden="true">
                🧭
              </span>
              <h3>Nothing here yet</h3>
              <p>
                {isSearching
                  ? "Try a different destination, tag or keyword."
                  : "New stories are on the way — check back soon."}
              </p>
              {isSearching && (
                <button type="button" onClick={() => setQuery("")}>
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <ul className="post-list">
              {gridPosts.map((it) => (
                <li key={it.slug}>
                  <PostItem post={it} />
                </li>
              ))}
            </ul>
          )}

          {!isSearching && pagination.pages > 1 && (
            <div className="pagination-row">
              <Pagination
                current={pagination.current}
                pages={pagination.pages}
                link={{
                  href: (page) =>
                    page === 1 ? "/posts" : "/posts/page/" + page,
                }}
              />
              <span className="page-of">
                Page {pagination.current} of {pagination.pages}
              </span>
            </div>
          )}
        </div>
        <BlogSidebar tagCounts={tagCounts} popularPosts={popularPosts} />
      </div>
      <style jsx>{`
        .page {
          width: 100%;
        }
        .featured-row {
          padding-bottom: 3rem;
        }
        .layout {
          display: flex;
          align-items: flex-start;
          gap: 3rem;
          padding-bottom: 4rem;
          flex-direction: column;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .posts {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          min-width: 0;
          width: 100%;
        }
        .list-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.9rem;
          border-bottom: 1px solid var(--color-border);
        }
        .list-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.5rem;
          margin: 0;
        }
        .count {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-muted);
          white-space: nowrap;
        }
        .search-status {
          margin: 0;
          color: var(--color-muted);
          font-weight: 600;
        }
        .post-list {
          flex: 1 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        @media (min-width: 640px) {
          .post-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        .empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.4rem;
          padding: 3.5rem 1.5rem;
          margin-bottom: 2rem;
          background: var(--color-surface);
          border: 1px dashed var(--color-border);
          border-radius: var(--radius-lg);
        }
        .empty-icon {
          font-size: 2rem;
        }
        .empty h3 {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 800;
          margin: 0.25rem 0 0;
        }
        .empty p {
          margin: 0;
          color: var(--color-muted);
          font-size: 0.95rem;
        }
        .empty button {
          margin-top: 1rem;
          border: none;
          border-radius: var(--radius-pill);
          padding: 0.7em 1.4em;
          background: var(--color-coral);
          color: #fff;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .empty button:hover {
          background: var(--color-cta-hover);
        }
        .pagination-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem 1.5rem;
          padding-top: 1.75rem;
          border-top: 1px solid var(--color-border);
        }
        .page-of {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-muted);
        }
        @media (min-width: 1024px) {
          .layout {
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
}
