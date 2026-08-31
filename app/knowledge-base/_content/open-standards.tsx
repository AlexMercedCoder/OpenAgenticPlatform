import type { Article } from './types';

export const article: Article = {
  slug: 'open-standards',
  title: 'Open standards',
  kind: 'layer',
  layer: null,
  kicker: '04 / INTEROPERABILITY',
  summary: 'The layer that lets skills, tool connections, identity, workflows, and human approvals move between runtimes instead of being rewritten.',
  standfirst: 'Every harness needs portable answers for capability, connection, identity, work shape, and human authorization. Standards decide whether those definitions belong to your organization or to the first tool you adopted.',
  keywords: ['agent standards', 'Model Context Protocol', 'Agent Skills', 'Open Agent Profile', 'Agentic Graph Specification', 'Agent Approval Interchange Specification', 'agent interoperability', 'portable agents'],
  sections: [
    { id: 'what-the-layer-covers', label: 'What the layer covers' },
    { id: 'the-problem', label: 'The problem standards solve' },
    { id: 'four-questions', label: 'Five questions, five standards' },
    { id: 'mcp', label: 'Connection: MCP' },
    { id: 'skills', label: 'Capability: Agent Skills' },
    { id: 'identity', label: 'Identity: Open Agent Profile' },
    { id: 'workflow', label: 'Shape: Agentic Graph Specification' },
    { id: 'approval', label: 'Authority handoff: AAIS' },
    { id: 'together', label: 'How the five fit together' },
    { id: 'what-makes-a-standard-open', label: 'What makes a standard actually open' },
    { id: 'versioning', label: 'Versioning and compatibility' },
    { id: 'adoption', label: 'Adopting standards without a rewrite' },
    { id: 'failure-modes', label: 'Common failure modes' },
    { id: 'openness', label: 'How to evaluate this layer' },
    { id: 'not', label: 'What this layer is not' },
  ],
  learnMore: [
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'Specification, SDKs, and server examples for connecting agents to tools and data.' },
    { label: 'Agent Skills', href: 'https://agentskills.io', note: 'The format for packaging reusable agent capability as folders of instructions and resources.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'A vendor-neutral profile format for agent identity, capability, authority, and preferences.' },
    { label: 'Agentic Graph Specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'A portable document format for describing nodes, edges, tools, policy, and execution intent.' },
    { label: 'Agent Approval Interchange Specification', href: 'https://github.com/alexmerced-oss/agent-approval-interchange-spec', note: 'A transport-neutral protocol for exact, durable human approval requests and decisions.' },
    { label: 'JSON Schema', href: 'https://json-schema.org', note: 'The vocabulary most agent standards use to describe tool arguments and structured output.' },
    { label: 'OpenAPI Specification', href: 'https://www.openapis.org', note: 'Useful precedent for how an interface description standard changes an ecosystem.' },
  ],
  related: ['data-and-semantics', 'models-and-routing', 'harnesses-and-brokers'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-the-layer-covers">What the layer covers</h2>
      <p>
        The other three layers describe things a system has: data, models, runtimes. This layer describes the
        agreements between them. It is the least visible part of the architecture and the part that determines
        whether the previous three remain replaceable in practice or only in principle.
      </p>
      <p>
        Concretely, it covers the formats and protocols used to express what an agent is, what capabilities it has,
        what external systems it may reach, and how a multi-step piece of work is structured. These definitions exist
        in every agentic system whether or not anyone chose a format for them. The question is only whether they live
        in something portable or in a particular product&apos;s configuration.
      </p>

      <h2 id="the-problem">The problem standards solve</h2>
      <p>
        Consider a team eighteen months into building with agents. They have written thirty tool integrations,
        defined a dozen reusable procedures, established what each of their agents is allowed to do, and encoded
        several multi-step workflows. All of it works.
      </p>
      <p>
        Then a better harness appears, or the one they use changes its licensing, or a team elsewhere in the company
        standardizes on something else. The question is what moves.
      </p>
      <p>
        If the integrations were written against a protocol, they move without modification, because the protocol is
        what the new harness speaks too. If they were written as plugins for the old harness, all thirty are
        rewritten. If procedures were written as portable folders of instructions, they move by copying. If they were
        entered into a product&apos;s web interface, someone re-enters them. If authority was expressed in a profile
        document, it moves and can be reviewed. If it was expressed in prompts scattered across configuration, it is
        reconstructed from memory and something gets missed.
      </p>
      <p>
        Nothing about this scenario is hypothetical, and it is not really about switching tools. Most organizations
        end up running several harnesses at once, which means the same choice appears immediately rather than
        eventually. Standards decide whether that costs one definition or three.
      </p>
      <div className="kb-callout">
        <b>The underlying asymmetry</b>
        <p>
          A vendor benefits when your definitions live inside their product. You benefit when they live in a format
          several products can read. Neither party is behaving badly. The architecture simply has to be chosen
          deliberately, because the default favors the vendor.
        </p>
      </div>

      <h2 id="four-questions">Five questions, five standards</h2>
      <p>
        The four standards this site highlights are not competing. They answer different questions, and a system can
        use any combination of them.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead><tr><th>Question</th><th>Standard</th><th>Artifact</th></tr></thead>
          <tbody>
            <tr><td>What can this agent reach?</td><td>Model Context Protocol</td><td>A running server exposing tools, resources, and prompts</td></tr>
            <tr><td>What does this agent know how to do?</td><td>Agent Skills</td><td>A folder of instructions and supporting files</td></tr>
            <tr><td>Who is this agent and what may it do?</td><td>Open Agent Profile</td><td>A profile document describing identity, capability, and authority</td></tr>
            <tr><td>What is the shape of this work?</td><td>Agentic Graph Specification</td><td>A graph document of nodes, edges, tools, and policy</td></tr>
            <tr><td>May this exact action proceed?</td><td>Agent Approval Interchange Specification</td><td>A digest-bound request, decision, and receipt</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The distinction between them is easier to hold with an analogy from ordinary software. MCP is like a driver
        interface: it defines how a program talks to something external. Agent Skills are like a library: reusable
        know-how you install. A profile is like a service account definition: identity plus permissions. A graph
        document is like a build pipeline definition: the structure of the work itself.
      </p>

      <h2 id="mcp">Connection: MCP</h2>
      <p>
        The Model Context Protocol answers the integration question. Before it, connecting an agent to a system meant
        writing an integration for a specific harness. Ten systems and three harnesses meant thirty pieces of work,
        and each one had to be maintained separately.
      </p>
      <p>
        With a protocol, the integration is written once as a server and every client that speaks the protocol can
        use it. Ten systems and three harnesses becomes ten servers. That is the same argument that made database
        drivers, printer drivers, and language servers worth standardizing, and it holds for the same reason.
      </p>
      <p>
        The other thing a connection protocol provides is a boundary you can govern. Because tool access flows
        through a described interface rather than through code compiled into an agent, it becomes possible to say
        which servers an agent may use, to log calls in one place, and to revoke access without editing an
        application.
      </p>

      <p>
        There is a limit worth stating. A protocol standardizes how a tool is described and called. It does not
        standardize what the tool does or how well it does it. Two servers exposing a query capability can behave
        very differently in what they accept, what they return, and how they fail. Interoperability at the protocol
        level removes the integration cost and leaves the semantic work, which is why the data layer&apos;s emphasis
        on written meaning matters even in a fully protocol-based system.
      </p>

      <h2 id="skills">Capability: Agent Skills</h2>
      <p>
        Tools give an agent reach. Skills give it competence. The difference matters: a tool can query a database, but
        knowing your organization&apos;s procedure for investigating a failed payment is not a tool, it is knowledge
        about how to work.
      </p>
      <p>
        Packaged as a folder of instructions and supporting files, that knowledge becomes something you can version,
        review, share, and load only when it is relevant. The last part is more important than it sounds. An agent
        cannot hold every procedure your organization has in its context at once, so capability that is loaded on
        demand scales in a way that a growing system prompt does not.
      </p>
      <p>
        Skills also happen to be the most reviewable artifact in an agentic system, because they are mostly prose.
        A domain expert who cannot read code can read a skill, correct it, and be confident the correction takes
        effect. Very little else in this stack has that property.
      </p>

      <p>
        The design constraint that makes skills work is that they are loaded by reference rather than held
        permanently. A description of when a skill applies stays in view, and the full contents load only when the
        situation matches. Without that, a growing library of capability turns into a growing context bill on every
        request, and quality falls as the genuinely relevant material gets diluted by everything else.
      </p>

      <h2 id="identity">Identity: Open Agent Profile</h2>
      <p>
        Every system with more than one agent eventually needs to answer questions that are really about identity.
        Which agent did this. What was it allowed to do. Who is responsible for it. What does it prefer when there is
        a choice. Is this the same agent that ran last month.
      </p>
      <p>
        A profile makes those answers a document rather than an inference. It states identity, declared capabilities,
        authority boundaries, approval requirements, and operating preferences in a form that a harness can load and
        a person can review.
      </p>
      <p>
        The review property is the valuable one. Authority scattered through code and prompts cannot be audited,
        because there is no single artifact to look at. Authority written in a profile can be read by someone in
        compliance, diffed when it changes, and required to pass review before deployment. That is a governance
        capability, not a convenience.
      </p>

      <p>
        Identity also matters for the record. When an action taken last quarter is questioned, the useful answer is
        not that an AI did it. It is that this specific agent, operating under this profile version, with these
        declared boundaries, on behalf of this person, took this action. A profile document is what turns a vague
        attribution into a specific one, and it is the piece most systems are missing when they try to reconstruct
        an incident.
      </p>

      <h2 id="workflow">Shape: Agentic Graph Specification</h2>
      <p>
        Some agentic work is a conversation. Much of it is a process: gather these inputs, check this condition, take
        one of two branches, get approval here, produce this output. Processes have structure, and structure is worth
        writing down separately from the code that runs it.
      </p>
      <p>
        A graph specification describes that structure as nodes and edges, with the tools, policy, and intent
        attached. Doing so makes the process reviewable before it runs, which is exactly the point at which review is
        cheap. It also makes the same process runnable by different executors, and comparable across versions.
      </p>
      <p>
        This is familiar territory from data engineering, where pipeline definitions separated from execution engines
        turned out to be enormously valuable. The argument transfers: when the shape of the work is a document rather
        than a call stack, you can reason about it without running it.
      </p>

      <p>
        There is a natural tension here that is worth being honest about. Writing a process down makes it reviewable
        and reduces the room an agent has to improvise, which is exactly the point in regulated or high-consequence
        work. It also reduces the room an agent has to improvise in cases where improvisation was the value. The
        practical resolution is to reserve explicit structure for processes where the steps genuinely matter, and to
        leave open-ended work open-ended, rather than treating either style as the correct one everywhere.
      </p>

      <h2 id="approval">Authority handoff: AAIS</h2>
      <p>
        The Agent Approval Interchange Specification covers the moment a runtime must stop and ask a person whether
        one exact action may proceed. It binds the decision to a canonical action digest, limits the client to scopes
        the harness offered, and treats pending approvals as durable state that browser, desktop, CLI, or policy
        clients can recover after a reconnect.
      </p>
      <p>
        This keeps enforcement in the harness while freeing users from the terminal. AAIS carries concise activity,
        provenance, risk, choices, decisions, and receipts; it does not expose private model reasoning or define the
        surrounding chat, tool, profile, or graph protocol.
      </p>

      <h2 id="together">How the five fit together</h2>
      <p>
        The clearest way to see the division of labor is to follow one request through a system that uses all four.
      </p>
      <p>
        An operations engineer asks an agent to investigate why a nightly data job failed and to open a ticket if the
        cause is known.
      </p>
      <ol>
        <li>
          <b>The profile is loaded first.</b> It establishes which agent this is, that it may read logs and job
          metadata, that it may create tickets in one project, and that it may not restart jobs without approval.
          The harness now knows the boundaries before any model call happens.
        </li>
        <li>
          <b>A skill supplies the procedure.</b> The organization&apos;s written method for investigating job
          failures loads into context: check the scheduler first, then the source table freshness, then the
          transformation logs, and these four causes account for most incidents. This is knowledge, not capability,
          and it was written by the team that owns the pipeline rather than by whoever built the agent.
        </li>
        <li>
          <b>MCP servers provide reach.</b> The log system, the scheduler, and the ticket tracker each expose a
          server. The agent calls them through one protocol, and the same servers are used by a different harness in
          another team without modification.
        </li>
        <li>
          <b>A graph document shapes the escalation.</b> The part of the process with branches and an approval gate,
          deciding between opening a ticket, escalating to a person, or requesting a restart, is described as a graph
          rather than left implicit. It was reviewed before it ever ran.
        </li>
      </ol>
      <p>
        Now change one variable. The team replaces the harness. The profile still describes the agent. The skill still
        describes the procedure. The MCP servers still expose the same tools. The graph still describes the
        escalation. What changes is the runtime, which is the thing that should be cheap to change. That is the whole
        argument for this layer, expressed as a single scenario rather than as a principle.
      </p>

      <h2 id="what-makes-a-standard-open">What makes a standard actually open</h2>
      <p>
        Publishing a specification is not the same as opening it. A few properties separate standards that create
        ecosystems from ones that create dependencies with extra steps.
      </p>
      <ul>
        <li><b>The specification is complete enough to implement from.</b> If building a compatible implementation requires reading the reference implementation&apos;s source, the specification is documentation, not a standard.</li>
        <li><b>More than one independent implementation exists.</b> This is the single strongest signal. Until a second implementation exists, nobody has tested whether the specification is sufficient.</li>
        <li><b>The license permits implementation without permission.</b> Including for competitors.</li>
        <li><b>Changes happen in public, with a process.</b> Versioning, deprecation policy, and a visible record of decisions.</li>
        <li><b>Compatibility is testable.</b> A conformance suite, or at least a shared set of examples, so claims of support can be checked.</li>
        <li><b>Governance is not controlled by a single commercial interest.</b> Or, if it currently is, there is a stated path toward broader stewardship.</li>
      </ul>
      <p>
        These vary across the four standards above, and honesty about where each one sits is more useful than
        treating them as equivalent. A young specification with one implementation can still be the right choice.
        It is simply a different bet than adopting something with a decade of independent implementations, and the
        difference should be a deliberate decision.
      </p>

      <h2 id="versioning">Versioning and compatibility</h2>
      <p>
        Standards work only if the artifacts written against them remain readable as the standards move. This is
        ordinary software discipline, and it is regularly skipped for agent artifacts because they look like content
        rather than like code.
      </p>
      <p>
        A few practices carry most of the weight.
      </p>
      <h3>Declare the version in the artifact</h3>
      <p>
        Every profile, skill, and graph document should state which version of which specification it targets. An
        artifact without a declared version becomes ambiguous the first time the specification changes, and the
        ambiguity surfaces as behavior that differs between runtimes with no obvious cause.
      </p>
      <h3>Separate document version from support version</h3>
      <p>
        Specifications have two distinct version numbers that get conflated. One is the version of the specification
        document itself. The other is the version of the tooling or library that implements it. A project can ship
        several library releases against one unchanged specification, and saying so plainly avoids the impression
        that a standard is churning when only its tooling is.
      </p>
      <h3>Prefer additive change</h3>
      <p>
        New optional fields let old artifacts keep working. Renamed or repurposed fields do not. When a specification
        must break compatibility, an explicit major version and a stated migration path are worth far more than
        avoiding the break through clever reinterpretation of existing fields.
      </p>
      <h3>Test artifacts, not just code</h3>
      <p>
        A skill that references a tool which no longer exists, or a profile granting access to a system that was
        decommissioned, fails at the worst possible time. Validating artifacts against the current environment in
        continuous integration catches this the same way schema tests catch a dropped column.
      </p>
      <h3>Treat extensions as a decision</h3>
      <p>
        Most specifications allow implementation-specific extension, and using one is sometimes correct. What matters
        is recording that you did, and knowing what stops working if you move. An extension used deliberately, with a
        note, is an engineering choice. An extension used because it was convenient is lock-in that nobody decided
        to accept.
      </p>

      <h2 id="adoption">Adopting standards without a rewrite</h2>
      <p>
        Standards are usually adopted while a working system already exists, which means the realistic path is
        incremental rather than a migration project.
      </p>
      <ol>
        <li><b>Start with the next integration, not the existing ones.</b> Write the new connection as a protocol server. Leave working integrations alone until they need changing anyway.</li>
        <li><b>Extract the procedures people repeat.</b> The instructions that get pasted between prompts are already skills. Move them into files and load them by reference.</li>
        <li><b>Write down authority for one agent.</b> Not all of them. Pick the one with the most permissions, express its boundaries as a profile, and see what the exercise reveals.</li>
        <li><b>Document one workflow as a graph.</b> Choose a process that already exists and is already argued about. The document usually settles the argument.</li>
        <li><b>Convert on contact.</b> Whenever an integration or procedure needs modification, move it to the portable form then. This spreads the cost across work you were doing anyway.</li>
        <li><b>Keep the artifacts in version control.</b> Skills, profiles, and graph documents are code-adjacent artifacts and benefit from the same review, history, and rollback.</li>
      </ol>

      <h2 id="failure-modes">Common failure modes</h2>
      <ul>
        <li><b>Standard adopted, extensions everywhere.</b> The protocol is used, but with proprietary extensions that every client must support, which recreates lock-in inside a compliant wrapper.</li>
        <li><b>Definitions duplicated rather than referenced.</b> The same skill copied into three repositories, which drift apart within a quarter.</li>
        <li><b>Profiles that describe intent rather than enforcement.</b> A document saying an agent may not delete, with nothing preventing deletion. Documentation dressed as policy.</li>
        <li><b>Standards chosen for their logo.</b> Adopting a specification because it is well known, without checking whether it answers a question you actually have.</li>
        <li><b>Version pinning ignored.</b> Specifications change. Artifacts without a declared version become ambiguous the first time the specification does.</li>
        <li><b>Everything modeled as a graph.</b> Structure is useful for processes and overhead for conversations. Not all work has a shape worth documenting.</li>
      </ul>

      <h2 id="openness">How to evaluate this layer</h2>
      <ul>
        <li><b>Replaceable.</b> Could a second harness read your skills, profiles, and tool connections without a translation step?</li>
        <li><b>Inspectable.</b> Are these artifacts human-readable text under version control, or product state in a database somewhere?</li>
        <li><b>Portable.</b> If your organization split in two tomorrow, could each half take a copy and keep working?</li>
        <li><b>Bounded.</b> Do profiles express authority in terms something can enforce, rather than in terms only a person could interpret?</li>
        <li><b>Grounded.</b> Do tool and skill definitions reference the semantic layer for meaning rather than restating it?</li>
        <li><b>Auditable.</b> Is there a history of how these definitions changed, and who changed them?</li>
      </ul>

      <h2 id="not">What this layer is not</h2>
      <p>
        Standards are not a substitute for enforcement. A profile that declares an authority boundary describes what
        should be true. Something in the execution layer still has to make it true. Standards make policy portable
        and reviewable, which is valuable, and they do not execute anything.
      </p>
      <p>
        Standards are also not free. Each one adopted is a specification to track, a version to manage, and a
        constraint on how you express things. That cost is worth paying where portability matters and is not worth
        paying for a definition that exists in one place and will never move.
      </p>
      <p>
        Finally, adopting a standard does not make an architecture open. It is possible to use every protocol on this
        page and still build a system where one component cannot be removed without the whole thing stopping. The
        standards make openness achievable. Whether it was achieved is what the six-part openness test is for.
      </p>
    </>
  );
}
