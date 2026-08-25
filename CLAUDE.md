# CLAUDE.md

Guidance for Claude Code (or any AI agent / developer) working in this repository.

## Design-only tasks (`DESIGN_PROMPT.md`)

If the user's request is (or starts with) the prompt from `DESIGN_PROMPT.md`, that
prompt is **self-contained and authoritative** for scope — it already lists every
file that's off-limits and every file where design changes are allowed. Do not
re-derive this by exploring the codebase or re-reading this file's Project
Structure/Core Functionality sections first: just follow the allow/deny lists in
the pasted prompt directly. Only fall back to reading this file or the wider repo
if the request goes outside what `DESIGN_PROMPT.md` covers, or its own rule 7
(ambiguous/out-of-scope request) triggers.

## What this project is

A statically-exported Next.js business site + blog ("Fuller" branding by default) with:
- Marketing pages: Home (`/`), Services (`/services`), About (`/about`), Contact (`/contact`)
- A blog: listing (`/posts`), pagination (`/posts/page/[page]`), tag filtering (`/posts/tags/[[...slug]]`), individual posts (`/posts/[post]`)
- Content authored as MDX files with YAML frontmatter, editable via a Decap CMS admin panel at `/admin`
- Deployed as a static export (`next build` → `out/`), served via Cloudflare Workers (`wrangler`) and/or Netlify

This is a **template/starter**. Anyone forking it is expected to reskin the branding, copy, and content for their own business while the underlying mechanics (routing, data-loading, CMS wiring, static export) keep working unmodified.

## Core functionality — do not break this on a fork

These are the load-bearing mechanics. Reskinning/rebranding should never require touching these unless the fork owner explicitly asks for an architecture change:

1. **Static export build**: `next.config.js` sets `output: "export"`. All pages must remain statically generatable — no server-only APIs, no `getServerSideProps`, no API routes that need a live Node server. Output goes to `out/`, published by `netlify.toml` (`publish = "out"`) and `wrangler.jsonc` (`assets.directory: "out"`).
2. **Content pipeline**: `content/posts/*.mdx` (gray-matter frontmatter + MDX body) → parsed in `src/lib/posts.ts` → rendered via `next-mdx-remote` in `src/pages/posts/[post].tsx`. The **filename must equal the `slug` frontmatter field** (`src/lib/posts.ts` throws if they mismatch).
3. **Structured content files** in `meta/*.yml`, loaded through `src/lib/*.ts` wrappers (`authors.ts`, `tags.ts`, `services.ts`, `projects.ts`, `features.ts`, `faq.ts`). These are yaml-loader-imported at build time — shapes matter, see below.
4. **Decap CMS admin** (`public/admin/config.yml` + `public/admin/index.html`) is the non-technical editing surface for `content/posts`, `meta/authors.yml`, `meta/tags.yml`, and `config.json`. It talks to a git-gateway backend (currently PKCE auth via a third-party DecapBridge/DripFunnel-hosted service — see `public/admin/config.yml`'s `backend:` block). If you fork this and want your own CMS auth, you must set up your own git-gateway/Decap backend; the collections/fields schema itself is reusable as-is.
5. **Site-wide config** lives in `config.json` (title, description, keywords, base URL, social handles) typed via `src/lib/config.ts`. This is the single source of truth for site metadata used across `<head>` tags (`src/components/meta/*`).
6. **Global design tokens** in `public/styles/global.css` (`:root` CSS variables: colors, fonts, spacing, `--content-width`). Components use `styled-jsx` (`<style jsx>`) scoped per-component, plus `public/styles/content.module.css` specifically for rendered MDX body content. There is **no Tailwind, no CSS-in-JS runtime library** — just CSS custom properties + styled-jsx. Keep it that way unless explicitly asked to change the styling architecture.
7. **`html, body, #__next` must use `min-height: 100%`, not `height: 100%`** (`public/styles/global.css`). This was a real bug: a fixed `height: 100%` caused mismatched scroll-height calculations and extra blank space below the footer. Don't regress this.
8. **`public/styles/` is intentionally kept outside `src/`** (see comment in `src/pages/_app.tsx`) because Decap CMS's preview pane (`public/admin/index.html`) loads these same stylesheets directly. Do not move it into `src/` even if it looks more "correct" — it will break CMS preview styling.

## What's safe/expected to change on a fork

Everything else is fair game for rebranding without asking:
- `config.json` — site name, description, keywords, social handles, base URL
- CSS variables in `public/styles/global.css` (`:root`) — colors, fonts, radii, shadows
- `src/lib/nav.ts` — nav links, footer link groups
- `meta/*.yml` — authors, tags, services, projects, features, FAQ content
- `content/posts/*.mdx` — actual blog posts
- Copy/JSX inside `src/pages/index.tsx`, `about.tsx`, `services.tsx`, `contact.tsx` and their section components
- `public/images/*`, `src/assets/*`, `public/admin/config.yml`'s `logo_url` — imagery and CMS branding
- `public/admin/config.yml` collections — new content fields for posts/services/projects, as long as the shape change is propagated through the matching `src/lib/*.ts` type and any component reading that field

## Ground rule for changes

**Preserve core functionality unless the user explicitly asks for a behavioral/architectural change.** If a request is ambiguous about whether it wants a cosmetic tweak or a structural change, read the relevant code first (don't guess), then make the minimal change that satisfies the request without altering the mechanics in the "core functionality" list above. If a request *does* require touching core functionality (e.g. switching the CMS backend, dropping static export, changing the styling approach), it should be done deliberately and explicitly — not as a side effect of an unrelated task.

## More detail

Project structure, npm commands, and known constraints/gotchas live in
`docs/ARCHITECTURE.md` — read it on demand for non-design work (features, data
shape changes, build/deploy issues). Skip it for `DESIGN_PROMPT.md`-driven tasks.
