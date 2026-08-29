import type { Article } from './types';

export const article: Article = {
  slug: 'replaceable',
  title: 'Replaceable',
  kind: 'concept',
  layer: null,
  kicker: 'OPENNESS TEST / 01',
  summary: 'Whether one component can be swapped without rebuilding the system, which is the property most claimed and least tested.',
  standfirst: 'Replaceability is not a licensing question. It is a question about how much of your system assumes a particular component. The answer is usually discovered at the worst possible time, which is why it is worth measuring deliberately.',
  keywords: ['replaceable architecture', 'vendor lock-in', 'component swapping', 'loose coupling', 'agentic AI architecture', 'exit cost'],
  sections: [
    { id: 'the-property', label: 'The property' },
    { id: 'why-it-matters', label: 'Why it matters more for agents' },
    { id: 'where-it-fails', label: 'Where replaceability actually fails' },
    { id: 'by-layer', label: 'What replaceable means per layer' },
    { id: 'worked-example', label: 'A worked example' },
    { id: 'measuring', label: 'Measuring it honestly' },
    { id: 'exercising', label: 'Exercising it, not just claiming it' },
    { id: 'cost', label: 'The cost of replaceability' },
    { id: 'bundles', label: 'Bundles and accumulated dependence' },
    { id: 'when-not', label: 'When not to pay for it' },
    { id: 'objections', label: 'Objections worth taking seriously' },
    { id: 'practices', label: 'Practices that preserve it' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'The protocol that makes tool integrations replaceable rather than harness-specific.' },
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'A portable format for agent identity, which is what makes a harness replaceable in practice.' },
    { label: 'Apache Iceberg', href: 'https://iceberg.apache.org', note: 'An example of replaceability at the data layer, where multiple engines read the same tables.' },
    { label: 'Iceberg REST catalog specification', href: 'https://github.com/apache/iceberg/blob/main/open-api/rest-catalog-open-api.yaml', note: 'A protocol that makes the catalog itself replaceable.' },
  ],
  related: ['portable', 'inspectable', 'open-standards'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="the-property">The property</h2>
      <p>
        Replaceable asks a single question: can one component be swapped without rebuilding the system?
      </p>
      <p>
        Note what it does not ask. It does not ask whether the component is open source, whether it uses standard
        formats, or whether an alternative exists. Those are inputs to the answer rather than the answer. A system
        built entirely from open source components can be completely unreplaceable if every component assumes the
        others.
      </p>
      <p>
        The property is a statement about coupling, not about licensing. It is measured in how much work a
        substitution would be, and the honest unit of measure is engineer-weeks rather than yes or no.
      </p>

      <h2 id="why-it-matters">Why it matters more for agents</h2>
      <p>
        Every architecture benefits from loose coupling. Agentic architecture benefits unusually, for three reasons
        specific to this moment.
      </p>
      <p>
        <b>The components change quickly.</b> Model capability moves in months. Harness design is still being worked
        out. Standards are young. A system that cannot absorb component change will be rebuilt or will fall behind,
        and both are expensive.
      </p>
      <p>
        <b>The layers have very different lifetimes.</b> Storage and table decisions last years. Model decisions last
        months. A system where a model change requires touching the data layer has coupled a fast-moving decision to
        a slow-moving one, which is the wrong way round.
      </p>
      <p>
        <b>The pressure toward suites is strong.</b> Vendors offer models, tools, harnesses, memory, and hosting
        together, and the bundle genuinely reduces time to a working system. The cost is not paid at adoption. It is
        paid at the point of change, in proportion to how many bundled pieces you came to depend on.
      </p>

      <h2 id="where-it-fails">Where replaceability actually fails</h2>
      <p>
        Teams worry about the wrong things. The API key is not the problem. The client library is not the problem.
        Both are trivially swapped. Replaceability fails in five quieter places.
      </p>
      <h3>Definitions stored in a product</h3>
      <p>
        Skills entered into a web interface. Tool configurations in a proprietary format. Agent definitions in
        product state rather than in files. When these live inside a component, moving means re-entering them, and
        re-entering them means someone reconstructs them from memory and misses something.
      </p>
      <h3>Prompts tuned to one model</h3>
      <p>
        Phrasing refined over months against a specific model&apos;s behavior. This is a real form of lock-in that
        appears in no contract and no dependency list, and nobody schedules the work to undo it.
      </p>
      <h3>Designs that assume capability</h3>
      <p>
        An agent given vague instructions and thirty tools works on a frontier model and falls apart on anything
        else. The design, not the integration, is what pins you. This is the hardest form to notice because it looks
        like the system working.
      </p>
      <h3>Absent evaluation</h3>
      <p>
        Without a recorded evaluation set, nobody can tell whether an alternative is adequate. So the alternative is
        never seriously considered, and the incumbent stays by default rather than by decision.
      </p>
      <h3>Accumulated state with no export</h3>
      <p>
        What an agent has learned is the part that cannot be recreated. If memory lives only in a hosted store with
        no export path, that is the thing that actually holds you, regardless of how portable everything else is.
      </p>

      <h2 id="by-layer">What replaceable means per layer</h2>
      <p>
        The question has a different shape in each layer, and the difficulty is not evenly distributed.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead><tr><th>Layer</th><th>The question</th><th>Typical difficulty</th></tr></thead>
          <tbody>
            <tr>
              <td>Data and semantics</td>
              <td>Could a different engine read the same tables tomorrow?</td>
              <td>Low with open table formats and an open catalog protocol. High with a proprietary warehouse.</td>
            </tr>
            <tr>
              <td>Models and routing</td>
              <td>How many files change if the primary model changes?</td>
              <td>Low with a routing abstraction. High without one, and the difficulty is invisible until you try.</td>
            </tr>
            <tr>
              <td>Harnesses and brokers</td>
              <td>How much would you rewrite moving to another harness?</td>
              <td>Highest of the four. This is where portable definitions matter most and are least common.</td>
            </tr>
            <tr>
              <td>Open standards</td>
              <td>Could a second implementation read your artifacts?</td>
              <td>Low if the specification has independent implementations. Unknown if it has one.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The execution layer is the hard one, and it is worth being explicit about why. Data formats and model APIs
        have converged enough to be reasonably portable. Harnesses have not. A great deal of what a team builds in
        that layer is harness-specific unless they deliberately push definitions out into portable forms, which is
        the entire reason the standards layer exists.
      </p>

      <h2 id="worked-example">A worked example</h2>
      <p>
        The property is easier to judge against a concrete change. Take a team that decides to move its primary model
        from one provider to another, for a reason that is entirely ordinary: pricing changed, or a better model
        appeared, or a data residency requirement arrived.
      </p>
      <p>
        In a system with poor replaceability, the work looks like this. Provider client calls appear in thirty-one
        files, several with provider-specific parameters. Tool schemas were written in one vendor&apos;s dialect and
        have to be translated. Prompts were tuned against the old model&apos;s behavior over eight months, and
        several stop working. There is no evaluation set, so nobody can say whether the new arrangement is better or
        worse, which means the change cannot be approved. The project stalls, and the team stays where it is for
        reasons nobody would defend if stated aloud.
      </p>
      <p>
        In a system with good replaceability, the same change looks like this. One configuration file names the
        model per role. The evaluation set runs against both, producing a comparison across quality, cost, and
        latency. Two roles improve, one regresses slightly, and the regression is investigated and traced to a
        structured-output difference that is fixed in the schema translation layer. The change ships in three days
        with evidence.
      </p>
      <p>
        Nothing in the second scenario required foresight about which provider would be chosen. It required four
        habits adopted early: one call site, roles rather than model names, portable schemas, and an evaluation set.
        Each of those is an afternoon of work at the beginning and a month of work retrofitted.
      </p>

      <h2 id="measuring">Measuring it honestly</h2>
      <p>
        The useful measurement is not a score. It is an answer to a specific question, written down.
      </p>
      <div className="kb-callout">
        <b>The exercise</b>
        <p>
          For each major component, write one sentence describing what you would do if it became unavailable,
          tripled in price, or changed its licensing next quarter. Then estimate the work. Keep the list current.
        </p>
      </div>
      <p>
        This takes an hour and produces something that no amount of architectural discussion produces: a specific,
        reviewable number per component. It also tends to surface surprises. Teams routinely find that the component
        they worried about is easy to replace and the one nobody thought about is not.
      </p>
      <p>
        The answers fall into three useful categories. A configuration change plus a round of evaluation is healthy.
        A week of focused work is acceptable for a component you chose deliberately. A project measured in months
        means the coupling is real and should be either reduced or consciously accepted.
      </p>
      <p>
        Consciously accepted is a legitimate outcome. The failure is not depending on something. It is depending on
        something without knowing.
      </p>

      <h2 id="exercising">Exercising it, not just claiming it</h2>
      <p>
        Replaceability that is never exercised quietly stops working. Interfaces drift, assumptions accumulate, and
        the alternative path rots.
      </p>
      <p>
        The practices that keep it real are small and have to be habitual:
      </p>
      <ul>
        <li><b>Run a second model family occasionally.</b> Even for a small share of traffic. This catches prompt coupling and provider-specific assumptions while they are still cheap to fix.</li>
        <li><b>Develop against a local endpoint.</b> Prompts that only work on one frontier model reveal themselves immediately.</li>
        <li><b>Run your evaluation set against alternatives on a schedule.</b> Not to switch, but to know whether you could.</li>
        <li><b>Load your skills and profiles in a second harness.</b> Even once. The projection report tells you what would actually survive.</li>
        <li><b>Read a table with a second engine.</b> Occasionally. Format compatibility claims are easier to make than to verify.</li>
      </ul>
      <p>
        Each of these is an afternoon. Together they turn a claimed property into a tested one, which is the only
        kind worth relying on.
      </p>

      <h2 id="cost">The cost of replaceability</h2>
      <p>
        Being honest about the cost is what separates a useful principle from a slogan.
      </p>
      <p>
        Abstraction layers add indirection, which adds latency and code to maintain. Portable formats mean working
        with the intersection of what implementations support rather than the best any one offers. Provider-specific
        capabilities arrive late or not at all. Evaluation sets take time to build and keep current. Running a second
        path occasionally costs money and attention.
      </p>
      <p>
        These are real costs, and the payoff is contingent on a future you cannot predict. That asymmetry is why
        replaceability loses arguments in the moment and wins them over a few years.
      </p>
      <p>
        The reasonable position is not to maximize it everywhere. It is to pay for it where the component is likely
        to change, where the consequences of being stuck are high, and where the cost is low. A routing abstraction
        costs an afternoon and buys a great deal. A custom abstraction over a stable database costs weeks and buys
        very little.
      </p>

      <h2 id="bundles">Bundles and accumulated dependence</h2>
      <p>
        The most common way replaceability is lost is not a decision. It is accumulation.
      </p>
      <p>
        A team adopts a platform for model access, which is easy to leave. Then they use its tool integrations,
        because assembling those separately is real work. Then they define their agents in its format, because that
        is what its interface offers. Then they run on its hosting, because operating a process is a burden they did
        not want. Then their agents accumulate memory in its store, because that is where memory lives.
      </p>
      <p>
        No step was wrong. Each was a reasonable local decision with an immediate benefit. Collectively they produce a
        system that cannot move, and the team discovers this only when they want to.
      </p>
      <p>
        The counter-practice is not avoiding platforms, which would be both impractical and often worse. It is
        keeping a short written answer to what you would have to rebuild, updated whenever you start depending on a
        new piece. That takes minutes and converts an unnoticed accumulation into a series of visible decisions.
      </p>
      <p>
        Two of the five steps above are worth defending harder than the others. Agent definitions and accumulated
        memory are the artifacts that cannot be recreated from anything else. Model access, tool integrations, and
        hosting can all be rebuilt from knowledge you still have. A definition entered into a web form and a memory
        store with no export are the two that genuinely pin you, which makes them the two worth insisting live in
        portable formats even when everything else is convenient.
      </p>

      <h2 id="when-not">When not to pay for it</h2>
      <p>
        Some components should be depended on wholeheartedly, and treating everything as replaceable produces a
        system that is uniformly mediocre.
      </p>
      <p>
        Depend fully on things that are genuinely stable, widely implemented, and unlikely to change: the
        filesystem, HTTP, your programming language, a mature open format. Abstracting over these adds complexity
        with no realistic payoff.
      </p>
      <p>
        Depend fully on a component when the alternative is not shipping. A prototype that proves an idea has more
        value than an architecture that never gets built. Replaceability can be added later at the layers where it
        matters, provided the definitions were kept in files.
      </p>
      <p>
        And depend fully when the capability is genuinely unique and the dependency is bounded. Using a frontier
        model for the hardest reasoning is a reasonable decision, provided the rest of the system does not assume it.
      </p>

      <h2 id="objections">Objections worth taking seriously</h2>
      <p>
        Replaceability attracts two objections that are usually dismissed and are actually correct in specific cases.
      </p>
      <h3>Abstraction is premature complexity</h3>
      <p>
        The argument is that building for a switch you may never make adds indirection now for a benefit later, and
        that this is the definition of speculative generality. In many cases it is right. A custom abstraction over a
        database you will never change is pure cost.
      </p>
      <p>
        Where it is wrong is when the abstraction is nearly free. One function that every model call goes through is
        not an architecture, it is a habit. It costs an afternoon, adds one indirection, and converts a
        potentially multi-week change into a configuration edit. The test is whether the abstraction is cheap and
        whether the underlying component is genuinely likely to change. For models in 2026, both are true.
      </p>
      <h3>The intersection is worse than any specific option</h3>
      <p>
        The argument is that portable systems work at the lowest common denominator, giving up the best capability of
        every component. This is real. A provider-agnostic harness cannot immediately exploit a capability only one
        provider offers.
      </p>
      <p>
        The resolution is not to reject the constraint but to place it deliberately. Use provider-specific
        capabilities where they matter and the dependency is bounded, and keep the surrounding structure portable.
        Prompt caching is a good example: adopting the design rule it implies, which is stable content first, costs
        nothing on providers that do not offer it and pays substantially on those that do. Capability adopted in a
        way that degrades gracefully is not lock-in.
      </p>
      <p>
        There is a third objection that is simply true and rarely stated: replaceability has a maintenance cost even
        when nothing changes. Abstractions drift from what they abstract. Evaluation sets go stale. A second path
        that is never exercised stops working. If you are not going to exercise it, be honest that you have written
        documentation rather than built a capability.
      </p>

      <h2 id="practices">Practices that preserve it</h2>
      <ol>
        <li><b>One internal function for model calls.</b> The highest-value habit in the whole list, and it costs an afternoon.</li>
        <li><b>Definitions in files, in version control.</b> Skills, profiles, plans, and tool configurations. If it lives in a product&apos;s database, it does not move.</li>
        <li><b>Protocols rather than plugins.</b> An integration written as a server outlives the harness that first used it.</li>
        <li><b>Structure prompts rather than tuning phrasing.</b> Clear separation of instructions, facts, tools, and task transfers between model families.</li>
        <li><b>Keep an evaluation set.</b> Twenty real tasks with known answers. Without it, replaceability is untestable.</li>
        <li><b>Design for the model you have, not the best one.</b> A system that degrades gracefully on a weaker model is a system with options.</li>
        <li><b>Know your exit for each component.</b> Written down, kept current, reviewed when a dependency changes.</li>
      </ol>

      <h2 id="not">What it is not</h2>
      <p>
        Replaceable is not the same as replaced. Nobody benefits from switching components for its own sake. The
        value is in having the option, which changes negotiating position, risk exposure, and the ability to respond
        when circumstances change.
      </p>
      <p>
        Replaceable is not the same as open source. Open source that nothing else implements is not replaceable in
        practice, and a proprietary component behind a widely implemented interface often is.
      </p>
      <p>
        Replaceable is not free, and it is not a moral position. It is an engineering property with a cost, worth
        buying where the risk justifies it and not elsewhere.
      </p>
    </>
  );
}
