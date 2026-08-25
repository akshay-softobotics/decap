# Design-Change Prompt (Template Usage Guide)

This repo is a base starter template: a Next.js business site + blog, statically
exported and deployed to Cloudflare Workers/Netlify, with content editable via a
Decap CMS admin panel (see `CLAUDE.md` for the full architecture). It currently
ships five pages — Home (`/`), Services (`/services`), About (`/about`),
Blog (`/posts` + pagination + tags + post detail), and Contact (`/contact`) —
under "Fuller" placeholder branding.

Anyone forking it to build their own site should use the prompt below when asking
Claude Code to restyle it. It scopes Claude to **visual/design changes only** and
keeps the underlying config, data, and build setup untouched.

Copy everything in the box below into your Claude Code session, then fill in the
`<DESIGN INPUT>` section with your reference (screenshot, Figma link, color palette,
mood description, or "make it look like <site>").

---

## Prompt to paste

```
You are restyling this Next.js business site + blog starter template to match a
new visual design. This is a DESIGN-ONLY task. Do not change configuration, data,
content, routing, or build/deploy setup — only how things look.

## Never touch (config, data, infra, logic)
- config.json                          (site metadata — title, description, base_url, socials, etc.)
- next.config.js, netlify.toml, wrangler.jsonc, tsconfig.json, jest.config.js
- package.json, package-lock.json      (no new dependencies, no version bumps)
- content/**                           (blog post MDX files)
- meta/**.yml                          (authors, tags, services, projects, features, faq — structured content)
- src/lib/**                           (config.ts, posts.ts, pagination.ts, tags.ts, authors.ts,
                                         services.ts, projects.ts, features.ts, faq.ts, nav.ts)
- src/components/meta/**               (BasicMeta, OpenGraphMeta, TwitterCardMeta, JsonLdMeta — SEO, not visual)
- public/admin/config.yml              (Decap CMS collections/fields/backend — not visual, breaks the CMS)
- Any getStaticProps / getStaticPaths / data-fetching logic in src/pages/**
- Routing structure, URL slugs, page file names
- src/__tests__/**                     (do not edit tests to make them pass — fix your CSS instead)

## Where design changes are allowed
- public/styles/global.css (design tokens: colors, fonts, spacing, radii, shadows —
  DO NOT change `html, body, #__next` from `min-height: 100%` to `height: 100%`,
  that reintroduces a scroll-height bug) and public/styles/content.module.css
  (MDX body content styling)
- `<style jsx>` blocks inside src/components/**.tsx and src/pages/**.tsx
- JSX markup/structure WITHIN a component, as long as you don't change what
  props/data it receives or remove functionality (e.g. reordering elements,
  adding wrapper divs, adding purely presentational new components)
- Static assets in public/ (images, icons, fonts) and public/admin/config.yml's
  `logo_url` if the design calls for a different CMS admin logo
- Adding brand-new presentational components (e.g. a Hero section) that consume
  existing data via existing lib functions/props — not new data sources

## Rules
1. Preserve every existing feature across ALL pages: home sections, services
   listing, about/team, contact form/FAQ, blog pagination, tag filtering, post
   list/detail pages, SEO tags, and all current routes/URLs.
2. Do not introduce new npm packages (no Tailwind, no UI kit, no icon library)
   unless I explicitly ask for one by name. There is no Tailwind/CSS-in-JS
   runtime today — just CSS custom properties + styled-jsx; keep that approach.
3. Do not change any text/copy from config.json, meta/**.yml, or content/**
   unless the design input explicitly includes new copy.
4. Keep it responsive — test mobile, tablet, and desktop breakpoints.
5. Keep accessibility intact (contrast, focus states, alt text, semantic tags).
6. After making changes, run `npm run build` and `npm test` and confirm both
   pass before reporting done. If you can, spin up `npm run dev` and click
   through the golden paths (home, services, about, blog list, a post, tags,
   contact) rather than relying on the build alone.
7. If the design request implies something outside pure styling (e.g. "add a
   newsletter signup" needs new data/logic, or "change the site name" needs
   config.json), STOP and ask me for confirmation before touching anything
   outside the allowed list above.

## Design input
<DESIGN INPUT>
Paste your design reference here: a screenshot, a Figma/URL link, a written
description of look-and-feel (colors, fonts, spacing, tone, layout references),
or "match the style of <site>".
</DESIGN INPUT>

Apply this design across all pages/components consistently (home, services,
about, blog list, post detail, tags, contact, navigation, footer) and summarize
what you changed and why at the end.
```
