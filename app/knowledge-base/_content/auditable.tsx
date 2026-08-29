import type { Article } from './types';

export const article: Article = {
  slug: 'auditable',
  title: 'Auditable',
  kind: 'concept',
  layer: null,
  kicker: 'OPENNESS TEST / 06',
  summary: 'Whether people can reconstruct decisions and outcomes after the fact, months later, from records rather than from memory.',
  standfirst: 'Auditability is the property you only need once and cannot acquire retroactively. When someone asks what an agent did in March, the answer is either in a record made at the time or it does not exist.',
  keywords: ['auditability', 'agent audit trail', 'accountability', 'provenance', 'evidence', 'compliance', 'agent records'],
  sections: [
    { id: 'the-property', label: 'The property' },
    { id: 'versus-inspectable', label: 'How it differs from inspectable' },
    { id: 'the-questions', label: 'The questions an audit answers' },
    { id: 'what-to-record', label: 'What has to be recorded' },
    { id: 'delivery', label: 'Audit is a delivery problem' },
    { id: 'provenance', label: 'Provenance and artifacts' },
    { id: 'identity', label: 'Attribution requires identity' },
    { id: 'scenario', label: 'A question arriving nine months later' },
    { id: 'retention', label: 'Retention as a deliberate decision' },
    { id: 'integrity', label: 'Integrity of the record' },
    { id: 'practices', label: 'Practices that preserve it' },
    { id: 'who-reads', label: 'Designing for who will read it' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Apache Iceberg', href: 'https://iceberg.apache.org', note: 'Snapshot history, which is what makes a past read reproducible rather than merely logged.' },
    { label: 'Apache Polaris', href: 'https://polaris.apache.org', note: 'Catalog access records, which are the hardest part of the picture to reconstruct otherwise.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'Revisions, digests, and proposal records, which together document how an agent authority changed.' },
    { label: 'OpenTelemetry', href: 'https://opentelemetry.io', note: 'A standard trace format, which keeps records readable after the tooling that made them is retired.' },
  ],
  related: ['inspectable', 'bounded', 'grounded'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="the-property">The property</h2>
      <p>
        Auditable asks whether people can reconstruct decisions and outcomes. Not immediately, by asking whoever was
        involved, but months later, from records, by someone who was not there.
      </p>
      <p>
        It is the property with the most asymmetric cost profile in the openness test. Building it costs a modest
        amount of ongoing discipline. Not having it costs nothing at all until the day it costs a great deal, and on
        that day it cannot be acquired.
      </p>

      <h2 id="versus-inspectable">How it differs from inspectable</h2>
      <p>
        The two overlap in the recording and differ in almost everything else, and conflating them produces systems
        that are debuggable and not accountable.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead><tr><th></th><th>Inspectable</th><th>Auditable</th></tr></thead>
          <tbody>
            <tr><td>Serves</td><td>The builder improving the system</td><td>Someone establishing what happened</td></tr>
            <tr><td>Timeframe</td><td>Now, or this week</td><td>Months to years</td></tr>
            <tr><td>Retention</td><td>Days is often enough</td><td>As long as questions can be asked</td></tr>
            <tr><td>Integrity</td><td>Not usually a concern</td><td>The record must be trustworthy</td></tr>
            <tr><td>Audience</td><td>Engineers</td><td>Reviewers, auditors, affected people</td></tr>
            <tr><td>Failure</td><td>Debugging is slow</td><td>A question cannot be answered at all</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        A system can have excellent traces with a seven-day retention and be entirely unauditable. That combination
        is common, and it looks fine until the first question arrives about something from last quarter.
      </p>

      <h2 id="the-questions">The questions an audit answers</h2>
      <p>
        Designing for auditability is easier when you know what will be asked. The questions are predictable.
      </p>
      <ul>
        <li><b>What did this agent do?</b> The complete sequence, not a summary.</li>
        <li><b>On whose behalf?</b> Which person or process requested it, and under whose authority it ran.</li>
        <li><b>What was it permitted to do?</b> The authority in force at that moment, not the current one.</li>
        <li><b>Who approved the parts that required approval?</b> And what exactly did they see when they approved?</li>
        <li><b>Where did this number come from?</b> Which source, which version of it.</li>
        <li><b>Why did it decide that?</b> What was in front of the model when it chose.</li>
        <li><b>What changed as a result?</b> Which systems, which records.</li>
        <li><b>Has this happened before?</b> Which requires records that span more than one incident.</li>
      </ul>
      <p>
        Every one of these has to be answerable from records made at the time. None can be reconstructed by asking
        the system to explain itself afterwards, because a model asked to explain a past decision produces a
        plausible rationalization rather than a record.
      </p>

      <h2 id="what-to-record">What has to be recorded</h2>
      <p>
        The list is longer than typical logging and each item earns its place by mapping onto one of the questions
        above.
      </p>
      <ul>
        <li><b>The request and the requester.</b> What was asked, by whom, through which channel.</li>
        <li><b>The identity and authority in force.</b> Which agent, which profile revision, which permissions. Recording the revision matters because permissions change.</li>
        <li><b>Every step.</b> Context sent, tool called, arguments, result, including failures.</li>
        <li><b>Model and version per call.</b> So behavior can be attributed when a provider changes something.</li>
        <li><b>Data provenance.</b> Which tables, which snapshots, which queries. Snapshot identifiers turn a claim into something reproducible.</li>
        <li><b>Approvals.</b> What was proposed, what was displayed, who decided, when, bound to that specific action.</li>
        <li><b>Changes made.</b> What was written where, ideally with a way to identify the resulting records.</li>
        <li><b>Termination reason.</b> Completed, limit reached, denied, cancelled, errored.</li>
        <li><b>Artifacts produced.</b> With a checksum, so a document found later can be tied back to the run that made it.</li>
      </ul>

      <h2 id="delivery">Audit is a delivery problem</h2>
      <p>
        Treating audit as logging is the most common way it fails quietly, and the distinction is worth being precise
        about.
      </p>
      <p>
        A log is written locally. It is lost when the machine is, ignored when nobody aggregates it, and truncated
        when a process exits unexpectedly. None of those failures announce themselves.
      </p>
      <p>
        An audit record has to arrive somewhere durable, which makes it a delivery problem with the properties
        delivery problems have: buffering, retry, backpressure, and verification. A pipeline that stopped working
        three weeks ago is worse than none at all, because it produces confidence without coverage.
      </p>
      <p>
        The practical requirements follow directly. Bounded buffering, so a delivery outage does not consume the
        machine. Retry, so a transient failure does not lose records. Diagnostics, so someone can check that delivery
        is healthy. And an explicit flush, so a shutting-down process does not discard what it has not yet sent.
      </p>

      <h2 id="provenance">Provenance and artifacts</h2>
      <p>
        Traces record what an agent did. Provenance connects what an agent did to the thing that resulted, and it is
        the direction the question is usually asked from.
      </p>
      <p>
        Generated artifacts leave the system. A document produced by an agent gets emailed, filed, and cited. Six
        months later someone is looking at that document and wants to know where it came from. A trace does not help
        unless something connects the two.
      </p>
      <p>
        A provenance record bound by checksum closes that loop. Given the artifact, you can identify the run that
        produced it, the sources it drew on, and the approvals that preceded it. Without one, the origin of an
        artifact is whatever someone remembers.
      </p>
      <p>
        The same reasoning applies to data written by agents. A row inserted into a table should be traceable to the
        run that inserted it, which usually means carrying a run identifier into the write rather than reconstructing
        it from timestamps afterwards.
      </p>

      <h2 id="identity">Attribution requires identity</h2>
      <p>
        An audit trail that attributes everything to a service account has recorded that something happened and not
        who is accountable for it.
      </p>
      <p>
        This is the most common structural gap. Agents run with their own credentials, so every action is attributed
        to the agent. The person who asked, the authority under which the work ran, and the reason the work was
        permitted are all absent, and none can be added later.
      </p>
      <p>
        Carrying a real principal through the run fixes it, and it also makes the record useful to people outside
        engineering. An audit trail naming people and roles can be read by whoever is responsible for the process. One
        naming service accounts requires a translation step that only the engineering team can perform, which
        undermines the point of having it.
      </p>

      <h2 id="scenario">A question arriving nine months later</h2>
      <p>
        The abstract case for auditability is unpersuasive until you walk through a concrete question, so here is
        one that is entirely ordinary.
      </p>
      <p>
        A customer disputes a pricing decision made nine months ago. The decision was produced by an agent that
        analyzed usage data and applied a discount tier. The customer says the tier was wrong. Nobody involved at the
        time still works on the team.
      </p>
      <p>
        In a system without auditability, the reconstruction goes like this. Traces were retained for thirty days, so
        the run is gone. The billing record shows the tier applied and not why. The data the agent read has been
        updated many times since, so re-running the analysis produces a different answer, which proves nothing. The
        best available response is that the system applied its rules correctly, which is an assertion rather than an
        answer, and it is the answer that loses disputes.
      </p>
      <p>
        In a system with auditability, the same reconstruction is a lookup. The run identifier is on the billing
        record. The record shows the request, the requester, the agent and profile revision in force, the tables and
        snapshots read, the query issued, the tier computed, and the approval that released it, with what the
        approver saw. Reading the snapshot shows exactly the data the agent had. If the tier was wrong, the record
        shows whether the error was in the data, the definition, or the decision, which determines who owes what.
      </p>
      <p>
        Notice that the second version required nothing exotic. It required a run identifier carried into the write,
        a snapshot identifier recorded with the read, an approval bound to the action, and retention matched to the
        period over which disputes arise. Each of those is a small decision made at build time. None of them can be
        made afterwards.
      </p>

      <h2 id="retention">Retention as a deliberate decision</h2>
      <p>
        Retention is where auditability is usually lost, and it is lost by default rather than by decision.
      </p>
      <p>
        Storage defaults are set for operational logging, typically days or weeks. Audit questions arrive on a
        different timescale entirely: a quarter-end review, an annual audit, a dispute about something from last
        year. A record deleted on day thirty cannot answer a question asked on day ninety.
      </p>
      <p>
        Retention also pulls against privacy, and pretending otherwise leads to bad outcomes in both directions. A
        complete record contains everything that flowed through the system, including sensitive material a tool
        returned.
      </p>
      <p>
        A workable resolution is tiering. Keep full detail for a period matched to debugging needs. Keep structured
        metadata, meaning who, what, when, which sources, which approvals, and what changed, for as long as questions
        can plausibly be asked. Most audit questions are answerable from metadata, and metadata is far less sensitive
        than full content.
      </p>

      <h2 id="integrity">Integrity of the record</h2>
      <p>
        For some purposes it matters that a record has not been altered, and this requirement is easy to miss because
        it does not arise in ordinary logging.
      </p>
      <p>
        Where it matters, the mechanisms are ordinary: append-only storage, access control separating who can write
        records from who can modify them, checksums over artifacts, and delivery to a system the agent runtime cannot
        edit. Versioned record formats help too, so a change in what is recorded is visible rather than silent.
      </p>
      <p>
        The judgment call is how far to go. Full tamper-evidence is real engineering effort and unnecessary for most
        internal use. Delivering records to a separate system the agent cannot write to is a large fraction of the
        benefit for a small fraction of the cost, and it is worth doing by default.
      </p>

      <h2 id="practices">Practices that preserve it</h2>
      <ol>
        <li><b>Record from the first day.</b> The past cannot be instrumented. This is the one item with no recovery.</li>
        <li><b>Carry a real identity through every run.</b> Attribution to a service account is not attribution.</li>
        <li><b>Record snapshot identifiers with data reads.</b> The cheapest way to make an answer reproducible.</li>
        <li><b>Bind approvals to specific actions.</b> Including what was displayed, so the approval covers what was actually seen.</li>
        <li><b>Deliver rather than log.</b> With buffering, retry, and a way to verify delivery is working.</li>
        <li><b>Attach provenance to artifacts.</b> So a document found later can be traced back.</li>
        <li><b>Set retention deliberately, in tiers.</b> Full detail briefly, metadata for as long as questions can be asked.</li>
        <li><b>Test it.</b> Pick a task from three months ago and try to answer the eight questions. What you cannot answer is your gap.</li>
      </ol>

      <h2 id="who-reads">Designing for who will read it</h2>
      <p>
        Audit records are usually designed by engineers and read by people who are not engineers, and that mismatch
        is why many audit trails technically contain the answer and cannot produce it.
      </p>
      <p>
        The likely readers are worth thinking about explicitly, because they need different things.
      </p>
      <h3>The process owner</h3>
      <p>
        Someone responsible for the work the agent was doing, checking whether it went correctly. They need the
        sequence in business terms: what was requested, what the agent concluded, what it changed. They do not need
        token counts, and they cannot use a record that names service accounts instead of people.
      </p>
      <h3>The investigator</h3>
      <p>
        Someone establishing what happened in a specific case, often under time pressure, often months later. They
        need to find the run from an external artifact, such as a document or a database row, which means the
        identifier has to travel with the output rather than living only in the trace store.
      </p>
      <h3>The reviewer of authority</h3>
      <p>
        Someone asking whether the agent should have been able to do this at all. They need the permissions in force
        at the time, not the current ones, and the approvals with what the approver actually saw.
      </p>
      <h3>The engineer</h3>
      <p>
        The reader the records are usually designed for, needing full technical detail. Well served by most
        implementations, and the only one who is.
      </p>
      <p>
        The practical implication is to produce a readable summary alongside the technical record, generated at the
        time from the structured data rather than written later. A run summary naming the requester, the action, the
        sources, the approvals, and the outcome, in plain language, is what makes the record usable by three of the
        four audiences. It costs very little and it is the difference between a trail that answers questions and one
        that requires an engineer to interpret every time anyone asks.
      </p>

      <h2 id="not">What it is not</h2>
      <p>
        Auditable is not the same as compliant. Compliance regimes have specific requirements that auditability
        supports and does not satisfy on its own.
      </p>
      <p>
        Auditable is not the same as explainable. A record shows what a model was sent and what it returned. It does
        not explain why the model produced that output. Asking a model to explain a past decision produces a
        plausible story rather than a record, and treating that story as an audit artifact is worse than having
        nothing, because it looks like an answer.
      </p>
      <p>
        Auditable is not free, and its cost is ongoing rather than one-time: storage, delivery infrastructure, and
        the discipline of recording things nobody has asked for yet. That is the trade, and the reason to make it is
        that the alternative is not a smaller record but no answer at all.
      </p>
    </>
  );
}
