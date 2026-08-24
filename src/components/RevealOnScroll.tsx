import React, { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  /** delay in ms before the reveal transition starts */
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

// Lightweight IntersectionObserver reveal. Adds `.is-visible` (see global.css
// `.reveal`) once the element scrolls into view. Respects reduced-motion via CSS.
export default function RevealOnScroll({
  children,
  delay = 0,
  className = "",
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
