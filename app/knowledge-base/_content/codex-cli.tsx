import type { Article } from './types';

export const article: Article = {
  slug: 'codex-cli',
  title: 'Codex CLI',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / CODING HARNESS',
  summary: 'OpenAI\'s open source coding agent that runs locally in a terminal, with explicit sandbox and approval settings, AGENTS.md instructions, MCP tools, and optional local models.',
  description: "OpenAI's open source coding agent for the terminal, with explicit sandbox and approval settings, AGENTS.md instructions, MCP tools, and optional local models.",
  standfirst: 'Codex CLI is an Apache 2.0 licensed harness from a model provider. Its most instructive feature for an open architecture is how plainly it separates what the agent may touch (the sandbox) from when it must ask (the approval policy).',
  keywords: ['Codex CLI', 'OpenAI Codex', 'coding agent', 'terminal agent', 'AGENTS.md', 'agent sandbox', 'approval policy', 'MCP', 'open source coding agent'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'sandbox-and-approvals', label: 'Sandbox and approvals, separately' },
    { id: 'agents-md', label: 'AGENTS.md as the instruction file' },
    { id: 'models', label: 'Models and providers' },
    { id: 'tools', label: 'Tools and MCP' },
    { id: 'automation', label: 'Non-interactive runs' },
    { id: 'surfaces', label: 'CLI, IDE, and the cloud agent' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Codex on GitHub', href: 'https://github.com/openai/codex', note: 'Source (mostly Rust), install options, releases, and the Apache 2.0 license.' },
    { label: 'Codex CLI documentation', href: 'https://learn.chatgpt.com/docs/codex/cli', note: 'Official usage guide, including permissions, MCP servers, and codex exec.' },
    { label: 'Codex configuration reference', href: 'https://learn.chatgpt.com/docs/config-file/config-reference', note: 'Every config.toml key, including sandbox_mode, approval_policy, model_providers, and oss_provider.' },
    { label: 'AGENTS.md', href: 'https://agents.md/', note: 'The open instruction-file convention Codex reads and that other agents share.' },
  ],
  related: ['harnesses-and-brokers', 'claude-code', 'model-context-protocol'],
  updated: '2026-10-13',
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Codex CLI is a coding agent from OpenAI that runs locally on your computer. It reads and edits files in a
        project, runs commands, and reports what it did. The repository is open source under the Apache 2.0 license,
        and most of the code is Rust. Installation is through npm, Homebrew, install scripts, or prebuilt binaries.
      </p>
      <p>
        It is distinct from Codex Web, OpenAI&apos;s cloud-hosted agent. This page is about the local harness, which
        is the part you can read, build, and run on your own terms.
      </p>

      <h2 id="sandbox-and-approvals">Sandbox and approvals, separately</h2>
      <p>
        The design detail most worth studying is that Codex expresses two different controls as two different
        settings.
      </p>
      <ul>
        <li><b>The sandbox</b> (<code>sandbox_mode</code>) limits what commands can reach on the filesystem and network: <code>read-only</code>, <code>workspace-write</code>, or <code>danger-full-access</code>.</li>
        <li><b>The approval policy</b> (<code>approval_policy</code>) decides when the agent must stop and ask, for example <code>on-request</code> or <code>never</code>, with a granular form for finer rules.</li>
      </ul>
      <p>
        Keeping these apart matters. A sandbox is a boundary enforced by the operating system; an approval is a
        checkpoint with a person in it. A setup that never asks but cannot write outside the workspace is very
        different from one that asks often but has full access once approved. This reference&apos;s bounded test
        asks for exactly this: limits enforced outside the model, stated explicitly.
      </p>

      <h2 id="agents-md">AGENTS.md as the instruction file</h2>
      <p>
        Codex reads project instructions from <code>AGENTS.md</code>, and its <code>/init</code> command creates one.
        AGENTS.md is a shared convention rather than a Codex-only file, and it is one of the founding projects of the
        Agentic AI Foundation at the Linux Foundation. Other harnesses read it too, so instructions written once serve
        whichever agent a developer runs.
      </p>

      <h2 id="models">Models and providers</h2>
      <p>
        The default provider is OpenAI, signed in through a ChatGPT plan or an API key. The configuration also
        defines custom providers under <code>model_providers</code>, and an <code>--oss</code> mode that runs against
        a local provider, with <code>ollama</code> and <code>lmstudio</code> built in. That puts open-weight models
        within reach without changing harness, which is the replaceability this reference looks for in the models
        layer.
      </p>
      <p>
        Expect differences. A harness tuned against one provider&apos;s tool-calling behavior can feel weaker on
        another, and that is usually a harness-and-model fit issue rather than a capability gap.
      </p>

      <h2 id="tools">Tools and MCP</h2>
      <p>
        Beyond its built-in file and shell tools, Codex connects to local or remote MCP servers and shows which tools
        a session has available. Tool servers written for MCP are not tied to Codex; the same servers serve other
        harnesses.
      </p>

      <h2 id="automation">Non-interactive runs</h2>
      <p>
        <code>codex exec</code> runs a task without an interactive session, for scripts and CI. Non-interactive use
        moves every approval decision into configuration written ahead of time, so the sandbox and approval settings
        for automated runs deserve the same review as any other deployment change.
      </p>

      <h2 id="surfaces">CLI, IDE, and the cloud agent</h2>
      <p>
        Codex also ships as an IDE extension for VS Code and VS Code-based editors such as Cursor and Windsurf. The
        cloud agent at chatgpt.com/codex is a separate, hosted product. When evaluating openness, keep them apart:
        the CLI is open source and can run against local models; the cloud agent is a service.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        Codex CLI is an execution-layer harness. It consumes models from the routing layer (OpenAI by default,
        others by configuration), reaches tools over MCP, and reads instructions from an open file convention. Its
        sandbox and approval settings are a good reference design for the bounded property in any harness, coding or
        not.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Full access is a named mode for a reason.</b> <code>danger-full-access</code> removes the sandbox; use it only inside an environment that is itself the boundary, such as a disposable container.</li>
        <li><b>Repository content is untrusted input.</b> Text the agent reads can contain instructions aimed at it.</li>
        <li><b>Local models change the experience.</b> The <code>--oss</code> path works, and quality depends heavily on which model you run.</li>
        <li><b>Config options move.</b> Some approval values have been deprecated or marked unsupported over time; check the current reference before copying an old config.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Good. OpenAI by default, with custom providers and local models through configuration.</li>
        <li><b>Inspectable.</b> Strong. Apache 2.0 source, so the loop, tools, and sandbox implementation can be read.</li>
        <li><b>Portable.</b> Good. Instructions live in AGENTS.md and tools in MCP servers, both shared with other harnesses.</li>
        <li><b>Bounded.</b> Strong by design. Sandbox and approvals are explicit, separate, and enforced outside the model.</li>
        <li><b>Grounded.</b> Strong for code, working from files, commands, and test output.</li>
        <li><b>Auditable.</b> Good when changes land as commits; session records depend on how you run it.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Codex CLI is not the Codex cloud agent, and it is not a model.
      </p>
      <p>
        It is not a broker. It runs one agent loop rather than routing work across harnesses.
      </p>
    </>
  );
}
