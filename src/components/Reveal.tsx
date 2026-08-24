import { useReveal } from "../lib/useReveal";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
};

export default function Reveal({ children, delay = 0, className = "", as = "div" }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
