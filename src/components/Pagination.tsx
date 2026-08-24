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
    <nav aria-label="Pagination">
      <ul>
        {current > 1 && (
          <li>
            <Link
              href={link.href(current - 1)}
              className="pagination-link pagination-nav"
              aria-label="Previous page"
            >
              ←
            </Link>
          </li>
        )}
        {pagination.map((it, i) => (
          <li key={i}>
            {it.excerpt ? (
              <span className="pagination-gap">…</span>
            ) : (
              <Link
                href={link.href(it.page)}
                className={
                  it.page === current
                    ? "pagination-link pagination-active"
                    : "pagination-link"
                }
                aria-current={it.page === current ? "page" : undefined}
              >
                {it.page}
              </Link>
            )}
          </li>
        ))}
        {current < pages && (
          <li>
            <Link
              href={link.href(current + 1)}
              className="pagination-link pagination-nav"
              aria-label="Next page"
            >
              →
            </Link>
          </li>
        )}
      </ul>
      <style jsx>{`
        ul {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.4rem;
          margin: 0;
          padding: 0;
        }
        li {
          display: inline-flex;
        }
        .pagination-gap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 2.4rem;
          height: 2.4rem;
          color: var(--color-muted);
        }
      `}</style>
      <style jsx global>{`
        .pagination-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 2.4rem;
          height: 2.4rem;
          padding: 0 0.6em;
          box-sizing: border-box;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-pill);
          background: var(--color-surface);
          color: var(--color-muted);
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.95rem;
          line-height: 1;
          transition: background-color 0.2s ease, color 0.2s ease,
            border-color 0.2s ease, transform 0.2s ease;
        }
        .pagination-link:hover {
          color: var(--color-ocean);
          border-color: var(--color-ocean);
          transform: translateY(-2px);
        }
        .pagination-active,
        .pagination-active:hover {
          background: var(--color-ocean);
          border-color: var(--color-ocean);
          color: #fff;
        }
      `}</style>
    </nav>
  );
}
