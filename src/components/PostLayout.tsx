import React from "react";
import styles from "../../public/styles/content.module.css";
import Author from "./Author";
import Date from "./Date";
import Layout from "./Layout";
import BasicMeta from "./meta/BasicMeta";
import JsonLdMeta from "./meta/JsonLdMeta";
import OpenGraphMeta from "./meta/OpenGraphMeta";
import TwitterCardMeta from "./meta/TwitterCardMeta";
import TagButton from "./TagButton";
import Breadcrumbs from "./Breadcrumbs";
import PostCover from "./PostCover";
import RelatedArticles from "./RelatedArticles";
import { getAuthor } from "../lib/authors";
import { getTag } from "../lib/tags";
import { PostContent } from "../lib/posts";
import config from "../lib/config";

type Props = {
  title: string;
  date: Date;
  slug: string;
  tags: string[];
  author: string;
  /** Used for meta tags; falls back to the generated excerpt. */
  description?: string;
  /** Explicit intro line rendered under the headline. */
  standfirst?: string;
  readTimeMinutes?: number;
  relatedPosts?: PostContent[];
  children: React.ReactNode;
};
export default function PostLayout({
  title,
  date,
  slug,
  author,
  tags,
  description = "",
  standfirst,
  readTimeMinutes,
  relatedPosts = [],
  children,
}: Props) {
  const keywords = tags.map((it) => getTag(it).name);
  const authorName = getAuthor(author).name;
  const primaryTag = tags && tags.length > 0 ? getTag(tags[0]) : undefined;
  const category = primaryTag?.name ?? "Travel";

  const post = { slug, title, tags } as PostContent;
  const postUrl = `${config.base_url.replace(/\/$/, "")}/posts/${slug}`;
  const shareTwitter = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    postUrl
  )}&text=${encodeURIComponent(title)}`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    postUrl
  )}`;
  const sharePinterest = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
    postUrl
  )}&description=${encodeURIComponent(title)}`;

  return (
    <Layout>
      <BasicMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        description={description}
      />
      <TwitterCardMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <OpenGraphMeta
        url={`/posts/${slug}`}
        title={title}
        description={description}
      />
      <JsonLdMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        date={date}
        author={authorName}
        description={description}
      />
      <div className="article-page">
        <div className="container head">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/posts" },
              { label: title },
            ]}
          />
          <span className="category">{category}</span>
          <h1>{title}</h1>
          {standfirst && <p className="standfirst">{standfirst}</p>}
          <div className="byline">
            <Author author={getAuthor(author)} withAvatar />
            <span className="dot" aria-hidden="true">•</span>
            <Date date={date} />
            {readTimeMinutes ? (
              <>
                <span className="dot" aria-hidden="true">•</span>
                <span className="read-time">{readTimeMinutes} min read</span>
              </>
            ) : null}
          </div>
        </div>

        <div className="container hero">
          <PostCover post={post} variant="feature" />
        </div>

        <div className="container body">
          <aside className="share" aria-label="Share this article">
            <span className="share-label">Share</span>
            <a
              href={shareTwitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.8.1 4.1 4.1 0 0 0 3.8 2.8A8.2 8.2 0 0 1 2 18.1 11.6 11.6 0 0 0 8.3 20c7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2.1-2z" />
              </svg>
            </a>
            <a
              href={shareFacebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a
              href={sharePinterest}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Pinterest"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.5-.2 1 .5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8a4.8 4.8 0 0 0-5 4.8c0 .9.3 1.5.7 2 .2.2.2.3.1.6l-.2.9c-.1.3-.3.4-.6.2-1.2-.5-1.7-1.9-1.7-3.5 0-2.6 2.2-5.7 6.5-5.7 3.5 0 5.8 2.5 5.8 5.2 0 3.5-2 6.2-4.9 6.2-1 0-1.9-.5-2.2-1.1l-.6 2.4c-.2.8-.7 1.7-1 2.3A10 10 0 1 0 12 2z" />
              </svg>
            </a>
          </aside>

          <div className={styles.content}>{children}</div>
        </div>

        {tags.length > 0 && (
          <div className="container tags-wrap">
            <span className="tags-label">Filed under</span>
            <ul className="tag-list">
              {tags.map((it, i) => (
                <li key={i}>
                  <TagButton tag={getTag(it)} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {relatedPosts.length > 0 && (
          <div className="container related-wrap">
            <RelatedArticles posts={relatedPosts} />
          </div>
        )}
      </div>
      <style jsx>
        {`
          .article-page {
            /* Width of the sticky share rail, incl. its gap to the text. */
            --gutter: 5.5rem;
            width: 100%;
            padding: 2rem 0 4rem;
          }
          .head {
            display: flex;
            flex-direction: column;
            max-width: 56rem;
          }
          .hero,
          .related-wrap {
            max-width: 56rem;
          }
          .category {
            margin-top: 1.25rem;
            font-weight: 700;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--color-ocean);
          }
          h1 {
            margin: 0.5rem 0 0;
            font-family: var(--font-display);
            font-weight: 800;
            font-size: clamp(2rem, 5vw, 3.25rem);
            line-height: 1.1;
            letter-spacing: -0.01em;
            color: var(--color-ink);
          }
          .standfirst {
            margin: 1.1rem 0 0;
            font-size: 1.2rem;
            line-height: 1.6;
            color: var(--color-muted);
          }
          .byline {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1.4rem;
            padding-top: 1.4rem;
            border-top: 1px solid var(--color-border);
            font-size: 0.9rem;
            color: var(--color-muted);
          }
          .dot {
            opacity: 0.5;
          }
          .read-time {
            font-weight: 600;
          }
          .hero {
            margin: 2rem auto 0;
          }
          .hero :global(.cover) {
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-md);
          }
          .hero :global(.cover.feature) {
            min-height: clamp(16rem, 42vw, 30rem);
          }
          .body {
            margin: 2.5rem auto 0;
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .share {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.75rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--color-border);
          }
          .share-label {
            font-family: var(--font-display);
            font-weight: 700;
            font-size: 0.85rem;
            color: var(--color-muted);
          }
          .share :global(a) {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            color: var(--color-ink);
            transition: background-color 0.2s ease, color 0.2s ease,
              transform 0.2s ease;
          }
          .share :global(a:hover) {
            background: var(--color-ocean);
            color: #fff;
            border-color: var(--color-ocean);
            transform: translateY(-2px);
          }
          .share :global(svg) {
            width: 1.15rem;
            height: 1.15rem;
          }
          .tags-wrap {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.75rem;
            max-width: 56rem;
            margin-top: 3rem;
            padding-top: 1.75rem;
            border-top: 1px solid var(--color-border);
          }
          .tags-label {
            font-family: var(--font-display);
            font-weight: 700;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--color-muted);
          }
          .tag-list {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 0;
            padding: 0;
          }
          .tag-list li {
            display: inline-block;
          }
          .related-wrap {
            margin-top: 1rem;
          }

          @media (min-width: 1024px) {
            /* Every block shares one outer width; the head/hero/tags are
               inset by the share gutter so all text starts on one line. */
            .head,
            .hero,
            .tags-wrap,
            .related-wrap {
              max-width: calc(56rem + var(--gutter));
              padding-left: calc(1.5rem + var(--gutter));
            }
            .body {
              grid-template-columns: var(--gutter) minmax(0, 1fr);
              gap: 0;
              max-width: calc(56rem + var(--gutter));
            }
            .share {
              flex-direction: column;
              align-items: center;
              gap: 0.75rem;
              padding-bottom: 0;
              border-bottom: none;
              position: sticky;
              top: calc(var(--header-h) + 1.5rem);
              align-self: start;
            }
            .share-label {
              writing-mode: vertical-rl;
              transform: rotate(180deg);
            }
          }
        `}
      </style>
      <style global jsx>
        {`
            /* Syntax highlighting */
            .token.comment,
            .token.prolog,
            .token.doctype,
            .token.cdata,
            .token.plain-text {
              color: #6a737d;
            }

            .token.atrule,
            .token.attr-value,
            .token.keyword,
            .token.operator {
              color: #d73a49;
            }

            .token.property,
            .token.tag,
            .token.boolean,
            .token.number,
            .token.constant,
            .token.symbol,
            .token.deleted {
              color: #22863a;
            }

            .token.selector,
            .token.attr-name,
            .token.string,
            .token.char,
            .token.builtin,
            .token.inserted {
              color: #032f62;
            }

            .token.function,
            .token.class-name {
              color: #6f42c1;
            }

            /* language-specific */

            /* JSX */
            .language-jsx .token.punctuation,
            .language-jsx .token.tag .token.punctuation,
            .language-jsx .token.tag .token.script,
            .language-jsx .token.plain-text {
              color: #24292e;
            }

            .language-jsx .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-jsx .token.tag .token.class-name {
              color: #005cc5;
            }

            .language-jsx .token.tag .token.script-punctuation,
            .language-jsx .token.attr-value .token.punctuation:first-child {
              color: #d73a49;
            }

            .language-jsx .token.attr-value {
              color: #032f62;
            }

            .language-jsx span[class="comment"] {
              color: pink;
            }

            /* HTML */
            .language-html .token.tag .token.punctuation {
              color: #24292e;
            }

            .language-html .token.tag .token.attr-name {
              color: #6f42c1;
            }

            .language-html .token.tag .token.attr-value,
            .language-html
              .token.tag
              .token.attr-value
              .token.punctuation:not(:first-child) {
              color: #032f62;
            }

            /* CSS */
            .language-css .token.selector {
              color: #6f42c1;
            }

            .language-css .token.property {
              color: #005cc5;
            }
          `}
      </style>
    </Layout>
  );
}
