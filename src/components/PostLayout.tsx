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
import PostCover from "./PostCover";
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
  const keywords = tags.map((it) => getTag(it).name);
  const authorContent = getAuthor(author);
  const primaryTag = tags.length > 0 ? getTag(tags[0]) : undefined;
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
      <div className="cover-wrap">
        <PostCover post={{ slug, title, coverImage } as PostContent} variant="large" />
      </div>
      <article ref={articleRef} className="article-body">
        <div className="layout">
          {headings.length > 0 && (
            <aside className="toc-rail">
              <TableOfContents headings={headings} />
            </aside>
          )}
          <div className="content-col">
            <div className={styles.content}>{children}</div>
            <div className="tags-share">
              <ul className="tag-list">
                {tags.map((it, i) => (
                  <li key={i}>
                    <TagButton tag={getTag(it)} />
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
          .cover-wrap {
            max-width: 60rem;
            margin: 2.5rem auto 0;
            padding: 0 1.5rem;
          }
          .article-body {
            padding: 3rem 1.5rem 0;
          }
          .layout {
            max-width: 46rem;
            margin: 0 auto;
            display: flex;
            gap: 3rem;
          }
          .content-col {
            min-width: 0;
            flex: 1 1 auto;
          }
          .toc-rail {
            display: none;
          }
          .tags-share {
            margin-top: 3rem;
            padding-top: 1.75rem;
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
              max-width: 62rem;
              align-items: flex-start;
            }
            .toc-rail {
              display: block;
              flex: 0 0 14rem;
              order: 2;
            }
            .content-col {
              order: 1;
              max-width: 46rem;
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
