# Website redesign — design spec

Date: 2026-08-24

## Goal

Transform the existing Next.js/Netlify blog template (static export, styled-jsx + CSS
variables, MDX content) into a full modern company website: Home, Services, About,
Contact, and a completely redesigned Blog listing + article experience — without
breaking existing blog functionality (routing, slugs, frontmatter, tags, pagination,
static generation, search).

## Constraints carried over from the current codebase

- `next.config.js` has `output: "export"` — no server runtime, no API routes, no
  `next/image` optimization. All new visuals are inline SVG or plain `<img>`.
- Styling is CSS custom properties (`public/styles/global.css`) + per-component
  `styled-jsx`. No Tailwind, no CSS-in-JS library beyond styled-jsx. This stays.
- Content model: MDX files in `content/posts/*.mdx` with YAML frontmatter
  (`slug/title/date/author/tags`), tags/authors defined in `meta/tags.yml` /
  `meta/authors.yml`, site config in `config.json` read via `src/lib/config.ts`.
  None of this changes shape — only additive fields where noted.
- One existing test (`src/__tests__/pagination.test.ts`) must keep passing.

## Decisions (confirmed with user)

- **Content for Services/About/Contact**: generic, clearly-placeholder professional
  copy, easy to swap later. No invented real-world facts.
- **Visual system**: extend the current tokens (indigo accent `#3454D1`, orange CTA
  `#e1622f`, cream paper background, Fraunces display + Ubuntu body) rather than
  replace them.
- **Imagery**: hand-built inline SVG illustrations/abstract shapes/icons (matching the
  existing `BlogHero.tsx` illustration style) — no stock photos, no broken image URLs.
- **Rollout**: one full implementation plan, executed end to end.

## Tech approach

- No new UI framework/CSS framework. Extend `global.css` tokens, keep `styled-jsx`.
- Add `rehype-slug` to the MDX pipeline (`serialize()` call in `[post].tsx`) so
  headings get `id`s — required for the table of contents and in-page anchors. This
  is the only content-pipeline change; frontmatter/slugs/routing are untouched.
  `rehype-slug` depends on `github-slugger`; the same `github-slugger` instance is
  used when extracting the `headings[]` array in `getStaticProps` (see §2
  `TableOfContents`), so generated ids always match the anchors rehype-slug puts on
  the rendered headings.
- No `next/image` anywhere (confirmed incompatible with this project's static export
  config from prior work in this repo).
- Animations: a tiny local `useReveal` hook (IntersectionObserver-based fade-up) — no
  new dependency. All transitions respect `prefers-reduced-motion` via a global CSS
  rule.
- New static content files (services, team, FAQ) live in `meta/*.yml`, loaded the same
  way `tags.yml`/`authors.yml` already are — consistent with the existing pattern.

## 1. Design tokens (`global.css`)

Keep all existing tokens. Add:
- `--color-ink-section` / `--color-on-ink` — dark section background + light text,
  for the full-width CTA band and footer (breaks up the current all-cream page).
- `--shadow-sm/md/lg` — one elevation scale used by every card/hover state instead of
  each component inventing its own `box-shadow`.
- `--radius-sm/md/lg` — one radius scale.
- A `@media (prefers-reduced-motion: reduce)` global rule disabling transitions.

## 2. Shared components (`src/components/`)

New:
- `Navbar` (replaces `Navigation`) — sticky, transparent-over-hero → blurred
  background on scroll (scroll listener, `backdrop-filter`), active-route state,
  desktop menu (Home/Services/About Us/Blog/Contact) + "Get Started" CTA button
  linking to `/contact`.
- `MobileMenu` — full-screen drawer, reuses `Burger`, focus-trapped, closes on route
  change and `Escape`.
- `SectionHeader` — eyebrow + heading + optional description, used by every page
  section for consistent hierarchy.
- `Hero` — generic hero shell (headline, supporting copy, primary/secondary CTA
  slot, visual slot) reused by Home/Services/About/Contact/Blog hero variants.
- `ServiceCard` — icon, title, description, "Learn more" link.
- `StatCard` — number + label, used by the homepage trust section and About stats.
- `FeaturedPost` — large two-column featured-article layout (image, category, title,
  excerpt, author, date, read time, CTA link). Used on Home and at the top of the
  blog listing.
- `BlogCard` — replaces the current `PostItem` card: bigger cover, category badge,
  title, excerpt, author avatar, date, read time, hover zoom/elevation.
- `CategoryFilter` — horizontal pill row (`All` + each tag), active-state styling,
  client-side filtering of the already-fetched post list (no new data fetching).
- `Newsletter` — extracted from `BlogSidebar`'s inline form so Contact/Footer/Blog
  sidebar can all use the same visual card.
- `CTASection` — full-width dark band with heading + button, used on Home and re-used
  (with different copy) at the bottom of Services/About/Contact.
- `TableOfContents` — reads a `headings: {id, text, depth}[]` array (built at
  build-time in `getStaticProps` by parsing the MDX source for `#`/`##`/`###` lines)
  and renders a sticky, scrollspy-highlighted nav on desktop.
- `ReadingProgress` — fixed top progress bar, `scroll` listener against the article
  container's height.
