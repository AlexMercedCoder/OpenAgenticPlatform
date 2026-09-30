# OpenAgenticPlatform.com

A vendor-neutral reference site for composing agentic AI from open data foundations, model choice, interchangeable harnesses and brokers, and portable standards.

## Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

The static-first site deploys to Netlify through the native Next.js runtime. The original OpenAI Sites/Vinext path remains available through the `dev:sites` and `build:sites` scripts. It includes JSON-LD, full sharing and crawler metadata, sitemap and robots routes, `llms.txt`, and read-only WebMCP tools. The complete phase-one product definition lives in `PRD.md`.

## Openness scorecard and stack diagram

- `/openness-scorecard` is a client-side scorecard (no backend) built from `app/_data/openness.ts`. It saves a draft in the browser, downloads the result as JSON, prints cleanly (print stylesheet in `globals.css`), and sends `openness_score_complete` to GA via `gtag` when present. `/openness-scorecard.json` is the blank template.
- `app/_data/stack.ts` holds the four layers and six tests for the homepage, scorecard, and diagram. After changing it, rebuild the downloadable diagram with `node scripts/build-stack-diagram.mts` (Node 23.6+, headless Chrome for the PNGs) and commit `public/open-agentic-platform-stack*`. The diagram is CC BY 4.0, attribution Alex Merced.
