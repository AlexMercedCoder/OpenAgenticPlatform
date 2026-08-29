import type { Article } from './types';

export const article: Article = {
  slug: 'data-and-semantics',
  title: 'Data and semantics',
  kind: 'layer',
  layer: null,
  kicker: '01 / FOUNDATION',
  summary: 'The layer that decides what an agent can know: how records are laid out, stored, versioned, governed, and given meaning.',
  standfirst: 'The bottom layer of an open agentic platform decides what an agent is able to know. It covers how records are arranged in memory, how they are stored on disk, how tables behave as they change, who is allowed to read them, and what the fields actually mean.',
  keywords: ['data layer for AI agents', 'semantic layer', 'Apache Iceberg', 'Apache Arrow', 'Apache Parquet', 'data catalog', 'agent grounding'],
  sections: [
    { id: 'what-the-layer-covers', label: 'What the layer covers' },
    { id: 'why-it-comes-first', label: 'Why it comes first' },
    { id: 'five-jobs', label: 'The five jobs of this layer' },
    { id: 'dividing-the-work', label: 'How the formats divide the work' },
    { id: 'catalog', label: 'The catalog as control point' },
    { id: 'semantics', label: 'Semantics, the part that gets skipped' },
    { id: 'agents-change-requirements', label: 'What changes when agents read' },
    { id: 'failure-modes', label: 'Common failure modes' },
    { id: 'evaluating', label: 'How to evaluate this layer' },
    { id: 'worked-example', label: 'A worked example' },
    { id: 'sequence', label: 'A build sequence that works' },
    { id: 'connections', label: 'How it feeds the rest of the stack' },
    { id: 'not', label: 'What this layer is not' },
  ],
  learnMore: [
    { label: 'Apache Arrow', href: 'https://arrow.apache.org', note: 'Specification, implementations in many languages, and the Flight and ADBC transport work.' },
    { label: 'Apache Parquet', href: 'https://parquet.apache.org', note: 'File format specification, encodings, and the thrift metadata definitions.' },
    { label: 'Apache Iceberg', href: 'https://iceberg.apache.org', note: 'Table specification, the REST catalog protocol, and engine integration docs.' },
    { label: 'Apache Polaris', href: 'https://polaris.apache.org', note: 'An open catalog implementation for Iceberg REST clients, including access control and credential handling.' },
    { label: 'Apache Ossie', href: 'https://ossie.apache.org', note: 'Semantic metadata work at the Apache Software Foundation. Check the project site for current status.' },
    { label: 'Open Data Lakehouse', href: 'https://opendatalakehouse.com', note: 'Longer-form background on lakehouse architecture, written for practitioners.' },
    { label: 'Semantic Lakehouse', href: 'https://semanticlakehouse.com', note: 'Material focused specifically on modeling meaning on top of open tables.' },
  ],
  related: ['models-and-routing', 'harnesses-and-brokers', 'open-standards'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-the-layer-covers">What the layer covers</h2>
      <p>
        Every agentic system eventually asks a question that only data can answer. How many accounts churned last
        quarter. Which orders are still unshipped. What the current price is. What a customer already told support.
        The quality of that answer is decided long before a model sees a prompt, and it is decided by this layer.
      </p>
      <p>
        Data and semantics is the foundation of the open agentic platform because it holds the facts an agent works
        from. It has two halves that people often collapse into one. The data half is mechanical: bytes, files,
        columns, tables, snapshots, permissions. The semantic half is human: what a column is called, what it counts,
        which definition of revenue applies, and which of four tables named something like customer is the one the
        finance team actually trusts.
      </p>
      <p>
        A system can be excellent at the first half and useless at the second. Storing a petabyte in open formats
        does not tell an agent that <code>rev_net_adj</code> excludes returns processed after the close date. Meaning
        has to be written down somewhere, in a form both people and software can read, or every consumer of the data
        reinvents it from context clues.
      </p>

      <h2 id="why-it-comes-first">Why it comes first</h2>
      <p>
        There is a practical reason this layer sits at the bottom of the stack rather than off to the side. The three
        layers above it all inherit its constraints.
      </p>
      <p>
        Models inherit them because retrieval quality bounds answer quality. A well-chosen model reasoning over a
        stale, ambiguous table produces confident errors. Harnesses inherit them because an agent that cannot check a
        fact has to guess, and guessing is where autonomy turns expensive. Standards inherit them because portability
        of an agent is worth very little if the data it depends on cannot move with it.
      </p>
      <p>
        There is also a sequencing argument. Model choices change every few months. Harness choices change every year
        or so. Storage and table decisions tend to last five to ten years, because migrating them means rewriting
        pipelines, retraining teams, and re-validating every downstream report. Putting the longest-lived decision at
        the bottom and the shortest-lived at the top is simply good architecture. It means the parts that churn can
        churn without disturbing the parts that should not.
      </p>
      <div className="kb-callout">
        <b>The practical version</b>
        <p>
          If an agent gives a wrong answer, the first question is not which model was used. It is whether the agent
          could reach a correct, current, unambiguous version of the fact at all. Very often it could not.
        </p>
      </div>

      <h2 id="five-jobs">The five jobs of this layer</h2>
      <p>
        It helps to separate the layer into jobs rather than products. Products change. The jobs do not.
      </p>
      <h3>1. Represent records in memory</h3>
      <p>
        When a query engine, a Python process, and a Java service all need the same batch of rows, something has to
        define what those rows look like in RAM. Historically each system had its own answer, so every hop between
        systems paid a serialization cost. A shared in-memory format removes that cost and lets processes hand data to
        each other without translating it first. This is Apache Arrow&apos;s job.
      </p>
      <h3>2. Store records durably</h3>
      <p>
        Memory is temporary. Data has to land in files that compress well, skip cleanly, and survive being read years
        later by software that does not exist yet. Columnar file formats do this by grouping values of the same
        column together, which compresses better and lets readers skip whole chunks that cannot match a filter. This
        is Apache Parquet&apos;s job.
      </p>
      <h3>3. Make a pile of files behave like a table</h3>
      <p>
        Files alone are not a table. A table has a schema that can change without rewriting history, a notion of what
        the current state is, atomic commits so readers never see half of a write, and a record of what it looked
        like last Tuesday. Table formats add that behavior on top of files in object storage. This is Apache
        Iceberg&apos;s job.
      </p>
      <h3>4. Decide who may read and write what</h3>
      <p>
        Once tables exist, something has to list them, resolve names to locations, and enforce who can touch them.
        That component is the catalog, and it is the single most important control point in the layer. It is also the
        place where agent access is most cleanly governed. This is what Apache Polaris and other catalog
        implementations do.
      </p>
      <h3>5. Record what the data means</h3>
      <p>
        Finally, someone has to say that this table is the authoritative order table, that this metric is defined this
        way, that these two columns are the join keys, and that this dataset is not safe for customer-facing answers.
        Semantic metadata is the least standardized of the five jobs and the one that most directly determines
        whether an agent is useful. Apache Ossie is one effort in this space, and semantic layers built into query
        engines are another.
      </p>

      <h2 id="dividing-the-work">How the formats divide the work</h2>
      <p>
        People new to this stack often ask why there are three formats where one might do. The answer is that they
        operate at different lifetimes and different distances from the CPU.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead>
            <tr><th>Concern</th><th>Arrow</th><th>Parquet</th><th>Iceberg</th></tr>
          </thead>
          <tbody>
            <tr><td>Where it lives</td><td>Memory and the wire</td><td>Object storage and disk</td><td>Metadata about files</td></tr>
            <tr><td>Optimized for</td><td>Fast access, zero copy</td><td>Small size, good scans</td><td>Correct behavior over time</td></tr>
            <tr><td>Lifetime</td><td>Milliseconds</td><td>Years</td><td>Years, with history</td></tr>
            <tr><td>Answers</td><td>How do processes share rows</td><td>How do we store rows cheaply</td><td>What is the table right now</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The layering is deliberate. An Iceberg table points at Parquet files. A query engine reads those Parquet files
        and decodes them into Arrow batches. An agent tool then receives Arrow batches or a small result set derived
        from them. Each format is replaceable in principle, which is exactly the property the openness test looks for,
        and each is boring in the good sense: widely implemented, specified in public, and not owned by the vendor
        selling you a query engine.
      </p>

      <h2 id="catalog">The catalog as control point</h2>
      <p>
        If you only get one thing right in this layer, make it the catalog. The catalog is where table names resolve,
        where permissions are enforced, and where credentials are handed out. That makes it the natural boundary for
        agent access.
      </p>
      <p>
        Consider the alternative. If every agent tool holds its own storage credentials, then every tool is a separate
        security perimeter, revocation means chasing configuration files, and no one can answer the question of what
        an agent actually read. If instead every tool goes through a catalog that authenticates the caller and vends
        short-lived, scoped credentials, then access is centrally visible, centrally revocable, and centrally
        auditable.
      </p>
      <p>
        This matters more for agents than for people. A human analyst reads a handful of tables a day and remembers
        doing it. An agent can touch hundreds of objects in a minute, at three in the morning, on behalf of a request
        that no one is watching. Central credential handling is the difference between an incident you can
        reconstruct and one you cannot.
      </p>
      <p>
        The catalog is also where a shared protocol pays off. The Iceberg REST catalog specification means an engine,
        a notebook, and an agent tool can all speak to the same catalog without vendor-specific clients. That is the
        interoperability property applied to governance rather than to storage.
      </p>

      <h2 id="semantics">Semantics, the part that gets skipped</h2>
      <p>
        Teams reliably invest in storage and reliably underinvest in meaning, then wonder why their agents produce
        answers that are technically derived from real data and still wrong.
      </p>
      <p>
        The failure is easy to describe. An agent is asked for last month&apos;s revenue. It finds four tables whose
        names contain the word revenue. It picks one, because it has to pick one. The table it picked is a staging
        table refreshed hourly and not reconciled against returns. The number it reports is close enough to look
        right and wrong enough to matter. No component in the system did anything incorrect. The system simply never
        recorded which table was authoritative.
      </p>
      <p>
        A semantic layer fixes this by making meaning a first-class artifact rather than tribal knowledge. In
        practical terms it records things like:
      </p>
      <ul>
        <li><b>Canonical entities.</b> There is one definition of customer, and these tables are its physical expression.</li>
        <li><b>Metric definitions.</b> Net revenue means gross minus returns minus discounts, computed on the close-date basis.</li>
        <li><b>Relationships.</b> Orders join to customers on this key, and the relationship is many to one.</li>
        <li><b>Trust level.</b> This dataset is certified for external reporting; this other one is exploratory.</li>
        <li><b>Freshness and grain.</b> This table is daily, refreshed by 6am, and one row means one order line.</li>
      </ul>
      <p>
        Humans work around missing semantics by asking a colleague. Agents cannot, so they substitute a guess. The
        payoff of writing this down is therefore much larger in an agentic system than it was in a purely human
        analytics stack, which is why semantic metadata has moved from a nice-to-have to a load-bearing part of the
        architecture.
      </p>

      <h2 id="agents-change-requirements">What changes when agents read</h2>
      <p>
        Most of this layer predates agents by a decade. The formats did not change. The requirements around them did,
        in four specific ways.
      </p>
      <h3>Access patterns get wider and less predictable</h3>
      <p>
        A dashboard queries the same six tables forever. An agent explores. It lists what exists, samples, checks a
        related table, and follows a hunch. That means metadata operations matter as much as scan performance, and it
        means broad read permissions are dangerous in a way that narrow, purpose-built service accounts were not.
      </p>
      <h3>Descriptions become part of the interface</h3>
      <p>
        Column comments and table descriptions used to be documentation. Now they are input. An agent choosing
        between two tables reads their descriptions the way a developer reads a function signature. Empty description
        fields are no longer a documentation debt, they are a correctness problem.
      </p>
      <h3>Reads need to be attributable</h3>
      <p>
        When an agent produces an answer, someone will eventually ask where the number came from. Being able to point
        at a table, a snapshot, and a timestamp turns an unverifiable claim into a checkable one. Table formats that
        keep snapshot history give you this almost for free, provided the harness records which snapshot it read.
      </p>
      <h3>Write paths need much stricter boundaries</h3>
      <p>
        Reading badly produces a wrong answer. Writing badly produces a wrong dataset that other systems then treat as
        truth. Most teams start with read-only agent access to this layer for good reason, and add write paths only
        behind explicit approval, to specific tables, with the change recorded.
      </p>

      <h2 id="failure-modes">Common failure modes</h2>
      <ul>
        <li>
          <b>Open formats, closed catalog.</b> The tables are Iceberg and the files are Parquet, but the only catalog
          that can read them is proprietary and speaks a private protocol. The data is portable in theory and stuck
          in practice.
        </li>
        <li>
          <b>Credentials scattered across tools.</b> Each agent tool holds long-lived storage keys. Nothing can be
          revoked quickly and nothing can be audited centrally.
        </li>
        <li>
          <b>Semantics living in a BI tool.</b> Metric definitions exist, but only inside a dashboard product, so
          agents and pipelines cannot reach them and quietly define their own.
        </li>
        <li>
          <b>No freshness contract.</b> Nothing states when a table is expected to be current, so agents report stale
          numbers without any signal that they are stale.
        </li>
        <li>
          <b>Everything is one grain.</b> Tables mix order-level and customer-level rows without documenting which is
          which, so aggregations double count.
        </li>
        <li>
          <b>Snapshot history turned off.</b> Retention is set aggressively to save storage, and with it goes the
          ability to reconstruct what an agent saw last week.
        </li>
      </ul>

      <h2 id="evaluating">How to evaluate this layer</h2>
      <p>
        A short set of questions separates a foundation that will hold from one that will not. Each maps to one of the
        six properties in the openness test.
      </p>
      <ul>
        <li><b>Replaceable.</b> If you removed your query engine tomorrow, could a different engine read the same tables without a migration project?</li>
        <li><b>Inspectable.</b> Can an engineer read the table specification and the catalog API, and understand what the system is doing without a support contract?</li>
        <li><b>Portable.</b> Can the tables, the catalog entries, and the semantic definitions move to another environment, including a different cloud?</li>
        <li><b>Bounded.</b> Does agent access go through a credential-vending catalog with scoped, expiring grants, or through shared keys?</li>
        <li><b>Grounded.</b> Is there a written, machine-readable answer to what a metric means and which table is authoritative?</li>
        <li><b>Auditable.</b> Can you reconstruct, for a given answer produced last month, which tables and snapshots it came from?</li>
      </ul>
      <p>
        Answering no to any of these is not fatal. Answering no to most of them means the layers above will spend
        their effort compensating for the foundation instead of doing their own work.
      </p>

      <h2 id="worked-example">A worked example</h2>
      <p>
        Abstract layers are easier to judge against a concrete request. Take a single question asked of an agent by a
        regional sales manager: which of my accounts had a drop in monthly spend of more than twenty percent last
        month, and did any of them file a support ticket in the same period.
      </p>
      <p>
        In a system with a weak foundation, the agent does what it can. It searches available tables by name, finds
        something plausible, guesses that a column called <code>amount</code> is the one that means spend, has no way
        to know whether the month is closed, cannot tell which accounts belong to this manager, and cannot join
        support tickets to accounts because the key relationship is undocumented. It returns a list. The list is
        partly right. Nobody can tell which part.
      </p>
      <p>
        In a system with a solid foundation, the same request resolves differently at each step:
      </p>
      <ul>
        <li>
          <b>Authorization happens first.</b> The agent presents the manager&apos;s identity to the catalog and
          receives scoped, expiring credentials that already exclude regions this person cannot see. The filter is
          not something the agent has to remember to apply.
        </li>
        <li>
          <b>Table selection is decided, not guessed.</b> The semantic layer names one authoritative account revenue
          table and marks the others as staging. There is nothing to choose between.
        </li>
        <li>
          <b>Metric meaning is explicit.</b> Monthly spend has a written definition, including whether refunds are
          netted and on what date basis. The agent does not invent one.
        </li>
        <li>
          <b>Freshness is checkable.</b> The table declares that the month closes on the fifth business day. If the
          request arrives on the third, the agent can say the month is not closed rather than reporting a partial
          figure as final.
        </li>
        <li>
          <b>Joins are documented.</b> The relationship between accounts and support tickets is recorded with its
          key and its cardinality, so the join is correct and does not double count.
        </li>
        <li>
          <b>The read is recorded.</b> The answer carries the table names and the snapshot identifiers it came from,
          so a skeptical reader can reconstruct it next quarter.
        </li>
      </ul>
      <p>
        Notice how little of this involves the model. The difference between the two outcomes is almost entirely a
        property of the layer underneath. This is the practical case for spending real effort here before spending it
        on prompt engineering.
      </p>

      <h2 id="sequence">A build sequence that works</h2>
      <p>
        Teams that get this layer right tend to move in roughly the same order, and it is not the order most teams
        reach for first.
      </p>
      <ol>
        <li>
          <b>Pick the table format first.</b> This decision is the hardest to reverse. Choose an open specification
          with multiple independent implementations and a public governance process.
        </li>
        <li>
          <b>Stand up a catalog that speaks an open protocol.</b> Even if you start with one engine, the protocol is
          what keeps the second engine cheap.
        </li>
        <li>
          <b>Move access behind the catalog.</b> Retire direct storage credentials in application and agent code
          before the number of tools grows.
        </li>
        <li>
          <b>Write descriptions as you go.</b> Table and column descriptions are cheapest to write when the table is
          created and most expensive to reconstruct two years later.
        </li>
        <li>
          <b>Define the top twenty metrics explicitly.</b> Not every metric. The ones that appear in decisions.
          Record the definition where software can read it.
        </li>
        <li>
          <b>Give agents read access to a curated subset.</b> Start narrow. Widen based on observed need rather than
          on the theory that more access will help.
        </li>
        <li>
          <b>Record snapshot identifiers in agent output.</b> This turns every agent answer into something a person
          can verify later without re-running anything.
        </li>
      </ol>

      <h2 id="connections">How it feeds the rest of the stack</h2>
      <p>
        The foundation is not consumed directly by a model. It reaches the rest of the stack through specific,
        nameable paths, and it is worth being precise about them because each one is a place where grounding can be
        lost.
      </p>
      <h3>Through tools, usually over a protocol</h3>
      <p>
        The most common path is a tool that an agent calls: a query tool, a table listing tool, a metric lookup tool.
        In an open stack these are exposed through a protocol such as the Model Context Protocol rather than being
        compiled into one harness, which is what makes the same data access work across different agent runtimes.
        The protocol carries the call, and the catalog decides whether it is allowed.
      </p>
      <h3>Through retrieval over documents</h3>
      <p>
        Unstructured sources sit alongside tables and are usually reached by similarity search. The important
        discipline here is not to let retrieval answer questions that require exact figures. Retrieval is for
        finding relevant text. Structured queries are for producing numbers. Systems that blur this produce fluent
        summaries containing invented totals.
      </p>
      <h3>Through context assembled by the harness</h3>
      <p>
        The harness decides what a model sees. Table descriptions, metric definitions, and the list of tables the
        current user may reach are all context, and they are usually assembled fresh for each task. Where that
        context comes from matters: pulled live from the catalog it stays correct, copied into a prompt template it
        starts drifting the day it is written.
      </p>
      <h3>Through evidence attached to output</h3>
      <p>
        The return path is the one teams forget. Data flows up into an answer, and identifiers should flow back down
        into a record: which tables, which snapshots, which query, which user. That record is what makes the
        auditable property real rather than aspirational, and none of the layers above can produce it if the
        foundation does not expose stable identifiers to begin with.
      </p>

      <h2 id="not">What this layer is not</h2>
      <p>
        A few clarifications save a lot of confusion.
      </p>
      <p>
        This layer is not a vector database, and vector search does not replace it. Embeddings are excellent at
        finding text that resembles a question and poor at producing an exact number. A mature system uses both, with
        retrieval pointing at documents and structured queries producing figures.
      </p>
      <p>
        This layer is also not agent memory. What an agent remembers about a conversation, a task, or a user is state
        belonging to the execution layer. Conflating the two leads to agent memory being written into analytical
        tables, which is bad for both.
      </p>
      <p>
        Finally, this layer is not a substitute for policy. Knowing what data means does not decide who should see
        it or what an agent may do with it. That belongs to the harness, and it is the subject of the execution
        layer. Grounding tells an agent what is true. Authority tells it what it may act on. Both are required, and
        neither substitutes for the other.
      </p>
    </>
  );
}
