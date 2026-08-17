import config from "../lib/config";

export default function Copyright() {
  return (
    <>
      <p>
        &copy; {new Date().getFullYear()} {config.site_title}. All rights
        reserved.
      </p>
      <style jsx>
        {`
          p {
            margin: 0;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--color-muted);
          }
        `}
      </style>
    </>
  );
}
