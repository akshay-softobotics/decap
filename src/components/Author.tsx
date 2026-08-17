import { AuthorContent } from "../lib/authors";

type Props = {
  author: AuthorContent;
};
export default function Author({ author }: Props) {
  return (
    <>
      <span>{author.name}</span>
      <style jsx>
        {`
          span {
            font-family: var(--font-mono);
            font-size: 0.8125rem;
            color: var(--color-muted);
          }
        `}
      </style>
    </>
  );
}
