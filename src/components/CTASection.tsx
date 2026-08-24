import Link from "next/link";

type Props = {
  title: string;
  text?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
};

export default function CTASection({ title, text, primary, secondary }: Props) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta">
          <div className="cta-copy">
            <h2>{title}</h2>
            {text && <p>{text}</p>}
          </div>
          <div className="cta-actions">
            <Link href={primary.href} className="btn btn-primary arrow-parent">
              {primary.label} <span className="arrow" aria-hidden="true">→</span>
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn btn-secondary">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          background: linear-gradient(135deg, var(--color-ocean), var(--color-sky));
          border-radius: var(--radius-xl);
          padding: clamp(2rem, 5vw, 3.5rem);
          color: #fff;
          box-shadow: var(--shadow-lg);
        }
        h2 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.5rem, 3.5vw, 2.3rem);
          margin: 0;
        }
        p {
          margin: 0.6rem 0 0;
          font-size: 1.05rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.92);
          max-width: 32rem;
        }
        .cta-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
      `}</style>
    </section>
  );
}
