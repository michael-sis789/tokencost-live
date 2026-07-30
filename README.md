# Tokencost.live

Static website for AI pricing calculators, creator cost planning, SaaS profit estimation, and source-backed LLM price research.

## Structure

- `public/` contains the production static site served by Netlify.
- `scripts/sync-llm-prices.js` fetches the latest community-maintained LLM pricing data from `simonw/llm-prices`.
- `scripts/adsense-quality-rebuild.js` regenerates source-backed pricing research, trust pages, sitemap, robots.txt, and reports.
- `.github/workflows/daily-sync.yml` runs the pricing sync every day at 06:00 Malaysia time.

## Deployment

Netlify publish directory:

```bash
public
```

No build command is required for normal static hosting. The daily GitHub Action commits updated pricing data and regenerated pages when upstream pricing changes.

## Verification

After deploy, check:

- `/sitemap.xml`
- `/robots.txt`
- `/ads.txt`
- `/data/verifiedPricing.json`
- `/data/llmPriceSyncReport.json`
- `/pricing-research/`

Pricing content is educational. Users should verify provider pricing before procurement, client quotes, or financial decisions.
