import { AuthorContent } from "../lib/authors";

type Props = {
  member: AuthorContent;
};

export default function TeamCard({ member }: Props) {
  return (
    <div className="card">
      <span className="avatar" aria-hidden="true">
        {member.name.charAt(0)}
      </span>
      <h3>{member.name}</h3>
      <p>{member.introduction}</p>
      <style jsx>{`
        .card {
          text-align: center;
          padding: 2rem 1.5rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
        }
        .avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background: var(--color-accent-dim);
          color: var(--color-accent);
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.375rem;
          margin-bottom: 1rem;
        }
        h3 {
          margin: 0 0 0.5rem;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.125rem;
          color: var(--color-ink);
        }
        p {
          margin: 0;
          color: var(--color-muted);
          font-size: 0.875rem;
          line-height: 1.55;
        }
      `}</style>
    </div>
  );
}
