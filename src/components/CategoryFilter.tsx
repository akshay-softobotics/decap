import { TagContent } from "../lib/tags";

type Props = {
  tags: TagContent[];
  active: string | null;
  onChange: (slug: string | null) => void;
};

export default function CategoryFilter({ tags, active, onChange }: Props) {
  return (
    <div className="filter" role="tablist" aria-label="Filter posts by category">
      <button
        type="button"
        role="tab"
        aria-selected={active === null}
        className={active === null ? "pill active" : "pill"}
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
          className={active === tag.slug ? "pill active" : "pill"}
          onClick={() => onChange(tag.slug)}
        >
          {tag.name}
        </button>
      ))}
      <style jsx>{`
        .filter {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .pill {
          font-family: var(--font-body);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-muted);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 999px;
          padding: 0.55em 1.2em;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          text-transform: capitalize;
        }
        .pill:hover {
          border-color: var(--color-accent);
          color: var(--color-ink);
        }
        .pill.active {
          background: var(--color-ink);
          border-color: var(--color-ink);
          color: var(--color-paper);
        }
      `}</style>
    </div>
  );
}
