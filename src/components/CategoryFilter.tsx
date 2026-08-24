import { TagContent } from "../lib/tags";

type Props = {
  tags: TagContent[];
  active: string | null;
  onChange: (slug: string | null) => void;
};

export default function CategoryFilter({ tags, active, onChange }: Props) {
  return (
    <div className="filter-wrap">
      <nav className="filter" role="tablist" aria-label="Filter posts by category">
        <button
          type="button"
          role="tab"
          aria-selected={active === null}
          className={active === null ? "link active" : "link"}
          onClick={() => onChange(null)}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag.slug}
            type="button"
            role="tab"
            aria-selected={active === tag.slug}
            className={active === tag.slug ? "link active" : "link"}
            onClick={() => onChange(tag.slug)}
          >
            {tag.name}
          </button>
        ))}
      </nav>
      <style jsx>{`
        .filter-wrap {
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .filter {
          display: flex;
          align-items: center;
          gap: 2rem;
          overflow-x: auto;
          white-space: nowrap;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .filter::-webkit-scrollbar {
          display: none;
        }
        .link {
          position: relative;
          flex-shrink: 0;
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--color-muted);
          background: transparent;
          border: none;
          padding: 1.1em 0;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 100%;
          bottom: 0;
          height: 2px;
          background: var(--color-ink);
          transition: right 220ms var(--ease-out);
        }
        .link:hover {
          color: var(--color-ink);
        }
        .link.active {
          color: var(--color-ink);
        }
        .link.active::after {
          right: 0;
        }
      `}</style>
    </div>
  );
}
