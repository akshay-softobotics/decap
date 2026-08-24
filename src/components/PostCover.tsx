import { PostContent } from "../lib/posts";
import { getTag } from "../lib/tags";

type Props = {
  post: PostContent;
  variant?: "card" | "thumb" | "large";
};

const PALETTES = [
  { from: "#3454D1", to: "#6C7FE0" },
  { from: "#1C1B1A", to: "#3A3937" },
  { from: "#E1622F", to: "#F2935F" },
  { from: "#146356", to: "#1F8A73" },
  { from: "#54586A", to: "#83879A" },
];

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

export default function PostCover({ post, variant = "card" }: Props) {
  const primaryTag = post.tags && post.tags.length > 0 ? getTag(post.tags[0]) : undefined;
  const label = (primaryTag?.name ?? post.title.split(" ")[0]).toUpperCase();
  const palette = PALETTES[hash(post.slug) % PALETTES.length];
  const isThumb = variant === "thumb";
  const isLarge = variant === "large";

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
    <div className={isThumb ? "cover thumb" : isLarge ? "cover large" : "cover"}>
      <span className="label">{isThumb ? label.slice(0, 2) : label}</span>
      <style jsx>{`
        .cover {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 16 / 10;
          border-radius: 0.25rem 0.25rem 0 0;
          background: linear-gradient(135deg, ${palette.from}, ${palette.to});
          overflow: hidden;
          position: relative;
        }
        .cover::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.16) 1.5px, transparent 1.5px);
          background-size: 16px 16px;
          opacity: 0.6;
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
        .label {
          position: relative;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.92);
          letter-spacing: 0.02em;
        }
        .cover.thumb .label {
          font-size: 0.8125rem;
        }
        .cover.large .label {
          font-size: 2.5rem;
        }
      `}</style>
    </div>
  );
}
