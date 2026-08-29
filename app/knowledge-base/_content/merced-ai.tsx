import type { Article } from './types';

export const article: Article = {
  slug: 'merced-ai',
  title: 'Merced AI',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / BROKER',
  summary: 'A local-first broker that discovers the agent harnesses already installed on a machine and runs portable agent profiles across them.',
  standfirst: 'Merced AI is deliberately not another agent loop. It finds the harnesses you already have, normalizes their non-interactive interfaces, and uses portable profiles to create bots that can run on whichever harness is available. The selected harness still owns execution.',
  keywords: ['Merced AI', 'agent broker', 'harness discovery', 'Open Agent Profile', 'portable bots', 'agent orchestration', 'multi-harness'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'broker-not-harness', label: 'Broker, not harness' },
    { id: 'the-problem', label: 'The problem it solves' },
    { id: 'discovery', label: 'Harness discovery' },
    { id: 'profiles-and-bots', label: 'Profiles and bots' },
    { id: 'projection', label: 'Honest projection reports' },
    { id: 'graphs', label: 'Read-only graph planning' },
    { id: 'telemetry', label: 'Normalized run telemetry' },
    { id: 'sessions', label: 'Sessions and multi-bot conversations' },
    { id: 'workflow', label: 'What using it looks like' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'when-to-choose', label: 'When a broker earns its place' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Merced AI on GitHub', href: 'https://github.com/AlexMercedCoder/merced-ai', note: 'Source, installation guide, and the harness compatibility documentation.' },
    { label: 'merced-ai on PyPI', href: 'https://pypi.org/project/merced-ai/', note: 'Installation and release history.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'The profile specification that makes a bot portable between harnesses.' },
    { label: 'Agentic Graph Specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'The plan format Merced AI validates and plans against without executing.' },
  ],
  related: ['harnesses-and-brokers', 'open-agent-profile', 'loro'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Merced AI is a local-first broker for agent harnesses already installed on a machine. It discovers them,
        normalizes their non-interactive interfaces, and uses Open Agent Profile documents to create portable bots
        that can be run against whichever harness is available.
      </p>
      <p>
        The project is explicit that it is not another agent loop. The selected harness still owns model access,
        tools, authentication, sandboxing, approvals, and final policy enforcement. Merced AI decides where work
        goes and hands it over.
      </p>
      <p>
        That restraint is the interesting part. Most projects in this space grow into harnesses, because a harness is
        where the visible capability lives. Staying on the routing side of the line is a deliberate architectural
        position, and it is the position that makes the tool composable rather than competitive with the things it
        routes to.
      </p>

      <h2 id="broker-not-harness">Broker, not harness</h2>
      <p>
        The distinction the harness layer article draws applies here with unusual clarity, so it is worth restating
        against a concrete case.
      </p>
      <p>
        A harness owns the agent loop. It assembles context, calls a model, executes tools, holds state, enforces
        limits, and produces a result. If something goes wrong mid-task, the harness is where it went wrong.
      </p>
      <p>
        A broker decides which harness receives a piece of work, under what identity, with what definition, and
        collects the result. If something goes wrong at this level, work went to the wrong place or was described
        badly on the way there.
      </p>
      <p>
        Keeping these separate has a practical consequence that shows up immediately in a system with more than one
        harness: policy about who may do what, and definitions of what an agent is, live in one place rather than
        being duplicated per harness. The harnesses stay interchangeable because nothing important is stored in
        them.
      </p>
      <div className="kb-callout">
        <b>Why the restraint matters</b>
        <p>
          A broker that grows an agent loop becomes a harness competing with the harnesses it brokers. At that point
          it has an incentive to route work to itself, and the abstraction stops being neutral. Declining to run
          agents is what keeps the routing decision honest.
        </p>
      </div>

      <h2 id="the-problem">The problem it solves</h2>
      <p>
        The situation Merced AI addresses is one most developers arrive at without deciding to. Several agent
        command line tools end up installed on one machine: one that came with an editor, one adopted for coding,
        one a colleague recommended, one built in-house.
      </p>
      <p>
        Each has its own configuration format, its own idea of what an agent is, its own way of being invoked
        non-interactively, and its own place to store definitions. A useful agent defined in one is not available in
        another. Switching tools means redefining everything. Using two means maintaining two copies that drift.
      </p>
      <p>
        The usual responses are to standardize on one tool, which is often impractical and always temporary, or to
        accept duplication, which degrades quietly. A broker offers a third option: define the agent once in a
        portable format, and let the broker map it onto whichever harness is present.
      </p>
      <p>
        This is the same argument the standards layer makes, applied at the level of a single developer&apos;s
        machine rather than an organization&apos;s architecture. The definitions are yours; the runtimes are
        interchangeable.
      </p>

      <h2 id="discovery">Harness discovery</h2>
      <p>
        Merced AI performs safe executable and version discovery across a substantial list of harnesses, spanning
        widely used commercial coding agents, open source agents, and the projects in this reference.
      </p>
      <p>
        Discovery is a smaller-sounding feature than it is. To route work to a harness, a broker must know it exists,
        know which version is installed because interfaces change between versions, know how to invoke it
        non-interactively, and know what it supports. That last point is where most of the difficulty lives: harness
        capabilities differ substantially, and a broker that assumes uniformity produces confident failures.
      </p>
      <p>
        Doing discovery safely also matters. Determining a version usually means running the executable, which is a
        subprocess execution triggered by a scan. Bounded execution without a shell, with timeouts and explicit
        overrides for path resolution, is the difference between a discovery scan and an unintended execution
        surface.
      </p>

      <h2 id="profiles-and-bots">Profiles and bots</h2>
      <p>
        The unit Merced AI works with is a bot: an Open Agent Profile bound to a preferred harness with an optional
        fallback.
      </p>
      <p>
        The profile carries the definition. Its role and instructions, the model or capability tier it should use,
        the tools it may reach, its permissions, and the state previous sessions accumulated. Because that is a
        published specification rather than a product format, the same file is readable by harnesses that implement
        it directly.
      </p>
      <p>
        The binding carries the routing. Which harness should normally run this bot, and what to fall back to when
        the preferred one is unavailable. Bindings can be project-local or user-global, which matches how people
        actually work: a project may need a particular harness while a personal assistant should run on whatever is
        present.
      </p>
      <p>
        The separation is the point. A bot is a definition plus a routing preference, and the two can change
        independently. Moving a bot to a different harness is editing a binding rather than recreating an agent.
      </p>

      <h2 id="projection">Honest projection reports</h2>
      <p>
        The feature most worth studying in Merced AI is its handling of capability mismatch. When a profile is
        projected onto a harness, the result is reported as native, projected, degraded, or unsupported.
      </p>
      <p>
        This addresses the central difficulty of brokering across heterogeneous runtimes. Harnesses do not support
        the same things. One enforces a tool allowlist natively; another has no permission system. One supports
        skills; another does not. One accepts a model tier; another needs a specific model name.
      </p>
      <p>
        There are three ways a broker can handle that, and only one of them is safe.
      </p>
      <p>
        It can pretend uniformity, silently dropping unsupported parts. This is the worst outcome: a profile that
        declares a tool denylist runs on a harness that ignores it, and the user believes a boundary exists that does
        not.
      </p>
      <p>
        It can refuse anything not fully supported, which is safe and reduces the broker to the intersection of every
        harness, which is close to nothing.
      </p>
      <p>
        It can project and report honestly, which is what a four-state report does. This capability is native here.
        This one is approximated. This one is degraded and here is how. This one is not available at all. The user
        then decides whether the projection is acceptable for this work.
      </p>
      <p>
        Reporting degradation rather than hiding it is a design principle worth generalizing well beyond this tool.
        Any abstraction over heterogeneous backends faces the same choice, and silent degradation is where trust in
        abstractions goes to die.
      </p>

      <h2 id="graphs">Read-only graph planning</h2>
      <p>
        Merced AI validates Agentic Graph documents and produces deterministic plans: digests, dependency order,
        reachability, worst-case execution bounds, cost and capability tier summaries, and an explicit list of
        features it cannot support.
      </p>
      <p>
        It does not execute them. That is consistent with the broker position, and the read-only planning is useful
        on its own.
      </p>
      <p>
        A plan produced before execution answers questions that are expensive to answer afterwards. What order will
        these steps run in. Which steps are unreachable given the entry points. What is the worst case if every
        retry path is taken. Roughly what will this cost, and how much of it needs a strong model. Which parts of
        this document does the current environment not support.
      </p>
      <p>
        The last question is the broker-specific one and it is valuable. A graph written against a rich harness may
        use features a simpler one lacks. Knowing that before running is the difference between a planned adjustment
        and a failure at step nine.
      </p>

      <h2 id="telemetry">Normalized run telemetry</h2>
      <p>
        Later releases added durable, normalized run telemetry with recent-run inspection, elapsed time, partial
        failure summaries, and copyable handoffs to the active harness, alongside a bounded workspace context picker
        that produces an explicit delivery manifest.
      </p>
      <p>
        Normalization is the architecturally interesting word. Every harness reports its work differently, so a
        broker that passes those reports straight through leaves you with several incompatible logs and no way to
        ask what a run cost or how it ended across executors. Normalizing them at the routing layer is the only
        place that question can be answered once.
      </p>
      <p>
        Partial failure is the state worth designing for explicitly. A run that half-succeeded is what brokers
        handle worst: the harness reports completion, and the caller cannot tell that a step inside failed.
        Surfacing it as its own state rather than folding it into success or failure is a small correctness
        improvement that shows up constantly once real work flows through.
      </p>
      <p>
        The delivery manifest follows from the broker position. Because the broker executes nothing, the only
        honest account it can give is a precise description of what it handed over. That is the same instinct as the
        projection report, applied to context rather than to capability.
      </p>

      <h2 id="sessions">Sessions and multi-bot conversations</h2>
      <p>
        Merced AI supports one-shot runs, multi-turn local chat, attributed multi-bot group conversations, and
        durable project-local sessions with resume.
      </p>
      <p>
        The multi-bot conversation is the distinctive one. Several bots, potentially running on different harnesses,
        participate in one conversation with their contributions attributed. This is a different arrangement from
        the usual multi-agent pattern, where a coordinator decomposes work and dispatches to subordinates.
      </p>
      <p>
        The advantage is transparency. A person can see which bot said what, and the bots have different definitions
        with different permissions rather than being personas of one system. That maps onto a real situation: an
        engineer, a reviewer with narrower permissions, and a documentation specialist are genuinely different
        agents, and pretending they are one agent with three hats loses the distinction that made the arrangement
        useful.
      </p>
      <p>
        Durable, atomic session records matter for the ordinary reason. Work that spans more than one sitting needs
        state that survives closing a terminal, and atomicity means an interrupted write does not corrupt the
        session.
      </p>

      <h2 id="workflow">What using it looks like</h2>
      <p>
        The shape of the workflow explains the design better than a feature list does, so it is worth walking
        through.
      </p>
      <ol>
        <li>
          <b>Initialize a workspace and take inventory.</b> The broker scans for installed harnesses and reports what
          it found with versions. This step alone is informative: most people have more agent tooling installed than
          they remember.
        </li>
        <li>
          <b>Create a profile.</b> A named agent with a description and instructions, written as a portable document
          rather than as configuration inside a tool. Keeping the description precise matters, because it is what
          later tells you and any harness what this agent is for.
        </li>
        <li>
          <b>Bind it to a harness with a fallback.</b> The preferred runtime plus what to use when it is not
          available. Deliberately choosing the fallback, rather than letting one be picked, avoids surprises later.
        </li>
        <li>
          <b>Check the projection.</b> Before running anything, see what survives the mapping onto the target
          harness. This is the step that separates informed use from optimistic use.
        </li>
        <li>
          <b>Dry run.</b> Validate the arrangement without model access. Useful for verifying setup, for continuous
          integration, and for confirming that a change to a profile did not break a binding.
        </li>
        <li>
          <b>Run, one-shot or as a session.</b> With durable session records if the work spans more than one
          interaction.
        </li>
      </ol>
      <p>
        Two things are notable about that sequence. The inspection steps come before execution rather than after,
        which is the same instinct behind writing a plan before running it. And every step has machine-readable
        output, which means the whole flow can be scripted, run in continuous integration, or driven by another
        program. A broker whose output is only human-readable would be a convenience; one whose output is structured
        is a component other things can build on.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        Merced AI sits at the top of the execution layer, above harnesses rather than beside them.
      </p>
      <p>
        Its architectural contribution is that it makes the harness a replaceable component in practice rather than
        in principle. The replaceable property is easy to claim and hard to demonstrate, because demonstrating it
        requires actually running the same definition somewhere else. A broker that projects one profile onto
        several harnesses and reports what survives is a working test of that property.
      </p>
      <p>
        It also demonstrates why the standards layer is not optional. A broker is only possible because there is a
        portable format for what an agent is. Without a profile specification, brokering would mean translating
        between every pair of harness configuration formats, which does not scale and does not stay correct.
      </p>

      <h2 id="when-to-choose">When a broker earns its place</h2>
      <ul>
        <li><b>More than one harness in use.</b> The prerequisite. With one harness, a broker is indirection without benefit.</li>
        <li><b>Agents that should outlive tool choices.</b> Where a definition is worth more than the runtime it currently runs on.</li>
        <li><b>Evaluating harnesses.</b> Running the same bot on three harnesses and comparing is far easier than defining it three times.</li>
        <li><b>Teams with heterogeneous machines.</b> Where different people have different tools installed and the agent should work anyway.</li>
        <li><b>Work that spans different capability requirements.</b> Where a governed harness handles some tasks and a fast one handles others.</li>
      </ul>
      <p>
        The counter-case is straightforward: a single developer using one harness gains nothing and adds a
        component. The broker becomes valuable at the point where duplication starts, which is usually the second
        harness rather than the first.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Read the projection report.</b> A degraded projection is a real change in what the agent can do. Skipping the report reintroduces exactly the false confidence the report exists to prevent.</li>
        <li><b>Policy still lives in the harness.</b> The broker routes; the harness enforces. A profile denying a tool is only enforced if the target harness can enforce it.</li>
        <li><b>Harness interfaces change between versions.</b> Discovery tracks versions for a reason. An upgrade can change a non-interactive interface.</li>
        <li><b>Fallback changes behavior.</b> Falling back to a second harness may mean different tools, different permissions, and different quality. Treat it as a deliberate configuration rather than a safety net.</li>
        <li><b>At least one harness must be installed and authenticated.</b> Inventory and dry runs work without model access; real runs do not.</li>
        <li><b>Profile state is data an agent wrote.</b> Accumulated state should be reviewed rather than trusted, particularly when a profile moves between environments.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Very strong, and this is the property it exists to provide. It also makes itself replaceable, since bots are profiles you could run directly.</li>
        <li><b>Inspectable.</b> Strong. Open source, with machine-readable output for inventory, profiles, bots, dry runs, and results.</li>
        <li><b>Portable.</b> Very strong. Portability of agent definitions across runtimes is the core function.</li>
        <li><b>Bounded.</b> Delegated, and honestly reported. The broker bounds subprocess execution and defers authority to the harness, saying so explicitly.</li>
        <li><b>Grounded.</b> Not applicable. Facts come from whatever the harness reaches.</li>
        <li><b>Auditable.</b> Good at its own level. Durable session records and machine-readable results cover routing and outcomes; execution detail belongs to the harness.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Merced AI is not an agent harness, and this is worth stating twice because the category boundary is where
        most confusion about it starts. It does not run an agent loop, execute tools, or hold task state during
        execution.
      </p>
      <p>
        Merced AI is not a policy enforcement point. It can decline to route and cannot make a harness enforce
        something the harness does not implement. That is precisely why the projection report matters.
      </p>
      <p>
        Merced AI is not a hosted service. It is local-first, which means it discovers what is on the machine and
        does not manage remote infrastructure.
      </p>
    </>
  );
}
