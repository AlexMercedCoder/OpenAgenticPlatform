import type { Article } from './types';

export const article: Article = {
  slug: 'open-weight-models',
  title: 'Open-weight models',
  kind: 'technology',
  layer: 'models-and-routing',
  kicker: 'MODELS AND ROUTING / MODEL ARTIFACTS',
  summary: 'Models whose trained parameters you can download and run yourself, which changes what is possible rather than only what is cheaper.',
  standfirst: 'An open-weight model is one whose parameters are published for download. That single property decides whether you can run a model on your own hardware, adapt it, pin it for reproducibility, and keep using it after a vendor loses interest.',
  keywords: ['open weight models', 'open source AI', 'model licenses', 'local inference', 'fine tuning', 'safetensors', 'GGUF', 'quantization'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'not-open-source', label: 'Open weights is not open source' },
    { id: 'licenses', label: 'Licenses actually vary' },
    { id: 'what-you-get', label: 'What you actually download' },
    { id: 'quantization', label: 'Quantization and what it costs' },
    { id: 'hardware', label: 'What hardware you actually need' },
    { id: 'running', label: 'Running one' },
    { id: 'when-worth-it', label: 'When open weights are the right call' },
    { id: 'when-not', label: 'When they are not' },
    { id: 'agentic-relevance', label: 'Where they fit in an agentic system' },
    { id: 'evaluating', label: 'Evaluating one honestly' },
    { id: 'fine-tuning', label: 'Adaptation and fine-tuning' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How they score on openness' },
    { id: 'not', label: 'What they are not' },
  ],
  learnMore: [
    { label: 'Hugging Face model index', href: 'https://huggingface.co/models', note: 'The largest public index of downloadable weights, with licenses and model cards attached to each.' },
    { label: 'Open Source Initiative on open source AI', href: 'https://opensource.org/ai', note: 'Background on why open weights and open source are separate claims.' },
    { label: 'safetensors', href: 'https://github.com/huggingface/safetensors', note: 'The weight container format that replaced pickle-based files, and why that mattered for safety.' },
    { label: 'llama.cpp', href: 'https://github.com/ggml-org/llama.cpp', note: 'A widely used local inference engine and the origin of the GGUF quantized format.' },
    { label: 'vLLM', href: 'https://docs.vllm.ai', note: 'A serving engine for running open-weight models with production throughput.' },
    { label: 'Ollama', href: 'https://ollama.com', note: 'The simplest way to pull and serve an open-weight model on a workstation.' },
  ],
  related: ['models-and-routing', 'local-model-endpoints', 'provider-apis'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        An open-weight model is one whose trained parameters have been published for download. You can fetch the
        files, load them into an inference engine, and run the model on hardware you control, without asking anyone.
      </p>
      <p>
        That is the whole claim, and it is narrower than the surrounding conversation usually implies. Open weights
        say nothing about how the model was trained, what data was used, whether the training code is available, or
        what the license permits you to do with the output.
      </p>
      <p>
        The property still matters enormously, because it is the one that determines whether a model is something you
        have or something you rent.
      </p>

      <h2 id="not-open-source">Open weights is not open source</h2>
      <p>
        This confusion causes more bad decisions than any other in this layer, so it is worth stating flatly.
      </p>
      <p>
        Open source, applied to software, means the source is available under a license permitting use,
        modification, and redistribution, including by competitors. Applied to a model, the equivalent would mean
        publishing the training code, the data pipeline, and enough detail to reproduce the artifact.
      </p>
      <p>
        Open weights means the finished artifact is downloadable. The recipe is not included. You can use the model
        and you cannot rebuild it, audit what went into it, or verify claims about its training.
      </p>
      <p>
        Both are legitimate positions and they buy different things. Open weights buy operational freedom: run it
        where you like, keep it as long as you like, adapt it. Open source buys understanding and reproducibility.
        Most models described as open in general conversation are open-weight, and a smaller number are open in the
        fuller sense.
      </p>
      <div className="kb-callout">
        <b>Why the distinction is practical, not pedantic</b>
        <p>
          If your reason for wanting an open model is that data must not leave your network, open weights are
          sufficient. If your reason is that you must be able to explain what the model learned, open weights are
          not.
        </p>
      </div>

      <h2 id="licenses">Licenses actually vary</h2>
      <p>
        Downloadable does not mean permitted. Model licenses range from genuinely permissive to restrictive in ways
        that only surface during legal review, which is usually late.
      </p>
      <p>
        Categories worth recognizing:
      </p>
      <ul>
        <li><b>Standard permissive software licenses.</b> Apache 2.0 or MIT applied to the weights. The simplest case, with no model-specific restrictions.</li>
        <li><b>Custom vendor licenses.</b> Often permissive in practice but with added conditions: usage thresholds above which separate terms apply, naming or attribution requirements, or restrictions on using outputs to train competing models.</li>
        <li><b>Research-only licenses.</b> Explicitly prohibiting commercial deployment. Common for models released to accompany a paper.</li>
        <li><b>Use-restriction licenses.</b> Permitting most uses while prohibiting specific applications. Whether these qualify as open is contested; what matters operationally is that they are conditions you must actually check against your use.</li>
      </ul>
      <p>
        The practical advice is unglamorous. Read the license before building on the model, not before shipping.
        Record which license applies to each model in use, because the answer changes between versions of the same
        model family more often than people expect.
      </p>

      <h2 id="what-you-get">What you actually download</h2>
      <p>
        A model repository typically contains a handful of things, and knowing what each is removes most of the
        confusion of a first attempt.
      </p>
      <ul>
        <li><b>Weight files.</b> The parameters themselves, usually in safetensors format, often split across several files. This is the bulk of the download, ranging from a few gigabytes to hundreds.</li>
        <li><b>Configuration.</b> Architecture details the inference engine needs: layer counts, dimensions, attention configuration, context length.</li>
        <li><b>Tokenizer files.</b> How text becomes tokens. Using a mismatched tokenizer produces output that is subtly wrong rather than obviously broken, which makes it a nasty failure.</li>
        <li><b>A chat template.</b> How conversation turns are formatted into the exact string the model was trained on. Getting this wrong is the most common cause of a locally run model performing far worse than expected.</li>
        <li><b>A model card.</b> Documentation of intended use, training approach at some level of detail, evaluation results, and known limitations. Quality varies widely.</li>
      </ul>
      <p>
        The safetensors format is worth a note. It replaced Python pickle-based weight files, which could execute
        arbitrary code on load. Downloading weights in a pickle format from an untrusted source is running untrusted
        code. Safetensors cannot do that by design, which is why it became the norm.
      </p>

      <h2 id="quantization">Quantization and what it costs</h2>
      <p>
        Weights are trained at higher precision than they need to be run at. Quantization reduces the precision of
        each parameter, shrinking memory requirements substantially in exchange for some quality.
      </p>
      <p>
        The arithmetic is what makes it interesting. A model with seventy billion parameters at sixteen-bit
        precision needs roughly one hundred and forty gigabytes of memory for weights alone, before context. The same
        model quantized to four bits needs roughly thirty-five. The first requires multiple datacenter accelerators.
        The second fits on hardware a team might actually have.
      </p>
      <p>
        The cost is real and non-linear. Moving from sixteen to eight bits is usually close to free in quality terms.
        Eight to four is noticeable on hard tasks and often acceptable. Below four, degradation becomes obvious,
        particularly on reasoning and code, and particularly on long inputs.
      </p>
      <p>
        A useful rule of thumb when hardware is the constraint: a larger model at four bits generally beats a smaller
        model at sixteen bits, up to the point where quantization artifacts start affecting the specific task. Since
        that point differs by task, this is a question to settle with your own evaluation set rather than with
        published numbers.
      </p>

      <h2 id="hardware">What hardware you actually need</h2>
      <p>
        The most common reason a first attempt at self-hosting goes badly is that sizing was done on weight size
        alone. Three things consume memory, and only the first is obvious.
      </p>
      <p>
        <b>The weights</b> are fixed: parameter count multiplied by bytes per parameter. This is the number everyone
        calculates.
      </p>
      <p>
        <b>The key-value cache</b> grows with sequence length and with the number of concurrent requests. Every token
        already processed in an active request holds cached state. In agentic workloads, where contexts are long and
        requests overlap, this frequently exceeds the weights themselves. A model that loads comfortably and then
        fails under three concurrent long-context requests is almost always hitting this.
      </p>
      <p>
        <b>Activation memory</b> during a forward pass is smaller and non-trivial, and serving engines manage it for
        you.
      </p>
      <p>
        The practical implication is to size for concurrency and context, not for the model. A useful starting
        estimate is to budget the weight size, then add capacity for the number of simultaneous requests you expect
        multiplied by your typical context length, then leave headroom. Serving engines expose settings to cap
        concurrency and context so that the failure mode is queuing rather than an out-of-memory crash, and setting
        those deliberately is worth doing before the first real load rather than after.
      </p>
      <p>
        On the accelerator question, the honest summary is that consumer hardware runs small and mid-sized quantized
        models well enough for development and for the high-frequency small calls described later on this page.
        Serving a large model to real traffic is datacenter-class work. Teams that conflate the two end up
        disappointed by a workstation experiment and conclude that open weights are not viable, when what they
        actually learned is that one machine does not serve production traffic.
      </p>

      <h2 id="running">Running one</h2>
      <p>
        The tooling has improved enough that a first run takes minutes rather than a weekend, and the options divide
        along a clear line.
      </p>
      <p>
        <b>Workstation runtimes</b> such as Ollama and llama.cpp are built for one user at a time. They handle
        download, quantization format, and serving behind a simple API. This is the right starting point for
        development, for privacy-sensitive local work, and for finding out whether a model is good enough before
        committing infrastructure.
      </p>
      <p>
        <b>Serving engines</b> such as vLLM are built for concurrency. They batch requests, manage memory across
        many simultaneous sequences, and reach throughput that workstation runtimes do not attempt. This is what you
        deploy when a model has to serve real traffic, and it is a meaningfully different operational commitment.
      </p>
      <p>
        <b>Hosted open weights</b> means someone else runs the serving engine and sells inference. You keep the
        ability to move, since the weights are downloadable and other providers offer the same model, and you avoid
        operating accelerators. For most teams this is the sensible middle position, and it is frequently overlooked
        because the conversation tends to be framed as local versus proprietary.
      </p>

      <h2 id="when-worth-it">When open weights are the right call</h2>
      <ul>
        <li><b>Data that cannot leave.</b> Regulated records, material under legal hold, code with contractual restrictions. Here it is the only compliant option, not an optimization.</li>
        <li><b>Domain specialization.</b> Fine-tuning on a narrow domain can make a mid-sized model outperform a much larger general one for that domain. This requires weights you can modify.</li>
        <li><b>Reproducibility.</b> A pinned checkpoint behaves identically in two years. A hosted endpoint behind a stable name does not, which matters when a decision must be defensible after the fact.</li>
        <li><b>Longevity.</b> Hosted models get deprecated. Weights on your storage cannot be withdrawn.</li>
        <li><b>Steady high volume.</b> Beyond some sustained request rate, owning capacity is cheaper than renting it. The crossover is higher than most teams assume and it is real.</li>
        <li><b>Latency floors.</b> Local inference removes network round trips, which matters for high-frequency small calls inside an agent loop.</li>
      </ul>

      <h2 id="when-not">When they are not</h2>
      <p>
        The honest counter-case matters as much, because reaching for open weights reflexively produces systems that
        are principled and worse.
      </p>
      <p>
        Low or bursty volume leaves expensive capacity idle. Small teams without appetite for operating accelerators
        acquire a permanent operational burden. Work at the edge of what any model can do runs into the capability
        gap, which is still real for the hardest reasoning and long-context tasks even as it narrows. And rapid
        iteration is simply faster against a hosted endpoint, where trying a new model is a configuration change
        rather than a deployment.
      </p>
      <p>
        The architectural answer is not to choose globally. It is to make the choice per workload, which is exactly
        what a routing layer provides.
      </p>

      <h2 id="agentic-relevance">Where they fit in an agentic system</h2>
      <p>
        Agentic workloads have a shape that suits open weights unusually well in some places and poorly in others.
      </p>
      <h3>High-frequency small calls</h3>
      <p>
        Classification, routing, extraction, and formatting happen constantly in an agent loop. These are the calls
        where a small local model is fast, free, private, and entirely adequate. Sending them to a frontier endpoint
        is the most common source of unnecessary cost in agentic systems.
      </p>
      <h3>Bulk processing</h3>
      <p>
        Summarizing ten thousand documents is exactly the workload where owning capacity beats renting it, and where
        the quality bar is usually reachable by a mid-sized model.
      </p>
      <h3>Sensitive tool results</h3>
      <p>
        An agent that reads customer records or internal code produces context containing that material. If policy
        restricts where such content may go, the model handling those steps has to run inside the boundary,
        regardless of what handles the rest.
      </p>
      <h3>Planning and hard reasoning</h3>
      <p>
        This is where open weights are least likely to be the right choice today. Multi-step planning is where model
        quality shows most clearly and where a weaker model produces expensive mistakes rather than merely worse
        prose.
      </p>
      <h3>Development</h3>
      <p>
        A local model removes cost anxiety from iteration and forces prompts to stay portable, both of which improve
        the system even when production runs on something else.
      </p>

      <h2 id="evaluating">Evaluating one honestly</h2>
      <p>
        Public benchmarks narrow a shortlist and do not choose between finalists. Benchmark contamination is real,
        and general capability is a poor predictor of performance on a specific agentic workload.
      </p>
      <p>
        What works is a small evaluation set built from your own tasks, run against every candidate including the
        incumbent, scoring quality, cost, and latency together. For open weights specifically, add three checks that
        hosted models rarely need:
      </p>
      <ul>
        <li><b>Chat template correctness.</b> Verify against the model card. A wrong template is the most common cause of a model appearing much weaker than reported.</li>
        <li><b>Structured output reliability.</b> Test tool-call and schema adherence explicitly, since this varies more between open models than general capability does.</li>
        <li><b>Behavior at your real context lengths.</b> A model advertising a long context may degrade well before the limit, and agentic contexts are long.</li>
      </ul>

      <h2 id="fine-tuning">Adaptation and fine-tuning</h2>
      <p>
        The ability to modify a model is the capability that open weights uniquely provide, and it is both more
        accessible and less often necessary than the discussion around it suggests.
      </p>
      <p>
        Full fine-tuning updates every parameter and requires substantial hardware. Parameter-efficient methods, of
        which low-rank adaptation is the most common, train a small number of additional parameters while leaving the
        base model frozen. The resulting adapter is small enough to store cheaply and to swap at serving time, which
        makes it practical to maintain several task-specific adaptations of one base model.
      </p>
      <p>
        What fine-tuning is good at is teaching form: a house output format, a domain vocabulary, a consistent tone,
        a specific classification task where you have labelled examples. What it is poor at is teaching facts.
        Knowledge introduced by fine-tuning is unattributable, undated, and impossible to update without retraining,
        which are exactly the properties a grounded architecture is trying to avoid. Facts belong in retrieval, where
        they can be pointed at and corrected.
      </p>
      <p>
        Before reaching for it, the ordering that saves the most effort is: fix the context first, then the tools,
        then the prompt structure, then consider adaptation. Most problems people plan to fine-tune away turn out to
        be context assembly problems, and the diagnostic is cheap: if a stronger model handles the task correctly
        with the same context, the issue is capability and adaptation might help; if every model fails the same way,
        the context is wrong and no amount of training will fix it.
      </p>
      <p>
        When fine-tuning is warranted, evaluate on two axes rather than one. A model tuned narrowly will improve on
        the target task and can quietly lose general capability, which shows up later as brittleness on the edges of
        the workload rather than as an obvious regression.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Memory is not just weights.</b> Context consumes memory per concurrent request, and it grows with sequence length. Sizing on weight size alone leads to failures under concurrency.</li>
        <li><b>Benchmark numbers rarely reproduce.</b> Different quantization, template, and sampling settings produce different results from the same weights.</li>
        <li><b>Parameter count is not capability.</b> Training quality and data matter more than size, and comparisons across families on size alone are unreliable.</li>
        <li><b>Fine-tuning is easy to do badly.</b> A small dataset can degrade general capability while improving a narrow task. Evaluate on both.</li>
        <li><b>Model names are reused.</b> The same family name across releases can mean substantially different behavior. Pin versions.</li>
        <li><b>Distribution is a supply chain.</b> Weights come from a repository. Verify the source and prefer safetensors over pickle formats.</li>
      </ul>

      <h2 id="openness">How they score on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong, provided your integration goes through a routing abstraction rather than a provider-specific client.</li>
        <li><b>Inspectable.</b> Partial. You can examine the artifact and run experiments on it. You usually cannot inspect what produced it.</li>
        <li><b>Portable.</b> Strong. The files run anywhere you have hardware.</li>
        <li><b>Bounded.</b> Not applicable. A model has no authority model; boundaries are enforced by the harness.</li>
        <li><b>Grounded.</b> Indirect. Open weights do not improve grounding; supplied facts do.</li>
        <li><b>Auditable.</b> Strong for reproducibility. A pinned checkpoint plus recorded parameters means a past result can be re-derived.</li>
      </ul>

      <h2 id="not">What they are not</h2>
      <p>
        Open weights are not a privacy guarantee by themselves. Running a model locally keeps data local. It does
        nothing about what the surrounding tools send elsewhere, which is usually where leakage actually happens.
      </p>
      <p>
        Open weights are not free. Hardware, operations, and engineering time replace per-token pricing. Sometimes
        that trade is favorable and sometimes it is not, and it should be calculated rather than assumed.
      </p>
      <p>
        Open weights are not automatically safer or less safe. Guardrails vary by model and by deployment, and a
        model you run yourself is one you are responsible for configuring, which is a different position from a
        safer one.
      </p>
    </>
  );
}
