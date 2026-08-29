import type { Article } from './types';

export const article: Article = {
  slug: 'models-and-routing',
  title: 'Models and routing',
  kind: 'layer',
  layer: null,
  kicker: '02 / INTELLIGENCE',
  summary: 'The layer where capability enters the system, and where the choice of model stays a choice rather than a dependency.',
  standfirst: 'This layer supplies reasoning and generation. Its architectural job is not to pick the best model, because there is no single best model. Its job is to keep the choice open, so that task, cost, latency, policy, and deployment constraints can each be answered separately.',
  keywords: ['open weight models', 'model routing', 'LLM selection', 'inference deployment', 'OpenRouter', 'local inference', 'provider APIs'],
  sections: [
    { id: 'what-the-layer-covers', label: 'What the layer covers' },
    { id: 'four-senses-of-open', label: 'Four senses of open' },
    { id: 'the-spectrum', label: 'The deployment spectrum' },
    { id: 'why-routing', label: 'Why routing is its own concern' },
    { id: 'choosing', label: 'Choosing a model for a task' },
    { id: 'context', label: 'Context is the real interface' },
    { id: 'economics', label: 'Cost, latency, and capacity' },
    { id: 'open-weights-value', label: 'Where open weights matter most' },
    { id: 'structured-output', label: 'Structured output and tool calling' },
    { id: 'evaluation', label: 'Evaluating models you did not train' },
    { id: 'failure-modes', label: 'Common failure modes' },
    { id: 'openness', label: 'How to evaluate this layer' },
    { id: 'sequence', label: 'A build sequence that works' },
    { id: 'not', label: 'What this layer is not' },
  ],
  learnMore: [
    { label: 'Open-weight models on Hugging Face', href: 'https://huggingface.co/models', note: 'The largest public index of downloadable model weights, with licenses and model cards attached.' },
    { label: 'OpenRouter', href: 'https://openrouter.ai', note: 'A routing service exposing many providers behind one API, with published pricing and availability.' },
    { label: 'Nous Portal', href: 'https://portal.nousresearch.com', note: 'Model access, tooling, and cloud services from Nous Research.' },
    { label: 'llama.cpp', href: 'https://github.com/ggml-org/llama.cpp', note: 'A widely used local inference engine, useful for understanding what local deployment actually requires.' },
    { label: 'vLLM', href: 'https://docs.vllm.ai', note: 'A serving engine for running open-weight models with production throughput characteristics.' },
    { label: 'Ollama', href: 'https://ollama.com', note: 'A simple local runtime for pulling and serving open-weight models on a workstation.' },
    { label: 'Open Source Initiative on open source AI', href: 'https://opensource.org/ai', note: 'Useful background on why open weights and open source are not the same claim.' },
  ],
  related: ['data-and-semantics', 'harnesses-and-brokers', 'open-standards'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-the-layer-covers">What the layer covers</h2>
      <p>
        This is the layer people think of first when they hear the word AI, and it is the layer that matters least to
        the long-term shape of the architecture. That is not a slight. Model capability is what makes any of this
        work. It is simply the part that changes fastest, is easiest to swap, and is least worth building your system
        around.
      </p>
      <p>
        Concretely, the layer covers where inference happens, which weights are used, who operates the hardware, how
        requests reach a model, and what happens when the chosen model is unavailable, too slow, too expensive, or
        not allowed for a particular class of data. Routing is part of the layer rather than a separate one because
        in practice you cannot make the model choice open without also making the path to the model open.
      </p>
      <p>
        The architectural stance is straightforward. Treat models as interchangeable capability suppliers. Write the
        rest of the system so that switching one costs a configuration change and a round of evaluation, not a
        rewrite.
      </p>

      <h2 id="four-senses-of-open">Four senses of open</h2>
      <p>
        The word open does more work in this layer than anywhere else in the stack, and it is regularly used to mean
        four different things. Keeping them separate is the single most useful habit when evaluating a model.
      </p>
      <div className="kb-table-scroll">
        <table className="kb-table">
          <thead>
            <tr><th>Claim</th><th>What it actually means</th><th>What it does not mean</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Open source</td>
              <td>Training code, and often data pipelines, are published under a license that permits reuse and modification.</td>
              <td>That you can run the model, or that the weights exist publicly.</td>
            </tr>
            <tr>
              <td>Open weights</td>
              <td>The trained parameters are downloadable and can be run on your own hardware.</td>
              <td>That training data is disclosed, or that the license permits commercial use.</td>
            </tr>
            <tr>
              <td>Open format</td>
              <td>The artifact uses a documented, widely implemented container such as safetensors or GGUF.</td>
              <td>That the weights are freely licensed.</td>
            </tr>
            <tr>
              <td>Open interface</td>
              <td>The serving API is documented and implemented by more than one vendor, so clients are portable.</td>
              <td>Anything at all about the model itself.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        These combine in ways that surprise people. A model can have open weights, a restrictive license, and a
        proprietary hosting API. Another can be fully proprietary but reachable through an interface that three other
        vendors also implement, which makes replacing it trivial. For architectural purposes, open interface often
        buys more freedom day to day than open weights, while open weights buy more freedom in the long run. A serious
        system usually wants both, in different places.
      </p>
      <div className="kb-callout">
        <b>The question that cuts through it</b>
        <p>
          Do not ask whether a model is open. Ask what specifically you would have to change if this model were
          withdrawn, repriced, or restricted next quarter. The size of that answer is the real measure.
        </p>
      </div>

      <h2 id="the-spectrum">The deployment spectrum</h2>
      <p>
        Model access sits on a spectrum from full local control to full delegation. Each point trades control against
        convenience, and mature systems occupy several points at once rather than picking one.
      </p>
      <h3>Local, on your own machine</h3>
      <p>
        Weights run on a workstation or a server you control. Nothing leaves the network. This is the right choice
        for sensitive material, for offline work, for cost-free iteration during development, and for cases where an
        agent handles data that policy forbids sending anywhere. The cost is capability and throughput. Local models
        have improved a great deal and still trail the frontier on hard reasoning and long-context work.
      </p>
      <h3>Self-hosted, on infrastructure you operate</h3>
      <p>
        The same open weights served on your own accelerators with a serving engine built for concurrency. This gives
        you fixed costs instead of per-token costs, predictable latency, no rate limits imposed by someone else, and
        full control over data residency. It also gives you an inference platform to operate, which is a real team
        commitment rather than a deployment step.
      </p>
      <h3>Hosted open weights</h3>
      <p>
        Someone else runs the open model and sells inference. You keep the option to move, because the weights are
        downloadable and other providers serve them, while avoiding the operational burden. This is often the most
        practical middle ground, and it is where the interface question matters most.
      </p>
      <h3>Provider APIs</h3>
      <p>
        Frontier proprietary models reached through a vendor API. You get the strongest capability available and
        accept that the artifact is not yours. This is a reasonable choice for the hardest reasoning in a system,
        provided the rest of the architecture does not assume it.
      </p>
      <h3>Routers across all of the above</h3>
      <p>
        A routing service or library sits in front of several of these and presents one interface. This is what turns
        a collection of options into an actual choice you can exercise at request time.
      </p>

      <h2 id="why-routing">Why routing is its own concern</h2>
      <p>
        Teams often start with a single provider client compiled into the agent code, then discover they need a
        second model for cost reasons, a third for a data-residency requirement, and a local one for development.
        By then the provider call is scattered across dozens of files with vendor-specific parameters woven into
        each one.
      </p>
      <p>
        Routing exists to prevent this. Whether implemented as a hosted service, a library, or a small internal
        service, it does five things:
      </p>
      <ul>
        <li><b>Normalizes the interface.</b> One request shape, many backends.</li>
        <li><b>Applies policy.</b> Requests carrying regulated data go only to approved endpoints, and the rule lives in one place.</li>
        <li><b>Handles failure.</b> Rate limits, timeouts, and provider outages fall back rather than surfacing as agent errors.</li>
        <li><b>Manages cost.</b> Cheap models handle routine steps, expensive models handle the hard ones, and the split is a configuration decision.</li>
        <li><b>Produces one usage record.</b> Spend, latency, and error rates are visible across every model in one place.</li>
      </ul>
      <p>
        The cost of routing is a hop, some latency, and a component to keep current as providers change. The cost of
        not routing is that every model decision becomes a code change, which in practice means the decision stops
        being made at all.
      </p>

      <h2 id="choosing">Choosing a model for a task</h2>
      <p>
        Agentic systems are not one workload. A single request may involve a dozen model calls of very different
        character, and treating them identically is the most common source of both excess cost and poor quality.
      </p>
      <p>
        Useful categories, roughly in order of how demanding they are:
      </p>
      <ul>
        <li><b>Classification and routing.</b> Deciding which tool to use or whether input is in scope. Small, fast models handle this well, and the call happens constantly.</li>
        <li><b>Extraction and formatting.</b> Turning text into a structured record. Constrained output matters more than raw reasoning.</li>
        <li><b>Summarization.</b> Sensitive to context length and to faithfulness rather than to cleverness.</li>
        <li><b>Multi-step planning.</b> Deciding what to do across several tool calls. This is where model quality shows most clearly and where a weak model produces expensive mistakes.</li>
        <li><b>Code generation and editing.</b> Benefits from models specifically trained on it, and from long context.</li>
        <li><b>Final synthesis.</b> The answer a person reads. Worth spending on, because it is the part that gets judged.</li>
      </ul>
      <p>
        A well-tuned system might use a small local model for the first two categories, a mid-tier hosted open-weight
        model for the middle, and a frontier model for planning and final synthesis. That mix is only reachable if
        the model choice is a configuration value rather than an assumption baked into the harness.
      </p>

      <h2 id="context">Context is the real interface</h2>
      <p>
        Model APIs look like they take a prompt. In an agentic system they take an assembled context: instructions,
        tool definitions, retrieved documents, prior steps, tool results, and the current request. That assembly is
        where most quality is won or lost, and it is worth treating as an engineering artifact rather than as
        prompt writing.
      </p>
      <p>
        Three properties of context drive design decisions in this layer.
      </p>
      <h3>Length is not free capability</h3>
      <p>
        A larger context window lets you put more in. It does not mean the model attends to all of it equally.
        Material placed in the middle of a very long context is reliably used less well than material at the
        beginning or end. The practical consequence is that filling a window because it is available usually lowers
        quality while raising cost. Selecting the right ten thousand tokens beats supplying a hundred thousand.
      </p>
      <h3>Structure survives model changes better than phrasing</h3>
      <p>
        Prompts that depend on a particular model&apos;s quirks are a form of lock-in that does not appear in any
        contract. Prompts organized by structure, with clearly separated instructions, facts, tools, and task,
        transfer between model families with far less rework. This is one of the few places where writing for
        portability costs nothing at the time and saves a great deal later.
      </p>
      <h3>Caching changes the economics</h3>
      <p>
        Many providers can reuse a previously processed prefix at reduced cost and latency. Because agentic loops
        resend a largely identical prefix on every step, this matters more here than in single-turn use. It also
        imposes a design rule: put stable content first and volatile content last, or the cache never hits. That rule
        is worth applying even on providers that do not offer caching, because it costs nothing and pays off the day
        you switch.
      </p>

      <h2 id="economics">Cost, latency, and capacity</h2>
      <p>
        Agentic workloads have a cost profile that catches teams off guard, because a single user request expands
        into many model calls, and the number of calls is not fixed. A conversation that resolves in two steps costs
        very little. The same conversation that requires eight tool calls and two retries costs an order of magnitude
        more. Budgeting on averages therefore understates the tail badly.
      </p>
      <p>
        Three factors dominate:
      </p>
      <ul>
        <li>
          <b>Context length.</b> Input tokens usually outnumber output tokens in agentic work, often heavily, because
          each step resends accumulated context. Trimming context is normally the highest-leverage cost change
          available, and it usually improves quality as well.
        </li>
        <li>
          <b>Call count.</b> Every additional planning step multiplies cost. Bounding loop depth is a cost control and
          a safety control at the same time.
        </li>
        <li>
          <b>Model tier.</b> The difference between tiers is large enough that routing routine steps away from the
          expensive model changes the total more than any prompt optimization will.
        </li>
      </ul>
      <p>
        Latency deserves separate attention because it compounds. A step that takes two seconds is fine. Eight of
        them in sequence is sixteen seconds of silence, which is a product problem rather than an infrastructure
        one. Systems that feel fast usually parallelize independent steps and stream partial output, and both of
        those are harness responsibilities informed by this layer&apos;s characteristics.
      </p>

      <h2 id="open-weights-value">Where open weights matter most</h2>
      <p>
        Open weights are sometimes argued for on price and sometimes on ideology. Both miss the cases where they
        change what is possible rather than what is cheaper.
      </p>
      <ul>
        <li>
          <b>Data that cannot leave.</b> Regulated records, material under legal hold, source code with contractual
          restrictions. Here local or self-hosted inference is not an optimization, it is the only compliant path.
        </li>
        <li>
          <b>Specialization.</b> Fine-tuning on a narrow domain can make a mid-sized model outperform a much larger
          general one for that domain. This requires weights you can modify.
        </li>
        <li>
          <b>Reproducibility.</b> A pinned set of weights produces the same behavior in two years. A hosted endpoint
          behind a moving name does not, which matters for anything that must be defensible after the fact.
        </li>
        <li>
          <b>Longevity.</b> A hosted model can be deprecated with a few months of notice. Weights on your own storage
          cannot be withdrawn.
        </li>
        <li>
          <b>Cost at volume.</b> Beyond a certain steady request rate, owning capacity becomes cheaper than renting
          it. The crossover point is higher than most teams expect, and it does exist.
        </li>
      </ul>
      <p>
        Equally, there are cases where reaching for open weights is the wrong instinct: low request volumes where
        capacity sits idle, teams with no appetite for operating accelerators, and work at the edge of what any
        model can do, where the capability gap is the binding constraint. The architecture should let you take either
        position per workload rather than forcing one globally, and that flexibility is exactly what the routing
        concern provides.
      </p>

      <h2 id="structured-output">Structured output and tool calling</h2>
      <p>
        Agentic systems rarely want prose. They want a decision the surrounding code can act on: which tool to call,
        with which arguments, or a record with known fields. How reliably a model produces that shape is a selection
        criterion in its own right, and it varies more between models than general capability does.
      </p>
      <p>
        There are three broad mechanisms, and they are not equally strong.
      </p>
      <ul>
        <li>
          <b>Asking nicely.</b> Instructing the model to reply in a given format. This works most of the time and
          fails unpredictably, usually under unusual input, which is exactly when failure is most expensive.
        </li>
        <li>
          <b>Native tool calling.</b> The provider accepts tool schemas and returns a structured call. This is far
          more reliable and is now the normal path. The schemas themselves stay portable if you define them once and
          translate per provider rather than writing them in one vendor&apos;s dialect.
        </li>
        <li>
          <b>Constrained decoding.</b> The serving engine restricts generation so output must satisfy a grammar or
          schema. This is the strongest guarantee available and is mostly reachable when you control serving, which
          is one of the underrated arguments for self-hosting.
        </li>
      </ul>
      <p>
        Whichever mechanism is used, the surrounding code should validate rather than trust. A model that returns
        well-formed output ninety-nine percent of the time still fails once in a hundred steps, and an agent taking
        many steps per task will meet that case daily. Validation with a bounded retry is cheap insurance, and the
        retry itself should be recorded, because a rising retry rate is often the first visible sign that a provider
        has quietly changed a model behind a stable name.
      </p>

      <h2 id="evaluation">Evaluating models you did not train</h2>
      <p>
        Public benchmarks are useful for narrowing a shortlist and close to useless for choosing between the final
        two or three. They measure general capability on tasks that are not yours, and popular benchmarks leak into
        training data over time.
      </p>
      <p>
        What works better is a small, specific, boring evaluation set built from your own work:
      </p>
      <ul>
        <li>Twenty to fifty real tasks drawn from actual usage, not invented examples.</li>
        <li>A recorded expectation for each: the correct answer, or the correct sequence of tool calls.</li>
        <li>Automatic scoring where the answer is checkable, and human review where it is not.</li>
        <li>The same set run against every candidate model, including the one already in production.</li>
        <li>Cost and latency recorded alongside quality, because a model that is five percent better and four times more expensive is usually the wrong choice.</li>
      </ul>
      <p>
        This is unglamorous work and it is the only reliable way to make model selection an engineering decision
        rather than a preference. It also pays off repeatedly, because the same set answers the question every time a
        new model is released.
      </p>

      <h2 id="failure-modes">Common failure modes</h2>
      <ul>
        <li>
          <b>Provider client compiled into the agent.</b> Vendor-specific parameters spread through the codebase, and
          switching becomes a project rather than a setting.
        </li>
        <li>
          <b>One model for everything.</b> Routine classification runs through the most expensive available model,
          which is both slow and wasteful.
        </li>
        <li>
          <b>Open weights assumed to be freely licensed.</b> Downloadable does not mean permitted for your use.
          Licenses vary considerably and some restrict commercial deployment or specific domains.
        </li>
        <li>
          <b>No fallback path.</b> A provider incident takes the whole system down because there is no second route.
        </li>
        <li>
          <b>Prompts tuned so tightly to one model that they break on any other.</b> This is a real form of lock-in
          and it accumulates quietly.
        </li>
        <li>
          <b>Local deployment adopted for privacy without checking capability.</b> The data stays home and the answers
          get worse, which trades one risk for another rather than removing it.
        </li>
        <li>
          <b>Usage invisible.</b> Spend is only discovered at the end of the billing period, and no one can attribute
          it to a feature.
        </li>
      </ul>

      <h2 id="openness">How to evaluate this layer</h2>
      <ul>
        <li><b>Replaceable.</b> How many files change if you switch the primary model? If the answer is more than one configuration file, the layer is not replaceable.</li>
        <li><b>Inspectable.</b> Can you see which model handled a given step, what it was sent, and what it cost?</li>
        <li><b>Portable.</b> Do prompts, tool definitions, and output schemas work across at least two model families without rewriting?</li>
        <li><b>Bounded.</b> Are there rules about which categories of data may reach which endpoints, and are they enforced rather than documented?</li>
        <li><b>Grounded.</b> Does the model receive retrieved facts and semantic definitions, or is it asked to recall them?</li>
        <li><b>Auditable.</b> Is there a durable record of model, version, parameters, and token counts for each call?</li>
      </ul>

      <h2 id="sequence">A build sequence that works</h2>
      <ol>
        <li><b>Put a routing abstraction in from the start.</b> Even with one provider. It costs almost nothing early and is expensive to retrofit.</li>
        <li><b>Build the evaluation set before optimizing anything.</b> Twenty real tasks with known answers beats any amount of intuition.</li>
        <li><b>Pick a default model and a fallback in a different family.</b> Different family matters, because same-family alternatives tend to fail together.</li>
        <li><b>Separate the call categories.</b> Give routing, extraction, and planning their own configuration entries even if they initially point at the same model.</li>
        <li><b>Add a local option for development.</b> It removes cost anxiety from iteration and forces prompts to stay portable.</li>
        <li><b>Write the data policy down and enforce it in the router.</b> Which classes of content may go where, checked in code.</li>
        <li><b>Record every call.</b> Model, version, tokens, latency, cost, and outcome. Everything downstream depends on this record existing.</li>
        <li><b>Re-run the evaluation set on a schedule.</b> Models change under you even when the name stays the same.</li>
      </ol>

      <h2 id="not">What this layer is not</h2>
      <p>
        This layer is not the agent. A model produces text. An agent decides what to do, calls tools, keeps state, and
        respects boundaries. Those behaviors belong to the harness, and attributing them to the model leads to
        expecting the wrong things from both.
      </p>
      <p>
        It is also not where governance lives. A model has no idea what it is allowed to do. Restrictions expressed as
        instructions in a prompt are suggestions, not controls, and they fail under adversarial input. Real limits are
        enforced in the layer that executes tool calls.
      </p>
      <p>
        Finally, it is not where knowledge should live. Facts recalled from training are unattributable, undated, and
        unverifiable. Facts retrieved from the data layer can be pointed at. When a system needs to be right rather
        than plausible, the model&apos;s job is to reason over supplied facts, not to supply them.
      </p>
    </>
  );
}
