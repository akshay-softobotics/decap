import Link from "next/link";

type CTA = { label: string; href: string };

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  visual?: React.ReactNode;
  compact?: boolean;
};

export default function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  visual,
  compact = false,
}: Props) {
  return (
    <section className={`hero ${compact ? "compact" : ""}`}>
      <div className="copy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {(primaryCta || secondaryCta) && (
          <div className="actions">
            {primaryCta && (
              <Link href={primaryCta.href} className="btn-primary">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn-secondary">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
      {visual && <div className="visual">{visual}</div>}
      <style jsx>{`
        .hero {
          max-width: var(--content-width);
          margin: 0 auto;
          padding: 4.5rem 1.5rem 4rem;
          display: flex;
          flex-direction: column;
          gap: 3rem;
          align-items: center;
        }
        .hero.compact {
          padding: 3.25rem 1.5rem 2.75rem;
        }
        .copy {
          max-width: 34rem;
          text-align: center;
        }
        .copy :global(.eyebrow) {
          margin-bottom: 1.25rem;
        }
        h1 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(2.25rem, 5.5vw, 3.5rem);
          line-height: 1.12;
          letter-spacing: -0.015em;
          margin: 0;
          color: var(--color-ink);
        }
        p {
          margin: 1.25rem 0 0;
          color: var(--color-muted);
          font-size: 1.125rem;
          line-height: 1.65;
        }
        .actions {
          margin-top: 2rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .visual {
          width: 100%;
          max-width: 30rem;
        }

        @media (min-width: 900px) {
          .hero {
            flex-direction: row;
            text-align: left;
            padding-top: 5.5rem;
            padding-bottom: 5rem;
          }
          .copy {
            text-align: left;
            flex: 1 1 26rem;
          }
          .actions {
            justify-content: flex-start;
          }
          .visual {
            flex: 1 1 22rem;
          }
        }
      `}</style>
    </section>
  );
}
