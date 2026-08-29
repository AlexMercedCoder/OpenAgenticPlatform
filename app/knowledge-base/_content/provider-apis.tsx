import type { Article } from './types';

export const article: Article = {
  slug: 'provider-apis',
  title: 'Provider APIs',
  kind: 'technology',
  layer: 'models-and-routing',
  kicker: 'MODELS AND ROUTING / HOSTED ACCESS',
  summary: 'Frontier model capability reached over a vendor API, which is the right choice for the hardest reasoning as long as the rest of the architecture does not assume it.',
  standfirst: 'A provider API gives you the strongest models available without operating anything. The artifact is not yours, which is a real constraint and not a disqualifying one. What matters is whether your system could work without this particular one.',
  keywords: ['LLM API', 'provider API', 'frontier models', 'prompt caching', 'tool calling', 'rate limits', 'vendor lock-in'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'what-you-get', label: 'What you are actually buying' },
    { id: 'capability-gap', label: 'The capability gap, honestly' },
    { id: 'features', label: 'Features worth using' },
    { id: 'pricing', label: 'How pricing actually behaves' },
    { id: 'lock-in', label: 'Where lock-in actually accumulates' },
    { id: 'staying-portable', label: 'Staying portable while using one' },
    { id: 'agentic-relevance', label: 'Where it fits in an agentic system' },
    { id: 'operational', label: 'Operational realities' },
    { id: 'data-policy', label: 'Data handling questions to settle' },
    { id: 'choosing', label: 'Choosing between providers' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Claude API documentation', href: 'https://docs.claude.com/en/api/overview', note: 'Reference for the Messages API, tool use, prompt caching, and streaming.' },
    { label: 'Models.dev', href: 'https://models.dev', note: 'An open index of models and providers, useful for comparing capability and pricing independently of any vendor.' },
    { label: 'OpenRouter', href: 'https://openrouter.ai', note: 'A routing service that puts many provider APIs behind one interface.' },
    { label: 'LiteLLM', href: 'https://github.com/BerriAI/litellm', note: 'A self-hostable proxy providing the same abstraction inside your own infrastructure.' },
  ],
  related: ['models-and-routing', 'openrouter', 'open-weight-models'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        A provider API is a hosted endpoint offering access to models the provider operates. You send a request with
        an API key, the provider runs inference on its own infrastructure, and you pay per token. The weights are
        not published and the model is not something you possess.
      </p>
      <p>
        This is how most agentic systems reach their strongest capability, and there is nothing wrong with that. The
        architectural question is not whether to use one. It is whether your system would still function, at
        acceptable quality, if this particular one became unavailable, more expensive, or restricted.
      </p>

      <h2 id="what-you-get">What you are actually buying</h2>
      <p>
        It helps to separate the components, because they are frequently bundled in discussion and are not equally
        replaceable.
      </p>
      <ul>
        <li><b>Capability.</b> Access to models at the frontier of what is currently possible. This is the part with no close substitute for the hardest tasks.</li>
        <li><b>Operations.</b> Someone else runs the accelerators, handles scaling, applies updates, and absorbs demand spikes. This is worth more than it looks on a spreadsheet.</li>
        <li><b>Availability.</b> Capacity when you need it, without procurement lead times.</li>
        <li><b>Feature velocity.</b> Caching, structured output, tool calling, and longer contexts arrive without any work from you.</li>
        <li><b>A support relationship.</b> Someone to escalate to when behavior changes, which matters more in production than during evaluation.</li>
      </ul>
      <p>
        The first of these is why teams use provider APIs. The rest are why they keep using them even when an
        open-weight alternative would be adequate.
      </p>

      <h2 id="capability-gap">The capability gap, honestly</h2>
      <p>
        Statements about how far ahead frontier models are age badly, so it is more useful to describe the shape of
        the gap than its size.
      </p>
      <p>
        For classification, extraction, formatting, and routine summarization, the gap is small or absent. Good
        open-weight models handle these well, and the difference between tiers is rarely the limiting factor in
        output quality.
      </p>
      <p>
        For multi-step planning, for reasoning that requires holding several constraints at once, for long-context
        work where relevant detail is buried, and for code that must be correct rather than plausible, the gap is
        larger and it shows up in agentic systems more than in single-turn use. An agent that plans badly does not
        produce a slightly worse answer, it takes a wrong path and spends five steps on it.
      </p>
      <p>
        This asymmetry is the practical argument for tiering rather than choosing. The calls where the gap is small
        are also the frequent ones, and the calls where the gap is large are the rare, expensive ones. Routing
        accordingly gets most of the capability for a fraction of the cost, which is a better outcome than either
        extreme.
      </p>

      <h2 id="features">Features worth using</h2>
      <p>
        Provider APIs offer capabilities beyond generating text, and three of them change agentic system design
        materially.
      </p>
      <h3>Native tool calling</h3>
      <p>
        Passing tool schemas and receiving a structured call back is far more reliable than instructing a model to
        produce a particular format. This is the normal path now, and building on prompt-formatted output instead is
        choosing a worse mechanism.
      </p>
      <h3>Prompt caching</h3>
      <p>
        Reusing a previously processed prefix at reduced cost and latency. Agentic loops resend a largely identical
        prefix on every step, so this matters more here than almost anywhere else. It imposes one design rule worth
        following regardless of provider: put stable content first and volatile content last.
      </p>
      <h3>Streaming</h3>
      <p>
        Returning tokens as they are produced. For agents this is less about perceived speed in a chat window and
        more about being able to detect a bad direction early and cancel, rather than paying for a complete response
        you will discard.
      </p>
      <p>
        A fourth capability worth watching is long context. Larger windows let you put more in, and attention over
        very long inputs is uneven, so the discipline of selecting the right context rather than supplying all of it
        remains correct even when the window would allow otherwise.
      </p>

      <h2 id="pricing">How pricing actually behaves</h2>
      <p>
        Per-token pricing looks simple and behaves unintuitively in agentic systems, which is why cost surprises are
        so common. Three properties explain most of them.
      </p>
      <h3>Cost scales with steps, not with requests</h3>
      <p>
        A user asks one question. The agent takes eleven steps. Each step resends the accumulated context. The cost
        of that single question is not eleven times the first call, it is closer to the sum of a growing series,
        because context accumulates as the task proceeds. Estimating from a single-call price produces a number that
        is wrong by a large factor.
      </p>
      <h3>The distribution has a long tail</h3>
      <p>
        Most tasks resolve quickly. Some do not. A task that occasionally loops, retries, or explores a dead end
        costs many times the median. Because the tail is where the money is, average cost per task is a misleading
        planning number and the ninety-fifth percentile is the one to budget against.
      </p>
      <h3>Input dominates output</h3>
      <p>
        Intuition says generation is the expensive part. In agentic work the input side is usually larger, sometimes
        by an order of magnitude, because every step carries the history. This inverts the usual optimization advice:
        trimming context, summarizing older steps, and scoping tools per task all reduce cost far more than
        constraining response length does.
      </p>
      <p>
        Two mechanisms exist specifically to blunt this, and both are worth adopting early. Prefix caching makes the
        repeated portion of context much cheaper, provided the stable part comes first. Batch or asynchronous
        processing, where a provider offers it at reduced rates, suits any workload that does not need an answer
        immediately, which describes more agentic work than teams initially assume.
      </p>

      <h2 id="lock-in">Where lock-in actually accumulates</h2>
      <p>
        Teams worry about lock-in in the wrong place. The API key is not the problem, and neither is the client
        library. Both are trivially replaceable. Lock-in accumulates in four quieter forms.
      </p>
      <p>
        <b>Prompts tuned to one model.</b> Phrasing that exploits a particular model&apos;s behavior, refined over
        months. Moving means re-tuning, and nobody schedules that.
      </p>
      <p>
        <b>Dependence on provider-specific features.</b> Building a workflow around a capability only one provider
        offers means the workflow does not move even if the model call does.
      </p>
      <p>
        <b>Evaluation baselines that only exist implicitly.</b> Without a recorded evaluation set, nobody can tell
        whether an alternative is adequate, so the alternative is never seriously considered.
      </p>
      <p>
        <b>Assumed capability.</b> Designs that only work because the model is very strong. An agent given vague
        instructions and thirty tools works on a frontier model and falls apart on anything else. The design, not
        the integration, is what pins you.
      </p>
      <div className="kb-callout">
        <b>The diagnostic</b>
        <p>
          Ask what you would do if your primary provider raised prices threefold next quarter. If the answer is a
          configuration change and a round of evaluation, the architecture is healthy. If the answer is a project,
          the lock-in is already present and it is not in the code.
        </p>
      </div>

      <h2 id="staying-portable">Staying portable while using one</h2>
      <p>
        None of the above is an argument against provider APIs. It is an argument for a handful of habits that cost
        very little while you are staying.
      </p>
      <ol>
        <li><b>Route every call through one internal function.</b> The single highest-value habit, and it costs an afternoon.</li>
        <li><b>Express model choice as named roles.</b> Planner, extractor, classifier. Roles resolve to models in configuration.</li>
        <li><b>Define tool schemas once, translate per provider.</b> Rather than writing them in one vendor&apos;s dialect.</li>
        <li><b>Structure prompts rather than tuning phrasing.</b> Clear separation of instructions, facts, tools, and task transfers between families. Clever phrasing does not.</li>
        <li><b>Keep an evaluation set.</b> Twenty real tasks with known answers. Without it, portability is a theory you cannot test.</li>
        <li><b>Run a second family occasionally.</b> Even for a small share of traffic. Portability that is never exercised quietly stops working.</li>
        <li><b>Record model and version per call.</b> So that a change in behavior can be attributed rather than argued about.</li>
      </ol>

      <h2 id="agentic-relevance">Where it fits in an agentic system</h2>
      <p>
        The natural home for a frontier provider API in an agentic architecture is narrower than most systems
        actually use it for.
      </p>
      <p>
        It belongs on planning, where a wrong decision costs several wasted steps. It belongs on final synthesis,
        because that is the output a person judges. It belongs on genuinely hard reasoning and on code that must be
        correct. It belongs wherever an error is more expensive than the token cost difference.
      </p>
      <p>
        It does not belong on the classification call that runs forty times per task, on extraction from a
        well-structured document, or on deciding whether a tool result looks like an error. Those are the calls that
        dominate volume, and routing them to the most expensive model available is the most common source of
        avoidable spend in agentic systems.
      </p>
      <p>
        There is also a reliability argument for not concentrating everything on one provider. An agent that fails at
        step seven loses the work of the first six. A fallback in a different model family, exercised occasionally so
        it is known to work, turns a provider incident into degraded quality rather than an outage.
      </p>

      <h2 id="operational">Operational realities</h2>
      <ul>
        <li><b>Rate limits.</b> Agentic workloads are bursty in a way that request-response applications are not, because one user request expands into many calls. Limits are hit earlier than the request volume suggests.</li>
        <li><b>Latency variance.</b> Tail latency matters more when calls are chained. A ninety-fifth percentile that is four times the median is a different experience across ten sequential steps than across one.</li>
        <li><b>Model deprecation.</b> Hosted models are retired with notice. A system with the model identifier in configuration handles this in an hour; one with it scattered through code does not.</li>
        <li><b>Behavior drift under a stable name.</b> Providers update models. A stable identifier does not always mean stable behavior, which is why pinning specific versions where offered, and re-running the evaluation set on a schedule, both matter.</li>
        <li><b>Cost attribution.</b> Provider billing tells you what was spent. It does not tell you which feature spent it. That mapping has to come from your own per-call records.</li>
      </ul>

      <h2 id="data-policy">Data handling questions to settle</h2>
      <p>
        These questions are best answered once, written down, and enforced in code rather than remembered.
      </p>
      <ul>
        <li><b>What is retained, and for how long.</b> Providers differ, and enterprise terms often differ from default terms.</li>
        <li><b>Whether content is used for training.</b> Usually not on business tiers, and worth confirming rather than assuming.</li>
        <li><b>Where processing happens.</b> Region matters for some regulatory regimes, and not every provider offers a choice.</li>
        <li><b>What your agents can actually send.</b> This is the one teams skip. An agent reads tool results, and tool results contain whatever the underlying system holds. The classification of data an agent may encounter is broader than the classification of data anyone deliberately sends.</li>
        <li><b>Where the enforcement lives.</b> A policy that exists only in a document is not enforcement. The check belongs in the routing layer, before dispatch.</li>
      </ul>

      <h2 id="choosing">Choosing between providers</h2>
      <p>
        Provider comparisons usually turn into benchmark arguments, which is the least useful axis. A more practical
        comparison weighs six things, in roughly this order for agentic use.
      </p>
      <ul>
        <li>
          <b>Performance on your own evaluation set.</b> Twenty real tasks with known answers, scored the same way
          for every candidate. This dominates everything else, and it is the step most often skipped.
        </li>
        <li>
          <b>Tool-calling and structured-output reliability.</b> Agentic systems live on this. A model that reasons
          slightly better and adheres to schemas slightly worse is usually the wrong trade, because schema failures
          are loud, frequent, and require retries.
        </li>
        <li>
          <b>Behavior at your real context lengths.</b> Not the advertised maximum. The length your tasks actually
          reach, with material buried in the middle.
        </li>
        <li>
          <b>Cost at your actual mix.</b> Weighted by how many calls of each kind you make, and including cached
          input if you can use it.
        </li>
        <li>
          <b>Tail latency.</b> The ninety-fifth percentile, multiplied by your typical step count, is what a user
          experiences.
        </li>
        <li>
          <b>Terms and region.</b> Retention, training use, and processing location, checked against the data your
          agents can actually encounter rather than the data you intend to send.
        </li>
      </ul>
      <p>
        Worth adding: choose a fallback from a different provider family rather than a second model from the same
        one. Same-family alternatives tend to share infrastructure and share incidents, so a fallback that fails
        alongside the primary is not a fallback.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Input tokens dominate.</b> In agentic loops the input side is usually the larger cost, because context is resent every step. Optimizing output length is the wrong lever.</li>
        <li><b>Cache invalidation by accident.</b> Placing anything volatile early in a prompt, such as a timestamp, defeats prefix caching entirely and silently.</li>
        <li><b>Retries multiply cost.</b> An automatic retry on a long-context call doubles the spend for that step. Retries need limits.</li>
        <li><b>Streaming complicates tool calls.</b> Handling partial tool call structures correctly is a common source of subtle bugs.</li>
        <li><b>Parameter defaults differ between providers.</b> Sampling settings that were implicit in one provider become explicit differences in another, which is a frequent cause of a model appearing worse after a migration.</li>
        <li><b>Free evaluation credits distort decisions.</b> A model that is cheap during a trial and expensive at volume should be evaluated at volume pricing.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Depends entirely on your architecture rather than on the provider. With a routing abstraction, strong. Without one, weak.</li>
        <li><b>Inspectable.</b> Weak for the model. You can observe inputs, outputs, and costs, and not what produced them.</li>
        <li><b>Portable.</b> Partial. Prompts and tool definitions move if written for portability. The model does not.</li>
        <li><b>Bounded.</b> Not applicable at this layer. Authority is enforced by the harness.</li>
        <li><b>Grounded.</b> Not applicable. Facts come from the data layer.</li>
        <li><b>Auditable.</b> Partial. You can record what was sent and returned. You cannot reproduce a past result if the model behind the name has changed.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        A provider API is not an agent. It returns text and structured tool calls. The loop, the state, the limits,
        and the accountability belong to the harness.
      </p>
      <p>
        A provider API is not a policy boundary. Instructions in a system prompt describing what the model must not
        do are a request, not enforcement, and they fail under adversarial input.
      </p>
      <p>
        A provider API is not inherently incompatible with an open architecture. Using proprietary capability inside
        a system whose data, standards, and execution layers remain open is a reasonable position. The failure is
        not using one. It is building so that you could not stop.
      </p>
    </>
  );
}
