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
      <span className="eyebrow">Category</span>
      <h1>
        All posts / <span>{tag.name}</span>
      </h1>
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
      <style jsx>
        {`
          .container {
            margin: 0 auto;
            max-width: var(--content-width);
            width: 100%;
            padding: 4rem 1.5rem 4rem;
            display: flex;
            flex-direction: column;
          }
          .eyebrow {
            margin-bottom: 1rem;
          }
          h1 {
            margin: 0 0 2.5rem;
            padding: 0;
            font-family: var(--font-display);
            font-weight: 500;
            font-size: 1.75rem;
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
            margin: 0 0 2.5rem;
            padding: 0;
            flex: 1 0 auto;
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          li {
            list-style: none;
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
            h1 {
              font-size: 2rem;
            }
          }
        `}
      </style>
    </div>
  );
}
