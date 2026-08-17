import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import PostList from "../../components/PostList";
import config from "../../lib/config";
import {
  countPosts,
  fetchPostContent,
  listPostContent,
  PostContent,
} from "../../lib/posts";
import { listTags, TagContent } from "../../lib/tags";
import Head from "next/head";

type Props = {
  posts: PostContent[];
  allPosts: PostContent[];
  popularPosts: PostContent[];
  tagCounts: { tag: TagContent; count: number }[];
  pagination: {
    current: number;
    pages: number;
  };
};
export default function Index({
  posts,
  allPosts,
  popularPosts,
  tagCounts,
  pagination,
}: Props) {
  const url = "/posts";
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

export const getStaticProps: GetStaticProps = async () => {
  const posts = listPostContent(1, config.posts_per_page);
  const allPosts = fetchPostContent();
  const tags = listTags();
  const tagCounts = tags.map((tag) => ({ tag, count: countPosts(tag.slug) }));
  const pagination = {
    current: 1,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  };
  return {
    props: {
      posts,
      allPosts,
      popularPosts: allPosts.slice(0, 3),
      tagCounts,
      pagination,
    },
  };
};
