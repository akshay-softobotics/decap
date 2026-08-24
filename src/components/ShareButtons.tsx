import { useState } from "react";

type Props = {
  url: string;
  title: string;
};

export default function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — link stays selectable via the URL bar.
    }
  }

  return (
    <div className="share">
      <span className="label">Share</span>
      <button type="button" onClick={copyLink} className="icon-btn" aria-label="Copy article link">
        {copied ? (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 10.5L10.5 6M7 4l.7-.7a2.5 2.5 0 013.5 3.5L10.5 7.5M9 12l-.7.7a2.5 2.5 0 01-3.5-3.5L5.5 8.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <a
        className="icon-btn"
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on X"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" stroke="none">
          <path d="M9.53 6.78L14.9 1h-1.27l-4.66 5.02L5.13 1H.5l5.63 7.87L.5 15h1.27l4.93-5.31L10.87 15h4.63L9.53 6.78zM7.78 8.94l-.57-.78L2.65 1.9h1.95l3.66 5.04.57.78 4.76 6.55h-1.95L7.78 8.94z" />
        </svg>
      </a>
      <a
        className="icon-btn"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on LinkedIn"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" stroke="none">
          <path d="M3.6 5.5H.7V15h2.9V5.5zM2.15 4.25c.93 0 1.5-.62 1.5-1.4C3.63 2.06 3.08 1.5 2.17 1.5S.65 2.06.65 2.85c0 .78.55 1.4 1.5 1.4zM15.3 15h-2.9v-5.1c0-1.28-.46-2.15-1.6-2.15-.88 0-1.4.6-1.63 1.17-.08.2-.1.49-.1.78V15h-2.9s.04-8.6 0-9.5h2.9v1.35c.39-.6 1.08-1.45 2.62-1.45 1.91 0 3.35 1.25 3.35 3.94V15z" />
        </svg>
      </a>
      <style jsx>{`
        .share {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-muted);
          margin-right: 0.25rem;
        }
        .icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          color: var(--color-ink);
          background: var(--color-surface);
          cursor: pointer;
          transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }
        .icon-btn:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }
        .icon-btn svg {
          width: 0.85rem;
          height: 0.85rem;
        }
      `}</style>
    </div>
  );
}
