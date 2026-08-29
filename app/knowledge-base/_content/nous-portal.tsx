import type { Article } from './types';

export const article: Article = {
  slug: 'nous-portal',
  title: 'Nous Portal',
  kind: 'technology',
  layer: 'models-and-routing',
  kicker: 'MODELS AND ROUTING / PLATFORM',
  summary: 'A single account from Nous Research covering model access, agent tooling, and hosted agent deployment, billed against one credit balance.',
  standfirst: 'Portal bundles three things a builder normally assembles separately: access to many models, the auxiliary tools an agent needs, and somewhere to run the agent continuously. Bundling is a convenience with a cost, and both sides are worth understanding.',
  keywords: ['Nous Portal', 'Nous Research', 'Hermes', 'agent hosting', 'model access', 'agent tools', 'credits'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'three-things', label: 'Three things in one account' },
    { id: 'tools', label: 'The tools layer' },
    { id: 'hosting', label: 'Hosted agents and what that means' },
    { id: 'nous-context', label: 'Where it sits in the Nous ecosystem' },
    { id: 'credits', label: 'The credit model' },
    { id: 'bundle-pattern', label: 'The bundle pattern, generally' },
    { id: 'when-it-fits', label: 'When bundling is the right call' },
    { id: 'when-it-does-not', label: 'When it is not' },
    { id: 'agentic-relevance', label: 'Where it fits in an agentic system' },
    { id: 'exit', label: 'Keeping an exit open' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Nous Portal', href: 'https://portal.nousresearch.com', note: 'The service, with the current model catalog, tool list, and pricing tiers.' },
    { label: 'Nous Research', href: 'https://nousresearch.com', note: 'The organization behind Portal, Hermes models, and the Hermes Agent project.' },
    { label: 'Hermes Agent', href: 'https://github.com/NousResearch/hermes-agent', note: 'The open-source personal agent that Portal is designed to support.' },
    { label: 'Nous models on Hugging Face', href: 'https://huggingface.co/NousResearch', note: 'The open-weight models the group publishes, which can be run independently of Portal.' },
  ],
  related: ['models-and-routing', 'hermes-agent', 'open-weight-models'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Nous Portal is a platform from Nous Research that combines model access, agent tooling, and hosted agent
        deployment behind a single account. The framing the service uses is that one account covers the models, the
        tools, and the cloud.
      </p>
      <p>
        In practice that means three capabilities that builders normally acquire from three different places arrive
        together, with one credit balance covering all of them. Model calls, tool calls such as web scraping or image
        generation, and hosted execution all draw down the same balance.
      </p>
      <p>
        It appears in this reference as an example of the platform pattern in the models and routing layer: a place
        where model access is bundled with adjacent services. That pattern is worth understanding on its own terms,
        because the tradeoffs it presents recur across the industry regardless of which provider is offering it.
      </p>

      <h2 id="three-things">Three things in one account</h2>
      <h3>Model access</h3>
      <p>
        Portal exposes a large catalog of models from many providers, spanning free options through frontier models
        with correspondingly higher per-token pricing. Functionally this overlaps with what a routing service
        provides: one integration reaching many models.
      </p>
      <h3>Tools</h3>
      <p>
        Alongside models sit the auxiliary services agents actually need in order to be useful: browser automation,
        web scraping, image generation, and voice. Each is billed per use against the same balance.
      </p>
      <h3>Hosting</h3>
      <p>
        Portal offers hosted agent deployment, described as one-click hosting where the platform runs an agent
        continuously rather than only while a user session is open.
      </p>
      <p>
        Each of these is available elsewhere. What the platform sells is that they are available together, already
        wired, with one billing relationship.
      </p>

      <h2 id="tools">The tools layer</h2>
      <p>
        The tools bundle deserves more attention than it usually gets, because it addresses a real gap that
        architecture diagrams tend to skip.
      </p>
      <p>
        An agent with only a model can reason and produce text. To do anything useful in the world it needs to reach
        outside itself: fetch a page, extract structured content from it, drive a browser through a flow that has no
        API, produce an image, transcribe or generate speech. These are unglamorous capabilities and every one of
        them is a separate service, a separate account, a separate key, and a separate integration.
      </p>
      <p>
        Assembling those independently is entirely feasible and takes real time, and the time is spent on plumbing
        rather than on the thing being built. That is the argument for a bundle, and it is a legitimate one,
        particularly for individuals and small teams where the assembly cost is a meaningful fraction of the whole
        project.
      </p>
      <p>
        The cost is that these tool integrations are now expressed in one platform&apos;s terms. Moving elsewhere
        means reacquiring each capability separately. The mitigation, consistent with the rest of this site, is to
        keep the agent&apos;s view of a tool defined in a portable form, so that what changes on a move is which
        service implements a capability rather than what the agent knows how to do.
      </p>

      <h2 id="hosting">Hosted agents and what that means</h2>
      <p>
        Hosting is the part of the bundle that changes what an agent can be rather than only how quickly you can
        build one.
      </p>
      <p>
        An agent that runs only while someone is watching is limited to responding. An agent that runs continuously
        can act on a schedule, react to events, maintain long-running work, and pick things up between sessions.
        That difference is the gap between a chat interface and something that behaves like a colleague who was
        working while you were away.
      </p>
      <p>
        Running an agent continuously yourself is not conceptually hard and is operationally real: a process that
        must stay up, be restarted, be observed, hold credentials, and be updated. For a personal agent, or for a
        small team&apos;s first deployment, the operational tail is often the reason the project stops. Hosting
        removes it.
      </p>
      <p>
        The considerations to weigh are the ones that apply to any hosted execution. The agent&apos;s credentials
        live on someone else&apos;s infrastructure. Its working state and memory live there too. Whatever the agent
        reads passes through. For personal productivity work this is usually an easy trade. For agents touching
        regulated or contractually restricted material it is usually not, and the question should be asked
        explicitly rather than settled by convenience.
      </p>

      <h2 id="nous-context">Where it sits in the Nous ecosystem</h2>
      <p>
        Portal is one part of a group of related efforts from Nous Research, and understanding the relationship
        clarifies what Portal is for.
      </p>
      <p>
        Nous Research publishes open-weight models, notably the Hermes family, which are downloadable and runnable
        independently of any Nous service. They also maintain Hermes Agent, an open-source personal agent that runs
        across a command line, a desktop application, and messaging platforms.
      </p>
      <p>
        Portal is the commercial infrastructure that supports that work. It is what a Hermes Agent user can point at
        for models, tools, and hosting without assembling those pieces themselves.
      </p>
      <p>
        The shape here is one worth recognizing generally: open artifacts with a commercial service around them. It
        is a reasonable arrangement and it is not the same as everything being open. The models are open weights and
        can be run elsewhere. The agent is open source and can be self-hosted. The platform is a service. Knowing
        which is which is exactly the distinction the openness test exists to make.
      </p>

      <h2 id="credits">The credit model</h2>
      <p>
        Portal uses subscription tiers that include a monthly credit allowance, with additional credits purchasable
        separately. Model calls and tool calls both draw from the same balance.
      </p>
      <p>
        Unified billing has a genuine advantage for agentic work. Because one task may involve model calls, a web
        fetch, a scrape, and an image generation, seeing the total cost of that task in one place is more useful than
        reconciling four invoices with different billing periods.
      </p>
      <p>
        The corresponding risk is one that applies to every credit-based agentic system. Agent cost is not
        proportional to user requests, it is proportional to steps taken, and step counts vary widely. A task that
        usually resolves in three steps and occasionally takes thirty will produce a cost distribution with a long
        tail. Budgeting on averages understates it. The defensive measures are the same ones the harness layer
        recommends for other reasons: cap steps per task, cap spend per task, and alert on tasks that exceed a
        threshold rather than discovering them at the end of a billing period.
      </p>

      <h2 id="bundle-pattern">The bundle pattern, generally</h2>
      <p>
        Portal is one instance of something the whole industry is doing, and the pattern is worth naming separately
        from any product, because you will meet it repeatedly.
      </p>
      <p>
        The pattern is: a provider notices that builders need several adjacent things, offers them together, prices
        them as one, and reduces the time from idea to working system substantially. Cloud providers did this.
        Observability vendors did this. Every generation of infrastructure does it, and it works because assembling
        components genuinely is expensive.
      </p>
      <p>
        What makes it worth thinking about rather than simply accepting or rejecting is that the cost is not paid at
        adoption. It is paid at the point of change, and it is paid in proportion to how many of the bundled pieces
        you came to depend on. A team using a bundle for model access alone can leave easily. A team whose agents are
        defined in the platform&apos;s format, running on its hosting, calling its tools, cannot.
      </p>
      <p>
        The useful discipline is therefore not to avoid bundles. It is to know, for each piece you use, what the
        replacement would be and roughly what it would cost. That question takes an hour to answer at adoption time
        and is very difficult to answer under pressure two years later. A bundle you have deliberately decided to
        depend on is an engineering choice. A bundle you have accumulated dependence on without noticing is the thing
        the openness test is trying to surface.
      </p>

      <h2 id="when-it-fits">When bundling is the right call</h2>
      <ul>
        <li><b>Individuals and small teams.</b> Where the assembly cost of five separate services is a large share of the total effort available.</li>
        <li><b>Personal agents.</b> Where the data involved is your own, the stakes are low, and continuous operation is the point.</li>
        <li><b>Prototyping.</b> Where the goal is to find out whether an idea works, and infrastructure decisions are premature.</li>
        <li><b>Work that needs the auxiliary tools.</b> Browser automation and scraping in particular are annoying to assemble and easy to underestimate.</li>
        <li><b>Where continuous operation matters more than control.</b> An agent that runs on a schedule is worth more than one that runs perfectly under your own supervision and therefore rarely runs.</li>
      </ul>

      <h2 id="when-it-does-not">When it is not</h2>
      <p>
        Bundling concentrates dependency. That is the whole tradeoff, stated plainly.
      </p>
      <p>
        Regulated data, contractual restrictions on where content may be processed, and requirements that
        credentials not leave your infrastructure all point away from hosted execution, regardless of the quality of
        the service. Organizations with existing model relationships and an established routing layer gain less,
        since the model access portion is already solved. Teams whose agents need tools specific to their own systems
        will build most of their tool surface themselves anyway, which reduces the value of a general tool bundle.
      </p>
      <p>
        And any team for whom the ability to move quickly between providers is a stated architectural goal should
        weigh how much of their system would need rebuilding if this particular account went away. That is not an
        argument against using it. It is an argument for knowing the answer.
      </p>

      <h2 id="agentic-relevance">Where it fits in an agentic system</h2>
      <p>
        In the four-layer model this site uses, Portal spans more than one layer, which is precisely why it is
        interesting as an example.
      </p>
      <p>
        Its model catalog belongs to the models and routing layer, doing much the same job a routing service does.
        Its tools belong to the execution layer, since they are what an agent calls to affect the world. Its hosting
        is infrastructure underneath the harness. One account covers three architectural concerns.
      </p>
      <p>
        That is not a criticism. Bundles exist because assembling components has real cost, and a builder who ships
        something useful on a bundle has done better than one who assembles perfectly and ships nothing. The point of
        naming the spread is that the architecture underneath is still four layers, and knowing which layer each
        piece of a bundle occupies is what makes it possible to replace one piece later without unpicking all of it.
      </p>

      <h2 id="exit">Keeping an exit open</h2>
      <p>
        If you do adopt a platform of this shape, a small number of habits preserve most of your ability to leave,
        and none of them cost much while you are staying.
      </p>
      <ul>
        <li>
          <b>Define the agent in a portable format.</b> Identity, instructions, tool surface, and permissions
          expressed in something like an open agent profile rather than in platform configuration. Then the agent is
          a file you own and the platform is a runtime.
        </li>
        <li>
          <b>Route model calls through your own abstraction.</b> Even when the platform provides model access, going
          through one internal function means changing the transport later is a contained edit.
        </li>
        <li>
          <b>Name capabilities, not services.</b> An agent should know it has a tool that fetches and extracts a web
          page. It should not know which vendor implements that. This is the difference between swapping a provider
          and rewriting a skill.
        </li>
        <li>
          <b>Keep memory and state exportable.</b> Whatever an agent has learned is the part that cannot be
          recreated. If it lives only in a hosted store with no export, that is the piece that will actually pin you.
        </li>
        <li>
          <b>Record what you would have to rebuild.</b> A short list, kept current. It takes minutes and turns a
          vague unease about lock-in into a specific, reviewable number.
        </li>
      </ul>
      <p>
        None of this is an argument for treating a platform as adversarial. It is the same discipline you would apply
        to any dependency that sits close to the centre of a system, and the payoff is that the decision to stay
        remains a decision.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Model availability and pricing change.</b> Catalogs and prices move. Verify current details on the service rather than relying on any summary, including this one.</li>
        <li><b>Tool costs are separate from model costs.</b> A scrape-heavy agent can spend more on tools than on inference, which is easy to miss when both draw the same balance.</li>
        <li><b>Hosted agents run whether or not they are useful.</b> Continuous operation means continuous spend. Scheduled agents need an explicit stop condition and a review.</li>
        <li><b>Credentials on hosted infrastructure.</b> An agent that acts on your behalf holds tokens for the systems it acts on. Hosting those is a decision, not a detail.</li>
        <li><b>Open models do not require the platform.</b> If the appeal is Hermes models specifically, the weights are published and can be run independently.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Mixed by component. Model access is highly replaceable. Tool integrations and hosting are less so, and hosting least of all.</li>
        <li><b>Inspectable.</b> Partial. The models and the agent project are open; the platform is a service.</li>
        <li><b>Portable.</b> Depends on discipline. Agents defined in portable formats move; agents defined in platform-specific configuration do not.</li>
        <li><b>Bounded.</b> Partial. Spend limits exist through the credit model, and authority over what an agent may do still belongs to the harness.</li>
        <li><b>Grounded.</b> Not applicable directly, though the tools layer is how an agent reaches external facts.</li>
        <li><b>Auditable.</b> Good for cost, since unified billing gives one view of what was spent on what.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Portal is not an agent harness. It supplies models, tools, and somewhere to run. The loop, the state, and the
        policy belong to the agent software.
      </p>
      <p>
        Portal is not a requirement for using Nous models. The open-weight models are published separately and run
        anywhere.
      </p>
      <p>
        Portal is not a governance layer. Deciding what an agent may do, and enforcing it, is work that belongs in
        the harness regardless of who supplies the model and the compute.
      </p>
    </>
  );
}
