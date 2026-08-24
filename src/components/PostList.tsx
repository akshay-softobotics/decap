import React, { useMemo, useState } from "react";
import Link from "next/link";
import { PostContent } from "../lib/posts";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import BlogHero from "./BlogHero";
import BlogSidebar from "./BlogSidebar";
import CategoryFilter from "./CategoryFilter";
import FeaturedPost from "./FeaturedPost";
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
  const [category, setCategory] = useState<string | null>(null);
  const trimmed = query.trim().toLowerCase();
  const isFiltering = trimmed.length > 0 || category !== null;

  const results = useMemo(() => {
    if (!isFiltering) {
      return posts;
    }
    return allPosts.filter((post) => {
      const matchesQuery =
        trimmed.length === 0 ||
        post.title.toLowerCase().includes(trimmed) ||
        (post.excerpt ?? "").toLowerCase().includes(trimmed) ||
        (post.tags ?? []).some((tag) => tag.toLowerCase().includes(trimmed));
      const matchesCategory = category === null || (post.tags ?? []).includes(category);
      return matchesQuery && matchesCategory;
    });
  }, [isFiltering, trimmed, category, posts, allPosts]);

  const nextHref =
    pagination.current === 1 ? "/posts/page/2" : `/posts/page/${pagination.current + 1}`;

  const showFeatured = !isFiltering && pagination.current === 1 && results.length > 0;
  const featured = showFeatured ? results[0] : null;
  const gridPosts = featured ? results.slice(1) : results;

  return (
    <div className="page">
      <BlogHero query={query} onQueryChange={setQuery} />
      <div className="filter-row">
        <CategoryFilter tags={tagCounts.map((tc) => tc.tag)} active={category} onChange={setCategory} />
      </div>
      <div className={"container"}>
        <div className={"posts"}>
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
            <>
              {featured && (
                <div className="featured-slot">
                  <FeaturedPost post={featured} />
                </div>
              )}
              <ul className={"post-list"}>
                {gridPosts.map((it, i) => (
                  <li key={i}>
                    <BlogCard post={it} />
                  </li>
                ))}
              </ul>
            </>
          )}

          {!isFiltering && (
            <div className="pagination-row">
              <Pagination
                current={pagination.current}
                pages={pagination.pages}
                link={{
                  href: (page) => (page === 1 ? "/posts" : "/posts/page/" + page),
                }}
              />
              {pagination.current < pagination.pages && (
                <Link href={nextHref} className="next-link">
                  Next →
                </Link>
              )}
            </div>
          )}
        </div>
        <BlogSidebar tagCounts={tagCounts} popularPosts={popularPosts} />
      </div>
      <style jsx>{`
        .page {
          width: 100%;
        }
        .filter-row {
          max-width: var(--content-width);
          margin: 0 auto;
          padding: 0 1.5rem 2.5rem;
        }
        .container {
          display: flex;
          align-items: flex-start;
          gap: 3rem;
          margin: 0 auto;
          max-width: var(--content-width);
          width: 100%;
          padding: 0 1.5rem 4rem;
          box-sizing: border-box;
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
        }
        .featured-slot {
          margin-bottom: 2.5rem;
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
          flex: 1 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        @media (min-width: 640px) {
          .post-list {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .pagination-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        :global(.next-link) {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-accent);
        }

        @media (min-width: 1024px) {
          .container {
            flex-direction: row;
          }
          .post-list {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
