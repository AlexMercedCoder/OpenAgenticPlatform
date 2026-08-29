import type { Article } from './types';

export const article: Article = {
  slug: 'bounded',
  title: 'Bounded',
  kind: 'concept',
  layer: null,
  kicker: 'OPENNESS TEST / 04',
  summary: 'Whether authority and approval requirements are explicit and enforced outside the model, rather than requested in a prompt.',
  standfirst: 'The most consequential mistake in agentic systems is writing limits into a system prompt and believing they are enforcement. Instructions to a model are a request. A boundary is something the model cannot cross regardless of what it decides.',
  keywords: ['agent authority', 'agent permissions', 'least privilege', 'approval gates', 'prompt injection', 'sandboxing', 'agent governance'],
  sections: [
    { id: 'the-property', label: 'The property' },
    { id: 'the-mistake', label: 'The mistake this exists to prevent' },
    { id: 'real-enforcement', label: 'What real enforcement looks like' },
    { id: 'the-test', label: 'The adversarial test' },
    { id: 'approval', label: 'Approval that means something' },
    { id: 'reversibility', label: 'Reversibility as a boundary' },
    { id: 'identity', label: 'Whose authority is it' },
    { id: 'composition', label: 'Composition creates paths nobody designed' },
    { id: 'by-layer', label: 'Boundaries per layer' },
    { id: 'sustaining', label: 'Keeping narrow permissions sustainable' },
    { id: 'practices', label: 'Practices that preserve it' },
    { id: 'progression', label: 'A progression that works' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Open Agent Profile', href: 'https://github.com/alexmerced-oss/open-agent-profile', note: 'A specification whose core rules are about authority: narrowing only, no self-modification, untrusted state.' },
    { label: 'Apache Polaris', href: 'https://polaris.apache.org', note: 'Credential vending as an enforcement mechanism rather than a convenience.' },
    { label: 'Agentic Graph Specification', href: 'https://github.com/AlexMercedCoder/agentic-graph-spec', note: 'Per-node permissions, budgets, and human gates declared as part of a plan.' },
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'A described boundary where tool access can be governed centrally.' },
  ],
  related: ['auditable', 'harnesses-and-brokers', 'open-agent-profile'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="the-property">The property</h2>
      <p>
        Bounded asks whether authority and approval requirements are explicit. Not documented, not intended, but
        expressed in a form something enforces.
      </p>
      <p>
        This is the property that separates an agentic system you can deploy against real systems from one you can
        only demonstrate. It is also the property most commonly claimed on the basis of something that does not
        provide it.
      </p>

      <h2 id="the-mistake">The mistake this exists to prevent</h2>
      <p>
        Teams write the boundary into the system prompt. Do not delete anything. Do not send email without asking.
        Only query these tables. Never modify production.
      </p>
      <p>
        This is not enforcement. It is a request to a system that is capable of not honoring it, and it fails in
        three predictable ways.
      </p>
      <p>
        <b>It fails on misinterpretation.</b> An instruction not to modify production meets a task where the model
        concludes this particular change is not really a modification, or that this system is not really production.
        No malice required.
      </p>
      <p>
        <b>It fails on unusual input.</b> Instructions that hold across ordinary tasks stop holding when a task is
        strange, which is exactly when the consequences are largest.
      </p>
      <p>
        <b>It fails on injection.</b> An agent reads a document, a web page, an issue description, or an email. That
        content contains text addressed to the agent. If the system treats retrieved content as anything other than
        data, anyone who can put text where the agent will read it can influence what it does. A prompt instruction
        is not a defense against this, because the attacker is writing into the same channel.
      </p>
      <div className="kb-callout">
        <b>The rule</b>
        <p>
          Anything a tool returns is data, never instruction. Any system where that line is blurred is exploitable by
          whoever can write into the sources it reads.
        </p>
      </div>

      <h2 id="real-enforcement">What real enforcement looks like</h2>
      <p>
        Authority is enforced outside the model, by the code that executes the action. Five mechanisms cover most of
        it, and they compose.
      </p>
      <h3>Capability scoping</h3>
      <p>
        The agent is given only the tools it should have. A tool that is not registered cannot be called. This is the
        simplest and most effective control, and it is frequently skipped because giving an agent everything is
        easier during development.
      </p>
      <h3>Argument constraints</h3>
      <p>
        The tool itself limits what it accepts. This file tool writes only under this directory. This query tool
        reaches only these tables. This email tool sends only to internal domains. Enforcement at the point of
        action, testable like any other code.
      </p>
      <h3>Credential scoping</h3>
      <p>
        The credentials the agent operates with cannot perform the forbidden action. A read-only token cannot write
        regardless of what the agent attempts. This is the strongest form because it holds even if every other layer
        has a bug.
      </p>
      <h3>Approval gates</h3>
      <p>
        Certain classes of action pause and wait for a person, with the proposed action displayed clearly enough to
        judge.
      </p>
      <h3>Process isolation</h3>
      <p>
        A container or sandbox bounds what the agent can reach at all, which matters most for broad capabilities such
        as shell access or code execution where argument constraints are meaningless.
      </p>
      <p>
        A deployment with capability scoping, scoped credentials, and isolation has defense that does not depend on
        the model behaving well. That is the goal.
      </p>

      <h2 id="the-test">The adversarial test</h2>
      <p>
        There is one question that cuts through every discussion about agent safety, and it is worth applying
        literally.
      </p>
      <p>
        If the model were replaced with one that behaved adversarially, what could it actually do?
      </p>
      <p>
        Whatever the answer is, that is your real security boundary. Everything else is a preference. The exercise is
        useful because it forces you to ignore every control that depends on the model cooperating, which is usually
        most of them.
      </p>
      <p>
        Applied honestly, the answer for many systems is uncomfortable. An agent with shell access can do anything
        the user can. An agent with a broad database credential can read everything in the database. An agent driving
        a logged-in browser can reach everything that browser is signed into.
      </p>
      <p>
        The point is not that these capabilities are unacceptable. It is that they should be chosen with the answer
        in view, and paired with isolation and scoping that reduce it.
      </p>

      <h2 id="approval">Approval that means something</h2>
      <p>
        Approval gates are the mechanism most often implemented badly, in a way that produces the appearance of
        control without the substance.
      </p>
      <p>
        A prompt asking whether to proceed, without showing exactly what will happen, trains people to approve
        reflexively. After the twentieth confirmation, nobody is reading. The gate has become a delay rather than a
        check.
      </p>
      <p>
        Three properties make an approval real. It must display the specific action, with the actual arguments, in a
        form a person can evaluate. It should be bound to that action, so an approval cannot be reused for a
        different one. And it should be rare enough that people still read them, which means gating on
        irreversibility and consequence rather than on everything.
      </p>
      <p>
        The last point is a design constraint people resist. Gating too much is a failure mode, not a safe default.
        A system where everything requires approval trains the reviewer to stop looking, which makes the important
        gates less effective than having fewer of them would have been.
      </p>

      <h2 id="reversibility">Reversibility as a boundary</h2>
      <p>
        The cheapest form of bounding is often not a restriction but a change of action.
      </p>
      <p>
        Where a reversible form of an action exists, prefer it. Draft rather than send. Open a branch rather than
        push. Propose a change rather than apply it. Soft delete rather than hard. Write to a staging table rather
        than to the production one.
      </p>
      <p>
        This converts a class of failure from an incident into a review item. A drafted email that should not have
        been written costs nothing. A sent one costs a conversation. A system built so that the agent&apos;s output
        is a proposal by default, with a separate step to commit, needs far fewer approval gates because the default
        action is already safe.
      </p>
      <p>
        It also changes the economics of autonomy. An agent that can only produce reversible outputs can be given
        much more freedom, because the worst case is wasted work rather than damage.
      </p>

      <h2 id="identity">Whose authority is it</h2>
      <p>
        A question that determines whether the rest of this holds together: when an agent acts, whose permissions
        apply?
      </p>
      <p>
        The common arrangement is that an agent has its own credentials, typically broad ones, and acts as itself
        regardless of who asked. This produces two failures at once. The agent becomes a way to reach data the
        requester could not reach directly, which is a governance hole no prompt discipline closes. And the access
        record shows the agent rather than the person, which makes attribution impossible.
      </p>
      <p>
        The stronger arrangement is delegated authority: the agent acts on behalf of a person, with access scoped to
        what that person could do. Then an agent cannot become a privilege escalation path, and the record names a
        principal rather than a service account.
      </p>
      <p>
        This is harder to implement and it is the difference between an agent that is bounded and one that merely has
        limits. It also has an unexpected benefit: with delegated authority, the question of what an agent may do
        becomes the question of what its users may do, which is a question the organization has usually already
        answered.
      </p>

      <h2 id="composition">Composition creates paths nobody designed</h2>
      <p>
        Individual tools can each be reasonable while their combination is not, and this is the failure mode that
        per-tool review does not catch.
      </p>
      <p>
        An agent with a tool that reads internal documents is fine. An agent with a tool that posts to a public
        channel is fine. An agent with both has a path from private to public that neither tool author considered,
        and that path is exercised the first time someone asks it to summarize something internal in a public thread.
      </p>
      <p>
        The general shape is a read from a sensitive source combined with a write to a less sensitive destination.
        Once you look for it, the pattern appears in many ordinary configurations:
      </p>
      <ul>
        <li>A database reader plus a web request tool, which can send query results anywhere.</li>
        <li>A file reader plus an email sender.</li>
        <li>A credentials-bearing browser plus a form-filling capability.</li>
        <li>A ticket reader plus a code-writing tool, where ticket text is untrusted input that reaches a repository.</li>
        <li>Any read tool plus a memory write, since memory is a durable destination and often a shared one.</li>
      </ul>
      <p>
        Three responses help. Review the agent&apos;s configured tool set as a whole rather than tool by tool, asking
        what combinations produce a path out. Scope tools per task rather than exposing everything, so the
        combination only exists when the task actually needs it. And treat any write to a destination outside the
        current trust boundary as a gate, regardless of how ordinary the individual tool looks.
      </p>
      <p>
        This is also the strongest argument for keeping tool surfaces small. The number of possible combinations grows
        much faster than the number of tools, which means an agent with forty tools has a review problem nobody is
        going to solve by inspection.
      </p>

      <h2 id="by-layer">Boundaries per layer</h2>
      <ul>
        <li>
          <b>Data and semantics.</b> Access through a catalog that authenticates the caller and vends short-lived,
          scoped credentials. The boundary is that the agent cannot reach storage without going through it.
        </li>
        <li>
          <b>Models and routing.</b> Rules about which classes of content may reach which endpoints, checked in the
          router before dispatch rather than described in a policy document.
        </li>
        <li>
          <b>Harnesses and brokers.</b> The main event. Capability scoping, argument constraints, limits on steps and
          spend, approval gates, and isolation.
        </li>
        <li>
          <b>Open standards.</b> Formats that express authority in a reviewable way, with rules that prevent the
          format from becoming an escalation path. A profile that can only narrow, and that an agent cannot rewrite,
          is a standard designed with this property in mind.
        </li>
      </ul>

      <h2 id="sustaining">Keeping narrow permissions sustainable</h2>
      <p>
        Least privilege has a well-known failure mode. Narrow permissions block legitimate work, friction
        accumulates, and eventually someone widens the grant to stop the complaints. The wide grant then outlives the
        reason for it.
      </p>
      <p>
        Three practices keep narrow permissions workable rather than aspirational.
      </p>
      <p>
        <b>Make denials visible and explicable.</b> A system that can explain why a specific action was denied turns
        an obstacle into information. Policy that cannot be interrogated becomes policy nobody trusts.
      </p>
      <p>
        <b>Provide a structured request path.</b> When an agent needs a capability it lacks, recording that as a
        proposal with a written rationale produces exactly the artifact a reviewer needs. A request with a reason is
        a decision; a blocked task with no channel is pressure.
      </p>
      <p>
        <b>Narrow against evidence, not speculation.</b> Start with roughly what people already had, then reduce
        based on what access records show is actually used. Narrowing against usage data is achievable. Narrowing
        against a guess produces a stream of requests and eventually a wildcard.
      </p>

      <h2 id="practices">Practices that preserve it</h2>
      <ol>
        <li><b>Start read-only.</b> Most of the value and almost none of the risk. Add write capability one action at a time.</li>
        <li><b>Never rely on prompt instructions for limits.</b> Write them if you like, and do not count them.</li>
        <li><b>Scope credentials rather than trusting behavior.</b> The control that holds when everything else has a bug.</li>
        <li><b>Bound steps, time, and spend.</b> A confused agent without limits runs until something external stops it.</li>
        <li><b>Prefer reversible actions.</b> The cheapest boundary available.</li>
        <li><b>Gate on irreversibility, not on everything.</b> So that gates keep being read.</li>
        <li><b>Apply the adversarial test before deployment.</b> And write down the answer.</li>
      </ol>

      <h2 id="progression">A progression that works</h2>
      <p>
        Teams that end up with well-bounded agents rarely design the whole authority model up front. They follow a
        progression, and the order is what makes it survivable.
      </p>
      <ol>
        <li>
          <b>Read-only, narrow scope.</b> Useful tools that change nothing, over a small set of sources. Most of the
          value, almost none of the risk, and it teaches you what agents actually reach for.
        </li>
        <li>
          <b>Limits before the second tool.</b> Steps, wall-clock time, spend, and repeated-failure detection. These
          take an hour and are the difference between a confused agent that stops and one that runs until a bill
          notices.
        </li>
        <li>
          <b>Recording from the start.</b> Not a boundary itself, and the thing that makes every subsequent decision
          evidence-based rather than speculative.
        </li>
        <li>
          <b>One reversible write.</b> Draft, branch, or staging table. Learn what goes wrong when the agent produces
          output that persists, while the worst case is still wasted work.
        </li>
        <li>
          <b>Scoped credentials before broader access.</b> Before widening what an agent can touch, make sure the
          credential itself cannot exceed it. This is the control that holds when others have bugs.
        </li>
        <li>
          <b>Approval gates on irreversible actions.</b> Showing the specific action, and only for the actions that
          warrant it.
        </li>
        <li>
          <b>Delegated identity when more than one person uses it.</b> The point at which a shared agent account
          becomes a privilege escalation path is the point at which several people can trigger it.
        </li>
        <li>
          <b>Narrow against usage.</b> After a few months of records, reduce grants to what was actually used. This
          is the only version of narrowing that survives contact with real work.
        </li>
      </ol>
      <p>
        The progression matters more than any individual item. Teams that start at step six, with elaborate approval
        machinery over an agent whose credentials can do anything, have built friction rather than a boundary.
      </p>

      <h2 id="not">What it is not</h2>
      <p>
        Bounded is not the same as restricted. A well-bounded agent can have substantial capability. The property is
        that the capability is deliberate and enforced, not that there is little of it.
      </p>
      <p>
        Bounded is not the same as safe. Boundaries limit what can go wrong; they do not make the work correct. An
        agent perfectly constrained to the wrong action performs it reliably.
      </p>
      <p>
        Bounded is not achieved by a model provider&apos;s safety training. That training reduces the likelihood of
        certain outputs. It is not a boundary, because it depends on the model, and your boundary should not.
      </p>
    </>
  );
}
