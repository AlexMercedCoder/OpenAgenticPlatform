import { MAX_SCORE, SCORECARD_URL, SCORECARD_VERSION, bands, opennessTests } from '../_data/openness';

export const dynamic = 'force-static';

/** Blank, machine-readable scorecard: the same questions and rubric as /openness-scorecard. */
export function GET(): Response {
  const body = {
    scorecard: 'Open Agentic Platform openness scorecard',
    version: SCORECARD_VERSION,
    source: SCORECARD_URL,
    license: 'CC BY 4.0, attribution Alex Merced, openagenticplatform.com',
    instructions: 'Score each test 0 (absent), 1 (partial), or 2 (demonstrated) and record the evidence. Total is out of 12.',
    stack: null,
    assessedOn: null,
    scale: { '0': 'absent', '1': 'partial', '2': 'demonstrated' },
    tests: opennessTests.map((t) => ({ id: t.id, title: t.title, question: t.question, rubric: t.rubric, evidencePrompt: t.evidence, score: null, evidence: null })),
    total: null,
    max: MAX_SCORE,
    bands: bands.map((b, i) => ({ from: b.min, to: i < bands.length - 1 ? bands[i + 1].min - 1 : MAX_SCORE, label: b.label, advice: b.advice })),
  };
  return new Response(JSON.stringify(body, null, 2) + '\n', {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Content-Disposition': 'inline; filename="openness-scorecard.json"' },
  });
}
