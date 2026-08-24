import React, { useMemo, useState } from "react";
import { PostContent } from "../lib/posts";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import BlogHero from "./BlogHero";
import Newsletter from "./Newsletter";
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
  const isFiltering = trimmed.length > 0;

  const results = useMemo(() => {
    if (!isFiltering) {
      return posts;
    }
    return allPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(trimmed) ||
        (post.excerpt ?? "").toLowerCase().includes(trimmed) ||
        (post.tags ?? []).some((tag) => tag.toLowerCase().includes(trimmed))
      );
    });
  }, [isFiltering, trimmed, posts, allPosts]);

  return (
    <div className="page">
      <BlogHero query={query} onQueryChange={setQuery} />
      <div className={"container"}>
        {isFiltering && (
          <p className="search-status">
            {results.length === 0
              ? "No matching posts"
              : `${results.length} post${results.length === 1 ? "" : "s"} found`}
          </p>
        )}

        {results.length === 0 ? (
          <div className="empty-state">
            <h3>No articles found</h3>
            <p>Try a different search term, or clear the category filter to see every post.</p>
          </div>
        ) : (
          <ul className={"post-list"}>
            {results.map((it, i) => (
              <li key={i}>
                <BlogCard post={it} />
              </li>
            ))}
          </ul>
        )}

        {!isFiltering && pagination.pages > 1 && (
          <div className="pagination-row">
            <Pagination
              current={pagination.current}
              pages={pagination.pages}
              link={{
                href: (page) => (page === 1 ? "/posts" : "/posts/page/" + page),
              }}
            />
          </div>
        )}
      </div>
      <div className="newsletter-band">
        <Newsletter tone="band" />
      </div>
      <style jsx>{`
        .page {
          width: 100%;
        }
        .container {
          margin: 0 auto;
          max-width: var(--content-width);
          width: 100%;
          padding: 0 1.5rem 4rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .search-status {
          margin: 0 0 1.25rem;
          color: var(--color-muted);
          font-family: var(--font-mono);
          font-size: 0.8125rem;
        }
        .empty-state {
          padding: 4rem 1.5rem;
          text-align: center;
          background: var(--color-surface);
          border: 1px dashed var(--color-border);
          border-radius: var(--radius-md);
        }
        .empty-state h3 {
          margin: 0 0 0.5rem;
          font-family: var(--font-display);
          font-size: 1.25rem;
        }
        .empty-state p {
          margin: 0;
          color: var(--color-muted);
        }
        .post-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem 1.75rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 640px) {
          .post-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .pagination-row {
          padding-top: 2rem;
          border-top: 1px solid var(--color-border);
        }

        .newsletter-band {
          width: 100%;
        }

        @media (min-width: 1024px) {
          .post-list {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
