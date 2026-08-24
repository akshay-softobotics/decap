import React from "react";
import { PostContent } from "../lib/posts";
import { TagContent } from "../lib/tags";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";

type Props = {
  posts: PostContent[];
  tag: TagContent;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function TagPostList({ posts, tag, pagination }: Props) {
  return (
    <div className={"container"}>
      <div className="header">
        <span className="kicker">Category</span>
        <h1>
          All posts / <span>{tag.name}</span>
        </h1>
      </div>
      {posts.length === 0 ? (
        <div className="empty-state">
          <h3>No articles found</h3>
          <p>There are no posts in this category yet.</p>
        </div>
      ) : (
        <ul>
          {posts.map((it, i) => (
            <li key={i}>
              <BlogCard post={it} />
            </li>
          ))}
        </ul>
      )}
      {pagination.pages > 1 && (
        <div className="pagination-row">
          <Pagination
            current={pagination.current}
            pages={pagination.pages}
            link={{
              href: (page) =>
                page === 1
                  ? "/posts/tags/" + tag.slug
                  : `/posts/tags/${tag.slug}/${page}`,
            }}
          />
        </div>
      )}
      <style jsx>
        {`
          .container {
            margin: 0 auto;
            max-width: var(--content-width);
            width: 100%;
            padding: 6rem 1.5rem 4rem;
            display: flex;
            flex-direction: column;
          }
          .header {
            margin-bottom: 3rem;
          }
          .kicker {
            display: inline-flex;
            align-items: center;
            gap: 0.6em;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            font-weight: 500;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: var(--color-cta);
            margin-bottom: 1.25rem;
          }
          .kicker::before {
            content: "";
            display: inline-block;
            width: 1.5em;
            height: 2px;
            background: currentColor;
          }
          h1 {
            margin: 0;
            padding: 0;
            font-family: var(--font-display);
            font-weight: 500;
            font-size: clamp(1.75rem, 4vw, 2.5rem);
            letter-spacing: -0.01em;
            color: var(--color-muted);
          }
          h1 span {
            font-weight: 600;
            color: var(--color-ink);
            text-transform: capitalize;
          }
          .empty-state {
            padding: 4rem 1.5rem;
            text-align: center;
            background: var(--color-surface);
            border: 1px dashed var(--color-border);
            border-radius: var(--radius-md);
            margin-bottom: 2rem;
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
          ul {
            margin: 0 0 3rem;
            padding: 0;
            flex: 1 0 auto;
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5rem 1.75rem;
          }
          li {
            list-style: none;
          }
          .pagination-row {
            padding-top: 2rem;
            border-top: 1px solid var(--color-border);
          }

          @media (min-width: 640px) {
            ul {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (min-width: 1024px) {
            ul {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        `}
      </style>
    </div>
  );
}
