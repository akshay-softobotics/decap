import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import config from "../lib/config";

const NAV_LINKS = [
  { label: "Destinations", href: "/destinations" },
  { label: "Things to Do", href: "/#things-to-do" },
  { label: "Vacation Ideas", href: "/#discover" },
  { label: "Travel Tips", href: "/#age-ideas" },
  { label: "Blog", href: "/posts" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeComplete", close);
    router.events.on("hashChangeComplete", close);
    return () => {
      router.events.off("routeChangeComplete", close);
      router.events.off("hashChangeComplete", close);
    };
  }, [router.events]);

  const isActive = (href: string) => {
    if (href === "/destinations") return router.pathname.startsWith("/destinations");
    if (href === "/posts") return router.pathname.startsWith("/posts");
    if (href === "/about") return router.pathname === "/about";
    return false;
  };

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="bar container">
        <Link href="/" className="brand" aria-label={`${config.site_title} home`}>
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
          <span className="brand-text">{config.site_title}</span>
        </Link>

        <nav className={`nav ${open ? "open" : ""}`} aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${isActive(link.href) ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="cta-mobile">
              <Link href="/#planner" className="btn btn-primary">
                Plan a Trip
              </Link>
            </li>
          </ul>
        </nav>

        <Link href="/#planner" className="btn btn-primary cta-desktop">
          Plan a Trip
        </Link>

        <button
          className={`burger ${open ? "open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <style jsx>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 249, 240, 0.85);
          backdrop-filter: saturate(180%) blur(12px);
          -webkit-backdrop-filter: saturate(180%) blur(12px);
          border-bottom: 1px solid transparent;
          transition: background-color 0.25s ease, border-color 0.25s ease,
            box-shadow 0.25s ease;
        }
        .site-header.scrolled {
          background: rgba(255, 249, 240, 0.92);
          border-bottom-color: var(--color-border);
          box-shadow: 0 6px 20px rgba(15, 42, 67, 0.06);
        }
        .bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: var(--header-h);
          gap: 1rem;
        }
        .brand-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.1rem;
          height: 2.1rem;
          border-radius: 0.7rem;
          background: linear-gradient(135deg, var(--color-sky), var(--color-ocean));
          color: #fff;
        }
        .brand-mark svg {
          width: 1.3rem;
          height: 1.3rem;
        }

        .nav ul {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 1.6rem;
          margin: 0;
          padding: 0;
        }
        .cta-mobile {
          display: none;
        }

        .burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 44px;
          height: 44px;
          padding: 10px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 0.7rem;
          cursor: pointer;
        }
        .burger span {
          display: block;
          height: 2px;
          width: 100%;
          background: var(--color-ink);
          border-radius: 2px;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .burger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .burger.open span:nth-child(2) {
          opacity: 0;
        }
        .burger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        @media (max-width: 940px) {
          .cta-mobile {
            display: block;
            margin-top: 0.5rem;
          }
          .burger {
            display: flex;
          }
          .nav {
            position: absolute;
            top: var(--header-h);
            left: 0;
            right: 0;
            background: var(--color-surface);
            border-bottom: 1px solid var(--color-border);
            box-shadow: var(--shadow-lg);
            padding: 1rem 1.5rem 1.5rem;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: opacity 0.2s ease, transform 0.2s ease,
              visibility 0.2s ease;
          }
          .nav.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
          .nav ul {
            flex-direction: column;
            align-items: stretch;
            gap: 0.25rem;
          }
          .nav li {
            border-bottom: 1px solid var(--color-border);
          }
          .nav li.cta-mobile {
            border-bottom: none;
          }
        }
      `}</style>
      <style jsx global>{`
        /* next/link renders an unhashed className, so these must be global. */
        .site-header .brand {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          color: var(--color-ink);
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -0.01em;
        }
        .site-header .brand:hover {
          color: var(--color-ink);
        }
        .site-header .cta-desktop {
          font-size: 0.95rem;
          padding: 0.7em 1.3em;
        }
        @media (max-width: 940px) {
          .site-header .cta-desktop {
            display: none;
          }
        }
        .nav-link {
          color: var(--color-ink);
          font-weight: 600;
          font-size: 0.98rem;
          padding: 0.5rem 0;
          position: relative;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0.15rem;
          height: 2px;
          width: 0;
          background: var(--color-coral);
          border-radius: 2px;
          transition: width 0.2s ease;
        }
        .nav-link:hover {
          color: var(--color-ocean);
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        .nav-link.active {
          color: var(--color-ocean);
        }
        @media (max-width: 940px) {
          .nav-link {
            display: block;
            padding: 0.85rem 0.25rem;
            font-size: 1.05rem;
          }
          .nav-link::after {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
