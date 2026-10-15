import type { Article } from './types';

export const article: Article = {
  slug: 'agent2agent-protocol',
  title: 'Agent2Agent Protocol (A2A)',
  kind: 'technology',
  layer: 'open-standards',
  kicker: 'OPEN STANDARDS / AGENT INTEROPERABILITY',
  summary: 'An open standard, originally from Google and now at the Linux Foundation, for AI agents to discover each other and work together through Agent Cards, tasks, messages, and artifacts.',
  description: "An open standard, first from Google and now at the Linux Foundation, for AI agents to discover each other and work together through Agent Cards and tasks.",
  standfirst: 'MCP connects an agent to tools and data. A2A connects an agent to other agents, including ones built by different teams on different frameworks, without either side exposing its internals.',
  keywords: ['A2A', 'Agent2Agent', 'Agent2Agent Protocol', 'agent interoperability', 'Agent Card', 'multi-agent', 'Linux Foundation', 'A2A vs MCP'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'a2a-and-mcp', label: 'A2A and MCP' },
    { id: 'agent-card', label: 'Agent Cards and discovery' },
    { id: 'tasks', label: 'Tasks, messages, parts, and artifacts' },
    { id: 'transport', label: 'Bindings, streaming, and push' },
    { id: 'governance', label: 'Governance and versions' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'A2A Protocol', href: 'https://a2a-protocol.org/latest/', note: 'The official site: overview, governance, and links to the specification and SDKs.' },
    { label: 'A2A key concepts', href: 'https://a2a-protocol.org/latest/topics/key-concepts/', note: 'Actors, Agent Cards, tasks, messages, parts, artifacts, streaming, and push notifications.' },
    { label: 'A2A specification', href: 'https://a2a-protocol.org/latest/specification/', note: 'The normative spec, including task states and the JSON-RPC, gRPC, and HTTP+JSON bindings.' },
    { label: 'A2A on GitHub', href: 'https://github.com/a2aproject/A2A', note: 'Specification source, governance, and the Apache 2.0 license.' },
  ],
  related: ['open-standards', 'model-context-protocol', 'harnesses-and-brokers'],
  updated: '2026-10-13',
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        The Agent2Agent (A2A) Protocol is an open standard for communication and collaboration between AI agents.
        One agent, acting as a client on behalf of a user, sends work to a remote agent that exposes an HTTP endpoint
        implementing the protocol. The remote agent does the work and reports progress and results, without either
        side needing to know how the other is built.
      </p>

      <h2 id="a2a-and-mcp">A2A and MCP</h2>
      <p>
        The two protocols are complementary. MCP is how an agent reaches tools and data: a function to call, a
        resource to read. A2A is how an agent reaches another agent: a peer that takes a task, may ask follow-up
        questions, and returns results over time. A typical system uses both, MCP inside each agent and A2A between
        them.
      </p>
      <p>
        The distinction is practical. A tool call is expected to be quick and deterministic in shape. A task handed to
        another agent may run for minutes or hours, need more input partway through, and produce several outputs.
        A2A is designed for that second shape.
      </p>

      <h2 id="agent-card">Agent Cards and discovery</h2>
      <p>
        An Agent Card is a JSON document that describes an agent: its identity, endpoint, capabilities, skills, and
        authentication requirements. The specification registers a well-known location for it,{' '}
        <code>/.well-known/agent-card.json</code>, so a client can discover what a remote agent offers before
        sending it anything.
      </p>
      <p>
        For an open architecture, the Agent Card is the agent&apos;s public contract. It is the portable description
        another team, or another framework, relies on.
      </p>

      <h2 id="tasks">Tasks, messages, parts, and artifacts</h2>
      <ul>
        <li><b>Task.</b> A stateful unit of work with a unique ID and a defined lifecycle. States include submitted, working, input required, auth required, completed, failed, canceled, and rejected.</li>
        <li><b>Message.</b> One turn of communication, with a role of user or agent.</li>
        <li><b>Part.</b> The content container inside messages and artifacts, holding text, raw bytes, a URL, or structured data.</li>
        <li><b>Artifact.</b> A tangible output of a task, such as a document, an image, or structured data.</li>
      </ul>
      <p>
        The input-required and auth-required states matter most for governance. They give a remote agent a standard
        way to stop and ask, rather than guessing or acting on authority it was not given.
      </p>

      <h2 id="transport">Bindings, streaming, and push</h2>
      <p>
        The specification defines three protocol bindings: JSON-RPC 2.0, gRPC, and HTTP+JSON (REST), and allows
        custom bindings. Clients can stream incremental results over server-sent events, and for long or disconnected
        work a server can call a client-supplied webhook with push notifications.
      </p>

      <h2 id="governance">Governance and versions</h2>
      <p>
        A2A was originally developed by Google and donated to the Linux Foundation. A Technical Steering Committee
        with representatives from AWS, Cisco, Google, IBM Research, Microsoft, Salesforce, SAP, and ServiceNow
        maintains it, and it is licensed Apache 2.0. The latest released specification version is 1.0.0.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        A2A belongs in the open standards layer next to MCP, Agent Skills, and AGENTS.md. Its job is to keep the
        boundary between agents replaceable: an agent built on one framework can delegate to an agent built on
        another, and either can be swapped without the other noticing, as long as the Agent Card and task behavior
        hold.
      </p>
      <p>
        It is also the natural interface for a broker. A component that routes work to several agents can treat each
        one as an A2A server rather than integrating each framework separately.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Authentication is declared, not solved.</b> The Agent Card states requirements; your identity and authorization design still has to carry the user&apos;s authority across the hop.</li>
        <li><b>Remote output is untrusted input.</b> Text returned by another agent can contain instructions aimed at yours.</li>
        <li><b>Long tasks need records.</b> Keep task IDs, state changes, and artifacts so a multi-agent outcome can be reconstructed later.</li>
        <li><b>Versions changed shape.</b> Early versions differ from 1.0; check which version an SDK or server implements.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Agents behind a stable Agent Card can be swapped.</li>
        <li><b>Inspectable.</b> Good at the boundary: tasks, messages, and artifacts are explicit. Each agent&apos;s internals stay its own.</li>
        <li><b>Portable.</b> Strong. An open spec with multiple bindings and SDKs.</li>
        <li><b>Bounded.</b> Supported through declared authentication and input-required and auth-required states; enforcement is the implementer&apos;s job.</li>
        <li><b>Grounded.</b> Neutral. Grounding depends on what each agent connects to.</li>
        <li><b>Auditable.</b> Good when task histories and artifacts are recorded on both sides.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        A2A is not a replacement for MCP, and it is not an agent framework. It does not decide how an agent works
        inside; it only defines how agents talk to each other.
      </p>
    </>
  );
}
