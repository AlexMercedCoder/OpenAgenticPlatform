import type { Article } from './types';

export const article: Article = {
  slug: 'portable',
  title: 'Portable',
  kind: 'concept',
  layer: null,
  kicker: 'OPENNESS TEST / 03',
  summary: 'Whether identity, skills, context, and work can move between environments, tools, and organizations without being rebuilt.',
  standfirst: 'Replaceability asks whether you can change a component. Portability asks whether what you built moves with you. The two are related and not the same, and portability is the one that determines whether a decade of accumulated definitions survives a change of tooling.',
  keywords: ['portability', 'portable agents', 'agent definitions', 'data portability', 'open formats', 'migration', 'exportability'],
  sections: [
    { id: 'the-property', label: 'The property' },
    { id: 'versus-replaceable', label: 'How it differs from replaceable' },
    { id: 'what-should-move', label: 'What should actually move' },
    { id: 'degrees', label: 'Degrees of portability' },
    { id: 'by-layer', label: 'Portability per layer' },
    { id: 'projection', label: 'The projection problem' },
    { id: 'time', label: 'Portability through time' },
    { id: 'testing', label: 'Testing it' },
    { id: 'organizational', label: 'The organizational dimension' },
    { id: 'practices', label: 'Practices that preserve it' },
    { id: 'cost', label: 'The cost, stated plainly' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'A portable format for agent identity and learned state, with conformance levels that keep portability honest.' },
    { label: 'Agent Skills', href: 'https://agentskills.io', note: 'A portable capability format with broad independent adoption.' },
    { label: 'Agentic Graph Specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'A portable format for the shape of a piece of work.' },
    { label: 'Apache Parquet', href: 'https://parquet.apache.org', note: 'A self-describing file format, which is portability at the storage layer.' },
  ],
  related: ['replaceable', 'open-standards', 'open-agent-profile'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="the-property">The property</h2>
      <p>
        Portable asks whether identity, skills, context, and work can move. Between machines, between tools, between
        environments, between organizations, and forward through time.
      </p>
      <p>
        The question is about artifacts rather than about components. Replaceability concerns whether you could
        substitute a piece of infrastructure. Portability concerns whether the things you spent two years creating
        survive that substitution.
      </p>

      <h2 id="versus-replaceable">How it differs from replaceable</h2>
      <p>
        The distinction is worth being precise about, because systems can have one without the other and the failure
        modes differ.
      </p>
      <p>
        A system can be replaceable and not portable. Two harnesses are interchangeable, and everything you defined
        in one has to be recreated in the other. You can switch, and switching costs everything you built.
      </p>
      <p>
        A system can be portable and not replaceable. Your definitions are in open formats, and only one runtime
        implements them. The artifacts would move if there were anywhere to move them to.
      </p>
      <p>
        Both properties together are what produce actual freedom, and they are produced by different things.
        Replaceability comes from interfaces and abstractions. Portability comes from formats and export paths.
      </p>

      <h2 id="what-should-move">What should actually move</h2>
      <p>
        Not everything needs to be portable, and treating everything as though it does produces a system optimized
        for a migration that never happens. The useful test is whether an artifact could be recreated from knowledge
        you still have.
      </p>
      <p>
        Things that must be portable, because they cannot be recreated:
      </p>
      <ul>
        <li><b>Agent identity and permissions.</b> What each agent is and what it may do, including the reasoning behind narrow grants.</li>
        <li><b>Accumulated state.</b> What agents learned: conventions, corrections, open threads. This is the artifact with no other source.</li>
        <li><b>Skills and procedures.</b> Organizational knowledge that took months to elicit from the people who held it.</li>
        <li><b>Semantic definitions.</b> What a metric means, which table is authoritative. Recreating these means having the same arguments again.</li>
        <li><b>Data and its history.</b> Including the snapshot record that makes past answers reproducible.</li>
        <li><b>Evaluation sets.</b> Real tasks with known answers, which are tedious to assemble and essential for judging anything.</li>
      </ul>
      <p>
        Things that need not be, because rebuilding them is ordinary work:
      </p>
      <ul>
        <li>Deployment configuration and infrastructure definitions.</li>
        <li>The harness itself, provided the definitions moved.</li>
        <li>Model choices, which change anyway.</li>
        <li>Monitoring dashboards, which are cheap to rebuild and rarely worth migrating.</li>
      </ul>

      <h2 id="degrees">Degrees of portability</h2>
      <p>
        Portability is not binary, and naming the levels makes conversations about it more productive than arguing
        about whether something is portable.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead><tr><th>Level</th><th>What it means</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td>Trapped</td><td>No export exists. The artifact leaves only by being retyped.</td><td>Definitions entered in a web interface with no download.</td></tr>
            <tr><td>Exportable</td><td>An export exists in a proprietary shape. Moving means writing a converter.</td><td>A product-specific JSON dump.</td></tr>
            <tr><td>Open format</td><td>A documented format that other things could read, whether or not any do.</td><td>A specification with one implementation.</td></tr>
            <tr><td>Portable in practice</td><td>Multiple independent implementations read it today.</td><td>Parquet files, MCP servers, Agent Skills.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The gap between the third and fourth levels is the one people underestimate. A published specification with a
        single implementation has not been tested as a specification. The second implementation is what proves the
        document was sufficient, which is why counting independent implementations is a better portability signal
        than reading the specification.
      </p>

      <h2 id="by-layer">Portability per layer</h2>
      <p>
        The four layers have very different portability profiles, and knowing which is which tells you where to spend
        effort.
      </p>
      <p>
        <b>Data and semantics</b> is the best served. Open file formats are self-describing and readable
        indefinitely. Table formats carry schema and history. What does not move automatically is the catalog state,
        meaning grants and registrations, and the semantic definitions if they live inside a BI product. Those two
        are the gaps worth closing.
      </p>
      <p>
        <b>Models and routing</b> is portable at the interface and not at the artifact. Prompts and tool schemas move
        if written for portability. A hosted model does not move at all, which is the argument for open weights when
        reproducibility matters.
      </p>
      <p>
        <b>Harnesses and brokers</b> is the weakest layer and the one where deliberate effort matters most. Almost
        nothing moves by default. Everything that moves does so because it was expressed in a standards-layer format
        rather than in harness configuration.
      </p>
      <p>
        <b>Open standards</b> is the layer whose entire purpose is portability, which makes it the layer to judge
        most strictly. A standard that is not portable in practice has failed at its only job.
      </p>

      <h2 id="projection">The projection problem</h2>
      <p>
        Portability across heterogeneous systems raises a problem that a format alone cannot solve, and the honest
        handling of it is a design property worth insisting on.
      </p>
      <p>
        Runtimes support different things. One enforces a tool denylist natively; another has no permission system at
        all. One supports skills; another does not. A portable artifact moved between them does not mean the same
        thing in both places.
      </p>
      <p>
        There are three possible responses and only one is safe. Pretending uniformity, and silently dropping what is
        unsupported, is the worst: a profile that declares a boundary runs somewhere that ignores it, and the user
        believes in a control that does not exist. Refusing anything not fully supported is safe and reduces
        portability to the intersection of every implementation, which is close to nothing.
      </p>
      <p>
        Projecting and reporting honestly is the third. This capability is native here, this one is approximated,
        this one is degraded in this specific way, this one is unavailable. The user then decides whether the
        projection is acceptable for the work at hand.
      </p>
      <p>
        This is why conformance levels with a requirement to publish what is not implemented are more than
        bureaucracy. Partial support is fine. Partial support that looks complete is not, because someone will review
        an artifact, run it elsewhere, and get something different from what they read.
      </p>

      <h2 id="time">Portability through time</h2>
      <p>
        Most discussion of portability concerns moving between systems. The harder and less discussed direction is
        moving forward through time, into a future where the tools that created an artifact no longer exist.
      </p>
      <p>
        The data layer solved this decades ago and the lesson transfers. A Parquet file written today is readable in
        fifteen years because it is self-describing: the schema travels with the data, the encodings are documented,
        and no external system is required to interpret it. That property was designed in, and it is why the format
        outlived several generations of the engines that wrote it.
      </p>
      <p>
        Agentic artifacts mostly do not have this property yet, and the gap is worth naming per artifact.
      </p>
      <ul>
        <li>
          <b>Skills</b> age well. Markdown with a documented frontmatter convention is readable by a person with no
          tooling at all, which is the strongest form of durability.
        </li>
        <li>
          <b>Profiles</b> age well for the same reason, provided the artifact declares which specification version it
          targets. Without that declaration, a future reader has to guess what a field meant.
        </li>
        <li>
          <b>Graphs</b> age well as documents and less well as executable things, because they reference tools and
          systems that may not exist later. A graph is still readable as a record of intent, which is often what you
          want from it years afterwards.
        </li>
        <li>
          <b>Accumulated state</b> ages worst. It refers to systems, people, and situations that change, and a fact
          recorded three years ago with no timestamp or provenance is worse than nothing because it is confidently
          stale. This is the strongest argument for state entries carrying confidence and source rather than being
          plain text.
        </li>
        <li>
          <b>Traces</b> age only as well as their format. Recorded in a standard tracing format, they remain readable
          by general tooling; recorded in a bespoke shape, they become unreadable when the viewer is retired.
        </li>
      </ul>
      <p>
        The practical habit is small: declare a version in every artifact, timestamp anything that describes a state
        of the world, and prefer text formats a human could interpret without software. All three cost nothing at
        write time and are impossible to add later.
      </p>

      <h2 id="testing">Testing it</h2>
      <p>
        Portability that is never exercised is a claim rather than a property, and the tests are cheap.
      </p>
      <ol>
        <li><b>Load your skills in a second harness.</b> Once. See what activates and what does not.</li>
        <li><b>Run one agent profile through a broker onto a second runtime.</b> Read the projection report rather than only the outcome.</li>
        <li><b>Read a table with an engine you do not normally use.</b> Format compatibility claims are easier to make than to verify.</li>
        <li><b>Export everything and try to reconstruct.</b> The most revealing test and the one nobody runs. Take the exports and ask whether a new environment could be stood up from them alone.</li>
        <li><b>Check that your evaluation set is itself portable.</b> An evaluation harness that only runs against one provider is a portability gap in the thing you use to measure portability.</li>
      </ol>
      <div className="kb-callout">
        <b>The uncomfortable question</b>
        <p>
          If your primary vendor terminated your account tomorrow with a thirty-day export window, what would you
          actually be able to take? The answer is your real portability score, and most teams have never asked it.
        </p>
      </div>

      <h2 id="organizational">The organizational dimension</h2>
      <p>
        Portability is usually discussed as a technical property and it is also an organizational one, in ways that
        matter more than the technical framing suggests.
      </p>
      <p>
        Knowledge held in one person&apos;s head is not portable. When they leave, it leaves. A skill that captures
        the same procedure moves to whoever needs it, which is a form of portability that has nothing to do with
        formats.
      </p>
      <p>
        Definitions held in one team&apos;s tooling are not portable across teams. A metric definition inside one
        group&apos;s BI project cannot be used by another group&apos;s agent, so the second group defines their own,
        and the organization now has two answers to one question.
      </p>
      <p>
        This is worth naming because it changes the justification. Making artifacts portable is often argued for on
        the basis of hypothetical vendor changes, which are easy to discount. The immediate benefit is usually
        internal: definitions that move between teams, procedures that survive turnover, and agents that a colleague
        can pick up. Those benefits arrive whether or not anything is ever migrated.
      </p>

      <h2 id="practices">Practices that preserve it</h2>
      <ol>
        <li><b>Definitions in files, in version control.</b> The single most effective practice. Product state does not move; files do.</li>
        <li><b>Prefer formats with independent implementations.</b> Count them rather than reading the specification.</li>
        <li><b>Keep accumulated state exportable.</b> Memory and learned state are the irreplaceable artifacts. Check the export path before you depend on the store.</li>
        <li><b>Declare versions in artifacts.</b> An artifact without a stated specification version becomes ambiguous the first time the specification changes.</li>
        <li><b>Treat extensions as decisions.</b> Using an implementation-specific extension is sometimes right. Record that you did, and what stops working if you move.</li>
        <li><b>Insist on honest projection.</b> When a tool maps your artifacts onto something else, prefer the one that tells you what it dropped.</li>
        <li><b>Test annually.</b> A portability check once a year catches drift while it is still cheap.</li>
      </ol>

      <h2 id="cost">The cost, stated plainly</h2>
      <p>
        Portability is usually argued for and rarely priced, which makes the argument less persuasive than it should
        be. The costs are real and worth naming.
      </p>
      <p>
        <b>You work at the intersection.</b> A portable format supports what multiple implementations support, which
        is less than the best of them offers. Accepting that means occasionally declining a capability that would
        have been useful.
      </p>
      <p>
        <b>Artifacts need maintenance.</b> Skills go stale, profiles reference systems that changed, graphs point at
        tools that were retired. Portable artifacts are code-adjacent and need the same validation and review, which
        is ongoing work that product state does not require because the product enforces its own consistency.
      </p>
      <p>
        <b>Versions need tracking.</b> Each specification adopted is one more thing with a version, a deprecation
        policy, and a migration path.
      </p>
      <p>
        <b>The benefit is contingent.</b> The payoff arrives if you migrate, if a vendor changes terms, if a team
        splits. None of those may happen, and the cost is paid regardless.
      </p>
      <p>
        This asymmetry is why portability loses arguments in the moment. The counter is not to argue harder about
        hypothetical migrations but to notice the benefits that arrive immediately: definitions that move between
        teams, procedures that survive turnover, artifacts a new colleague can read, and review by people who could
        not review a product configuration. Those accrue whether or not anything is ever migrated, and they are
        usually the stronger case.
      </p>

      <h2 id="not">What it is not</h2>
      <p>
        Portable is not the same as identical. An artifact moved to a runtime with different capabilities may behave
        differently. The goal is that it moves and that the differences are known, not that they do not exist.
      </p>
      <p>
        Portable is not the same as standard. A format can be standardized and unportable if no second
        implementation exists, and an informal convention can be highly portable if everything reads it.
      </p>
      <p>
        Portable is not free. Portable formats work at the intersection of what implementations support, which means
        giving up some capability that a proprietary format would offer. That trade is worth making for artifacts you
        cannot recreate and often not worth making for everything else.
      </p>
    </>
  );
}
