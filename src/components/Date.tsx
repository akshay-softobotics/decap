import { format, formatISO } from "date-fns";

type Props = {
  date: Date;
};
export default function Date({ date }: Props) {
  return (
    <time dateTime={formatISO(date)}>
      <span>{format(date, "LLLL d, yyyy")}</span>
      <style jsx>
        {`
          span {
            font-family: var(--font-mono);
            font-size: 0.8125rem;
            color: var(--color-muted);
          }
        `}
      </style>
    </time>
  );
}
