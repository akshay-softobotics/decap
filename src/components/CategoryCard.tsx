import Link from "next/link";
import Image from "next/image";
import { Category } from "../lib/site";

type Props = {
  category: Category;
};

export default function CategoryCard({ category }: Props) {
  return (
    <Link
      href={`/destinations?type=${category.slug}`}
      className="cat-card arrow-parent"
    >
      <div className="img">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
          style={{ objectFit: "cover" }}
        />
        <span className="tint" style={{ background: category.tint }} aria-hidden="true" />
      </div>
      <div className="body">
        <h3>{category.name}</h3>
        <p>{category.description}</p>
        <span className="go">
          Explore <span className="arrow" aria-hidden="true">→</span>
        </span>
      </div>
      <style jsx>{`
        .img {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }
        .img :global(img) {
          transition: transform 0.5s ease;
        }
        .tint {
          position: absolute;
          inset: auto 0 0 0;
          height: 40%;
          opacity: 0;
          mix-blend-mode: multiply;
          transition: opacity 0.3s ease;
        }
        .body {
          padding: 1.1rem 1.25rem 1.35rem;
        }
        h3 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.2rem;
          margin: 0;
        }
        p {
          margin: 0.4rem 0 0.9rem;
          color: var(--color-muted);
          font-size: 0.92rem;
          line-height: 1.5;
        }
        .go {
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--color-ocean);
        }
      `}</style>
      <style jsx global>{`
        .cat-card {
          display: block;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          color: var(--color-ink);
          box-shadow: var(--shadow-sm);
          transition: transform 0.25s ease, box-shadow 0.25s ease,
            border-color 0.25s ease;
          height: 100%;
        }
        .cat-card:hover {
          color: var(--color-ink);
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: transparent;
        }
        .cat-card:hover .img :global(img) {
          transform: scale(1.06);
        }
        .cat-card:hover .tint {
          opacity: 0.35;
        }
      `}</style>
    </Link>
  );
}
