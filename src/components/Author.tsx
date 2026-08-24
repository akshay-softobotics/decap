import { AuthorContent } from "../lib/authors";

type Props = {
  author: AuthorContent;
  withAvatar?: boolean;
};
export default function Author({ author, withAvatar = false }: Props) {
  return (
    <span className="author">
      {withAvatar && (
        <span className="avatar" aria-hidden="true">
          {author.name.charAt(0)}
        </span>
      )}
      <span className="name">{author.name}</span>
      <style jsx>
        {`
          .author {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
          }
          .avatar {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.75rem;
            height: 1.75rem;
            border-radius: var(--radius-sm);
            background: var(--color-accent-dim);
            color: var(--color-accent);
            font-family: var(--font-display);
            font-weight: 600;
            font-size: 0.8125rem;
            flex-shrink: 0;
          }
          .name {
            font-family: var(--font-mono);
            font-size: 0.8125rem;
            color: var(--color-muted);
          }
        `}
      </style>
    </span>
  );
}
