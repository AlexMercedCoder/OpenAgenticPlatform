import type { Article } from './types';

export const article: Article = {
  slug: 'agent-approval-interchange-specification',
  title: 'Agent Approval Interchange Specification',
  kind: 'technology',
  layer: 'open-standards',
  kicker: 'STANDARD / HUMAN AUTHORITY',
  summary: 'A transport-neutral contract for pausing an agent and asking a human to authorize one exact action from any trusted interface.',
  standfirst: 'AAIS makes approval a durable, portable protocol instead of a terminal prompt: the harness stays authoritative while a CLI, web UI, desktop app, or policy service presents and returns the decision.',
  keywords: ['Agent Approval Interchange Specification', 'AAIS', 'agent approvals', 'human in the loop', 'tool authorization', 'approval protocol', 'agent safety'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'boundary', label: 'The authority boundary' },
    { id: 'safety', label: 'Safety properties' },
    { id: 'reconnect', label: 'Approvals survive reconnects' },
    { id: 'composition', label: 'How AAIS composes' },
    { id: 'libraries', label: 'Five support libraries' },
    { id: 'file-store', label: 'A shared durable store in Python' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'AAIS on GitHub', href: 'https://github.com/alexmerced-oss/agent-approval-interchange-spec', note: 'Specification, security model, schemas, conformance fixtures, and five support libraries.' },
    { label: 'AAIS specification', href: 'https://github.com/alexmerced-oss/agent-approval-interchange-spec/blob/main/spec/v1/SPEC.md', note: 'The normative 1.0 protocol contract.' },
    { label: 'AAIS Python library 0.2.0', href: 'https://github.com/alexmerced-oss/agent-approval-interchange-spec/releases/tag/python/v0.2.0', note: 'The release that adds the shared durable approval store used by MagAgent, Loro, and Merced AI.' },
    { label: 'AAIS integration guide', href: 'https://github.com/alexmerced-oss/agent-approval-interchange-spec/blob/main/docs/integration.md', note: 'Guidance for harnesses and approval-presenting applications.' },
  ],
  related: ['open-standards', 'bounded', 'agentic-graph-specification', 'open-agent-profile'],
  Body,
};

function Body() {
  return <>
    <h2 id="what-it-is">What it is</h2>
    <p>AAIS 1.0 (published as a release candidate) is an open, transport-neutral contract for one critical handoff: an agent runtime needs permission to perform an action, and a person must be able to decide from the interface they are actually using. It covers chats, bot sessions, subagents, background jobs, and graph nodes without defining any of those runtimes.</p>
    <p>The first support release was 0.1.0, and the Python library is now at 0.2.0. Python, TypeScript, Go, Rust, and Java libraries share one conformance corpus and implement validation, RFC 8785 action digests, request and decision creation, replay-safe pending state, and durable snapshots.</p>
    <h2 id="boundary">The authority boundary</h2>
    <p>The harness remains the authority. A client presents the exact requested action and returns a selected decision; it does not grant itself new capability. Before acting, the harness revalidates the decision against current policy, the action digest, expiry, and offered choices.</p>
    <h2 id="safety">Safety properties</h2>
    <ul><li><b>Exact-action binding.</b> The decision is tied to the canonical action reviewed.</li><li><b>Bounded choices.</b> A client selects only a scope the harness offered.</li><li><b>Fail-closed lifecycle.</b> Expired, stale, conflicting, malformed, and replayed decisions are rejected.</li><li><b>Provenance and receipts.</b> Requests identify their origin and retries remain idempotent.</li></ul>
    <h2 id="reconnect">Approvals survive reconnects</h2>
    <p>A pending approval is durable application state, not a process blocked on standard input. Ordered events and snapshots let browser and desktop clients reconnect and recover outstanding decisions, including approvals raised by long-running graph nodes.</p>
    <h2 id="composition">How AAIS composes</h2>
    <p>AGS describes the work and its gates. OAP describes the agent and its authority ceiling. AAIS carries the live request and decision when a specific action reaches that boundary. MCP, AG-UI, HTTP/SSE, WebSocket, and stdio can transport or adapt the messages.</p>
    <h2 id="libraries">Five support libraries</h2>
    <p>The packages are published on PyPI, npm, pkg.go.dev, crates.io, and Maven Central. The libraries are versioned independently: TypeScript, Go, Rust, and Java remain at 0.1.0, while Python moved to 0.2.0 in September 2026 without changing the specification, schema, or conformance corpus. Shared fixtures ensure messages created in one language verify in another.</p>
    <h2 id="file-store">A shared durable store in Python</h2>
    <p>Python library 0.2.0 adds a ready-made approval authority that several processes can share through one JSON file, such as a web server, a CLI, and a stdio bridge. Every transaction holds a cross-process lock, writes are atomic, corrupt state is quarantined and must be acknowledged rather than read as empty, retention bounds resolved records, and event replay reports gaps explicitly. Pending requests record their owner by process id, process start time, and host, so a reused process id cannot make a stopped owner look alive.</p>
    <p>The rules and the storage are separated: storage backends implement a small published protocol, and a conformance kit lets a third-party backend prove it behaves correctly. MagAgent 1.4.0, Loro 0.22.0, and Merced AI 0.8.0 all require this release, and Loro uses the protocol for an experimental Postgres backend. It is the useful outcome for a young standard: three runtimes sharing one tested implementation of the hard part instead of three private ones.</p>
    <h2 id="not">What it is not</h2>
    <p>AAIS does not define chat, model reasoning, tools, profiles, graphs, authentication, or a network transport. It carries concise activity, provenance, risk, choices, decisions, and receipts, not private chain-of-thought.</p>
  </>;
}
