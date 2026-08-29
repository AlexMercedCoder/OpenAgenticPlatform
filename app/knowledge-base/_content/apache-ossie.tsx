import type { Article } from './types';

export const article: Article = {
  slug: 'apache-ossie',
  title: 'Apache Ossie',
  kind: 'technology',
  layer: 'data-and-semantics',
  kicker: 'DATA AND SEMANTICS / SEMANTIC METADATA',
  summary: 'An incubating Apache project defining a vendor-neutral, declarative standard for semantic metadata, so metrics and dimensions are defined once and used consistently everywhere.',
  standfirst: 'Storage formats made data portable. Meaning stayed trapped inside whichever tool defined it. Ossie is an effort to make the semantic layer itself an open, declarative artifact rather than a feature of a BI product.',
  keywords: ['Apache Ossie', 'semantic layer', 'semantic metadata standard', 'metric definitions', 'metric drift', 'AI grounding', 'headless BI'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'the-problem', label: 'The problem it addresses' },
    { id: 'metric-drift', label: 'Metric drift, described concretely' },
    { id: 'building-blocks', label: 'The building blocks' },
    { id: 'example', label: 'What a definition looks like' },
    { id: 'write-once', label: 'Write once, query anywhere' },
    { id: 'agentic-relevance', label: 'Why agents raise the stakes' },
    { id: 'what-it-does-not-solve', label: 'What a standard cannot solve' },
    { id: 'status', label: 'Project status' },
    { id: 'adoption', label: 'Adopting a semantic layer' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Apache Ossie project site', href: 'https://ossie.apache.org', note: 'The project description, specification material, and current incubation status.' },
    { label: 'Apache Incubator', href: 'https://incubator.apache.org', note: 'Background on what incubating status means and what graduation requires.' },
    { label: 'Semantic Lakehouse', href: 'https://semanticlakehouse.com', note: 'Practitioner writing on modeling meaning over open tables.' },
    { label: 'Apache Iceberg', href: 'https://iceberg.apache.org', note: 'The table layer a semantic model usually sits on top of.' },
  ],
  related: ['data-and-semantics', 'apache-iceberg', 'grounded'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Apache Ossie is an incubating project at the Apache Software Foundation working on a standard for semantic
        metadata. The project describes itself as a universal standard for semantic data, aimed at how semantic
        definitions are exchanged across analytics, business intelligence, and AI systems.
      </p>
      <p>
        The form it takes is a declarative specification, expressed in YAML, for describing semantic models: the
        datasets, fields, metrics, dimensions, and relationships that turn physical tables into things people and
        software can reason about. The stated goal is to define these once and have every tool in a stack work from
        the same definitions.
      </p>
      <p>
        It is worth being straightforward about maturity. Ossie is incubating, which means it has been accepted into
        the Apache Incubator and has not yet graduated to a top-level project. It is included here because the
        problem it addresses is real, unavoidable, and currently solved badly almost everywhere, not because adoption
        is settled.
      </p>

      <h2 id="the-problem">The problem it addresses</h2>
      <p>
        Over the last decade the data industry solved portability at the physical layer thoroughly. Open file
        formats, open table formats, and open catalog protocols mean the same bytes can be read by many engines
        without conversion or permission.
      </p>
      <p>
        Meaning did not follow. The definition of a metric, the relationship between two entities, and the judgment
        that one table is authoritative all live somewhere, and that somewhere is usually a proprietary modeling
        layer inside a BI tool, a transformation project&apos;s configuration, or nowhere at all.
      </p>
      <p>
        The result is that an organization can move its data anywhere and cannot move its understanding of that data
        anywhere. Every new consumer, whether a second BI tool, a notebook, a data application, or an agent,
        re-derives the definitions from column names and guesswork.
      </p>
      <p>
        The project frames this as semantic fragmentation, and the symptoms it names are the ones practitioners
        recognize immediately: metric drift, manual translation errors, and unreliable AI grounding from conflicting
        data logic.
      </p>

      <h2 id="metric-drift">Metric drift, described concretely</h2>
      <p>
        Abstractions here are less useful than an example, so take a common one.
      </p>
      <p>
        A company tracks monthly active users. Marketing&apos;s dashboard counts distinct users with any recorded
        event in the month. Product&apos;s dashboard counts distinct users with at least one session lasting more
        than thirty seconds, because bounces were judged not to be usage. Finance counts distinct billing accounts
        with activity, which is a different unit entirely because one account may have several users.
      </p>
      <p>
        All three are defensible. All three are called monthly active users. The numbers differ by twenty percent,
        and the difference surfaces in a meeting, where forty minutes are spent reconciling definitions rather than
        deciding anything.
      </p>
      <p>
        Nothing in this story involves bad data, a broken pipeline, or a mistake. Three teams encoded three
        reasonable definitions in three tools, and no artifact anywhere records that these are different metrics that
        share a name. The physical layer is in perfect shape. The semantic layer does not exist.
      </p>
      <p>
        Now add an agent. Asked for monthly active users, it will find one of the three, or compute a fourth, and
        report a number with no indication that the question was ambiguous. The ambiguity was always there. The agent
        simply removes the human who would have asked which one you meant.
      </p>

      <h2 id="building-blocks">The building blocks</h2>
      <p>
        The specification defines a small set of concepts, and their value is mostly in being named consistently
        rather than in being novel.
      </p>
      <ul>
        <li>
          <b>Semantic models.</b> The container. A coherent set of definitions covering some domain, versioned as a
          unit.
        </li>
        <li>
          <b>Datasets.</b> The physical things being described: tables or views that the model maps onto. This is the
          join point between meaning and storage.
        </li>
        <li>
          <b>Fields.</b> Columns with a declared role and meaning rather than just a name and a type.
        </li>
        <li>
          <b>Dimensions.</b> The attributes work is grouped and filtered by: region, product, channel, date. A
          dimension is a modeling decision, not a column property, which is why declaring it matters.
        </li>
        <li>
          <b>Metrics.</b> The quantities being measured, with their computation stated explicitly. This is the
          element that most directly prevents the failure described above.
        </li>
        <li>
          <b>Relationships.</b> How datasets connect, including the join keys and the cardinality. Undeclared
          cardinality is the usual cause of aggregations that double count.
        </li>
      </ul>
      <p>
        Expressed as YAML, these become artifacts that live in version control, get reviewed like code, and carry a
        history. That property is worth as much as the format itself. A metric definition that changes through a
        reviewed commit is governable. One that changes because someone edited a dashboard is not.
      </p>

      <h2 id="example">What a definition looks like</h2>
      <p>
        The concepts above are easier to judge against something concrete. A semantic definition for the metric in
        the earlier example carries roughly this information, whatever the exact syntax:
      </p>
      <ul>
        <li><b>A name and an identifier.</b> Distinct, because the display name may change and references should not break.</li>
        <li><b>A description in plain language.</b> Written for someone who does not know the schema. This is the field an agent reads when deciding whether the metric answers a question.</li>
        <li><b>The computation.</b> Distinct count of user identifiers, over the sessions dataset, where session duration exceeds thirty seconds.</li>
        <li><b>The grain.</b> One value per calendar month, per whatever dimensions it is sliced by.</li>
        <li><b>Valid dimensions.</b> The attributes it may legitimately be broken down by, which prevents slicing by something that produces a meaningless number.</li>
        <li><b>The dataset it depends on.</b> Which is the link to the physical table, and therefore the thing that can be validated automatically.</li>
        <li><b>Ownership and trust.</b> Who defines it, and whether it is certified for external reporting or exploratory.</li>
      </ul>
      <p>
        Two of these fields do most of the work in an agentic system, and they are the two most often left blank. The
        plain-language description is what lets an agent choose correctly between similar metrics. The valid
        dimensions list is what stops it producing a technically computable number that means nothing, such as
        monthly active users broken down by individual session.
      </p>
      <p>
        The third underrated field is trust. An agent that can say this figure comes from a certified metric, or
        alternatively that the only available definition is exploratory and should be treated as indicative, is
        communicating something a bare number cannot. Systems that expose trust level tend to produce answers people
        act on with appropriate confidence, which is a better outcome than answers that are always presented with the
        same certainty regardless of their provenance.
      </p>

      <h2 id="write-once">Write once, query anywhere</h2>
      <p>
        The phrase the project uses for its goal is write once, query anywhere. The intent mirrors what table formats
        did one layer down.
      </p>
      <p>
        Before open table formats, moving from one engine to another meant reloading data. After them, a table is a
        table and engines are interchangeable. The semantic argument is the same shape: before a shared semantic
        standard, moving from one BI tool to another means re-modeling. After one, the model is an artifact and the
        tools are consumers of it.
      </p>
      <p>
        The consumer list is longer than it used to be, which is what has made this urgent rather than merely
        desirable. A modern stack has dashboards, notebooks, embedded analytics, data applications, reverse ETL, and
        now agents, all needing the same definitions. Maintaining six copies of a metric definition was tolerable
        when there were two consumers. It is not tolerable at six, and it is actively dangerous when one of them
        answers questions autonomously.
      </p>

      <h2 id="agentic-relevance">Why agents raise the stakes</h2>
      <p>
        A semantic layer was always valuable. Agents change it from valuable to load-bearing, for four reasons.
      </p>
      <h3>Agents cannot ask a colleague</h3>
      <p>
        A human analyst facing four revenue tables asks someone. An agent picks one. The organizational knowledge
        that resolved the ambiguity was never written down, so the agent cannot access it, and its choice is
        arbitrary in a way that looks authoritative.
      </p>
      <h3>Agents operate without a review step</h3>
      <p>
        A dashboard built on the wrong table gets reviewed by someone who notices the number looks off. An agent
        answering a question in a chat window has no such gate. The definition has to be right before the question
        is asked.
      </p>
      <h3>Agents work across domains</h3>
      <p>
        A single agent may touch finance, product, and support data in one task. Human analysts specialize and carry
        domain conventions in their heads. An agent needs those conventions written down, or it applies one domain&apos;s
        assumptions to another&apos;s data.
      </p>
      <h3>Descriptions become executable context</h3>
      <p>
        In an agentic system, a metric description is not documentation, it is input to a decision. This changes the
        economics of writing it. Time spent describing a metric well is no longer overhead that might help someone
        later; it directly determines whether answers are correct.
      </p>

      <h3>The same definitions serve both audiences</h3>
      <p>
        There is a quieter benefit that only appears once a system is running. When the dashboard a person reads and
        the answer an agent gives are computed from the same definition, they agree. When they are computed from
        separate implementations, they diverge occasionally, and every divergence costs an investigation. Removing
        that class of discrepancy is worth more over a year than most of the performance work teams do in the same
        period, and it is achieved by writing the definition down once rather than by any clever engineering.
      </p>

      <h2 id="what-it-does-not-solve">What a standard cannot solve</h2>
      <p>
        It is worth being clear about the limits, because semantic layers are sometimes sold as though the format
        were the hard part.
      </p>
      <p>
        A standard makes definitions portable and reviewable. It does not produce agreement. If three teams genuinely
        disagree about what monthly active users means, writing all three definitions in YAML gives you three
        definitions in a shared format. That is a real improvement, because the disagreement becomes visible and
        nameable, and it is not resolution.
      </p>
      <p>
        A standard also does not maintain itself. Semantic models drift from the tables underneath them as schemas
        change, and a model that claims a column exists when it does not is worse than no model, because it is
        confidently wrong. Validation against the physical layer has to be part of the process, in the same way that
        tests are part of the process for code.
      </p>
      <p>
        Finally, a standard does not decide who should define things. The most common organizational failure is not
        an absent format but an absent owner. Metrics with no owner accumulate variants regardless of how they are
        expressed.
      </p>

      <h2 id="status">Project status</h2>
      <p>
        Ossie is in the Apache Incubator. Practically, that means the project has been accepted, is developing under
        Apache governance and the Apache 2.0 license, and has not yet demonstrated the community diversity and
        process maturity required for graduation to a top-level project.
      </p>
      <p>
        Reading incubating status correctly matters. It is not a warning label about quality. It is a statement about
        governance maturity and community breadth. Some incubating projects graduate and become infrastructure.
        Others do not attract sufficient community and are retired. Both outcomes are normal, and the incubator
        exists precisely to let that be determined in public.
      </p>
      <p>
        For a team evaluating adoption, the reasonable posture is to treat the specification as a useful way to
        express semantic definitions today, while keeping the definitions themselves in a form you would be willing
        to translate if the standard does not become the dominant one. Since the definitions are declarative YAML
        describing your own metrics, that translation risk is much lower than it would be for a runtime dependency.
      </p>

      <h2 id="adoption">Adopting a semantic layer</h2>
      <p>
        The advice below applies to semantic modeling generally and is not specific to any one specification.
      </p>
      <ol>
        <li>
          <b>Start with the metrics that appear in decisions.</b> Not all of them. The ten to twenty that show up in
          reviews, targets, and arguments. These carry nearly all of the risk.
        </li>
        <li>
          <b>Write definitions where the disagreement is.</b> The metrics people already argue about are the ones
          where writing it down produces immediate value.
        </li>
        <li>
          <b>Name an owner per model.</b> A definition with no owner has no mechanism for resolving a future
          disagreement.
        </li>
        <li>
          <b>Put the models in version control.</b> Review, history, and rollback come along for free, and the
          history is often the artifact that settles a dispute.
        </li>
        <li>
          <b>Validate against the physical layer in continuous integration.</b> Catch a dropped column at commit
          time, not when an agent reports a broken metric to a customer.
        </li>
        <li>
          <b>Expose the model to agents as a tool.</b> A lookup that returns a metric definition, its owner, and its
          freshness is one of the highest-value tools you can give an agent, and it is straightforward to build.
        </li>
        <li>
          <b>Record trust level explicitly.</b> Certified, provisional, and exploratory are different, and an agent
          should be able to tell the difference and say so in its answer.
        </li>
      </ol>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li>
          <b>Modeling everything.</b> A semantic model covering every table becomes a second schema to maintain and
          is abandoned. Cover what matters.
        </li>
        <li>
          <b>Definitions that drift from reality.</b> Unvalidated models rot quietly. The failure is silent until
          something depends on it.
        </li>
        <li>
          <b>Treating the model as documentation.</b> If nothing reads it at runtime, nobody maintains it. The model
          has to be in the path of real queries to stay honest.
        </li>
        <li>
          <b>Confusing a semantic layer with a transformation layer.</b> Transformations produce tables. Semantic
          models describe what those tables mean. Both are needed and they are not the same artifact.
        </li>
        <li>
          <b>Adopting a standard without an owner.</b> The format is the easy part. The governance is the work.
        </li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Promising. Declarative YAML describing your own definitions is inherently easier to move than a model inside a product.</li>
        <li><b>Inspectable.</b> Strong. Definitions are human-readable text, reviewable by domain experts who do not write code.</li>
        <li><b>Portable.</b> The entire point of the project, and the property to test against real second implementations as the ecosystem develops.</li>
        <li><b>Bounded.</b> Not applicable. A semantic model describes meaning, not authority.</li>
        <li><b>Grounded.</b> Directly. This is the layer that makes the grounded property achievable at all.</li>
        <li><b>Auditable.</b> Strong when models live in version control, since every definition change carries an author and a reason.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        A semantic layer is not a query engine. It describes how to compute a metric; something else computes it.
      </p>
      <p>
        It is not a catalog. The catalog knows what tables exist and who may read them. The semantic model knows what
        they mean. Both are needed, and a system with only one of them has a visible gap.
      </p>
      <p>
        It is not a substitute for good table design. Semantic modeling on top of tables that mix grains, lack keys,
        and encode meaning in string columns produces an accurate description of a mess. Modeling clarifies; it does
        not repair.
      </p>
      <p>
        Finally, it is not a guarantee of correct answers. It removes ambiguity about what was asked and computed,
        which is a large share of the problem, and the underlying data still has to be right.
      </p>
    </>
  );
}
