import Link from "next/link";
import ServiceIcon from "./ServiceIcon";
import { ServiceContent } from "../lib/services";

type Props = {
  service: ServiceContent;
};

export default function ServiceCard({ service }: Props) {
  return (
    <article className="card">
      <div className="icon-tile">
        <ServiceIcon name={service.icon} className="icon" />
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <Link href={`/services#${service.slug}`} className="learn-more">
        Learn more
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <style jsx>{`
        .card {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 2rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out),
            border-color 0.2s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-accent);
        }
        .icon-tile {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          border-radius: var(--radius-sm);
          background: var(--color-accent-dim);
          margin-bottom: 1.5rem;
        }
        .icon-tile :global(.icon) {
          width: 1.5rem;
          height: 1.5rem;
          color: var(--color-accent);
        }
        h3 {
          margin: 0 0 0.6rem;
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-ink);
        }
        p {
          margin: 0 0 1.5rem;
          color: var(--color-muted);
          font-size: 0.9375rem;
          line-height: 1.6;
          flex: 1 0 auto;
        }
        :global(.learn-more) {
          display: inline-flex;
          align-items: center;
          gap: 0.4em;
          font-weight: 500;
          font-size: 0.9375rem;
          color: var(--color-accent);
          align-self: flex-start;
        }
        :global(.learn-more) svg {
          width: 1em;
          height: 1em;
          transition: transform 0.2s ease;
        }
        .card:hover :global(.learn-more) svg {
          transform: translateX(3px);
        }
      `}</style>
    </article>
  );
}
