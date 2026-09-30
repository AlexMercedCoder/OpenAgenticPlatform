'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MAX_SCORE,
  SCORECARD_URL,
  SCORECARD_VERSION,
  bandFor,
  examples,
  opennessTests,
  type Score,
} from '../_data/openness';

type Answer = Score | null;
const STORAGE_KEY = 'oap-openness-scorecard';

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

function track(event: string, params: Record<string, unknown>) {
  try {
    window.gtag?.('event', event, params);
  } catch {
    /* analytics must never break the tool */
  }
}

/** Share links carry scores only (six digits, "x" for unanswered): no names, no evidence text. */
function readHash(): Answer[] | null {
  const m = /(?:^|[#&])s=([012x]{6})(?:&|$)/.exec(window.location.hash);
  if (!m) return null;
  return m[1].split('').map((c) => (c === 'x' ? null : (Number(c) as Score)));
}

export default function Scorecard() {
  const [stack, setStack] = useState('');
  const [scores, setScores] = useState<Answer[]>(() => opennessTests.map(() => null));
  const [evidence, setEvidence] = useState<string[]>(() => opennessTests.map(() => ''));
  const [copied, setCopied] = useState(false);
  const lastTracked = useRef<string>('');
  const restored = useRef(false);

  // Restore from a share link first, else from this browser's saved draft.
  // The page is prerendered, so this runs after hydration; it also follows
  // later hash changes (someone pasting a share link into the same tab).
  useEffect(() => {
    const restore = (useDraft: boolean) => {
      const fromHash = readHash();
      if (fromHash) {
        setScores(fromHash);
        return;
      }
      if (!useDraft) return;
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
        if (saved && Array.isArray(saved.scores) && saved.scores.length === opennessTests.length) {
          setScores(saved.scores);
          setEvidence(Array.isArray(saved.evidence) ? saved.evidence : opennessTests.map(() => ''));
          setStack(typeof saved.stack === 'string' ? saved.stack : '');
        }
      } catch {
        /* storage unavailable: start empty */
      }
    };
    const onHash = () => restore(false);
    queueMicrotask(() => {
      restore(true);
      restored.current = true;
    });
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (!restored.current) return; // do not overwrite a saved draft before it is read
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ stack, scores, evidence }));
    } catch {
      /* private mode or blocked storage */
    }
  }, [stack, scores, evidence]);

  const answered = scores.filter((s) => s !== null).length;
  const complete = answered === opennessTests.length;
  const total = scores.reduce<number>((sum, s) => sum + (s ?? 0), 0);
  const band = bandFor(total);
  const gaps = useMemo(
    () => opennessTests.map((t, i) => ({ t, s: scores[i] })).filter((x) => x.s !== null && x.s < 2).sort((a, b) => (a.s ?? 0) - (b.s ?? 0)),
    [scores],
  );

  useEffect(() => {
    if (!complete) return;
    const key = scores.join('');
    if (key === lastTracked.current) return;
    lastTracked.current = key;
    track('openness_score_complete', { score: total, max_score: MAX_SCORE, band: band.label });
  }, [complete, scores, total, band.label]);

  const setScore = (i: number, s: Score) => setScores((prev) => prev.map((v, j) => (j === i ? s : v)));
  const setNote = (i: number, text: string) => setEvidence((prev) => prev.map((v, j) => (j === i ? text : v)));

  const loadExample = (idx: number) => {
    setStack(examples[idx].name);
    setScores(examples[idx].scores);
    setEvidence(opennessTests.map(() => ''));
  };
  const reset = () => {
    setStack('');
    setScores(opennessTests.map(() => null));
    setEvidence(opennessTests.map(() => ''));
    history.replaceState(null, '', window.location.pathname);
  };

  const result = () => ({
    scorecard: 'Open Agentic Platform openness scorecard',
    version: SCORECARD_VERSION,
    source: SCORECARD_URL,
    license: 'CC BY 4.0, attribution Alex Merced, openagenticplatform.com',
    stack: stack || null,
    assessedOn: new Date().toISOString().slice(0, 10),
    scale: { '0': 'absent', '1': 'partial', '2': 'demonstrated' },
    tests: opennessTests.map((t, i) => ({ id: t.id, title: t.title, question: t.question, score: scores[i], evidence: evidence[i] || null })),
    total: complete ? total : null,
    max: MAX_SCORE,
    band: complete ? band.label : null,
  });

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(result(), null, 2) + '\n'], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const slug = (stack || 'stack').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'stack';
    a.href = url;
    a.download = `openness-scorecard-${slug}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    track('openness_scorecard_download', { format: 'json', score: complete ? total : null });
  };

  const print = () => {
    track('openness_scorecard_download', { format: 'print', score: complete ? total : null });
    window.print();
  };

  const copyLink = async () => {
    const code = scores.map((s) => (s === null ? 'x' : String(s))).join('');
    const url = `${window.location.origin}${window.location.pathname}#s=${code}`;
    history.replaceState(null, '', `#s=${code}`);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the URL bar already holds the link */
    }
  };

  return (
    <div className="scorecard">
      <div className="scorecard-toolbar no-print">
        <span>Try an example:</span>
        {examples.map((ex, i) => (
          <button type="button" key={ex.name} onClick={() => loadExample(i)}>{ex.name.replace(' (illustrative)', '')}</button>
        ))}
        <button type="button" onClick={reset}>Clear</button>
      </div>

      <label className="scorecard-stack">
        <span>Stack or system being scored</span>
        <input type="text" value={stack} onChange={(e) => setStack(e.target.value)} placeholder="For example: support agent on the analytics platform" maxLength={120} />
      </label>

      <ol className="scorecard-tests">
        {opennessTests.map((t, i) => (
          <li key={t.id} className="scorecard-test">
            <fieldset>
              <legend>
                <span className="scorecard-num">{String(i + 1).padStart(2, '0')}</span>
                <b><Link href={`/knowledge-base/${t.id}`}>{t.title}</Link></b>
                <span className="scorecard-q">{t.question}</span>
              </legend>
              <div className="scorecard-options">
                {([0, 1, 2] as Score[]).map((s) => (
                  <label key={s} className={scores[i] === s ? 'is-on' : undefined}>
                    <input type="radio" name={`t-${t.id}`} value={s} checked={scores[i] === s} onChange={() => setScore(i, s)} />
                    <span className="scorecard-score">{s}</span>
                    <span className="scorecard-rubric">{t.rubric[s]}</span>
                  </label>
                ))}
              </div>
              <label className="scorecard-evidence">
                <span>Evidence: {t.evidence}</span>
                <textarea rows={2} value={evidence[i]} onChange={(e) => setNote(i, e.target.value)} maxLength={1000} />
              </label>
            </fieldset>
          </li>
        ))}
      </ol>

      <section className="scorecard-result" aria-live="polite" aria-labelledby="scorecard-result-title">
        <p className="section-label">RESULT</p>
        <h2 id="scorecard-result-title">
          {complete ? <>{total} / {MAX_SCORE}: {band.label}</> : <>{answered} of {opennessTests.length} tests scored</>}
        </h2>
        {complete ? <p>{band.advice}</p> : <p>Score every test to see the result. Partial answers are saved in this browser only.</p>}
        {gaps.length > 0 && (
          <div className="scorecard-gaps">
            <b>Where to start</b>
            <ul>
              {gaps.map(({ t, s }) => (
                <li key={t.id}><Link href={`/knowledge-base/${t.id}`}>{t.title}</Link> is at {s}. To reach 2: {t.rubric[2]}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="scorecard-actions no-print">
          <button type="button" className="action primary" onClick={downloadJson}>DOWNLOAD JSON ↓</button>
          <button type="button" className="action" onClick={print}>PRINT OR SAVE AS PDF</button>
          <button type="button" className="action" onClick={copyLink}>{copied ? 'LINK COPIED' : 'COPY SHARE LINK'}</button>
        </div>
        <p className="scorecard-fineprint">Scoring runs in your browser; nothing is sent to a server. Share links carry the six scores only, not the stack name or evidence.</p>
      </section>
    </div>
  );
}
