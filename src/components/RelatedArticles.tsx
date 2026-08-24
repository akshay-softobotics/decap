import { PostContent } from "../lib/posts";
import PostItem from "./PostItem";

type Props = {
  posts: PostContent[];
  title?: string;
};

export default function RelatedArticles({
  posts,
  title = "More family travel ideas",
}: Props) {
  if (posts.length === 0) return null;
  return (
    <section className="related">
      <h2>{title}</h2>
      <div className="grid">
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </div>
      <style jsx>{`
        .related {
          border-top: 1px solid var(--color-border);
          padding-top: 2.5rem;
          margin-top: 3rem;
        }
        h2 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.4rem, 3vw, 2rem);
          margin: 0 0 1.75rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 560px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <style jsx global>{`
        /* These columns are too narrow for the "Read →" affordance; dropping it
           gives the byline room to show a full name instead of an ellipsis. */
        .related .post-item-link .more {
          display: none;
        }
        /* The avatar is decorative and repeats across the row; its width is
           better spent letting the byline show a full name. */
        .related .post-item-link .author .avatar {
          display: none;
        }
      `}</style>
    </section>
  );
}
