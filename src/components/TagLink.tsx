import Link from "next/link";
import { TagContent } from "../lib/tags";

type Props = {
  tag: TagContent;
};
export default function Tag({ tag }: Props) {
  return (
    <>
      <Link href={`/posts/tags/${tag.slug}`} className="tag-link">
        {tag.name}
      </Link>
      <style jsx global>{`
        .tag-link {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--color-accent);
          background-color: var(--color-accent-dim);
          border-radius: 3px;
          padding: 0.2em 0.55em;
        }
        .tag-link::before {
          content: "#";
          opacity: 0.6;
        }
        .tag-link:hover {
          background-color: var(--color-accent);
          color: #fff;
        }
      `}</style>
    </>
  );
}
