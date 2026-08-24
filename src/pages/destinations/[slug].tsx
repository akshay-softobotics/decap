import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Layout from "../../components/Layout";
import BasicMeta from "../../components/meta/BasicMeta";
import OpenGraphMeta from "../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../components/meta/TwitterCardMeta";
import Breadcrumbs from "../../components/Breadcrumbs";
import QuickFacts from "../../components/QuickFacts";
import ItineraryTimeline from "../../components/ItineraryTimeline";
import CTASection from "../../components/CTASection";
import { destinations, getDestination, Destination } from "../../lib/site";
import { fetchPostContent } from "../../lib/posts";

type RelatedPost = { slug: string; title: string };

type Props = {
  destination: Destination;
  related: RelatedPost[];
};

export default function DestinationDetail({ destination, related }: Props) {
  const url = `/destinations/${destination.slug}`;
  const title = `Family Vacation Guide: ${destination.name}`;
  return (
    <Layout>
      <BasicMeta url={url} title={title} description={destination.blurb} />
      <OpenGraphMeta url={url} title={title} description={destination.blurb} />
      <TwitterCardMeta url={url} title={title} description={destination.blurb} />

      {/* Hero */}
      <section className="hero">
        <div className="hero-img">
          <Image
            src={destination.image}
            alt={`${destination.name}, ${destination.region}`}
            fill
            sizes="100vw"
            priority
            style={{ objectFit: "cover" }}
          />
          <span className="scrim" aria-hidden="true" />
        </div>
        <div className="container hero-copy">
          <span className="badge">{destination.bestFor}</span>
          <h1>Family Vacation Guide: {destination.name}</h1>
          <p>{destination.blurb}</p>
        </div>
      </section>

      <div className="container crumbs-row">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Destinations", href: "/destinations" },
            { label: destination.name },
          ]}
        />
      </div>

      <div className="container layout">
        <article className="main">
          <section>
            <h2>Why families love it</h2>
            <ul className="ticks">
              {destination.whyLove.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Best time to visit</h2>
            <p>{destination.bestTime}</p>
          </section>

          <section>
            <h2>Where to stay</h2>
            <div className="stack">
              {destination.stay.map((s) => (
                <div className="line" key={s.name}>
                  <strong>{s.name}</strong>
                  <span>{s.note}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Things to do</h2>
            <ul className="chips">
              {destination.thingsToDo.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Family-friendly restaurants</h2>
            <div className="stack">
              {destination.restaurants.map((r) => (
                <div className="line" key={r.name}>
                  <strong>{r.name}</strong>
                  <span>{r.note}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <ItineraryTimeline
              title={`A ${destination.itinerary.length}-day family ${destination.name} adventure`}
              days={destination.itinerary}
            />
          </section>

          <section>
            <h2>Budget guide</h2>
            <p>{destination.budget}</p>
          </section>

          <section>
            <h2>Travel tips</h2>
            <ul className="ticks">
              {destination.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </article>

        <div className="side">
          <div className="sticky">
            <QuickFacts destination={destination} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section related-wrap">
          <div className="container">
            <h2 className="related-title">More family travel ideas</h2>
            <div className="related">
              {related.map((p) => (
                <Link key={p.slug} href={`/posts/${p.slug}`} className="rel-card arrow-parent">
                  <span className="rel-kicker">Blog</span>
                  <span className="rel-title">{p.title}</span>
                  <span className="rel-go">
                    Read article <span className="arrow" aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={`Ready to plan your ${destination.name} trip?`}
        text="Use the planner to match this destination to your family's ages and travel style."
        primary={{ href: "/#planner", label: "Start planning" }}
        secondary={{ href: "/destinations", label: "More destinations" }}
      />

      <style jsx>{`
        .hero {
          position: relative;
        }
        .hero-img {
          position: relative;
          height: clamp(20rem, 45vw, 30rem);
        }
        .scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(15, 42, 67, 0.85),
            rgba(15, 42, 67, 0.25) 55%,
            rgba(15, 42, 67, 0.35)
          );
        }
        .hero-copy {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding-bottom: 2.25rem;
          color: #fff;
        }
        .badge {
          display: inline-block;
          background: var(--color-coral);
          color: #fff;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-pill);
        }
        h1 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3.25rem);
          line-height: 1.05;
          margin: 0.85rem 0 0;
          max-width: 18ch;
        }
        .hero-copy p {
          margin: 0.75rem 0 0;
          max-width: 40rem;
          font-size: 1.1rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.92);
        }
        .crumbs-row {
          padding-top: 1.5rem;
          padding-bottom: 0.5rem;
        }

        .layout {
          display: grid;
          grid-template-columns: 1fr 20rem;
          gap: 3rem;
          padding-top: 1.5rem;
          padding-bottom: 3rem;
          align-items: start;
        }
        .main section {
          padding: 1.75rem 0;
          border-top: 1px solid var(--color-border);
        }
        .main section:first-child {
          border-top: none;
          padding-top: 0.5rem;
        }
        .main :global(h2) {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.6rem;
          margin: 0 0 1rem;
        }
        .main p {
          margin: 0;
          color: var(--color-muted);
          font-size: 1.08rem;
          line-height: 1.7;
        }
        .ticks {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .ticks li {
          position: relative;
          padding-left: 2rem;
          line-height: 1.55;
          color: var(--color-ink);
        }
        .ticks li::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 0;
          width: 1.4rem;
          height: 1.4rem;
          background: var(--color-green);
          color: #fff;
          border-radius: 50%;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stack {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .line {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          padding: 1rem 1.15rem;
        }
        .line strong {
          font-weight: 700;
        }
        .line span {
          color: var(--color-muted);
        }
        .chips {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .chips li {
          background: var(--color-accent-dim);
          color: var(--color-ocean);
          font-weight: 600;
          padding: 0.5rem 0.9rem;
          border-radius: var(--radius-pill);
        }
        .sticky {
          position: sticky;
          top: calc(var(--header-h) + 1.5rem);
        }

        .related-wrap {
          background: linear-gradient(
            180deg,
            rgba(79, 176, 217, 0.06),
            rgba(255, 201, 77, 0.05)
          );
        }
        .related-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.5rem, 3.5vw, 2.1rem);
          margin: 0 0 1.75rem;
        }
        .related {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 900px) {
          .layout {
            grid-template-columns: 1fr;
          }
          .sticky {
            position: static;
          }
          .related {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <style jsx global>{`
        .rel-card {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          color: var(--color-ink);
          box-shadow: var(--shadow-sm);
          min-height: 11rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .rel-card:hover {
          color: var(--color-ink);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }
        .rel-kicker {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-coral);
        }
        .rel-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.2rem;
          line-height: 1.25;
          flex: 1 1 auto;
        }
        .rel-go {
          font-weight: 700;
          color: var(--color-ocean);
          font-size: 0.92rem;
        }
      `}</style>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: destinations.map((d) => `/destinations/${d.slug}`),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const destination = getDestination(slug);
  if (!destination) {
    return { notFound: true };
  }
  const related: RelatedPost[] = fetchPostContent()
    .slice(0, 3)
    .map((p) => ({ slug: p.slug, title: p.title }));
  return {
    props: { destination, related },
  };
};
