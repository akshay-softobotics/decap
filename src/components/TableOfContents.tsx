import { useEffect, useState } from "react";

export type Heading = { id: string; text: string; depth: number };

type Props = {
  headings: Heading[];
};

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) {
      return;
    }
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="toc" aria-label="Table of contents">
      <span className="label">On this page</span>
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={`depth-${h.depth}`}>
            <a
              href={`#${h.id}`}
              className={activeId === h.id ? "active" : ""}
              aria-current={activeId === h.id ? "location" : undefined}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .toc {
          position: sticky;
          top: 6rem;
        }
        .label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-muted);
          margin-bottom: 1rem;
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          border-left: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
        }
        li {
          margin: 0;
        }
        .depth-3 a {
          padding-left: 1.5rem;
          font-size: 0.8125rem;
        }
        a {
          display: block;
          padding: 0.4rem 0 0.4rem 1rem;
          margin-left: -1px;
          border-left: 2px solid transparent;
          color: var(--color-muted);
          font-size: 0.875rem;
          line-height: 1.4;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        a:hover {
          color: var(--color-ink);
        }
        a.active {
          color: var(--color-accent);
          border-left-color: var(--color-accent);
          font-weight: 500;
        }
      `}</style>
    </nav>
  );
}
