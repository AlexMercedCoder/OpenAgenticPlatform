import type { Article } from './types';

export const article: Article = {
  slug: 'agent-skills',
  title: 'Agent Skills',
  kind: 'technology',
  layer: 'open-standards',
  kicker: 'OPEN STANDARDS / CAPABILITY',
  summary: 'An open format for packaging procedural knowledge as folders an agent loads on demand, supported across a wide range of agent products.',
  standfirst: 'Tools give an agent reach. Skills give it competence. A skill is a folder with a SKILL.md file describing how to do something, loaded only when a task calls for it, which is what lets a library of capability grow without a growing context bill.',
  keywords: ['Agent Skills', 'SKILL.md', 'progressive disclosure', 'agent capability', 'portable skills', 'procedural knowledge', 'agent standards'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'tools-vs-skills', label: 'Tools and skills are different things' },
    { id: 'anatomy', label: 'Anatomy of a skill' },
    { id: 'progressive-disclosure', label: 'Progressive disclosure' },
    { id: 'why-prose', label: 'Why prose is the right medium' },
    { id: 'writing-well', label: 'Writing a skill that works' },
    { id: 'examples', label: 'What good skills look like' },
    { id: 'adoption', label: 'Adoption and portability' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'organizational', label: 'The organizational argument' },
    { id: 'security', label: 'Security considerations' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Agent Skills', href: 'https://agentskills.io', note: 'The format overview, client showcase, and quickstart.' },
    { label: 'Agent Skills specification', href: 'https://agentskills.io/specification', note: 'The complete format specification, including frontmatter fields and bundled resources.' },
    { label: 'Agent Skills on GitHub', href: 'https://github.com/agentskills/agentskills', note: 'The open development repository and discussion.' },
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'The complementary standard covering reach rather than know-how.' },
  ],
  related: ['open-standards', 'model-context-protocol', 'open-agent-profile'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        An Agent Skill is a folder. At minimum it contains a file called SKILL.md with a small amount of metadata and
        a set of instructions. It can also bundle scripts, reference documents, templates, and any other supporting
        files.
      </p>
      <p>
        The format was originally developed by Anthropic and released as an open standard. It has since been adopted
        by a large number of agent products, spanning coding agents, personal agents, IDEs, and platforms, which is
        an unusually broad base for a format of this age.
      </p>
      <p>
        The idea is simple enough that its importance is easy to miss. Packaging know-how as a folder of prose,
        loaded on demand, solves a problem that neither prompts nor tools solve well.
      </p>

      <h2 id="tools-vs-skills">Tools and skills are different things</h2>
      <p>
        This distinction is the one that makes the format make sense, and it is worth drawing carefully.
      </p>
      <p>
        A <b>tool</b> is a capability. It lets an agent do something it otherwise could not: query a database, send a
        request, read a file. Without the tool, the action is impossible.
      </p>
      <p>
        A <b>skill</b> is knowledge about how to work. Your organization&apos;s procedure for investigating a failed
        payment. The conventions that apply when writing a migration. The steps in a release. How to structure a
        particular kind of analysis. With the tools alone, the agent could technically do all of these, and it would
        do them differently every time and often incorrectly.
      </p>
      <p>
        The failure of conflating them shows up in a specific way. Teams give an agent excellent tools, watch it
        produce inconsistent results, and conclude the model is not good enough. What is actually missing is the
        procedural knowledge a new employee would be given on their first week, which nobody thought to write down
        because everyone already knows it.
      </p>

      <h2 id="anatomy">Anatomy of a skill</h2>
      <p>
        The structure is deliberately minimal.
      </p>
      <ul>
        <li><b>SKILL.md.</b> Required. Frontmatter carrying at least a name and a description, followed by the instructions themselves.</li>
        <li><b>scripts/.</b> Optional executable code the instructions can invoke, for the deterministic parts of a procedure.</li>
        <li><b>references/.</b> Optional documentation the agent can read when it needs detail the main instructions do not carry.</li>
        <li><b>assets/.</b> Optional templates and resources: a document template, a query skeleton, a checklist.</li>
      </ul>
      <p>
        The description field deserves particular attention because it does more work than anything else in the
        folder. It is what the agent sees at all times, and it is the entire basis on which the skill is selected.
        A vague description means the skill is never loaded when it should be, or is loaded when it should not, and
        no amount of quality in the instructions compensates.
      </p>
      <p>
        Everything else is ordinary files. That is the point: a skill is reviewable in a text editor, diffable in
        version control, and copyable between machines by a person who has never read the specification.
      </p>

      <h2 id="progressive-disclosure">Progressive disclosure</h2>
      <p>
        The loading model is the mechanism that makes the format scale, and it works in three stages.
      </p>
      <p>
        <b>Discovery.</b> At startup, the agent loads only the name and description of each available skill. Enough
        to know when something might be relevant, and small enough that many skills cost almost nothing.
      </p>
      <p>
        <b>Activation.</b> When a task matches a description, the full instructions load into context.
      </p>
      <p>
        <b>Execution.</b> The agent follows the instructions, reading referenced files or running bundled scripts
        only as those are actually needed.
      </p>
      <p>
        The reason this matters is a hard constraint rather than an optimization. Context is finite, and everything
        in it competes. An organization with sixty procedures cannot put sixty procedures in a system prompt: the
        prompt would be enormous, expensive on every call, and the relevant material would be diluted by
        fifty-nine irrelevant ones. Loading one when it applies keeps the cost proportional to the task rather than
        to the library.
      </p>
      <p>
        This is also why the description is load-bearing. Progressive disclosure only works if the selection step is
        reliable, and the selection step sees nothing but names and descriptions.
      </p>

      <h2 id="why-prose">Why prose is the right medium</h2>
      <p>
        A skill is mostly text, which sounds like a weakness compared with code and is the source of most of its
        value.
      </p>
      <p>
        <b>Domain experts can write it.</b> The person who knows the payment investigation procedure is usually not
        the person who writes the agent. If capturing that knowledge requires programming, it does not get captured.
        If it requires writing a page of instructions, it does.
      </p>
      <p>
        <b>Domain experts can review it.</b> This is the more important half. A skill can be read by whoever owns the
        process, corrected, and approved, with confidence that the correction takes effect. Very little else in an
        agentic stack has that property, and it is what makes agent behavior governable by the people responsible
        for the work rather than only by engineers.
      </p>
      <p>
        <b>Judgment survives.</b> Real procedures contain conditions that resist codification: usually do this,
        unless the customer is on the enterprise plan, in which case check with the account team first. Prose handles
        that naturally. Code turns it into a branch that will be wrong at the edges.
      </p>
      <p>
        The corresponding limitation is that prose is not deterministic. An agent following instructions may follow
        them imperfectly. Where a step must produce exactly the same result every time, a bundled script is the right
        tool, and the format supports exactly that combination: prose for judgment, code for determinism.
      </p>

      <h2 id="writing-well">Writing a skill that works</h2>
      <p>
        The difference between a skill that improves behavior and one that sits unused comes down to a handful of
        properties.
      </p>
      <ul>
        <li>
          <b>Write the description for selection, not for humans.</b> It should say what situations this applies to,
          in the vocabulary a task will actually use. Include the trigger conditions explicitly.
        </li>
        <li>
          <b>Say when not to use it.</b> A negative boundary prevents the most common failure, which is a skill
          activating on adjacent tasks it does not fit.
        </li>
        <li>
          <b>Write the procedure as steps, not as background.</b> An agent reading a skill needs to act. Context is
          useful; a page of context before the first instruction is not.
        </li>
        <li>
          <b>Name the failure modes.</b> The three things that usually go wrong, and what to do about each, are worth
          more than a longer description of the happy path.
        </li>
        <li>
          <b>Keep it focused.</b> One procedure per skill. A skill covering four related things is loaded for one and
          dilutes context with the other three.
        </li>
        <li>
          <b>Reference rather than include.</b> Long detail belongs in a reference file the agent reads if needed,
          not in the main instructions that always load.
        </li>
        <li>
          <b>Test it by watching.</b> Run a real task and see whether the skill activated and whether it helped. Most
          problems are selection problems, visible immediately and invisible in review.
        </li>
      </ul>

      <h2 id="examples">What good skills look like</h2>
      <p>
        Abstract advice about writing skills is less useful than knowing which ones are worth writing. The pattern
        across teams that get value from them is that the good candidates share a shape.
      </p>
      <h3>Procedures people already repeat</h3>
      <p>
        If someone is pasting the same paragraph of instructions into a chat every week, that is a skill that has
        already been written and just has not been saved. This is the highest-yield category and the easiest to
        find: look at what people type twice.
      </p>
      <h3>Conventions that are not in the code</h3>
      <p>
        How this codebase handles errors, why one module deliberately looks wrong, what naming pattern applies where.
        These are the things a new colleague learns in review comments over two months, and an agent otherwise never
        learns at all.
      </p>
      <h3>Multi-step processes with an order that matters</h3>
      <p>
        Release checklists, incident investigation, dependency upgrades, data migration steps. The value is not the
        individual steps, which an agent could work out, but the ordering and the checks that experience added.
      </p>
      <h3>Judgment about which source to trust</h3>
      <p>
        When a question can be answered from three places, and only one of them is authoritative, that is knowledge
        a skill can carry directly. This is where a skill does the work the semantic layer would otherwise have to do
        alone.
      </p>
      <h3>House style for output</h3>
      <p>
        How a report is structured, what a commit message looks like, which format an analysis is delivered in. These
        are cheap to write and produce visible consistency immediately, which makes them good first skills for a team
        that is unconvinced.
      </p>
      <p>
        The categories that reliably disappoint are the mirror image. Skills describing what a well-known tool does,
        which the model already knows. Skills restating information the agent can read from the repository. Skills
        covering a procedure nobody actually follows, which produce agent behavior that surprises the team. And
        skills written speculatively for situations that have not arisen, which are never selected and quietly rot.
      </p>

      <h2 id="adoption">Adoption and portability</h2>
      <p>
        Portability is the property a standard is judged on, and this one has an unusually strong case: the format is
        supported by a wide and growing set of clients including coding agents, personal agents, IDEs, enterprise
        platforms, and open source runtimes.
      </p>
      <p>
        Two things follow from that breadth. A skill written once is usable across the tools different people on a
        team prefer, which removes an argument that otherwise consumes real effort. And the specification has been
        tested as a specification rather than as documentation for one implementation, which is the difference the
        standards layer article identifies between a standard and a published format.
      </p>
      <p>
        The practical implication for a team is that skills are a safe place to invest. Twenty well-written skills
        survive a change of agent tooling. Twenty carefully tuned system prompts do not.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        Skills occupy the capability position in the standards layer, and they compose with the other three formats
        rather than overlapping them.
      </p>
      <p>
        MCP gives an agent reach. Skills give it competence with that reach. A profile says which agent this is and
        what it may do. A graph says what shape a particular piece of work takes. An agent with a ticket server but
        no triage skill can query tickets and does not know your triage procedure. An agent with the skill and no
        server knows the procedure and cannot act on it.
      </p>
      <p>
        In the layered model, skills are also the artifact that most directly connects the data layer&apos;s semantic
        work to agent behavior. A skill describing how to answer a revenue question can name the authoritative
        metric, the caveats, and the check to run before reporting. That is semantic knowledge expressed as
        procedure, and it is often the most practical place to put it.
      </p>

      <h2 id="organizational">The organizational argument</h2>
      <p>
        There is a case for skills that has little to do with agents, and it is worth stating because it changes how
        the investment is justified.
      </p>
      <p>
        Most organizations have procedural knowledge that exists only in people. How to investigate a particular
        class of incident. What to check before a release. Which of four plausible approaches the team settled on and
        why. This knowledge is transmitted by working alongside someone, and it is lost when they leave.
      </p>
      <p>
        Attempts to document it usually fail for a predictable reason: documentation has no consumer. It is written,
        filed, and not read, because the people who need it ask a colleague instead, which is faster.
      </p>
      <p>
        Skills change that calculation, because there is now a consumer that reads documentation every time. Writing
        the procedure down has an immediate, visible payoff in agent behavior, which is a much stronger incentive
        than the possibility of helping a future colleague. The side effect is that the organization ends up with
        written procedures, which is valuable independently of any agent.
      </p>
      <p>
        That is a real second-order benefit and worth naming when justifying the effort. The agent is the reason it
        gets written. The written procedure is worth something regardless.
      </p>

      <h2 id="security">Security considerations</h2>
      <p>
        A skill is instructions an agent will follow, which makes installing one a trust decision rather than a
        configuration change.
      </p>
      <p>
        A malicious or careless skill can direct an agent toward actions it would not otherwise take, and it does so
        in a form that looks like helpful guidance. A skill that bundles scripts is stronger still: that is software
        you are running, and it deserves the review software gets.
      </p>
      <p>
        Three habits address most of this. Review skills before installing them, particularly any that bundle
        executable content. Keep skills in version control so changes are visible and attributable. And remember
        that a skill does not grant capability: authority is enforced by the harness, so a skill instructing an agent
        to do something it is not permitted to do should fail at the boundary rather than succeed. If it succeeds,
        the problem is the authority model rather than the skill.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Weak descriptions are the main failure.</b> Most skills that seem not to work were never selected. Check activation before revising the instructions.</li>
        <li><b>Skills copied rather than referenced drift.</b> The same skill in three repositories diverges within a quarter. Keep one copy and reference it.</li>
        <li><b>Skills go stale.</b> A procedure referring to a decommissioned system is confidently wrong. Review them on a schedule, and validate any references in continuous integration where possible.</li>
        <li><b>Too many overlapping skills confuse selection.</b> Several skills with similar descriptions produce inconsistent activation. Consolidate or sharpen the boundaries.</li>
        <li><b>Long skills defeat the point.</b> If the instructions always load and are enormous, you have rebuilt the oversized system prompt with extra steps.</li>
        <li><b>Client support varies in detail.</b> The core format is widely supported. Bundled script execution and reference loading differ. Verify what your runtime does.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Very strong. A folder of Markdown is about as replaceable as an artifact gets.</li>
        <li><b>Inspectable.</b> Very strong. Prose readable and correctable by non-programmers is the format&apos;s defining property.</li>
        <li><b>Portable.</b> Very strong, and demonstrated by broad independent adoption rather than only claimed.</li>
        <li><b>Bounded.</b> Not applicable. Skills describe how to work, not what is permitted. Authority belongs to the harness.</li>
        <li><b>Grounded.</b> Indirectly strong. Skills are a natural place to record which sources are authoritative and what a term means.</li>
        <li><b>Auditable.</b> Strong when kept in version control, since every change to how agents work carries an author and a reason.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        A skill is not a tool. It cannot make an agent capable of something the harness does not allow.
      </p>
      <p>
        A skill is not a permission. Instructions describing limits are guidance, and enforcement happens in the code
        that executes actions.
      </p>
      <p>
        A skill is not a substitute for good tools. A procedure describing how to work around a badly designed tool
        is a workaround. Fixing the tool is usually the better investment, and the skill should describe the
        judgment the tool cannot encode.
      </p>
    </>
  );
}
