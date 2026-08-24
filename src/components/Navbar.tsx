import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Burger from "./Burger";
import MobileMenu from "./MobileMenu";
import config from "../lib/config";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/posts", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    if (href === "/") {
      return router.pathname === "/";
    }
    return router.pathname === href || router.pathname.startsWith(href + "/");
  }

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="inner">
          <Link href="/" className="brand" aria-label={`${config.site_title} — home`}>
            <span className="mark" aria-hidden="true">
              {config.site_title.charAt(0)}
            </span>
            <span className="wordmark">{config.site_title}</span>
          </Link>

          <nav aria-label="Primary">
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isActive(item.href) ? "nav-link active" : "nav-link"}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/contact" className="nav-cta">
            Get Started
          </Link>

          <Burger active={open} onClick={() => setOpen((v) => !v)} />
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} items={NAV_ITEMS} isActive={isActive} />
      <style jsx>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 30;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background-color 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
        }
        .site-header.scrolled {
          background: rgba(247, 245, 240, 0.86);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom-color: var(--color-border);
          box-shadow: var(--shadow-sm);
        }
        .inner {
          max-width: var(--content-width);
          margin: 0 auto;
          padding: 1.1rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }
        :global(.brand) {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin-right: auto;
        }
        .mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: var(--radius-sm);
          background: var(--color-ink);
          color: var(--color-paper);
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.05rem;
          flex-shrink: 0;
        }
        .wordmark {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--color-ink);
          letter-spacing: -0.01em;
        }
        nav {
          display: none;
        }
        ul {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }
        :global(.nav-link) {
          position: relative;
          color: var(--color-ink);
          font-size: 0.9375rem;
          font-weight: 500;
          padding: 0.35rem 0;
        }
        :global(.nav-link::after) {
          content: "";
          position: absolute;
          left: 0;
          right: 100%;
          bottom: -2px;
          height: 2px;
          background: var(--color-cta);
          transition: right 220ms var(--ease-out);
        }
        :global(.nav-link:hover)::after,
        :global(.nav-link.active)::after {
          right: 0;
        }
        :global(.nav-link.active) {
          color: var(--color-ink);
        }
        :global(.nav-cta) {
          display: none;
          background: var(--color-cta);
          color: #fff;
          font-weight: 500;
          font-size: 0.9375rem;
          padding: 0.6em 1.4em;
          border-radius: var(--radius-sm);
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        :global(.nav-cta:hover) {
          background: var(--color-cta-hover);
          color: #fff;
          transform: translateY(-1px);
        }

        @media (min-width: 769px) {
          nav {
            display: block;
          }
          :global(.nav-cta) {
            display: inline-flex;
          }
        }
      `}</style>
    </>
  );
}