- `ShareButtons` — copy-link + X/LinkedIn intent links (all static `<a href>`, no SDK).
- `RelatedPosts` — posts sharing a tag with the current post (fallback: most recent),
  computed in `getStaticProps`.
- `PostNav` — previous/next article, computed from the already-sorted
  `fetchPostContent()` list.

Kept and restyled in place (visual pass only, same props/contract):
`Footer`, `BlogHero`, `BlogSidebar` (becomes categories-pills + popular posts +
`Newsletter`), `PostCover` (add a `large` variant for the featured slot and article
hero), `PostItem`/`PostList` logic folds into `BlogCard`/the new blog page, `Pagination`,
`TagButton`, `Author`, `Date`, `Copyright`, `SocialList`.

## 3. Content/data additions

- `meta/services.yml` — id/title/description/icon-key list (6 services from the brief:
  Consulting, Digital Solutions, Strategy, Technology, Design, Development).
- `meta/faq.yml` — question/answer pairs for the Contact page.
- Optional `team` entries reuse the existing `meta/authors.yml` shape (name +
  introduction) rather than inventing a parallel schema — About page's team section
  reads from there.
- `PostContent` type gains one optional field, `coverImage?: string`, read from
  frontmatter if present; `PostCover` falls back to the current gradient+letter
  treatment when absent. Existing posts are unaffected (no frontmatter changes
  required).

## 4. Pages

**`src/pages/index.tsx` (Home)** — Hero (headline/subhead/two CTAs/SVG illustration) →
stats strip (`StatCard` ×4) → Services section (`ServiceCard` grid, data from
`services.yml`) → Featured content (`FeaturedPost` + two smaller `BlogCard`s, data
from `fetchPostContent()`) → About split section (SVG visual + eyebrow/heading/copy/
benefits list/CTA) → `CTASection`.

**`src/pages/services.tsx` (new)** — Hero → `ServiceCard` grid (all of
`services.yml`) → a "how we work" numbered-steps section → `CTASection`.

**`src/pages/about.tsx` (new)** — Hero → Our Story → Mission/Vision (two-column) →
Values grid → Team grid (from `authors.yml`) → Stats strip (reuse `StatCard`) →
`CTASection`.

**`src/pages/contact.tsx` (new)** — Hero → contact info cards (email/phone/location,
placeholder values) + a client-side-validated form (name/email/message; on submit,
shows a success state like the existing newsletter form does — no backend, per
current static-export constraint) → FAQ accordion (from `faq.yml`) → `CTASection`.

**`src/pages/posts/index.tsx` + `page/[page].tsx` (Blog listing)** — `BlogHero`
(eyebrow "Our Blog", heading, search) → `CategoryFilter` → `FeaturedPost` (most
recent post) → responsive `BlogCard` grid (3/2/1 cols) for the rest → sidebar
(`BlogSidebar`: categories pills + popular posts + `Newsletter`) → existing
`Pagination` kept as-is. Search/filter logic is the same client-side approach
already in `PostList`, extended to also match `excerpt`/`tags` text per the brief
(title/description/content/tags) and to combine with the active category filter.
Empty state: "No articles found" + helper text.

**`src/pages/posts/[post].tsx` + `PostLayout` (Article)** — `ArticleHeader`
(category/title/excerpt/author+avatar/date/read time) → large `PostCover` hero →
two-column body on desktop (sticky `TableOfContents` + `ReadingProgress` bar |
article content) → `ShareButtons` → `PostNav` (prev/next) → `RelatedPosts`. Content
typography (`content.module.css`) rewritten against the design tokens (currently
hardcoded `#222`/`blue`/`#9b9b9b`) covering h1–h3, paragraphs, lists, blockquotes,
code blocks, images, tables, links, at a 720px reading width.

**`src/pages/posts/tags/[[...slug]].tsx`** — visual pass only (reuses `BlogCard`
grid), no logic change.

**`Navbar`/`Footer`** used via `Layout` on every page above, including existing
`posts/*` routes — one integration point, no per-page wiring.

## 5. SEO & accessibility

- Every new page uses the existing `BasicMeta`/`OpenGraphMeta`/`TwitterCardMeta`
  (and `JsonLdMeta` where applicable) components with page-specific title/description
  — same pattern already used on `posts/index.tsx`.
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`), one `<h1>` per page,
  descending heading order within sections.
- Visible focus states added globally (`:focus-visible`) since the current CSS has
  none beyond default browser outline.
- All interactive icon-only controls (burger, search icon, share icons) get
  `aria-label`s. Form inputs get associated `<label>`s (contact form, newsletter,
  search already has one).

## 6. Verification

- `npm run test` (jest) must still pass (`pagination.test.ts`).
- `npm run build` (static export) must succeed with no type or build errors.
- `npm run dev` manual pass over every route: `/`, `/services`, `/about`, `/contact`,
  `/posts`, `/posts/page/2`, `/posts/[a real slug]`, `/posts/tags/[[...slug]]` — desktop
  and a mobile viewport, checking nav (including mobile drawer), blog search, category
  filter, pagination, TOC/scrollspy, share links, prev/next, related posts, and browser
  console for errors.

## Out of scope

- Real photography, a real CMS-backed contact form/backend, real company copy,
  Tailwind or any new CSS framework, changes to the MDX frontmatter contract for
  existing posts, changes to routing/slugs, i18n.
