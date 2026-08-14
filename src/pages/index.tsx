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
      <div className="hero">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="content">
          <h1>
            Hi, We're Next.js & Netlify<span className="fancy">.</span>
          </h1>
          <span className="handle">@nextjs-netlify-blog</span>
          <h2>A blog template with Next.js and Netlify.</h2>
          <div className="actions">
            <Link href="/posts" className="cta">
              Read the Blog
            </Link>
          </div>
          <SocialList />
        </div>
      </div>
      <style jsx>{`
        .hero {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          padding: 3rem 1.5rem;
          overflow: hidden;
          background: linear-gradient(180deg, #eef7f6 0%, #ffffff 100%);
        }
        .shape {
          position: absolute;
          border-radius: 50%;
          z-index: 0;
        }
        .shape-1 {
          width: 16rem;
          height: 16rem;
          background: #15847d;
          opacity: 0.12;
          top: -4rem;
          right: -4rem;
        }
        .shape-2 {
          width: 10rem;
          height: 10rem;
          background: #ff8a65;
          opacity: 0.16;
          bottom: -3rem;
          left: -2rem;
        }
        .content {
          position: relative;
          z-index: 1;
          max-width: 40rem;
        }
        h1 {
          font-size: 2.5rem;
          margin: 0;
          font-weight: 500;
        }
        h2 {
          font-size: 1.75rem;
          font-weight: 400;
          line-height: 1.25;
        }
        .fancy {
          color: #15847d;
        }
        .handle {
          display: inline-block;
          margin-top: 0.275em;
          color: #9b9b9b;
          letter-spacing: 0.05em;
        }
        .actions {
          margin: 1.5rem 0;
        }
        .cta {
          display: inline-block;
          background: #ff8a65;
          color: #fff;
          font-weight: 600;
          padding: 0.75em 1.5em;
          border-radius: 999px;
          text-decoration: none;
          transition: background-color 0.2s ease;
        }
        .cta:hover {
          background: #ff7043;
        }

        @media (min-width: 769px) {
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </Layout>
  );
}
