import Link from "next/link";
import { useRouter } from "next/router";
import Burger from "./Burger";
import { useState } from "react";
import config from "../lib/config";

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        {config.site_title}
      </Link>
      <Burger active={active} onClick={() => setActive(!active)} />
      <ul className={active ? "active" : ""}>
        <li>
          <Link
            href="/"
            className={
              router.pathname === "/" ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/posts"
            className={
              router.pathname.startsWith("/posts")
                ? "nav-link nav-link-active"
                : "nav-link"
            }
          >
            Blogs
          </Link>
        </li>
      </ul>
      <style jsx>{`
        .site-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          position: relative;
        }
        .brand {
          font-size: 1.25rem;
          font-weight: 700;
          color: #15847d;
          text-decoration: none;
        }
        ul {
          opacity: 0;
          visibility: hidden;
          width: 100%;
          height: 100vh;
          box-sizing: border-box;
          text-align: right;
          list-style: none;
          margin: 0;
          padding: 6rem 1.5rem 0 0;
          position: fixed;
          top: 0;
          left: 0;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          z-index: 1;
          transform: translateY(-8px);
          transition: opacity 200ms, transform 200ms, visibility 200ms;
        }
        ul.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        li {
          margin-bottom: 1.75rem;
          font-size: 2rem;
        }
        li:last-child {
          margin-bottom: 0;
        }

        @media (min-width: 769px) {
          ul {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            height: auto;
            width: auto;
            padding: 0;
            flex-direction: row;
            background: transparent;
          }
          li {
            font-size: 1rem;
            margin: 0 0 0 2rem;
          }
        }
      `}</style>
      <style jsx global>{`
        .nav-link {
          color: #222;
          text-decoration: none;
        }
        .nav-link-active {
          color: #15847d;
          font-weight: 700;
        }
      `}</style>
    </header>
  );
}
