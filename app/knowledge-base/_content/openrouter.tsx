import type { Article } from './types';

export const article: Article = {
  slug: 'openrouter',
  title: 'OpenRouter',
  kind: 'technology',
  layer: 'models-and-routing',
  kicker: 'MODELS AND ROUTING / ROUTING SERVICE',
  summary: 'A service that puts many model providers behind one API, so switching models is a parameter change rather than an integration.',
  standfirst: 'OpenRouter is a hosted routing layer. You send a request naming a model, it forwards to whichever provider serves that model, and it returns the result in one consistent shape. The value is not the convenience. It is that the model choice stops being embedded in your code.',
  keywords: ['OpenRouter', 'LLM routing', 'model gateway', 'provider abstraction', 'fallback', 'unified API', 'model pricing'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'the-problem', label: 'The problem it solves' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'what-you-gain', label: 'What you gain' },
    { id: 'what-you-give-up', label: 'What you give up' },
    { id: 'agentic-relevance', label: 'Where it fits in an agentic system' },
    { id: 'tiering', label: 'Using it to tier model calls' },
    { id: 'curating', label: 'Curating the reachable model list' },
    { id: 'migrating', label: 'Moving existing code behind a router' },
    { id: 'alternatives', label: 'Alternatives to a hosted router' },
    { id: 'recording', label: 'What to record per call' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'OpenRouter', href: 'https://openrouter.ai', note: 'The service itself, with the current model list, published pricing, and availability data.' },
    { label: 'OpenRouter documentation', href: 'https://openrouter.ai/docs', note: 'API reference, routing behavior, provider preferences, and fallback configuration.' },
    { label: 'LiteLLM', href: 'https://github.com/BerriAI/litellm', note: 'A library and self-hostable proxy that solves the same problem inside your own infrastructure.' },
    { label: 'Models.dev', href: 'https://models.dev', note: 'An open index of models and providers, useful for comparing capabilities and pricing independently.' },
  ],
  related: ['models-and-routing', 'provider-apis', 'open-weight-models'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        OpenRouter is a hosted service that sits between an application and many model providers. An application
        sends a request naming a model. OpenRouter forwards it to a provider that serves that model, normalizes the
        response, and bills the usage to one account.
      </p>
      <p>
        Functionally it is a gateway. The interface is deliberately familiar, so most existing client code works with
        a changed base URL and key. What arrives on the other side is a much longer list of models than any single
        provider offers, including proprietary frontier models and hosted open-weight models side by side.
      </p>

      <h2 id="the-problem">The problem it solves</h2>
      <p>
        The problem is not that calling a model API is hard. It is that calling several of them is.
      </p>
      <p>
        Each provider has its own client library, authentication, request shape, parameter names, streaming format,
        error taxonomy, rate limits, and billing. Supporting two means writing and maintaining two integrations.
        Supporting five means five, and the fifth is written months after the first by someone who has forgotten the
        conventions used in it.
      </p>
      <p>
        Teams therefore tend to pick one provider and build against it directly. That works until the first time
        another model would be better, cheaper, or required, at which point the provider client turns out to be
        woven through dozens of files with vendor-specific parameters in each. The decision to use a second model
        stops being a technical judgment and becomes a project, which in practice means it is not made.
      </p>
      <p>
        A router removes that. Model choice becomes a string in a configuration file. The decision returns to being
        a decision.
      </p>

      <h2 id="how-it-works">How it works</h2>
      <p>
        The mechanics are worth understanding because they explain both the benefits and the limits.
      </p>
      <p>
        A request names a model identifier. OpenRouter maintains a mapping from identifiers to providers capable of
        serving them, and for widely available open-weight models there are often several. It selects one according
        to availability, latency, price, and any preferences the request expresses, forwards the request in that
        provider&apos;s native format, and translates the response back.
      </p>
      <p>
        When a provider is unavailable, rate limited, or slow, the router can fall back to another provider serving
        the same model. For open-weight models this is genuinely transparent, since the weights are the same. For
        proprietary models there is usually one provider, so fallback means falling back to a different model, which
        is a decision the application should make deliberately rather than inherit.
      </p>
      <p>
        Billing consolidates. One account, one balance, usage attributed per model and per request. This is a
        smaller-sounding benefit that turns out to matter, because per-provider billing is where cost visibility in
        multi-model systems usually breaks down.
      </p>

      <h2 id="what-you-gain">What you gain</h2>
      <ul>
        <li><b>One integration.</b> Add a model by changing a string. This is the entire point and the rest follows from it.</li>
        <li><b>Comparison becomes cheap.</b> Running your evaluation set against six models is an afternoon rather than a sprint, which changes how often model decisions get revisited.</li>
        <li><b>Failure handling.</b> Provider outages and rate limits become retries against another route rather than user-visible errors.</li>
        <li><b>Cost visibility.</b> Spend per model and per call in one place, which is the prerequisite for tiering calls sensibly.</li>
        <li><b>Access without contracts.</b> Trying a model from a provider you have no relationship with does not require procurement.</li>
        <li><b>Published pricing and availability.</b> Comparable numbers across providers, which is harder to assemble than it should be otherwise.</li>
      </ul>

      <h2 id="what-you-give-up">What you give up</h2>
      <p>
        This is the section most treatments skip, and it matters for an architecture that takes openness seriously.
      </p>
      <p>
        <b>A hop.</b> Requests pass through additional infrastructure, which adds latency. Usually modest, and it is
        not zero, and it compounds across the many calls an agent makes.
      </p>
      <p>
        <b>A third party in the data path.</b> Every prompt and response passes through the router. Whatever its
        retention policy says, this is an additional party handling your content, and for regulated data that fact
        alone may disqualify the arrangement regardless of the policy.
      </p>
      <p>
        <b>A dependency in the critical path.</b> The router becoming unavailable takes down every model call, which
        is a concentration of risk that direct integrations do not have.
      </p>
      <p>
        <b>Some provider-specific capability.</b> Features unique to one provider may be unavailable or exposed
        late, since a normalizing layer converges on the intersection plus whatever it chooses to pass through.
      </p>
      <p>
        <b>Detail in error handling.</b> Normalized errors are easier to handle and carry less information about what
        actually happened, which occasionally matters when debugging.
      </p>
      <div className="kb-callout">
        <b>The openness reading</b>
        <p>
          A router improves replaceability of models and adds a dependency of its own. The mitigation is to treat
          the router as replaceable too: keep your code speaking a shape you could point at a different router, a
          self-hosted proxy, or a provider directly. Then the dependency is a convenience rather than a commitment.
        </p>
      </div>

      <h2 id="agentic-relevance">Where it fits in an agentic system</h2>
      <p>
        Agentic workloads make the case for routing stronger than ordinary application workloads do, for three
        reasons.
      </p>
      <h3>Many calls with different requirements</h3>
      <p>
        One user request becomes a dozen model calls of very different character. Routing lets each go to an
        appropriate model, which is where most of the available cost and latency improvement lives.
      </p>
      <h3>Failure is more expensive mid-task</h3>
      <p>
        A single-turn application failing on a rate limit shows an error. An agent failing at step seven of a
        twelve-step task loses the work of the first six. Automatic fallback is worth more here than it is in
        request-response applications.
      </p>
      <h3>Cost tails are long</h3>
      <p>
        Because step counts vary, agentic cost distributions have long tails. Per-call visibility across models is
        how you find out that one workflow accounts for most of the bill.
      </p>

      <h3>Model availability changes under you</h3>
      <p>
        Providers deprecate models, adjust rate limits, and change pricing on their own schedules. An agentic system
        with a long-lived deployment will meet all three. Having the model choice already externalized means
        responding to any of them is a configuration change made calmly rather than an incident.
      </p>

      <h2 id="tiering">Using it to tier model calls</h2>
      <p>
        The highest-value thing a router enables is also the least used: routing different kinds of call to
        different models on purpose.
      </p>
      <p>
        A workable starting split for an agentic system looks roughly like this. Classification and routing
        decisions, which are frequent and simple, go to a small fast model. Extraction and formatting, where
        structured output reliability matters more than reasoning, go to a mid-tier model chosen for schema
        adherence. Summarization goes to something with good long-context behavior. Multi-step planning and final
        synthesis, which are infrequent and where errors are expensive, go to the strongest model available.
      </p>
      <p>
        Two implementation notes make this practical. Define the tiers as named roles in configuration rather than
        as model identifiers scattered through code, so that changing what fills a role is one edit. And point every
        role at the same model initially, then split them one at a time based on measurement. Splitting speculatively
        produces a configuration nobody understands and quality regressions nobody can attribute.
      </p>

      <h2 id="curating">Curating the reachable model list</h2>
      <p>
        Access to hundreds of models sounds like an unambiguous benefit and is closer to a raw material. Left
        uncurated it produces two problems: nobody knows which models the system is actually allowed to use, and
        someone eventually points production traffic at something nobody evaluated.
      </p>
      <p>
        The habit that works is to treat the reachable set as a deliberate allowlist rather than as whatever the
        service offers. A short list, written down, with a reason attached to each entry:
      </p>
      <ul>
        <li><b>The default.</b> What handles most work, chosen on your own evaluation set.</li>
        <li><b>The fallback.</b> Deliberately from a different model family, because same-family alternatives tend to be affected by the same incidents.</li>
        <li><b>The cheap tier.</b> For classification, routing, and other high-frequency simple calls.</li>
        <li><b>The strong tier.</b> For planning and final synthesis, where errors are expensive.</li>
        <li><b>The compliant option.</b> Where a class of data restricts which endpoints may see it.</li>
      </ul>
      <p>
        Five entries with reasons is a configuration a team can reason about. It also makes review meaningful:
        adding a sixth is a decision someone makes, with an evaluation attached, rather than a string that appeared
        in a pull request.
      </p>
      <p>
        The same list is where data policy gets expressed concretely. If certain content may not leave a
        jurisdiction, the enforcement is not a note in a document, it is that requests carrying that content are
        restricted to the entries permitted for it, checked in code before dispatch. A router makes this easy to
        express, and it does not make the decision for you.
      </p>

      <h2 id="migrating">Moving existing code behind a router</h2>
      <p>
        Most teams reach this page with an existing integration already spread through a codebase. The migration is
        usually smaller than feared, and it goes wrong in a predictable way when done in the wrong order.
      </p>
      <ol>
        <li>
          <b>Find every call site.</b> The count is usually higher than expected, because retries, evaluation
          scripts, and one-off utilities all made their own calls.
        </li>
        <li>
          <b>Introduce one internal function.</b> Every call goes through it. Initially it does exactly what the old
          code did. This step alone delivers most of the long-term benefit and changes no behavior, which makes it
          easy to review and safe to merge.
        </li>
        <li>
          <b>Move parameters into named roles.</b> Replace scattered model identifiers with role names such as
          planner, extractor, or classifier, resolved from configuration. Point all roles at the current model.
        </li>
        <li>
          <b>Switch the transport.</b> Now change the internal function to call the router. Because there is one
          call site, this is a contained change with a contained rollback.
        </li>
        <li>
          <b>Verify with the evaluation set.</b> Same model through a different path should produce comparable
          results. Differences here usually indicate a parameter that was silently defaulted differently, which is
          worth finding now rather than in production.
        </li>
        <li>
          <b>Split roles one at a time.</b> Change what fills one role, measure, keep or revert. Repeat.
        </li>
      </ol>
      <p>
        The order matters because steps two and three are the durable ones. A team that stops after step three has
        already gained the ability to change models without touching application code, whether or not they ever adopt
        a hosted router. That is the architectural property worth having; the router is one way to exercise it.
      </p>

      <h2 id="alternatives">Alternatives to a hosted router</h2>
      <p>
        The routing concern is not the same as this particular service, and there are three ways to satisfy it.
      </p>
      <p>
        <b>A hosted router</b> is the least work and adds a third party to the data path.
      </p>
      <p>
        <b>A self-hosted proxy</b> such as LiteLLM run inside your own infrastructure gives the same abstraction with
        no external party seeing content. You operate it, and you hold the provider credentials. For teams with data
        residency requirements this is usually the right answer, and it is the option most often overlooked in the
        framing of hosted versus direct.
      </p>
      <p>
        <b>A thin internal abstraction</b> is a small interface in your own code with an implementation per provider.
        More work than either alternative, and complete control, and reasonable when you only ever expect two
        providers.
      </p>
      <p>
        What matters architecturally is that one of these exists. The failure mode being avoided is provider clients
        called directly from application code, and all three options avoid it.
      </p>

      <h2 id="recording">What to record per call</h2>
      <p>
        A router gives you a natural place to capture per-call data, and most teams capture too little of it. The
        record is what makes every later question about cost, quality, and reliability answerable, and it cannot be
        reconstructed after the fact.
      </p>
      <p>
        A useful record has three groups of fields.
      </p>
      <h3>What was asked</h3>
      <p>
        The role that made the call, the model identifier requested, the provider actually used, and the parameters.
        Recording role alongside model is the field people omit and later wish they had, because it is what lets you
        ask which part of the system spent the money rather than only which model did.
      </p>
      <h3>What happened</h3>
      <p>
        Input and output token counts, cost, latency, whether the call was a retry, whether a fallback occurred, and
        the outcome. Fallback in particular should be an explicit field rather than something inferred from a
        mismatch between requested and served model, because the inference stops working the moment routing gets
        more complicated.
      </p>
      <h3>What it belonged to</h3>
      <p>
        A task identifier tying the call to the agent run it was part of, and a step number. Without this, you have
        a stream of independent calls and no way to ask what a complete task cost, which is the number that actually
        matters. With it, you can answer the questions that drive improvement: which workflows are expensive, where
        step counts run long, and which roles would benefit from a cheaper or stronger model.
      </p>
      <p>
        One caution on content. Recording full prompts and responses is invaluable for debugging and is also a
        durable copy of whatever data flowed through the system, including anything sensitive a tool returned.
        Deciding retention and access for that store deliberately, rather than letting it accumulate by default, is
        part of doing this responsibly.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li>
          <b>Same model, different providers, different behavior.</b> Quantization, serving configuration, and
          context limits vary between providers hosting the same open-weight model. Output can differ noticeably.
          Pin the provider when consistency matters.
        </li>
        <li>
          <b>Fallback across models is a silent quality change.</b> Falling back from a strong model to a weaker one
          keeps the system running and changes the answers. Make it explicit and record when it happens.
        </li>
        <li>
          <b>Pricing changes.</b> Model prices move, and a routing configuration set up a year ago may no longer
          reflect the sensible choice.
        </li>
        <li>
          <b>Data policies vary per provider.</b> Routing through one account does not give one policy underneath.
          Check the terms of providers your traffic can actually reach, and restrict the set if it matters.
        </li>
        <li>
          <b>Streaming and tool-calling normalization is imperfect.</b> These are the areas where provider
          differences leak through most often. Test them specifically rather than assuming parity.
        </li>
        <li>
          <b>Concentration risk.</b> One account, one balance, one dependency. Worth a documented plan for what
          happens if it is unavailable.
        </li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong for models, and the router itself becomes a dependency. Mitigate by keeping your integration router-agnostic.</li>
        <li><b>Inspectable.</b> Partial. Usage and routing decisions are visible; internal routing logic is a service, not open source.</li>
        <li><b>Portable.</b> Good. Because the interface is a familiar shape, moving to a self-hosted proxy or direct provider calls is not a rewrite.</li>
        <li><b>Bounded.</b> Partial. Provider restrictions can be expressed, and enforcement of what content may reach which endpoint still belongs in your own layer.</li>
        <li><b>Grounded.</b> Not applicable. Routing moves requests; it does not supply facts.</li>
        <li><b>Auditable.</b> Good. Per-call records of model, tokens, cost, and latency in one place.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        A router is not a harness. It forwards model calls. It does not run an agent loop, execute tools, hold state,
        or enforce authority.
      </p>
      <p>
        A router is not a policy engine. It can restrict which providers are used, and deciding which classes of data
        may be sent anywhere is a decision that belongs in your own code, where it can be tested.
      </p>
      <p>
        A router is not a substitute for evaluation. It makes trying models cheap, which is only useful if you have
        a way to tell whether a change was an improvement.
      </p>
    </>
  );
}
