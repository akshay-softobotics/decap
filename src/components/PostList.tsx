import React, { useMemo, useState } from "react";
import Link from "next/link";
import { PostContent } from "../lib/posts";
import PostItem from "./PostItem";
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

  const nextHref =
    pagination.current === 1 ? "/posts/page/2" : `/posts/page/${pagination.current + 1}`;

  return (
    <div className="page">
      <BlogHero query={query} onQueryChange={setQuery} />
      <div className={"container"}>
        <div className={"posts"}>
          {isSearching && (
            <p className="search-status">
              {results.length === 0
                ? `No posts match "${query}"`
                : `${results.length} post${results.length === 1 ? "" : "s"} matching "${query}"`}
            </p>
          )}
          <ul className={"post-list"}>
            {results.map((it, i) => (
              <li key={i}>
                <PostItem post={it} />
              </li>
            ))}
          </ul>
          {!isSearching && (
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
        .container {
          display: flex;
          align-items: flex-start;
          gap: 3rem;
          margin: 0 auto;
          max-width: 1200px;
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
        .search-status {
          margin: 0 0 1.25rem;
          color: var(--color-muted);
          font-family: var(--font-mono);
          font-size: 0.8125rem;
        }
        .post-list {
          flex: 1 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          margin-bottom: 2rem;
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
