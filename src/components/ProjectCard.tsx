import Link from "next/link";
import { ProjectContent } from "../lib/projects";

type Props = {
  project: ProjectContent;
};

const PALETTES = [
  { from: "#3454D1", to: "#6C7FE0" },
  { from: "#1C1B1A", to: "#3A3937" },
  { from: "#E1622F", to: "#F2935F" },
  { from: "#146356", to: "#1F8A73" },
];

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

export default function ProjectCard({ project }: Props) {
  const palette = PALETTES[hash(project.slug) % PALETTES.length];

  return (
    <article className="card">
      <div className="cover" aria-hidden="true">
        <span className="mark">{project.title.charAt(0)}</span>
      </div>
      <div className="body">
        <span className="category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <Link href="/contact" className="view-link">
          View Project
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
      <style jsx>{`
        .card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out),
            border-color 0.2s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-accent);
        }
        .cover {
          aspect-ratio: 16 / 10;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, ${palette.from}, ${palette.to});
          position: relative;
          overflow: hidden;
        }
        .cover::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.16) 1.5px, transparent 1.5px);
          background-size: 16px 16px;
          opacity: 0.6;
        }
        .mark {
          position: relative;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 2.25rem;
          color: rgba(255, 255, 255, 0.92);
        }
        .body {
          display: flex;
          flex-direction: column;
          flex: 1 0 auto;
          padding: 1.5rem;
        }
        .category {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-accent);
        }
        h3 {
          margin: 0.6rem 0 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.1875rem;
          color: var(--color-ink);
        }
        p {
          margin: 0.6rem 0 0;
          color: var(--color-muted);
          font-size: 0.9375rem;
          line-height: 1.6;
          flex: 1 0 auto;
        }
        :global(.view-link) {
          display: inline-flex;
          align-items: center;
          gap: 0.4em;
          margin-top: 1.25rem;
          font-weight: 500;
          font-size: 0.9375rem;
          color: var(--color-accent);
          align-self: flex-start;
        }
        :global(.view-link) svg {
          width: 1em;
          height: 1em;
          transition: transform 0.2s ease;
        }
        .card:hover :global(.view-link) svg {
          transform: translateX(3px);
        }
      `}</style>
    </article>
  );
}
