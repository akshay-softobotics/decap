import { useState } from "react";
import Image from "next/image";
import { IMAGES } from "../lib/images";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="section">
      <div className="container">
        <div className="band">
          <div className="bg" aria-hidden="true">
            <Image
              src={IMAGES.newsletter}
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="content">
            <span className="eyebrow light">Never miss an idea</span>
            <h2>Get more family adventures</h2>
            <p>
              Vacation ideas, family travel tips and destination inspiration
              delivered to your inbox — no spam, just good trips.
            </p>
            {done ? (
              <p className="thanks">You&apos;re signed up — adventure awaits! 🎉</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
              >
                <label htmlFor="nl-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  Sign Me Up
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .band {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 4rem);
          box-shadow: var(--shadow-lg);
          isolation: isolate;
        }
        .bg {
          position: absolute;
          inset: 0;
          z-index: -2;
        }
        .band::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(
            110deg,
            rgba(14, 124, 168, 0.94) 0%,
            rgba(14, 124, 168, 0.8) 45%,
            rgba(15, 42, 67, 0.55) 100%
          );
        }
        .content {
          max-width: 34rem;
          color: #fff;
        }
        .eyebrow.light {
          color: var(--color-sun);
        }
        h2 {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(1.75rem, 4vw, 2.6rem);
          margin: 0.5rem 0 0;
        }
        .content > p {
          margin: 0.85rem 0 1.75rem;
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.92);
        }
        form {
          display: flex;
          gap: 0.6rem;
          max-width: 30rem;
        }
        input {
          flex: 1 1 auto;
          border: none;
          border-radius: var(--radius-pill);
          padding: 0.9em 1.2em;
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--color-ink);
        }
        input:focus-visible {
          outline: 3px solid var(--color-sun);
          outline-offset: 2px;
        }
        .thanks {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--color-sun);
          margin: 0;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        @media (max-width: 520px) {
          form {
            flex-direction: column;
          }
          .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
