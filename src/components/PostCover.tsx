import Image from "next/image";
import { PostContent } from "../lib/posts";
import { IMAGES } from "../lib/images";

type Props = {
  post: PostContent;
  variant?: "card" | "thumb" | "feature";
};

const POOL = [
  IMAGES.blog_beach,
  IMAGES.blog_road,
  IMAGES.blog_food,
  IMAGES.blog_outdoors,
  IMAGES.blog_city,
  IMAGES.blog_default,
  IMAGES.dest_hawaii,
  IMAGES.dest_newyork,
];

const TAG_THEME: Record<string, string> = {
  beach: IMAGES.blog_beach,
  "road-trips": IMAGES.blog_road,
  road: IMAGES.blog_road,
  packing: IMAGES.blog_road,
  food: IMAGES.blog_food,
  activities: IMAGES.blog_outdoors,
  outdoors: IMAGES.blog_outdoors,
  hiking: IMAGES.blog_outdoors,
  destinations: IMAGES.blog_city,
  city: IMAGES.blog_city,
};

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function coverImage(post: PostContent): string {
  const tags = post.tags ?? [];
  for (const tag of tags) {
    if (TAG_THEME[tag]) return TAG_THEME[tag];
  }
  return POOL[hash(post.slug) % POOL.length];
}

export default function PostCover({ post, variant = "card" }: Props) {
  const src = coverImage(post);
  const isThumb = variant === "thumb";
  const isFeature = variant === "feature";

  return (
    <div className={`cover ${variant}`}>
      <Image
        src={src}
        alt={post.title}
        fill
        sizes={
          isThumb
            ? "48px"
            : isFeature
            ? "(max-width: 900px) 100vw, 55vw"
            : "(max-width: 640px) 100vw, 33vw"
        }
        style={{ objectFit: "cover" }}
      />
      <style jsx>{`
        .cover {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--color-surface-2);
        }
        .cover :global(img) {
          transition: transform 0.55s ease;
        }
        .cover.thumb {
          aspect-ratio: 1 / 1;
          width: 3rem;
          flex-shrink: 0;
          border-radius: var(--radius-sm);
        }
        .cover.feature {
          aspect-ratio: auto;
          height: 100%;
          min-height: 16rem;
        }
      `}</style>
    </div>
  );
}
