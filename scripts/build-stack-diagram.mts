// Builds the downloadable reference stack diagram from app/_data/stack.ts.
//
//   node scripts/build-stack-diagram.mts     (Node 23.6+ runs TypeScript directly; scripts/ is excluded from the Next type check)
//
// Writes to public/:
//   open-agentic-platform-stack.svg        adapts to light and dark (prefers-color-scheme)
//   open-agentic-platform-stack-light.png  2400 px wide
//   open-agentic-platform-stack-dark.png   2400 px wide
// PNGs are rendered with headless Chrome (google-chrome or chromium on PATH).
// License of the diagram: CC BY 4.0, attribution Alex Merced.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { layers } from '../app/_data/stack.ts';

const ROOT = new URL('..', import.meta.url).pathname;
const NAME = 'open-agentic-platform-stack';
const W = 1200;
const X = 40;
const BW = W - 2 * X;
const LEFT = 385; // width of the title column inside a band
const CHIP_H = 34;
const CHIP_GAP = 10;
const FONT = "Arial, Helvetica, 'Liberation Sans', sans-serif";

const ACCENT: Record<string, [string, string]> = {
  lime: ['#3f6212', '#c7ff57'],
  cyan: ['#0e7490', '#65e8ff'],
  amber: ['#a16207', '#ffbe42'],
  pink: ['#be185d', '#ff71a8'],
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const chipW = (t: string) => Math.round(t.length * 8.1 + 30);

function wrap(text: string, max: number): string[] {
  const out: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    if ((line + ' ' + word).trim().length > max) { out.push(line); line = word; } else line = (line + ' ' + word).trim();
  }
  if (line) out.push(line);
  return out;
}

function style(): string {
  const light = Object.entries(ACCENT).map(([k, v]) => `--${k}: ${v[0]};`).join(' ');
  const dark = Object.entries(ACCENT).map(([k, v]) => `--${k}: ${v[1]};`).join(' ');
  const darkVars = `--bg: #0c0f10; --band: #151a1a; --chip: #0c0f10; --ink: #f2f0ea; --muted: #b5bab6; --line: #404644; ${dark}`;
  return `<style>
.oap { --bg: #f3f0e8; --band: #fffdf6; --chip: #f3f0e8; --ink: #0c0f10; --muted: #444844; --line: #8a877f; ${light} }
@media (prefers-color-scheme: dark) { .oap:not(.oap-light) { ${darkVars} } }
.oap.oap-dark { ${darkVars} }
.oap text { font-family: ${FONT}; fill: var(--ink); }
.oap .bg { fill: var(--bg); }
.oap .band { fill: var(--band); stroke: var(--line); stroke-width: 1.5; }
.oap .chip { fill: var(--chip); stroke-width: 1.5; }
.oap .chip.example { stroke-dasharray: 5 4; }
.oap .title { font-size: 34px; font-weight: 900; letter-spacing: -0.5px; }
.oap .subtitle { font-size: 17px; fill: var(--muted); }
.oap .kicker { font-size: 12px; font-weight: 700; letter-spacing: 2px; }
.oap .name { font-size: 24px; font-weight: 900; }
.oap .summary { font-size: 15px; fill: var(--muted); }
.oap .chiptext { font-size: 14.5px; font-weight: 600; }
.oap .base { font-size: 13px; font-weight: 700; letter-spacing: 2px; fill: var(--muted); }
.oap .foot { font-size: 13.5px; fill: var(--muted); }
</style>`;
}

