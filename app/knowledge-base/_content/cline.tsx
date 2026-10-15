import type { Article } from './types';

export const article: Article = {
  slug: 'cline',
  title: 'Cline',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / CODING HARNESS',
  summary: 'An open source coding agent for the IDE, terminal, and desktop that asks approval for every file edit and command, separates planning from acting, and works with many model providers.',
  description: "An open source coding agent for IDE, terminal, and desktop that asks approval for each edit and command, separates plan from act, and supports many providers.",
  standfirst: 'Cline is an Apache 2.0 licensed coding agent best known as a VS Code extension. Its defining choice is human approval at each step, with Plan and Act modes and checkpoints that make every change reversible.',
  keywords: ['Cline', 'VS Code AI agent', 'coding agent', 'Plan and Act', 'human in the loop', 'MCP', '.clinerules', 'checkpoints', 'open source coding agent'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'approval', label: 'Approval at every step' },
    { id: 'plan-act', label: 'Plan mode and Act mode' },
    { id: 'checkpoints', label: 'Checkpoints' },
    { id: 'models', label: 'Model providers' },
    { id: 'tools', label: 'MCP and browser use' },
    { id: 'rules', label: '.clinerules' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Cline on GitHub', href: 'https://github.com/cline/cline', note: 'Source, the Apache 2.0 license, and setup for the extension, CLI, and SDK.' },
    { label: 'Cline documentation', href: 'https://docs.cline.bot', note: 'Official docs for Plan and Act, providers, MCP, rules, and checkpoints.' },
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'The open protocol Cline uses to connect to databases, APIs, and custom tools.' },
  ],
  related: ['harnesses-and-brokers', 'model-context-protocol', 'openrouter'],
  updated: '2026-10-13',
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Cline is an open source coding agent. It started as a VS Code extension and now also runs as a CLI and an
        SDK. In the editor it creates and edits files, runs terminal commands, and can browse the web, all inside the
        developer&apos;s working environment. The project is licensed Apache 2.0.
      </p>

      <h2 id="approval">Approval at every step</h2>
      <p>
        By default every file edit and terminal command requires the user&apos;s approval. Auto-approve exists for
        people who want to loosen that, and the starting point is a person in the loop for each action.
      </p>
      <p>
        That default makes Cline a clean example of one end of the autonomy spectrum the harness layer article
        describes. Step-level approval is slow for routine work and very easy to reason about: nothing happens that a
        person did not see.
      </p>

      <h2 id="plan-act">Plan mode and Act mode</h2>
      <p>
        Cline separates planning from doing. In Plan mode it explores the codebase and proposes a strategy without
        changing anything. In Act mode it carries the plan out. Separating the two gives the developer a natural
        review point before any file changes, and it lets the plan itself be discussed and corrected cheaply.
      </p>

      <h2 id="checkpoints">Checkpoints</h2>
      <p>
        Changes are tracked with checkpoints, so the agent&apos;s work can be rolled back to an earlier state. This
        pairs well with step-level approval: approval stops bad actions before they happen, and checkpoints undo the
        ones that turned out wrong later.
      </p>

      <h2 id="models">Model providers</h2>
      <p>
        Cline works with many providers: Anthropic, OpenAI, Google Gemini, OpenRouter, AWS Bedrock, local models
        through Ollama and LM Studio, and any OpenAI-compatible API. Model choice is configuration, which keeps the
        models layer replaceable.
      </p>

      <h2 id="tools">MCP and browser use</h2>
      <p>
        Cline connects to databases, APIs, and other systems through MCP servers, and can help create new MCP tools on
        request. The CLI manages servers with <code>cline mcp</code>. Browser use lets the agent check a running web
        app, which is useful for front-end work and another surface for untrusted input.
      </p>

      <h2 id="rules">.clinerules</h2>
      <p>
        Project-specific rules live in <code>.clinerules</code> files, covering coding standards, architecture, and
        testing conventions. When a team also uses other harnesses, keeping these rules aligned with AGENTS.md or
        other instruction files avoids each agent following different conventions.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        Cline is an execution-layer harness with open source code, wide provider support, and MCP for tools. Its
        approval-first design makes it a good choice where trust is still being established, and a useful reference
        for how to expose an agent&apos;s actions to review.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Approval fatigue is real.</b> Approving dozens of routine steps leads to approving without reading. Auto-approve narrowly rather than broadly.</li>
        <li><b>Browser and web content is untrusted input.</b> Pages the agent reads can contain instructions aimed at it.</li>
        <li><b>Checkpoints are not commits.</b> They help inside a session; commit reviewed work to git for a durable record.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Many hosted providers, local models, and any OpenAI-compatible endpoint.</li>
        <li><b>Inspectable.</b> Strong. Apache 2.0 source, and every action is shown before it runs.</li>
        <li><b>Portable.</b> Good for MCP servers; rules files are Cline specific unless kept in sync with shared formats.</li>
        <li><b>Bounded.</b> Strong by default, since edits and commands need approval. Auto-approve weakens this deliberately.</li>
        <li><b>Grounded.</b> Strong for code, plus browser checks against a running app.</li>
        <li><b>Auditable.</b> Moderate in-session through checkpoints, and good once reviewed work lands in git.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Cline is not a model and not a broker. It runs one agent in your environment, with you approving its steps.
      </p>
    </>
  );
}
