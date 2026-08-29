import type { Article } from './types';

export const article: Article = {
  slug: 'hermes-agent',
  title: 'Hermes Agent',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / PERSONAL AGENT',
  summary: 'An open source, model-agnostic personal agent from Nous Research that runs across a terminal, a desktop app, and messaging platforms, and learns across sessions.',
  standfirst: 'Hermes Agent is a personal agent rather than a coding assistant. It drives a real terminal and browser, lives where you already communicate, and is built around continuity: what it learns in one session is available in the next.',
  keywords: ['Hermes Agent', 'Nous Research', 'personal AI agent', 'model agnostic', 'agent memory', 'browser automation', 'messaging agent'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'personal-vs-coding', label: 'Personal agents are a different problem' },
    { id: 'continuity', label: 'Learning across sessions' },
    { id: 'surfaces', label: 'Where it lives' },
    { id: 'terminal-and-browser', label: 'Driving a real terminal and browser' },
    { id: 'model-agnostic', label: 'Model agnosticism in a personal agent' },
    { id: 'skills', label: 'Skills and capability' },
    { id: 'always-on', label: 'What always-on changes' },
    { id: 'trust', label: 'The trust question' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'when-to-choose', label: 'When it fits' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Hermes Agent', href: 'https://hermes-agent.nousresearch.com/', note: 'The project site, with documentation covering setup, features, and skills.' },
    { label: 'Hermes Agent on GitHub', href: 'https://github.com/NousResearch/hermes-agent', note: 'Source and issues, and the place to see how the agent loop is implemented.' },
    { label: 'Nous Research', href: 'https://nousresearch.com', note: 'The organization behind Hermes models and this agent.' },
    { label: 'Nous Portal', href: 'https://portal.nousresearch.com', note: 'The commercial platform providing models, tools, and hosting for agents including this one.' },
    { label: 'Agent Skills', href: 'https://agentskills.io', note: 'The portable capability format Hermes Agent supports.' },
  ],
  related: ['harnesses-and-brokers', 'nous-portal', 'agent-skills'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Hermes Agent is an open source personal AI agent from Nous Research. It runs as a command line tool, a
        desktop application, and through messaging platforms, is model-agnostic rather than tied to one provider,
        learns across sessions, and drives a real terminal and a real browser.
      </p>
      <p>
        The category matters. Most agent harnesses in wide use are coding agents, which is a specific problem with
        specific affordances: a repository, tests, a compiler, and a clear notion of whether a change worked. A
        personal agent has none of that structure and a much wider surface, which makes it a harder design problem in
        several respects.
      </p>

      <h2 id="personal-vs-coding">Personal agents are a different problem</h2>
      <p>
        The differences are worth enumerating, because they explain design decisions that look strange if you assume
        a coding agent.
      </p>
      <h3>There is no test suite</h3>
      <p>
        A coding agent can check its own work by running tests. A personal agent researching a topic, drafting a
        message, or booking something has no automatic verification. Correctness is a matter of judgment, which
        pushes far more weight onto the approval and review mechanisms.
      </p>
      <h3>The domain is unbounded</h3>
      <p>
        A coding agent works in a repository. A personal agent works across email, calendars, documents, the web,
        local files, and whatever else you connect. Tool selection quality degrades as the surface grows, which makes
        scoping tools per task more important rather than less.
      </p>
      <h3>Actions are frequently irreversible</h3>
      <p>
        A bad code change is reverted with a command. A message sent to the wrong person is not. This shifts the
        default from act-and-check toward propose-and-confirm for anything that leaves the machine.
      </p>
      <h3>Context is personal and long-lived</h3>
      <p>
        A coding agent can re-derive most of what it needs from the repository. A personal agent&apos;s useful context
        is preferences, relationships, ongoing situations, and history, none of which can be re-derived. This is why
        continuity is the organizing concern rather than a feature.
      </p>

      <h2 id="continuity">Learning across sessions</h2>
      <p>
        The claim that an agent learns across sessions covers several distinct capabilities, and separating them
        clarifies what is actually hard.
      </p>
      <p>
        <b>Recalling facts.</b> Preferences, names, recurring details. The easiest form, and the one most systems
        implement.
      </p>
      <p>
        <b>Recalling conclusions.</b> Not what was said but what was decided, and why. Much more useful and harder,
        because it requires distinguishing a conclusion from the conversation that produced it.
      </p>
      <p>
        <b>Recalling corrections.</b> The things you told it to stop doing. This is where continuity is most
        noticeable in daily use, because an agent that repeats a corrected behavior is worse than one that never
        knew.
      </p>
      <p>
        <b>Resuming work.</b> Picking up a task that was left half-finished, with the reasoning intact rather than
        restarting.
      </p>
      <p>
        The design tension throughout is what to keep. Storing everything produces a memory full of noise, and noise
        degrades every retrieval, so the agent gets worse as it accumulates. Storing too little means the promise is
        not delivered. The harness layer&apos;s recommendation applies: writing to long-term memory should require a
        reason, and what is written should be reviewable and correctable by the person it is about.
      </p>

      <h2 id="surfaces">Where it lives</h2>
      <p>
        Hermes Agent runs in a terminal, in a desktop application, and through messaging platforms. The messaging
        surface is the one that changes the character of the tool.
      </p>
      <p>
        An agent reachable in the chat application you already use is available at the moment you think of something,
        rather than requiring you to switch to it. For a personal agent that difference determines whether it is used
        at all: the value of a task assistant collapses if using it is itself a task.
      </p>
      <p>
        The corresponding cost is the one the perimeter argument describes. A messaging surface means requests arrive
        from a platform rather than from a keyboard, potentially from a channel with several people in it. The
        questions of who may send it work, under whose authority that work runs, and what requires confirmation move
        from implicit to load-bearing. Any deployment on a shared channel should have explicit answers.
      </p>

      <h2 id="terminal-and-browser">Driving a real terminal and browser</h2>
      <p>
        Hermes Agent drives an actual terminal and an actual browser rather than only calling APIs. This is a
        significant capability decision with a clear tradeoff.
      </p>
      <p>
        The benefit is coverage. Most of what a person does on a computer has no API. Sites without one, internal
        tools, forms, and applications that assume a human at a keyboard are all reachable by an agent that can drive
        a browser and are not reachable otherwise. An agent restricted to well-designed APIs is restricted to a small
        slice of actual work.
      </p>
      <p>
        The cost is that both are broad, general capabilities of exactly the kind that makes bounding difficult. A
        terminal can run anything the user can. A browser session carries logged-in credentials for everything the
        browser is signed into. Neither is a narrow tool with a constrained argument surface, which is the shape
        that makes tool-level enforcement straightforward.
      </p>
      <p>
        There is also an injection dimension worth naming. A browser reads web pages, and web pages can contain text
        addressed to an agent. Content retrieved from a page is data, never instruction, and a system that blurs
        that line is exploitable by anyone who can publish. The same applies to command output. This is a general
        property of the execution layer, and browser automation is where it is most exposed.
      </p>

      <h2 id="model-agnostic">Model agnosticism in a personal agent</h2>
      <p>
        Hermes Agent is model-agnostic, which is worth examining specifically for personal use because the
        motivations differ from the enterprise case.
      </p>
      <p>
        The privacy motivation is stronger here. A personal agent&apos;s context is personal: messages, documents,
        calendars, and the accumulated memory of your situation. Being able to point some or all of that at a local
        model is a materially different privacy posture from having no choice.
      </p>
      <p>
        The cost motivation is also stronger. A personal agent running continuously, checking things on a schedule
        and maintaining background work, generates steady usage that is not tied to a business justification. Routing
        routine steps to a cheap or free model is what makes always-on affordable for an individual.
      </p>
      <p>
        The connection to Nous Research&apos;s own open-weight models is relevant here. An agent from an organization
        that publishes downloadable weights can be run end to end on artifacts you possess, which is a coherent
        position rather than a marketing one. It is equally able to use frontier hosted models where those are the
        better choice, and both should be true at once in a well-built system.
      </p>

      <h2 id="skills">Skills and capability</h2>
      <p>
        Hermes Agent supports Agent Skills, the portable folder format for packaging procedural knowledge.
      </p>
      <p>
        For a personal agent this format fits unusually well, because personal workflows are idiosyncratic. How you
        want a weekly review structured, what your travel preferences are, how to handle a particular recurring
        situation, what your writing conventions are. None of this belongs in a product, and all of it is exactly
        what a skill expresses.
      </p>
      <p>
        The portability benefit is real for individuals too, not only organizations. Skills written for a personal
        agent are usable by the coding agent, and by whatever replaces either in two years. The alternative is a set
        of carefully tuned system prompts that die with the tool.
      </p>

      <h2 id="always-on">What always-on changes</h2>
      <p>
        An agent that works while you sleep is a genuinely different product from one that answers when asked, and
        the differences are mostly in what has to be true for it to be safe rather than in what it can do.
      </p>
      <h3>Nobody is watching the wrong turn</h3>
      <p>
        In an interactive session, a person notices when an agent starts down a bad path and stops it. Background
        work has no such observer. This makes bounded steps, bounded spend, and repeated-failure detection
        mandatory rather than advisable, because the alternative to a limit is discovery hours later.
      </p>
      <h3>Errors compound quietly</h3>
      <p>
        A misunderstanding in an interactive session produces one wrong answer. The same misunderstanding in a
        scheduled task produces the same wrong answer every day until someone notices, and by then it may be
        recorded in memory as an established fact. Background work benefits disproportionately from writing results
        somewhere reviewable rather than acting on them directly.
      </p>
      <h3>Interruption becomes a feature</h3>
      <p>
        Long-running work needs to be inspectable and stoppable mid-flight. Being able to see what an agent is
        currently doing, and cancel it without losing everything it has done, is the difference between comfortable
        delegation and reluctance to start anything long.
      </p>
      <h3>Notification design matters more than it should</h3>
      <p>
        An always-on agent that reports nothing is opaque. One that reports everything becomes noise people learn to
        ignore, which is worse, because the one report that mattered is now invisible. The useful default is to
        surface completions, decisions that needed judgment, and anything blocked, and to keep routine progress
        available on request rather than pushed.
      </p>
      <p>
        None of these are specific to one agent. They are what changes when a harness stops being a session and
        starts being a process, and they are the reason continuous operation is a harder engineering problem than
        the feature description suggests.
      </p>

      <h2 id="trust">The trust question</h2>
      <p>
        A personal agent that reads your messages, drives your browser, and remembers your situation is a
        concentration of access that deserves explicit thought rather than a shrug.
      </p>
      <p>
        Four questions are worth answering before deployment, and they apply to any personal agent rather than to
        this one specifically.
      </p>
      <ul>
        <li><b>Where does memory live.</b> On your machine, in a hosted store, or both. This is the most personal data the system holds and the hardest to remove once distributed.</li>
        <li><b>Where do credentials live.</b> An agent acting on your behalf holds tokens for the systems it acts on. Local execution and hosted execution have very different answers.</li>
        <li><b>What can it do without asking.</b> The answer should be a short list you could recite, and it should be enforced in code rather than requested in a prompt.</li>
        <li><b>What does it send where.</b> Model calls carry context, and context includes whatever it just read. The model choice determines where personal content goes.</li>
      </ul>
      <p>
        The reason to prefer open source for this role is not ideological. It is that these questions have checkable
        answers when you can read the code, and unverifiable ones when you cannot.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        Hermes Agent occupies the execution layer as a personal-productivity harness rather than a coding one, which
        makes it a useful counterweight in this reference.
      </p>
      <p>
        It demonstrates that the harness layer&apos;s responsibilities are the same regardless of domain. Context
        assembly, tool execution, authority, state, limits, recording, and termination all apply to a personal agent,
        and several of them are harder there because verification is weaker and actions are less reversible.
      </p>
      <p>
        It also illustrates the ecosystem shape described in the Nous Portal article: open artifacts with a
        commercial platform available alongside. The agent is open source and self-hostable. The models are open
        weights. The platform is a service you may use. Knowing which is which is the distinction the openness test
        exists to draw.
      </p>

      <h2 id="when-to-choose">When it fits</h2>
      <ul>
        <li><b>Personal productivity rather than coding.</b> Where the work is research, drafting, scheduling, and following up rather than editing a repository.</li>
        <li><b>Continuous rather than session-based use.</b> Where an agent that keeps working between conversations is the point.</li>
        <li><b>Work that needs a browser.</b> Where the systems involved have no usable API.</li>
        <li><b>Privacy-sensitive personal context.</b> Where model agnosticism and self-hosting matter for content you would not send to a third party.</li>
        <li><b>Preference for open source in a high-trust role.</b> Where being able to read what the agent does is part of the decision.</li>
      </ul>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Broad capability needs deliberate bounding.</b> Terminal and browser access are powerful and general. Decide what requires confirmation before deploying rather than after.</li>
        <li><b>Web content is untrusted input.</b> Pages an agent reads can contain instructions aimed at it. This is the primary injection surface for a browser-capable agent.</li>
        <li><b>Memory accumulates whatever it saw.</b> Including things you would not have chosen to store. Review it periodically and be able to correct it.</li>
        <li><b>Messaging surfaces widen who can ask.</b> A shared channel means the authority model needs an explicit answer, not a default.</li>
        <li><b>Continuous operation means continuous cost.</b> An always-on agent spends while you are not watching. Budgets and alerts are worth setting up early.</li>
        <li><b>Browser sessions carry your logins.</b> An agent driving a signed-in browser can reach everything that browser can. A separate profile with only the necessary sessions is a cheap and effective containment.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong on models. Moderate on the agent, depending on whether skills and memory are portable.</li>
        <li><b>Inspectable.</b> Strong. Open source, so the loop, the tools, and the memory handling can be read.</li>
        <li><b>Portable.</b> Good for skills. Memory portability is the property to check, since it is the part that cannot be recreated.</li>
        <li><b>Bounded.</b> Depends heavily on deployment. Terminal and browser access are broad by nature, so the boundary is whatever you configure.</li>
        <li><b>Grounded.</b> Good. Real browsing and real command output are facts rather than recollection.</li>
        <li><b>Auditable.</b> Achievable. Self-hosted operation means you can record everything, and whether you do is your decision.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Hermes Agent is not a coding harness. It can work with code and it is not organized around a repository,
        tests, and symbol knowledge the way a coding agent is.
      </p>
      <p>
        Hermes Agent is not a broker. It runs one agent rather than routing work between several.
      </p>
      <p>
        Hermes Agent is not tied to Nous Portal. The platform is available and the agent is open source and
        model-agnostic, so it can run against whatever you point it at, including entirely local infrastructure.
      </p>
    </>
  );
}
