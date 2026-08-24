import { format, formatISO } from "date-fns";

type Props = {
  date: Date;
};
export default function Date({ date }: Props) {
  return (
    <time dateTime={formatISO(date)}>
      <span>{format(date, "LLL d, yyyy")}</span>
      <style jsx>
        {`
          span {
            font-family: var(--font-body);
            font-size: 0.85rem;
            color: var(--color-muted);
          }
        `}
      </style>
    </time>
  );
}
