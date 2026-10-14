import type { Article } from './types';

export const article: Article = {
  slug: 'claude-code',
  title: 'Claude Code',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / CODING HARNESS',
  summary: 'Anthropic\'s agentic coding tool: it reads a codebase, edits files, and runs commands from a terminal, IDE, desktop app, or browser, using Claude models only.',
  standfirst: 'Claude Code is a coding harness tied to one model family and distributed under commercial terms rather than an open source license. It still earns a place in an open architecture reference, because most of what it reads and writes (MCP servers, skills, AGENTS.md, git history) is in open formats.',
  keywords: ['Claude Code', 'Anthropic', 'coding agent', 'terminal agent', 'CLAUDE.md', 'MCP', 'agent hooks', 'subagents', 'agent harness'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'surfaces', label: 'One engine, several surfaces' },
    { id: 'models', label: 'Model access and providers' },
    { id: 'configuration', label: 'Instructions, skills, and hooks' },
    { id: 'tools', label: 'Tools and MCP' },
    { id: 'parallel', label: 'Subagents and parallel work' },
    { id: 'automation', label: 'Headless and CI use' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Claude Code documentation', href: 'https://code.claude.com/docs/en/overview', note: 'The official overview, installation, and links to every feature page.' },
    { label: 'Memory and CLAUDE.md', href: 'https://code.claude.com/docs/en/memory', note: 'How project instructions load, including reading an existing AGENTS.md.' },
    { label: 'Claude Code and MCP', href: 'https://code.claude.com/docs/en/mcp', note: 'Connecting tool servers, and sharing them with a checked-in .mcp.json.' },
    { label: 'Enterprise deployment overview', href: 'https://code.claude.com/docs/en/third-party-integrations', note: 'Running the tool against Amazon Bedrock, Google Cloud, Microsoft Foundry, or an LLM gateway.' },
    { label: 'Claude Code on GitHub', href: 'https://github.com/anthropics/claude-code', note: 'Issues, changelog, and the license terms that govern use.' },
  ],
  related: ['harnesses-and-brokers', 'model-context-protocol', 'agent-skills'],
  updated: '2026-10-13',
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Claude Code is an agentic coding tool from Anthropic. It reads a codebase, edits files, runs commands, and
        works with git: staging changes, writing commit messages, creating branches, and opening pull requests. It is
        a harness in the sense this reference uses the word. The model supplies judgment, and the tool supplies the
        loop, the file and shell access, the context assembly, and the permission checks.
      </p>
      <p>
        Two facts frame everything else on this page. It runs Claude models only, and it is not open source: the
        repository states that use is subject to Anthropic&apos;s Commercial Terms of Service. Both matter for an
        architecture that values replaceability, and both are offset in part by how much of its configuration sits
        in open, portable formats.
      </p>

      <h2 id="surfaces">One engine, several surfaces</h2>
      <p>
        The tool runs as a terminal CLI, as extensions for VS Code and JetBrains IDEs, inside a desktop app, and on
        the web, where sessions run in the cloud against repositories you do not have checked out locally. The
        documentation describes these as surfaces onto the same engine, so a repository&apos;s instruction files,
        settings, and MCP server configuration apply across all of them.
      </p>
      <p>
        That design choice is the useful lesson for anyone building their own harness. Capability defined once and
        exposed in several places stays consistent. Capability rebuilt per surface drifts.
      </p>

      <h2 id="models">Model access and providers</h2>
      <p>
        Claude Code uses Anthropic&apos;s Claude models. What varies is where inference runs. Besides a Claude
        subscription or an Anthropic Console account, the documentation covers Amazon Bedrock, Claude Platform on
        AWS, Google Cloud&apos;s Agent Platform (formerly Vertex AI), and Microsoft Foundry, plus routing through an
        LLM gateway for centralized authentication, budgets, and usage tracking.
      </p>
      <p>
        For the models and routing layer, this is replaceability of the provider without replaceability of the
        model family. A team can move billing and data residency between clouds; it cannot point the tool at an
        open-weight model. If model choice per task is a requirement, that is a reason to run a provider-agnostic
        harness next to it.
      </p>

      <h2 id="configuration">Instructions, skills, and hooks</h2>
      <p>
        Three mechanisms shape behavior without touching the model.
      </p>
      <ul>
        <li><b>CLAUDE.md.</b> A markdown file read at the start of every session, used for coding standards, architecture decisions, and review checklists. If a repository already has an AGENTS.md for other agents, Claude Code can read that instead, which keeps one instruction file serving several harnesses.</li>
        <li><b>Skills.</b> Folders of instructions and supporting files, loaded when a task matches, used to package repeatable workflows such as a release or a review procedure. The format is the open Agent Skills format described elsewhere in this knowledge base.</li>
        <li><b>Hooks.</b> Shell commands that run before or after the agent&apos;s actions, for example formatting after every edit or linting before a commit. Hooks are enforced by the harness, not requested of the model, which makes them a real control rather than a suggestion.</li>
      </ul>
      <p>
        Organizations can also set managed permissions that local configuration cannot override. That is the
        bounded property expressed as policy outside the model, which is where it belongs.
      </p>

      <h2 id="tools">Tools and MCP</h2>
      <p>
        Beyond its built-in file, search, and shell tools, Claude Code connects to external systems through the
        Model Context Protocol. The documentation recommends that one team configure MCP servers and check a <code>.mcp.json</code>{' '}
        file into the repository so every developer gets the same connections.
      </p>
      <p>
        Because MCP is an open protocol, those tool servers are not Claude Code assets. The same server can serve a
        different harness tomorrow, which is the practical meaning of portable tool access.
      </p>

      <h2 id="parallel">Subagents and parallel work</h2>
      <p>
        A session can spawn subagents that work on parts of a task at the same time, with a lead agent assigning
        work and merging results. Several full sessions can also run side by side. The architectural question is the
        one any concurrent harness has to answer: what is shared between workers and what is isolated. Parallel
        agents editing one working tree conflict; separate worktrees or cloud sessions keep the work genuinely
        parallel.
      </p>
      <p>
        For custom agents, Anthropic publishes the Agent SDK, which exposes the same tools and loop for programs that
        need their own orchestration and permission rules.
      </p>

      <h2 id="automation">Headless and CI use</h2>
      <p>
        The CLI accepts a prompt with <code>-p</code> and runs without an interactive session, so it can be piped
        into, scripted, and run in CI. The documentation covers GitHub Actions and GitLab CI/CD for review and issue
        triage. Non-interactive use moves the permission question from a person clicking approve to configuration
        written in advance, which deserves the same review as any other deployment config.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        In the four-layer model, Claude Code is an execution-layer harness with a fixed model family. The parts of
        it that touch other layers are mostly open: MCP for tools, Agent Skills for procedures, AGENTS.md or
        CLAUDE.md for instructions, and git for the record of what changed.
      </p>
      <p>
        The practical stance is the one this reference takes toward any single-vendor component: use it where it is
        strong, and keep the definitions it depends on in formats another harness can read. A team whose skills,
        tool servers, and instructions are portable can add or replace a harness at the cost of configuration.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Shell access is the permission that matters.</b> A coding agent that can run commands can do what the user can. Decide on containment deliberately.</li>
        <li><b>Repository content is untrusted input.</b> Issue text, dependency docs, and comments can carry instructions aimed at the agent.</li>
        <li><b>Provider choice is not model choice.</b> Moving between Anthropic, Bedrock, Google Cloud, and Foundry changes billing and residency, not the model family.</li>
        <li><b>Pin models on cloud providers.</b> The documentation recommends pinning model versions on third-party platforms so upgrades happen when you decide.</li>
        <li><b>Instruction files drift.</b> If CLAUDE.md and AGENTS.md both exist with different content, different harnesses will follow different rules.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Weak on models, since it runs Claude only. Moderate on the harness itself when skills, MCP servers, and instructions are kept in open formats.</li>
        <li><b>Inspectable.</b> Limited. The source is not open, so the loop and system prompts cannot be read directly; transcripts and hooks give partial visibility.</li>
        <li><b>Portable.</b> Good for skills, MCP configuration, and AGENTS.md. Session history and product settings are less portable.</li>
        <li><b>Bounded.</b> Good. Permissions, hooks, and managed settings are enforced by the harness rather than by the prompt.</li>
        <li><b>Grounded.</b> Strong for code, since it works from the repository, command output, and test results.</li>
        <li><b>Auditable.</b> Good when work lands as commits and pull requests; cloud provider deployments add the provider&apos;s own audit logs.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Claude Code is not a model. It is a harness that runs Anthropic&apos;s models.
      </p>
      <p>
        It is not open source. It is a commercial product with a public issue tracker.
      </p>
      <p>
        It is not a broker. It runs its own agent loop and its own subagents; routing work across different
        harnesses is a separate job.
      </p>
    </>
  );
}
