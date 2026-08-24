import Link from "next/link";

type Crumb = { label: string; href?: string };

type Props = {
  items: Crumb[];
};

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i}>
              {item.href && !last ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current={last ? "page" : undefined}>{item.label}</span>
              )}
              {!last && <span className="sep" aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
      <style jsx>{`
        .crumbs ol {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          padding: 0;
          font-size: 0.875rem;
        }
        li {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        li :global(a) {
          color: var(--color-muted);
          font-weight: 600;
        }
        li :global(a:hover) {
          color: var(--color-ocean);
        }
        li span[aria-current] {
          color: var(--color-ink);
          font-weight: 700;
        }
        .sep {
          color: var(--color-border);
        }
      `}</style>
    </nav>
  );
}
