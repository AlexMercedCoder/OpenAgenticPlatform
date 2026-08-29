import type { Article } from './types';

export const article: Article = {
  slug: 'glossary',
  title: 'Glossary',
  kind: 'glossary',
  layer: null,
  kicker: 'REFERENCE / SHARED VOCABULARY',
  summary: 'The terms this site uses, defined once so every other page can stay short, with notes on where common usage is imprecise.',
  standfirst: 'Agentic AI has a vocabulary problem. The same word means different things in different documents, and several important distinctions are routinely collapsed. These definitions are how this site uses each term.',
  keywords: ['agentic AI glossary', 'agent terminology', 'AI definitions', 'harness', 'broker', 'grounding', 'context window'],
  sections: [
    { id: 'how-to-read', label: 'How to read this' },
    { id: 'agents', label: 'Agents and runtimes' },
    { id: 'models', label: 'Models and inference' },
    { id: 'context', label: 'Context and memory' },
    { id: 'tools', label: 'Tools and capability' },
    { id: 'data', label: 'Data and semantics' },
    { id: 'governance', label: 'Authority and accountability' },
    { id: 'standards-terms', label: 'Standards and artifacts' },
    { id: 'operations', label: 'Cost and operations' },
    { id: 'openness', label: 'Kinds of open' },
    { id: 'confusions', label: 'Distinctions worth keeping' },
  ],
  learnMore: [
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'Canonical definitions for tools, resources, and prompts as protocol primitives.' },
    { label: 'Agent Skills', href: 'https://agentskills.io', note: 'The specification defining what a skill is and how progressive disclosure works.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'Definitions for agent identity, state, deltas, and conformance levels.' },
    { label: 'Apache Iceberg', href: 'https://iceberg.apache.org', note: 'Authoritative definitions for table format concepts such as snapshots and manifests.' },
  ],
  related: ['data-and-semantics', 'harnesses-and-brokers', 'open-standards'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="how-to-read">How to read this</h2>
      <p>
        These are the definitions this site uses. They are not the only reasonable ones, and where common usage
        differs, that is noted rather than ignored.
      </p>
      <p>
        The entries are grouped by area rather than alphabetically, because most of the confusion in this vocabulary
        comes from pairs of terms that are related and different. Reading a group together makes the distinctions
        clearer than looking up one word at a time.
      </p>

      <h2 id="agents">Agents and runtimes</h2>
      <p>
        <b>Agent.</b> A system that pursues a goal by taking actions, observing results, and deciding what to do
        next. The defining property is the loop, not the intelligence. A program that calls a model once and returns
        the answer is not an agent regardless of how capable the model is.
      </p>
      <p>
        <b>Agentic.</b> Describing systems built around that loop. Used here as an architectural adjective rather
        than a marketing one.
      </p>
      <p>
        <b>Harness.</b> The software that runs an agent. It assembles context, calls a model, executes tool calls,
        holds state, enforces limits, records what happened, and decides when to stop. Most of the engineering in an
        agentic system lives here. Also called a runtime or, loosely, a framework.
      </p>
      <p>
        <b>Broker.</b> A component that decides which harness, agent, or model-powered tool should receive a piece of
        work, dispatches it, and collects the result. It does not run the loop. A broker that grows a loop has become
        a harness.
      </p>
      <p>
        <b>Agent loop.</b> The cycle of assembling context, asking the model what to do, executing a proposed action,
        appending the result, and repeating until termination.
      </p>
      <p>
        <b>Subagent.</b> An agent spawned by another agent to handle a subtask, with its own context and usually its
        own limits.
      </p>
      <p>
        <b>Termination reason.</b> Why a loop ended: completed, step limit, spend limit, time limit, policy denial,
        error, or cancellation. Recording this is disproportionately useful for diagnosis.
      </p>

      <h2 id="models">Models and inference</h2>
      <p>
        <b>Model.</b> The trained artifact that produces output from input. It contributes judgment and nothing else.
        It does not hold state, execute anything, or enforce limits.
      </p>
      <p>
        <b>Weights.</b> The trained parameters. Open weights means these are downloadable, which is a claim about the
        artifact and not about training code, training data, or licensing.
      </p>
      <p>
        <b>Inference.</b> Running a model to produce output. Distinct from training, which produces the model.
      </p>
      <p>
        <b>Provider.</b> An organization operating models and selling access. A provider API is a hosted endpoint
        reaching models the provider runs.
      </p>
      <p>
        <b>Router.</b> A layer that presents one interface over several providers or models, applying policy,
        fallback, and cost decisions. Can be a hosted service, a self-hosted proxy, or an internal abstraction.
      </p>
      <p>
        <b>Serving engine.</b> Software that runs open weights with production characteristics, batching many
        concurrent requests. Distinct from a workstation runtime, which serves one user well and does not attempt
        concurrency.
      </p>
      <p>
        <b>Quantization.</b> Reducing the numeric precision of weights to lower memory requirements, at some cost in
        quality that becomes noticeable below roughly four bits for demanding tasks.
      </p>
      <p>
        <b>Capability tier.</b> A normalized description of how strong a model needs to be for a task, used so that
        a portable artifact can express a requirement without naming a specific model.
      </p>

      <h2 id="context">Context and memory</h2>
      <p>
        <b>Context.</b> Everything sent to the model for one call: instructions, tool definitions, retrieved facts,
        prior steps, and the current request. In agentic systems this is assembled fresh each step and is where most
        quality is won or lost.
      </p>
      <p>
        <b>Context window.</b> The maximum context a model accepts. Larger windows let you supply more; they do not
        guarantee even attention across all of it, and filling one because it is available usually lowers quality.
      </p>
      <p>
        <b>Context assembly.</b> The harness work of deciding what goes into context and in what order. Most problems
        that look like model problems are context assembly problems.
      </p>
      <p>
        <b>Prompt caching.</b> Reusing a previously processed prefix at reduced cost and latency. Requires stable
        content first and volatile content last, which is a design rule worth following regardless of provider.
      </p>
      <p>
        <b>Working state.</b> The current task: steps taken, results so far, the goal. Lives for the duration of the
        task.
      </p>
      <p>
        <b>Conversation history.</b> What was said. Grows without bound and must be trimmed, summarized, or
        selectively recalled.
      </p>
      <p>
        <b>Long-term memory.</b> What persists across tasks: preferences, prior decisions, learned facts. The hardest
        of the three, because writing to it indiscriminately produces noise that degrades every future retrieval.
      </p>
      <p>
        <b>Compaction.</b> Summarizing earlier context to make room. Lossy by construction, and the loss is silent.
      </p>

      <h2 id="tools">Tools and capability</h2>
      <p>
        <b>Tool.</b> A function an agent can call, with described arguments. Model-controlled: the agent decides when
        to invoke it. Where side effects live.
      </p>
      <p>
        <b>Resource.</b> Data a client can read, addressed by identifier. Application-controlled: the client decides
        what to include rather than the model deciding to fetch.
      </p>
      <p>
        <b>Tool calling.</b> A model returning a structured request to invoke a tool, rather than prose describing
        one. Far more reliable than asking for a format in a prompt.
      </p>
      <p>
        <b>Structured output.</b> Model output constrained to a schema. Mechanisms range from instruction, which is
        weakest, through native tool calling, to constrained decoding, which is strongest and generally requires
        controlling serving.
      </p>
      <p>
        <b>Skill.</b> Packaged procedural knowledge: a folder with instructions and optional supporting files, loaded
        when relevant. Know-how, not capability.
      </p>
      <p>
        <b>Progressive disclosure.</b> Loading only names and descriptions until a task matches, then loading full
        instructions. What allows a large library of skills to cost almost nothing until used.
      </p>
      <p>
        <b>MCP server.</b> A process exposing tools, resources, and prompts over the Model Context Protocol, usable
        by any conformant client.
      </p>

      <h2 id="data">Data and semantics</h2>
      <p>
        <b>File format.</b> How records are stored in a file. Parquet and ORC are columnar file formats.
      </p>
      <p>
        <b>Table format.</b> Metadata making a collection of files behave like a table, with atomic commits, schema
        evolution, and history. Iceberg is a table format. A table format is not a file format and not a catalog.
      </p>
      <p>
        <b>Catalog.</b> The service that resolves table names, performs atomic commits, enforces access, and vends
        credentials. The control point of the data layer. Distinct from a business glossary or data discovery
        product, which is also often called a catalog.
      </p>
      <p>
        <b>Snapshot.</b> A point-in-time state of a table. Recording a snapshot identifier alongside an answer is
        what makes that answer reproducible later.
      </p>
      <p>
        <b>Semantic layer.</b> Written definitions of what data means: authoritative sources, metric definitions,
        relationships, grain, freshness, and trust level.
      </p>
      <p>
        <b>Grain.</b> What one row represents. Undocumented grain is a common cause of aggregations that double
        count.
      </p>
      <p>
        <b>Credential vending.</b> A catalog issuing short-lived, scoped credentials to an authorized caller instead
        of clients holding long-lived storage keys.
      </p>
      <p>
        <b>Retrieval.</b> Finding relevant unstructured material, usually by similarity. Good at finding text, poor
        at producing numbers.
      </p>

      <h2 id="governance">Authority and accountability</h2>
      <p>
        <b>Authority.</b> What an agent is permitted to do, enforced by the code that executes actions rather than
        requested in a prompt.
      </p>
      <p>
        <b>Capability scoping.</b> Giving an agent only the tools it should have. A tool that is not registered
        cannot be called.
      </p>
      <p>
        <b>Approval gate.</b> A pause before a class of action, displaying the specific proposed action for a person
        to judge. Only meaningful if it shows the actual action and is rare enough to still be read.
      </p>
      <p>
        <b>Delegated authority.</b> An agent acting on behalf of a person, with access scoped to what that person
        could do. The arrangement that prevents an agent from becoming a privilege escalation path.
      </p>
      <p>
        <b>Trace.</b> The recorded sequence of a run: context, calls, results, decisions, and termination. The primary
        debugging artifact for agentic systems.
      </p>
      <p>
        <b>Provenance.</b> A record connecting an artifact or a written record back to the run that produced it,
        usually bound by checksum or identifier.
      </p>
      <p>
        <b>Prompt injection.</b> Content placed where an agent will read it, written to influence its behavior.
        Defended against by treating everything a tool returns as data rather than instruction, never by prompt
        instructions.
      </p>

      <h2 id="standards-terms">Standards and artifacts</h2>
      <p>
        <b>Specification.</b> A document complete enough that someone can build a compatible implementation from it
        without reading the reference implementation&apos;s source. A published document that does not meet that bar
        is documentation rather than a specification.
      </p>
      <p>
        <b>Conformance level.</b> A declared subset of a specification that an implementation supports. Useful only
        when implementations also publish what they do not support, since partial support that looks complete is
        worse than partial support that is labelled.
      </p>
      <p>
        <b>Projection.</b> Mapping a portable artifact onto a runtime that supports only part of it. Should be
        reported honestly as native, approximated, degraded, or unsupported, rather than silently applied.
      </p>
      <p>
        <b>Profile.</b> A document describing a named agent: role, model or tier, tool surface, permissions, and
        accumulated state. Answers who an agent is, as distinct from what it knows how to do or what it can reach.
      </p>
      <p>
        <b>Delta.</b> A structured description of what a session learned, applied to produce a new revision of a
        profile. Restricting deltas to a state section is what prevents an agent from rewriting its own contract.
      </p>
      <p>
        <b>Digest.</b> A stable identifier for the content of an artifact, computed canonically so that formatting
        and field order do not change it. What lets an approval refer to exactly the artifact that was reviewed.
      </p>
      <p>
        <b>Agentic graph.</b> A directed acyclic graph where nodes are bounded units of agentic work and edges are
        control-flow dependencies, written down so the plan can be reviewed before it runs.
      </p>
      <p>
        <b>Gate.</b> A node in a plan that holds for an explicit human decision. Most valuable placed before the
        first irreversible action and before an expensive fan-out.
      </p>
      <p>
        <b>Success condition.</b> A declared criterion for whether a unit of work completed, evaluated by the harness
        rather than asserted by the model. Without one, completion is a claim.
      </p>

      <h2 id="operations">Cost and operations</h2>
      <p>
        <b>Step.</b> One iteration of the agent loop. Cost and latency in agentic systems scale with steps rather
        than with user requests, which is why step counts are the number worth watching.
      </p>
      <p>
        <b>Input and output tokens.</b> What is sent and what is generated. In agentic loops the input side usually
        dominates, sometimes heavily, because accumulated context is resent every step. This inverts the usual
        instinct to optimize response length.
      </p>
      <p>
        <b>Fallback.</b> Routing to an alternative provider or model when the primary is unavailable. Falling back to
        a different model is a silent quality change and should be recorded as an explicit field rather than
        inferred.
      </p>
      <p>
        <b>Budget.</b> A declared ceiling on steps, wall-clock time, or spend for a unit of work. Three dimensions
        rather than one, because each catches a different failure: loops, hung external calls, and expensive
        contexts.
      </p>
      <p>
        <b>Evaluation set.</b> A small collection of real tasks with recorded expected outcomes, run against every
        candidate model or configuration. The only reliable basis for model decisions, and the artifact whose absence
        quietly prevents ever changing anything.
      </p>
      <p>
        <b>Sandbox.</b> Process-level isolation bounding what an agent can reach regardless of what it attempts.
        Necessary wherever capability is broad enough that argument-level constraints are meaningless, such as shell
        access or code execution.
      </p>

      <h2 id="openness">Kinds of open</h2>
      <p>
        <b>Open source.</b> Source available under a license permitting use, modification, and redistribution,
        including by competitors.
      </p>
      <p>
        <b>Open weights.</b> Trained parameters downloadable and runnable on your own hardware. Says nothing about
        training code, training data, or license terms.
      </p>
      <p>
        <b>Open format.</b> A documented data or file format that multiple implementations can read.
      </p>
      <p>
        <b>Open interface.</b> A documented API implemented by more than one provider, which makes clients portable
        regardless of what is behind it.
      </p>
      <p>
        <b>Open standard.</b> A specification complete enough to implement from, with more than one independent
        implementation, changed in public under a stated process.
      </p>

      <h2 id="confusions">Distinctions worth keeping</h2>
      <p>
        A short list of pairs that get collapsed, and what is lost when they are.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead><tr><th>Often treated as one</th><th>Actually</th></tr></thead>
          <tbody>
            <tr><td>Model and agent</td><td>The model judges. The agent loops, acts, remembers, and is bounded.</td></tr>
            <tr><td>Harness and broker</td><td>The harness runs work. The broker decides where work goes.</td></tr>
            <tr><td>Tool and skill</td><td>A tool is reach. A skill is know-how. Neither substitutes for the other.</td></tr>
            <tr><td>Open source and open weights</td><td>The first is about the recipe. The second is about the artifact.</td></tr>
            <tr><td>Table format and catalog</td><td>The format defines a table. The catalog says which tables exist and who may read them.</td></tr>
            <tr><td>Arrow and Parquet</td><td>Memory versus storage. Complements, not alternatives.</td></tr>
            <tr><td>Retrieval and query</td><td>Finding text versus computing a number. Confusing them produces invented totals.</td></tr>
            <tr><td>Inspectable and auditable</td><td>Debugging now versus reconstructing months later. Different retention, integrity, and audience.</td></tr>
            <tr><td>Replaceable and portable</td><td>Can you swap the component versus does what you built move with you.</td></tr>
            <tr><td>Memory and data</td><td>What an agent learned versus facts the organization holds. Storing one as the other goes badly.</td></tr>
            <tr><td>Policy and prompt</td><td>Enforcement in code versus a request to a model. Only one is a boundary.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Most of the confused architecture arguments in this field resolve once one of these pairs is separated. If a
        discussion is going in circles, checking whether two things in one row are being treated as one is usually
        productive.
      </p>
    </>
  );
}
