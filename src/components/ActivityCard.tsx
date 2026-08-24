import Link from "next/link";
import Image from "next/image";
import { Activity } from "../lib/site";

type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  return (
    <Link href="/destinations" className="act-card">
      <div className="img">
        <Image
          src={activity.image}
          alt={activity.name}
          fill
          sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 22vw"
          style={{ objectFit: "cover" }}
        />
        <span className="badge">{activity.badge}</span>
      </div>
      <h3>{activity.name}</h3>
      <style jsx>{`
        .img {
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .img :global(img) {
          transition: transform 0.5s ease;
        }
        .badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          background: rgba(255, 255, 255, 0.92);
          color: var(--color-ink);
          font-weight: 700;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-pill);
        }
        h3 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.02rem;
          margin: 0.85rem 0 0;
          text-align: center;
        }
      `}</style>
      <style jsx global>{`
        .act-card {
          display: block;
          color: var(--color-ink);
        }
        .act-card:hover {
          color: var(--color-ocean);
        }
        .act-card:hover .img :global(img) {
          transform: scale(1.08);
        }
      `}</style>
    </Link>
  );
}
