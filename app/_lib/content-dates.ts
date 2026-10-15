import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

/**
 * Git-derived content dates for JSON-LD (datePublished, dateModified) and
 * sitemap lastmod. Runs at build time, when pages are prerendered.
 *
 * published = the first commit that added the source file.
 * modified  = the last commit that changed it, skipping commits that only
 *             touch shared chrome (network head and footer, consent banner,
 *             analytics guard). Put "[mechanical]" in the subject of any
 *             metadata-only or chrome-only commit and it is skipped too.
 *
 * Returns {} when git history is unavailable, so callers omit the dates
 * instead of stamping the build date.
 */

export type ContentDates = { published?: string; modified?: string };

const SKIP =
  /\[mechanical\]|network head|network footer|footer groups|cta strip|consent mode|report analytics only from the real domain/i;

const root = process.cwd();
let gitOk: boolean | undefined;
const cache = new Map<string, { date: string; subject: string }[]>();

function hasHistory(): boolean {
  if (gitOk !== undefined) return gitOk;
  try {
    gitOk = execFileSync('git', ['rev-parse', '--is-shallow-repository'], { cwd: root }).toString().trim() === 'false';
  } catch {
    gitOk = false;
  }
  return gitOk;
}

function fileLog(file: string) {
  const cached = cache.get(file);
  if (cached) return cached;
  let rows: { date: string; subject: string }[] = [];
  try {
    rows = execFileSync('git', ['log', '--follow', '--format=%cs%x09%s', '--', file], { cwd: root })
      .toString()
      .split('\n')
      .filter((line) => line.includes('\t'))
      .map((line) => {
        const [date, ...rest] = line.split('\t');
        return { date, subject: rest.join('\t') };
      });
  } catch {
    rows = [];
  }
  cache.set(file, rows);
  return rows;
}

/** Dates for one or more source files, paths relative to the repo root. */
export function contentDates(...files: string[]): ContentDates {
  if (!hasHistory()) return {};
  let published: string | undefined;
  let modified: string | undefined;
  for (const file of files) {
    if (!existsSync(path.join(root, file))) continue;
    const rows = fileLog(file); // newest first
    if (!rows.length) continue;
    const first = rows[rows.length - 1].date;
    const last = rows.find((row) => !SKIP.test(row.subject))?.date ?? first;
    if (!published || first < published) published = first;
    if (!modified || last > modified) modified = last;
  }
  if (!published || !modified) return {};
  return { published, modified: modified < published ? published : modified };
}

/** The later of two YYYY-MM-DD dates, ignoring missing values. */
export function latest(...dates: (string | undefined)[]): string | undefined {
  return dates.filter((d): d is string => Boolean(d)).sort().pop();
}
