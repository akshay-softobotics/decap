import Copyright from "./Copyright";
import { SocialList } from "./SocialList";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Copyright />
      <SocialList />
      <style jsx>{`
        .site-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.75rem 1.5rem;
          border-top: 1px solid var(--color-border);
        }
      `}</style>
    </footer>
  );
}
