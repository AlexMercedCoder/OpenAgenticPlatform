import type { Article } from './types';

export const article: Article = {
  slug: 'inspectable',
  title: 'Inspectable',
  kind: 'concept',
  layer: null,
  kicker: 'OPENNESS TEST / 02',
  summary: 'Whether a builder can understand what runs and why, without adding instrumentation first or guessing from behavior.',
  standfirst: 'Agentic systems fail in ways ordinary software does not. There is rarely a stack trace pointing at a line, only a sequence of individually reasonable steps that added up to something wrong. Reading that sequence is the only reliable way to improve the system, which makes inspectability a working requirement rather than a virtue.',
  keywords: ['observability', 'agent tracing', 'debugging agents', 'transparency', 'agent logs', 'inspectable systems'],
  sections: [
    { id: 'the-property', label: 'The property' },
    { id: 'two-kinds', label: 'Two kinds of inspectability' },
    { id: 'why-agents', label: 'Why agents need it more' },
    { id: 'the-trace', label: 'What a usable trace contains' },
    { id: 'reading', label: 'How to actually read one' },
    { id: 'worked-example', label: 'A trace read end to end' },
    { id: 'by-layer', label: 'What to inspect per layer' },
    { id: 'obstacles', label: 'What blocks inspectability' },
    { id: 'privacy', label: 'The privacy tension' },
    { id: 'tooling', label: 'What tooling helps' },
    { id: 'practices', label: 'Practices that preserve it' },
    { id: 'cost', label: 'What it costs' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'OpenTelemetry', href: 'https://opentelemetry.io', note: 'The general standard for traces and spans, increasingly used for agent instrumentation.' },
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'A described interface, which is a natural place to observe what an agent reaches for.' },
    { label: 'Apache Iceberg', href: 'https://iceberg.apache.org', note: 'Snapshot history makes what an agent read inspectable after the fact.' },
  ],
  related: ['auditable', 'replaceable', 'harnesses-and-brokers'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="the-property">The property</h2>
      <p>
        Inspectable asks whether a builder can understand what runs and why. Not eventually, after adding logging and
        redeploying, but now, for something that already happened.
      </p>
      <p>
        The bar is higher than it sounds. Many systems are inspectable in principle and not in practice, because the
        information exists somewhere and assembling it takes a day. A system is inspectable when the answer to what
        happened is available to someone who did not anticipate the question.
      </p>

      <h2 id="two-kinds">Two kinds of inspectability</h2>
      <p>
        The word covers two different properties that are worth separating, because a system can have one without
        the other.
      </p>
      <p>
        <b>Static inspectability</b> is whether you can understand how the system works by reading it. Open source
        gives you this. So does a published specification, a readable configuration format, and a small enough
        codebase.
      </p>
      <p>
        <b>Runtime inspectability</b> is whether you can see what a particular execution actually did. This is
        traces, logs, and recorded state. A closed-source component can be excellent at this, and an open source one
        can be terrible at it.
      </p>
      <p>
        Agentic systems need both and need the second more. Reading a harness&apos;s source tells you the shape of
        the loop. It does not tell you why this task produced that answer, because the answer depends on the exact
        context assembled, which existed only at runtime.
      </p>

      <h2 id="why-agents">Why agents need it more</h2>
      <p>
        Ordinary software fails at a line. You get a stack trace, you read the line, you understand the failure.
        Agentic systems do not work like that.
      </p>
      <p>
        An agent failure is usually a sequence of individually reasonable steps that added up to the wrong outcome. A
        search returned nothing, the agent interpreted empty as none exist rather than as query was wrong, and every
        subsequent step built on that. No component errored. Every step was defensible. The result is wrong.
      </p>
      <p>
        There are three consequences worth naming.
      </p>
      <p>
        The failure is usually much earlier than the visible symptom. Fixing the final step does nothing. Finding the
        step where reasoning diverged requires reading the sequence.
      </p>
      <p>
        Behavior is not reproducible from inputs alone. The same request twice can take different paths. You cannot
        re-run to debug; you have to have recorded it.
      </p>
      <p>
        Successful runs also contain information. Wasted steps, unnecessary tool calls, and context bloat never
        become visible bugs and entirely determine cost and latency. A system that only records failures is missing
        most of the improvement opportunity.
      </p>

      <h2 id="the-trace">What a usable trace contains</h2>
      <p>
        Most logging captures far less than agentic debugging requires. A trace that actually answers questions has
        five things, and the first is the one most often missing.
      </p>
      <ul>
        <li>
          <b>The exact context sent, per step.</b> Not the template. Not a summary. The actual assembled content. The
          most common debugging dead end is discovering that you logged the prompt template and the problem was in
          what filled it.
        </li>
        <li>
          <b>Every tool call with full arguments.</b> Including the ones that returned nothing, which are frequently
          where the divergence started.
        </li>
        <li>
          <b>Every result, including errors.</b> Truncated if necessary, with the truncation marked, because a
          silently truncated result looks like a short result.
        </li>
        <li>
          <b>Model, version, and parameters.</b> So behavior changes can be attributed rather than argued about.
        </li>
        <li>
          <b>Why the loop ended.</b> Completed, limit reached, policy denied, error, cancelled. This single field
          resolves a large share of confusion about what happened.
        </li>
      </ul>
      <p>
        Anything summarized before storage tends to omit precisely the detail that explains the failure. Summaries
        are useful for browsing and useless for diagnosis, so keep both if storage allows and never keep only the
        summary.
      </p>

      <h2 id="reading">How to actually read one</h2>
      <p>
        Having traces and reading traces are different things, and the second is a skill worth describing.
      </p>
      <p>
        Start at the end and work backwards to the first step where something the agent believed was not true. That
        is the divergence point, and it is usually several steps before the visible mistake.
      </p>
      <p>
        At that step, ask what the agent could have known. Frequently the answer is that a tool gave it a misleading
        result: an empty list where an error was appropriate, a truncated response with no indication of truncation,
        an ambiguous field name. The fix is in the tool, not the prompt, and it fixes the whole class rather than the
        instance.
      </p>
      <p>
        Then check the context at that step. Was the relevant fact present and buried? Was it absent? Was something
        contradictory also present? Context assembly problems and capability problems look identical from the
        outside and have completely different fixes.
      </p>
      <p>
        Finally, read some successful traces. This is the step teams skip and the one with the best return. Success
        traces show where an agent takes five steps to do something that should take two, which is invisible in
        outcome metrics and directly determines what the system costs.
      </p>
      <div className="kb-callout">
        <b>The habit worth building</b>
        <p>
          Read a sample of real traces every week, including successful ones. It is the single most reliable source
          of improvements to an agentic system, and it requires no tooling beyond the recording itself.
        </p>
      </div>

      <h2 id="worked-example">A trace read end to end</h2>
      <p>
        A concrete case makes the method clearer than a description of it. An agent is asked which enterprise
        accounts had a support escalation in the last month. It answers with a list of four accounts. A person
        familiar with the data says the number should be closer to fifteen.
      </p>
      <p>
        Reading the trace backwards:
      </p>
      <ol>
        <li>
          <b>Final step.</b> The agent summarized four rows into a clear answer. Nothing wrong here, and this is
          where most investigations start and stop.
        </li>
        <li>
          <b>Step before.</b> A query returned four rows. Also not obviously wrong.
        </li>
        <li>
          <b>Step before that.</b> The query filtered on a column called <code>tier</code> with the value
          <code>enterprise</code>. The trace shows the arguments, so this is visible.
        </li>
        <li>
          <b>Two steps earlier.</b> The agent listed the columns of the accounts table and saw <code>tier</code>. It
          did not sample the values. It assumed the value it needed was the word enterprise.
        </li>
        <li>
          <b>The divergence.</b> The actual values are <code>ENT</code>, <code>MID</code>, and <code>SMB</code>. Four
          rows happened to have a legacy value of <code>enterprise</code> from an old import. The query was valid,
          returned rows, and was wrong.
        </li>
      </ol>
      <p>
        Notice what the fix is not. It is not a better prompt telling the agent to be careful about column values. It
        is not a stronger model, which would have made the same assumption. The fix is a tool that returns distinct
        values alongside column names when describing a table, so the information is present rather than assumed.
        That change fixes every future instance of this class.
      </p>
      <p>
        Notice also what made the diagnosis possible: the tool arguments were recorded in full. A trace that logged
        only that a query tool was called, or that summarized the arguments, would have left the investigation at
        step two with nothing but speculation.
      </p>

      <h2 id="by-layer">What to inspect per layer</h2>
      <ul>
        <li>
          <b>Data and semantics.</b> Which tables and snapshots were read, what query was issued, what the semantic
          layer said a metric meant. Snapshot identifiers are the key detail, because they make a past read
          reproducible.
        </li>
        <li>
          <b>Models and routing.</b> Which model handled which step, what it was sent, what it returned, what it
          cost, whether a fallback occurred. Fallback should be an explicit field, not something inferred.
        </li>
        <li>
          <b>Harnesses and brokers.</b> The full loop: context, calls, results, decisions, limits hit, and the
          termination reason. This is where most of the diagnostic value lives.
        </li>
        <li>
          <b>Open standards.</b> Which skills activated, which profile revision was in force, which graph nodes ran
          and how their success conditions were evaluated. Skill activation in particular is worth logging, because
          a skill that never activates looks identical to one that did not help.
        </li>
      </ul>

      <h2 id="obstacles">What blocks inspectability</h2>
      <ul>
        <li><b>Prompt templates logged instead of assembled prompts.</b> The most common and most frustrating gap.</li>
        <li><b>Hosted components with no visibility.</b> A managed agent service that shows outcomes but not steps makes debugging guesswork.</li>
        <li><b>Aggressive summarization at write time.</b> Storage saved, diagnosis lost.</li>
        <li><b>Retention shorter than the questions.</b> A trace deleted after seven days cannot answer a question asked in week three.</li>
        <li><b>Traces not linked to outcomes.</b> A stream of model calls with no task identifier cannot answer what a complete task did or cost.</li>
        <li><b>Instrumentation added only after an incident.</b> The past cannot be instrumented, which is why this is a design decision rather than an operational one.</li>
      </ul>

      <h2 id="privacy">The privacy tension</h2>
      <p>
        This deserves direct treatment rather than a footnote, because the two goals genuinely conflict.
      </p>
      <p>
        A complete trace contains everything that flowed through the system: whatever tools returned, whatever the
        user said, whatever documents were read. That is a durable copy of potentially sensitive material, created as
        a side effect of debugging.
      </p>
      <p>
        Pretending otherwise leads to one of two bad outcomes. Either traces are stored casually and become an
        unmanaged data store, or inspectability is abandoned and the system becomes undebuggable.
      </p>
      <p>
        The workable middle involves treating the trace store as the sensitive data store it is: access controlled,
        retention defined deliberately rather than by default, and redaction applied to categories that are never
        needed for diagnosis such as credentials and payment details. Tiered retention helps too, keeping full
        traces briefly and structured metadata such as steps, tools, costs, and outcomes for much longer, since most
        long-range questions are answerable from metadata alone.
      </p>

      <h2 id="tooling">What tooling helps</h2>
      <p>
        Inspectability is mostly a recording discipline rather than a tooling problem, and a few capabilities make
        the recorded material much more usable.
      </p>
      <h3>A viewer that shows a run as a sequence</h3>
      <p>
        The single most useful tool is something that renders one task as an ordered list of steps with context,
        calls, and results expandable. Reading traces from a log aggregator designed for single-line events is
        possible and painful enough that people stop doing it.
      </p>
      <h3>Linking by task identifier</h3>
      <p>
        Model calls, tool calls, costs, and the final outcome joined by one identifier. This is a schema decision
        rather than a tool, and it determines whether questions about complete tasks are answerable at all.
      </p>
      <h3>Diffing two runs</h3>
      <p>
        When the same task succeeds once and fails once, the difference is the answer. Being able to compare two
        traces side by side turns a long investigation into a short one.
      </p>
      <h3>Standard tracing formats</h3>
      <p>
        Using an established tracing standard rather than a bespoke format means existing tooling works and the
        traces outlive the system that produced them. It also makes agent steps visible alongside the rest of an
        application&apos;s traces, which matters when the agent is one part of a larger request.
      </p>
      <h3>Sampling with full retention for failures</h3>
      <p>
        Keeping every trace at full detail is expensive at volume. Keeping all failures, a sample of successes, and
        metadata for everything gives most of the diagnostic value at a fraction of the storage, and it keeps the
        weekly reading habit affordable.
      </p>

      <h2 id="practices">Practices that preserve it</h2>
      <ol>
        <li><b>Record from the first day.</b> You cannot instrument the past, and the first weeks are when you learn the most.</li>
        <li><b>Log assembled context, not templates.</b> If you record one thing, record this.</li>
        <li><b>Give every run a task identifier.</b> So calls, tools, costs, and outcomes tie together.</li>
        <li><b>Record why the loop ended.</b> One field, disproportionate value.</li>
        <li><b>Make traces reachable by whoever debugs.</b> Inspectability that requires a data request is not inspectability.</li>
        <li><b>Prefer components you can see into.</b> When choosing between two otherwise similar options, visibility is a legitimate deciding factor.</li>
        <li><b>Read traces weekly.</b> The practice, not the tooling, is what produces improvements.</li>
      </ol>

      <h2 id="cost">What it costs and where to spend</h2>
      <p>
        Complete recording of every step of every run is not free, and treating the cost as negligible leads to
        systems that record everything for two weeks and then quietly reduce it to nothing.
      </p>
      <p>
        The costs are storage, which grows with context length and is dominated by the assembled prompts; write
        throughput, which matters at high volume; and the engineering time to build viewing tooling good enough that
        people actually read traces.
      </p>
      <p>
        The way to spend well is to separate what is expensive from what is valuable, because they are not the same
        material.
      </p>
      <ul>
        <li>
          <b>Metadata is cheap and answers most questions.</b> Steps taken, tools called, model used, tokens, latency,
          cost, termination reason. This is small, structured, and worth retaining for a long time.
        </li>
        <li>
          <b>Full context is expensive and only needed for diagnosis.</b> Keep it for a shorter window, and keep it
          longer for failures, which are the runs you will actually revisit.
        </li>
        <li>
          <b>Tool arguments and results sit in between.</b> Usually small, and disproportionately valuable, since
          most divergences are visible there. If you have to choose one thing beyond metadata, choose this.
        </li>
      </ul>
      <p>
        Sampling is the other lever. Full detail for every failure, a percentage of successes, and metadata for
        everything gives most of the diagnostic value at a fraction of the storage. The one thing not to sample is
        the failures, because a system that captures a random tenth of failures will not have the one you need.
      </p>

      <h2 id="not">What it is not</h2>
      <p>
        Inspectable is not the same as open source. Source tells you how the system works in general. It does not
        tell you what this run did.
      </p>
      <p>
        Inspectable is not the same as explainable. Seeing exactly what a model was sent and what it returned does
        not explain why it returned that. Inspectability gives you the inputs and outputs of each step, which is
        enough to debug the system even when the model itself remains opaque.
      </p>
      <p>
        Inspectable is not the same as auditable. Inspection serves the builder trying to improve the system. Audit
        serves someone reconstructing what happened for accountability. They overlap in the recording and differ in
        retention, integrity, and who is allowed to read.
      </p>
    </>
  );
}
