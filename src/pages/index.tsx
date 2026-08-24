import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import Hero from "../components/Hero";
import SectionHeader from "../components/SectionHeader";
import CategoryCard from "../components/CategoryCard";
import DestinationCard from "../components/DestinationCard";
import ActivityCard from "../components/ActivityCard";
import Planner from "../components/Planner";
import AgeIdeas from "../components/AgeIdeas";
import ReviewCard from "../components/ReviewCard";
import Newsletter from "../components/Newsletter";
import RevealOnScroll from "../components/RevealOnScroll";
import { categories, destinations, activities, testimonials } from "../lib/site";

export default function Index() {
  const featured = destinations.slice(0, 6);
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />

      <Hero />

      {/* Vacation discovery */}
      <section className="section" id="discover">
        <div className="container">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="Start here"
              title="Find your family's next adventure"
              intro="Pick a vibe and we'll show you where families like yours are headed."
              link={{ href: "/destinations", label: "See all destinations" }}
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

      {/* Featured destinations */}
      <section className="section band-soft">
        <div className="container">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="Featured destinations"
              title="Places kids beg to go back to"
              intro="Hand-picked spots that work as hard for the grown-ups as they do for the kids."
              link={{ href: "/destinations", label: "Browse the guides" }}
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="dest-editorial">
              {featured.map((d, i) => (
                <div
                  key={d.slug}
                  className={i === 0 ? "cell feature-cell" : "cell"}
                >
                  <DestinationCard
                    destination={d}
                    variant={i === 0 ? "feature" : "default"}
                  />
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Planner */}
      <RevealOnScroll>
        <Planner />
      </RevealOnScroll>

      {/* Things to do */}
      <section className="section" id="things-to-do">
        <div className="container">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="Things to do"
              title="Something for every kind of kid"
              intro="From animal encounters to quiet museum afternoons — the moments that make trips memorable."
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="act-rail no-scrollbar">
              {activities.map((a) => (
                <div className="act-cell" key={a.slug}>
                  <ActivityCard activity={a} />
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Age-based ideas */}
      <section className="section band-soft" id="age-ideas">
        <div className="container">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="By age"
              title="Vacations that match their age"
              intro="What delights a toddler bores a teen. Here's what works, stage by stage."
              align="center"
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <AgeIdeas />
          </RevealOnScroll>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <RevealOnScroll>
            <SectionHeader
              eyebrow="Loved by families"
              title="Trusted by parents like you"
              align="center"
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="reviews">
              {testimonials.map((t) => (
                <ReviewCard key={t.name} review={t} />
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Newsletter */}
      <RevealOnScroll>
        <Newsletter />
      </RevealOnScroll>

      <style jsx>{`
        .band-soft {
          background: linear-gradient(
            180deg,
            rgba(79, 176, 217, 0.06),
            rgba(255, 201, 77, 0.05)
          );
        }
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .dest-editorial {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: minmax(13rem, 1fr);
          gap: 1.5rem;
        }
        .reviews {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .act-rail {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .cat-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .reviews {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 900px) {
          .dest-editorial {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
          }
        }
        /* Activities scroll horizontally on smaller screens */
        @media (max-width: 760px) {
          .act-rail {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 1rem;
            margin: 0 -1.5rem;
            padding: 0 1.5rem 0.5rem;
          }
          .act-cell {
            flex: 0 0 60%;
            scroll-snap-align: start;
          }
        }
        @media (max-width: 520px) {
          .cat-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <style jsx global>{`
        @media (min-width: 901px) {
          .dest-editorial .feature-cell {
            grid-column: span 2;
            grid-row: span 2;
          }
        }
        .dest-editorial .cell {
          min-width: 0;
        }
        .dest-editorial .cell :global(.dest-card) {
          height: 100%;
        }
      `}</style>
    </Layout>
  );
}
