import { Testimonial } from "../lib/site";

type Props = {
  review: Testimonial;
};

export default function ReviewCard({ review }: Props) {
  return (
    <figure className="review">
      <div className="stars" aria-label="5 out of 5 stars">
        {"★★★★★"}
      </div>
      <blockquote>“{review.quote}”</blockquote>
      <figcaption>
        <span className="avatar" aria-hidden="true">
          {review.avatar}
        </span>
        <span className="who">
          <strong>{review.name}</strong>
          <span>{review.location}</span>
        </span>
      </figcaption>
      <style jsx>{`
        .review {
          margin: 0;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .stars {
          color: var(--color-sun);
          letter-spacing: 0.12em;
          font-size: 1rem;
        }
        blockquote {
          margin: 0.9rem 0 1.5rem;
          font-size: 1.05rem;
          line-height: 1.6;
          color: var(--color-ink);
          flex: 1 1 auto;
        }
        figcaption {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-sky), var(--color-ocean));
          color: #fff;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.95rem;
          flex-shrink: 0;
        }
        .who {
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }
        .who strong {
          font-weight: 700;
        }
        .who span {
          color: var(--color-muted);
          font-size: 0.9rem;
        }
      `}</style>
    </figure>
  );
}
