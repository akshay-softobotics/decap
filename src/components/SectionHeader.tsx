type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "paper" | "ink";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "paper",
}: Props) {
  return (
    <div className={`header ${align} ${tone}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <style jsx>{`
        .header {
          max-width: 40rem;
          margin-bottom: 2.5rem;
        }
        .header.center {
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }
        .header :global(.eyebrow) {
          margin-bottom: 1rem;
        }
        h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.75rem, 3.4vw, 2.5rem);
          line-height: 1.18;
          letter-spacing: -0.01em;
          margin: 0;
          color: var(--color-ink);
        }
        .ink h2 {
          color: var(--color-on-ink);
        }
        p {
          margin: 1rem 0 0;
          color: var(--color-muted);
          font-size: 1.0625rem;
          line-height: 1.6;
        }
        .ink p {
          color: var(--color-on-ink-muted);
        }
      `}</style>
    </div>
  );
}
