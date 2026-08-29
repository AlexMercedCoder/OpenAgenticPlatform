import type { Article } from './types';

export const article: Article = {
  slug: 'apache-iceberg',
  title: 'Apache Iceberg',
  kind: 'technology',
  layer: 'data-and-semantics',
  kicker: 'DATA AND SEMANTICS / TABLE FORMAT',
  summary: 'The table format that turns a collection of files in object storage into something that behaves like a database table, with atomic commits, schema evolution, and history.',
  standfirst: 'Files are not a table. Iceberg is the metadata layer that adds the behavior people assume a table has: safe concurrent writes, schema changes that do not rewrite history, partitioning that can change, and a record of what the table looked like at any past moment.',
  keywords: ['Apache Iceberg', 'open table format', 'lakehouse', 'time travel', 'schema evolution', 'hidden partitioning', 'REST catalog'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'the-problem', label: 'The problem it solves' },
    { id: 'structure', label: 'How the metadata is structured' },
    { id: 'commits', label: 'Commits and isolation' },
    { id: 'schema-evolution', label: 'Schema evolution that actually works' },
    { id: 'partitioning', label: 'Hidden partitioning' },
    { id: 'time-travel', label: 'Snapshots and time travel' },
    { id: 'deletes', label: 'Updates, deletes, and merge-on-read' },
    { id: 'catalogs', label: 'Catalogs and the REST protocol' },
    { id: 'maintenance', label: 'Maintenance you cannot skip' },
    { id: 'agentic-relevance', label: 'Where it matters for agents' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Apache Iceberg project site', href: 'https://iceberg.apache.org', note: 'Documentation, engine integration guides, and release notes.' },
    { label: 'Iceberg table specification', href: 'https://iceberg.apache.org/spec/', note: 'The authoritative description of metadata files, manifests, and snapshot semantics.' },
    { label: 'Iceberg REST catalog specification', href: 'https://github.com/apache/iceberg/blob/main/open-api/rest-catalog-open-api.yaml', note: 'The OpenAPI definition that makes catalogs interchangeable between clients.' },
    { label: 'PyIceberg', href: 'https://py.iceberg.apache.org', note: 'The Python implementation, which is the usual entry point for agent tooling.' },
    { label: 'Alex Merced on the open data lakehouse', href: 'https://opendatalakehouse.com', note: 'Longer-form practitioner material on lakehouse architecture and table formats.' },
    { label: "Alex Merced's lakehouse blog", href: 'https://iceberglakehouse.com', note: 'Ongoing writing about table formats, catalogs, and query engines.' },
  ],
  related: ['apache-parquet', 'apache-polaris', 'data-and-semantics'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Apache Iceberg is a specification for how to describe a table made of files. It does not store data itself.
        It stores metadata: which files belong to the table right now, what the schema is, how the data is
        partitioned, what statistics each file has, and what all of that looked like at every previous commit.
      </p>
      <p>
        The data stays in ordinary Parquet, ORC, or Avro files in ordinary object storage. Iceberg adds a layer of
        JSON and Avro metadata files describing them, and a small pointer that says which metadata file is current.
        Changing that pointer atomically is what makes a commit.
      </p>
      <p>
        That is a modest-sounding mechanism, and it produces most of the properties people associate with a database
        table while leaving the data in open files that anything can read.
      </p>

      <h2 id="the-problem">The problem it solves</h2>
      <p>
        The lakehouse idea starts with putting analytical data in object storage as open files. This is cheap,
        durable, and vendor-neutral. It also gives up almost everything a database provided.
      </p>
      <p>
        A directory of Parquet files has no notion of what belongs to the table, so a writer adding files and a
        reader listing the directory can disagree about the current state. There is no atomic commit, so a
        multi-file write is visible in pieces. There is no way to change the schema safely, because the only column
        identity is a name in each file. There is no history, so a bad write is not recoverable and yesterday&apos;s
        number cannot be reproduced. Directory listings on object storage are slow and, historically, not immediately
        consistent, which makes even determining the file list unreliable at scale.
      </p>
      <p>
        Teams worked around this for years with conventions, lock files, and careful scheduling. Table formats
        replaced the conventions with a specification. Iceberg is one of them, and the one built with the fewest
        assumptions about which engine is writing.
      </p>

      <h2 id="structure">How the metadata is structured</h2>
      <p>
        The layout is a tree, and understanding it explains both the performance characteristics and the failure
        modes.
      </p>
      <p>
        At the top is the <b>catalog pointer</b>: a single reference, held by the catalog, naming the current metadata
        file for the table. This is the only mutable thing in the system.
      </p>
      <p>
        Below that is a <b>metadata file</b>, a JSON document holding the table schema, the partition specification,
        table properties, and a list of snapshots. Each write produces a new metadata file rather than editing the
        old one.
      </p>
      <p>
        Each <b>snapshot</b> points at a <b>manifest list</b>, which points at a set of <b>manifest files</b>. A
        manifest file lists data files along with their partition values, record counts, and per-column statistics.
      </p>
      <p>
        At the bottom are the <b>data files</b> themselves, usually Parquet.
      </p>
      <p>
        The consequence is that query planning reads metadata rather than listing storage. To find files matching a
        filter, an engine reads the manifest list, eliminates manifests whose partition ranges cannot match, reads
        the surviving manifests, and eliminates files whose column statistics cannot match. Planning a query over a
        table with a million files can touch a few megabytes of metadata instead of a million-object listing.
      </p>
      <p>
        It also means every version of the table is fully described by an immutable set of files. Nothing is
        overwritten. Old snapshots remain valid until someone deliberately expires them, which is what makes history
        cheap and rollback trivial.
      </p>

      <h2 id="commits">Commits and isolation</h2>
      <p>
        A write proceeds in a fixed order. The writer creates new data files, writes new manifests describing the
        resulting file set, writes a new metadata file, and then asks the catalog to swap the pointer from the
        metadata file it started from to the new one. That final step is a compare-and-swap: it succeeds only if the
        current pointer is still what the writer expected.
      </p>
      <p>
        This gives serializable behavior without a lock held across the whole operation. Two writers can work
        concurrently for as long as they like. The first to commit wins. The second discovers its expected base is
        stale, and either retries against the new state or fails, depending on whether the operations conflict.
      </p>
      <p>
        Readers are unaffected throughout. A reader resolves the pointer once and then reads an immutable set of
        files. A commit happening mid-read changes nothing about what that reader sees, because nothing it is reading
        was modified. This is the property that makes long analytical queries safe to run against actively written
        tables, and it is the single most practical benefit of the design.
      </p>
      <p>
        The atomicity of the whole system rests on the catalog being able to perform that swap atomically. This is
        why the catalog is not an optional convenience, and why storing the pointer in a plain file on object storage
        is a weaker arrangement than storing it in something with real transactional semantics.
      </p>

      <h2 id="schema-evolution">Schema evolution that actually works</h2>
      <p>
        Iceberg assigns every column a stable numeric identifier at creation. All metadata refers to columns by that
        identifier. Names are a display concern mapped onto the identifiers.
      </p>
      <p>
        This one decision makes a set of operations safe that are dangerous almost everywhere else:
      </p>
      <ul>
        <li><b>Rename a column.</b> The identifier is unchanged, so every existing file still maps correctly. No data is rewritten.</li>
        <li><b>Add a column.</b> Old files simply lack it, and reads return null for those rows.</li>
        <li><b>Drop a column.</b> The identifier is retired. Data files still contain it and readers ignore it.</li>
        <li><b>Reorder columns.</b> Position is not identity, so ordering is presentation only.</li>
        <li><b>Widen a type.</b> Promotions such as int to long are permitted because they cannot lose information.</li>
      </ul>
      <p>
        Compare this with name-based formats, where renaming a column either rewrites every file or silently breaks
        the mapping between old files and the new name. Anyone who has watched a rename turn into a multi-day
        backfill will recognize why identifier-based resolution is more than a detail.
      </p>
      <p>
        Not everything is permitted, and the restrictions are deliberate. Narrowing a type, or changing one to an
        incompatible one, would make existing files unreadable and is rejected rather than allowed with a warning.
      </p>

      <h2 id="partitioning">Hidden partitioning</h2>
      <p>
        In directory-partitioned tables, the partitioning scheme is visible in the data. A table partitioned by day
        has a date column derived from a timestamp, and queries must filter on that derived column to benefit. A
        user who filters on the timestamp instead gets a full scan, and nothing tells them why.
      </p>
      <p>
        Iceberg records the partition transform in metadata: this table is partitioned by day of this timestamp
        column. Queries filter on the timestamp naturally, and the engine derives the partition filter from the
        transform. Users do not need to know how the table is laid out to query it efficiently.
      </p>
      <p>
        The second benefit is partition evolution. Because partitioning is metadata rather than physical layout, it
        can change. A table partitioned by month that has grown can be repartitioned by day going forward, with old
        data left as it is. Both layouts coexist, and queries plan correctly across the boundary. In a
        directory-partitioned world this is a full table rewrite.
      </p>
      <p>
        For agent access this matters more than it might appear. An agent writing a query has no knowledge of
        physical layout and no way to acquire it. Hidden partitioning means a naively written but correct filter is
        also an efficient one, which removes a large category of accidentally expensive queries.
      </p>

      <h2 id="time-travel">Snapshots and time travel</h2>
      <p>
        Every commit produces a snapshot, and snapshots are retained until explicitly expired. This gives three
        capabilities that are difficult to obtain otherwise.
      </p>
      <p>
        <b>Reading the past.</b> A query can specify a snapshot identifier or a timestamp and see exactly what the
        table contained then. This is how a number reported last month is reproduced, and it is far more convincing
        than an explanation of why it changed.
      </p>
      <p>
        <b>Rollback.</b> A bad write is undone by pointing the table back at the previous snapshot. The operation is
        a metadata change, so it is fast regardless of table size.
      </p>
      <p>
        <b>Incremental reads.</b> A consumer can ask what changed between two snapshots and process only that,
        which is the foundation for incremental pipelines that do not rescan everything.
      </p>
      <p>
        For agentic systems the first of these is the most valuable and the most underused. If an agent records the
        snapshot identifier it read alongside its answer, that answer becomes verifiable indefinitely. Someone
        questioning it later does not need to trust a log or reconstruct a pipeline. They can read exactly the same
        data the agent read. Very little else in an agentic stack offers evidence that strong, and it costs one field
        in a record.
      </p>

      <h2 id="deletes">Updates, deletes, and merge-on-read</h2>
      <p>
        Data files are immutable, which raises an obvious question: how does a table support updating or deleting a
        row. Iceberg offers two strategies, and choosing between them is one of the few decisions that materially
        affects both write cost and read cost.
      </p>
      <p>
        <b>Copy-on-write</b> rewrites every data file containing an affected row. A single-row update to a table with
        five-hundred-megabyte files rewrites five hundred megabytes. Writes are expensive and reads are unaffected,
        because the resulting files contain exactly the current state.
      </p>
      <p>
        <b>Merge-on-read</b> writes small delete files recording which rows are no longer valid, leaving the original
        data files alone. Writes are cheap and reads pay a merge cost, because every read must apply outstanding
        deletes.
      </p>
      <p>
        The right choice follows from the workload. Tables written rarely and read constantly favor copy-on-write.
        Tables absorbing frequent small changes favor merge-on-read, with regular compaction to keep the accumulated
        delete files from degrading reads over time. Setting merge-on-read and then not compacting produces a table
        that gets slower every week for reasons that are invisible from the outside.
      </p>
      <p>
        There is a broader point here worth carrying into agentic design. Neither strategy makes row-level mutation
        cheap in the way an operational database makes it cheap. If a workload needs frequent small updates with low
        latency, an analytical table format is the wrong home for it. Agents that need to record state per
        interaction should write to an operational store, with periodic loads into the lakehouse for analysis.
        Trying to use a table format as an agent&apos;s working memory produces enormous write amplification and a
        table nobody can query efficiently.
      </p>

      <h2 id="catalogs">Catalogs and the REST protocol</h2>
      <p>
        The catalog holds the pointer, and therefore holds authority over the table. Several implementations exist,
        including catalogs backed by relational databases, cloud services, and open implementations such as Apache
        Polaris.
      </p>
      <p>
        The important development is the Iceberg REST catalog specification, which defines an HTTP protocol for
        catalog operations. Before it, each engine needed a client for each catalog implementation, and adding either
        meant work on both sides. With it, any client speaking the protocol works with any conformant catalog.
      </p>
      <p>
        This is the interoperability property applied to governance rather than storage, and for an agentic platform
        it is the more consequential of the two. It means an agent tool can reach governed tables through the same
        protocol an engine uses, receiving scoped credentials from the catalog rather than holding storage keys of
        its own. Access becomes something the catalog grants and revokes rather than something distributed through
        configuration files.
      </p>

      <h2 id="maintenance">Maintenance you cannot skip</h2>
      <p>
        Iceberg tables need periodic maintenance. Skipping it is the most common cause of a table that worked well
        for six months and then became slow.
      </p>
      <ul>
        <li>
          <b>Compaction.</b> Rewrite many small files into fewer large ones, ideally sorted. Necessary for any table
          receiving frequent writes.
        </li>
        <li>
          <b>Snapshot expiration.</b> Old snapshots keep old files alive. Without expiration, storage grows
          indefinitely and metadata accumulates. With overly aggressive expiration, you lose the history that makes
          answers verifiable. This is a policy decision, not a default to accept without thought.
        </li>
        <li>
          <b>Orphan file cleanup.</b> Failed writes leave data files that no snapshot references. They cost storage
          and nothing else, and they are only safely removable with care about in-flight writes.
        </li>
        <li>
          <b>Manifest rewriting.</b> Over time manifests fragment, which slows planning. Periodic rewriting keeps
          planning fast.
        </li>
      </ul>
      <p>
        Most engines and catalog services provide these as operations or automate them. The failure is rarely
        technical difficulty and almost always that nobody was assigned the responsibility.
      </p>

      <h2 id="agentic-relevance">Where it matters for agents</h2>
      <h3>Evidence that survives</h3>
      <p>
        Snapshot identifiers turn agent output into something checkable months later. This is the strongest single
        contribution the data layer makes to the auditable property.
      </p>
      <h3>Safe concurrent access</h3>
      <p>
        Agents query at unpredictable times, including while pipelines are writing. Snapshot isolation means this is
        uneventful rather than a source of intermittent wrong answers.
      </p>
      <h3>Efficient exploration</h3>
      <p>
        Metadata-based planning and hidden partitioning mean an agent&apos;s exploratory queries are cheap without
        the agent knowing anything about physical layout.
      </p>
      <h3>Governed write paths</h3>
      <p>
        When agents write, transactional commits mean a failed or interrupted write leaves no partial state, and a
        bad write is reversible by rolling back rather than by reconstructing. Both properties make cautious write
        access more defensible than it would otherwise be.
      </p>
      <h3>Schema stability across change</h3>
      <p>
        A tool or skill referring to a column by name keeps working when the table gains columns or is reorganized,
        because the underlying identity is stable. Agent tooling is unusually sensitive to schema churn, and this
        removes much of it.
      </p>

      <h3>A shared surface for people and agents</h3>
      <p>
        Perhaps the most underrated benefit is that agents and humans read the same tables through the same catalog
        with the same definitions. Systems where the agent has its own copy of the data, refreshed on its own
        schedule, produce the situation where a person and an agent give different answers to the same question and
        nobody can say which is right. A single governed table removes that argument entirely, and it removes it by
        construction rather than by process.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li>
          <b>Iceberg does not make object storage transactional.</b> It makes the pointer swap atomic. Everything
          else relies on files being immutable once written.
        </li>
        <li>
          <b>Row-level updates are expensive.</b> Updating a few records rewrites files or writes delete files that
          readers must merge. Iceberg is not a transactional database and behaves poorly if used as one.
        </li>
        <li>
          <b>Write conflicts are real under concurrency.</b> Many concurrent writers to one table will produce commit
          retries. Design for a small number of writers per table.
        </li>
        <li>
          <b>Snapshot retention has a cost either way.</b> Long retention costs storage; short retention costs the
          ability to reproduce past answers. Choose deliberately and write the choice down.
        </li>
        <li>
          <b>Engine support varies in depth.</b> Most engines read Iceberg well. Fewer implement every write path,
          maintenance operation, and newer specification feature. Verify the specific operations you need.
        </li>
        <li>
          <b>Specification versions matter.</b> Newer format versions add capabilities that older readers do not
          understand. Check compatibility before enabling features.
        </li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Multiple independent implementations, several engines, and no requirement to use any particular one.</li>
        <li><b>Inspectable.</b> Strong. Metadata is JSON and Avro, readable directly. You can open a table&apos;s metadata and see exactly what it claims.</li>
        <li><b>Portable.</b> Strong for data and metadata. The catalog pointer is the piece that must move with you, which is why an open catalog protocol matters.</li>
        <li><b>Bounded.</b> Delegated. Iceberg carries no permission model; the catalog enforces access.</li>
        <li><b>Grounded.</b> Partial. Iceberg holds schema and column documentation, and a semantic layer is still needed for meaning.</li>
        <li><b>Auditable.</b> Strong for state. Snapshot history records exactly what the table contained and when it changed, though not who read it.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Iceberg is not a query engine. It describes tables; engines read and write them. Performance depends heavily
        on the engine, and comparing table formats by benchmark usually measures engines instead.
      </p>
      <p>
        Iceberg is not a catalog, though the two are frequently conflated. The specification defines what a catalog
        must do and does not implement one.
      </p>
      <p>
        Iceberg is not a transactional database. It provides atomic commits on a table, not fast small transactions
        across rows. Operational workloads belong elsewhere, with analytical copies landing here.
      </p>
      <p>
        Finally, Iceberg is not a governance solution on its own. It makes governance possible by concentrating
        authority in the catalog. Whether that authority is used well is a decision about the catalog, the semantic
        layer, and the policies around them.
      </p>
    </>
  );
}