function svg(force?: 'light' | 'dark'): { text: string; height: number } {
  const p = `oap-${force ?? 'auto'}`;
  const body: string[] = [];
  let y = 128;
  // Top of the stack first (04 Open standards), foundation last.
  for (const layer of layers.slice().reverse()) {
    const chipsX0 = X + LEFT;
    const chipsW = BW - LEFT - 20;
    const rows: { name: string; example: boolean; w: number }[][] = [[]];
    let used = 0;
    for (const item of layer.items) {
      const label = item.example ? `${item.name} (example)` : item.name;
      const w = chipW(label);
      if (used + w > chipsW && rows.at(-1)!.length) { rows.push([]); used = 0; }
      rows.at(-1)!.push({ name: label, example: !!item.example, w });
      used += w + CHIP_GAP;
    }
    const summary = wrap(layer.summary, 34);
    const textH = 92 + summary.length * 21;
    const chipsH = rows.length * CHIP_H + (rows.length - 1) * CHIP_GAP;
    const h = Math.max(textH, chipsH + 48);
    const acc = `var(--${layer.color})`;
    body.push(`<rect class="band" x="${X}" y="${y}" width="${BW}" height="${h}" rx="4"/>`);
    body.push(`<rect x="${X}" y="${y}" width="8" height="${h}" style="fill: ${acc}"/>`);
    body.push(`<text class="kicker" x="${X + 30}" y="${y + 34}" style="fill: ${acc}">${layer.number} / ${esc(layer.label)}</text>`);
    body.push(`<text class="name" x="${X + 30}" y="${y + 66}">${esc(layer.title.toUpperCase())}</text>`);
    summary.forEach((line, i) => body.push(`<text class="summary" x="${X + 30}" y="${y + 92 + i * 21}">${esc(line)}</text>`));
    let cy = y + (h - chipsH) / 2;
    for (const row of rows) {
      let cx = chipsX0;
      for (const c of row) {
        body.push(`<rect class="chip${c.example ? ' example' : ''}" x="${cx}" y="${cy}" width="${c.w}" height="${CHIP_H}" rx="17" style="stroke: ${acc}"/>`);
        body.push(`<text class="chiptext" x="${cx + c.w / 2}" y="${cy + 22}" text-anchor="middle">${esc(c.name)}</text>`);
        cx += c.w + CHIP_GAP;
      }
      cy += CHIP_H + CHIP_GAP;
    }
    y += h + 14;
  }
  body.push(`<rect x="${X}" y="${y}" width="${BW}" height="46" rx="4" style="fill: none; stroke: var(--line); stroke-width: 1.5; stroke-dasharray: 6 5"/>`);
  ['YOUR POLICIES', 'YOUR INFRASTRUCTURE', 'YOUR CONTROL'].forEach((t, i) =>
    body.push(`<text class="base" x="${X + BW * (i + 0.5) / 3}" y="${y + 28}" text-anchor="middle">${t}</text>`));
  y += 46 + 34;
  body.push(`<text class="foot" x="${X}" y="${y}">Dashed chips are example implementations by Alex Merced. Other names are illustrative, not endorsements.</text>`);
  body.push(`<text class="foot" x="${X}" y="${y + 22}">Diagram: Alex Merced, openagenticplatform.com. License: CC BY 4.0 (creativecommons.org/licenses/by/4.0).</text>`);
  const H = y + 50;

  const names = layers.map((l) => `${l.number} ${l.title}: ${l.items.map((i) => i.name).join(', ')}`).join('. ');
  const head = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" class="oap${force ? ` oap-${force}` : ''}" role="img" aria-labelledby="${p}-title ${p}-desc">`,
    `<title id="${p}-title">Open agentic platform reference stack</title>`,
    `<desc id="${p}-desc">Four layers, foundation at the bottom: ${esc(names)}. The stack rests on your policies, your infrastructure, and your control. Diagram by Alex Merced, CC BY 4.0, openagenticplatform.com.</desc>`,
    style(),
    `<rect class="bg" width="${W}" height="${H}"/>`,
    `<text class="title" x="${X}" y="62">OPEN AGENTIC PLATFORM REFERENCE STACK</text>`,
    `<text class="subtitle" x="${X}" y="94">Four layers, each replaceable on its own. A stack, not a suite.</text>`,
  ];
  return { text: [...head, ...body, '</svg>'].join('\n') + '\n', height: H };
}

function renderPng(svgText: string, height: number, out: string) {
  const chrome = ['google-chrome', 'chromium', 'chromium-browser'].find((c) => {
    try { execFileSync('which', [c], { stdio: 'ignore' }); return true; } catch { return false; }
  });
  if (!chrome) throw new Error('google-chrome not found; cannot render PNGs');
  const dir = mkdtempSync(join(tmpdir(), 'oap-diagram-'));
  const page = join(dir, 'd.html');
  writeFileSync(page, `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0}svg{display:block}</style></head><body>${svgText}</body></html>`);
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=2', `--window-size=${W},${height}`, `--screenshot=${out}`, pathToFileURL(page).href], { stdio: 'ignore' });
  rmSync(dir, { recursive: true, force: true });
}

const adaptive = svg();
writeFileSync(join(ROOT, 'public', `${NAME}.svg`), '<?xml version="1.0" encoding="UTF-8"?>\n' + adaptive.text);
for (const mode of ['light', 'dark'] as const) {
  const v = svg(mode);
  renderPng(v.text, v.height, join(ROOT, 'public', `${NAME}-${mode}.png`));
}
console.log(`build-stack-diagram: ${W}x${adaptive.height} SVG and two PNGs in public/`);
