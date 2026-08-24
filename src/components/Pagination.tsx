import { generatePagination } from "../lib/pagination";
import Link from "next/link";

type Props = {
  current: number;
  pages: number;
  link: {
    href: (page: number) => string;
  };
};
export default function Pagination({ current, pages, link }: Props) {
  const pagination = generatePagination(current, pages);
  return (
    <ul>
      {pagination.map((it, i) => (
        <li key={i}>
          {it.excerpt ? (
            "..."
          ) : (
            <Link
              href={link.href(it.page)}
              className={
                it.page === current ? "pagination-link pagination-active" : "pagination-link"
              }
            >
              {it.page}
            </Link>
          )}
        </li>
      ))}
      <style jsx>{`
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          font-family: var(--font-mono);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        li {
          display: inline-block;
          color: var(--color-muted);
          font-size: 0.875rem;
        }
      `}</style>
      <style jsx global>{`
        .pagination-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 2.25rem;
          height: 2.25rem;
          padding: 0 0.5rem;
          border-radius: var(--radius-sm);
          color: var(--color-muted);
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .pagination-link:hover {
          background: var(--color-accent-dim);
          color: var(--color-accent);
        }
        .pagination-active {
          background: var(--color-ink);
          color: var(--color-paper) !important;
          font-weight: 500;
        }
      `}</style>
    </ul>
  );
}
