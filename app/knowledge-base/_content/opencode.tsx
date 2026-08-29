import type { Article } from './types';

export const article: Article = {
  slug: 'opencode',
  title: 'OpenCode',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / CODING HARNESS',
  summary: 'An open source coding agent that runs in the terminal, an IDE, or a desktop app, and works against a very wide range of model providers.',
  standfirst: 'OpenCode is a harness rather than a model. It reads a codebase, edits files, runs commands, and keeps the model choice open, which makes it a useful reference for what a provider-agnostic coding agent looks like in practice.',
  keywords: ['OpenCode', 'coding agent', 'terminal agent', 'provider agnostic', 'LSP integration', 'agent harness', 'open source AI coding'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'harness-not-model', label: 'A harness, not a model' },
    { id: 'provider-agnostic', label: 'Provider agnosticism as a design stance' },
    { id: 'lsp', label: 'Language servers as tools' },
    { id: 'surfaces', label: 'Terminal, IDE, and desktop' },
    { id: 'parallel', label: 'Parallel sessions' },
    { id: 'skills', label: 'Skills and portable capability' },
    { id: 'coding-agents-generally', label: 'What coding agents actually do' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'evaluating', label: 'Evaluating a coding harness' },
    { id: 'working-with', label: 'Working with a coding agent well' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'OpenCode', href: 'https://opencode.ai', note: 'The project site, with installation, configuration, and feature documentation.' },
    { label: 'OpenCode on GitHub', href: 'https://github.com/sst/opencode', note: 'Source, issues, and the place to read how the agent loop is actually implemented.' },
    { label: 'OpenCode skills documentation', href: 'https://opencode.ai/docs/skills/', note: 'How the harness loads Agent Skills, which is what makes capability portable across tools.' },
    { label: 'Models.dev', href: 'https://models.dev', note: 'The open model index OpenCode uses to reach many providers.' },
    { label: 'Language Server Protocol', href: 'https://microsoft.github.io/language-server-protocol/', note: 'Background on the protocol that gives a coding agent real symbol knowledge.' },
  ],
  related: ['harnesses-and-brokers', 'agent-skills', 'pi'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        OpenCode is an open source coding agent. It runs in a terminal, in an IDE, or as a desktop application, and
        it works on a codebase the way a developer does: reading files, searching, editing, running commands, and
        checking the result.
      </p>
      <p>
        The characteristic that makes it relevant to this reference is provider agnosticism. It is built to work
        against a large range of model providers rather than being tied to one, including local models. The model is
        a configuration choice rather than a property of the tool.
      </p>
      <p>
        It appears here as an example of a harness in the execution layer, and as a readable one. Because it is open
        source, it is a practical way to see how the responsibilities described in the harness layer article are
        actually implemented.
      </p>

      <h2 id="harness-not-model">A harness, not a model</h2>
      <p>
        This distinction is worth restating in the specific context of coding agents, because it is where the
        conflation is most common.
      </p>
      <p>
        The model contributes judgment: what change to make, which file probably contains the bug, how to phrase the
        fix. Everything else is the harness. Deciding which files to show the model and in what order. Executing the
        edit and reporting whether it applied. Running the test suite and interpreting the output. Noticing that the
        same failing command has now been attempted three times. Stopping.
      </p>
      <p>
        Most of what makes one coding agent feel better than another with the same model underneath is harness work.
        Context selection in particular dominates: a harness that shows the model the three relevant files performs
        far better than one that shows it thirty, regardless of model strength. This is why comparing coding agents
        by which model they use misses most of the variance.
      </p>

      <h2 id="provider-agnostic">Provider agnosticism as a design stance</h2>
      <p>
        Supporting many providers is a design decision with consequences beyond convenience, and OpenCode makes a
        useful case study of both the benefits and the costs.
      </p>
      <p>
        The benefits are the ones the models layer describes. The model becomes a per-task decision. A team can use
        a frontier model for hard refactoring and a cheaper one for routine edits. Work covered by data restrictions
        can run against a local endpoint without changing tools. When a provider has an incident, work continues
        somewhere else.
      </p>
      <p>
        The cost is that a provider-agnostic harness has to work against the intersection of what providers offer,
        or maintain per-provider handling for the differences. Tool calling, structured output, streaming behavior,
        and context handling all vary. A harness tied to one provider can exploit that provider&apos;s specific
        capabilities immediately; a portable one has to decide whether to wait, abstract, or special-case.
      </p>
      <p>
        For an architecture that values replaceability, that cost is usually worth paying. It is still a cost, and
        recognizing it explains why some harnesses that are excellent on one provider feel weaker on another.
      </p>

      <h2 id="lsp">Language servers as tools</h2>
      <p>
        One design detail worth drawing out is the use of language servers, because it illustrates a general
        principle about tool design that applies well beyond coding.
      </p>
      <p>
        A naive coding agent works with text. It greps for a symbol name, reads what it finds, and reasons about
        matches. This works and produces a characteristic set of errors: renaming something and missing a usage,
        confusing two identically named symbols in different scopes, or failing to notice a type mismatch.
      </p>
      <p>
        A language server already knows the answers. It has parsed the project and can say where a symbol is defined,
        every place it is referenced, what its type is, and what errors currently exist. Wiring that into the agent
        as a tool replaces inference with lookup.
      </p>
      <p>
        The general lesson is the one the harness layer states about tool design: a specific tool that answers a
        question directly beats a general tool the model must reason its way through. Find every reference to this
        symbol is a better tool than search the codebase for this string, and the difference is not marginal.
      </p>

      <h2 id="surfaces">Terminal, IDE, and desktop</h2>
      <p>
        Offering several interfaces to one agent is a product decision that carries an architectural implication
        worth noting.
      </p>
      <p>
        The terminal suits developers already working there, integrates with existing tooling, and works over an SSH
        connection to a remote machine. The IDE extension puts the agent where the code is being read, which shortens
        the loop between suggestion and review. The desktop application suits longer-running work and users who do
        not live in a terminal.
      </p>
      <p>
        What matters architecturally is that these are interfaces onto the same agent rather than three separate
        agents. The context, the tools, and the session are shared. When they are not, the same work has to be
        described three times, and the three drift.
      </p>
      <p>
        This is the same argument the standards layer makes about portable definitions, applied within a single
        product rather than across products. Capability defined once and surfaced several ways stays consistent;
        capability defined per surface does not.
      </p>

      <h2 id="parallel">Parallel sessions</h2>
      <p>
        Running several agent sessions against one project at the same time is a capability that sounds like a
        convenience and turns out to change how the tool is used.
      </p>
      <p>
        The reason is that agent work has natural waiting periods. A test suite runs for three minutes. A build takes
        two. During that time a developer either watches or switches to something else, and switching is only
        practical if the other thing has its own isolated state.
      </p>
      <p>
        The requirement this imposes is isolation. Two sessions editing the same working tree conflict in ways that
        are hard to diagnose, because neither is aware of the other. Workable implementations give each session its
        own workspace, commonly through separate checkouts or worktrees, so that parallel work is genuinely parallel
        rather than interleaved corruption.
      </p>
      <p>
        This is worth understanding as a general property of the execution layer rather than a feature of one tool.
        Any harness that supports concurrent work needs an answer to what is shared and what is isolated, and the
        answer determines whether concurrency is useful or dangerous.
      </p>

      <h2 id="skills">Skills and portable capability</h2>
      <p>
        OpenCode supports Agent Skills, which is worth calling out because it is the clearest example in this layer
        of the standards argument working in practice.
      </p>
      <p>
        A skill is a folder containing instructions and supporting files, loaded on demand when a task matches its
        description. In a coding context these tend to be procedures rather than knowledge: how this organization
        writes migrations, what the release checklist is, how to investigate a particular class of failure, which
        conventions apply to a particular service.
      </p>
      <p>
        The reason this matters more than it might appear is that these procedures are exactly the material that
        otherwise lives in a system prompt, in a wiki page nobody reads, or in the head of the person who wrote the
        service. In a prompt it competes for context with the task. In a wiki it is invisible to the agent. In
        someone&apos;s head it is unavailable at three in the afternoon on a Friday.
      </p>
      <p>
        Because the skill format is supported by a growing set of harnesses rather than by one, a procedure written
        once is usable by whichever tool a given developer prefers. That is the practical payoff of an open
        capability format: the organization&apos;s way of working becomes an artifact it owns rather than
        configuration inside a product. A team that has written twenty good skills has built something that survives
        changing its tooling, which is not true of twenty carefully tuned system prompts.
      </p>

      <h2 id="coding-agents-generally">What coding agents actually do</h2>
      <p>
        Stripping away the interface, a coding agent runs a loop that is recognizably the one described in the
        harness layer, with a specific set of tools.
      </p>
      <ol>
        <li><b>Understand the request.</b> Which is often underspecified, and where asking a clarifying question is frequently better than guessing.</li>
        <li><b>Locate the relevant code.</b> Through search, symbol lookup, and reading. This step determines most of the outcome, and it is where language server integration pays.</li>
        <li><b>Assemble context.</b> Show the model enough to make the change and not so much that the relevant part is diluted.</li>
        <li><b>Propose an edit.</b> As a structured change rather than as prose describing one.</li>
        <li><b>Apply and verify.</b> Run tests, run a build, check types. This is the step that separates a coding agent from a suggestion engine.</li>
        <li><b>Interpret failure.</b> Read the error, decide whether it is a problem with the change or with the test, and try again with a bounded number of attempts.</li>
        <li><b>Stop.</b> When it works, when it clearly is not working, or when a person is needed.</li>
      </ol>
      <p>
        Steps five and six are where the value concentrates. An agent that writes plausible code without running it
        has done the easy part. An agent that runs the tests, reads the failure, and corrects itself twice before
        stopping has done work a person can review rather than redo.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        Coding is the workload where agentic systems became genuinely useful first, which makes coding harnesses the
        most mature part of the execution layer and a reasonable place to learn from.
      </p>
      <p>
        In the four-layer model, a coding harness sits squarely in the execution layer. It consumes models from the
        layer below, ideally through a routing abstraction. It reaches external systems through tool connections,
        increasingly over the Model Context Protocol. It loads capability from portable skill folders. Its data
        access, where it needs any, goes through the same governed paths as anything else.
      </p>
      <p>
        A team is likely to run more than one harness, and coding is usually the first. That is fine, and the
        thing to protect is that the definitions do not become harness-specific. Skills, tool connections, and agent
        identity expressed in portable forms mean adding a second harness costs configuration rather than
        duplication.
      </p>

      <h2 id="evaluating">Evaluating a coding harness</h2>
      <p>
        Benchmarks for coding agents measure the model more than the harness. A more useful evaluation looks at
        properties the harness controls.
      </p>
      <ul>
        <li><b>Context selection.</b> Does it find the right files, or does it read broadly and dilute? Watch a real task and see.</li>
        <li><b>Verification.</b> Does it run tests and act on failures, or does it declare success based on the model saying so?</li>
        <li><b>Edit reliability.</b> Do proposed changes apply cleanly, and what happens when they do not?</li>
        <li><b>Stopping behavior.</b> Does it recognize when it is stuck, or does it retry the same failing approach?</li>
        <li><b>Transparency.</b> Can you see the actual prompt, the tool calls, and the reasoning path without adding instrumentation?</li>
        <li><b>Permission model.</b> What can it do without asking, and is that enforced in code or requested in a prompt?</li>
        <li><b>Portability of configuration.</b> Would your skills, tool connections, and conventions move to another harness?</li>
      </ul>

      <h2 id="working-with">Working with a coding agent well</h2>
      <p>
        The difference between teams that get value from coding agents and teams that conclude they are overrated is
        usually not the tool. It is a handful of practices around it.
      </p>
      <h3>Scope the task, not the solution</h3>
      <p>
        Describing the outcome and the constraints works better than prescribing an implementation, because the agent
        can see the codebase and you are describing it from memory. Where the approach genuinely matters, say so
        explicitly rather than implying it.
      </p>
      <h3>Make verification available</h3>
      <p>
        An agent that can run the test suite behaves very differently from one that cannot, because it can tell
        whether it succeeded. A project where tests are slow, flaky, or hard to run locally limits agent usefulness
        far more than model choice does. Investment in test speed pays twice.
      </p>
      <h3>Commit in small pieces</h3>
      <p>
        Reviewing a hundred-line change is straightforward. Reviewing an eight-hundred-line change produced in one
        session is not, and the review is where correctness is actually established. Frequent commits also give a
        clean revert point when a direction turns out to be wrong.
      </p>
      <h3>Read the trace when something goes wrong</h3>
      <p>
        Most bad outcomes trace to a step much earlier than the visible mistake: a search that returned nothing,
        interpreted as no such code exists. Fixing the final step does nothing. The trace shows where the reasoning
        actually diverged.
      </p>
      <h3>Write down what the agent should know</h3>
      <p>
        Conventions, architectural boundaries, and things that look wrong but are deliberate all belong in a file the
        agent reads rather than in a correction repeated every session. This is the same instinct as documentation,
        with a consumer that actually reads it.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Shell access is the real permission question.</b> A coding agent that can run commands can do anything the user can. Containment through a container or a sandbox is a deliberate decision, not a default.</li>
        <li><b>Repository content is untrusted input.</b> Issue text, dependency documentation, and code comments can contain instructions aimed at the agent. Treat everything read as data.</li>
        <li><b>Large repositories stress context selection.</b> Performance degrades in a codebase far larger than the harness was tuned against, and it degrades quietly.</li>
        <li><b>Model differences show up as harness bugs.</b> Behavior that works on one provider and fails on another is often a tool-calling difference rather than a capability difference.</li>
        <li><b>Autonomy without review scales the wrong thing.</b> A fast agent producing changes nobody reads moves work to the reviewer, who is now the bottleneck.</li>
        <li><b>Git hygiene matters more.</b> Frequent small commits make agent work reviewable and revertible. Long uncommitted sessions do not.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong on models, and moderate on the harness itself, which depends on whether your skills and tool connections are in portable formats.</li>
        <li><b>Inspectable.</b> Strong. Open source, so the loop, the prompts, and the tool definitions can be read directly.</li>
        <li><b>Portable.</b> Good where capability is expressed as skills and tool connections rather than as product configuration.</li>
        <li><b>Bounded.</b> Depends on deployment. Permission behavior and containment are configuration decisions, and shell access is the one that matters most.</li>
        <li><b>Grounded.</b> Strong for code, since language servers and the repository provide real facts rather than recalled ones.</li>
        <li><b>Auditable.</b> Good, particularly when work lands as commits, which are a durable record of exactly what changed.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        OpenCode is not a model, and its output quality depends heavily on which model it is configured with.
      </p>
      <p>
        It is not a broker. It runs one agent loop. Deciding which of several harnesses should handle a piece of work
        is a different job, handled by a different component.
      </p>
      <p>
        It is not a replacement for review. An agent that changes code produces changes someone is accountable for.
        The useful framing is that it changes what review costs, not whether review happens.
      </p>
    </>
  );
}
