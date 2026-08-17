import React from "react";
import { PostContent } from "../lib/posts";
import { TagContent } from "../lib/tags";
import PostItem from "./PostItem";
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
      <h1>
        All posts / <span>{tag.name}</span>
      </h1>
      <ul>
        {posts.map((it, i) => (
          <li key={i}>
            <PostItem post={it} />
          </li>
        ))}
      </ul>
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
            max-width: 1200px;
            width: 100%;
            padding: 2.5rem 1.5rem 4rem;
            display: flex;
            flex-direction: column;
          }
          h1 {
            margin: 0 0 2rem;
            padding: 0;
            font-family: var(--font-display);
            font-weight: 500;
            font-size: 1.75rem;
            color: var(--color-muted);
          }
          h1 span {
            font-weight: 600;
            color: var(--color-ink);
          }
          ul {
            margin: 0 0 2rem;
            padding: 0;
            flex: 1 0 auto;
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.25rem;
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
