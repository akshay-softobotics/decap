type Props = {
  name: string;
  className?: string;
};

const PATHS: Record<string, React.ReactNode> = {
  consulting: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" strokeLinejoin="round" />
      <path d="M12 3v18M4 7.5l8 4.5 8-4.5" strokeLinejoin="round" />
    </>
  ),
  digital: (
    <>
      <rect x="3.5" y="4.5" width="17" height="12" rx="1.5" />
      <path d="M8 20h8M12 16.5V20" strokeLinecap="round" />
    </>
  ),
  strategy: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  technology: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M12 1.5V4M12 20v2.5M1.5 12H4M20 12h2.5" strokeLinecap="round" />
    </>
  ),
  design: (
    <>
      <path d="M4 16.5L14.5 6a2 2 0 0 1 3 3L7 19l-4 1 1-3.5z" strokeLinejoin="round" strokeLinecap="round" />
    </>
  ),
  development: (
    <>
      <path d="M8.5 8l-5 4.5 5 4.5M15.5 8l5 4.5-5 4.5M13.5 5.5l-3 13" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export default function ServiceIcon({ name, className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {PATHS[name] ?? PATHS.strategy}
    </svg>
  );
}
