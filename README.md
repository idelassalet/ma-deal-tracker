# M&A Deal Tracker

A coursework project for an M&A class: a filterable tracker of 27 landmark
mergers and acquisitions announced between 2016 and 2024 — what was paid, how it
was paid for, the strategic logic the acquirer put forward, and what actually
happened between signing and closing.

**Live site:** _(add the Vercel URL here after deploying)_

## What it does

- **Dashboard** — KPI tiles (combined deal value, median premium, completion
  rate, largest deal) over two charts: announced deal value by year, and deal
  value by sector. Everything responds to the filters.
- **Filters & sort** — by sector, deal classification, status, announcement
  year, and free-text search; sortable by value, date, or premium paid.
- **Deal pages** — one static page per transaction with the timeline from
  announcement to resolution, the strategic rationale, what happened in
  regulatory review, the terms, related deals in the same sector, and a link to
  a primary source.
- **Method & concepts** — the M&A ideas the dataset encodes: horizontal /
  vertical / conglomerate / LBO classification, cash vs stock consideration,
  acquisition premium over the unaffected price, and deal certainty.

## M&A concepts covered

| Concept | Where it shows up |
|---|---|
| Deal classification | `dealType` on every deal; filterable; explained on `/about` |
| Consideration mix | cash / stock / mixed — AMD–Xilinx shows stock price risk |
| Acquisition premium | `premiumPct` vs the unaffected share price; median in the KPI row |
| Deal certainty | announcement-to-resolution gap, plus three deals that never closed |
| Antitrust remedies | structural divestitures vs conduct orders, in each deal's notes |

## Data

The dataset is a single hand-curated TypeScript file,
[`lib/deals.ts`](lib/deals.ts) — no backend or API. Values are headline
transaction values as reported at announcement; premiums are rounded and omitted
where no clean figure was reported (mergers of equals, renegotiated prices,
contested auctions). Every deal links to a company press release, SEC filing, or
regulator statement.

## Tech

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4. Charts are plain
HTML/CSS — no charting library. Every page is statically prerendered.

Colors follow a validated data-viz palette ([`lib/palette.ts`](lib/palette.ts)):
the two chart hues clear colorblind-separation and contrast checks against the
dark surface, and deal status is encoded with a glyph and a label as well as
color, never color alone.

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Deploying

Pushed to GitHub and deployed on Vercel. Vercel auto-detects Next.js — no
environment variables or build-setting changes are needed, and every push to
`main` redeploys.

---

Not investment advice. Figures are for teaching purposes.
