import { useState } from "react";
import Link from "next/link";
import config from "../lib/config";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Destinations", href: "/destinations" },
      { label: "Activities", href: "/#things-to-do" },
      { label: "Vacation Ideas", href: "/#discover" },
      { label: "Itineraries", href: "/destinations" },
    ],
  },
  {
    title: "Travel",
    links: [
      { label: "Travel Tips", href: "/posts" },
      { label: "Packing Guides", href: "/posts" },
      { label: "Family Travel", href: "/posts" },
      { label: "Budget Travel", href: "/posts" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Blog", href: "/posts" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/about" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="site-footer">
      <div className="container inner">
        <div className="brand-col">
          <Link href="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 15c4-1 5-9 8-9s3 6 8 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="6" r="2.4" fill="currentColor" />
              </svg>
            </span>
            <span>{config.site_title}</span>
          </Link>
          <p className="tagline">
            Family-friendly destinations, activities and travel tips to make
            planning your next adventure the easy part.
          </p>
          <div className="socials">
            <a
              href={`https://twitter.com/${config.twitter_account}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 5.9c-.7.3-1.5.5-2.3.6a4 4 0 0 0 1.8-2.2c-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 3.9 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.8-.5a4 4 0 0 0 3.2 3.9c-.6.2-1.2.2-1.8.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 17.9a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.4-6.1 11.4-11.4v-.5c.8-.6 1.5-1.3 2-2z" />
              </svg>
            </a>
            <a
              href="/"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={`https://github.com/${config.github_account}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.3-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .3.3.6.9.6 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
              </svg>
            </a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <nav className="col" key={col.title} aria-label={col.title}>
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="col newsletter">
          <h3>Get more adventures</h3>
          {done ? (
            <p className="thanks">You're on the list — happy travels! ✈️</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="container legal">
        <p>
          &copy; {new Date().getFullYear()} {config.site_title}. All rights
          reserved.
        </p>
        <div className="legal-links">
          <Link href="/">Privacy</Link>
          <Link href="/">Terms</Link>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          background: var(--color-ink);
          color: rgba(255, 255, 255, 0.75);
          margin-top: 2rem;
        }
        .inner {
          display: grid;
          grid-template-columns: 1.6fr repeat(3, 1fr) 1.4fr;
          gap: 2.5rem;
          padding-top: 3.5rem;
          padding-bottom: 2.5rem;
        }
        .brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 0.6rem;
          background: linear-gradient(135deg, var(--color-sky), var(--color-ocean));
          color: #fff;
        }
        .brand-mark svg {
          width: 1.2rem;
          height: 1.2rem;
        }
        .tagline {
          margin: 1rem 0 1.25rem;
          max-width: 24rem;
          line-height: 1.6;
          font-size: 0.95rem;
        }
        .socials {
          display: flex;
          gap: 0.75rem;
        }
        .socials a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .socials a:hover {
          background: var(--color-coral);
          transform: translateY(-2px);
        }
        .socials svg {
          width: 1.2rem;
          height: 1.2rem;
        }

        .col h3 {
          color: #fff;
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0 0 1rem;
        }
        .col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .col :global(a) {
          color: rgba(255, 255, 255, 0.72);
          font-size: 0.95rem;
        }
        .col :global(a:hover) {
          color: var(--color-sun);
        }

        .newsletter form {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .newsletter input {
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.06);
          color: #fff;
          border-radius: var(--radius-pill);
          padding: 0.75em 1.1em;
          font-family: var(--font-body);
          font-size: 0.95rem;
        }
        .newsletter input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .newsletter :global(.btn) {
          width: 100%;
        }
        .thanks {
          color: var(--color-sun);
          font-weight: 600;
          margin: 0;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .legal {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 0.85rem;
        }
        .legal p {
          margin: 0;
        }
        .legal-links {
          display: flex;
          gap: 1.5rem;
        }
        .legal-links :global(a) {
          color: rgba(255, 255, 255, 0.72);
        }
        .legal-links :global(a:hover) {
          color: var(--color-sun);
        }

        @media (max-width: 940px) {
          .inner {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .brand-col {
            grid-column: 1 / -1;
          }
          .newsletter {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 560px) {
          .inner {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <style jsx global>{`
        /* next/link renders an unhashed className, so this must be global. */
        .site-footer .brand {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          color: #fff;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.35rem;
        }
        .site-footer .brand:hover {
          color: #fff;
        }
      `}</style>
    </footer>
  );
}
