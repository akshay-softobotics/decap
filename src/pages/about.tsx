import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import Hero from "../components/Hero";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";
import TeamCard from "../components/TeamCard";
import CTASection from "../components/CTASection";
import { listAuthors } from "../lib/authors";
import config from "../lib/config";

const VALUES = [
  { title: "Clarity", description: "We say what we mean, in writing, before the work starts — no surprises at delivery." },
  { title: "Craft", description: "Small details are not optional. We sweat the ones our users will actually notice." },
  { title: "Candor", description: "If something won't work, we say so early — even when it's not what you want to hear." },
  { title: "Partnership", description: "We work alongside your team, not above it, and hand off knowledge as we go." },
];

const STATS = [
  { value: "8+", label: "Years building" },
  { value: "40+", label: "Projects shipped" },
  { value: "6", label: "Core services" },
  { value: "100%", label: "Remote-friendly" },
];

export default function About() {
  const team = listAuthors();
  const url = "/about";
  const title = "About Us";
  return (
    <Layout>
      <BasicMeta
        url={url}
        title={title}
        description={`The story, mission and people behind ${config.site_title}.`}
      />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />

      <Hero
        eyebrow="About us"
        title="We build products and write about how"
        description={`${config.site_title} is a small, hands-on studio — part consultancy, part publication. Everything we learn on client work eventually becomes a guide on the blog.`}
        primaryCta={{ label: "Meet the team", href: "#team" }}
        secondaryCta={{ label: "Read our blog", href: "/posts" }}
      />

      <section className="section">
        <div className="inner two-col">
          <Reveal>
            <span className="eyebrow">Our story</span>
            <h2>Started from a simple frustration</h2>
            <p>
              We kept seeing the same pattern: good teams, reasonable budgets, and
              products that still took twice as long as they should have. Usually the
              gap wasn't skill — it was communication. So we built a studio around
              writing things down clearly, first for our clients, and then for anyone
              who wants to read it.
            </p>
            <p>
              Today that shows up as two things: focused consulting engagements, and a
              public blog where we publish the guides we wish we'd had.
            </p>
          </Reveal>
          <Reveal delay={80} className="mission-vision">
            <div className="card">
              <span className="eyebrow">Mission</span>
              <p>Help teams ship work they understand and can maintain, not just work that ships.</p>
            </div>
            <div className="card">
              <span className="eyebrow">Vision</span>
              <p>A future where good engineering writing is as normal as good engineering.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section values-section">
        <div className="inner">
          <SectionHeader eyebrow="What we believe" title="Our values" align="center" />
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 60} className="value-card">
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="team">
        <div className="inner">
          <SectionHeader eyebrow="Who we are" title="Meet the team" align="center" />
          <div className="team-grid">
            {team.map((member) => (
              <Reveal key={member.slug} as="div">
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="inner stats-grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 60}>
              <StatCard value={s.value} label={s.label} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Work with us"
        title="Let's see if we're a fit"
        description="A short call is usually enough to know. No pressure, no sales script."
        cta={{ label: "Get in touch", href: "/contact" }}
      />

      <style jsx>{`
        .section {
          padding: 5rem 1.5rem;
        }
        .inner {
          max-width: var(--content-width);
          margin: 0 auto;
        }
        .two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        .two-col :global(.eyebrow) {
          margin-bottom: 1.25rem;
        }
        .two-col h2 {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.75rem, 3.4vw, 2.25rem);
          line-height: 1.22;
          margin: 0;
        }
        .two-col p {
          margin: 1.1rem 0 0;
          color: var(--color-muted);
          font-size: 1.0625rem;
          line-height: 1.65;
        }
        :global(.mission-vision) {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 1.75rem;
        }
        .card p {
          margin: 1rem 0 0;
          color: var(--color-ink);
          font-family: var(--font-display);
          font-size: 1.125rem;
          line-height: 1.5;
        }
        .values-section {
          background: var(--color-surface);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .values-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        :global(.value-card) {
          padding: 1.75rem;
          background: var(--color-paper);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
        }
        :global(.value-card) h3 {
          margin: 0 0 0.6rem;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.1875rem;
        }
        :global(.value-card) p {
          margin: 0;
          color: var(--color-muted);
          font-size: 0.9375rem;
          line-height: 1.6;
        }
        .team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        .stats-section {
          padding: 0 1.5rem 5rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (min-width: 780px) {
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .team-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 900px) {
          .two-col {
            grid-template-columns: 1.2fr 1fr;
          }
        }

        @media (min-width: 1100px) {
          .values-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </Layout>
  );
}
