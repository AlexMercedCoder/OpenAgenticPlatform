import type { Article } from './types';

export const article: Article = {
  slug: 'apache-arrow',
  title: 'Apache Arrow',
  kind: 'technology',
  layer: 'data-and-semantics',
  kicker: 'DATA AND SEMANTICS / FORMAT',
  summary: 'A standard way to lay out tabular data in memory so different processes and languages can share it without converting it first.',
  standfirst: 'Arrow is a specification for how analytical data sits in memory. Its value is negative: it removes the translation step that used to happen every time data crossed a boundary between two systems.',
  keywords: ['Apache Arrow', 'columnar memory format', 'Arrow Flight', 'ADBC', 'zero copy', 'data interchange'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'the-problem', label: 'The problem it solves' },
    { id: 'columnar', label: 'Why columnar, and what that means' },
    { id: 'layout', label: 'What the layout looks like' },
    { id: 'zero-copy', label: 'The zero copy claim, precisely' },
    { id: 'history', label: 'Where it came from' },
    { id: 'ecosystem', label: 'What is in the ecosystem' },
    { id: 'flight-adbc', label: 'Flight and ADBC' },
    { id: 'agentic-relevance', label: 'Where it matters for agents' },
    { id: 'arrow-vs-parquet', label: 'Arrow compared with Parquet' },
    { id: 'when-you-touch-it', label: 'When you actually touch Arrow' },
    { id: 'tool-pattern', label: 'A tool pattern that uses it well' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Apache Arrow project site', href: 'https://arrow.apache.org', note: 'The canonical entry point, with the specification, implementation list, and release notes.' },
    { label: 'Arrow columnar format specification', href: 'https://arrow.apache.org/docs/format/Columnar.html', note: 'The actual memory layout rules, worth reading once if you work near this layer.' },
    { label: 'Arrow Flight and Flight SQL', href: 'https://arrow.apache.org/docs/format/Flight.html', note: 'The transport protocol for moving Arrow data between processes and machines.' },
    { label: 'ADBC', href: 'https://arrow.apache.org/adbc/', note: 'A database connectivity API that returns Arrow data directly instead of row-by-row results.' },
    { label: 'PyArrow documentation', href: 'https://arrow.apache.org/docs/python/', note: 'The Python implementation most practitioners meet first.' },
    { label: 'Arrow GitHub repository', href: 'https://github.com/apache/arrow', note: 'Source, issue tracker, and the mailing list links for following development.' },
  ],
  related: ['apache-parquet', 'apache-iceberg', 'data-and-semantics'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Apache Arrow is a specification for how tabular data is arranged in memory, plus a large set of libraries that
        implement it. It is not a database, not a file format, and not a processing engine. It defines the shape of
        the bytes while they are being worked on.
      </p>
      <p>
        The specification says exactly how a column of integers, strings, timestamps, or nested structures is laid
        out: where the values sit, where the null indicators sit, how variable-length data is addressed through
        offsets, and how buffers are aligned. Because the layout is fully specified, any two pieces of software that
        implement it can hand data to each other as raw memory.
      </p>
      <p>
        That is the entire idea. Its importance comes from how much cost the old alternative carried.
      </p>

      <h2 id="the-problem">The problem it solves</h2>
      <p>
        Before a shared in-memory standard, every system had its own internal representation. A query engine held
        rows one way, a Python library held them another way, a Java service a third. Every hop between them meant
        serializing to some intermediate form and deserializing on the other side.
      </p>
      <p>
        This was not a small tax. In analytical pipelines it was routinely measured as a large fraction of total
        runtime, and it grew with data volume while contributing nothing. It also multiplied the work: connecting
        five systems meant writing and maintaining conversions between each pair.
      </p>
      <p>
        A shared standard collapses that. If every system speaks the same in-memory layout, then handing a batch of
        records from one to another can be a pointer pass rather than a copy. Connecting five systems means each one
        implements the standard once.
      </p>
      <div className="kb-callout">
        <b>Why this shows up as a plumbing decision</b>
        <p>
          Arrow rarely appears in a requirements document. It appears when someone notices that a pipeline spends
          more time converting data than computing on it, or that a query returns in two hundred milliseconds and
          arrives in Python four seconds later.
        </p>
      </div>

      <h2 id="columnar">Why columnar, and what that means</h2>
      <p>
        Arrow stores data by column rather than by row. In a row layout, all fields of record one sit together,
        followed by all fields of record two. In a column layout, every value of the first field sits together,
        followed by every value of the second.
      </p>
      <p>
        For analytical work this is the better arrangement, for three reasons that compound.
      </p>
      <p>
        First, most analytical queries read a few columns out of many. A column layout reads only those columns, so
        a table with sixty fields costs the same as one with three when a query needs three.
      </p>
      <p>
        Second, values of the same type sit next to each other, which lets modern processors apply the same operation
        to many values at once. Summing a million integers laid out contiguously is dramatically faster than walking
        a million records and reading one field from each.
      </p>
      <p>
        Third, homogeneous runs of values compress and encode far better than mixed data does, which matters more
        for the file formats built on the same principle than it does for Arrow itself.
      </p>
      <p>
        The tradeoff is that reading a single complete record touches many separate locations, which makes columnar
        layouts a poor fit for transactional workloads that fetch and update individual rows. This is why columnar
        formats sit in analytics rather than replacing operational databases.
      </p>

      <h2 id="layout">What the layout looks like</h2>
      <p>
        The specification is more concrete than most people expect, and seeing it once removes the mystery.
      </p>
      <p>
        Take a column of four integers where the third value is missing. Arrow stores this as two buffers. One is a
        validity bitmap: one bit per value, set when the value is present. The other is the values buffer: four
        fixed-width slots, contiguous, with an undefined slot where the null sits. Nothing else. Reading the tenth
        value is arithmetic on a base address rather than a traversal.
      </p>
      <p>
        Variable-length data such as strings needs one more buffer. Arrow keeps an offsets buffer giving the start
        position of each value inside a single contiguous character buffer. The length of any value is the difference
        between two adjacent offsets. This is why string columns in Arrow are fast to scan and why appending to them
        one value at a time is awkward: the structure assumes it is built in batches.
      </p>
      <p>
        Nested structures follow the same principle recursively. A list column is offsets plus a child column. A
        struct column is a validity bitmap plus one child column per field. Because every composite type decomposes
        into flat buffers, an implementation in any language only has to handle a small number of primitive shapes.
      </p>
      <p>
        Two consequences follow from this design and both show up in practice. Columns are effectively immutable, so
        modifying data means building new buffers rather than editing in place, which is why Arrow-based pipelines
        are written as transformations rather than mutations. And a record batch is a collection of these column
        buffers with a schema, which is the unit that everything else in the ecosystem passes around.
      </p>

      <h2 id="zero-copy">The zero copy claim, precisely</h2>
      <p>
        Arrow is often described as enabling zero-copy data sharing, and the phrase is worth unpacking because it is
        both true and narrower than it sounds.
      </p>
      <p>
        What it means is that when two components both understand the Arrow layout, moving data between them does not
        require rewriting it into a different structure. Within a single process, a Python library and a compiled
        engine can operate on the same buffers. Across processes on one machine, shared memory allows the same. Over
        a network, bytes still have to travel, but the format on the wire is the same as the format in memory, so
        neither side pays a translation cost at the ends.
      </p>
      <p>
        What it does not mean is that data never moves. Network transfer still costs network time. Reading a Parquet
        file still costs decoding, because Parquet is encoded and compressed on disk and Arrow is not. The saving is
        specifically the elimination of representation conversion, which turns out to be where a surprising amount of
        time went.
      </p>

      <h2 id="history">Where it came from</h2>
      <p>
        Arrow was announced in early 2016 as a top-level Apache project, unusually skipping the incubator. It was
        started by developers already working on several separate analytics projects who had each independently built
        a columnar in-memory representation, and who recognized that the duplicated effort was producing
        incompatible results.
      </p>
      <p>
        That origin explains two things about the project. It explains why adoption was fast: the people writing the
        specification were also the people maintaining the systems that would implement it. And it explains the
        project&apos;s narrow scope. Arrow deliberately does not include a query language, an execution model, or a
        storage layer, because the founding constituency needed a shared representation and already had strong
        opinions about everything else.
      </p>
      <p>
        The pattern is worth noticing, because it is the same pattern the standards layer of an agentic platform is
        attempting. A specification created by several implementers to solve a duplication problem they were all
        already paying for tends to succeed. A specification created ahead of that pain tends not to.
      </p>

      <h2 id="ecosystem">What is in the ecosystem</h2>
      <p>
        Arrow is one specification with implementations in many languages, including C++, Rust, Java, Go, Python,
        R, and others. The Python binding, PyArrow, is the one most data practitioners encounter, often without
        having chosen it: it arrives as a dependency of a dataframe library or a query client.
      </p>
      <p>
        Around the core layout sit several related pieces:
      </p>
      <ul>
        <li><b>Arrow IPC.</b> A serialization of Arrow buffers for writing to a stream or a file, used for handoff rather than for long-term storage.</li>
        <li><b>Arrow Flight.</b> A network protocol for moving Arrow data efficiently between processes and machines.</li>
        <li><b>Flight SQL.</b> A database protocol built on Flight, so a client can issue SQL and receive Arrow results without a row-by-row driver in the middle.</li>
        <li><b>ADBC.</b> A database connectivity API where the result of a query is Arrow data by design rather than by conversion.</li>
        <li><b>Arrow Compute.</b> Kernels for common operations over Arrow data, used by engines that build on the format.</li>
      </ul>
      <p>
        Many well-known tools use Arrow internally whether or not they advertise it, which is the usual sign that a
        format has become infrastructure rather than a product choice.
      </p>

      <h2 id="flight-adbc">Flight and ADBC</h2>
      <p>
        These two deserve separate attention because they are where Arrow stops being an internal detail and starts
        changing what an application can do.
      </p>
      <p>
        Traditional database drivers were designed around fetching rows. A client asks for results, and the driver
        delivers them one record at a time, converting each field into the client language&apos;s types along the way.
        For a report returning fifty rows this is fine. For an analytical query returning ten million rows it is the
        bottleneck, and it is a bottleneck that no amount of engine optimization removes, because it lives entirely
        on the client side.
      </p>
      <p>
        Flight SQL and ADBC replace that with a bulk-oriented path. The server produces Arrow batches, the client
        receives Arrow batches, and no per-row conversion happens at either end. In practice this changes result
        delivery from something measured in minutes to something measured in seconds for large results.
      </p>
      <p>
        For an agentic system this matters in a specific way. Agents tend to issue exploratory queries whose result
        size is unpredictable. A path that degrades gracefully when a query returns far more than expected is worth
        more than one tuned for the common case.
      </p>

      <h2 id="agentic-relevance">Where it matters for agents</h2>
      <p>
        Arrow is deep infrastructure, and an agent will never call it directly. It matters through four indirect
        effects.
      </p>
      <h3>Latency inside tool calls</h3>
      <p>
        When an agent calls a query tool, the wall-clock time it waits includes result delivery. A tool built on a
        row-oriented driver spends much of that time converting. Because agentic loops make many calls in sequence,
        seconds saved per call compound into the difference between a system that feels responsive and one that does
        not.
      </p>
      <h3>Result handling before the model sees anything</h3>
      <p>
        A well-built data tool does not hand a model ten thousand rows. It summarizes, aggregates, or samples first.
        Doing that work over Arrow batches is efficient enough to happen inside the tool call rather than requiring a
        separate processing step, which keeps tools simple.
      </p>
      <h3>Language boundaries stop mattering</h3>
      <p>
        Agent tooling is frequently Python while the engines underneath are not. Arrow makes that boundary cheap,
        which is why so much agent-adjacent data tooling can be written in Python without paying for it.
      </p>
      <h3>Format stability across the stack</h3>
      <p>
        When the catalog, the engine, the tool, and the harness all speak the same in-memory format, replacing any
        one of them does not require rewriting the data path. That is the replaceable property applied at a level
        most architecture diagrams do not show.
      </p>

      <p>
        There is a fifth effect that is easy to miss. Because Arrow is the common currency, a data tool written once
        can be reused across harnesses without change. The tool receives Arrow, summarizes it, and returns text. What
        called it, and in which language that caller was written, does not enter into it. Portability at the tool
        level is usually credited to the connection protocol, and half of it actually comes from having a shared data
        representation underneath.
      </p>

      <h2 id="arrow-vs-parquet">Arrow compared with Parquet</h2>
      <p>
        These two are constantly confused, partly because both are columnar and both are Apache projects. They are
        complements, not alternatives.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead><tr><th></th><th>Arrow</th><th>Parquet</th></tr></thead>
          <tbody>
            <tr><td>Lives</td><td>In memory and on the wire</td><td>On disk and in object storage</td></tr>
            <tr><td>Optimized for</td><td>Fast access and processing</td><td>Small size and efficient scans</td></tr>
            <tr><td>Compression</td><td>Usually none, so values are directly usable</td><td>Heavy, with encodings per column</td></tr>
            <tr><td>Lifetime</td><td>Milliseconds to minutes</td><td>Months to years</td></tr>
            <tr><td>Read cost</td><td>None beyond memory access</td><td>Decode and decompress</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The normal flow is Parquet on storage, decoded into Arrow for processing, and results delivered as Arrow.
        Choosing between them is not a decision anyone makes. Both are present in most modern stacks, doing different
        jobs.
      </p>

      <h2 id="when-you-touch-it">When you actually touch Arrow</h2>
      <p>
        Most teams use Arrow without writing Arrow code. The cases where you work with it directly are worth
        recognizing, because they are the cases where knowing about it saves real time.
      </p>
      <ul>
        <li><b>Building a data tool for an agent.</b> Receiving results as Arrow and aggregating before returning is usually simpler and faster than the alternative.</li>
        <li><b>Moving data between two libraries.</b> Converting through an intermediate row format is a common accidental bottleneck. Passing Arrow avoids it.</li>
        <li><b>Writing a service that returns large result sets.</b> Flight is a mature answer to a problem people often solve badly with paginated JSON.</li>
        <li><b>Debugging performance.</b> Finding a conversion in a hot path is a common outcome of profiling a data pipeline, and the fix is often to keep data in Arrow longer.</li>
      </ul>

      <h2 id="tool-pattern">A tool pattern that uses it well</h2>
      <p>
        The most common mistake in building a data tool for an agent is returning the query result. The second most
        common is returning a truncated version of it. Both waste context and both produce worse answers than the
        alternative.
      </p>
      <p>
        A better shape, which Arrow makes cheap, is to run the query, keep the full result in memory, and return a
        description of it plus a small sample. Something like: this query matched 41,882 rows across 6 columns, here
        are the column names and types, here are summary statistics for the numeric columns, here are the ten most
        common values in the two low-cardinality columns, and here are five representative rows.
      </p>
      <p>
        That response is perhaps four hundred tokens. The raw result would be several hundred thousand. More
        importantly, the summary usually answers the question directly, and where it does not, it gives the agent
        exactly what it needs to write a better second query. The full result stays available under a handle, so a
        follow-up call can aggregate or filter it without re-running anything.
      </p>
      <p>
        Computing those summaries over Arrow batches is fast enough to happen inline in the tool call, which is what
        makes the pattern practical rather than a separate pipeline. A tool built this way has three properties worth
        naming: it degrades gracefully when a query returns far more than expected, it never blows out the context
        window, and it gives the agent a reason to iterate on the query rather than on the output.
      </p>
      <p>
        The same reasoning applies to writing. A tool that accepts an Arrow batch and appends it to a table can
        validate schema compatibility before touching anything, which turns a class of write failures into a check
        that happens before the write rather than an error discovered afterwards.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li>
          <b>Arrow is not compressed.</b> Data occupies more memory in Arrow than the same data occupies as a Parquet
          file on disk, sometimes considerably more. Reading a large file entirely into Arrow can exhaust memory in a
          way the file size does not suggest.
        </li>
        <li>
          <b>Type mapping across languages is not always exact.</b> Timestamps with time zones, decimals, and nested
          types are the usual places where a round trip through two implementations produces something subtly
          different. Test rather than assume.
        </li>
        <li>
          <b>Many small batches are inefficient.</b> The format is designed for batches of thousands of rows. Building
          Arrow arrays a record at a time gives up most of the benefit.
        </li>
        <li>
          <b>Version alignment matters at the boundary.</b> Two libraries linking different Arrow versions in one
          process can produce confusing failures, particularly in compiled environments.
        </li>
        <li>
          <b>Zero copy applies between Arrow-aware components.</b> The moment data passes through a component that
          converts to something else and back, the benefit is gone for that path.
        </li>
      </ul>

      <p>
        A practical note on the memory point above, because it is the gotcha that causes real incidents. Compression
        ratios of five to ten times are normal for analytical data in Parquet, so a two gigabyte file can become
        fifteen gigabytes of Arrow. String-heavy data is worse, because Parquet uses dictionary encoding that Arrow
        expands unless the column is deliberately kept dictionary-encoded. The defensive habit is to read in batches
        and aggregate as you go, rather than materializing a whole file and then reducing it.
      </p>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. The specification is implementable, and many independent implementations exist across languages.</li>
        <li><b>Inspectable.</b> Strong. The memory layout is fully documented and readable in an afternoon.</li>
        <li><b>Portable.</b> Strong. The same layout works across languages, processes, and machines.</li>
        <li><b>Bounded.</b> Not applicable. Arrow is a data layout and carries no authority model.</li>
        <li><b>Grounded.</b> Indirect. Arrow moves data faithfully. It does not describe what the data means.</li>
        <li><b>Auditable.</b> Not applicable at this level. Auditing happens where queries are issued, not where bytes are laid out.</li>
      </ul>
      <p>
        Arrow governance sits at the Apache Software Foundation with contributors from many organizations, which is
        the structural property that makes long-term dependence on it reasonable.
      </p>

      <h2 id="not">What it is not</h2>
      <p>
        Arrow is not a storage format. Writing Arrow buffers to disk as a long-term archive gives up compression and
        the metadata that makes stored data usable years later. Parquet exists for that.
      </p>
      <p>
        Arrow is not a query engine. Several engines are built on it, and the specification itself computes nothing.
      </p>
      <p>
        Arrow is not a transport by itself either. The layout describes memory; Flight describes how to move it.
        Systems sometimes claim Arrow support when they mean they can produce an Arrow object at the end of an
        otherwise row-oriented path, which delivers the type fidelity and none of the speed. Checking where the
        conversion actually happens is worth doing before assuming a performance benefit.
      </p>
      <p>
        Arrow is not a semantic layer. It carries a schema with names and types, which is not the same as knowing
        that a column represents net revenue on a close-date basis. Meaning belongs further up.
      </p>
    </>
  );
}
