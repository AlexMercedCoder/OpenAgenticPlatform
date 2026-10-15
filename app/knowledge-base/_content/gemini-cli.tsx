import type { Article } from './types';

export const article: Article = {
  slug: 'gemini-cli',
  title: 'Gemini CLI',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / TERMINAL AGENT',
  summary: 'Google\'s open source terminal agent for Gemini models, with built-in file, shell, web fetch, and Google Search tools, MCP support, GEMINI.md context files, and a free tier.',
  description: "Google's open source terminal agent for Gemini models, with file, shell, web fetch, and Google Search tools, MCP support, GEMINI.md files, and a free tier.",
  standfirst: 'Gemini CLI is an Apache 2.0 licensed agent built around one model family. Its open source loop and MCP support make it a readable harness; its tie to Gemini models is the replaceability question to weigh.',
  keywords: ['Gemini CLI', 'Google Gemini', 'terminal agent', 'coding agent', 'GEMINI.md', 'MCP', 'Google Search grounding', 'open source AI agent'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'access', label: 'Access, quotas, and models' },
    { id: 'tools', label: 'Built-in tools and MCP' },
    { id: 'context', label: 'GEMINI.md context files' },
    { id: 'extensions', label: 'Extensions, checkpoints, and sandboxing' },
    { id: 'automation', label: 'Scripting and CI' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Gemini CLI on GitHub', href: 'https://github.com/google-gemini/gemini-cli', note: 'Source, install options, quotas, and the Apache 2.0 license.' },
    { label: 'Gemini CLI documentation', href: 'https://geminicli.com/docs/', note: 'Official docs for configuration, tools, extensions, checkpointing, and headless mode.' },
    { label: 'Gemini CLI GitHub Action', href: 'https://github.com/google-github-actions/run-gemini-cli', note: 'Running the agent in GitHub workflows for review and triage.' },
  ],
  related: ['harnesses-and-brokers', 'model-context-protocol', 'opencode'],
  updated: '2026-10-13',
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Gemini CLI is an open source AI agent from Google that runs in a terminal and uses Gemini models. It reads and
        edits files, runs shell commands, fetches web pages, and can ground answers in Google Search. The project is
        licensed Apache 2.0 and installs through npm (or runs directly with <code>npx</code>), Homebrew, and other
        package managers.
      </p>
      <p>
        It is general purpose rather than strictly a coding agent, though coding is its most common use.
      </p>

      <h2 id="access">Access, quotas, and models</h2>
      <p>
        There are three ways to authenticate: a personal Google account, a Gemini API key, or Vertex AI on Google
        Cloud. The README lists free-tier limits for a personal Google account of 60 requests per minute and 1,000
        requests per day, and describes a 1M token context window for current Gemini models. Quotas change, so treat
        the README as the authority rather than this page.
      </p>
      <p>
        The harness is built for Gemini. Choosing Vertex AI over the consumer path changes billing, data handling,
        and region, not the model family.
      </p>

      <h2 id="tools">Built-in tools and MCP</h2>
      <p>
        Built-in tools cover file operations, shell commands, web fetching, and Google Search grounding. For anything
        else, Gemini CLI connects to MCP servers. Search grounding is a distinctive default: the agent can check a
        claim against the web rather than answering from model memory, which helps the grounded property for
        anything outside the repository.
      </p>

      <h2 id="context">GEMINI.md context files</h2>
      <p>
        Project-specific instructions live in <code>GEMINI.md</code> files. The idea is the same as AGENTS.md or
        CLAUDE.md: conventions written down once, read at the start of each session. When a team runs more than one
        harness, keeping these files in sync, or pointing them at one shared source, avoids each agent following a
        different version of the rules.
      </p>

      <h2 id="extensions">Extensions, checkpoints, and sandboxing</h2>
      <p>
        Custom extensions package commands and integrations for reuse and sharing. Conversation checkpointing saves
        and resumes long sessions. Sandboxing runs tool execution in a contained environment, which is the setting
        to check before giving a terminal agent broad shell access.
      </p>

      <h2 id="automation">Scripting and CI</h2>
      <p>
        <code>gemini -p</code> runs a prompt non-interactively, with JSON and streaming JSON output formats for
        scripts. Google also publishes a GitHub Action for running the agent in workflows. As with any headless
        agent, the permission decisions move into configuration that should be reviewed like code.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        Gemini CLI is an execution-layer harness with an open source loop and a fixed model family. Its MCP support
        means tool servers stay portable. Its strongest contribution to an open stack is as a readable reference
        implementation and an inexpensive way to start, given the free tier.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Free tier terms are not enterprise terms.</b> Check how prompts and code are handled under each authentication path before using it on restricted work.</li>
        <li><b>Shell access needs a boundary.</b> Turn on sandboxing, or run inside a container, before granting broad command execution.</li>
        <li><b>Web content is untrusted input.</b> Fetched pages and search results can contain instructions aimed at the agent.</li>
        <li><b>Quotas move.</b> Published limits change; automation that assumes a quota will break when it does.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Weak on models, since it is built for Gemini. Tools over MCP remain replaceable.</li>
        <li><b>Inspectable.</b> Strong. Apache 2.0 source.</li>
        <li><b>Portable.</b> Moderate. MCP servers move; GEMINI.md content moves if you keep it aligned with other instruction files; extensions are Gemini CLI specific.</li>
        <li><b>Bounded.</b> Depends on configuration. Sandboxing exists and should be turned on for broad shell access.</li>
        <li><b>Grounded.</b> Good. Repository facts plus optional Google Search grounding.</li>
        <li><b>Auditable.</b> Achievable through commits and structured output in headless runs.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Gemini CLI is not a model and not a provider-agnostic harness. It is not a broker; it runs one agent.
      </p>
    </>
  );
}
