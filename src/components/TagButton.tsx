import Link from "next/link";
import { TagContent } from "../lib/tags";

type Props = {
  tag: TagContent;
};
export default function TagButton({ tag }: Props) {
  return (
    <>
      <Link href={`/posts/tags/${tag.slug}`} className="tag-button">
        {tag.name}
      </Link>
      <style jsx global>{`
        .tag-button {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          border-radius: 3px;
          background-color: var(--color-accent-dim);
          color: var(--color-accent);
          transition: background-color 0.2s ease, color 0.2s ease;
          padding: 0.25em 0.55em;
        }
        .tag-button::before {
          content: "#";
          opacity: 0.6;
        }
        .tag-button:active,
        .tag-button:hover {
          background-color: var(--color-accent);
          color: #fff;
        }
      `}</style>
    </>
  );
}
