type Day = { day: number; title: string; detail: string };

type Props = {
  title?: string;
  days: Day[];
};

export default function ItineraryTimeline({ title, days }: Props) {
  return (
    <div className="timeline">
      {title && <h3 className="tl-title">{title}</h3>}
      <ol>
        {days.map((d) => (
          <li key={d.day}>
            <span className="marker" aria-hidden="true">
              {d.day}
            </span>
            <div className="content">
              <span className="day-label">Day {d.day}</span>
              <h4>{d.title}</h4>
              <p>{d.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <style jsx>{`
        .tl-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.4rem;
          margin: 0 0 1.5rem;
        }
        ol {
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
        }
        ol::before {
          content: "";
          position: absolute;
          left: 1.1rem;
          top: 0.5rem;
          bottom: 0.5rem;
          width: 2px;
          background: linear-gradient(
            to bottom,
            var(--color-sky),
            var(--color-sun)
          );
        }
        li {
          position: relative;
          display: flex;
          gap: 1.1rem;
          padding-bottom: 1.5rem;
        }
        li:last-child {
          padding-bottom: 0;
        }
        .marker {
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          background: var(--color-ocean);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-weight: 800;
          box-shadow: 0 0 0 4px var(--color-paper);
        }
        .day-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 700;
          color: var(--color-ocean);
        }
        h4 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.1rem;
          margin: 0.15rem 0 0.25rem;
        }
        p {
          margin: 0;
          color: var(--color-muted);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
