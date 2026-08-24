import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  cta: { label: string; href: string };
};

export default function CTASection({ eyebrow, title, description, cta }: Props) {
  return (
    <section className="band">
      <div className="inner">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
        <Link href={cta.href} className="cta">
          {cta.label}
        </Link>
      </div>
      <style jsx>{`
        .band {
          background: var(--color-ink-section);
          margin-top: 6rem;
        }
        .inner {
          max-width: 42rem;
          margin: 0 auto;
          padding: 5rem 1.5rem;
          text-align: center;
        }
        .inner :global(.eyebrow) {
          margin-bottom: 1.25rem;
        }
        h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.875rem, 4vw, 2.75rem);
          line-height: 1.2;
          color: var(--color-on-ink);
          margin: 0;
        }
        p {
          margin: 1.25rem 0 0;
          color: var(--color-on-ink-muted);
          font-size: 1.0625rem;
          line-height: 1.6;
        }
        :global(.cta) {
          display: inline-flex;
          margin-top: 2.25rem;
          background: var(--color-cta);
          color: #fff;
          font-weight: 500;
          padding: 0.9em 2em;
          border-radius: var(--radius-sm);
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        :global(.cta:hover) {
          background: var(--color-cta-hover);
          color: #fff;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
