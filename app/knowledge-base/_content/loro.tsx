import type { Article } from './types';

export const article: Article = {
  slug: 'loro',
  title: 'Loro',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / GOVERNED HARNESS',
  summary: 'A Python agent harness organized around explicit authority, identity-bound approvals, policy decisions, and durable audit records.',
  standfirst: 'Most harnesses start with capability and add controls later. Loro starts with the controls. Identity, permission decisions, approval records, sandboxing, and audit delivery are structural parts of the runtime rather than features layered on top.',
  keywords: ['Loro', 'governed agent harness', 'agent policy', 'agent audit', 'approval workflow', 'enterprise AI agent', 'Iceberg agent memory', 'Polaris'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'governed-first', label: 'What governed-first means' },
    { id: 'identity', label: 'Identity as the starting point' },
    { id: 'policy', label: 'Policy over normalized resources' },
    { id: 'approvals', label: 'Approvals that survive replay' },
    { id: 'sandboxing', label: 'Subprocess profiles and containment' },
    { id: 'memory', label: 'Local memory and governed shared memory' },
    { id: 'artifacts', label: 'Artifacts with provenance' },
    { id: 'audit', label: 'Audit as a delivery problem' },
    { id: 'standards', label: 'Standards support' },
    { id: 'workspace', label: 'Workspace surfaces without a second boundary' },
    { id: 'gateways', label: 'Gateways and the widened perimeter' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'when-to-choose', label: 'When it fits' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Loro on GitHub', href: 'https://github.com/alexmerced-oss/loro', note: 'Source, documentation, and the project status page describing what is stable and what is pre-1.0.' },
    { label: 'loro-agent on PyPI', href: 'https://pypi.org/project/loro-agent/', note: 'Installation, extras for data, cloud, MCP, gateway, and web UI, and release history.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'The profile specification Loro implements for portable, governed agent definitions.' },
    { label: 'Agentic Graph Specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'The plan format Loro validates and executes with human gates.' },
    { label: 'Apache Polaris', href: 'https://polaris.apache.org', note: 'The open catalog Loro reads governed table metadata from.' },
    { label: 'Apache Iceberg', href: 'https://iceberg.apache.org', note: 'The table format behind Loro governed shared-memory work.' },
  ],
  related: ['harnesses-and-brokers', 'magagent', 'apache-polaris'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Loro is a Python command line agent harness aimed at enterprise coding, governed data work, and productivity
        tasks. The name is Spanish for parrot, chosen for a bird that listens, learns, and helps information move
        between groups.
      </p>
      <p>
        What separates it from the general category of agent harnesses is where it starts. The design begins with
        identity, permission decisions, approvals, sandboxing, and audit, and builds capability inside those
        constraints. Most harnesses do the reverse, which produces systems that work well until someone asks who
        authorized a particular action.
      </p>
      <p>
        It is worth reading the project&apos;s own status material rather than assuming maturity uniformly. Loro
        maintains a deliberately limited stable core with a larger set of surfaces at varying stages, and it
        documents that boundary explicitly. That kind of honesty about what is settled is itself a useful signal.
      </p>

      <h2 id="governed-first">What governed-first means</h2>
      <p>
        The phrase is worth unpacking, because governance is frequently claimed and rarely structural.
      </p>
      <p>
        In most agent systems, a permission check is a conditional somewhere in a tool implementation, and the
        authority model is whatever emerges from the union of those conditionals. Ask what an agent may do and the
        answer requires reading code. Ask what it did and the answer requires reconstructing from logs that were not
        designed for the question.
      </p>
      <p>
        A governed-first design inverts this. There is an explicit identity attached to every run. There is a policy
        decision point that every tool action passes through. There is a record of every approval, bound to the
        identity that gave it. There is an audit stream that is delivered rather than merely written. Capability is
        added by extending these, not around them.
      </p>
      <p>
        The practical difference shows up in the questions the system can answer. Who was this agent acting for.
        What was it permitted to do. What did it actually do. Who approved the parts that needed approval. Can that
        be demonstrated six months later. In a governed-first harness these have answers by construction rather than
        by investigation.
      </p>

      <h2 id="identity">Identity as the starting point</h2>
      <p>
        Loro establishes an identity context from configuration and environment, with required fields that can be
        managed centrally, and propagates it into audit records and session state.
      </p>
      <p>
        This addresses the most common structural weakness in agent deployments. When an agent runs as itself, with
        its own broad credentials, every action it takes is attributed to the agent. That collapses two different
        questions into one: whether the agent was allowed to do something, and whether the person it was acting for
        was allowed. An agent then becomes a way to reach data the requester could not reach directly, which is a
        governance failure that no amount of prompt discipline addresses.
      </p>
      <p>
        Carrying identity through the run means permission checks and audit records both refer to a real principal.
        It also makes the audit trail useful to someone outside the engineering team, because the record names people
        and roles rather than service accounts.
      </p>

      <h2 id="policy">Policy over normalized resources</h2>
      <p>
        Loro normalizes the things an agent can act on into resource kinds: filesystem, shell, Git, memory, catalog,
        provider, MCP, and session messages. Policy is expressed against those normalized resources rather than
        against individual tool implementations.
      </p>
      <p>
        The value of normalization is that policy becomes reviewable and complete. If every filesystem action, from
        whichever tool, resolves to a filesystem resource with an action and a path, then a single rule covers all of
        them. Without normalization, each tool carries its own idea of what a write is, and a new tool silently
        introduces a gap.
      </p>
      <p>
        The harness also exposes a way to ask why a decision was made, which is a small feature with a
        disproportionate effect. Policy that cannot be interrogated becomes policy nobody trusts, and the usual
        response to distrust is to widen permissions until the friction stops. Being able to explain a specific
        decision keeps narrow policy workable.
      </p>

      <h2 id="approvals">Approvals that survive replay</h2>
      <p>
        Loro records approvals as identity-bound records with once, session, and deny options, and includes replay
        protection.
      </p>
      <p>
        The replay detail is the interesting part. A naive approval mechanism asks a person to confirm an action and
        then proceeds. If the same approval can be reused for a subsequent, different action, the confirmation was
        theater. Binding an approval to a specific proposed action, and to the identity that granted it, means the
        approval covers what was actually shown.
      </p>
      <p>
        This connects to a point the harness layer makes: an approval gate is only as good as what it displays. A
        prompt asking whether to proceed, without showing the exact action, trains people to approve reflexively.
        Approval records that are bound to the specific action are also the artifact that makes a later review
        meaningful, since they establish what a person actually saw and agreed to.
      </p>

      <h2 id="sandboxing">Subprocess profiles and containment</h2>
      <p>
        Command execution runs through named subprocess profiles with minimized environments, bounded runtime and
        output, and optional enforcement through a sandboxing layer.
      </p>
      <p>
        Each element addresses a specific failure. Minimized environments stop credentials in environment variables
        from being visible to every command an agent runs, which is a quiet and common exposure. Bounded runtime
        stops a hung process from holding a task open indefinitely. Bounded output stops a command that prints a
        large file from filling the context and evicting the task. Sandbox enforcement bounds what the process can
        reach regardless of what it decides to do.
      </p>
      <p>
        The combination is the harness layer&apos;s test applied concretely: if the model behaved adversarially, what
        could it actually do? With a narrow profile, a minimized environment, and enforcement underneath, the answer
        is bounded by construction.
      </p>

      <h2 id="memory">Local memory and governed shared memory</h2>
      <p>
        Loro separates local memory from shared memory, and the separation carries a governance argument worth
        following.
      </p>
      <p>
        Local memory is what one agent knows in one workspace. Shared memory is knowledge available across agents and
        people, and Loro backs it with Postgres and Apache Iceberg adapters. Writes to shared memory are
        explicit-only and draft-gated rather than automatic.
      </p>
      <p>
        That restriction is deliberate and worth defending. An agent that writes freely into shared state is
        publishing. What it writes becomes something other agents and people treat as true, and errors propagate
        rather than staying local. Requiring an explicit, staged write with a review step means shared knowledge
        accumulates on purpose.
      </p>
      <p>
        The Iceberg path also means agent memory can live in the same governed lakehouse as the rest of an
        organization&apos;s data, with the same catalog, the same access control, and the same snapshot history. Loro
        additionally includes a read-only Polaris client for governed catalog discovery, so an agent can find out
        what tables exist through the catalog rather than through a hardcoded list.
      </p>
      <p>
        A safety scanner checks for obvious secrets before memory and artifact writes, which addresses a specific and
        easy-to-overlook risk: an agent that reads a configuration file and then writes what it learned into a shared
        store has just moved a credential somewhere it was not before.
      </p>

      <h2 id="artifacts">Artifacts with provenance</h2>
      <p>
        Loro generates documents, presentations, and spreadsheets, and attaches provenance sidecars bound by
        checksum, with a verification command.
      </p>
      <p>
        This matters because generated artifacts leave the system. A document produced by an agent gets emailed,
        filed, and cited, at which point its origin is whatever someone remembers. A checksum-bound provenance
        record turns the question of where this came from into something checkable rather than something recalled.
      </p>
      <p>
        It also closes a loop that most agentic systems leave open. Traces record what an agent did. Provenance
        records connect what an agent did to the artifact that resulted, which is the direction the question is
        usually asked from.
      </p>

      <h2 id="audit">Audit as a delivery problem</h2>
      <p>
        Loro treats audit as versioned records delivered over JSONL files or HTTP, with bounded buffering, retries,
        diagnostics, an explicit flush, and verification commands.
      </p>
      <p>
        Framing audit as delivery rather than as logging is the right instinct. Logs are written locally and are lost
        when the machine is, ignored when nobody aggregates them, and incomplete when a process exits unexpectedly.
        An audit stream with buffering, retry, and verification is designed on the assumption that the record must
        arrive somewhere durable, which is what a record is for.
      </p>
      <p>
        The verification and diagnostic commands matter for the same reason. An audit pipeline that silently stopped
        working three weeks ago is worse than none, because it produces confidence without coverage. Being able to
        check that delivery is healthy is part of the feature rather than an operational extra.
      </p>

      <h2 id="standards">Standards support</h2>
      <p>
        Loro implements several of the portable formats this reference covers, and its treatment of them is
        conservative in a way worth noting.
      </p>
      <p>
        It supports Open Agent Profile named agents with fail-closed narrowing, meaning a profile can only reduce
        capability rather than expand it, treats profile state as untrusted, binds proposals by digest, and restricts
        writeback to an atomic state section. Each of those constraints exists because a profile is a file, files
        can be edited, and a harness that trusts a profile to grant capability has moved its authority model into
        something anyone with write access can change.
      </p>
      <p>
        It supports Agent Skills with digest tracking, progressive loading, lifecycle controls, and reviewed
        installs. The reviewed install step is the notable one: a skill is instructions an agent will follow, so
        installing one without review is closer to running code than to reading documentation.
      </p>
      <p>
        It validates and plans Agentic Graph documents in a read-only mode over explicitly exported tools, and runs
        them with human gates held for an explicit decision. It connects to MCP servers over stdio and streamable
        HTTP with deny-by-default handling of extensions, and can act as an MCP server itself in a least-privilege
        mode with a read-only export ceiling.
      </p>
      <p>
        The pattern across all four is the same: adopt the portable format, and do not let adopting it become a way
        around the authority model.
      </p>

      <h2 id="workspace">Workspace surfaces without a second boundary</h2>
      <p>
        Recent releases added a desktop workspace around the governed runtime, and the stated constraint is the part
        worth studying: the web interface is not permitted to become an authority boundary or a general-purpose
        editor.
      </p>
      <p>
        That constraint is unusual and correct. A local UI attached to a governed harness is the most likely place
        for the governance to spring a leak, because a UI naturally wants to read files, run commands, and let a
        person adjust settings. The moment it can do those things outside the policy engine, the policy engine is
        advisory. Keeping workspace file context bounded, artifact previews authenticated, Git review read-only, and
        one isolated workspace and policy root per server preserves the property the harness exists to provide.
      </p>
      <p>
        The run center spans conversations and graph executions together, with usage and approval visibility in the
        same place as the work. Putting approvals where the work is matters more than it sounds: an approval queue
        a person has to navigate to separately is one they will clear in batches without reading.
      </p>
      <p>
        Group execution arrived in three modes, sequential, parallel, and coordinator, with approvals queued
        independently per agent. That last detail is the one to copy. A parallel fan-out that pools its approvals
        into one prompt gives a reviewer no way to tell which agent is asking for what, which converts a control
        into a formality.
      </p>
      <p>
        There is also an effective inventory of connected protocol servers, extensions, and skills that discloses no
        credentials. As with any governed system, being able to answer what is actually configured here, on demand,
        is part of what makes the configuration reviewable.
      </p>

      <h2 id="gateways">Gateways and the widened perimeter</h2>
      <p>
        Loro supports signed, identity-mapped gateways to several chat platforms, plus a generic one. Making an agent
        reachable from where people already work is an obvious usability win, and it changes the security question
        enough to deserve separate treatment.
      </p>
      <p>
        A terminal agent has an implicit authority model: whoever is at the keyboard is the user, and their shell
        permissions bound what is possible. A gateway removes that. Requests now arrive from a platform, from people
        who may not have accounts on the machine, through a channel that may include people the agent was never
        intended to serve.
      </p>
      <p>
        Three properties matter, and the naming of the feature indicates all three are treated as requirements.
        Requests should be <b>signed</b>, so the harness can verify a message actually came from the platform rather
        than from anyone who discovered the endpoint. They should be <b>identity-mapped</b>, so a platform user
        resolves to a real principal with real permissions rather than to a shared account. And the resulting run
        should carry that identity into policy decisions and audit records, so the answer to who asked for this is
        the person rather than the integration.
      </p>
      <p>
        The failure mode when these are absent is worth stating plainly, because it is common. A chat-connected agent
        with a single service identity gives every member of a channel the union of that identity&apos;s permissions.
        Someone invites a contractor to the channel and has, without noticing, granted them whatever the agent can
        reach. Nothing in the agent misbehaved. The perimeter simply moved and nobody adjusted the authority model.
      </p>
      <p>
        The same reasoning applies to the optional web interface. Loopback binding by default, a fresh token per
        launch, and rendering that never evaluates raw HTML from model output are three specific defenses against
        three specific mistakes: exposing a local service to the network, leaving a long-lived session open, and
        letting model output execute in the page that displays it.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        Loro occupies the execution layer and reaches further into the other three than most harnesses.
      </p>
      <p>
        Downward, it integrates with the data layer directly through Iceberg and Polaris, which means governed data
        access is a first-class path rather than a tool someone wrote. Sideways, it implements the standards layer
        formats for agents, skills, plans, and connections. Upward, it normalizes tool calls across several provider
        families so the model remains a choice.
      </p>
      <p>
        As an example in this reference it serves a particular purpose: it demonstrates that the governance
        properties the openness test asks about are implementable rather than aspirational. Bounded and auditable are
        the two properties most systems score worst on, and they are the two this harness is organized around.
      </p>

      <h2 id="when-to-choose">When it fits</h2>
      <ul>
        <li><b>Regulated or reviewed environments.</b> Where being able to demonstrate authority and reconstruct actions is a requirement rather than a preference.</li>
        <li><b>Agents touching governed data.</b> Where lakehouse integration through a catalog is the intended access path.</li>
        <li><b>Work with real consequences.</b> Where approval gates and reversibility matter more than autonomy.</li>
        <li><b>Organizations with existing identity infrastructure.</b> Where propagating a real principal through agent runs is achievable and valuable.</li>
        <li><b>Teams that want policy in one place.</b> Rather than distributed through tool implementations.</li>
      </ul>
      <p>
        Conversely, a solo developer wanting a fast coding assistant will find the governance machinery to be
        overhead without a corresponding benefit. That is a legitimate mismatch rather than a flaw, and choosing a
        lighter harness for that case is the right call.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Governance has setup cost.</b> Identity, approvals, audit, sandbox, and memory each have a configuration step. The setup wizards reduce it and do not remove it.</li>
        <li><b>Pre-1.0 surfaces are marked as such.</b> The project distinguishes its stable core from surfaces still stabilizing. Read the status document rather than assuming uniform maturity.</li>
        <li><b>Shared memory writes are deliberately awkward.</b> Draft gating is friction on purpose. Teams that route around it lose the property it provides.</li>
        <li><b>Audit needs a destination.</b> Configuring delivery and then not monitoring it produces the false confidence described above.</li>
        <li><b>Sandbox enforcement depends on the platform.</b> Optional enforcement layers vary by operating system, so verify what is actually active rather than what is configured.</li>
        <li><b>Narrow policy needs maintenance.</b> Policy that blocks legitimate work generates pressure to widen it. Reviewing denials periodically is how narrow policy stays narrow.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Open source, with agents, skills, plans, and connections in portable formats.</li>
        <li><b>Inspectable.</b> Strong. Open source, with an explicit facility for explaining policy decisions.</li>
        <li><b>Portable.</b> Strong for definitions. Profiles, skills, and graphs move to other conformant runtimes.</li>
        <li><b>Bounded.</b> Very strong. This is the property the design is organized around, enforced outside the model at several layers.</li>
        <li><b>Grounded.</b> Strong. Catalog-mediated data access and governed shared memory supply facts rather than recall.</li>
        <li><b>Auditable.</b> Very strong. Delivered audit records, identity-bound approvals, and checksum-bound artifact provenance together cover what happened, who allowed it, and what resulted.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Loro is not a broker. It runs agents under governance. Choosing between several installed harnesses is a
        separate job.
      </p>
      <p>
        Loro is not a lightweight tool. The governance machinery is the point, and it is overhead for casual use.
      </p>
      <p>
        Loro is not a substitute for organizational policy. It provides mechanisms for expressing and enforcing
        authority. Deciding what the authority should be remains a human decision, and a harness with excellent
        controls configured permissively is not governed.
      </p>
    </>
  );
}
