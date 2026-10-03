# M&A Deal Tracker

A university coursework project for an M&A class. It's a filterable tracker of
27 large mergers and acquisitions announced between 2016 and 2024, showing what
was paid, how it was paid for, the reasoning the acquirer gave, and what
happened between signing and closing.

**Live site:** _(add the Vercel URL here after deploying)_

## What's in it

- **Dashboard** with headline figures (combined deal value, median premium,
  completion rate, largest deal) and two charts: deal value by announcement
  year, and deal value by sector. Everything responds to the filters.
- **Filters and sorting** by sector, deal structure, status, year and free-text
  search; sortable by value, date or premium.
- **A page per deal** with the timeline from announcement to closing, the
  strategic reasoning, what happened in regulatory review, the terms, other
  deals in the same sector, and a link to the source.
- **Method & concepts** page explaining what the data encodes.

## Concepts covered

| Concept | Where it shows up |
|---|---|
| Deal structure | horizontal / vertical / conglomerate / LBO, tagged and filterable |
| Consideration | cash, stock or mixed — AMD-Xilinx shows the price risk in all-stock deals |
| Acquisition premium | premium over the unaffected share price, with the median in the KPI row |
| Deal certainty | time from announcement to closing, plus the three deals that collapsed |
| Antitrust remedies | divestitures vs conduct orders, in each deal's notes |

## Data

The dataset is one hand-written TypeScript file, [`lib/deals.ts`](lib/deals.ts).
There's no backend or API. Values are the headline figures reported at
announcement; premiums are rounded, and left blank where no clean figure exists
(mergers of equals, renegotiated prices, contested auctions). Every deal links
to a company press release, an SEC filing, or a regulator statement, and all of
those links were checked.

## Tech

Next.js 16 (App Router), TypeScript, Tailwind CSS v4. The charts are plain
HTML and CSS rather than a charting library. Every page is statically
prerendered.

Colours come from [`lib/palette.ts`](lib/palette.ts) and were checked for
colourblind separation and contrast against the dark background. Deal status
uses a symbol and a label as well as a colour, so it doesn't rely on colour
alone.

## Running it locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Deployment

GitHub + Vercel. Vercel detects Next.js automatically, so there are no
environment variables or build settings to configure, and every push to `main`
redeploys.

---

Figures are for coursework. Not investment advice.
