import type { Article } from './types';

export const article: Article = {
  slug: 'pi',
  title: 'Pi',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / MINIMAL HARNESS',
  summary: 'A compact agent toolkit and coding harness built to be adapted rather than configured, with a deliberately small core you can read.',
  standfirst: 'Pi is a set of packages covering a multi-provider model interface, an agent loop, a terminal UI, and a coding agent built on them. Its distinguishing property is size: the core is small enough to read, which makes it a different kind of dependency from a large framework.',
  keywords: ['Pi agent', 'pi-mono', 'minimal agent harness', 'agent loop', 'terminal UI', 'MIT license', 'agent toolkit'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'small-core', label: 'The case for a small core' },
    { id: 'packages', label: 'What the packages cover' },
    { id: 'adapt-not-configure', label: 'Adapt rather than configure' },
    { id: 'no-permission-system', label: 'No built-in permission system' },
    { id: 'containment', label: 'Containment patterns' },
    { id: 'building-on-it', label: 'What you build on top' },
    { id: 'supply-chain', label: 'Supply chain as a stated concern' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'when-to-choose', label: 'When a minimal harness is right' },
    { id: 'sessions', label: 'Sharing sessions as training data' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Pi on GitHub', href: 'https://github.com/earendil-works/pi', note: 'Source, packages, and documentation. The core is small enough that reading it is a realistic way to understand it.' },
    { label: 'Pi skills documentation', href: 'https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/skills.md', note: 'How the coding agent loads Agent Skills.' },
    { label: 'Agent Skills', href: 'https://agentskills.io', note: 'The portable capability format Pi and other harnesses support.' },
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'The connection standard most harnesses use to reach tools without hard-coding integrations.' },
  ],
  related: ['harnesses-and-brokers', 'opencode', 'agent-skills'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Pi is an agent toolkit distributed as a set of packages: a unified interface across model providers, an agent
        runtime handling tool execution and state, a terminal UI library, and a coding agent command line built on
        top of them. It is MIT licensed.
      </p>
      <p>
        It is included in this reference as the minimal end of the harness spectrum. Where a large framework tries to
        cover every case through configuration, Pi is organized around being small enough to understand and adapt.
        The project&apos;s own framing is that you adapt it to your workflows rather than the other way around.
      </p>

      <h2 id="small-core">The case for a small core</h2>
      <p>
        Size is a real architectural property of a dependency, and it is worth thinking about explicitly rather than
        treating small as merely aesthetic.
      </p>
      <p>
        A large framework encodes many decisions. Most of them are reasonable, and you inherit all of them. When one
        does not suit your case, you either configure around it, work against it, or fork. The cost is not visible at
        adoption and shows up the first time your requirement is outside what the framework anticipated.
      </p>
      <p>
        A small core encodes fewer decisions. You write more yourself, which is more initial work, and when something
        does not fit you change it, because you can read the whole thing. The cost is visible immediately and the
        ceiling is higher.
      </p>
      <p>
        Neither is correct in general. What makes the choice tractable is knowing which situation you are in. Teams
        building something conventional benefit from a framework that already made the decisions. Teams whose
        requirements are unusual, or who expect to need behavior the framework does not anticipate, are better served
        by something they can modify without a fight.
      </p>
      <div className="kb-callout">
        <b>A test that clarifies the choice</b>
        <p>
          Could one engineer read the harness end to end in a day and explain what happens on a tool call? If yes,
          you have a component you can debug and change. If no, you have a dependency whose behavior you will
          investigate by experiment.
        </p>
      </div>

      <h2 id="packages">What the packages cover</h2>
      <p>
        The separation into packages is itself instructive, because it maps closely onto the responsibilities the
        harness layer describes.
      </p>
      <ul>
        <li>
          <b>A unified provider interface.</b> One request shape across several model providers. This is the routing
          abstraction the models layer argues for, present as a library rather than a service.
        </li>
        <li>
          <b>An agent runtime.</b> The loop itself: sending context, receiving proposed tool calls, executing them,
          appending results, and deciding whether to continue. This is the heart of any harness and is usually the
          part hidden inside a framework.
        </li>
        <li>
          <b>A terminal UI library.</b> Rendering an interactive session in a terminal, which is harder than it
          sounds when output streams and state changes concurrently.
        </li>
        <li>
          <b>A coding agent.</b> A command line application built on the above, with the tools a coding workflow
          needs.
        </li>
      </ul>
      <p>
        The useful property of this split is that the pieces are usable independently. A team building a
        domain-specific agent can take the provider interface and the runtime without inheriting a coding agent&apos;s
        assumptions. That is a different proposition from a monolithic framework where the agent loop is only
        reachable through the product built on it.
      </p>

      <h2 id="adapt-not-configure">Adapt rather than configure</h2>
      <p>
        The distinction between adapting and configuring is the philosophical centre of this design, and it has
        practical consequences.
      </p>
      <p>
        Configuration is bounded by what the author anticipated. It is safe, upgradeable, and constrained. When your
        requirement falls inside the anticipated space, configuration is clearly better: less code, less
        maintenance, and improvements arrive with upgrades.
      </p>
      <p>
        Adaptation means changing the code. It is unbounded, and it makes upgrades your problem. When your
        requirement falls outside the anticipated space, adaptation is the only option that works, and a codebase
        designed to be adapted makes it a modest change rather than a fork.
      </p>
      <p>
        Agentic systems fall outside anticipated spaces more often than most software, because the patterns are
        still being discovered. A harness you can modify is therefore worth more in this domain than it would be in a
        mature one. That advantage narrows as conventions settle, which is a reasonable prediction rather than a
        criticism.
      </p>

      <h2 id="no-permission-system">No built-in permission system</h2>
      <p>
        Pi&apos;s documentation is explicit that it does not include a built-in permission system, and recommends
        containerization for stronger security boundaries. That honesty is more useful than it first appears, and it
        deserves engagement rather than a note.
      </p>
      <p>
        The harness layer argues that authority must be enforced outside the model, in the code that executes tool
        calls. A harness with no permission system has not solved that problem; it has stated that it is your
        problem and pointed at where to solve it.
      </p>
      <p>
        Compare that with the alternative failure mode, which is far more common: a harness that appears to have
        permissions because it asks the model to respect limits described in a prompt. That arrangement provides the
        feeling of a boundary without the boundary, and it fails exactly when it matters, under unusual input or
        prompt injection.
      </p>
      <p>
        Between a tool that says it has no permission system and one that implements permissions as instructions to
        the model, the first is the safer starting point, because it does not invite you to trust something that does
        not hold. The obligation it creates is real: if you deploy it with meaningful capability, you must supply the
        boundary yourself.
      </p>

      <h2 id="containment">Containment patterns</h2>
      <p>
        Since the boundary is yours to supply, it is worth being concrete about the options, which apply to any
        harness lacking built-in authority controls.
      </p>
      <h3>Containers</h3>
      <p>
        Running the agent in a container with a mounted workspace and restricted network is the most common approach.
        The agent can do what it likes inside, and the blast radius is the container. This is straightforward,
        well-understood, and adequate for most development use.
      </p>
      <h3>Dedicated sandboxes</h3>
      <p>
        Purpose-built sandboxing gives finer control over filesystem and network access than a container alone,
        which matters when the agent needs some network access but not all of it.
      </p>
      <h3>Credential scoping</h3>
      <p>
        Independent of process isolation, the credentials the agent operates with determine what it can reach. An
        agent with a token that can only read one repository cannot damage another, regardless of what it decides to
        attempt. This is often the highest-value control and the least implemented.
      </p>
      <h3>Tool-level constraints</h3>
      <p>
        Restricting what each tool accepts is enforcement at the point of action: this file tool writes only under
        this directory, this shell tool runs only these commands. More work than a container, and much more precise.
      </p>
      <p>
        These compose. A container bounds the damage, scoped credentials bound the reach, and tool constraints bound
        the actions. A deployment with all three has defense that does not depend on the model behaving well.
      </p>

      <h2 id="building-on-it">What you build on top</h2>
      <p>
        Choosing a minimal harness means accepting a list of things you will implement. The list is predictable, and
        seeing it in advance is the difference between an informed choice and a surprise in month three.
      </p>
      <h3>Limits</h3>
      <p>
        Maximum steps per task, maximum wall-clock time, maximum spend, and detection of repeated identical failures.
        These are short to write and they are the difference between a confused agent that stops and one that runs
        until something external intervenes. Write them before the second tool exists.
      </p>
      <h3>Recording</h3>
      <p>
        A durable trace of each run: the context sent at each step, every tool call with arguments, every result
        including errors, the model and version, and why the loop ended. This cannot be added retroactively, and
        every debugging session afterwards depends on it.
      </p>
      <h3>Tool result handling</h3>
      <p>
        Size limits on what a tool may return, truncation that preserves the useful part, and errors phrased so the
        model can act on them. A tool returning a large file will otherwise fill the context and evict the task.
      </p>
      <h3>Approval flow</h3>
      <p>
        A mechanism for pausing before a class of action and presenting the proposed action clearly enough to judge.
        Without one, the only options are fully automatic or fully manual, and teams choose manual, which means the
        system goes unused.
      </p>
      <h3>State durability</h3>
      <p>
        For anything longer than a single interaction, task state that survives a restart. In-process state is fine
        for a chat loop and inadequate for work that takes twenty minutes.
      </p>
      <p>
        None of this is difficult individually. Collectively it is a few weeks of engineering, and it is the work
        that separates a demonstration from something you would run against real systems. A framework that includes
        it has done that work for you, on its own terms. That is the actual trade.
      </p>

      <h2 id="supply-chain">Supply chain as a stated concern</h2>
      <p>
        Pi&apos;s documentation emphasizes pinned dependencies and lockfile verification, which is worth noting
        because supply chain is an underdiscussed risk in this category of software.
      </p>
      <p>
        An agent harness is unusually attractive as a target. It holds model provider credentials, it typically has
        filesystem access, it frequently has shell access, and it runs on developer machines with access to source
        code and other credentials. A compromised dependency in this position is close to the worst case.
      </p>
      <p>
        The corresponding practices are ordinary and worth stating: pin versions rather than accepting ranges, verify
        lockfiles, review what new dependencies actually do, and be conservative about adding them. A small core
        helps here too, since fewer dependencies means fewer things to trust.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        In the four-layer model Pi occupies the execution layer, and it is a useful reference point for two reasons
        beyond its own merits.
      </p>
      <p>
        First, it demonstrates that the harness layer is not necessarily large. The core loop described in the
        harness article is genuinely a small amount of code, and seeing an implementation of it removes a lot of
        mystique about what agent frameworks do.
      </p>
      <p>
        Second, it illustrates that the layers are separable in practice. Pi&apos;s provider interface is the models
        layer. Its runtime is the execution layer. Its skills support is the standards layer. The packages are
        divided along roughly the same lines this reference uses, which is some evidence that the division reflects
        real seams rather than a convenient diagram.
      </p>

      <h2 id="when-to-choose">When a minimal harness is right</h2>
      <ul>
        <li><b>Unusual requirements.</b> When your workflow does not resemble the ones frameworks were built for.</li>
        <li><b>Understanding matters.</b> When being able to explain exactly what the system does is a requirement, whether for debugging, review, or compliance.</li>
        <li><b>Embedding into a product.</b> When the agent is a component of something larger rather than the application itself.</li>
        <li><b>Learning.</b> Reading a small harness end to end teaches more about agentic systems than any amount of documentation about a large one.</li>
        <li><b>Dependency conservatism.</b> When a smaller surface area is itself the requirement.</li>
      </ul>
      <p>
        Conversely, a team that wants an agent working this week, whose requirements are conventional, and that has
        no appetite for building permission handling will get further faster with something more complete. That is
        not a failure of the minimal approach; it is a different situation.
      </p>

      <h2 id="sessions">Sharing sessions as training data</h2>
      <p>
        The Pi project encourages contributors to share open-source coding sessions, on the reasoning that real task
        data improves agent development in ways synthetic benchmarks do not. The idea is worth engaging with, because
        it points at a genuine gap.
      </p>
      <p>
        Benchmarks for agentic systems are difficult to build well. They tend to measure isolated tasks with clear
        success criteria, while real agentic work is messy: underspecified requests, tasks that change halfway
        through, environments with unrelated broken things, and success conditions that are partly a matter of
        judgment. A benchmark that captures that is hard to construct and quickly becomes contaminated once it is
        public.
      </p>
      <p>
        Real session traces contain what benchmarks miss. They show where agents get stuck, which tool errors are
        confusing, how often a wrong turn is recoverable, and what human intervention was actually needed. That is
        exactly the material that improves harness design rather than model scores, and harness design is where a
        large share of the quality difference lives.
      </p>
      <p>
        The obvious caution applies. A session trace contains everything the agent read: source code, file paths,
        error messages, sometimes credentials that appeared in output. Sharing traces from work on public
        repositories is straightforward. Sharing traces from private work is a data disclosure decision, and the
        review has to be real rather than assumed, because the interesting failures are precisely the ones where
        unexpected content ended up in the context.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>You own the boundary.</b> The most important one. Deploying with real capability and no containment is the mistake this design makes possible.</li>
        <li><b>You own the operational parts.</b> Retries, rate limit handling, cost caps, and observability are yours to build unless the packages cover them.</li>
        <li><b>Adaptation makes upgrades harder.</b> Local changes have to be reconciled with upstream. Keeping modifications minimal and well-separated is worth the discipline.</li>
        <li><b>Small does not mean simple to operate.</b> A small core still needs monitoring, cost control, and someone responsible for it in production.</li>
        <li><b>Provider differences surface directly.</b> A thin abstraction passes more provider variation through than a thick one, which is honest and occasionally inconvenient.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. MIT licensed, small, and separable into packages you can use independently.</li>
        <li><b>Inspectable.</b> Very strong. This is the property the design optimizes for, and the one hardest to obtain elsewhere.</li>
        <li><b>Portable.</b> Good where capability is expressed as skills and tool connections rather than as code.</li>
        <li><b>Bounded.</b> Delegated by design. Strong if you supply containment, absent if you do not.</li>
        <li><b>Grounded.</b> Depends on the tools you give it. The harness does not decide this.</li>
        <li><b>Auditable.</b> Achievable and yours to build. Nothing prevents thorough recording, and nothing provides it automatically.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Pi is not a managed platform. There is no hosted service, no dashboard, and no support relationship. It is
        code you run.
      </p>
      <p>
        Pi is not a governance solution. It provides an agent loop. Policy, approval, and enforcement are yours to
        add, which the project says plainly.
      </p>
      <p>
        Pi is not a broker. It runs one agent. Deciding which of several agents or harnesses should handle a piece of
        work is a separate concern handled by a separate component.
      </p>
    </>
  );
}
