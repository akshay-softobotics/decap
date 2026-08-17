import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../../../components/Layout";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../components/meta/TwitterCardMeta";
import PostList from "../../../components/PostList";
import config from "../../../lib/config";
import {
  countPosts,
  fetchPostContent,
  listPostContent,
  PostContent,
} from "../../../lib/posts";
import { listTags, TagContent } from "../../../lib/tags";

type Props = {
  posts: PostContent[];
  allPosts: PostContent[];
  popularPosts: PostContent[];
  tagCounts: { tag: TagContent; count: number }[];
  page: number;
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Page({
  posts,
  allPosts,
  popularPosts,
  tagCounts,
  pagination,
  page,
}: Props) {
  const url = `/posts/page/${page}`;
  const title = "All posts";
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <PostList
        posts={posts}
        allPosts={allPosts}
        popularPosts={popularPosts}
        tagCounts={tagCounts}
        pagination={pagination}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params.page as string);
  const posts = listPostContent(page, config.posts_per_page);
  const allPosts = fetchPostContent();
  const tags = listTags();
  const tagCounts = tags.map((tag) => ({ tag, count: countPosts(tag.slug) }));
  const pagination = {
    current: page,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  };
  return {
    props: {
      page,
      posts,
      allPosts,
      popularPosts: allPosts.slice(0, 3),
      tagCounts,
      pagination,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = Math.ceil(countPosts() / config.posts_per_page);
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    params: { page: (it + 2).toString() },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};
