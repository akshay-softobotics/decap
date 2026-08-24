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
      <header className="tag-head">
        <span className="eyebrow">Travel tag</span>
        <h1>
          #{tag.name}
        </h1>
        <p>Family travel stories &amp; tips filed under {tag.name}.</p>
      </header>
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
            max-width: var(--maxw);
            width: 100%;
            padding: 3rem 1.5rem 4rem;
            display: flex;
            flex-direction: column;
          }
          .tag-head {
            margin: 0 0 2.25rem;
          }
          .tag-head p {
            margin: 0.6rem 0 0;
            color: var(--color-muted);
            font-size: 1.05rem;
          }
          h1 {
            margin: 0.5rem 0 0;
            padding: 0;
            font-family: var(--font-display);
            font-weight: 800;
            font-size: clamp(2rem, 4vw, 2.75rem);
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
          }
        `}
      </style>
    </div>
  );
}
