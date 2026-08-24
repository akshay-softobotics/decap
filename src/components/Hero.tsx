import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "../lib/images";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="copy">
          <span className="badge">
            <span className="dot" aria-hidden="true" /> Family travel, made simple
          </span>
          <h1>
            Big adventures.<br />
            Happy kids.<br />
            <span className="accent">Better vacations.</span>
          </h1>
          <p>
            Discover family-friendly destinations, activities, travel tips and
            vacation ideas designed to make planning your next adventure easier.
          </p>
          <div className="actions">
            <Link href="/destinations" className="btn btn-primary arrow-parent">
              Explore Destinations <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/#discover" className="btn btn-secondary">
              Get Vacation Ideas
            </Link>
          </div>
          <div className="stats">
            <div>
              <strong>50+</strong>
              <span>Family destinations</span>
            </div>
            <div>
              <strong>200+</strong>
              <span>Kid-tested ideas</span>
            </div>
            <div>
              <strong>4.9★</strong>
              <span>Loved by parents</span>
            </div>
          </div>
        </div>

        <div className="art">
          <div className="photo photo-main">
            <Image
              src={IMAGES.hero}
              alt="A child with arms outstretched, full of excitement on a family trip"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="photo photo-inset">
            <Image
              src={IMAGES.heroSecondary}
              alt="A calm tropical beach perfect for families"
              fill
              sizes="200px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="chip chip-1">
            <span aria-hidden="true">🏖️</span> Beach days
          </div>
          <div className="chip chip-2">
            <span aria-hidden="true">🎢</span> Theme parks
          </div>

          <svg className="sun" viewBox="0 0 80 80" aria-hidden="true">
            <circle cx="40" cy="40" r="16" fill="var(--color-sun)" />
            {Array.from({ length: 8 }).map((_, i) => (
              <rect
                key={i}
                x="38.5"
                y="6"
                width="3"
                height="9"
                rx="1.5"
                fill="var(--color-sun)"
                transform={`rotate(${i * 45} 40 40)`}
              />
            ))}
          </svg>

          <svg className="path" viewBox="0 0 200 120" aria-hidden="true">
            <path
              d="M8 100 C 60 20, 140 20, 192 60"
              fill="none"
              stroke="var(--color-ocean)"
              strokeWidth="2.5"
              strokeDasharray="2 9"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          background: radial-gradient(
              120% 90% at 85% 0%,
              rgba(79, 176, 217, 0.16),
              transparent 55%
            ),
            radial-gradient(
              90% 80% at 0% 100%,
              rgba(255, 201, 77, 0.16),
              transparent 60%
            );
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 3rem;
          align-items: center;
          padding-top: 3.5rem;
          padding-bottom: 4rem;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          border-radius: var(--radius-pill);
          padding: 0.5rem 0.9rem;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--color-ink);
        }
        .badge .dot {
          width: 0.55rem;
          height: 0.55rem;
          border-radius: 50%;
          background: var(--color-green);
          box-shadow: 0 0 0 4px rgba(59, 178, 115, 0.2);
        }
        h1 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2.5rem, 6vw, 4rem);
          line-height: 1.02;
          letter-spacing: -0.02em;
          margin: 1.25rem 0 0;
        }
        .accent {
          color: var(--color-coral);
        }
        .copy > p {
          margin: 1.25rem 0 0;
          max-width: 32rem;
          color: var(--color-muted);
          font-size: 1.15rem;
          line-height: 1.6;
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          margin: 2rem 0 0;
        }
        .stats {
          display: flex;
          gap: 2.25rem;
          margin-top: 2.5rem;
          flex-wrap: wrap;
        }
        .stats strong {
          display: block;
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--color-ink);
        }
        .stats span {
          font-size: 0.9rem;
          color: var(--color-muted);
        }

        .art {
          position: relative;
          aspect-ratio: 1 / 1;
          min-height: 340px;
        }
        .photo {
          position: absolute;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .photo-main {
          inset: 6% 0 6% 8%;
          border-radius: var(--radius-xl);
          border: 6px solid #fff;
        }
        .photo-inset {
          width: 42%;
          aspect-ratio: 4 / 5;
          left: -4%;
          bottom: 4%;
          border-radius: var(--radius-lg);
          border: 5px solid #fff;
          z-index: 2;
        }
        .chip {
          position: absolute;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #fff;
          border-radius: var(--radius-pill);
          padding: 0.5rem 0.85rem;
          font-weight: 700;
          font-size: 0.85rem;
          box-shadow: var(--shadow-md);
        }
        .chip-1 {
          top: 10%;
          right: -2%;
        }
        .chip-2 {
          bottom: 20%;
          right: 4%;
        }
        .sun {
          position: absolute;
          top: -4%;
          left: 20%;
          width: 4.5rem;
          height: 4.5rem;
          animation: spin 26s linear infinite;
        }
        .path {
          position: absolute;
          bottom: -6%;
          right: 6%;
          width: 10rem;
          z-index: 1;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .art {
            order: -1;
            max-width: 30rem;
            margin: 0 auto;
            width: 100%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sun {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
