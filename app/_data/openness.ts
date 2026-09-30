/**
 * The openness scorecard: the six openness tests from the homepage, each with a
 * 0 / 1 / 2 rubric and an evidence prompt. Used by /openness-scorecard and by
 * the downloadable template at /openness-scorecard.json.
 */
export type Score = 0 | 1 | 2;

export type OpennessTest = {
  id: string;
  title: string;
  question: string;
  rubric: Record<Score, string>;
  evidence: string;
};

export const SCORECARD_VERSION = '1.0';
export const SCORECARD_URL = 'https://openagenticplatform.com/openness-scorecard';

export const opennessTests: OpennessTest[] = [
  {
    id: 'replaceable',
    title: 'Replaceable',
    question: 'Can one component be swapped without rebuilding the system?',
    rubric: {
      0: 'Changing the model, engine, or harness means rebuilding most of the system.',
      1: 'Some components swap cleanly; others need prompts, definitions, or integrations rebuilt.',
      2: 'A major component has been swapped, and the work was measured in days, not months.',
    },
    evidence: 'Which component did you last swap, and how long did it take?',
  },
  {
    id: 'inspectable',
    title: 'Inspectable',
    question: 'Can a builder understand what runs and why?',
    rubric: {
      0: 'Behavior is visible only through final outputs.',
      1: 'A console shows traces, but they cannot be exported or leave out the exact context sent.',
      2: 'The exact context, tool calls, and results for each step are exported to storage you own.',
    },
    evidence: 'Where do traces live, what do they contain, and how long are they kept?',
  },
  {
    id: 'portable',
    title: 'Portable',
    question: 'Can identity, skills, context, and work move?',
    rubric: {
      0: 'Agent definitions, skills, and memory exist only inside one product.',
      1: 'Some artifacts export, but in a proprietary format or with pieces missing.',
      2: 'Identity, skills, and work are files in open formats and have been loaded into a second tool.',
    },
    evidence: 'What have you exported and reloaded somewhere else?',
  },
  {
    id: 'bounded',
    title: 'Bounded',
    question: 'Are authority and approval requirements explicit?',
    rubric: {
      0: 'Limits are requests written into the prompt.',
      1: 'Role permissions exist, but there are no per-action scopes or approvals.',
      2: 'Tool scopes, delegated user identity, and approvals are enforced outside the model and tested adversarially.',
    },
    evidence: 'What stops the agent from taking an action its user could not take?',
  },
  {
    id: 'grounded',
    title: 'Grounded',
    question: 'Do agents share durable data and semantic meaning?',
    rubric: {
      0: 'Agents answer from model memory or guess meaning from column names.',
      1: 'Agents reach real data, but without shared metric definitions.',
      2: 'Agents query governed metrics over versioned tables and cite the definition and data version.',
    },
    evidence: 'Which semantic definitions and tables do agents use?',
  },
  {
    id: 'auditable',
    title: 'Auditable',
    question: 'Can people reconstruct decisions and outcomes?',
    rubric: {
      0: 'There is no durable record of agent runs.',
      1: 'Logs are partial or kept only briefly.',
      2: 'Runs, approvals, and data versions are recorded long enough to reconstruct any decision.',
    },
    evidence: 'Could you reconstruct an agent decision from three months ago?',
  },
];

export const MAX_SCORE = opennessTests.length * 2;

export type Band = { min: number; label: string; advice: string };

/** Highest band whose min is at or below the total. */
export const bands: Band[] = [
  { min: 0, label: 'Closed in practice', advice: 'Most exits would mean a rebuild. Start with the lowest-scoring test that blocks the next change you already know is coming.' },
  { min: 5, label: 'Partly open', advice: 'Some seams are real and some are assumed. Fix the weakest test first; a single 0 usually costs more than several 1s.' },
  { min: 9, label: 'Open with gaps', advice: 'The architecture holds up. Turn each remaining 1 into a 2 by exercising it: swap, export, or replay something for real.' },
  { min: 12, label: 'Open by evidence', advice: 'Every test is demonstrated. Keep the evidence current and repeat the score when a major component changes.' },
];

export function bandFor(total: number): Band {
  return bands.filter((b) => total >= b.min).at(-1) ?? bands[0];
}

/** The two illustrative stacks from the homepage's worked scorecards. */
export const examples: { name: string; scores: Score[] }[] = [
  { name: 'Composable stack (illustrative)', scores: [2, 2, 2, 2, 2, 2] },
  { name: 'Single-suite stack (illustrative)', scores: [0, 1, 0, 1, 1, 1] },
];
