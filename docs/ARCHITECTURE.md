# Architecture Reference

Detail reference for this repo, split out of `CLAUDE.md` so it isn't auto-loaded
into every session. Read this file on demand — when working on non-design tasks
(features, data shape changes, build/deploy issues, new content types) — not for
pure design/restyle tasks driven by `DESIGN_PROMPT.md`, which is self-contained.

## Project structure

```
content/posts/*.mdx       Blog post content (frontmatter + MDX body)
meta/*.yml                Structured content: authors, tags, services, projects, features, faq
config.json               Site-wide metadata (title, description, keywords, socials)
public/admin/             Decap CMS admin app (config.yml = collections/fields, index.html = loader + preview templates)
public/styles/            Global CSS + MDX content CSS (loaded by _app.tsx AND by the CMS preview pane)
public/images/            Static images referenced by content/config (served at /images/*)
src/pages/                Next.js pages (file-based routing); posts/[post].tsx, posts/page/[page].tsx, posts/tags/[[...slug]].tsx are dynamic
src/components/           React components, one concern each, styled via styled-jsx
src/components/meta/      <head> meta tag components (BasicMeta, OpenGraphMeta, TwitterCardMeta, JsonLdMeta)
src/lib/                  Data loaders/types for content (posts.ts, authors.ts, tags.ts, services.ts, projects.ts, features.ts, faq.ts, nav.ts, config.ts, pagination.ts)
src/__tests__/            Jest tests
```

## Commands

```
npm run dev       # next dev — local dev server
npm run build     # next build — static export to out/
npm run preview   # build then wrangler dev — preview the Cloudflare Worker locally
npm run deploy    # build then wrangler deploy — deploy to Cloudflare Workers
npm test          # jest
```

Always run `npm run build` after any change touching `getStaticProps`/`getStaticPaths`, content shapes in `meta/*.yml`, or `src/lib/*.ts` — static export will fail loudly (e.g. prop serialization errors) if a data shape is wrong, and that's the fastest way to catch it.

## Known constraints / gotchas

- **No server runtime at request time** — this is a fully static export. Anything requiring a database, session, or server-side computation at request time is out of scope unless the fork owner explicitly wants to drop static export and move to a different Next.js output mode.
- **`getStaticProps` props must never contain `undefined`**, including nested optional fields (e.g. `tags?: string[]` on `PostContent`). Default optionals to `[]`/`null` before returning as props — see the pattern in `src/pages/posts/[post].tsx`.
- **Post slug must match filename** exactly (`src/lib/posts.ts` enforces this at build time).
- **PKCE auth in `public/admin/config.yml`** points at a third-party hosted DecapBridge/DripFunnel git-gateway service tied to specific site IDs. This is credential/account-specific — a fork will need its own git-gateway backend (Decap CMS supports several: Netlify Identity, GitHub OAuth, custom PKCE providers, etc.) rather than reusing these values.
