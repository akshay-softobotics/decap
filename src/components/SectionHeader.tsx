import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  link?: { href: string; label: string };
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  link,
  align = "left",
}: Props) {
  return (
    <div className={`sh ${align}`}>
      <div className="sh-copy">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
      {link && (
        <Link href={link.href} className="sh-link arrow-parent">
          {link.label} <span className="arrow" aria-hidden="true">→</span>
        </Link>
      )}
      <style jsx>{`
        .sh {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 2.25rem;
        }
        .sh.center {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .sh-copy {
          max-width: 42rem;
        }
        .sh.center .sh-copy {
          margin: 0 auto;
        }
        h2 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          line-height: 1.1;
          margin: 0.5rem 0 0;
          letter-spacing: -0.01em;
        }
        p {
          margin: 0.85rem 0 0;
          color: var(--color-muted);
          font-size: 1.05rem;
          line-height: 1.6;
        }
        .sh-link {
          flex-shrink: 0;
          font-weight: 700;
          color: var(--color-ocean);
          white-space: nowrap;
          padding-bottom: 0.35rem;
        }
        @media (max-width: 640px) {
          .sh {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
