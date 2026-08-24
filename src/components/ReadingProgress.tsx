import { useEffect, useState } from "react";

type Props = {
  targetRef: React.RefObject<HTMLElement>;
};

export default function ReadingProgress({ targetRef }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = targetRef.current;
      if (!el) {
        return;
      }
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const pct = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setProgress(pct);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetRef]);

  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress-fill" style={{ transform: `scaleX(${progress})` }} />
      <style jsx>{`
        .progress-track {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: transparent;
          z-index: 35;
        }
        .progress-fill {
          height: 100%;
          width: 100%;
          background: var(--color-cta);
          transform-origin: left;
          transition: transform 80ms linear;
        }
      `}</style>
    </div>
  );
}
