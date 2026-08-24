import { AuthorContent } from "../lib/authors";

type Props = {
  author: AuthorContent;
  /** Show a circular initial badge before the name. */
  withAvatar?: boolean;
};
export default function Author({ author, withAvatar = false }: Props) {
  if (!author) return null;
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
            gap: 0.5em;
          }
          .avatar {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.9rem;
            height: 1.9rem;
            border-radius: 50%;
            background: linear-gradient(
              140deg,
              var(--color-sky),
              var(--color-ocean)
            );
            color: #fff;
            font-family: var(--font-display);
            font-weight: 700;
            font-size: 0.85rem;
            line-height: 1;
          }
          .name {
            font-family: var(--font-body);
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--color-muted);
          }
        `}
      </style>
    </span>
  );
}
