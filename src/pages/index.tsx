import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import Hero from "../components/Hero";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";
import ServiceCard from "../components/ServiceCard";
import FeaturedPost from "../components/FeaturedPost";
import BlogCard from "../components/BlogCard";
import CTASection from "../components/CTASection";
import { listServices, ServiceContent } from "../lib/services";
import { fetchPostContent, PostContent } from "../lib/posts";
import config from "../lib/config";

type Props = {
  services: ServiceContent[];
  featuredPost: PostContent;
  secondaryPosts: PostContent[];
};

const STATS = [
  { value: "100+", label: "Articles" },
  { value: "20+", label: "Topics" },
  { value: "10K+", label: "Readers" },
  { value: "6", label: "Core services" },
];

const BENEFITS = [
  "A single team from strategy through delivery",
  "Plain, jargon-free communication at every step",
  "Work you can maintain long after we're gone",
];

function HeroIllustration() {
  return (
    <svg viewBox="0 0 320 280" fill="none" aria-hidden="true" className="illustration">
      <circle cx="230" cy="90" r="86" fill="var(--color-accent-dim)" />
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4].map((col) => (
          <circle key={`${row}-${col}`} cx={30 + col * 9} cy={16 + row * 9} r="1.4" fill="var(--color-border)" />
        ))
      )}
      <rect x="46" y="52" width="228" height="176" rx="14" fill="var(--color-surface)" stroke="var(--color-border)" />
      <circle cx="68" cy="76" r="4" fill="var(--color-cta)" />
      <circle cx="82" cy="76" r="4" fill="var(--color-border)" />
      <circle cx="96" cy="76" r="4" fill="var(--color-border)" />
      <rect x="66" y="98" width="60" height="60" rx="10" fill="var(--color-ink)" />
      <text x="86" y="136" fontFamily="var(--font-display)" fontSize="26" fontWeight={600} fill="var(--color-paper)">
        {config.site_title.charAt(0)}
      </text>
      <rect x="140" y="102" width="112" height="10" rx="5" fill="var(--color-border)" />
      <rect x="140" y="122" width="86" height="10" rx="5" fill="var(--color-border)" />
      <rect x="66" y="172" width="188" height="10" rx="5" fill="var(--color-border)" />
      <rect x="66" y="190" width="140" height="10" rx="5" fill="var(--color-border)" />
      <rect x="66" y="206" width="70" height="26" rx="13" fill="var(--color-cta)" />
      <text x="82" y="223" fontFamily="var(--font-mono)" fontSize="11" fill="#fff">
        Read more
      </text>
      <style jsx>{`
        .illustration {
          width: 100%;
          height: auto;
        }
      `}</style>
    </svg>
  );
}

export default function Index({ services, featuredPost, secondaryPosts }: Props) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />

      <Hero
        eyebrow={config.site_title}
        title="Ideas, Insights & Stories That Move You Forward"
        description={`${config.site_description} — practical consulting and a growing library of guides, playbooks and stories from the field.`}
        primaryCta={{ label: "Explore Our Services", href: "/services" }}
        secondaryCta={{ label: "Read Our Blog", href: "/posts" }}
        visual={<HeroIllustration />}
      />

      <section className="stats">
        <div className="stats-inner">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <StatCard value={s.value} label={s.label} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <SectionHeader
            eyebrow="What we do"
            title="Services built around your goals"
            description="Six focused practices that cover the full arc from first strategy call to shipped product."
          />
          <div className="service-grid">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 60}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="inner">
          <SectionHeader
            eyebrow="From the blog"
            title="Featured content"
            description="Fresh thinking from our team — start with the latest, or browse the full library."
          />
          <div className="featured-grid">
            <Reveal className="featured-main">
              <FeaturedPost post={featuredPost} />
            </Reveal>
            <div className="featured-side">
              {secondaryPosts.map((post, i) => (
                <Reveal key={post.slug} delay={(i + 1) * 80}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section about">
        <div className="inner about-grid">
          <Reveal className="about-visual">
            <svg viewBox="0 0 260 260" fill="none" aria-hidden="true">
              <rect x="10" y="10" width="240" height="240" rx="24" fill="var(--color-ink)" />
              <rect x="34" y="34" width="192" height="192" rx="16" fill="none" stroke="var(--color-on-ink-border)" />
              <circle cx="130" cy="106" r="46" fill="var(--color-cta)" />
              <path
                d="M96 150l68 0M96 172l40 0"
                stroke="var(--color-on-ink-border)"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </Reveal>
          <Reveal className="about-copy">
            <span className="eyebrow">About us</span>
            <h2>A small team that ships work you can actually maintain</h2>
            <p>
              {config.site_title} pairs hands-on consulting with a public library of
              writing, so the way we work is never a black box. We favour clarity and
              plain language over jargon — for the products we build and the words we
              write about them.
            </p>
            <ul>
              {BENEFITS.map((b) => (
                <li key={b}>
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn-secondary">
              More about us
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Let's talk"
        title="Have an idea? Let's build something meaningful."
        description="Tell us what you're working on and we'll tell you exactly how we'd approach it."
        cta={{ label: "Get in touch", href: "/contact" }}
      />

      <style jsx>{`
        .stats {
          padding: 0 1.5rem 5rem;
        }
        .stats-inner {
          max-width: var(--content-width);
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .section {
          padding: 5rem 1.5rem;
        }
        .inner {
          max-width: var(--content-width);
          margin: 0 auto;
        }
        .service-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        .featured-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        .featured-side {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        .about {
          background: var(--color-surface);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        :global(.about-visual svg) {
          width: 100%;
          max-width: 22rem;
          margin: 0 auto;
          display: block;
        }
        :global(.about-copy .eyebrow) {
          margin-bottom: 1.25rem;
        }
        :global(.about-copy h2) {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.75rem, 3.4vw, 2.375rem);
          line-height: 1.2;
          margin: 0;
        }
        :global(.about-copy p) {
          margin: 1.25rem 0 0;
          color: var(--color-muted);
          font-size: 1.0625rem;
          line-height: 1.65;
        }
        :global(.about-copy ul) {
          list-style: none;
          margin: 1.75rem 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        :global(.about-copy li) {
          display: flex;
          align-items: flex-start;
          gap: 0.65em;
          color: var(--color-ink);
          font-size: 0.9375rem;
        }
        :global(.about-copy li svg) {
          width: 1.1em;
          height: 1.1em;
          color: var(--color-accent);
          flex-shrink: 0;
          margin-top: 0.15em;
        }
        :global(.about-copy .btn-secondary) {
          margin-top: 2rem;
        }

        @media (min-width: 640px) {
          .stats-inner {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (min-width: 780px) {
          .service-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .featured-grid {
            grid-template-columns: 1.5fr 1fr;
          }
          .about-grid {
            grid-template-columns: 1fr 1.2fr;
          }
        }

        @media (min-width: 1100px) {
          .service-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const services = listServices();
  const allPosts = fetchPostContent();
  return {
    props: {
      services,
      featuredPost: allPosts[0],
      secondaryPosts: allPosts.slice(1, 3),
    },
  };
};
