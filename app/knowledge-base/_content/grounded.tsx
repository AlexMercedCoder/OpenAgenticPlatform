import type { Article } from './types';

export const article: Article = {
  slug: 'grounded',
  title: 'Grounded',
  kind: 'concept',
  layer: null,
  kicker: 'OPENNESS TEST / 05',
  summary: 'Whether agents share durable data and semantic meaning, rather than recalling facts from training or inferring them from column names.',
  standfirst: 'A model that recalls a fact cannot tell you where it came from, when it was true, or whether it still is. A model that retrieves one can. Grounding is the difference between an answer that is plausible and one that is checkable.',
  keywords: ['grounding', 'RAG', 'retrieval', 'semantic layer', 'hallucination', 'agent data access', 'authoritative source'],
  sections: [
    { id: 'the-property', label: 'The property' },
    { id: 'two-halves', label: 'Grounding has two halves' },
    { id: 'failure-modes', label: 'How grounding fails' },
    { id: 'retrieval-vs-query', label: 'Retrieval and query are different tools' },
    { id: 'semantics', label: 'The part that gets skipped' },
    { id: 'discovery', label: 'Discovery is part of grounding' },
    { id: 'freshness', label: 'Freshness and trust level' },
    { id: 'context', label: 'Grounding is a context problem' },
    { id: 'evidence', label: 'Grounding produces evidence' },
    { id: 'practices', label: 'Practices that preserve it' },
    { id: 'economics', label: 'The economics changed' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Apache Ossie', href: 'https://ossie.apache.org', note: 'Semantic metadata work aimed at exactly the meaning half of this property.' },
    { label: 'Apache Iceberg', href: 'https://iceberg.apache.org', note: 'Snapshot history, which turns a retrieved fact into something reproducible.' },
    { label: 'Apache Polaris', href: 'https://polaris.apache.org', note: 'Catalog-mediated discovery, so agents find real tables rather than guessing.' },
    { label: 'Semantic Lakehouse', href: 'https://semanticlakehouse.com', note: 'Practitioner material on modeling meaning over open tables.' },
  ],
  related: ['data-and-semantics', 'apache-ossie', 'auditable'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="the-property">The property</h2>
      <p>
        Grounded asks whether agents work from durable data and shared meaning, rather than from recollection and
        inference.
      </p>
      <p>
        The distinction is sharper than it sounds. A model asked for last quarter&apos;s revenue can produce a number
        from training data, from a retrieved document, or from a query against an authoritative table. All three
        look identical in the answer. Only the third is checkable, current, and attributable.
      </p>

      <h2 id="two-halves">Grounding has two halves</h2>
      <p>
        Most discussion covers one half and treats the problem as solved. It is not.
      </p>
      <p>
        <b>The data half</b> is retrieval: getting real facts in front of the model rather than relying on what it
        remembers. This is the well-covered half, and it is genuinely necessary.
      </p>
      <p>
        <b>The meaning half</b> is knowing what those facts are. Which of four tables named something like revenue is
        authoritative. Whether this metric nets refunds. What grain a row represents. Whether this dataset is
        certified or exploratory.
      </p>
      <p>
        A system with excellent retrieval and no semantics produces answers that are technically derived from real
        data and still wrong. The agent found a table, queried it correctly, and reported a number from a staging
        table that nobody reconciles. Nothing malfunctioned. The system simply never recorded which table was the
        right one.
      </p>
      <div className="kb-callout">
        <b>The asymmetry that matters</b>
        <p>
          A human analyst facing four similar tables asks a colleague. An agent picks one, because it has to pick
          one. Agents remove the person who would have noticed the ambiguity, which is why writing meaning down
          became load-bearing rather than merely helpful.
        </p>
      </div>

      <h2 id="failure-modes">How grounding fails</h2>
      <p>
        The failures are specific enough to recognize, and most systems have several.
      </p>
      <h3>Recall presented as fact</h3>
      <p>
        The model answers from training. The answer is undated, unattributable, and possibly correct, which is worse
        than confidently wrong because it is harder to detect. This is the failure retrieval is meant to fix and does
        fix, when retrieval actually happens.
      </p>
      <h3>Retrieval answering the wrong kind of question</h3>
      <p>
        Similarity search finds text that resembles the question. Asked for a total, it finds a document mentioning
        totals, and the model produces a number that reads well and was not computed. Retrieval is for finding
        relevant text. Structured queries are for producing figures. Systems that blur this generate fluent summaries
        containing invented arithmetic.
      </p>
      <h3>Ambiguity resolved arbitrarily</h3>
      <p>
        Four plausible tables, one picked. The choice is invisible in the answer, so the ambiguity never surfaces.
      </p>
      <h3>Stale data reported as current</h3>
      <p>
        No freshness contract exists, so nothing signals that the month has not closed or that the pipeline last ran
        on Tuesday.
      </p>
      <h3>Meaning inferred from names</h3>
      <p>
        A column called <code>amount</code> is assumed to be the thing being measured. A column called
        <code>tier</code> is assumed to contain the word enterprise. Both assumptions are reasonable and both are
        frequently wrong, and neither produces an error.
      </p>
      <h3>Grain confusion</h3>
      <p>
        A table mixing order-level and customer-level rows, undocumented, aggregated as though uniform. The number is
        wrong by a factor nobody can predict.
      </p>

      <h2 id="retrieval-vs-query">Retrieval and query are different tools</h2>
      <p>
        This deserves its own treatment because conflating them is the most common architectural mistake in grounded
        systems.
      </p>
      <p>
        <b>Retrieval over documents</b> is good at finding relevant unstructured material: policies, past decisions,
        documentation, correspondence. It answers what does the company say about this. It is poor at exact figures,
        completeness, and anything requiring aggregation, because it returns fragments ranked by similarity rather
        than a computed result.
      </p>
      <p>
        <b>Structured query</b> is good at exact figures, filters, aggregation, and completeness. It answers how many
        and how much. It cannot find a policy statement or summarize a discussion.
      </p>
      <p>
        A mature system has both, with tools named clearly enough that the model chooses correctly. The design rule
        that follows is worth stating plainly: never let retrieval answer a question that requires a number. If an
        agent can produce a total from a document fragment, it eventually will, and the total will be wrong in a way
        nobody notices.
      </p>

      <h2 id="semantics">The part that gets skipped</h2>
      <p>
        Teams reliably invest in retrieval infrastructure and reliably underinvest in written meaning, then attribute
        the resulting errors to the model.
      </p>
      <p>
        Recording meaning does not require a large project. The high-value items are a short list:
      </p>
      <ul>
        <li><b>Which table is authoritative</b> for each entity, with the others explicitly marked as staging or exploratory.</li>
        <li><b>Metric definitions</b> for the ten to twenty metrics that appear in actual decisions, stated precisely enough to compute from.</li>
        <li><b>Relationships</b> between entities, including join keys and cardinality, because undeclared cardinality is the usual cause of double counting.</li>
        <li><b>Grain</b> per table, stated in one sentence: one row means one order line.</li>
        <li><b>Freshness expectations</b>, so an agent can tell whether a figure is final.</li>
        <li><b>Trust level</b>, so certified and exploratory are distinguishable.</li>
      </ul>
      <p>
        The economics of writing these changed when agents arrived. Previously a good column description might help a
        colleague someday. Now it is input to a decision on every query, which makes the return immediate and
        measurable.
      </p>

      <h2 id="discovery">Discovery is part of grounding</h2>
      <p>
        A step that gets skipped in most grounded systems: before an agent can retrieve a fact, it has to know that a
        source exists. How it finds out determines a surprising amount of the outcome.
      </p>
      <p>
        Three approaches are common and they differ substantially in how well they hold up.
      </p>
      <h3>A list in the prompt</h3>
      <p>
        Someone writes down the tables the agent should know about. This works on the day it is written and drifts
        immediately. New tables are invisible. Removed tables produce confusing failures. And the list is the same for
        every user, so it either exposes things some people should not see or omits things others need.
      </p>
      <h3>Unfiltered enumeration</h3>
      <p>
        The agent lists everything available. Current, and it produces a list far too long to choose from well, and
        it shows the agent sources it cannot actually read, which wastes steps on failed attempts.
      </p>
      <h3>Catalog-mediated, permission-filtered discovery</h3>
      <p>
        The agent asks the catalog what it can see, and receives a list already filtered by the caller&apos;s
        permissions. Current by construction, correctly scoped, and no separate list to maintain. This is why the
        catalog matters for grounding and not only for governance.
      </p>
      <p>
        The quality of what comes back matters as much as the mechanism. A list of table names is barely useful. A
        list with descriptions, grain, freshness, and trust level lets an agent choose correctly on the first
        attempt. This is the point where empty description fields stop being a documentation debt and become a
        correctness problem, because the description is the entire basis for the choice.
      </p>

      <h2 id="freshness">Freshness and trust level</h2>
      <p>
        Two fields do more work than their size suggests, and both are usually absent.
      </p>
      <p>
        <b>Freshness</b> lets an agent qualify an answer rather than assert it. A response saying that the month
        closes on the fifth business day and today is the third, so this figure is partial, is more useful than a
        confident number that turns out to be incomplete. It is also more useful than refusing to answer.
      </p>
      <p>
        <b>Trust level</b> lets an agent communicate provenance. This comes from a certified metric, or alternatively
        the only available definition is exploratory and should be treated as indicative. Systems that expose trust
        level produce answers people act on with appropriate confidence, which is a better outcome than answers
        presented with uniform certainty regardless of where they came from.
      </p>
      <p>
        Both fields also change agent behavior rather than only output. An agent that knows a source is exploratory
        can look for a better one. An agent that cannot tell the difference has no reason to try.
      </p>

      <h2 id="context">Grounding is a context problem</h2>
      <p>
        Retrieval gets facts. Context assembly determines whether the model uses them, and this is where grounded
        systems most often underperform their infrastructure.
      </p>
      <p>
        Three failures recur. Relevant material is present but buried in the middle of a very long context, where
        attention is weakest. Contradictory material is present with nothing indicating which is authoritative.
        Or so much is supplied that the specific fact needed is diluted by a hundred plausible neighbors.
      </p>
      <p>
        The corrective is selection rather than volume. Ten thousand well-chosen tokens beat a hundred thousand
        assembled by similarity threshold. Where contradictions exist, saying so explicitly, and stating which source
        is authoritative, works better than presenting both and hoping.
      </p>
      <p>
        This is also why a larger context window does not automatically improve grounding. Room to put more in is not
        the same as attention across all of it, and filling a window because it is available usually lowers quality
        while raising cost.
      </p>

      <h2 id="evidence">Grounding produces evidence</h2>
      <p>
        The under-appreciated benefit of grounding is that it makes an answer checkable, which is what connects this
        property to auditability.
      </p>
      <p>
        An agent that queried a table can record which table, which snapshot, and which query. Someone questioning
        the answer next quarter can read exactly the same data the agent read, without re-running a pipeline or
        trusting a log. Table formats with snapshot history give this almost for free, provided the harness records
        the identifier.
      </p>
      <p>
        An agent that answered from recall can record nothing. There is no source to point at.
      </p>
      <p>
        This is the strongest practical argument for grounding, and it is usually made in terms of accuracy instead.
        Accuracy improves, and the durable benefit is that a grounded answer can be defended a year later while a
        recalled one can only be repeated.
      </p>

      <h2 id="practices">Practices that preserve it</h2>
      <ol>
        <li><b>Give agents query tools, not just retrieval.</b> And name them clearly enough that the choice is obvious.</li>
        <li><b>Write descriptions as though they are interfaces.</b> Because in an agentic system they are.</li>
        <li><b>Define the metrics that appear in decisions.</b> Not all of them. The ones people argue about.</li>
        <li><b>Mark the authoritative source explicitly.</b> One table per entity, with the alternatives labelled.</li>
        <li><b>Expose freshness and trust level as tool output.</b> So the agent can qualify rather than assert.</li>
        <li><b>Return distinct values with column names.</b> A table description tool that shows what a column contains prevents a whole class of confidently wrong queries.</li>
        <li><b>Record what was read.</b> Table, snapshot, query. This is what makes the answer defensible later.</li>
      </ol>

      <h2 id="economics">The economics changed</h2>
      <p>
        Everything on this page was true before agents existed. Data teams have argued for authoritative sources,
        metric definitions, and documented grain for decades, usually without winning the argument. It is worth
        being clear about what actually changed, because it changes how the work gets funded.
      </p>
      <p>
        Previously, the benefit of writing meaning down was hypothetical and deferred. A good column description
        might help a colleague someday. Metric definitions might prevent an argument next quarter. The cost was
        immediate and the benefit was speculative, which is a losing position in any prioritization discussion.
      </p>
      <p>
        With agents in the system, the benefit is immediate and measurable. A column description is read on every
        query that touches that table. A metric definition determines whether an answer given this afternoon is
        correct. An authoritative-source marker is the difference between a right answer and a plausible one, today,
        in front of a customer.
      </p>
      <p>
        Three consequences follow that are worth carrying into planning.
      </p>
      <p>
        <b>The work can be justified on current value.</b> Not on future maintainability, which nobody funds, but on
        the accuracy of a system that is running now.
      </p>
      <p>
        <b>It can be scoped by usage.</b> Look at what agents actually query and describe those tables first. This is
        a much better prioritization signal than a documentation project that tries to cover everything and finishes
        nothing.
      </p>
      <p>
        <b>It has a feedback loop.</b> Agent errors point directly at missing semantics. An agent that picked the
        wrong table tells you which pair of tables needs disambiguating. Nothing in the pre-agent world provided that
        signal, which is why documentation efforts had no way to know whether they were working.
      </p>

      <h2 id="not">What it is not</h2>
      <p>
        Grounded is not the same as correct. An agent can retrieve the right data and reason about it badly.
        Grounding removes one large class of error, not all of them.
      </p>
      <p>
        Grounded is not the same as having a vector database. Retrieval is one mechanism and it does not cover exact
        figures, aggregation, or completeness. A system with only semantic search over documents is partly grounded
        at best.
      </p>
      <p>
        Grounded is not a substitute for good data. A semantic layer over tables that mix grains and encode meaning
        in string columns produces an accurate description of a mess. Modeling clarifies; it does not repair.
      </p>
    </>
  );
}
