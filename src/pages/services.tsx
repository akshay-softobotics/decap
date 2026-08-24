import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import Hero from "../components/Hero";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import ServiceCard from "../components/ServiceCard";
import ServiceIcon from "../components/ServiceIcon";
import CTASection from "../components/CTASection";
import { listServices } from "../lib/services";

const PROCESS = [
  { step: "01", title: "Discover", description: "We learn your product, your users and your constraints before proposing anything." },
  { step: "02", title: "Plan", description: "A scoped roadmap with clear milestones, so you know what's shipping and when." },
  { step: "03", title: "Build", description: "Short, reviewable cycles with working software at the end of every one." },
  { step: "04", title: "Launch & support", description: "We stay close after launch — monitoring, iterating, and handing off cleanly." },
];

export default function Services() {
  const services = listServices();
  const url = "/services";
  const title = "Services";
  return (
    <Layout>
      <BasicMeta
        url={url}
        title={title}
        description="Consulting, digital solutions, strategy, technology, design and development — six services built around outcomes."
      />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />

      <Hero
        eyebrow="What we offer"
        title="Services built around outcomes, not deliverables"
        description="Six focused practices you can combine into a single engagement or bring in one at a time — whichever fits where you are today."
        primaryCta={{ label: "Start a project", href: "/contact" }}
        secondaryCta={{ label: "Read our blog", href: "/posts" }}
      />

      <section className="section">
        <div className="inner">
          <div className="service-grid">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 60}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section detail-section">
        <div className="inner">
          <SectionHeader eyebrow="In detail" title="What each service covers" align="center" />
          <div className="detail-list">
            {services.map((service, i) => (
              <Reveal
                as="section"
                key={service.slug}
                id={service.slug}
                className={`detail-row ${i % 2 === 1 ? "reverse" : ""}`}
                delay={40}
              >
                <div className="detail-icon">
                  <ServiceIcon name={service.icon} className="icon" />
                </div>
                <div className="detail-copy">
                  <h3>{service.title}</h3>
                  <p>{service.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="inner">
          <SectionHeader
            eyebrow="How we work"
            title="A process built for momentum"
            description="The same four stages, every time — so you always know what happens next."
          />
          <ol className="process-list">
            {PROCESS.map((p) => (
              <li key={p.step}>
                <span className="step">{p.step}</span>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection
        eyebrow="Ready when you are"
        title="Let's scope your next project"
        description="Book a short call and we'll tell you honestly whether we're the right fit."
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
        .service-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        .detail-section {
          background: var(--color-surface);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .detail-list {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        :global(.detail-row) {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          align-items: flex-start;
          scroll-margin-top: 6rem;
        }
        .detail-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: var(--radius-md);
          background: var(--color-accent-dim);
          flex-shrink: 0;
        }
        .detail-icon :global(.icon) {
          width: 1.75rem;
          height: 1.75rem;
          color: var(--color-accent);
        }
        .detail-copy h3 {
          margin: 0 0 0.6rem;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.375rem;
        }
        .detail-copy p {
          margin: 0;
          color: var(--color-muted);
          font-size: 1rem;
          line-height: 1.65;
          max-width: 42rem;
        }
        .process-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          counter-reset: none;
        }
        .process-list li {
          position: relative;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border);
        }
        .step {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--color-cta);
          margin-bottom: 0.75rem;
        }
        .process-list h4 {
          margin: 0 0 0.5rem;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.1875rem;
        }
        .process-list p {
          margin: 0;
          color: var(--color-muted);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        @media (min-width: 640px) {
          :global(.detail-row) {
            flex-direction: row;
            align-items: flex-start;
          }
        }

        @media (min-width: 780px) {
          .service-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .process-list {
            grid-template-columns: repeat(4, 1fr);
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
