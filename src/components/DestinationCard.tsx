import Link from "next/link";
import Image from "next/image";
import { Destination } from "../lib/site";

type Props = {
  destination: Destination;
  /** feature = large editorial tile; default = standard card */
  variant?: "feature" | "default";
};

export default function DestinationCard({
  destination,
  variant = "default",
}: Props) {
  const isFeature = variant === "feature";
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={`dest-card ${isFeature ? "feature" : ""} arrow-parent`}
    >
      <div className="img">
        <Image
          src={destination.image}
          alt={`${destination.name} — ${destination.region}`}
          fill
          sizes={isFeature ? "(max-width: 900px) 100vw, 60vw" : "(max-width: 900px) 100vw, 30vw"}
          style={{ objectFit: "cover" }}
        />
        <span className="badge">{destination.bestFor}</span>
        <div className="overlay">
          <div className="head">
            <h3>{destination.name}</h3>
            <span className="region">{destination.region}</span>
          </div>
          {isFeature && <p className="blurb">{destination.blurb}</p>}
          <div className="facts">
            <span>
              <em>Ages</em> {destination.ageRange}
            </span>
            <span>
              <em>Trip</em> {destination.duration}
            </span>
            <span className="explore">
              Explore <span className="arrow" aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .img {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 15rem;
          overflow: hidden;
        }
        .img :global(img) {
          transition: transform 0.55s ease;
        }
        .badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 2;
          background: rgba(255, 255, 255, 0.92);
          color: var(--color-ink);
          font-weight: 700;
          font-size: 0.75rem;
          padding: 0.35rem 0.7rem;
          border-radius: var(--radius-pill);
          backdrop-filter: blur(4px);
        }
        .overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.25rem;
          color: #fff;
          background: linear-gradient(
            to top,
            rgba(15, 42, 67, 0.85) 0%,
            rgba(15, 42, 67, 0.25) 45%,
            transparent 75%
          );
        }
        .head {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        h3 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: ${isFeature ? "2rem" : "1.4rem"};
          margin: 0;
          line-height: 1.05;
        }
        .region {
          font-size: 0.85rem;
          opacity: 0.85;
        }
        .blurb {
          margin: 0.6rem 0 0;
          max-width: 32rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
        }
        .facts {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-top: 0.9rem;
          font-size: 0.9rem;
          flex-wrap: wrap;
        }
        .facts em {
          font-style: normal;
          opacity: 0.7;
          margin-right: 0.25rem;
        }
        .explore {
          margin-left: auto;
          font-weight: 700;
          color: var(--color-sun);
        }
      `}</style>
      <style jsx global>{`
        .dest-card {
          display: block;
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          color: #fff;
          height: 100%;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .dest-card:hover {
          color: #fff;
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .dest-card:hover .img :global(img) {
          transform: scale(1.06);
        }
        .dest-card.feature {
          min-height: 26rem;
        }
      `}</style>
    </Link>
  );
}
