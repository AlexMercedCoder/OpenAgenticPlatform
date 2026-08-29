import type { Article } from './types';

export const article: Article = {
  slug: 'harnesses-and-brokers',
  title: 'Harnesses and brokers',
  kind: 'layer',
  layer: null,
  kicker: '03 / EXECUTION',
  summary: 'The layer that turns model output into actual work, holds state, enforces authority, and decides which agent handles what.',
  standfirst: 'A model produces text. Something else has to read that text, call a tool, check whether the call was allowed, keep track of what happened, and decide what to do next. That something is the harness, and when several harnesses are involved, a broker decides which one gets the work.',
  keywords: ['agent harness', 'agent runtime', 'agent broker', 'tool calling', 'agent orchestration', 'agent authority', 'agent state'],
  sections: [
    { id: 'what-the-layer-covers', label: 'What the layer covers' },
    { id: 'harness-vs-broker', label: 'Harness and broker are different jobs' },
    { id: 'the-loop', label: 'The agent loop, honestly described' },
    { id: 'seven-responsibilities', label: 'What a harness is responsible for' },
    { id: 'tools', label: 'Tools are the surface area' },
    { id: 'authority', label: 'Authority and approval' },
    { id: 'state', label: 'State, memory, and context' },
    { id: 'multi-agent', label: 'When more than one agent helps' },
    { id: 'why-multiple', label: 'Why a system ends up with several harnesses' },
    { id: 'brokering', label: 'What brokering actually decides' },
    { id: 'debugging', label: 'Debugging an agent' },
    { id: 'failure-modes', label: 'Common failure modes' },
    { id: 'openness', label: 'How to evaluate this layer' },
    { id: 'sequence', label: 'A build sequence that works' },
    { id: 'not', label: 'What this layer is not' },
  ],
  learnMore: [
    { label: 'OpenCode', href: 'https://opencode.ai', note: 'An open terminal coding agent, useful as a readable reference implementation of a harness.' },
    { label: 'Pi', href: 'https://github.com/earendil-works/pi', note: 'An agent harness project with a compact, inspectable core.' },
    { label: 'MagAgent', href: 'https://github.com/AlexMercedCoder/MagAgent', note: 'A Python agent framework covering providers, tools, memory, and workflows.' },
    { label: 'Loro', href: 'https://github.com/alexmerced-oss/loro', note: 'A harness organized around explicit authority, policy, evidence, and durable records.' },
    { label: 'Merced AI', href: 'https://github.com/AlexMercedCoder/merced-ai', note: 'A provider-neutral broker for routing work across agents and model-powered tools.' },
    { label: 'Hermes Agent', href: 'https://github.com/NousResearch/hermes-agent', note: 'A personal agent project from Nous Research.' },
    { label: 'Prime Agent', href: 'https://github.com/PrimeIntellect-ai/prime-agent', note: 'A self-improving agent built around reinforcement learning methods.' },
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'The protocol most harnesses use to reach tools and data without hard-coding integrations.' },
  ],
  related: ['data-and-semantics', 'models-and-routing', 'open-standards'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-the-layer-covers">What the layer covers</h2>
      <p>
        Everything between a model deciding something and the world changing happens here. Reading the model&apos;s
        proposed action, checking whether it is permitted, executing it, capturing the result, deciding whether the
        task is done, and recording enough that a person can reconstruct the sequence later.
      </p>
      <p>
        This is where most of the engineering effort in an agentic system actually goes, and it is the layer most
        often underestimated. Building something that calls a model and runs a tool takes an afternoon. Building
        something that does it repeatedly, under load, with real permissions, without losing track of state, and in a
        way anyone can debug afterwards takes considerably longer.
      </p>
      <p>
        It is also the layer where the openness test bites hardest. Data formats and model APIs have converged
        enough to be reasonably portable. Harnesses have not. A great deal of what a team builds here is
        harness-specific unless they deliberately push definitions out into portable forms, which is what the
        standards layer exists to enable.
      </p>

      <h2 id="harness-vs-broker">Harness and broker are different jobs</h2>
      <p>
        These two terms get used interchangeably and should not be. Keeping them apart clarifies a great deal about
        how larger systems are put together.
      </p>
      <p>
        A <b>harness</b> runs an agent. It owns the loop, holds the conversation and task state, executes tools,
        enforces limits, and produces a result. It is where the work happens.
      </p>
      <p>
        A <b>broker</b> decides which harness, agent, or model-powered tool should receive a piece of work, hands it
        over, and collects the result. It does not run the loop. It routes, applies policy about who may do what, and
        gives the rest of the system one place to send requests.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead><tr><th>Question</th><th>Harness</th><th>Broker</th></tr></thead>
          <tbody>
            <tr><td>Owns the agent loop</td><td>Yes</td><td>No</td></tr>
            <tr><td>Executes tools</td><td>Yes</td><td>Usually not</td></tr>
            <tr><td>Holds task state</td><td>Yes</td><td>Holds routing state only</td></tr>
            <tr><td>Chooses the executor</td><td>No</td><td>Yes</td></tr>
            <tr><td>Typical failure</td><td>A task goes wrong</td><td>Work reaches the wrong place</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Small systems have one harness and no broker, and that is correct. The broker becomes worth its complexity
        when there are several execution options, when different work has different policy requirements, or when
        calling systems should not need to know which agent implementation exists this month.
      </p>

      <h2 id="the-loop">The agent loop, honestly described</h2>
      <p>
        Stripped of vocabulary, an agent loop is short:
      </p>
      <ol>
        <li>Assemble context: instructions, available tools, relevant facts, history, and the current request.</li>
        <li>Ask the model what to do next.</li>
        <li>If the model proposes a tool call, check whether it is allowed, run it, and capture the result.</li>
        <li>Add the result to the context and repeat.</li>
        <li>Stop when the model produces a final answer, a limit is reached, or a policy check fails.</li>
      </ol>
      <p>
        The difficulty is not in the shape. It is in every branch that the shape hides. What happens when a tool
        times out. What happens when the model proposes the same failing call four times. What happens when a tool
        returns two megabytes of output. What happens when a user cancels mid-step, or when the process restarts
        while a task is in flight. What happens when a tool result contains text that looks like an instruction.
      </p>
      <p>
        That last one deserves emphasis. Anything a tool returns is data, not instruction. Web pages, file contents,
        issue descriptions, and email bodies can all contain text addressed to the agent. A harness that treats
        retrieved content as authoritative is exploitable by anyone who can put text where the agent will read it.
        Keeping that boundary is a harness responsibility, and it cannot be delegated to the model.
      </p>

      <h2 id="seven-responsibilities">What a harness is responsible for</h2>
      <h3>1. Context assembly</h3>
      <p>
        Deciding what the model sees on each step. This includes trimming history, selecting relevant facts,
        supplying tool definitions, and ordering content so that stable material comes first. Most quality problems
        that look like model problems are context assembly problems.
      </p>
      <h3>2. Tool execution</h3>
      <p>
        Actually running the call, with timeouts, argument validation, output size limits, and errors returned in a
        form the model can act on. A tool error that crashes the loop is a harness defect. A tool error reported back
        as a result the agent can respond to is correct behavior.
      </p>
      <h3>3. Authority enforcement</h3>
      <p>
        Deciding whether a proposed action is permitted at all, before it runs, based on rules the agent cannot
        change. This is covered in its own section below because it is the responsibility most often skipped.
      </p>
      <h3>4. State management</h3>
      <p>
        Keeping track of the conversation, the task, intermediate results, and progress, in a way that survives
        restarts if the work is long-running.
      </p>
      <h3>5. Limits</h3>
      <p>
        Bounding steps, wall-clock time, token spend, and repeated failures. Without limits, a confused agent will
        loop until something else stops it, and something else is usually a bill.
      </p>
      <h3>6. Recording</h3>
      <p>
        Writing down what happened: which model, which prompt, which tool, which arguments, which result, which
        decision. This is what makes the auditable property real, and it has to be built in rather than added later,
        because you cannot record the past.
      </p>
      <h3>7. Termination</h3>
      <p>
        Deciding when the work is finished, when it has failed, and when it needs a person. Ending cleanly is
        underrated. Agents that cannot recognize failure keep trying, and each attempt costs money and sometimes
        does damage.
      </p>

      <h2 id="tools">Tools are the surface area</h2>
      <p>
        An agent can only do what its tools let it do. That makes tool design the highest-leverage work in this
        layer, and it is closer to API design than to prompt writing.
      </p>
      <p>
        A few properties separate tools that work from tools that produce confusing behavior.
      </p>
      <h3>Named for intent, not for implementation</h3>
      <p>
        A tool called <code>get_open_orders_for_account</code> is chosen correctly far more often than one called
        <code>run_query</code>, because the model is selecting from names and descriptions. Broad, generic tools push
        the difficulty onto the model at every call. Specific tools encode the decision once, in code, where it can
        be tested.
      </p>
      <h3>Descriptions written for the caller</h3>
      <p>
        The description is not documentation for humans who will never read it. It is the entire basis on which a
        model decides whether this tool applies. It should say what the tool does, when to use it, when not to, and
        what the arguments mean in domain terms.
      </p>
      <h3>Results shaped for reasoning, not for display</h3>
      <p>
        Returning a raw API response with sixty fields wastes context and buries the answer. Returning the six fields
        that matter, with units and a note about what was filtered out, gives the model something it can actually use
        and keeps the loop affordable.
      </p>
      <h3>Errors that suggest the next move</h3>
      <p>
        An error saying the account identifier was not found, and that identifiers look like a certain pattern, lets
        an agent correct itself. A stack trace does not. Because the model reads errors as input, error text is part
        of the interface.
      </p>
      <h3>Few enough to choose between</h3>
      <p>
        Tool selection quality degrades as the list grows. Beyond roughly a couple of dozen, models start choosing
        badly and the fix is not a better model, it is fewer tools in scope for a given task. Scoping tools per task
        rather than exposing everything is one of the most effective quality improvements available.
      </p>

      <h2 id="authority">Authority and approval</h2>
      <p>
        The most consequential design decision in this layer is where the boundary between what an agent may propose
        and what it may do is drawn, and how that boundary is enforced.
      </p>
      <p>
        There is a common mistake worth naming. Teams write the boundary into the system prompt: do not delete
        anything, do not send email without asking, only touch these tables. This is not enforcement. It is a
        request. It fails when the model misreads intent, when a task is unusual, and reliably when a document the
        agent reads contains text designed to override it. Instructions in a prompt cannot constrain a system that
        is capable of ignoring them.
      </p>
      <p>
        Real authority is enforced outside the model, by the code that executes the tool call:
      </p>
      <ul>
        <li><b>Capability scoping.</b> The agent is only given tools it should have. A tool that is not registered cannot be called.</li>
        <li><b>Argument constraints.</b> The tool itself limits what it will accept: these tables, this directory, this recipient domain.</li>
        <li><b>Credential scoping.</b> The credentials the agent operates with cannot perform the forbidden action, so a mistake fails at the boundary rather than succeeding.</li>
        <li><b>Approval gates.</b> Certain classes of action pause and wait for a person, with the proposed action shown clearly enough to judge.</li>
        <li><b>Reversibility preference.</b> Where a reversible form of an action exists, prefer it. Draft rather than send. Branch rather than push. Soft delete rather than hard.</li>
      </ul>
      <p>
        A useful test: if the model were replaced with one that behaved adversarially, what could it actually do?
        Whatever the answer is, that is your real security boundary. Everything else is a preference.
      </p>

      <h2 id="state">State, memory, and context</h2>
      <p>
        Three different things get called memory, and separating them prevents a lot of confusion.
      </p>
      <p>
        <b>Working state</b> is the current task: the steps taken, the results so far, the goal. It lives for the
        duration of the task and should be durable enough to survive a restart if the task is long.
      </p>
      <p>
        <b>Conversation history</b> is what was said. It grows without bound and has to be trimmed, summarized, or
        selectively recalled, because sending all of it on every step is expensive and lowers quality.
      </p>
      <p>
        <b>Long-term memory</b> is what should persist across tasks: preferences, prior decisions, learned facts about
        a codebase or a customer. This is the hardest of the three to do well, because writing to it indiscriminately
        produces a store full of noise that degrades every future retrieval.
      </p>
      <p>
        The discipline that helps most is deciding explicitly what gets written to long-term memory and requiring a
        reason. Memory that accumulates by default becomes a liability. Memory that accumulates on purpose becomes
        the thing that makes an agent feel useful over weeks rather than minutes.
      </p>

      <h2 id="multi-agent">When more than one agent helps</h2>
      <p>
        Splitting work across several agents is often reached for too early. It adds coordination cost, more failure
        modes, and more places for context to be lost. It is worth doing when there is a specific reason, and the
        reasons are narrower than the enthusiasm suggests.
      </p>
      <p>
        Good reasons:
      </p>
      <ul>
        <li>
          <b>Different authority.</b> One part of the work needs write access to production and the rest does not.
          Separating them keeps the wide-permission surface small.
        </li>
        <li>
          <b>Genuinely parallel subtasks.</b> Five independent files to review, or five sources to check, with no
          dependency between them. Wall-clock time drops in proportion.
        </li>
        <li>
          <b>Context that will not fit.</b> A task spanning more material than one context can hold, split so each
          worker holds a slice and a coordinator holds only conclusions.
        </li>
        <li>
          <b>Independent verification.</b> One agent produces, another checks, and the checker is prompted to
          disagree rather than to confirm. This catches a class of confident errors that self-review does not.
        </li>
      </ul>
      <p>
        Weak reasons: because the diagram looks better, because a task has several conceptual phases that one agent
        could handle sequentially, or because assigning personas feels like specialization. A single agent with good
        tools and clear limits beats a committee of agents passing summaries to each other in most real workloads.
      </p>
      <p>
        When work is split, the coordination cost is real and should be designed rather than assumed. Each handoff
        loses context, so what crosses the boundary needs to be explicit: the task, the constraints, the relevant
        facts, and what to return. Handoffs that pass a free-text summary and hope tend to degrade quietly as tasks
        get harder.
      </p>

      <h2 id="why-multiple">Why a system ends up with several harnesses</h2>
      <p>
        Teams usually intend to standardize on one and usually do not, for reasons that are mostly good.
      </p>
      <p>
        Coding work wants a harness with deep filesystem and repository awareness. Customer-facing work wants tight
        latency and conservative defaults. Data analysis work wants query tooling and result handling. Background
        automation wants durability and retries more than interactivity. These are genuinely different products, and
        a single harness that serves all of them well is rare.
      </p>
      <p>
        Different harnesses also arrive at different times. A team adopts a coding agent, then a vendor tool ships
        with its own agent embedded, then someone builds an internal one for a workflow no product covers. The
        realistic goal is not to prevent this. It is to make sure the definitions that matter live outside any one
        of them.
      </p>
      <p>
        That is the practical argument for the standards layer. If skills, tool connections, agent identity, and
        workflow shape are expressed in portable formats, then having three harnesses is an operational detail. If
        they are expressed in one harness&apos;s configuration language, then having three harnesses means
        maintaining the same definitions three times and watching them drift.
      </p>

      <h2 id="brokering">What brokering actually decides</h2>
      <p>
        When a broker is present, it answers a small number of questions that would otherwise be answered by
        whichever caller happened to be written first.
      </p>
      <ul>
        <li><b>Which executor.</b> Based on the kind of work, the data involved, current availability, and cost.</li>
        <li><b>Whether at all.</b> Some requests should be refused or escalated rather than routed, and that check belongs in one place.</li>
        <li><b>Under whose authority.</b> The identity and permissions the work runs with, which are properties of the request rather than of the executor.</li>
        <li><b>With what budget.</b> Step, time, and spend limits attached at dispatch rather than assumed by each harness.</li>
        <li><b>Where the record goes.</b> One usage and outcome record across every executor, which is otherwise impossible to assemble.</li>
      </ul>
      <p>
        The value is concentration. Without a broker, every one of these decisions is made implicitly, differently,
        in each calling application. With one, they are made once and can be changed without touching callers.
      </p>

      <h2 id="debugging">Debugging an agent</h2>
      <p>
        Agents fail differently from ordinary software. There is rarely a stack trace pointing at a line. There is a
        sequence of individually reasonable steps that added up to the wrong outcome, and the only way to find the
        problem is to read the sequence.
      </p>
      <p>
        That makes the trace the primary debugging artifact, and it needs to contain more than most logging captures
        by default. A usable trace shows the exact context sent on each step rather than a template, every tool call
        with its full arguments, every result including errors, the model and version used, and the reason the loop
        stopped. Anything summarized before storage tends to omit precisely the detail that explains the failure.
      </p>
      <p>
        Reading traces also reveals a pattern worth knowing: most bad outcomes trace back to a step much earlier than
        the visible mistake. A tool returned an empty result, the agent interpreted empty as none exist rather than
        as query was wrong, and every subsequent step built on that. Fixing the final step does nothing. Fixing the
        tool so it distinguishes no matches from bad input fixes the whole class.
      </p>
      <p>
        The organizational habit that follows is simple and rarely adopted: read a sample of real traces every week,
        including successful ones. Successful traces show wasted steps, unnecessary tool calls, and context bloat
        that never becomes a visible bug but quietly determines cost and latency.
      </p>

      <h2 id="failure-modes">Common failure modes</h2>
      <ul>
        <li><b>Policy expressed only in prompts.</b> The most common and most consequential mistake in the layer.</li>
        <li><b>No step or spend limit.</b> A loop that cannot terminate itself will run until an external constraint stops it.</li>
        <li><b>Tool output treated as instruction.</b> Retrieved content is data. Anything else is an injection path.</li>
        <li><b>Unbounded tool output.</b> A tool returning a large file fills the context, evicts the actual task, and produces incoherent behavior.</li>
        <li><b>State only in process memory.</b> A restart loses long-running work, and there is no way to resume or inspect it.</li>
        <li><b>Skills and tools defined in harness-specific config.</b> Portable in theory, rewritten in practice.</li>
        <li><b>Silent failure.</b> The agent reports success because the final model call said so, while a tool three steps back returned an error nobody surfaced.</li>
        <li><b>No approval path.</b> Every action is either fully automatic or fully manual, with nothing in between, so teams choose manual and the system goes unused.</li>
      </ul>

      <h2 id="openness">How to evaluate this layer</h2>
      <ul>
        <li><b>Replaceable.</b> If you moved to a different harness, how much would you rewrite? Skills, tools, and policy should mostly move.</li>
        <li><b>Inspectable.</b> Can an engineer see the actual prompt, the tool calls, and the decisions, without adding instrumentation first?</li>
        <li><b>Portable.</b> Are agent definitions, skills, and tool connections expressed in formats another runtime could read?</li>
        <li><b>Bounded.</b> Are limits and permissions enforced in code, outside the model, and testable?</li>
        <li><b>Grounded.</b> Does the harness supply facts from the data layer rather than relying on model recall?</li>
        <li><b>Auditable.</b> Can you reconstruct a completed task from records alone, months later, including what was read and what changed?</li>
      </ul>

      <h2 id="sequence">A build sequence that works</h2>
      <ol>
        <li><b>Start read-only.</b> Give the agent useful tools that cannot change anything. Most of the value and almost none of the risk.</li>
        <li><b>Put limits in before the second tool.</b> Steps, time, spend, and repeated-failure detection.</li>
        <li><b>Record from the first day.</b> The record is what lets you debug everything that follows.</li>
        <li><b>Add write actions one at a time, each with a scope.</b> Not a general write capability.</li>
        <li><b>Add approval for anything hard to reverse.</b> Show the proposed action, not a summary of it.</li>
        <li><b>Move skills and tool definitions into portable files.</b> Before you have three copies of them.</li>
        <li><b>Introduce a broker only when there is a second executor.</b> Not before.</li>
        <li><b>Review the records regularly.</b> Reading what agents actually did is the most reliable source of improvements.</li>
      </ol>

      <h2 id="not">What this layer is not</h2>
      <p>
        A harness is not a model with extra steps. The model contributes judgment. The harness contributes structure,
        limits, memory, and accountability, none of which the model can provide about itself.
      </p>
      <p>
        A harness is also not the right home for durable business data. Task state belongs here. Facts belong in the
        data layer, where they can be queried, governed, and shared by systems that are not agents.
      </p>
      <p>
        Finally, a harness is not a substitute for standards. Every harness will define skills, tools, and agent
        identity somehow. If those definitions live only inside it, the system is portable in principle and captured
        in practice, which is precisely the outcome an open architecture is meant to avoid.
      </p>
    </>
  );
}
