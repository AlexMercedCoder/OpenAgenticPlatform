import type { Article } from './types';

export const article: Article = {
  slug: 'goose',
  title: 'goose',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / GENERAL-PURPOSE AGENT',
  summary: 'An open source, general-purpose agent that runs on your machine as a desktop app, CLI, or API, extends itself through MCP, and works with 15+ model providers. Now governed under the Agentic AI Foundation.',
  standfirst: 'goose began at Block and is now part of the Agentic AI Foundation at the Linux Foundation. It is a useful reference for an agent that is built on open standards from the inside: its extensions are MCP servers, and its repeatable workflows are portable YAML recipes.',
  keywords: ['goose', 'goose AI agent', 'Block goose', 'Agentic AI Foundation', 'AAIF', 'MCP extensions', 'goose recipes', 'open source AI agent', 'local AI agent'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'governance', label: 'Governance and the Agentic AI Foundation' },
    { id: 'extensions', label: 'Extensions are MCP servers' },
    { id: 'recipes', label: 'Recipes as portable workflows' },
    { id: 'models', label: 'Model providers' },
    { id: 'beyond-code', label: 'Beyond coding' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'goose documentation', href: 'https://goose-docs.ai/', note: 'Official docs: installation, providers, extensions, and recipes.' },
    { label: 'goose on GitHub', href: 'https://github.com/aaif-goose/goose', note: 'Source (Apache 2.0, mostly Rust), governance file, and releases.' },
    { label: 'Agentic AI Foundation announcement', href: 'https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation', note: 'The Linux Foundation announcement naming MCP, goose, and AGENTS.md as founding projects.' },
  ],
  related: ['harnesses-and-brokers', 'model-context-protocol', 'hermes-agent'],
  updated: '2026-10-13',
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        goose is a general-purpose AI agent that runs on your own machine. It ships as a desktop app for macOS,
        Linux, and Windows, as a CLI, and as an API for embedding. It is licensed Apache 2.0 and written mostly in
        Rust. The project writes its name in lowercase.
      </p>

      <h2 id="governance">Governance and the Agentic AI Foundation</h2>
      <p>
        goose was created at Block. In December 2025 the Linux Foundation formed the Agentic AI Foundation (AAIF)
        with three founding projects: Anthropic&apos;s Model Context Protocol, Block&apos;s goose, and
        OpenAI&apos;s AGENTS.md. The repository now lives under the <code>aaif-goose</code> organization with a
        published governance file.
      </p>
      <p>
        For an open architecture, neutral governance is part of the openness story. A harness owned by one company
        can change direction with that company; a foundation project has a process for how decisions get made.
      </p>

      <h2 id="extensions">Extensions are MCP servers</h2>
      <p>
        goose extends itself through the Model Context Protocol, and the project lists 70+ extensions. The design
        consequence is that goose has no private plugin format to lock into: an extension built for goose is an MCP
        server, usable by any other MCP client.
      </p>

      <h2 id="recipes">Recipes as portable workflows</h2>
      <p>
        Recipes capture a workflow as a YAML file: instructions, the extensions it needs, and parameters. They can be
        shared across a team and run in CI. A recipe is the goose equivalent of a skill or a saved procedure, kept as
        a file you own and can version, rather than as settings inside the product.
      </p>

      <h2 id="models">Model providers</h2>
      <p>
        goose works with 15+ providers, including Anthropic, OpenAI, Google, Ollama, OpenRouter, Azure, and Bedrock,
        and can use existing Claude, ChatGPT, or Gemini subscriptions through the Agent Client Protocol (ACP). Local
        models through Ollama keep work on your own hardware when that matters.
      </p>

      <h2 id="beyond-code">Beyond coding</h2>
      <p>
        goose is positioned for research, writing, automation, and data analysis as well as code. That puts it closer
        to a personal or operations agent than a pure coding harness, and it means the bounded and grounded questions
        apply to whatever systems its extensions reach, not only a repository.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        goose is an execution-layer agent built almost entirely on open interfaces: MCP for tools, many providers for
        models, YAML recipes for workflows, and foundation governance for the project itself. It is a strong example
        of the composable pattern this reference describes.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Every extension is a grant of authority.</b> An MCP server connected to email, files, or a database extends what the agent can do. Review the list like a permission set.</li>
        <li><b>Third-party extensions are code you run.</b> Vet them as you would any dependency.</li>
        <li><b>General purpose means broad reach.</b> Decide what the agent may touch outside a repository before it touches it.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Many providers and local models.</li>
        <li><b>Inspectable.</b> Strong. Apache 2.0 source under foundation governance.</li>
        <li><b>Portable.</b> Strong. Extensions are MCP servers and recipes are YAML files.</li>
        <li><b>Bounded.</b> Depends on configuration: which extensions are enabled defines what it can do.</li>
        <li><b>Grounded.</b> Good when extensions connect it to real systems of record.</li>
        <li><b>Auditable.</b> Achievable. Local operation means you control what is recorded.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        goose is not a model and not tied to one provider. It is not a broker; it runs its own agent. It is not only a
        coding tool.
      </p>
    </>
  );
}
