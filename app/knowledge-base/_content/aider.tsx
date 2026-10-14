import type { Article } from './types';

export const article: Article = {
  slug: 'aider',
  title: 'Aider',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / CODING HARNESS',
  summary: 'An open source AI pair programmer for the terminal that maps your repository, commits every change to git, and works with almost any model, including local ones.',
  standfirst: 'Aider is a well-established open source coding harness, and two of its habits are worth copying anywhere: it builds a compact map of the repository for context, and it turns every edit into a git commit you can review or undo.',
  keywords: ['Aider', 'AI pair programming', 'terminal coding agent', 'repo map', 'git auto commit', 'architect mode', 'local models', 'open source coding agent'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'repo-map', label: 'The repository map' },
    { id: 'git', label: 'Every change is a commit' },
    { id: 'modes', label: 'Chat modes and architect mode' },
    { id: 'models', label: 'Model choice' },
    { id: 'verification', label: 'Lint and test loops' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Aider', href: 'https://aider.chat/', note: 'Project site and documentation, including model leaderboards and configuration.' },
    { label: 'Aider on GitHub', href: 'https://github.com/Aider-AI/aider', note: 'Source, issues, and the Apache 2.0 license.' },
    { label: 'Aider chat modes', href: 'https://aider.chat/docs/usage/modes.html', note: 'Code, ask, architect, and help modes, and how architect mode splits work between two models.' },
  ],
  related: ['harnesses-and-brokers', 'opencode', 'open-weight-models'],
  updated: '2026-10-13',
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Aider is AI pair programming in the terminal. You start it in a project directory, add the files you want to
        work on, and describe changes; it edits the files and commits the result. It is open source under the Apache
        2.0 license and installs with Python tooling.
      </p>
      <p>
        Compared with newer agents that run long autonomous loops, Aider leans toward a conversational, file-scoped
        workflow. That makes it a clear example of how much a harness can do with careful context selection and a
        strong git habit.
      </p>

      <h2 id="repo-map">The repository map</h2>
      <p>
        Aider builds a map of the whole codebase and uses it to help the model work in larger projects. The map gives
        the model a compact view of what exists and where, without loading every file into context.
      </p>
      <p>
        This is the context selection problem the harness layer article describes, solved in a specific way: give the
        model an index, then the few files that matter, rather than the whole tree. Any harness working against a
        large repository needs some version of it.
      </p>

      <h2 id="git">Every change is a commit</h2>
      <p>
        Aider commits its changes automatically with descriptive messages. The consequence is that standard git tools
        become the review and undo mechanism: diff the last commit to see what the agent did, revert it if it was
        wrong.
      </p>
      <p>
        For the auditable property, this is about as good as it gets with no extra infrastructure. Git history is a
        durable, ordered, attributable record of every change, kept in a format every engineer already reads.
      </p>

      <h2 id="modes">Chat modes and architect mode</h2>
      <p>
        Aider has distinct modes: <b>code</b> edits files, <b>ask</b> discusses the code without changing it,{' '}
        <b>help</b> answers questions about Aider itself, and <b>architect</b> splits the work between two models.
        In architect mode one model proposes a solution and a second, the editor model, turns that proposal into
        concrete file edits. The documentation notes this costs two requests and can help models that are weaker at
        producing a solution and well-formed edits in one pass.
      </p>
      <p>
        Architect mode is a small, concrete example of routing within one task: different models for different
        steps, chosen by the harness.
      </p>

      <h2 id="models">Model choice</h2>
      <p>
        Aider connects to almost any LLM, including local models. Model choice is configuration, which makes it a
        practical way to compare models on the same workflow or to keep restricted code on a local endpoint.
      </p>

      <h2 id="verification">Lint and test loops</h2>
      <p>
        Aider can lint and test the code after every change and work to fix what the linters and tests report. It
        can also run from inside an editor by watching for instructions written as code comments, and it supports
        voice input. The lint and test loop is the part that matters most: an agent that checks its own work produces
        changes worth reviewing.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        Aider is an execution-layer coding harness with open source code, free model choice, and git as its record.
        It is a good fit where a developer wants to stay in the loop on every change, and a useful baseline when
        evaluating more autonomous harnesses.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Auto-commits need a clean starting point.</b> Start from a clean working tree so agent commits are not mixed with your own unfinished work.</li>
        <li><b>Model fit varies.</b> Edit formats and architect mode exist because models differ in how reliably they produce applicable edits.</li>
        <li><b>File scope is your job.</b> The files you add to the chat shape the result; too few and the model guesses, too many and context dilutes.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Almost any model, local or hosted.</li>
        <li><b>Inspectable.</b> Strong. Apache 2.0 source, and the conversation is visible as it happens.</li>
        <li><b>Portable.</b> Good. The work product is plain git history; configuration is Aider specific.</li>
        <li><b>Bounded.</b> Moderate. It works on the files you add, and commands and changes are visible to you as they happen; containment beyond that is your environment.</li>
        <li><b>Grounded.</b> Strong for code, with the repository map, lint output, and test results.</li>
        <li><b>Auditable.</b> Strong. Every change is a commit.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Aider is not a model and not a broker. It is not designed for long unattended runs across many tasks; it is
        built around a developer working alongside it.
      </p>
    </>
  );
}
