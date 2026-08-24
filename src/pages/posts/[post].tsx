import { GetStaticProps, GetStaticPaths } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import { fetchPostContent, PostContent } from "../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from "date-fns";
import PostLayout from "../../components/PostLayout";
import { Heading } from "../../components/TableOfContents";

import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";

export type Props = {
  title: string;
  dateString: string;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  coverImage: string | null;
  bannerImage: string | null;
  readTimeMinutes: number;
  headings: Heading[];
  previous: PostContent | null;
  next: PostContent | null;
  related: PostContent[];
  source: MDXRemoteSerializeResult;
};

const components = { InstagramEmbed, YouTube, TwitterTweetEmbed };
const slugToPostContent = ((postContents) => {
  let hash: { [slug: string]: PostContent } = {};
  postContents.forEach((it) => (hash[it.slug] = it));
  return hash;
})(fetchPostContent());

function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .trim();
}

function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const match = /^(#{1,6})\s+(.+)$/.exec(line.trim());
    if (!match) {
      continue;
    }
    const depth = match[1].length;
    const text = stripInlineMarkdown(match[2]);
    const id = slugger.slug(text);
    if (depth <= 3) {
      headings.push({ id, text, depth });
    }
  }
  return headings;
}

export default function Post({
  title,
  dateString,
  slug,
  tags,
  author,
  description = "",
  coverImage,
  bannerImage,
  readTimeMinutes,
  headings,
  previous,
  next,
  related,
  source,
}: Props) {
  return (
    <PostLayout
      title={title}
      date={parseISO(dateString)}
      slug={slug}
      tags={tags}
      author={author}
      description={description}
      coverImage={coverImage ?? undefined}
      bannerImage={bannerImage ?? undefined}
      readTimeMinutes={readTimeMinutes}
      headings={headings}
      previous={previous ?? undefined}
      next={next ?? undefined}
      related={related}
    >
      <MDXRemote {...source} components={components} />
    </PostLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPostContent().map((it) => "/posts/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.post as string;
  const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object },
  });
  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: { rehypePlugins: [rehypeSlug] },
  });

  const allPosts = fetchPostContent();
  const index = allPosts.findIndex((it) => it.slug === slug);
  const rawPrevious = index >= 0 && index < allPosts.length - 1 ? allPosts[index + 1] : null;
  const rawNext = index > 0 ? allPosts[index - 1] : null;
  const previous = rawPrevious ? { ...rawPrevious, tags: rawPrevious.tags ?? [] } : null;
  const next = rawNext ? { ...rawNext, tags: rawNext.tags ?? [] } : null;

  const currentTags: string[] = data.tags ?? [];
  const sameCategory = allPosts.filter(
    (it) => it.slug !== slug && it.tags?.some((t) => currentTags.includes(t))
  );
  const fallbackRecent = allPosts.filter((it) => it.slug !== slug);
  const related = (sameCategory.length > 0 ? sameCategory : fallbackRecent)
    .slice(0, 3)
    .map((it) => ({ ...it, tags: it.tags ?? [] }));

  return {
    props: {
      title: data.title,
      dateString: data.date,
      slug: data.slug,
      description: data.description ?? slugToPostContent[slug].excerpt ?? "",
      coverImage: slugToPostContent[slug].coverImage ?? null,
      bannerImage: slugToPostContent[slug].bannerImage ?? null,
      readTimeMinutes: slugToPostContent[slug].readTimeMinutes,
      tags: currentTags,
      author: data.author,
      headings: extractHeadings(content),
      previous,
      next,
      related,
      source: mdxSource,
    },
  };
};
