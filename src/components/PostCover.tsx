import { PostContent } from "../lib/posts";

type Props = {
  post: PostContent;
  variant?: "card" | "thumb" | "large";
};

export default function PostCover({ post, variant = "card" }: Props) {
  const initial = post.title.trim().charAt(0).toUpperCase() || "?";
  const isThumb = variant === "thumb";
  const isLarge = variant === "large";

  if (isLarge && !post.coverImage) {
    return null;
  }

  if (post.coverImage) {
    return (
      <div className={`cover image ${variant}`}>
        <img src={post.coverImage} alt="" />
        <style jsx>{`
          .cover {
            width: 100%;
            overflow: hidden;
            border-radius: 0.25rem 0.25rem 0 0;
          }
          .cover.thumb {
            aspect-ratio: 1 / 1;
            border-radius: 0.375rem;
            width: 2.75rem;
            flex-shrink: 0;
          }
          .cover.card {
            aspect-ratio: 16 / 10;
          }
          .cover.large {
            aspect-ratio: 16 / 9;
            border-radius: var(--radius-lg);
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={isThumb ? "cover plate thumb" : isLarge ? "cover plate large" : "cover plate"}>
      <span className="rule" aria-hidden="true" />
      <span className="initial">{initial}</span>
      <style jsx>{`
        .cover {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 16 / 10;
          border-radius: 0.25rem 0.25rem 0 0;
          overflow: hidden;
          position: relative;
        }
        .plate {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
        }
        .plate::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(28, 27, 26, 0.05) 1px, transparent 1px);
          background-size: 14px 14px;
          opacity: 0.7;
        }
        .rule {
          position: absolute;
          width: 2.25rem;
          height: 1px;
          background: var(--color-border);
          transform: translateY(1.9rem);
        }
        .cover.thumb {
          aspect-ratio: 1 / 1;
          border-radius: 0.375rem;
          width: 2.75rem;
          flex-shrink: 0;
        }
        .cover.large {
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-lg);
        }
        .initial {
          position: relative;
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 2.75rem;
          color: var(--color-border);
          letter-spacing: 0.01em;
        }
        .cover.thumb .rule {
          display: none;
        }
        .cover.thumb .initial {
          font-size: 1.1rem;
        }
        .cover.large .rule {
          transform: translateY(3.2rem);
          width: 3rem;
        }
        .cover.large .initial {
          font-size: 4.5rem;
        }
      `}</style>
    </div>
  );
}
