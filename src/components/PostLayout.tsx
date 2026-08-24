import React, { useRef } from "react";
import styles from "../../public/styles/content.module.css";
import ArticleHeader from "./ArticleHeader";
import Layout from "./Layout";
import BasicMeta from "./meta/BasicMeta";
import JsonLdMeta from "./meta/JsonLdMeta";
import OpenGraphMeta from "./meta/OpenGraphMeta";
import TwitterCardMeta from "./meta/TwitterCardMeta";
import TagButton from "./TagButton";
import TableOfContents, { Heading } from "./TableOfContents";
import ReadingProgress from "./ReadingProgress";
import ShareButtons from "./ShareButtons";
import PostNav from "./PostNav";
import RelatedPosts from "./RelatedPosts";
import { getAuthor } from "../lib/authors";
import { getTag, TagContent } from "../lib/tags";
import { PostContent } from "../lib/posts";
import config from "../lib/config";

type Props = {
  title: string;
  date: Date;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  coverImage?: string;
  readTimeMinutes: number;
  headings: Heading[];
  previous?: PostContent;
  next?: PostContent;
  related: PostContent[];
  children: React.ReactNode;
};
export default function PostLayout({
  title,
  date,
  slug,
  author,
  tags,
  description = "",
  coverImage,
  readTimeMinutes,
  headings,
  previous,
  next,
  related,
  children,
}: Props) {
  const articleRef = useRef<HTMLElement>(null);
  const resolvedTags = tags
    .map((it) => getTag(it))
    .filter((it): it is TagContent => Boolean(it));
  const keywords = resolvedTags.map((it) => it.name);
  const authorContent = getAuthor(author);
  const primaryTag = resolvedTags.length > 0 ? resolvedTags[0] : undefined;
  const url = `/posts/${slug}`;

  return (
    <Layout>
      <BasicMeta url={url} title={title} keywords={keywords} description={description} />
      <TwitterCardMeta url={url} title={title} description={description} />
      <OpenGraphMeta url={url} title={title} description={description} image={coverImage} />
      <JsonLdMeta
        url={url}
        title={title}
        keywords={keywords}
        date={date}
        author={authorContent.name}
        description={description}
        image={coverImage}
      />
      <ReadingProgress targetRef={articleRef} />
      <ArticleHeader
        title={title}
        description={description}
        category={primaryTag}
        author={authorContent}
        date={date}
        readTimeMinutes={readTimeMinutes}
      />
      <article ref={articleRef} className="article-body">
        <div className="layout">
          {headings.length > 0 && (
            <div className="toc-mobile">
              <details>
                <summary>On this page</summary>
                <TableOfContents headings={headings} />
              </details>
            </div>
          )}
          {headings.length > 0 && (
            <aside className="toc-rail">
              <TableOfContents headings={headings} />
            </aside>
          )}
          <div className="content-col">
            <div className={styles.content}>{children}</div>
            <div className="tags-share">
              <ul className="tag-list">
                {resolvedTags.map((tag) => (
                  <li key={tag.slug}>
                    <TagButton tag={tag} />
                  </li>
                ))}
              </ul>
              <ShareButtons url={config.base_url.replace(/\/$/, "") + url} title={title} />
            </div>
          </div>
        </div>
      </article>
      <PostNav previous={previous} next={next} />
      <RelatedPosts posts={related} />
      <style jsx>
        {`
          .article-body {
            padding: 2rem 1.5rem 0;
          }
          .layout {
            max-width: var(--content-width);
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 3rem;
          }
          .content-col {
            min-width: 0;
            width: 100%;
            max-width: 48rem;
            margin: 0 auto;
          }
          .toc-mobile {
            width: 100%;
            max-width: 48rem;
            margin: 0 auto;
          }
          .toc-mobile summary {
            cursor: pointer;
            font-family: var(--font-mono);
            font-size: 0.8125rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--color-muted);
            padding: 0.75rem 1rem;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-sm);
          }
          .toc-mobile details[open] summary {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
          .toc-mobile :global(.toc) {
            padding: 0.5rem 1rem 1rem;
            border: 1px solid var(--color-border);
            border-top: none;
            border-bottom-left-radius: var(--radius-sm);
            border-bottom-right-radius: var(--radius-sm);
          }
          .toc-rail {
            display: none;
          }
          .tags-share {
            margin-top: 2.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--color-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1.25rem;
          }
          .tag-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .tag-list li {
            display: inline-block;
          }

          @media (min-width: 1024px) {
            .layout {
              flex-direction: row;
              align-items: flex-start;
            }
            .toc-mobile {
              display: none;
            }
            .toc-rail {
              display: block;
              flex: 0 0 14rem;
              order: 2;
            }
            .content-col {
              order: 1;
              margin: 0;
            }
          }
        `}
      </style>
      <style global jsx>{`
        /* Syntax highlighting */
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata,
        .token.plain-text {
          color: #8a8578;
        }

        .token.atrule,
        .token.attr-value,
        .token.keyword,
        .token.operator {
          color: #f0a58f;
        }

        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #9fd8b3;
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #a8c6ff;
        }

        .token.function,
        .token.class-name {
          color: #d9b8f5;
        }

        .language-jsx .token.punctuation,
        .language-jsx .token.tag .token.punctuation,
        .language-jsx .token.tag .token.script,
        .language-jsx .token.plain-text {
          color: var(--color-paper);
        }

        .language-jsx .token.tag .token.attr-name {
          color: #d9b8f5;
        }

        .language-jsx .token.tag .token.class-name {
          color: #a8c6ff;
        }

        .language-jsx .token.tag .token.script-punctuation,
        .language-jsx .token.attr-value .token.punctuation:first-child {
          color: #f0a58f;
        }

        .language-jsx .token.attr-value {
          color: #a8c6ff;
        }

        .language-html .token.tag .token.punctuation {
          color: var(--color-paper);
        }

        .language-html .token.tag .token.attr-name {
          color: #d9b8f5;
        }

        .language-html .token.tag .token.attr-value,
        .language-html .token.tag .token.attr-value .token.punctuation:not(:first-child) {
          color: #a8c6ff;
        }

        .language-css .token.selector {
          color: #d9b8f5;
        }

        .language-css .token.property {
          color: #a8c6ff;
        }
      `}</style>
    </Layout>
  );
}
