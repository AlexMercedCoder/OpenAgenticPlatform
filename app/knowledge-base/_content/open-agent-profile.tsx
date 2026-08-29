import type { Article } from './types';

export const article: Article = {
  slug: 'open-agent-profile',
  title: 'Open Agent Profile',
  kind: 'technology',
  layer: 'open-standards',
  kicker: 'OPEN STANDARDS / IDENTITY',
  summary: 'A specification for persisting a named agent as a file: its role, model, tools, permissions, and what previous sessions learned.',
  standfirst: 'A profile answers who an agent is and what it has learned, in a file rather than a running process. Its three safety rules are what make it more than a configuration format: a profile only narrows capability, an agent cannot rewrite its own contract, and learned state is treated as untrusted content.',
  keywords: ['Open Agent Profile', 'OAP', 'agent identity', 'portable agents', 'agent state', 'capability narrowing', 'agent governance'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'the-problem', label: 'The problem it solves' },
    { id: 'anatomy', label: 'What a profile contains' },
    { id: 'three-rules', label: 'The three rules that make it safe' },
    { id: 'state-and-writeback', label: 'State, deltas, and writeback' },
    { id: 'proposals', label: 'Proposals and human review' },
    { id: 'levels', label: 'Conformance levels' },
    { id: 'implementations', label: 'Implementations and encodings' },
    { id: 'relationship', label: 'How it relates to the other standards' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'adoption', label: 'Adopting it' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Open Agent Profile on GitHub', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'The specification, schemas, conformance suite, examples, and support libraries in several languages.' },
    { label: 'The normative specification', href: 'https://github.com/alexmerced-oss/open-agent-profile/blob/main/spec/v1/SPEC.md', note: 'The authoritative document, including the security model and conformance requirements.' },
    { label: 'Agent Skills', href: 'https://agentskills.io', note: 'The complementary standard covering what an agent knows how to do.' },
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'The complementary standard covering what an agent can reach.' },
    { label: 'Agentic Graph Specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'The companion specification describing the shape of a piece of work.' },
  ],
  related: ['open-standards', 'agent-skills', 'agentic-graph-specification'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        The Open Agent Profile is a specification for persisting a named AI agent as a file rather than as a running
        process. A profile describes an agent: its role and instructions, the model or capability tier it should use,
        its tool surface, its permissions, attached context, and what previous sessions learned.
      </p>
      <p>
        A harness reads the file to start a fresh session on demand, and writes an updated revision back when the
        session ends. Nothing needs to stay resident. The file is the agent.
      </p>
      <p>
        The specification is at version 1.0 with support libraries at 1.0.4, is Apache licensed, and ships support
        libraries in several languages along with a conformance test suite.
      </p>

      <h2 id="the-problem">The problem it solves</h2>
      <p>
        The problem is one anyone who has built a useful agent recognizes. You define a reviewer that knows your
        conventions, a researcher that cites the way you want, or a data engineer that has learned your table layout.
        Then the session ends.
      </p>
      <p>
        Today that definition either dies with the session or lives in a format only one harness reads. Neither
        outcome carries what the agent actually learned: the conventions it picked up, the preferences you corrected
        it on, the investigation it was halfway through.
      </p>
      <p>
        Keeping a process alive is the obvious fix and the wrong one. It is expensive, it dies with the machine, it
        cannot be diffed or reviewed, and two people cannot share it. Persisting the agent as data solves all four,
        and it introduces a set of safety problems that the specification exists to answer.
      </p>

      <h2 id="anatomy">What a profile contains</h2>
      <p>
        A profile has three top-level parts, and the separation between them is where the design work lives.
      </p>
      <p>
        <b>Metadata.</b> Name, description, and a revision number. The revision is what makes a profile something with
        a history rather than a current state.
      </p>
      <p>
        <b>Spec.</b> The contract. Role instructions and constraints, the model provider and identifier plus a
        portable capability tier as a fallback, the tool policy with an allowlist or denylist, and lifecycle
        settings including how writeback is handled. This is the part a human authors and approves.
      </p>
      <p>
        <b>State.</b> What previous sessions learned. A summary, discrete facts with confidence and provenance, and
        open threads with their status. This is the part sessions write.
      </p>
      <p>
        The model field is worth a note because it captures a portability problem neatly. It carries both a specific
        provider and identifier, which is what you want on the machine that has that provider configured, and a
        portable tier, which is what a different harness uses when the named model is unavailable. Naming a specific
        model is precise and not portable; naming only a tier is portable and imprecise. Carrying both lets each
        consumer take what it can use.
      </p>

      <h2 id="three-rules">The three rules that make it safe</h2>
      <p>
        A file describing what an agent may do is a security question, not a convenience. The specification&apos;s
        answer is three rules, and they are what separate this from a configuration format.
      </p>
      <h3>A profile narrows, never widens</h3>
      <p>
        A harness grants the intersection of what the profile requests and what its own policy already allows.
        Carrying a profile to a new machine can never grant capability the harness would not otherwise give. There is
        no field, flag, or trust marker that reverses this.
      </p>
      <p>
        Without this rule, a portable agent file would be an escalation mechanism: acquire a profile from somewhere,
        run it, and receive whatever it claims. With it, a profile is safe to accept from anyone, because the worst
        case is an agent with fewer capabilities than you already permit.
      </p>
      <h3>An agent cannot rewrite its own contract</h3>
      <p>
        Sessions emit a state delta, and delta operations may only touch the state section. A change to tools,
        permissions, model, or instructions cannot be applied by a session. It goes into a proposals block with a
        written rationale and waits for a human.
      </p>
      <p>
        This holds under every writeback setting, including fully automatic. That detail matters: a system where the
        boundary can be relaxed by configuration has no boundary, only a default.
      </p>
      <h3>Learned state is untrusted content</h3>
      <p>
        Text an agent wrote about itself is injected as information, never as authority. A state entry saying that
        the shell may now be used without asking changes nothing.
      </p>
      <p>
        This rule is the one that closes the most dangerous failure. Without it, a single successful prompt injection
        becomes permanent: an attacker convinces an agent once, the agent writes the instruction into its own state,
        and every future session starts already compromised. Treating state as content rather than as instruction
        makes a one-time injection stay one-time.
      </p>
      <div className="kb-callout">
        <b>Why these three together</b>
        <p>
          Each rule closes a hole the others leave. Narrowing stops a file from granting power. State-only writeback
          stops a session from granting itself power. Untrusted state stops persuasion from becoming policy. Any two
          without the third leaves a path.
        </p>
      </div>

      <h2 id="state-and-writeback">State, deltas, and writeback</h2>
      <p>
        The lifecycle is the mechanism that turns a static file into something that accumulates.
      </p>
      <p>
        A harness loads a profile and starts a session. The session runs. At the end it produces a delta: a
        structured description of what changed. Facts learned, threads opened or closed, the summary updated.
        Applying that delta produces a new revision of the profile.
      </p>
      <p>
        Writeback settings control how much human involvement that requires, ranging from proposing changes for
        approval to applying them automatically. What does not change across settings is which parts of the profile
        a delta may touch. Automatic writeback means state updates apply without review; it never means the contract
        can change without review.
      </p>
      <p>
        State entries carry more than text. Facts have confidence, a source, and can be pinned. That structure is
        what makes state maintainable rather than an ever-growing blob: a fact whose source was one uncertain
        observation can be treated differently from one repeatedly confirmed, and pinned facts survive summarization.
      </p>

      <h2 id="proposals">Proposals and human review</h2>
      <p>
        The proposals mechanism is the most interesting part of the design, because it turns a refusal into a
        conversation.
      </p>
      <p>
        When a session concludes it needs a capability it does not have, the naive options are both bad. Granting it
        means an agent expands its own authority. Silently dropping the request means the agent keeps failing at the
        same thing and nobody finds out why.
      </p>
      <p>
        A proposal is the third option. The request is recorded, with the specific change being asked for and a
        written rationale explaining what the agent could not do without it. A human reads that and decides.
      </p>
      <p>
        The rationale is what makes this work. A request to add shell access, accompanied by an explanation that the
        agent could not verify a flaky test claim without running the suite, is a reviewable engineering decision. A
        bare request to add shell access is not. The mechanism produces exactly the artifact a reviewer needs, at the
        moment the need is fresh.
      </p>
      <p>
        This is also the pattern that makes narrow permissions sustainable. The usual failure of least privilege is
        that legitimate work gets blocked, friction accumulates, and someone widens the grant to stop the
        complaints. A structured request with a documented reason turns that pressure into a decision with evidence,
        which is the only version of least privilege that survives contact with real work.
      </p>

      <h2 id="levels">Conformance levels</h2>
      <p>
        The specification defines three levels, which lets implementations be honest about partial support.
      </p>
      <ul>
        <li><b>Level 1, Read.</b> Discover, validate, and instantiate an agent from a profile.</li>
        <li><b>Level 2, Read and Write.</b> Level 1 plus state injection, delta generation, and persistence.</li>
        <li><b>Level 3, Full.</b> Level 2 plus composition, MCP, skills, external memory, and delegation.</li>
      </ul>
      <p>
        The accompanying requirement matters as much as the levels: an implementation must publish what it does not
        implement. The specification&apos;s own justification is worth quoting in substance, because it names the
        failure precisely. Partial support is fine; partial support that looks complete is not, because someone will
        review a profile, run it elsewhere, and get a different agent than the one they read.
      </p>
      <p>
        That is the same principle the Merced AI article describes as honest projection reporting, expressed as a
        conformance requirement. Silent degradation is the failure mode that destroys trust in portable formats, and
        the only defense is making implementations declare their gaps.
      </p>

      <h2 id="implementations">Implementations and encodings</h2>
      <p>
        A specification is only as real as its second implementation, so the state of tooling is part of the
        evaluation rather than a footnote.
      </p>
      <p>
        The repository ships a reference validator and applicator, plus support libraries for Python, TypeScript,
        Go, Rust, and Java, each covering the same surface: validation, canonical digests, inheritance, policy
        narrowing, prompt rendering, and delta application. A shared conformance corpus is used across languages,
        including negative fixtures that a correct implementation must reject.
      </p>
      <p>
        Cross-language conformance testing against a shared corpus is the detail worth noticing. It is the difference
        between five libraries that each interpret the specification plausibly and five libraries that demonstrably
        agree. Negative fixtures matter for the same reason: a specification is defined as much by what it rejects as
        by what it accepts, and an implementation that accepts an invalid profile will produce an agent nobody
        reviewed.
      </p>
      <p>
        Canonical digests deserve a note of their own. Because a profile can be written in more than one encoding and
        with fields in any order, comparing two profiles textually is unreliable. A canonical digest gives a stable
        identifier for the content regardless of formatting, which is what makes it possible to say that the profile
        running in production is exactly the one that was approved.
      </p>
      <p>
        On adoption, the specification lists known implementations, and the honest reading is that it is a young
        standard with a small number of them. That is a real limitation and it should be weighed against the
        alternative, which is not a mature portable format but no portable format at all. The risk of adopting a
        young specification for your own agent definitions is also unusually low, since the artifact is declarative
        text describing your agents. If the specification does not become the dominant one, translating those files
        is a small exercise compared with reconstructing the definitions from a product&apos;s configuration.
      </p>

      <h2 id="relationship">How it relates to the other standards</h2>
      <p>
        The specification states the division cleanly, and it is the clearest articulation of the standards layer
        available.
      </p>
      <ul>
        <li><b>Skills</b> are what an agent knows how to do.</li>
        <li><b>MCP</b> is what it can reach.</li>
        <li><b>Harness configuration</b> is what it is allowed to do.</li>
        <li><b>A profile</b> is who it is, and what it has learned.</li>
      </ul>
      <p>
        None of these substitutes for another. An agent needs all four, and before profiles existed the fourth was
        either absent or trapped inside a product. Identity and accumulated learning were the parts with no portable
        home.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        Profiles matter for three reasons that map onto three different audiences.
      </p>
      <p>
        <b>For a builder,</b> a useful agent becomes a file you can copy, share, and keep. The reviewer that knows
        your conventions moves between machines and between colleagues instead of being rebuilt.
      </p>
      <p>
        <b>For an organization,</b> authority becomes reviewable. What an agent may do is a document that can be read
        by someone in compliance, diffed when it changes, and required to pass review before deployment. Authority
        scattered through code and prompts cannot be audited because there is nothing to look at.
      </p>
      <p>
        <b>For the architecture,</b> it is what makes the harness genuinely replaceable. A broker can project one
        profile onto several harnesses precisely because there is a portable description of what an agent is.
        Without it, brokering would mean translating between every pair of harness configuration formats.
      </p>

      <h2 id="adoption">Adopting it</h2>
      <p>
        The useful starting point is not converting everything. It is writing one profile for the agent with the most
        capability, because that is the one where the exercise reveals the most.
      </p>
      <ol>
        <li><b>Pick the agent with the broadest permissions.</b> Writing down what it may do usually surfaces at least one grant nobody would defend.</li>
        <li><b>Express the contract, not the current behavior.</b> What it should be permitted, rather than what it happens to be able to reach.</li>
        <li><b>Validate it.</b> The reference tooling checks the schema and produces a stable digest, which is what makes a profile citable in a review.</li>
        <li><b>Turn on state with proposal-based writeback.</b> Let sessions accumulate learning while capability changes wait for review.</li>
        <li><b>Read the proposals.</b> They are the most direct feedback available about where your permission model is wrong.</li>
        <li><b>Put profiles in version control.</b> History, review, and rollback come along for free.</li>
        <li><b>Use the bundled skills where native support is missing.</b> The repository ships Agent Skills packages that let harnesses without native support load a profile and produce a reviewable delta.</li>
      </ol>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Check the conformance level of your harness.</b> Level 1 support means state does not persist, which changes what the profile is for.</li>
        <li><b>State needs curation.</b> Accumulated facts go stale. Confidence and provenance fields exist to support pruning, and someone has to do it.</li>
        <li><b>State is data an agent wrote.</b> Review it when a profile moves between environments, particularly one that has been running unattended.</li>
        <li><b>Narrowing means a profile can quietly do less elsewhere.</b> That is the safe direction and it can surprise you. The projection report from a broker is how you find out.</li>
        <li><b>Digests matter for review.</b> Approving a profile means approving specific content. A digest is what ties the approval to what was actually read.</li>
        <li><b>Do not put secrets in a profile.</b> It is a file meant to be shared, versioned, and copied. Credentials belong in a vault the harness references.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Apache licensed, with a published specification, schemas, and independent support libraries in several languages.</li>
        <li><b>Inspectable.</b> Very strong. A profile is readable YAML or JSON that a non-programmer can review.</li>
        <li><b>Portable.</b> Very strong, and this is the specification&apos;s purpose. The conformance-level requirement exists to keep portability honest.</li>
        <li><b>Bounded.</b> Very strong. The narrowing rule and the state-only writeback rule are both structural boundaries rather than conventions.</li>
        <li><b>Grounded.</b> Partial. State carries provenance and confidence, which is grounding applied to what the agent believes about itself.</li>
        <li><b>Auditable.</b> Very strong. Revisions, digests, and proposal records together produce a history of what an agent was permitted and how that changed.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        A profile is not an enforcement mechanism. It expresses a contract; the harness enforces it. A harness that
        ignores a tool denylist makes the profile a description rather than a control, which is why conformance
        statements matter.
      </p>
      <p>
        A profile is not a memory system. State captures what a session learned about the agent&apos;s own work. It
        is not a substitute for a knowledge store, and putting large amounts of domain knowledge into profile state
        is using the wrong container.
      </p>
      <p>
        A profile is not a skill. It says who the agent is, not how to perform a procedure. Both are needed, and
        conflating them produces profiles that grow into unmaintainable instruction documents.
      </p>
    </>
  );
}
