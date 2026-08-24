import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import DestinationCard from "../../components/DestinationCard";
import CategoryCard from "../../components/CategoryCard";
import SectionHeader from "../../components/SectionHeader";
import RevealOnScroll from "../../components/RevealOnScroll";
import Newsletter from "../../components/Newsletter";
import { categories, destinations } from "../../lib/site";

export default function DestinationsIndex() {
  const url = "/destinations";
  const title = "Family Destinations";
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />

      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Destination guides</span>
          <h1>Family destinations, sorted by the fun</h1>
          <p>
            Real guides to the places families love most — with the ages, trip
            lengths and seasons that make each one shine.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <RevealOnScroll>
            <div className="grid">
              {destinations.map((d) => (
                <DestinationCard key={d.slug} destination={d} />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section band-soft">
        <div className="container">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="By vacation type"
              title="Browse by the kind of trip"
              intro="Not sure where to start? Pick a vibe and explore from there."
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="cat-grid">
              {categories.map((c) => (
                <CategoryCard key={c.slug} category={c} />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Newsletter />

      <style jsx>{`
        .page-hero {
          padding: 3rem 0 1rem;
          background: radial-gradient(
            100% 120% at 80% 0%,
            rgba(79, 176, 217, 0.14),
            transparent 60%
          );
        }
        h1 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3.25rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0.75rem 0 0;
          max-width: 20ch;
        }
        .page-hero p {
          margin: 1rem 0 0;
          max-width: 40rem;
          color: var(--color-muted);
          font-size: 1.1rem;
          line-height: 1.6;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 18rem;
          gap: 1.5rem;
        }
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .band-soft {
          background: linear-gradient(
            180deg,
            rgba(79, 176, 217, 0.06),
            rgba(255, 201, 77, 0.05)
          );
        }
        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 620px) {
          .grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 16rem;
          }
          .cat-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
}
