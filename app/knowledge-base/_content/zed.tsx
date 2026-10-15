import type { Article } from './types';

export const article: Article = {
  slug: 'zed',
  title: 'Zed',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / EDITOR AND AGENT HOST',
  summary: 'An open source code editor with its own agent and a host for others: external agents plug in over the Agent Client Protocol, and tools connect through MCP.',
  standfirst: 'Zed is a GPL-licensed editor whose agent panel runs Zed’s own agent or an external one such as Claude, Codex, OpenCode, or Gemini CLI. It is a working example of the editor and the harness being separate, replaceable parts.',
  keywords: ['Zed', 'Zed editor', 'Zed agent', 'Agent Client Protocol', 'ACP', 'external agents', 'MCP', 'AGENTS.md', 'open source code editor'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'zed-agent', label: 'The Zed Agent' },
    { id: 'external-agents', label: 'External agents over ACP' },
    { id: 'permissions', label: 'Tool permissions' },
    { id: 'instructions', label: 'Instruction files' },
    { id: 'models', label: 'Models' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Zed AI documentation', href: 'https://zed.dev/docs/ai/overview', note: 'The agent panel, the Zed Agent, external agents, models, and privacy.' },
    { label: 'Zed on GitHub', href: 'https://github.com/zed-industries/zed', note: 'Source, licensed GPL-3.0-or-later with Apache-2.0 components where marked.' },
    { label: 'Agent Client Protocol', href: 'https://agentclientprotocol.com', note: 'The protocol external agents use to talk to editors such as Zed.' },
  ],
  related: ['harnesses-and-brokers', 'model-context-protocol', 'pi'],
  updated: '2026-10-15',
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Zed is an open source code editor for macOS, Linux, and Windows. Its source is licensed primarily under
        GPL-3.0-or-later, with Apache-2.0 components where marked. Its AI features center on an agent panel where you
        prompt agents, add context, review their changes, and run several threads in parallel.
      </p>

      <h2 id="zed-agent">The Zed Agent</h2>
      <p>
        Zed ships its own agent, the Zed Agent. It uses built-in tools, profiles, skills, project instructions, and MCP
        servers. Zed also has an inline assistant for rewriting a selection and edit predictions while you type, but
        the agent is the part that acts as a harness.
      </p>

      <h2 id="external-agents">External agents over ACP</h2>
      <p>
        The agent panel can also run external agents. These run as separate processes and talk to Zed over the Agent
        Client Protocol (ACP), which standardizes communication between editors and coding agents: local agents run as
        sub-processes and exchange JSON-RPC over stdio, and the protocol reuses MCP&apos;s JSON representations where it
        can. Zed&apos;s documentation lists Claude, Codex, OpenCode, Copilot, Cursor, and the Pi coding agent among the
        common choices, with sections for Gemini CLI as well, and points to the ACP registry for the full list.
      </p>
      <p>
        This is the idea the harness layer article argues for, in shipping software: the editor is one component and
        the agent is another, joined by a protocol instead of a product bundle.
      </p>

      <h2 id="permissions">Tool permissions</h2>
      <p>
        The Zed Agent asks for confirmation before tool actions by default. Rules can always allow, always confirm, or
        always deny, matched against the shell command for the terminal tool and the file path for edits. Built-in
        security rules block recursive deletion of critical directories even when everything else is set to allow.
      </p>

      <h2 id="instructions">Instruction files</h2>
      <p>
        For project instructions, Zed uses the first file it finds from a list that includes <code>.rules</code>,{' '}
        <code>.cursorrules</code>, <code>.windsurfrules</code>, <code>.clinerules</code>,{' '}
        <code>.github/copilot-instructions.md</code>, <code>AGENT.md</code>, <code>AGENTS.md</code>,{' '}
        <code>CLAUDE.md</code>, and <code>GEMINI.md</code>. Personal instructions live in an <code>AGENTS.md</code> in
        Zed&apos;s config folder. Reading other tools&apos; files is a practical portability choice.
      </p>

      <h2 id="models">Models</h2>
      <p>
        Models can come from Zed&apos;s hosted service, from provider API keys including Anthropic-compatible and
        OpenAI-compatible endpoints, from existing ChatGPT, Claude, or GitHub Copilot subscriptions, from gateways such
        as OpenRouter, Amazon Bedrock, and Vercel, or from local and self-hosted models.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        Zed is the clearest current example of an editor acting as an agent host. Open source code, a choice of model
        sources, MCP for tools, and ACP for whole agents mean every piece around the editor can be swapped.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Only the first instruction file counts.</b> If a repository has both <code>.rules</code> and <code>AGENTS.md</code>, Zed uses the one earlier in its list.</li>
        <li><b>External agents bring their own configuration.</b> Permissions, models, and tools for an ACP agent are set in that agent, not in Zed&apos;s agent settings.</li>
        <li><b>A global allow is broad.</b> Setting the default to allow skips most prompts; prefer narrow allow rules.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Many model sources, local models, and whole agents swappable over ACP.</li>
        <li><b>Inspectable.</b> Strong. GPL source, and agent changes are reviewed in the panel.</li>
        <li><b>Portable.</b> Strong. Reads AGENTS.md and other tools&apos; instruction files, and uses MCP and ACP.</li>
        <li><b>Bounded.</b> Good by default, since tool actions need confirmation, with deny rules and built-in safety rules.</li>
        <li><b>Grounded.</b> Strong for code, working directly in the project.</li>
        <li><b>Auditable.</b> Moderate in the editor; durable once reviewed work is committed to git.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Zed is not a model and not a broker. It is an editor that runs one agent at a time per thread, its own or an
        external one.
      </p>
    </>
  );
}
