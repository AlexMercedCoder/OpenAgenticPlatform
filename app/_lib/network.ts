import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Reads the generated network/ folder (written by alexmercedcom/scripts/build-network-shared.mjs).
 * Never edit network/ by hand; regenerate it and rebuild the site.
 */

export type NetworkFooterLink = { title: string; url: string };
export type NetworkFooterGroup = { title: string; links: NetworkFooterLink[] };
export type NetworkCtaLink = { label: string; url: string; event: string };
export type NetworkData = {
  site: string;
  twitterSite: string;
  footer: { groups: NetworkFooterGroup[]; allSitesUrl: string; allSitesLabel: string };
  cta: { heading: string; links: NetworkCtaLink[] } | null;
};

export type HeadScript = { src?: string; async: boolean; type?: string; content: string };

const networkDir = path.join(process.cwd(), 'network');

export function getNetwork(): NetworkData {
  return JSON.parse(readFileSync(path.join(networkDir, 'network.json'), 'utf8')) as NetworkData;
}

/** Splits network-head.html into its script tags so each can be rendered as a real element in <head>. */
export function getNetworkHeadScripts(): HeadScript[] {
  const html = readFileSync(path.join(networkDir, 'network-head.html'), 'utf8');
  const scripts: HeadScript[] = [];
  const pattern = /<script([^>]*)>([\s\S]*?)<\/script>/g;
  for (const match of html.matchAll(pattern)) {
    const attrs = match[1];
    const src = /\bsrc="([^"]+)"/.exec(attrs)?.[1];
    const type = /\btype="([^"]+)"/.exec(attrs)?.[1];
    scripts.push({ src, type, async: /\basync\b/.test(attrs), content: match[2].trim() });
  }
  return scripts;
}
