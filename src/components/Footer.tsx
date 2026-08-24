import Link from "next/link";
import Copyright from "./Copyright";
import Newsletter from "./Newsletter";
import config from "../lib/config";

const SOCIALS = [
  { label: "X / Twitter", monogram: "X", href: `https://twitter.com/${config.twitter_account}` },
  { label: "LinkedIn", monogram: "in", href: "#" },
  { label: "GitHub", monogram: "GH", href: `https://github.com/${config.github_account}` },
  { label: "Instagram", monogram: "IG", href: "#" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/posts" },
  { label: "Contact", href: "/contact" },
];

const RESOURCE_LINKS = [
  { label: "Guides", href: "/posts" },
  { label: "Articles", href: "/posts" },
  { label: "FAQs", href: "/contact#faq" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="top">
        <div className="brand-col">
          <Link href="/" className="brand">
            <span className="mark" aria-hidden="true">
              {config.site_title.charAt(0)}
            </span>
            <span className="wordmark">{config.site_title}</span>
          </Link>
          <p className="tagline">{config.site_description}</p>
          <ul className="socials">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener" aria-label={s.label} title={s.label}>
                  {s.monogram}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="col" aria-label="Footer navigation">
          <h3>Navigation</h3>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="col" aria-label="Resources">
          <h3>Resources</h3>
          <ul>
            {RESOURCE_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col newsletter-col">
          <Newsletter tone="ink" />
        </div>
      </div>

      <div className="bottom">
        <Copyright />
      </div>

      <style jsx>{`
        .site-footer {
          background: var(--color-ink-section);
          color: var(--color-on-ink);
          margin-top: 6rem;
        }
        .top {
          max-width: var(--content-width);
          margin: 0 auto;
          padding: 4rem 1.5rem 3rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        .brand-col {
          max-width: 22rem;
        }
        :global(.brand) {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }
        .mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: var(--radius-sm);
          background: var(--color-cta);
          color: #fff;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.05rem;
          flex-shrink: 0;
        }
        .wordmark {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-on-ink);
        }
        .tagline {
          margin: 1rem 0 1.5rem;
          color: var(--color-on-ink-muted);
          font-size: 0.9375rem;
          line-height: 1.6;
        }
        .socials {
          display: flex;
          gap: 0.6rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .socials a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          border: 1px solid var(--color-on-ink-border);
          color: var(--color-on-ink);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }
        .socials a:hover {
          background: var(--color-cta);
          border-color: var(--color-cta);
          color: #fff;
        }
        .col h3 {
          margin: 0 0 1rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-on-ink-muted);
          font-weight: 500;
        }
        .col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .col :global(a) {
          color: var(--color-on-ink-muted);
          font-size: 0.9375rem;
        }
        .col :global(a:hover) {
          color: var(--color-on-ink);
        }
        .bottom {
          border-top: 1px solid var(--color-on-ink-border);
          padding: 1.5rem;
        }
        .bottom :global(p) {
          max-width: var(--content-width);
          margin: 0 auto;
          color: var(--color-on-ink-muted) !important;
        }

        @media (min-width: 700px) {
          .top {
            grid-template-columns: 1.4fr 1fr 1fr;
          }
          .newsletter-col {
            grid-column: 1 / -1;
            max-width: 26rem;
          }
        }

        @media (min-width: 1024px) {
          .top {
            grid-template-columns: 1.6fr 0.8fr 0.8fr 1.4fr;
          }
          .newsletter-col {
            grid-column: auto;
            max-width: none;
          }
        }
      `}</style>
    </footer>
  );
}
