# Md Asifuzzaman Suvo — Portfolio

Personal portfolio site built with Next.js. Includes an AI assistant powered by Groq.

**Live:** [asifsuvo.netlify.app](https://asifsuvo.netlify.app/)

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS · Framer Motion · Groq API

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | Groq API key for `/api/chat` |
| `NEXT_PUBLIC_CV_URL` | No | CV download URL (defaults to `/cv.pdf`) |

**Local:** set keys in `.env.local` (not committed).

**Production (Netlify):** Site configuration → Environment variables → add `GROQ_API_KEY`, then redeploy.

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

## Deploy

Hosted on [Netlify](https://www.netlify.com/). Push to `main` triggers a deploy. Set `GROQ_API_KEY` in Netlify before using the AI assistant in production.
