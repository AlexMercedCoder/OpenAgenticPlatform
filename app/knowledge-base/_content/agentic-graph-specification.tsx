import type { Article } from './types';

export const article: Article = {
  slug: 'agentic-graph-specification',
  title: 'Agentic Graph Specification',
  kind: 'technology',
  layer: 'open-standards',
  kicker: 'OPEN STANDARDS / WORK SHAPE',
  summary: 'A format for writing down how a project decomposes into bounded agentic loops, so the plan can be reviewed, priced, and moved before it runs.',
  standfirst: 'Harnesses already decompose work. They do it internally, in their own shape, and the plan disappears when the session ends. AGS makes the decomposition a document: reviewable before you pay for it, portable between harnesses, and checkable against declared success conditions.',
  keywords: ['Agentic Graph Specification', 'AGS', 'agent workflow', 'DAG', 'agent planning', 'human gates', 'portable plans', 'capability tiers'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'four-problems', label: 'The four problems it addresses' },
    { id: 'nodes', label: 'What a node actually declares' },
    { id: 'edges-and-gates', label: 'Edges, decisions, and gates' },
    { id: 'tiers', label: 'Capability tiers without naming models' },
    { id: 'success-conditions', label: 'Success conditions and who evaluates them' },
    { id: 'failure', label: 'Failure handling as a declared field' },
    { id: 'planning', label: 'What you learn before running' },
    { id: 'when-to-use', label: 'When a graph is worth writing' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Agentic Graph Specification on GitHub', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'The specification, JSON Schema, examples, and support libraries.' },
    { label: 'The normative specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec/blob/main/SPEC.md', note: 'The authoritative document describing nodes, edges, gates, and execution semantics.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'The companion specification covering agent identity and learned state.' },
    { label: 'Agent Skills', href: 'https://agentskills.io', note: 'The capability format, which covers how to do a thing rather than the shape of the work.' },
  ],
  related: ['open-standards', 'open-agent-profile', 'harnesses-and-brokers'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        An Agentic Graph is a directed acyclic graph where every node is a bounded agentic loop, meaning one unit of
        work an agent runs end to end, and every edge is a control-flow dependency. The specification is an open,
        implementation-neutral format for writing that graph down, currently at version 1.0 with maintenance
        releases, under Apache 2.0.
      </p>
      <p>
        A node is not a prompt and it is not a function call. It carries a precise brief, typed inputs and outputs,
        success conditions, a normalized capability tier, required tools, permissions and budgets, and failure
        handling. Graphs are written in YAML or JSON, with the two encodings equivalent.
      </p>

      <h2 id="four-problems">The four problems it addresses</h2>
      <p>
        The specification is unusually clear about what it is fixing, and the four consequences it names are worth
        taking one at a time because each one is familiar.
      </p>
      <h3>You cannot review the plan before paying for it</h3>
      <p>
        A harness plans internally. By the time you see the decomposition, the tokens are spent and the work is done.
        If the plan was wrong, you find out afterwards. Writing the plan first moves review to the point where it is
        cheap.
      </p>
      <h3>You cannot move it</h3>
      <p>
        A decomposition produced by one harness lives in that harness&apos;s memory in that harness&apos;s shape. It
        is worthless to another. Everything the planning step figured out is discarded at the session boundary.
      </p>
      <h3>Done is whatever the model says</h3>
      <p>
        Without declared acceptance criteria, completion is a claim. An agent that says it finished has asserted
        something nobody checked. Declaring success conditions in the document turns completion into a check.
      </p>
      <h3>Every task gets the same model</h3>
      <p>
        Without a declared capability demand, a harness either sends trivial steps to an expensive model or sends the
        one genuinely difficult architectural decision to a cheap one. Both are common and both are invisible.
      </p>
      <p>
        Each of these is a consequence of the plan being implicit. Making it explicit addresses all four with one
        change, which is the sign of a well-chosen abstraction.
      </p>

      <h2 id="nodes">What a node actually declares</h2>
      <p>
        The node is where the specification does its work, and the field list is more opinionated than a generic
        workflow format would be.
      </p>
      <ul>
        <li>
          <b>A precise brief.</b> What to accomplish, written so that an agent which has seen nothing else can act on
          it. This constraint is the useful part: a brief that only makes sense in the context of the previous node
          will fail the moment execution is parallel or resumed.
        </li>
        <li>
          <b>Typed inputs and outputs.</b> What it receives and what it must produce, with declared types such as a
          file set or a structured value. This is what allows a harness to check that a node produced something of
          the right shape rather than trusting a claim.
        </li>
        <li>
          <b>Success conditions.</b> Machine-checkable where possible, always human-readable, and evaluated by the
          harness rather than asserted by the model.
        </li>
        <li>
          <b>A level of intelligence.</b> A normalized capability tier plus hints, so a harness can route to an
          appropriate model without the graph naming one.
        </li>
        <li>
          <b>Required tools, permissions, and budgets.</b> The ceiling on what this node may do and what it may
          spend, declared per node rather than for the whole run.
        </li>
        <li>
          <b>Failure handling.</b> Retries with feedback, fallbacks, escalation, and human checkpoints.
        </li>
      </ul>
      <p>
        Per-node permissions and budgets are the field group that most distinguishes this from an ordinary pipeline
        format. A graph where the implementation node may write source files and the review node may not is
        expressing an authority model, not just an order of operations.
      </p>

      <h2 id="edges-and-gates">Edges, decisions, and gates</h2>
      <p>
        Edges are control-flow dependencies, which makes the graph acyclic by construction and its execution order
        derivable rather than declared. Two node kinds deserve separate mention because they are where the format
        earns its place over a plain task list.
      </p>
      <p>
        <b>Decision nodes</b> branch on an outcome. Ready or needs work, with different downstream paths. This is
        what lets a graph express remediation loops without becoming a cycle: the remediation path rejoins rather
        than looping back.
      </p>
      <p>
        <b>Gates</b> hold for an explicit human decision. Placing a gate before the first irreversible action, or
        before an expensive parallel fan-out, is the single most valuable structural choice available in a graph.
      </p>
      <p>
        The canonical example in the specification illustrates the pattern well: audit, then define an API, then a
        human approval gate, then three parallel implementation nodes, then verification, then a release-readiness
        decision, then a publish approval before any side effects. The gates are placed exactly where a person would
        want to look, which is before the expensive part and before the irreversible part.
      </p>

      <h2 id="tiers">Capability tiers without naming models</h2>
      <p>
        The intelligence field declares a normalized tier and optional hints rather than a model identifier, and this
        is a genuinely good design decision worth dwelling on.
      </p>
      <p>
        A graph that names a specific model is stale the moment that model is deprecated, and it is unusable on a
        harness configured with a different provider. A graph that says a node requires frontier-level capability
        with code generation hints remains valid indefinitely, and each harness resolves it against whatever it has.
      </p>
      <p>
        The economic consequence is the one the specification names. Declaring capability demand per node is what
        allows a harness to route the audit step to a standard model and the architectural decision to the strongest
        available. Without the declaration, the harness has no basis for the distinction and applies one model
        uniformly, which is wrong in one direction or the other on almost every node.
      </p>
      <p>
        This is the same argument the models layer makes about tiering calls, expressed as a portable document rather
        than as configuration. The graph author knows which step is hard; the harness knows which models are
        available. Separating those two pieces of knowledge is what lets both change independently.
      </p>

      <h2 id="success-conditions">Success conditions and who evaluates them</h2>
      <p>
        The specification is specific that success conditions are evaluated by the harness rather than asserted by
        the model, and that constraint carries most of the weight of the whole format.
      </p>
      <p>
        A model asked whether it completed a task will usually say yes. Not from dishonesty, but because assessing
        your own work against a criterion you also interpreted is not a reliable operation. Agentic systems that
        depend on self-reported completion accumulate silent failures: a step that half-worked is reported as done,
        and the next step builds on it.
      </p>
      <p>
        Moving evaluation outside the model changes the character of the system. A condition that says the test suite
        passes, or that the output contains these fields, is checked by running something. A condition that is
        human-readable but not machine-checkable is at least written down, which means a reviewer knows what to look
        at.
      </p>
      <p>
        The practical advice that follows is to write success conditions that are checkable wherever the effort is
        reasonable, and to accept human-readable ones elsewhere rather than skipping them. An unchecked criterion is
        still better than an unstated one, because it tells a reviewer what the node was supposed to achieve.
      </p>

      <h2 id="failure">Failure handling as a declared field</h2>
      <p>
        Most workflow formats treat failure as an operational concern handled by the runtime. AGS puts it in the
        document, and the reason is specific to agentic work.
      </p>
      <p>
        An agentic node fails in ways a deterministic step does not. It can produce output of the right shape that is
        wrong. It can fail a success condition it nearly met. It can fail for a reason that would not recur, such as
        a transient tool error, or for a reason that will recur every time, such as an impossible brief. Retrying
        blindly is correct for the first and wasteful for the second.
      </p>
      <p>
        Declaring the handling per node lets the document express which case it expects. Four mechanisms cover most
        of it:
      </p>
      <ul>
        <li>
          <b>Retry with feedback.</b> Not a plain retry. The failure information from the previous attempt goes into
          the next one, so the agent knows what it got wrong. A retry that repeats the identical prompt usually
          produces the identical failure.
        </li>
        <li>
          <b>Fallback.</b> An alternative approach when the primary one does not work. Often a different capability
          tier, since some failures are capability failures.
        </li>
        <li>
          <b>Escalation.</b> Handing the problem to a different node, or to a stronger tier, rather than continuing
          to attempt the same thing.
        </li>
        <li>
          <b>Human checkpoint.</b> Stopping and asking, which is the correct handling for anything where a wrong
          automated recovery would be worse than a delay.
        </li>
      </ul>
      <p>
        Writing this down has a secondary benefit that shows up during review. A node with three retries, a fallback
        to a stronger tier, and an escalation path is expensive in the worst case, and seeing that in the document
        prompts the question of whether the brief should be clearer instead. Failure handling declared in a plan
        makes the cost of unreliability visible; failure handling buried in a runtime does not.
      </p>

      <h2 id="planning">What you learn before running</h2>
      <p>
        A validated graph can be planned without executing anything, and the plan answers questions that are
        expensive to answer afterwards.
      </p>
      <ul>
        <li><b>Dependency order.</b> What runs when, and what can run in parallel.</li>
        <li><b>Reachability.</b> Which nodes are actually reachable from the declared entry points, which surfaces orphaned work.</li>
        <li><b>Worst-case bounds.</b> What happens if every retry path is taken, which is the number that matters for a budget rather than the happy path.</li>
        <li><b>Cost and tier summary.</b> How much of this needs an expensive model, and roughly what the run will cost.</li>
        <li><b>Unsupported features.</b> What this environment cannot do with this document, reported explicitly rather than discovered at step nine.</li>
        <li><b>A digest.</b> A stable identifier for the plan, which is what makes it citable in a review and comparable across revisions.</li>
      </ul>
      <p>
        The last two are the ones a broker cares about, and they are why read-only planning is valuable even in a
        component that never executes graphs.
      </p>

      <h2 id="when-to-use">When a graph is worth writing</h2>
      <p>
        Structure has a cost, and applying it everywhere is a common way to make an idea useless.
      </p>
      <p>
        A graph earns its place when the work has real structure worth reviewing: branches, approval points,
        parallelism, and consequences. Release processes, migrations, incident response, and multi-stage builds all
        qualify. So does any work expensive enough that reviewing the plan before paying for it is worthwhile.
      </p>
      <p>
        A graph does not earn its place for conversational or exploratory work. A question with an unknown shape
        cannot be decomposed in advance, and forcing it into nodes produces a document that is wrong by the second
        step. That work belongs in an ordinary agent session.
      </p>
      <p>
        The honest tension is that explicit structure reduces the room an agent has to improvise, which is exactly
        the point in high-consequence work and exactly the loss in exploratory work. Reserving graphs for processes
        where the steps genuinely matter, and leaving open-ended work open-ended, is a better rule than treating
        either style as correct everywhere.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        AGS occupies the work-shape position in the standards layer, alongside skills for capability, MCP for reach,
        and profiles for identity.
      </p>
      <p>
        The precedent worth naming is from data engineering, where separating pipeline definitions from execution
        engines turned out to be enormously valuable. A pipeline as a document can be reviewed, versioned, diffed,
        run by different engines, and reasoned about without running it. The same argument transfers directly: when
        the shape of the work is a document rather than a call stack, you can think about it before it happens.
      </p>
      <p>
        It also composes with profiles in a specific way worth noticing. A profile says what an agent may do in
        general. A graph node says what this particular step requires. A harness granting the intersection of the
        two produces per-step authority that is narrower than the agent&apos;s standing permissions, which is
        stronger than either mechanism alone.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Over-decomposition is the common mistake.</b> Twenty nodes where four would do produces coordination overhead and context loss at every boundary. A node should be a unit of work an agent can complete, not a single action.</li>
        <li><b>Briefs that assume context will fail.</b> The requirement that a brief stand alone is not stylistic. A node may run in parallel with the ones that would have provided the context.</li>
        <li><b>Unchecked success conditions are documentation.</b> Useful documentation, and not a check. Know which of yours are which.</li>
        <li><b>Budgets need to reflect the worst case.</b> Retries and fallbacks multiply cost. Plan against the worst-case bound rather than the expected path.</li>
        <li><b>Gates in the wrong place.</b> A gate after the expensive fan-out has already spent the money. Place them before irreversibility and before cost.</li>
        <li><b>Graphs go stale.</b> A document referring to tools or systems that changed is confidently wrong. Validate them in continuous integration the way you would any other artifact.</li>
        <li><b>Harness support varies.</b> Some implementations validate and plan without executing. Check what your runtime actually does with a graph before depending on it.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Apache licensed, implementation-neutral by design, with a published schema and support libraries.</li>
        <li><b>Inspectable.</b> Very strong. A graph is readable YAML that a reviewer can follow without running anything, which is the format&apos;s central claim.</li>
        <li><b>Portable.</b> Strong. Capability tiers rather than model names, and declared rather than assumed tool requirements, are both deliberate portability choices.</li>
        <li><b>Bounded.</b> Strong. Per-node permissions, budgets, and human gates express authority as part of the plan.</li>
        <li><b>Grounded.</b> Partial. Typed inputs and outputs and harness-evaluated success conditions ground completion in checks rather than claims.</li>
        <li><b>Auditable.</b> Very strong. A digest-identified plan, reviewed before execution, is an unusually good audit artifact because it records intent rather than only outcome.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        AGS is not an execution engine. It describes work; harnesses run it. A graph is inert on its own, which is
        what makes it portable.
      </p>
      <p>
        AGS is not a general workflow language. It is specifically about decomposing work into agentic loops, with
        fields such as capability tier and success conditions that only make sense in that context. Using it for
        deterministic pipelines would be a poor fit in both directions.
      </p>
      <p>
        AGS is not a replacement for an agent&apos;s own planning. Within a node, the agent still decides how to
        proceed. The graph bounds the unit of work, states what success means, and declares what the node may use.
        What happens inside remains an agentic loop.
      </p>
    </>
  );
}
