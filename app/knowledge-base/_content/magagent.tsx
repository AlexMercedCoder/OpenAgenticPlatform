import type { Article } from './types';

export const article: Article = {
  slug: 'magagent',
  title: 'MagAgent',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / DEVELOPER HARNESS',
  summary: 'A terminal-native Python agent framework built around persistent graph memory, portable agent profiles, and a broad tool surface.',
  standfirst: 'MagAgent is a coding and productivity harness whose organizing idea is memory. Most agents forget everything between sessions. MagAgent is built so that what it learns about your projects, conventions, and preferences persists and accumulates.',
  keywords: ['MagAgent', 'agent framework', 'Python agent', 'persistent memory', 'MagGraph', 'Open Agent Profile', 'terminal agent', 'agent skills'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'memory-first', label: 'The memory-first design' },
    { id: 'mag-ecosystem', label: 'The Mag ecosystem' },
    { id: 'profiles', label: 'Agents defined as profiles' },
    { id: 'tools-and-lsp', label: 'Tools, language servers, and MCP' },
    { id: 'skills-and-plugins', label: 'Skills, recipes, and plugins' },
    { id: 'graphs', label: 'Agentic graphs for planned work' },
    { id: 'sandboxes', label: 'Sandboxes and boundaries' },
    { id: 'background', label: 'Background work and the daemon' },
    { id: 'evals', label: 'Evaluation as a built-in concern' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'when-to-choose', label: 'When it fits' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'MagAgent on GitHub', href: 'https://github.com/AlexMercedCoder/MagAgent', note: 'Source, documentation, and the roadmap toward a 1.0 release.' },
    { label: 'MagAgent on PyPI', href: 'https://pypi.org/project/mag-agent/', note: 'Installation and release history.' },
    { label: 'MagGraph', href: 'https://github.com/AlexMercedCoder/MagGraph', note: 'The graph memory layer MagAgent is built on.' },
    { label: 'Mag Command Center', href: 'https://github.com/AlexMercedCoder/MagCommandCenter', note: 'The desktop application for MagAgent projects, chat, memory, and configuration.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'The profile specification MagAgent implements for portable agent definitions.' },
    { label: 'Agentic Graph Specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'The graph format used for planned, reviewable multi-step work.' },
  ],
  related: ['harnesses-and-brokers', 'loro', 'open-agent-profile'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        MagAgent is a terminal-native agent framework written in Python and licensed under Apache 2.0. It handles
        coding and general productivity work: reading and editing files, running commands, searching the web,
        querying databases, generating documents, and orchestrating multi-step tasks.
      </p>
      <p>
        Two things distinguish it from the general category. The first is that memory is a first-class component
        rather than a session buffer, backed by a graph store that persists between sessions. The second is that
        agents themselves are defined as portable profile documents rather than as configuration inside the tool.
      </p>
      <p>
        The name comes from the magpie, a corvid, chosen for the family&apos;s association with memory and tool use.
        The naming is doing real work: memory is the organizing principle rather than one feature among many.
      </p>

      <h2 id="memory-first">The memory-first design</h2>
      <p>
        The problem MagAgent is organized around is one every agent user recognizes. You explain your conventions,
        your architecture, and the reasons behind three unusual decisions. The session ends. Next time you explain
        them again.
      </p>
      <p>
        Approaches to this vary in how well they hold up. Putting everything in a system prompt does not scale, since
        context is finite and a growing prompt dilutes the task. Summarizing conversations loses specifics and
        compounds errors. Retrieval over past transcripts finds what was said and not what was concluded.
      </p>
      <p>
        MagAgent&apos;s answer is a persistent knowledge graph. Facts, decisions, and observations become nodes with
        relationships to each other, stored as Markdown in a repository, versioned by Git. Retrieval pulls a relevant
        subgraph rather than a similarity-ranked list of text fragments, which is a meaningfully different operation:
        it returns connected context rather than isolated snippets.
      </p>
      <p>
        The design also treats promotion into memory as an explicit act rather than a default. This matters more than
        it sounds. Memory that accumulates automatically fills with noise, and noise degrades every future recall.
        Memory that accumulates deliberately, with a reason attached, stays useful as it grows. The harness layer
        makes this argument generally; MagAgent is an implementation of it.
      </p>

      <h2 id="mag-ecosystem">The Mag ecosystem</h2>
      <p>
        MagAgent is one of three related projects, and the separation is architecturally deliberate.
      </p>
      <ul>
        <li>
          <b>MagGraph</b> is the memory layer: a Rust-backed graph store where knowledge lives as Markdown nodes and
          edges emerge from wiki-style links. It has its own Python API and a generated MCP server, so it is usable
          by agents other than MagAgent.
        </li>
        <li>
          <b>MagAgent</b> is the harness: the agent loop, tools, providers, and the terminal experience.
        </li>
        <li>
          <b>Mag Command Center</b> is a cross-platform desktop application for projects, chat, configuration,
          memory, and plugins.
        </li>
      </ul>
      <p>
        The separation matters because it keeps memory from being trapped inside a harness. MagGraph is usable on its
        own, and because it exposes an MCP server, another agent can read the same memory. That is the layering this
        reference argues for: the durable artifact lives in a component that outlives the runtime using it.
      </p>
      <p>
        Storing memory as Markdown in Git is a related choice with the same character. It means memory is
        human-readable, diffable, reviewable, and portable. A memory store you can open in a text editor and correct
        is a different kind of dependency from one that lives in a proprietary database.
      </p>

      <h2 id="profiles">Agents defined as profiles</h2>
      <p>
        MagAgent implements the Open Agent Profile specification, storing agent definitions as files in the project
        or user directory rather than as internal configuration.
      </p>
      <p>
        A profile describes a named agent: its role and instructions, the model or capability tier it should use, the
        tools it may reach, its permissions, and what previous sessions learned. Profiles support inheritance, so a
        specialized agent can derive from a general one and narrow its capabilities, and narrowing is the direction
        the design permits.
      </p>
      <p>
        Three consequences follow, and they are the reasons the standards layer argues for portable definitions.
      </p>
      <p>
        <b>Review.</b> A profile is a file. It can be read by someone who does not write Python, diffed when it
        changes, and required to pass review before use. Authority expressed this way is auditable in a way that
        authority scattered through code is not.
      </p>
      <p>
        <b>Sharing.</b> A useful agent is a file another person can copy. The reviewer that knows your conventions
        moves between machines and between people.
      </p>
      <p>
        <b>Portability.</b> Because the format is a published specification rather than a product convention, another
        conformant harness can read the same profile. That is what makes running two harnesses a configuration
        detail rather than a duplication problem.
      </p>

      <h2 id="tools-and-lsp">Tools, language servers, and MCP</h2>
      <p>
        MagAgent provides a broad built-in tool surface covering files, shell execution, web search, HTTP, databases,
        and document generation, and extends it in two directions that are worth separating.
      </p>
      <p>
        <b>Language servers.</b> It runs real language server clients for several languages, which gives the agent
        actual symbol knowledge: definitions, references, diagnostics, hover information, and rename. This replaces
        inference over text with lookup against a parsed project, and it is the same argument made in the OpenCode
        article: a specific tool that answers the question directly beats a general tool the model must reason
        through.
      </p>
      <p>
        <b>MCP.</b> It connects to Model Context Protocol servers over both stdio and streamable HTTP, with catalogs
        of tools, prompts, and resources that invalidate when servers change. This is the connection standard doing
        its job: integrations written once as servers are reachable from this harness without harness-specific work.
      </p>
      <p>
        The combination is the shape an open harness should have. Deep native integration where the harness is the
        natural place for it, and a protocol boundary for everything else, so that the tool ecosystem is not
        something the harness has to own.
      </p>

      <h2 id="skills-and-plugins">Skills, recipes, and plugins</h2>
      <p>
        Capability arrives in MagAgent through several mechanisms that are worth distinguishing, since they solve
        different problems.
      </p>
      <p>
        <b>Skills</b> are portable folders of instructions loaded when relevant, following the Agent Skills format.
        This is knowledge: how to do a thing, written in prose, reviewable by whoever owns the process.
      </p>
      <p>
        <b>Recipes</b> are saved reusable workflows for repeated operations such as release preparation, bug triage,
        documentation audits, dependency upgrades, and test repair. This is procedure with parameters, closer to a
        script than to knowledge.
      </p>
      <p>
        <b>Plugins</b> are local extension packs bundling agents, recipes, skills, tools, and MCP configuration, with
        importers that normalize assets from several other agent ecosystems into MagAgent-native form.
      </p>
      <p>
        That last capability is worth dwelling on. Importing skills and configuration from other harnesses treats the
        broader ecosystem as a source rather than as competition, which is the practical expression of the
        interoperability argument. A team&apos;s existing procedures do not have to be rewritten to be usable here.
      </p>

      <h2 id="graphs">Agentic graphs for planned work</h2>
      <p>
        MagAgent supports the Agentic Graph Specification, which lets a multi-step piece of work be described as a
        document before it runs: nodes with briefs, typed inputs and outputs, success conditions, capability tiers,
        required tools and permissions, and human approval gates.
      </p>
      <p>
        The value is that the plan becomes reviewable before tokens are spent on it. An ordinary agent decomposes
        work internally, and by the time you see the decomposition the work is done. A graph is written first,
        inspected, and then executed, which changes when review happens from after to before.
      </p>
      <p>
        This is not the right shape for every task. Conversational and exploratory work has no useful structure to
        write down. Processes with branches, approval points, and consequences do, and those are exactly the ones
        where an unreviewed plan is expensive.
      </p>

      <h2 id="sandboxes">Sandboxes and boundaries</h2>
      <p>
        MagAgent can run saved plans and recipes inside sandboxes: a Git worktree, a copied workspace, or a Docker
        container. Each is a different point on the isolation and convenience curve.
      </p>
      <p>
        A worktree isolates changes from your working directory while sharing the repository, which suits parallel
        agent work on one project. A copied workspace isolates further at the cost of disk and setup time. A
        container isolates the process itself, which is the option that bounds what a shell command can reach.
      </p>
      <p>
        Alongside sandboxes, profiles carry permissions and capability scoping, so an agent&apos;s tool surface can be
        narrowed per profile rather than being global. The harness layer&apos;s test applies: if the model behaved
        adversarially, what could it actually do? With a narrow profile inside a container, the answer is bounded by
        construction rather than by instruction.
      </p>

      <h2 id="background">Background work and the daemon</h2>
      <p>
        MagAgent includes a daemon that queues background work: asks, recipes, plans, shell tasks, follow-ups, and
        tasks arriving through a gateway. This is a structural feature rather than a convenience, and it is worth
        separating from the interactive loop.
      </p>
      <p>
        An agent that only runs while someone watches is limited to answering. An agent with a queue can accept work
        now and finish it later, retry something that failed, act on a schedule, and pick up a thread from a
        previous session. The difference is between a tool you use and a process that runs.
      </p>
      <p>
        Background execution also changes what needs to be true about the system. Interactive work has a person
        present to notice a wrong turn. Background work does not, which raises the importance of three things the
        harness layer treats as mandatory: bounded steps and spend, durable state that survives a restart, and a
        record complete enough to reconstruct what happened while nobody was looking.
      </p>
      <p>
        The same reasoning applies to remote gateways. An agent reachable from a chat platform is convenient and it
        widens the set of people who can trigger it, which makes the authority question sharper. Who may send it
        work, under whose permissions does that work run, and what requires approval are questions with obvious
        answers in a terminal and non-obvious answers over a gateway.
      </p>

      <h2 id="evals">Evaluation as a built-in concern</h2>
      <p>
        MagAgent includes isolated evaluation suites with independent validators, timing and token metrics, and
        reproducible offline and live-provider reports, plus separate evaluations for memory quality covering
        precision, stale or contradictory recall, provenance, and token budgets.
      </p>
      <p>
        Building evaluation into a harness rather than leaving it to users is a stance worth noticing, because the
        models layer argues that a private evaluation set is the only reliable way to make model decisions. Most
        teams agree with that and do not build one, because it is separate work that competes with features.
        Shipping the harness with the machinery removes most of that friction.
      </p>
      <p>
        The memory evaluations are the more unusual part. Memory systems fail in ways that are hard to notice:
        recall returns something plausible but stale, or two contradictory facts both surface, or the retrieved
        subgraph is large enough to crowd out the actual task. None of these produce an error. They produce
        gradually worse answers, which teams attribute to the model.
      </p>
      <p>
        Measuring precision, staleness, contradiction, and token cost of recall turns those silent failures into
        numbers. That is the same instinct as the harness layer&apos;s advice to read traces weekly, expressed as
        tooling rather than as a habit, and it addresses the specific risk that a memory-first design creates for
        itself.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        MagAgent sits in the execution layer and is notable for how much of its state and definition it pushes into
        layers that outlive it.
      </p>
      <p>
        Its memory lives in MagGraph, which is a separate component with its own interface. Its agents are OAP
        profiles, which are a published specification. Its planned work is AGS graphs, which is another. Its tool
        connections go through MCP. Its capability packages are Agent Skills.
      </p>
      <p>
        The result is a harness where the durable artifacts, meaning memory, agent definitions, plans, and
        capability, are all expressed in forms that do not belong to it. That is the architectural property this
        reference cares about most, and it is uncommon: most harnesses keep at least one of those five inside
        themselves.
      </p>

      <h2 id="when-to-choose">When it fits</h2>
      <ul>
        <li><b>Long-running relationships with a codebase.</b> Where the value comes from an agent that accumulates understanding rather than starting fresh.</li>
        <li><b>Python environments.</b> Where the harness being Python makes extension and embedding natural.</li>
        <li><b>Teams that want definitions in files.</b> Profiles, skills, and graphs under version control, reviewed like code.</li>
        <li><b>Work that mixes coding and other tasks.</b> The tool surface extends beyond code into documents, databases, and web access.</li>
        <li><b>Situations needing reviewable plans.</b> Where an approval gate before execution is a requirement rather than a nicety.</li>
      </ul>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Memory needs curation.</b> A graph that accumulates everything degrades recall. Explicit promotion is the mechanism, and someone has to use it.</li>
        <li><b>Memory is a data store.</b> Whatever an agent learns about a project is written down, including anything sensitive it encountered. Treat the memory repository with the same care as the code.</li>
        <li><b>Pre-1.0 surfaces move.</b> The project is approaching 1.0 and some integration surfaces are still stabilizing. Check the roadmap for what is settled.</li>
        <li><b>Shell access is the boundary question.</b> As with any capable harness, running commands means the agent can do what the user can, unless sandboxed.</li>
        <li><b>Breadth has a cost.</b> A large tool surface means tool selection quality matters. Scoping tools per profile is the mitigation, and it has to be used.</li>
        <li><b>Language servers need working project setup.</b> The symbol tooling is only as good as the project configuration underneath it.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Apache 2.0, with agent definitions, skills, plans, and tool connections all in portable formats.</li>
        <li><b>Inspectable.</b> Strong. Open source, and memory is human-readable Markdown rather than an opaque store.</li>
        <li><b>Portable.</b> Strong. Profiles, skills, and graphs move; memory moves as a Git repository.</li>
        <li><b>Bounded.</b> Good. Profile permissions, capability scoping, and sandboxes provide enforcement outside the model.</li>
        <li><b>Grounded.</b> Good. Language servers, databases, and memory supply facts rather than relying on recall.</li>
        <li><b>Auditable.</b> Good. Git history over memory and profiles gives a durable record of what changed and when.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        MagAgent is not a broker. It runs agents. Deciding which of several harnesses installed on a machine should
        handle a request is a different job, which is what Merced AI does.
      </p>
      <p>
        MagAgent is not a model provider. It works against several providers and supplies none of them.
      </p>
      <p>
        MagAgent is not a hosted service. It runs on your machine, which means the operational responsibilities and
        the privacy properties are both yours.
      </p>
    </>
  );
}
