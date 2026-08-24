import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import config from "../lib/config";

type NavItem = { href: string; label: string };

type Props = {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  isActive: (href: string) => boolean;
};

export default function MobileMenu({ open, onClose, items, isActive }: Props) {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusable?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !focusable || focusable.length === 0) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      className={`drawer ${open ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
    >
      <div className="drawer-inner" ref={panelRef}>
        <nav>
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(item.href) ? "drawer-link active" : "drawer-link"}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/contact" className="drawer-cta">
          Get Started
        </Link>
        <p className="drawer-foot">{config.site_title}</p>
      </div>
      <style jsx>{`
        .drawer {
          position: fixed;
          inset: 0;
          z-index: 40;
          visibility: hidden;
          pointer-events: none;
        }
        .drawer.open {
          visibility: visible;
          pointer-events: auto;
        }
        .drawer-inner {
          position: absolute;
          inset: 0;
          background: var(--color-paper);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 6rem 2rem 3rem;
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity 220ms var(--ease-out), transform 220ms var(--ease-out);
        }
        .drawer.open .drawer-inner {
          opacity: 1;
          transform: translateY(0);
        }
        ul {
          list-style: none;
          margin: 0 0 2.5rem;
          padding: 0;
        }
        li {
          border-top: 1px solid var(--color-border);
        }
        li:last-child {
          border-bottom: 1px solid var(--color-border);
        }
        :global(.drawer-link) {
          display: block;
          padding: 1.1rem 0;
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--color-ink);
        }
        :global(.drawer-link.active) {
          color: var(--color-accent);
        }
        :global(.drawer-cta) {
          display: inline-flex;
          align-self: flex-start;
          background: var(--color-cta);
          color: #fff;
          font-weight: 500;
          padding: 0.85em 1.75em;
          border-radius: var(--radius-sm);
          margin-bottom: 3rem;
        }
        .drawer-foot {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-muted);
          margin: 0;
        }

        @media (min-width: 769px) {
          .drawer {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
