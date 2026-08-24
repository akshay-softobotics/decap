import { PostContent } from "../lib/posts";
import BlogCard from "./BlogCard";
import SectionHeader from "./SectionHeader";

type Props = {
  posts: PostContent[];
  title?: string;
};

export default function RelatedPosts({ posts, title = "You may also like" }: Props) {
  if (posts.length === 0) {
    return null;
  }
  return (
    <section className="related">
      <div className="inner">
        <SectionHeader eyebrow="Keep reading" title={title} />
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .related {
          margin-top: 5rem;
          padding: 4rem 1.5rem;
          border-top: 1px solid var(--color-border);
        }
        .inner {
          max-width: var(--content-width);
          margin: 0 auto;
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
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
      `}</style>
    </section>
  );
}
