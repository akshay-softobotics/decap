import { GetStaticProps, GetStaticPaths } from "next";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import matter from "gray-matter";
import { fetchPostContent, PostContent } from "../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from 'date-fns';
import PostLayout from "../../components/PostLayout";

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
  standfirst?: string;
  readTimeMinutes: number;
  relatedPosts: PostContent[];
  source: MDXRemoteSerializeResult;
};

const components = { InstagramEmbed, YouTube, TwitterTweetEmbed };
const slugToPostContent = (postContents => {
  let hash = {}
  postContents.forEach(it => hash[it.slug] = it)
  return hash;
})(fetchPostContent());

export default function Post({
  title,
  dateString,
  slug,
  tags,
  author,
  description = "",
  standfirst,
  readTimeMinutes,
  relatedPosts,
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
      standfirst={standfirst}
      readTimeMinutes={readTimeMinutes}
      relatedPosts={relatedPosts}
    >
      <MDXRemote {...source} components={components} />
    </PostLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fetchPostContent().map(it => "/posts/" + it.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.post as string;
  const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object }
  });
  const mdxSource = await serialize(content, {
    scope: data,
    // GFM adds table, strikethrough and task-list support.
    mdxOptions: { remarkPlugins: [remarkGfm] },
  });

  const current = slugToPostContent[slug] as PostContent;
  const tags: string[] = data.tags ?? [];
  const others = fetchPostContent().filter((it) => it.slug !== slug);
  const byTag = others.filter(
    (it) => it.tags && it.tags.some((t) => tags.includes(t))
  );
  // Prefer tag matches, then top up with recent posts so the grid stays full.
  const relatedPosts = [
    ...byTag,
    ...others.filter((it) => !byTag.includes(it)),
  ].slice(0, 3);

  return {
    props: {
      title: data.title,
      dateString: data.date,
      slug: data.slug,
      // Fall back to the generated excerpt so meta tags are never empty.
      description: data.description ?? current.excerpt,
      standfirst: data.standfirst ?? data.description ?? null,
      tags: data.tags,
      author: data.author,
      readTimeMinutes: current.readTimeMinutes,
      relatedPosts,
      source: mdxSource
    },
  };
};

