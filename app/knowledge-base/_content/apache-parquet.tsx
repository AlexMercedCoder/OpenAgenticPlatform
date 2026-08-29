import type { Article } from './types';

export const article: Article = {
  slug: 'apache-parquet',
  title: 'Apache Parquet',
  kind: 'technology',
  layer: 'data-and-semantics',
  kicker: 'DATA AND SEMANTICS / FORMAT',
  summary: 'The columnar file format that most analytical data sits in, designed to be small on disk and cheap to scan selectively.',
  standfirst: 'Parquet is where analytical data lives when nothing is reading it. It is a file format built on one insight: if you store values of the same column together, you can compress them far better and skip far more of the file when answering a question.',
  keywords: ['Apache Parquet', 'columnar file format', 'predicate pushdown', 'row groups', 'compression', 'lakehouse storage'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'the-problem', label: 'The problem it solves' },
    { id: 'anatomy', label: 'Anatomy of a Parquet file' },
    { id: 'skipping', label: 'How skipping actually works' },
    { id: 'encoding', label: 'Encoding and compression' },
    { id: 'schema', label: 'Schema and evolution' },
    { id: 'writing-well', label: 'Writing Parquet well' },
    { id: 'partitioning', label: 'Partitioning and layout' },
    { id: 'agentic-relevance', label: 'Where it matters for agents' },
    { id: 'small-files', label: 'The small files problem' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'alternatives', label: 'Alternatives and when they apply' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Apache Parquet project site', href: 'https://parquet.apache.org', note: 'Specification, format documentation, and release information.' },
    { label: 'Parquet format specification', href: 'https://github.com/apache/parquet-format', note: 'The thrift definitions and file layout description, which is the authority when behavior is in question.' },
    { label: 'Parquet encodings', href: 'https://parquet.apache.org/docs/file-format/data-pages/encodings/', note: 'The list of encodings and when each applies, useful when tuning file size.' },
    { label: 'PyArrow Parquet guide', href: 'https://arrow.apache.org/docs/python/parquet.html', note: 'The most common way to read and write Parquet from Python.' },
    { label: 'parquet-tools and inspection utilities', href: 'https://github.com/apache/parquet-java', note: 'Command line tooling for inspecting file metadata, which is the fastest way to diagnose a slow table.' },
  ],
  related: ['apache-arrow', 'apache-iceberg', 'data-and-semantics'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Apache Parquet is a file format for tabular data. A Parquet file holds records, arranged by column,
        compressed, with metadata describing what is inside. It is designed for one access pattern: read some columns
        from many records, filtered, as fast as possible, from storage that charges for bytes read.
      </p>
      <p>
        It has become the default for analytical data in the same quiet way that JPEG became the default for
        photographs. Nobody argues about it much. Engines read it, warehouses export it, catalogs point at it, and
        object storage is full of it.
      </p>
      <p>
        For an open agentic platform, Parquet matters because it is the level at which data stops being tied to a
        product. A table stored as Parquet in object storage can be read by any engine that implements the format,
        which is most of them. That property is what makes the layers above replaceable.
      </p>

      <h2 id="the-problem">The problem it solves</h2>
      <p>
        Consider a table of one hundred million events with sixty columns, and a question that needs three of those
        columns for events from one day.
      </p>
      <p>
        Stored as rows, whether in CSV, JSON, or a row-oriented binary format, answering that question requires
        reading essentially the whole file. Every record must be examined to check its date, and reading a record
        means reading all sixty of its fields. Compression helps with size and not with the fundamental problem: the
        bytes you need are interleaved with the bytes you do not.
      </p>
      <p>
        Stored as Parquet, the same question reads three columns rather than sixty, and within those columns skips
        every block whose recorded value range cannot contain the target date. It is common for this to reduce bytes
        read by two orders of magnitude. On object storage, where you pay per byte and per request, that is a direct
        cost reduction as well as a speed one.
      </p>

      <h2 id="anatomy">Anatomy of a Parquet file</h2>
      <p>
        The structure is worth knowing because almost every performance question about Parquet is answered by it.
      </p>
      <p>
        A file is divided into <b>row groups</b>. A row group is a horizontal slice: some number of complete records,
        typically tens or hundreds of megabytes worth. Row groups are the unit of parallelism, because two readers
        can process two row groups independently.
      </p>
      <p>
        Within a row group, each column is stored as a <b>column chunk</b>. All values of that column, for the records
        in that row group, sit contiguously. This is where the columnar benefit comes from.
      </p>
      <p>
        Each column chunk is divided into <b>pages</b>, which are the unit of compression and encoding. A page is
        typically around a megabyte before compression.
      </p>
      <p>
        At the end of the file sits the <b>footer</b>, holding the schema, the location of every column chunk, and
        statistics: minimum and maximum values, null counts, and distinct counts where available. The footer is read
        first, which is why a reader can decide what to fetch before fetching anything substantial.
      </p>
      <p>
        That last detail is the one that matters most on object storage. A reader issues a small request for the
        footer, works out exactly which byte ranges it needs, and then issues requests for only those ranges. The
        file can be a gigabyte and the read can touch ten megabytes.
      </p>

      <h2 id="skipping">How skipping actually works</h2>
      <p>
        Parquet supports skipping at several levels, and understanding which level is doing the work explains why two
        superficially similar tables perform very differently.
      </p>
      <h3>Column pruning</h3>
      <p>
        The simplest and most reliable. If a query needs three columns, the reader fetches three column chunks and
        ignores the rest. This works always, requires no tuning, and is why selecting only the columns you need is
        good advice rather than pedantry.
      </p>
      <h3>Row group skipping</h3>
      <p>
        Each row group records minimum and maximum values per column. If a filter asks for a date in March and a row
        group&apos;s date range is entirely in January, the reader skips it without reading any data. This is
        effective in proportion to how well the data is ordered. If records are sorted by date, most row groups can
        be skipped. If dates are randomly distributed, every row group spans the whole range and nothing is skipped.
      </p>
      <h3>Page level skipping</h3>
      <p>
        Newer readers and writers support page-level statistics and indexes, which apply the same idea at finer
        granularity. The benefit again depends on ordering.
      </p>
      <h3>Bloom filters</h3>
      <p>
        For high-cardinality equality filters, such as looking up a specific identifier, minimum and maximum
        statistics are useless because nearly every row group&apos;s range contains the value. Bloom filters answer
        the question of whether a specific value might be present, and are worth enabling on columns that are
        frequently looked up by exact value.
      </p>
      <div className="kb-callout">
        <b>The practical consequence</b>
        <p>
          Sort order is a performance feature. Writing data sorted by the column you most often filter on can change
          query cost by an order of magnitude, and it costs nothing at read time. This is the highest-leverage tuning
          decision available in this format.
        </p>
      </div>

      <h2 id="encoding">Encoding and compression</h2>
      <p>
        Parquet applies two layers of size reduction, and they are frequently confused.
      </p>
      <p>
        <b>Encoding</b> exploits structure in the values themselves. Dictionary encoding replaces repeated values
        with small integers pointing at a dictionary, which is enormously effective for low-cardinality string
        columns such as country or status. Run-length encoding collapses repeated consecutive values. Delta encoding
        stores differences rather than absolute values, which suits sorted numbers and timestamps.
      </p>
      <p>
        <b>Compression</b> then applies a general-purpose algorithm to the encoded pages. The common choices are
        Snappy, which is fast and moderately effective, and Zstandard, which compresses better at some cost in speed
        and is now often the better default because storage and network usually dominate.
      </p>
      <p>
        Because encoding happens first, the compression algorithm sees data that is already highly regular, which is
        why Parquet files are so much smaller than the same data compressed as CSV. It also means encoding choice
        matters more than compression choice for well-structured columns.
      </p>

      <h2 id="schema">Schema and evolution</h2>
      <p>
        Every Parquet file carries its own schema in the footer: column names, types, nesting, and whether each field
        is optional or required. This makes files self-describing, which is why a file written five years ago is
        still readable without external information.
      </p>
      <p>
        Parquet supports nested structures directly, including lists and maps, using a definition and repetition
        scheme that encodes nesting without storing the structure per record. This is genuinely clever and mostly
        invisible in practice.
      </p>
      <p>
        Where Parquet stops is evolution across files. A file has one schema, fixed at write time. If the table gains
        a column, new files have it and old files do not. If a column is renamed, nothing connects the old name to
        the new one, because names are the only identity Parquet has.
      </p>
      <p>
        This is precisely the gap table formats fill. Iceberg assigns stable identifiers to columns and maps them
        onto whatever the underlying files call them, which is what makes safe renaming and reordering possible over
        a collection of files written across years. Parquet on its own is a file format, and schema evolution is a
        table concern.
      </p>

      <h2 id="writing-well">Writing Parquet well</h2>
      <p>
        Reading Parquet requires no expertise. Writing it well requires a handful of decisions that are easy to get
        wrong and expensive to fix later.
      </p>
      <ul>
        <li>
          <b>File size.</b> Aim for files in the hundreds of megabytes. Much smaller and metadata overhead dominates.
          Much larger and parallelism suffers, and a single bad file becomes an expensive rewrite.
        </li>
        <li>
          <b>Row group size.</b> Typically one hundred to five hundred megabytes. Too small wastes the statistics
          mechanism; too large reduces skipping precision.
        </li>
        <li>
          <b>Sort by the primary filter column.</b> Usually a timestamp or a tenant identifier. This is the single
          most valuable write-time choice.
        </li>
        <li>
          <b>Use Zstandard unless you have measured otherwise.</b> The size difference is usually worth the
          additional CPU.
        </li>
        <li>
          <b>Keep dictionary encoding on for low-cardinality strings.</b> Most writers do this automatically until a
          dictionary grows past a threshold, at which point they fall back, sometimes silently.
        </li>
        <li>
          <b>Enable bloom filters on identifier columns you look up by value.</b> They cost a little space and remove
          a class of full scans.
        </li>
        <li>
          <b>Choose types deliberately.</b> Storing numbers as strings, or timestamps as strings, gives up encoding,
          statistics, and skipping all at once. This is the most common avoidable mistake in the format.
        </li>
      </ul>

      <h2 id="partitioning">Partitioning and layout</h2>
      <p>
        How files are arranged in storage matters nearly as much as what is inside them, and the two decisions
        interact.
      </p>
      <p>
        The traditional approach is directory partitioning: writing files into paths that encode a column value, such
        as a date directory per day. A reader that understands the convention can eliminate whole directories before
        listing them. This works, and it carries three well-known problems.
      </p>
      <p>
        The first is that the partition column becomes part of the physical layout, so changing the partitioning
        scheme means rewriting the table. The second is that queries must filter on the partition column in exactly
        the form the layout expects, so a filter on a timestamp does not eliminate date directories unless the query
        engine is clever enough to derive one from the other. The third is skew: partitioning by a column with uneven
        distribution produces one directory with ten files and another with ten thousand.
      </p>
      <p>
        Choosing partition granularity is the recurring judgment call. Too coarse and every query scans too much. Too
        fine and you manufacture the small files problem deliberately. A reasonable heuristic is to target partitions
        that hold at least a few hundred megabytes, and to partition on the column that appears in nearly every
        query rather than the one with the most distinct values.
      </p>
      <p>
        Within a partition, sort order does the remaining work. Partitioning eliminates directories; sorting and
        statistics eliminate row groups inside the surviving files. Teams often tune one and ignore the other, then
        conclude the format is slow. Both together are what produce the order-of-magnitude differences people
        associate with well-run lakehouse tables.
      </p>
      <p>
        Table formats improve on all of this by tracking partition values in metadata rather than in paths, which
        decouples the logical partitioning from the physical layout and allows it to change without a rewrite. That
        is a table-format feature, not a Parquet one, and it is one of the clearest arguments for not managing
        Parquet directories by hand.
      </p>

      <h2 id="agentic-relevance">Where it matters for agents</h2>
      <p>
        Agents interact with Parquet through queries, never directly, but three of its properties shape agentic
        behavior noticeably.
      </p>
      <h3>Exploratory queries are affordable</h3>
      <p>
        Agents explore. They check what a column contains, count distinct values, sample rows, and look at a related
        table before committing to an approach. On a row format each of those is a full scan. On well-written Parquet
        most are cheap. The difference determines whether exploratory behavior is a feature or a cost problem.
      </p>
      <h3>Wide tables stop being a penalty</h3>
      <p>
        Analytical tables often have many columns, most irrelevant to any given question. Because column pruning is
        automatic, an agent asking about three fields does not pay for the other fifty-seven. This makes wide,
        descriptive tables a reasonable design for agent consumption, where they would have been a problem in a
        row-oriented world.
      </p>
      <h3>Statistics answer some questions without reading data</h3>
      <p>
        A question such as what date range this table covers, or how many nulls are in this column, can sometimes be
        answered from footer metadata alone. Tools that expose this cheaply give agents a fast way to orient before
        issuing an expensive query.
      </p>

      <h3>Cost is predictable enough to bound</h3>
      <p>
        Because bytes read is largely a function of columns selected and partitions touched, a tool can estimate the
        cost of a query before running it and refuse or warn when an agent proposes something unbounded. That check
        is far easier to build over a columnar format with statistics than over an opaque store, and it is one of the
        more effective guardrails available for agent data access.
      </p>

      <h2 id="small-files">The small files problem</h2>
      <p>
        This is the failure mode that catches almost every team eventually, and it is worth understanding before it
        happens rather than after.
      </p>
      <p>
        Streaming or frequent batch writes produce many small files. A pipeline writing every minute produces
        1,440 files a day and half a million a year. Each file has a footer to read, a request to issue, and metadata
        to track. Query planning slows down, then query execution slows down, then the catalog itself slows down.
      </p>
      <p>
        The symptom is distinctive: a table that is not especially large becomes slow to query, and the slowness is in
        planning rather than in scanning. Listing the files takes longer than reading them.
      </p>
      <p>
        The fix is compaction: periodically rewriting many small files into fewer large ones, ideally sorted while
        you are at it. Table formats provide this as a maintenance operation, which is one of several reasons why
        Parquet in a table format is a different proposition from Parquet in a directory. Directories of Parquet
        files have no mechanism for compacting safely while readers are active. Table formats do.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li>
          <b>Files are immutable.</b> Updating a single record means rewriting the file that contains it. Parquet has
          no in-place update. Anything resembling a mutation is provided by the layer above.
        </li>
        <li>
          <b>Statistics can be missing or wrong.</b> Some writers omit them, and some historically wrote incorrect
          statistics for certain types, which readers then defensively ignore. If skipping is not happening, checking
          whether statistics exist is the first diagnostic.
        </li>
        <li>
          <b>Timestamp semantics vary.</b> Precision and time zone interpretation have changed across format versions
          and differ between writers. This is the most common source of values that are correct in one engine and off
          by hours in another.
        </li>
        <li>
          <b>Decimal handling differs between implementations.</b> Worth testing rather than assuming, especially for
          financial data.
        </li>
        <li>
          <b>Very wide tables have real metadata cost.</b> Thousands of columns means a large footer, read on every
          access.
        </li>
        <li>
          <b>Compression is per page, not per file.</b> A file is not one compressed blob, which is what allows
          partial reads and why you cannot judge read cost from file size alone.
        </li>
      </ul>

      <h2 id="alternatives">Alternatives and when they apply</h2>
      <p>
        Parquet is not the only columnar format, and there are cases where something else fits better.
      </p>
      <p>
        ORC solves the same problem with a different design and remains common in Hadoop-derived environments. Choose
        it when the surrounding ecosystem already uses it, not on technical grounds alone.
      </p>
      <p>
        Arrow IPC files store Arrow buffers directly. They are fast to read because no decoding is required and much
        larger because nothing is compressed. Reasonable for short-lived intermediates, not for storage.
      </p>
      <p>
        Row formats such as Avro remain the right choice for streaming and for record-at-a-time processing, where you
        want whole records and write throughput matters more than scan efficiency. Many pipelines use Avro on the way
        in and Parquet at rest, which is a sensible division rather than a compromise.
      </p>
      <p>
        Plain CSV and JSON remain the right answer for interchange with systems and people that need something
        universally readable, and the wrong answer for anything an agent will query repeatedly.
      </p>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Many independent implementations, and no single vendor controls the format.</li>
        <li><b>Inspectable.</b> Strong. The specification is public and tooling exists to dump metadata and inspect content.</li>
        <li><b>Portable.</b> Strong. A file is self-describing and readable anywhere, indefinitely.</li>
        <li><b>Bounded.</b> Not applicable. Files carry no access model; permissions live in the catalog and the storage system.</li>
        <li><b>Grounded.</b> Partial. Files carry names and types but no meaning. Semantics belong further up.</li>
        <li><b>Auditable.</b> Partial. Files do not record who read them, though they do preserve exactly what was written.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Parquet is not a table. A directory of Parquet files has no atomic commits, no snapshot history, and no safe
        concurrent writes. Two writers to the same directory can produce a state readers observe as partially
        updated. Table formats exist to add exactly these properties.
      </p>
      <p>
        Parquet is not a database. There is no index in the ordinary sense, no transaction, and no query engine. It
        is a file that engines read.
      </p>
      <p>
        Parquet is not an in-memory format. Data must be decoded before it can be computed on, and the decoded form
        is usually Arrow. Treating them as competitors leads to choosing between two things that are meant to be used
        together.
      </p>
    </>
  );
}
