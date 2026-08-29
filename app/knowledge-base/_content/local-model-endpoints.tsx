import type { Article } from './types';

export const article: Article = {
  slug: 'local-model-endpoints',
  title: 'Local model endpoints',
  kind: 'technology',
  layer: 'models-and-routing',
  kicker: 'MODELS AND ROUTING / DEPLOYMENT',
  summary: 'Running inference on hardware you control, which is the only arrangement where you can promise that content never leaves a boundary.',
  standfirst: 'A local endpoint is an inference server you operate. It is slower to set up than an API key and it is the only option that lets you say, without qualification, that a prompt never left the building.',
  keywords: ['local LLM', 'self-hosted inference', 'llama.cpp', 'Ollama', 'vLLM', 'data residency', 'air-gapped AI', 'inference server'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'why', label: 'Why anyone does this' },
    { id: 'spectrum', label: 'Workstation, server, and cluster' },
    { id: 'the-interface', label: 'The interface is the portability' },
    { id: 'performance', label: 'Performance in real terms' },
    { id: 'choosing-runtime', label: 'Choosing a runtime' },
    { id: 'agentic-relevance', label: 'Where it fits in an agentic system' },
    { id: 'hybrid', label: 'The hybrid arrangement' },
    { id: 'operating', label: 'What operating one involves' },
    { id: 'air-gapped', label: 'Fully disconnected environments' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Ollama', href: 'https://ollama.com', note: 'The simplest path from nothing to a running local model with an HTTP endpoint.' },
    { label: 'llama.cpp', href: 'https://github.com/ggml-org/llama.cpp', note: 'The inference engine underneath much of the local model ecosystem, and the origin of GGUF.' },
    { label: 'vLLM', href: 'https://docs.vllm.ai', note: 'A serving engine built for concurrency, which is what production deployment actually requires.' },
    { label: 'llamafile', href: 'https://github.com/Mozilla-Ocho/llamafile', note: 'Single-file distribution of a model plus runtime, useful for constrained or offline environments.' },
    { label: 'Hugging Face Text Generation Inference', href: 'https://huggingface.co/docs/text-generation-inference', note: 'Another production serving option, with a different set of tradeoffs from vLLM.' },
  ],
  related: ['open-weight-models', 'models-and-routing', 'provider-apis'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        A local model endpoint is an inference server running on hardware you control, exposing an HTTP interface
        that your application calls the way it would call a hosted provider. The weights are on your disk. The
        computation happens on your accelerators. Nothing about the request leaves your network.
      </p>
      <p>
        The phrase covers a wide range, from a model running on a developer laptop to a serving cluster in a data
        center. What unites them is that you are the operator, which is simultaneously the entire benefit and the
        entire cost.
      </p>

      <h2 id="why">Why anyone does this</h2>
      <p>
        Calling an API is easier in every respect except the ones that turn out to be decisive for some workloads.
      </p>
      <h3>Data that legally or contractually cannot leave</h3>
      <p>
        This is the reason that admits no workaround. Health records under specific regulatory regimes, material
        under legal hold, defense work, customer data restricted by contract to a jurisdiction, and source code
        covered by an agreement that prohibits third-party processing. In these cases a local endpoint is not the
        cheaper option or the more principled option. It is the only compliant one.
      </p>
      <h3>Guarantees rather than assurances</h3>
      <p>
        Hosted providers publish retention and training policies, and those policies are generally honored. A local
        endpoint replaces a policy with a network topology. For some organizations the difference between trusting a
        contract and being unable to send data at all is what makes an internal approval possible.
      </p>
      <h3>Latency floors</h3>
      <p>
        Network round trips add tens to hundreds of milliseconds per call. An agent making twenty small calls in a
        loop pays that twenty times. Local inference removes it, which matters most for exactly the high-frequency
        small calls a local model is well suited to anyway.
      </p>
      <h3>Cost at sustained volume</h3>
      <p>
        Per-token pricing scales linearly with use. Owned hardware is a fixed cost. Above some steady utilization the
        fixed cost wins, and the crossover point is real even though it is higher than enthusiasm usually assumes.
      </p>
      <h3>Availability independent of anyone else</h3>
      <p>
        A local endpoint does not have rate limits imposed by a third party, does not go down during someone
        else&apos;s incident, and does not deprecate a model on a schedule you did not choose. For systems that must
        keep working, this is worth more than it appears in a cost comparison.
      </p>

      <h2 id="spectrum">Workstation, server, and cluster</h2>
      <p>
        These three are treated as one topic and are genuinely different commitments.
      </p>
      <p>
        <b>Workstation.</b> A model running on a developer machine through a tool such as Ollama or llama.cpp. Setup
        is minutes. It serves one user at a time. This is the right form for development, for privacy-sensitive
        personal work, and for finding out whether a model is adequate before committing anything.
      </p>
      <p>
        <b>Single server.</b> A serving engine on one machine with accelerators, handling real concurrency for a team
        or a service. This is where operational responsibility begins: monitoring, restarts, capacity limits, and
        someone who owns it.
      </p>
      <p>
        <b>Cluster.</b> Multiple servers behind a load balancer, with model versioning, capacity planning, and
        autoscaling. This is an inference platform, and building one is a team&apos;s ongoing work rather than a
        deployment.
      </p>
      <p>
        The common mistake is evaluating on a workstation, finding it adequate, and assuming production is a
        deployment step. It is not. The gap between the first and second rows above is where most self-hosting
        efforts stall.
      </p>

      <h2 id="the-interface">The interface is the portability</h2>
      <p>
        Nearly every local serving tool exposes an interface deliberately compatible with the widely used hosted API
        shape. This convention is doing more architectural work than it gets credit for.
      </p>
      <p>
        Because the interface is the same, a local endpoint is a configuration change rather than an integration. The
        same application code, the same routing layer, and the same tool definitions work against a model on a laptop
        and a model behind a hosted API. Switching is changing a base URL.
      </p>
      <p>
        This is the open interface property from the models layer, and it is the reason local deployment is
        practical at all for most teams. Without a shared interface convention, every local runtime would require its
        own client, and self-hosting would carry an integration cost on top of an operational one.
      </p>
      <p>
        It also means the decision is reversible, which is what makes it safe to try. A team can run locally in
        development, hosted in production, and change its mind about either without touching application code.
      </p>

      <h2 id="performance">Performance in real terms</h2>
      <p>
        Two numbers describe local inference performance and they behave differently.
      </p>
      <p>
        <b>Time to first token</b> is dominated by processing the input. For agentic workloads with long contexts,
        this is frequently the larger share of perceived latency, and it scales with how much context you send. This
        is another reason context discipline pays twice.
      </p>
      <p>
        <b>Tokens per second</b> after that is limited by memory bandwidth more than by raw compute for a single
        request. This is why hardware with high memory bandwidth outperforms hardware with more theoretical compute
        for one user, and why the picture changes under concurrency, where batching lets a serving engine use
        compute that a single request leaves idle.
      </p>
      <p>
        The practical consequence is that workstation runtimes and serving engines are optimized for different
        things. A workstation runtime does well at one request at a time. A serving engine reaches much higher total
        throughput by batching many requests, at the cost of complexity. Measuring a serving engine with one request
        makes it look no better than the simple tool, which is a common and misleading benchmark.
      </p>

      <h2 id="choosing-runtime">Choosing a runtime</h2>
      <p>
        The runtime decision is usually made by whichever tool someone tried first, and it is worth making
        deliberately because the options are optimized for different situations.
      </p>
      <h3>Convenience-first runtimes</h3>
      <p>
        Tools such as Ollama wrap model download, quantization selection, and serving behind a few commands. They are
        the right choice for development, for personal use, and for the first two weeks of any evaluation. They are
        not built for many simultaneous users, and treating a convenience runtime as a production server is the
        single most common self-hosting mistake.
      </p>
      <h3>Throughput-first serving engines</h3>
      <p>
        Engines such as vLLM implement continuous batching and careful memory management for the key-value cache,
        which is what allows one accelerator to serve many concurrent requests efficiently. They expect more
        configuration and they reward it substantially. If real traffic is the goal, start here rather than migrating
        later.
      </p>
      <h3>Embedded and portable options</h3>
      <p>
        Libraries such as llama.cpp can be linked directly into an application, and single-file distributions bundle
        a model with its runtime. These matter for constrained environments, for shipping something to a machine you
        do not administer, and for offline use, where the absence of a separate service to install is the point.
      </p>
      <p>
        A reasonable default path is to prototype on a convenience runtime, decide on the model with your evaluation
        set, and then deploy that model on a serving engine. Because the HTTP interface is broadly compatible across
        all of them, this progression does not require application changes, which is exactly the benefit the shared
        interface convention was supposed to deliver.
      </p>

      <h2 id="agentic-relevance">Where it fits in an agentic system</h2>
      <p>
        Local endpoints suit particular parts of an agentic workload very well and others poorly, and the split is
        predictable enough to design around.
      </p>
      <h3>High-frequency small calls</h3>
      <p>
        Deciding which tool applies, classifying whether input is in scope, extracting a field, checking whether a
        result looks like an error. These happen constantly, need little capability, and benefit from having no
        network latency and no marginal cost. This is the strongest case.
      </p>
      <h3>Steps handling restricted content</h3>
      <p>
        When a tool returns customer records or proprietary source, the context containing that material has to be
        processed somewhere. If policy restricts where, the model handling that step runs locally even if the rest of
        the system does not.
      </p>
      <h3>Development and evaluation</h3>
      <p>
        Iterating against a free local endpoint removes the hesitation that per-call pricing introduces, and it
        keeps prompts honest, because a prompt that only works on one frontier model reveals itself immediately.
      </p>
      <h3>Bulk work</h3>
      <p>
        Processing a large corpus is the workload where owning capacity most clearly beats renting it, and where the
        quality bar is usually within reach of a mid-sized model.
      </p>
      <h3>Not planning</h3>
      <p>
        Multi-step planning is where capability differences show most and where a weaker model produces expensive
        wrong turns rather than merely worse writing. This is the part of an agentic loop least suited to a local
        model today.
      </p>

      <h2 id="hybrid">The hybrid arrangement</h2>
      <p>
        The framing of local versus hosted is a false choice, and the arrangement most mature systems arrive at uses
        both deliberately.
      </p>
      <p>
        A workable shape: a small local model handles classification, routing, and extraction. A mid-tier hosted
        open-weight model handles summarization and routine generation. A frontier hosted model handles planning and
        final synthesis. A policy rule routes anything containing restricted content to the local endpoint regardless
        of which tier would otherwise handle it.
      </p>
      <p>
        This is only expressible if a routing layer exists. Without one, the choice is global and therefore wrong for
        most of the calls. With one, each category of call goes where it belongs, and the policy rule is a check in
        one place rather than a convention people are asked to remember.
      </p>
      <p>
        The same structure makes the local endpoint useful as a fallback. When a provider is unavailable, degrading
        to a local model produces worse answers and keeps the system running, which is often preferable to failing.
        That degradation should be recorded rather than silent, so that quality changes are attributable.
      </p>

      <h2 id="operating">What operating one involves</h2>
      <p>
        The honest list, because underestimating it is the usual cause of a stalled self-hosting effort.
      </p>
      <ul>
        <li><b>Hardware.</b> Procurement, capacity planning, and the fact that accelerator supply is not always immediate.</li>
        <li><b>Serving configuration.</b> Concurrency limits, context limits, and memory settings tuned so the failure mode is queuing rather than crashing.</li>
        <li><b>Model lifecycle.</b> Downloading, verifying, storing, versioning, and rolling out new weights without an outage.</li>
        <li><b>Monitoring.</b> Latency, throughput, queue depth, memory pressure, and error rates, with alerting that someone actually receives.</li>
        <li><b>Capacity management.</b> Deciding what happens when demand exceeds capacity, which is a product decision as much as an operational one.</li>
        <li><b>Upgrades.</b> Serving engines move quickly, and staying current matters for both performance and security.</li>
        <li><b>An owner.</b> The requirement most often left implicit and the one that determines whether the rest happens.</li>
      </ul>
      <p>
        None of this is exotic. It is ordinary infrastructure work, and it is work that a hosted API removes
        entirely. That is the trade, and it should be made with the list in view.
      </p>

      <h2 id="air-gapped">Fully disconnected environments</h2>
      <p>
        A subset of deployments run with no internet access at all. These are worth calling out separately because
        several assumptions that hold everywhere else stop holding.
      </p>
      <p>
        Model acquisition becomes a supply-chain exercise. Weights arrive through whatever transfer process the
        environment permits, are verified by checksum, and are stored internally. There is no pulling a model on
        demand, which means the set of available models is a planned inventory rather than a configuration value.
      </p>
      <p>
        The same applies to the runtime and its dependencies. Serving engines move quickly and pull large dependency
        trees, so an internal package mirror and a tested upgrade path matter more here than in a connected
        environment, where staying current is closer to routine.
      </p>
      <p>
        Tooling assumptions need auditing too. Agent tools that fetch documentation, resolve packages, or call
        external services will fail, and the useful failure is an explicit one rather than a timeout at step nine of
        a task. Tools should declare that they require network access so the harness can exclude them from the
        available set rather than discovering the limitation at call time.
      </p>
      <p>
        The compensating benefit is that the strongest form of the bounded property comes for free. In a disconnected
        environment, questions about where content might have gone have a structural answer rather than a policy
        answer, which is frequently the reason such an environment exists in the first place.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Memory sizing on weights alone.</b> Context memory under concurrency frequently exceeds weight memory. This is the most common cause of a deployment that works in testing and fails under load.</li>
        <li><b>Chat template mismatches.</b> A wrong template makes a capable model look weak. Verify against the model card before concluding anything about quality.</li>
        <li><b>Assuming interface compatibility is complete.</b> The basic shape is usually compatible. Tool calling, structured output, and streaming details vary. Test those specifically.</li>
        <li><b>Quantization chosen for convenience.</b> The default quantization in a convenient tool may be more aggressive than your task tolerates. Evaluate rather than accept.</li>
        <li><b>Local treated as automatically private.</b> The model is local. The tools the agent calls may not be. Leakage usually happens through a tool, not through the model.</li>
        <li><b>No plan for capacity exhaustion.</b> A hosted API rate limits. A local endpoint queues until something times out, unless you configured otherwise.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Standard interfaces mean the endpoint can be swapped, and the models behind it can be too.</li>
        <li><b>Inspectable.</b> Strong. You can observe every request, every parameter, and the entire serving configuration.</li>
        <li><b>Portable.</b> Strong. The weights and the serving configuration move to any hardware you have.</li>
        <li><b>Bounded.</b> Strong in one specific sense: content cannot leave the boundary, because there is no path out.</li>
        <li><b>Grounded.</b> Not applicable. Local deployment does not improve grounding.</li>
        <li><b>Auditable.</b> Strong. Full request logging is available without a provider&apos;s cooperation, and a pinned checkpoint makes past results reproducible.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        A local endpoint is not automatically private. It guarantees that the model call stays inside. It says
        nothing about the web search tool, the ticket system, or the logging pipeline the same agent uses.
      </p>
      <p>
        A local endpoint is not free. Hardware, power, and operational time replace per-token cost. At low
        utilization it is usually more expensive per useful token than an API.
      </p>
      <p>
        A local endpoint is not a capability equalizer. Running a model yourself does not make it stronger. If a task
        needs a frontier model, running locally means either accepting a weaker answer or acquiring substantial
        hardware, and pretending otherwise leads to systems that are principled and disappointing.
      </p>
    </>
  );
}
