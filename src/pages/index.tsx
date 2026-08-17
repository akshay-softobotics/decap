import Link from "next/link";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SocialList } from "../components/SocialList";

export default function Index() {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="page">
        <div className="hero">
          <div className="content">
            <span className="handle">@nextjs-netlify-blog</span>
            <h1>
              Write it in Markdown.<br />
              Ship it in seconds<span className="fancy">.</span>
            </h1>
            <h2>A blog template built on Next.js and Netlify.</h2>
            <div className="actions">
              <Link href="/posts" className="cta">
                Read the blog
              </Link>
            </div>
            <SocialList />
          </div>
        </div>
        <div className="why">
          <div className="why-inner">
            <div className="why-item">
              <svg className="why-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14.5 5.5l4 4L8 20H4v-4L14.5 5.5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 7l4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="why-eyebrow">write</span>
              <h4>Just write</h4>
              <p>
                Markdown &amp; MDX posts with zero boilerplate — spend your
                time on words, not wiring.
              </p>
            </div>
            <div className="why-item">
              <svg className="why-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="why-eyebrow">ship</span>
              <h4>Ship for free</h4>
              <p>
                Statically exported and deployed on Cloudflare Workers /
                Netlify — nothing to babysit, ever.
              </p>
            </div>
            <div className="why-item">
              <svg className="why-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="M20 20l-5-5" strokeLinecap="round" />
              </svg>
              <span className="why-eyebrow">discover</span>
              <h4>Get found</h4>
              <p>
                Meta tags, Open Graph &amp; Twitter cards are already wired
                up, so your posts are discoverable from day one.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .page {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .hero {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1 1 auto;
          padding: 4rem 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }
        .content {
          position: relative;
          max-width: 38rem;
          margin: 0 auto;
          width: 100%;
        }
        .handle {
          display: block;
          margin-bottom: 1rem;
          color: var(--color-muted);
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          letter-spacing: 0.03em;
        }
        h1 {
          font-family: var(--font-display);
          font-size: clamp(2.25rem, 6vw, 3.25rem);
          margin: 0;
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
        h2 {
          font-size: clamp(1.125rem, 3vw, 1.375rem);
          font-weight: 300;
          line-height: 1.4;
          color: var(--color-muted);
          margin: 1rem 0 0;
        }
        .fancy {
          color: var(--color-cta);
        }
        .actions {
          margin: 2rem 0 1.75rem;
        }
        :global(.cta) {
          display: inline-block;
          background: var(--color-cta);
          color: #fff;
          font-weight: 500;
          padding: 0.75em 1.75em;
          border-radius: 0.25rem;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }
        :global(.cta:hover) {
          background: var(--color-cta-hover);
          color: #fff;
        }

        .why {
          padding: 1rem 1.5rem 4.5rem;
        }
        .why-inner {
          max-width: 60rem;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
        }
        .why-item {
          position: relative;
          padding: 2rem 0;
          border-top: 1px solid var(--color-border);
        }
        .why-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: var(--color-accent);
          margin-bottom: 1rem;
        }
        .why-eyebrow {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: 0.5rem;
        }
        .why-item h4 {
          font-family: var(--font-display);
          margin: 0 0 0.5rem;
          font-size: 1.25rem;
          font-weight: 600;
        }
        .why-item p {
          margin: 0;
          color: var(--color-muted);
          line-height: 1.55;
          max-width: 28rem;
        }

        @media (min-width: 769px) {
          .why-inner {
            grid-template-columns: repeat(3, 1fr);
            column-gap: 2.5rem;
          }
          .why-item {
            border-top: none;
            border-left: 1px solid var(--color-border);
            padding: 0 0 0 1.5rem;
          }
        }
      `}</style>
    </Layout>
  );
}
