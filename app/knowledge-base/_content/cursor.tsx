import type { Article } from './types';

export const article: Article = {
  slug: 'cursor',
  title: 'Cursor',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / CODING HARNESS (CLOSED SOURCE)',
  summary: 'A closed-source AI code editor and coding agent with a CLI and cloud agents. It reads AGENTS.md, connects to MCP servers, and offers several model providers.',
  standfirst: 'Cursor is one of the most widely used coding agents, and it is not open source. It still belongs in an open stack conversation, because the parts that matter for portability (instructions, tools, and the repository itself) can stay in open formats while the editor stays replaceable.',
  keywords: ['Cursor', 'Cursor AI', 'Cursor editor', 'Cursor agent', 'Cursor CLI', 'Cursor cloud agents', 'AGENTS.md', 'MCP', 'AI code editor'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'surfaces', label: 'Editor, CLI, and cloud agents' },
    { id: 'models', label: 'Models' },
    { id: 'rules', label: 'Rules and AGENTS.md' },
    { id: 'mcp', label: 'MCP and approvals' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Cursor documentation', href: 'https://cursor.com/docs', note: 'Official docs for the agent, models, rules, MCP, the CLI, and cloud agents.' },
    { label: 'Cursor rules', href: 'https://cursor.com/docs/context/rules', note: 'Project rules in .cursor/rules, user and team rules, and AGENTS.md support.' },
    { label: 'Cursor CLI', href: 'https://cursor.com/docs/cli/overview', note: 'The agent command, its modes, and print mode for scripts and CI.' },
  ],
  related: ['harnesses-and-brokers', 'model-context-protocol', 'claude-code'],
  updated: '2026-10-15',
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Cursor is an AI code editor built around a coding agent. Its documentation describes it as a coding agent that
        helps you understand a codebase, plan and build features, fix bugs, and review changes. The application is
        closed source: the public <code>cursor/cursor</code> repository on GitHub is for issues and feedback, not the
        product&apos;s code.
      </p>

      <h2 id="surfaces">Editor, CLI, and cloud agents</h2>
      <p>
        The same agent runs in three places. In the editor it has a Plan Mode for scoping larger changes before
        editing. The Cursor CLI runs it in a terminal with the <code>agent</code> command, with agent, plan, and
        read-only ask modes, and a print mode (<code>agent -p</code>) for scripts and CI pipelines.
      </p>
      <p>
        Cloud Agents, formerly called Background Agents, run the agent in isolated cloud VMs. Each one clones the
        repository from a supported Git provider, works on its own branch, and hands the result back as a pull
        request. That makes the pull request the review point, which is the right place for it.
      </p>

      <h2 id="models">Models</h2>
      <p>
        Cursor offers models from several providers, including Anthropic, OpenAI, and Google, alongside models of its
        own such as Composer. Model choice is a setting rather than a rebuild, though the models arrive through
        Cursor&apos;s service and plans. Check the current plan terms before assuming you can bring your own API key.
      </p>

      <h2 id="rules">Rules and AGENTS.md</h2>
      <p>
        Project rules live in <code>.cursor/rules</code> as <code>.mdc</code> files, versioned with the code. There are
        also user rules and, on team plans, team rules managed from a dashboard. Cursor also reads{' '}
        <code>AGENTS.md</code> in the project root and in subdirectories. Putting shared conventions in AGENTS.md keeps
        them readable by other harnesses too.
      </p>

      <h2 id="mcp">MCP and approvals</h2>
      <p>
        Cursor connects to MCP servers configured in <code>.cursor/mcp.json</code> for a project or{' '}
        <code>~/.cursor/mcp.json</code> for every project, over stdio, SSE, or Streamable HTTP. By default it asks for
        approval before using an MCP tool. Allowlists loosen that for tools you trust.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        Cursor is a closed harness that speaks open formats at its edges. The code stays in your Git repository,
        instructions can live in AGENTS.md, and tools can be MCP servers that any other harness can use. Kept that
        way, switching editors costs a habit change rather than a migration.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>.mdc rules are Cursor specific.</b> A plain <code>.md</code> file in <code>.cursor/rules</code> is ignored, and other tools do not read <code>.mdc</code>. Keep shared guidance in AGENTS.md.</li>
        <li><b>Cloud agents need repository write access.</b> They push branches, so scope the access you grant.</li>
        <li><b>Model availability follows the plan.</b> Which models you can use, and at what price, is set by Cursor&apos;s plans rather than by your provider contracts.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Moderate. Many models, but through Cursor&apos;s service; the editor itself is easy to swap if instructions and tools are in open formats.</li>
        <li><b>Inspectable.</b> Weak for the tool itself, since the source is closed. Diffs and plans are visible before they land.</li>
        <li><b>Portable.</b> Good when you use AGENTS.md and MCP; weaker for anything kept only in <code>.mdc</code> rules.</li>
        <li><b>Bounded.</b> Good by default, since MCP tools need approval; allowlists and auto-review modes loosen it.</li>
        <li><b>Grounded.</b> Strong for code: it works in the repository and can run checks.</li>
        <li><b>Auditable.</b> Good once work lands as branches and pull requests in your Git provider.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Cursor is not open source and not a model. It is a hosted product that runs a coding agent in your editor, your
        terminal, or the cloud.
      </p>
    </>
  );
}
