# Md Asifuzzaman Suvo — Portfolio

Personal portfolio site built with Next.js, with all content managed in Sanity and an AI assistant powered by Groq.

**Live:** [asifsuvo.netlify.app](https://asifsuvo.netlify.app/)

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · Sanity · Groq API

## How content works

```
Studio (sanity.studio)  ──publish──▶  Sanity Content Lake ──signed webhook──▶  /api/revalidate
                                              │                                      │
                                              │                              revalidateTag("portfolio")
                                              ▼                                      ▼
Visitor ─────────────────────────────▶  static page on Netlify  ◀──regenerate──  app/page.tsx
```

- The page is **static** and served from cache. Visitors never wait on the CMS.
- Publishing in the Studio fires a signed webhook that invalidates the `portfolio` cache tag; the next request regenerates the page. No rebuild, no deploy.
- One GROQ query (`sanity/queries/portfolio.ts`) fetches the whole page in `app/page.tsx`. Sections are presentational and receive typed props.
- If Sanity is unconfigured or unreachable, the site falls back to `sanity/baseline.ts` — a CMS outage cannot take the portfolio down.
- The AI assistant's factual context is generated from the same cached content (`sanity/assistant-context.ts`), so it can never drift from the site.

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Without Sanity configured the site renders the baseline content.

## Sanity setup (one time)

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) with a public `production` dataset. Note the **project ID**.
2. Add the project vars to `.env.local` (see below) and to `studio/.env.local`.
3. Seed the current content and upload the portrait:

   ```bash
   npm run seed             # creates missing documents only
   npm run seed -- --force  # also overwrites existing ones
   ```

4. Start the Studio and upload the CV PDF under **Site settings → Resume**:

   ```bash
   npm run studio           # http://localhost:3333
   ```

5. Deploy the Studio to `<name>.sanity.studio`:

   ```bash
   npm run studio:deploy
   ```

6. In [sanity.io/manage](https://www.sanity.io/manage) → **API → Webhooks**, add:

   | Field | Value |
   |---|---|
   | URL | `https://asifsuvo.netlify.app/api/revalidate` |
   | Dataset | `production` |
   | Trigger on | Create, Update, Delete |
   | Filter | `_type in ["siteSettings","homePage","assistantSettings","experience","project","skillCategory","education","contribution"]` |
   | HTTP method | `POST` |
   | Secret | same value as `SANITY_REVALIDATE_SECRET` |

## Updating the CV

Studio → **Site settings → Resume** → replace the PDF → **Publish**. The webhook regenerates the page and the download button points at the new file. No code change and no rebuild.

## Environment variables

| Variable | Required | Where | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | App | Sanity project ID. Public — **do not** mark as secret |
| `NEXT_PUBLIC_SANITY_DATASET` | No | App | Defaults to `production`. Public |
| `SANITY_REVALIDATE_SECRET` | Yes | App | Shared secret for the publish webhook. **Secret** |
| `GROQ_API_KEY` | Yes | App | Groq API key for `/api/chat`. **Secret** |
| `SANITY_API_WRITE_TOKEN` | Seeding only | Local | Editor token, used by `npm run seed`. Never set in Netlify |
| `NEXT_PUBLIC_CV_URL` | No | App | Pre-Sanity fallback CV url. Ignored once a CV is uploaded to Sanity |
| `SANITY_STUDIO_PROJECT_ID` | Yes | `studio/.env.local` | Same project ID — the Sanity CLI only reads `SANITY_STUDIO_*` |
| `SANITY_STUDIO_DATASET` | No | `studio/.env.local` | Defaults to `production` |

**Local:** create `.env.local` (app) and `studio/.env.local` (Studio). Neither is committed.

**Production (Netlify):** Site configuration → Environment variables. Mark `GROQ_API_KEY` and `SANITY_REVALIDATE_SECRET` as sensitive; leave the `NEXT_PUBLIC_*` ones normal. `netlify.toml` already excludes the public vars from secrets scanning.

## Scripts

```bash
npm run dev            # development
npm run build          # production build
npm run start          # serve production build
npm run lint           # eslint
npm run typecheck      # tsc --noEmit

npm run studio         # Sanity Studio at :3333
npm run studio:deploy  # deploy Studio to *.sanity.studio
npm run typegen        # extract schema + generate sanity/types.generated.ts
npm run seed           # migrate baseline content into Sanity
```

## Deploy

Hosted on [Netlify](https://www.netlify.com/). Push to `main` triggers a deploy. The Studio is deployed separately with `npm run studio:deploy` and only needs redeploying when schemas change.
