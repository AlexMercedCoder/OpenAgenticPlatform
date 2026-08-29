import type { Article } from './types';

export const article: Article = {
  slug: 'prime-agent',
  title: 'Prime Agent',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / LONG-RUNNING AGENT',
  summary: 'An open source coding and research agent for long-running autonomous work, built around a persistent Python environment and a harness state that refines itself over time.',
  standfirst: 'Prime Agent is designed for work that outlasts a conversation. Its tool interface is a persistent Python session rather than a fixed tool list, its sessions survive a disconnected terminal, and it can update its own operating notes based on what it learned.',
  keywords: ['Prime Agent', 'Prime Intellect', 'autonomous agent', 'self-improving agent', 'persistent REPL', 'subagents', 'long-running tasks'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'repl-as-tool', label: 'A REPL instead of a tool list' },
    { id: 'continual-harness', label: 'The continual harness' },
    { id: 'self-improvement', label: 'What self-improving means here' },
    { id: 'daemon', label: 'Daemon sessions and durability' },
    { id: 'subagents', label: 'Subagents and parallel work' },
    { id: 'autonomy', label: 'Autonomous mode and budgets' },
    { id: 'compaction', label: 'Compaction and long contexts' },
    { id: 'skills-as-code', label: 'Skills as executable packages' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'when-to-choose', label: 'When it fits' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Prime Agent on GitHub', href: 'https://github.com/PrimeIntellect-ai/prime-agent', note: 'Source, documentation, and the commands that drive session and harness behavior.' },
    { label: 'Prime Intellect', href: 'https://www.primeintellect.ai', note: 'The organization behind the project, working on decentralized training and reinforcement learning.' },
    { label: 'Agent Skills', href: 'https://agentskills.io', note: 'The portable capability format, useful for comparison with executable-package skills.' },
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'The alternative approach to tool access, worth contrasting with a code-first interface.' },
  ],
  related: ['harnesses-and-brokers', 'pi', 'opencode'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Prime Agent is an open source coding and research agent from Prime Intellect, MIT licensed, designed for
        long-running autonomous work. Its distinguishing features are a persistent Python environment as the primary
        tool interface, a mechanism for accumulating and refining operating notes across sessions, daemon-backed
        sessions that survive terminal disconnection, and built-in subagent spawning.
      </p>
      <p>
        It sits at a different point on the design space from the other harnesses in this reference. Where a coding
        agent optimizes for an interactive edit-and-verify loop, Prime Agent optimizes for tasks that run for a long
        time with limited supervision, which changes almost every design decision downstream.
      </p>

      <h2 id="repl-as-tool">A REPL instead of a tool list</h2>
      <p>
        Most harnesses give a model a fixed set of tools with described arguments. Prime Agent gives it a persistent
        Python session. The agent writes code, the code runs, and state persists between calls.
      </p>
      <p>
        The advantages are real and worth stating clearly.
      </p>
      <p>
        <b>Composition without a new tool.</b> Fetching data, filtering it, joining it with something else, and
        summarizing the result is one piece of code rather than four tool calls with intermediate results passing
        through the context. For data-heavy work this is a substantial reduction in both tokens and steps.
      </p>
      <p>
        <b>State that stays out of the context.</b> A dataframe loaded in the REPL stays in the REPL. A fixed-tool
        agent would have to carry the results through the conversation, or repeatedly re-fetch them.
      </p>
      <p>
        <b>Unbounded reach.</b> Anything with a Python library is available without anyone writing an integration
        first, which for research work is the difference between possible and not.
      </p>
      <p>
        The disadvantages are equally real. A code-execution interface is the broadest possible capability, which
        makes tool-level enforcement close to meaningless: you cannot constrain arguments to a tool that is arbitrary
        code. Containment has to happen at the process boundary instead. Errors are also less legible, since a
        traceback is harder for a model to act on than a purpose-designed error message. And the model must be good
        at writing correct code, which is a higher bar than choosing correctly from a list.
      </p>
      <div className="kb-callout">
        <b>The tradeoff in one line</b>
        <p>
          Fixed tools trade capability for constrainability. A code interface trades constrainability for
          capability. Neither is wrong, and using a code interface without sandboxing is.
        </p>
      </div>

      <h2 id="continual-harness">The continual harness</h2>
      <p>
        Prime Agent maintains what it calls a continual harness: supplemental prompt material and reusable patterns
        that persist across sessions, separate from the core system prompt.
      </p>
      <p>
        The separation is the design insight. A system prompt is authored and controlled by the developer. It should
        be stable, reviewed, and not modified by the agent. Supplemental state is what the agent has learned about
        this environment and this kind of work, and it is expected to change.
      </p>
      <p>
        Keeping them apart means accumulated learning cannot corrupt the foundational instructions. An agent that
        could rewrite its own system prompt has no fixed point, and small drifts compound into behavior nobody
        specified. An agent that can only append to a clearly delimited supplemental section has a bounded form of
        adaptation.
      </p>
      <p>
        This is the same structural argument the Open Agent Profile makes about restricting writeback to a state
        section, arrived at independently. It is a good sign when two projects solving the same problem converge on
        the same boundary.
      </p>

      <h2 id="self-improvement">What self-improving means here</h2>
      <p>
        The phrase self-improving attracts more interpretation than it deserves, so it is worth being precise about
        the actual mechanism.
      </p>
      <p>
        Prime Agent offers a refine command that has the agent review its own trajectory and apply small,
        evidence-backed updates to its supplemental harness state. Every word of that description constrains the
        operation.
      </p>
      <p>
        <b>Review its trajectory.</b> The input is what actually happened in the session, not speculation about what
        might work better.
      </p>
      <p>
        <b>Small updates.</b> Incremental changes rather than rewrites, which keeps any single bad inference from
        having a large effect.
      </p>
      <p>
        <b>Evidence-backed.</b> Grounded in observed outcomes rather than in the model&apos;s opinion of its own
        performance.
      </p>
      <p>
        <b>Supplemental state.</b> Not the core prompt, and not the model weights.
      </p>
      <p>
        What this is not is worth stating too. No training occurs. No weights change. The model does not become more
        capable. What improves is the operating context: notes about this environment, patterns that worked, and
        approaches that did not. That is a real improvement and a bounded one.
      </p>
      <p>
        The practical caution is that self-refinement can encode a mistake as confidently as a lesson. An agent that
        concludes something incorrect from one session will carry that conclusion forward. Treating refined state as
        reviewable, and reviewing it occasionally, is the same discipline that applies to any agent memory.
      </p>

      <h2 id="daemon">Daemon sessions and durability</h2>
      <p>
        Sessions run behind a daemon and persist when the terminal disconnects, with automatic recovery.
      </p>
      <p>
        This is unglamorous infrastructure and it is what makes long-running work practical. An agent working for an
        hour needs to survive a closed laptop lid, a dropped connection, and a network change. Without durability,
        long tasks are limited to the length of an uninterrupted session, which is not a design constraint anyone
        chose.
      </p>
      <p>
        It also enables the operating pattern the tool is built for: start a task, disconnect, reconnect later to see
        progress. That is closer to submitting a job than to having a conversation, and it suits work measured in
        hours rather than minutes.
      </p>
      <p>
        Persistent goals, heartbeats, and schedules extend the same idea. An agent with a goal that outlives a
        session, and a mechanism for waking up, is a process rather than a tool, with all the operational
        consequences the Hermes Agent article describes for always-on operation.
      </p>

      <h2 id="subagents">Subagents and parallel work</h2>
      <p>
        Prime Agent can spawn subagents from within the REPL, and supports direct agent-to-agent communication.
      </p>
      <p>
        Spawning from code rather than through a separate orchestration layer is a notable choice. It means
        parallelism is expressed in the same place as the rest of the work: a loop over five items that each spawn a
        subagent is ordinary code. There is no separate workflow definition to maintain.
      </p>
      <p>
        The harness layer&apos;s cautions about multi-agent designs still apply. Splitting work adds coordination
        cost and loses context at every handoff, so it earns its place when subtasks are genuinely independent, when
        context will not fit in one window, when authority should differ between parts, or when independent
        verification is the point. It does not earn its place because a task has several conceptual phases.
      </p>
      <p>
        Making spawning easy has an additional risk worth naming: an agent that can spawn agents can spawn many, and
        cost scales accordingly. This is exactly why the budget controls below are structural rather than optional.
      </p>

      <h2 id="autonomy">Autonomous mode and budgets</h2>
      <p>
        Prime Agent provides an autonomous mode with configurable turn, token, and time budgets.
      </p>
      <p>
        Pairing autonomy with explicit budgets in the same feature is the right construction. Autonomy without limits
        is the failure mode the harness layer warns about: an agent that cannot recognize it is stuck keeps trying,
        and each attempt costs money and occasionally does damage.
      </p>
      <p>
        Three budget dimensions are the correct three, because they fail differently. Turns bound how many steps of
        reasoning happen, which catches loops. Tokens bound spend, which catches expensive contexts. Time bounds
        wall clock, which catches a hung external call that consumes neither turns nor tokens while holding the task
        open.
      </p>
      <p>
        What a budget does not provide is judgment about whether the work is going well. A task that exhausts its
        budget having made no progress and one that exhausts it having nearly finished look identical from the
        outside. Reviewing what actually happened, rather than only whether it completed, remains necessary.
      </p>

      <h2 id="compaction">Compaction and long contexts</h2>
      <p>
        Long-running agents run into a hard constraint: context accumulates, and eventually exceeds what any model
        can hold. Prime Agent handles this with automatic session compaction.
      </p>
      <p>
        Compaction means summarizing earlier parts of a session to make room, and it is genuinely lossy. Detail is
        discarded, and which detail turns out to matter is not knowable in advance. An agent that compacted away a
        constraint mentioned an hour ago will violate it without knowing why.
      </p>
      <p>
        Mitigations that help, and are worth applying in any long-running agent, are to keep durable facts in an
        explicit store rather than relying on conversation history, to restate hard constraints periodically rather
        than assuming they persist, and to keep the compacted summary itself inspectable so that a wrong turn can be
        traced to what was lost.
      </p>
      <p>
        The continual harness helps here structurally, since supplemental state is not part of the conversation and
        therefore does not get compacted away. That is a good example of why the separation between conversation and
        durable state is worth maintaining rather than treating all context as one pool.
      </p>

      <h2 id="skills-as-code">Skills as executable packages</h2>
      <p>
        Prime Agent treats skills as executable Python packages rather than as folders of instructions. That is a
        meaningful divergence from the Agent Skills approach, and comparing the two clarifies what a skill is
        actually for.
      </p>
      <p>
        An instruction-based skill is prose an agent reads. Its strengths are that a domain expert who does not write
        code can author and correct it, that reviewing it requires reading rather than auditing, and that it works
        with any harness supporting the format. Its weakness is that the agent still has to carry out the procedure
        correctly each time, so results vary.
      </p>
      <p>
        A code-based skill is a function the agent calls. Its strengths are determinism, since the same input
        produces the same output, and efficiency, since the procedure does not consume context or steps. Its
        weaknesses are that authoring requires programming, that reviewing requires reading code, and that it is
        portable only to environments that run the same language with the same dependencies.
      </p>
      <p>
        There is also a security asymmetry worth stating plainly. Installing an instruction skill means an agent will
        read some text and try to follow it, which is a real risk and a bounded one. Installing a code skill means
        running software. Those deserve different review processes, and treating them as the same category because
        both are called skills is a mistake.
      </p>
      <p>
        The reasonable conclusion is that these are complements rather than competitors. Procedures involving
        judgment belong in prose. Deterministic transformations belong in code. A system that has both, and knows
        which is which, does better than one that forces everything into a single form.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        Prime Agent occupies the execution layer at the autonomous, long-running end, which makes it a useful
        contrast with the interactive harnesses in this reference.
      </p>
      <p>
        It also raises the harness layer&apos;s hardest questions in their sharpest form. When an agent runs for
        hours without supervision, spawns subagents, executes arbitrary code, and modifies its own operating state,
        every property in the openness test becomes load-bearing. Bounded is not a nicety when the agent can spawn
        agents. Auditable is not optional when nobody watched. Inspectable matters most when behavior emerges over
        time rather than being specified up front.
      </p>
      <p>
        Reading it as a design study is worthwhile even for teams who will not deploy it, because it is a coherent
        answer to what an agent that works unattended actually needs.
      </p>

      <h2 id="when-to-choose">When it fits</h2>
      <ul>
        <li><b>Long-running research and analysis.</b> Where a task genuinely takes hours and interactive supervision is impractical.</li>
        <li><b>Data-heavy work.</b> Where a code interface with persistent state beats a fixed tool list decisively.</li>
        <li><b>Work with natural parallelism.</b> Where independent subtasks can run concurrently.</li>
        <li><b>Environments where sandboxing is already available.</b> Since code execution requires containment, this suits teams who already run isolated compute.</li>
        <li><b>Exploratory work where the tool needs are unknown.</b> A code interface does not require anticipating what will be needed.</li>
      </ul>
      <p>
        It is a poor fit for tasks with irreversible external effects, for environments where a code-execution
        interface cannot be contained, and for short interactive work where the durability machinery is overhead.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Code execution requires isolation.</b> The single most important point. A REPL interface without a sandbox is unrestricted access, and no prompt changes that.</li>
        <li><b>Subagent spawning multiplies cost.</b> Easy spawning plus long budgets can produce spend that is discovered rather than planned.</li>
        <li><b>Refined state can encode mistakes.</b> Self-improvement is not self-correction. Review accumulated state periodically.</li>
        <li><b>Compaction loses things silently.</b> Constraints stated once, early, may not survive. Restate them.</li>
        <li><b>Autonomy hides failure.</b> Nobody watched, so a plausible-looking result may be built on a wrong turn at step nine. Read the trace, not only the output.</li>
        <li><b>Skills as executable packages are code.</b> A skill that is a Python package is software you are running, which is a different review question from a folder of instructions.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Good. MIT licensed and self-contained, though a code-first interface means work written for it is less portable than tool-based definitions.</li>
        <li><b>Inspectable.</b> Strong for the code. Behavior is harder to predict because it evolves through accumulated state, which is inherent to the design.</li>
        <li><b>Portable.</b> Moderate. Executable skills and REPL-based work carry more environment assumptions than declarative definitions do.</li>
        <li><b>Bounded.</b> Mixed by design. Budgets are structural and strong; capability bounding is entirely a deployment concern because of the code interface.</li>
        <li><b>Grounded.</b> Strong. Code execution against real data produces real results rather than recollection.</li>
        <li><b>Auditable.</b> Necessary and achievable. Long unattended runs make the trace the only account of what happened, so recording completeness matters more here than anywhere else.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Prime Agent is not self-improving in the sense of training. No weights change. What improves is its operating
        context.
      </p>
      <p>
        Prime Agent is not a safe default for unsupervised work with external consequences. Autonomy plus code
        execution plus irreversible actions is a combination that needs approval gates and isolation, not
        confidence.
      </p>
      <p>
        Prime Agent is not an interactive coding assistant. It can write code, and the design is aimed at long
        unattended runs rather than at a fast edit-and-verify loop with a person present.
      </p>
    </>
  );
}
