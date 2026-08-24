import { useState } from "react";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import Hero from "../components/Hero";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";
import CTASection from "../components/CTASection";
import { listFaqs } from "../lib/faq";

const CONTACT_CARDS = [
  { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
  { label: "Phone", value: "+1 (555) 010-2020", href: "tel:+15550102020" },
  { label: "Location", value: "Remote-first, worldwide", href: undefined },
];

type Errors = { name?: string; email?: string; message?: string };

export default function Contact() {
  const faqs = listFaqs();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) {
      next.name = "Please enter your name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) {
      next.message = "Please add a short message.";
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
    }
  }

  const url = "/contact";
  const title = "Contact";

  return (
    <Layout>
      <BasicMeta url={url} title={title} description="Get in touch — email, phone, or send us a message." />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />

      <Hero
        eyebrow="Get in touch"
        title="Let's talk about your project"
        description="Whether you have a scoped brief or just a rough idea, tell us about it — we reply to every message within one business day."
        compact
      />

      <section className="section">
        <div className="inner cards-grid">
          {CONTACT_CARDS.map((c, i) => (
            <Reveal key={c.label} delay={i * 60} className="info-card">
              <span className="label">{c.label}</span>
              {c.href ? (
                <a href={c.href}>{c.value}</a>
              ) : (
                <span className="value">{c.value}</span>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section form-section">
        <div className="inner">
          <div className="form-wrap">
            <SectionHeader eyebrow="Send a message" title="Tell us about your project" />
            {submitted ? (
              <div className="success" role="status">
                <h3>Message sent</h3>
                <p>Thanks for reaching out — we'll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={(e) => setValues({ ...values, name: e.target.value })}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <span id="name-error" className="error">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" className="error">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => setValues({ ...values, message: e.target.value })}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <span id="message-error" className="error">
                      {errors.message}
                    </span>
                  )}
                </div>
                <button type="submit" className="btn-primary">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="inner">
          <SectionHeader eyebrow="Questions" title="Frequently asked questions" align="center" />
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Still deciding?"
        title="Book a free 20-minute call"
        description="No pitch deck — just a conversation about what you're trying to build."
        cta={{ label: "Get in touch", href: "mailto:hello@example.com" }}
      />

      <style jsx>{`
        .section {
          padding: 4rem 1.5rem;
        }
        .inner {
          max-width: var(--content-width);
          margin: 0 auto;
        }
        .cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        :global(.info-card) {
          padding: 1.5rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-muted);
        }
        :global(.info-card a),
        .value {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.0625rem;
          color: var(--color-ink);
        }
        .form-section {
          background: var(--color-surface);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
        .form-wrap {
          max-width: 34rem;
          margin: 0 auto;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-ink);
        }
        input,
        textarea {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          padding: 0.75em 1em;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          background: var(--color-paper);
          color: var(--color-ink);
          resize: vertical;
        }
        input:focus,
        textarea:focus {
          outline: none;
          border-color: var(--color-accent);
        }
        .error {
          color: var(--color-cta);
          font-size: 0.8125rem;
        }
        :global(.form-wrap .btn-primary) {
          border: none;
          cursor: pointer;
          font-size: 0.9375rem;
          align-self: flex-start;
        }
        .success {
          padding: 2rem;
          background: var(--color-paper);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
        }
        .success h3 {
          margin: 0 0 0.5rem;
          font-family: var(--font-display);
        }
        .success p {
          margin: 0;
          color: var(--color-muted);
        }
        .faq-list {
          max-width: 42rem;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .faq-item {
          padding: 1.25rem 1.5rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
        }
        .faq-item summary {
          cursor: pointer;
          font-weight: 500;
          font-size: 0.9375rem;
          color: var(--color-ink);
        }
        .faq-item p {
          margin: 0.9rem 0 0;
          color: var(--color-muted);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        @media (min-width: 640px) {
          .cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </Layout>
  );
}
