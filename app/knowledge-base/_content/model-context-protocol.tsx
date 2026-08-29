import type { Article } from './types';

export const article: Article = {
  slug: 'model-context-protocol',
  title: 'Model Context Protocol',
  kind: 'technology',
  layer: 'open-standards',
  kicker: 'OPEN STANDARDS / CONNECTION',
  summary: 'A protocol for connecting agents to tools, data, and prompts, so an integration is written once as a server rather than once per harness.',
  standfirst: 'MCP answers the integration question. Before a shared protocol, connecting an agent to a system meant writing that integration for a specific harness. With one, the integration is a server, and every client that speaks the protocol can use it.',
  keywords: ['Model Context Protocol', 'MCP', 'agent tools', 'tool integration', 'MCP server', 'agent interoperability', 'stdio', 'streamable HTTP'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'the-problem', label: 'The N times M problem' },
    { id: 'primitives', label: 'What a server exposes' },
    { id: 'transports', label: 'Transports and where servers run' },
    { id: 'governance-boundary', label: 'A boundary you can govern' },
    { id: 'designing-servers', label: 'Designing a server well' },
    { id: 'security', label: 'Security considerations' },
    { id: 'adopting', label: 'Adopting it incrementally' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'limits', label: 'What the protocol does not solve' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', note: 'Specification, concepts, and getting-started material.' },
    { label: 'MCP specification', href: 'https://modelcontextprotocol.io/specification', note: 'The normative document, including protocol messages and lifecycle.' },
    { label: 'MCP SDKs and servers', href: 'https://github.com/modelcontextprotocol', note: 'Reference implementations in several languages, plus example servers worth reading.' },
    { label: 'JSON Schema', href: 'https://json-schema.org', note: 'The vocabulary used to describe tool arguments.' },
    { label: 'Language Server Protocol', href: 'https://microsoft.github.io/language-server-protocol/', note: 'The closest precedent, and a useful analogy for why this class of protocol works.' },
  ],
  related: ['open-standards', 'agent-skills', 'harnesses-and-brokers'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        The Model Context Protocol is a specification for how an agent application connects to external capability.
        A server exposes tools, data, and prompt templates. A client, usually an agent harness, connects and uses
        them. The protocol defines the messages, the lifecycle, and the shape of what is exposed.
      </p>
      <p>
        The value is not in any individual server. It is that the integration is written once, against a protocol,
        rather than once per agent product. That is the same trade that made database drivers, printer drivers, and
        language servers worth standardizing.
      </p>

      <h2 id="the-problem">The N times M problem</h2>
      <p>
        The problem has a familiar shape. Suppose an organization wants its agents to reach ten internal systems:
        a ticket tracker, a wiki, a metrics store, a deployment tool, and so on. Suppose it also runs three agent
        products, which is the normal case rather than an unusual one.
      </p>
      <p>
        Without a protocol, that is thirty integrations. Each one written against a specific harness&apos;s plugin
        interface, each maintained separately, each broken separately when the underlying system changes, and each
        one a place where the definitions can drift from the other two.
      </p>
      <p>
        With a protocol, it is ten servers. Each written once, each maintained in one place, and each usable by any
        conformant client, including clients that do not exist yet.
      </p>
      <p>
        The arithmetic gets more favorable as either number grows, which is why this class of protocol tends to win
        eventually. The interesting question is never whether standardizing integration is worthwhile. It is whether
        a given specification is complete enough and adopted widely enough to be the one.
      </p>

      <h2 id="primitives">What a server exposes</h2>
      <p>
        A server can expose three kinds of thing, and the distinctions matter more than they first appear.
      </p>
      <h3>Tools</h3>
      <p>
        Functions the agent can call, with described arguments and behavior. These are model-controlled: the agent
        decides when to invoke them based on the description. Tools are the primitive most people think of, and they
        are where side effects live.
      </p>
      <h3>Resources</h3>
      <p>
        Data the client can read, addressed by URI. These are application-controlled rather than model-controlled,
        meaning the client decides what to include rather than the model deciding to fetch. A file, a record, a
        document. The distinction from tools is about who initiates.
      </p>
      <h3>Prompts</h3>
      <p>
        Reusable templates a server offers, typically surfaced to users as an explicit action rather than chosen by
        the model. This is the least used of the three and useful for encoding a known-good way of asking for
        something.
      </p>
      <p>
        Keeping these separate is worth the small conceptual overhead. A system that exposes everything as tools
        forces the model to decide when to read data, which spends steps and introduces errors that an
        application-controlled resource would avoid entirely.
      </p>

      <h2 id="transports">Transports and where servers run</h2>
      <p>
        Servers reach clients over two main transports, and the choice determines the deployment shape rather than
        only the wire format.
      </p>
      <p>
        <b>Standard input and output.</b> The client launches the server as a subprocess and talks to it over pipes.
        Simple, local, with no network exposure, and the process lifecycle is the client&apos;s responsibility. This
        suits servers that access local resources or that are distributed as ordinary packages.
      </p>
      <p>
        <b>Streamable HTTP.</b> The server runs as a network service that clients connect to. This suits shared
        infrastructure: one server that many users and many agents reach, with authentication and central
        observability.
      </p>
      <p>
        The architectural consequence is worth being explicit about. Local subprocess servers are per-user, which
        means credentials, configuration, and version drift are per-user too. Remote servers are shared, which means
        one place to update, one place to observe, and one place to enforce access, at the cost of running a service.
      </p>
      <p>
        For organizational deployments the remote form is usually the right target, and the local form is the right
        way to start. Servers written well can support both.
      </p>

      <h2 id="governance-boundary">A boundary you can govern</h2>
      <p>
        The under-discussed benefit of a connection protocol is that it creates a place where policy can be applied.
      </p>
      <p>
        When integrations are compiled into an agent, there is no boundary. Determining what an agent can reach means
        reading its code, and changing what it can reach means changing that code and redeploying. Access is
        distributed across every agent build in existence.
      </p>
      <p>
        When integrations are servers reached over a described protocol, there is a seam. Which servers an agent is
        configured to use is a policy decision. Calls crossing that seam can be logged in one place. Access can be
        revoked by removing a configuration entry rather than by shipping a new version. Different agents can be
        given different server sets according to what they are for.
      </p>
      <p>
        This is the same argument the data layer makes about catalogs: concentrating access in a described interface
        turns a diffuse governance problem into a single administrative surface. It is one of the strongest practical
        reasons to prefer protocol-based integration even in a system with only one harness.
      </p>

      <h2 id="designing-servers">Designing a server well</h2>
      <p>
        A protocol makes an integration reusable. It does not make it good. The properties that separate a server
        agents use correctly from one they misuse are the same tool-design properties the harness layer describes,
        and they are worth restating in this context because a server is where they get decided.
      </p>
      <ul>
        <li>
          <b>Name tools for intent.</b> A tool called <code>get_open_incidents_for_service</code> is chosen correctly
          far more often than <code>query</code>. Specific tools encode the decision once, in code, where it can be
          tested.
        </li>
        <li>
          <b>Write descriptions for the caller.</b> The description is the entire basis on which a model decides
          whether the tool applies. Say what it does, when to use it, when not to, and what the arguments mean in
          domain terms.
        </li>
        <li>
          <b>Constrain arguments in the schema.</b> Enumerations, formats, and ranges prevent a class of bad calls
          before they happen, and they tell the model what is valid without a round trip.
        </li>
        <li>
          <b>Shape results for reasoning.</b> Return the fields that matter, with units, and say what was filtered or
          truncated. A sixty-field API response wastes context and buries the answer.
        </li>
        <li>
          <b>Bound result size.</b> A tool that can return a large document will eventually fill a context window
          and evict the task. Truncate deliberately and say that you did.
        </li>
        <li>
          <b>Write errors the model can act on.</b> An error explaining that an identifier was not found, and what
          identifiers look like, lets an agent correct itself. A stack trace does not.
        </li>
        <li>
          <b>Keep the surface small.</b> Tool selection quality degrades as the list grows. Two dozen well-chosen
          tools beat sixty exhaustive ones.
        </li>
      </ul>

      <h2 id="security">Security considerations</h2>
      <p>
        Connecting an agent to external systems is exactly where the interesting security questions live, and three
        of them deserve explicit treatment.
      </p>
      <h3>Server content is untrusted</h3>
      <p>
        Anything a server returns is data, never instruction. A wiki page, an issue description, an email body, or a
        web page can contain text addressed to the agent, placed there by anyone who can write to that system. A
        client that treats tool results as authoritative is exploitable by anyone who can put text where the agent
        will read it. This is the single most important property to preserve, and it belongs to the client rather
        than to the protocol.
      </p>
      <h3>Installing a server is granting access</h3>
      <p>
        A server runs with whatever credentials it is configured with, and a local one runs as the user. Adding one
        from an unfamiliar source is closer to installing software than to adding a bookmark, and it deserves the
        same scrutiny.
      </p>
      <h3>Composition creates paths nobody designed</h3>
      <p>
        An agent with a server that reads internal documents and another that posts publicly has a path from private
        to public that neither server author considered. The combination is where the risk lives, which means the
        review has to happen at the level of the agent&apos;s configured server set rather than per server.
      </p>

      <h2 id="adopting">Adopting it incrementally</h2>
      <p>
        Most teams meet this protocol with integrations already written. The realistic path is incremental, and the
        order matters more than the speed.
      </p>
      <ol>
        <li>
          <b>Write the next integration as a server.</b> Not a migration of the existing ones. The next one. This
          costs nothing extra, since you were writing an integration anyway, and it produces a working example the
          team can look at.
        </li>
        <li>
          <b>Start with read-only.</b> A server that can look things up and change nothing delivers most of the
          value at almost none of the risk, and it lets you learn what agents actually ask for before deciding what
          they should be able to change.
        </li>
        <li>
          <b>Watch how it gets used.</b> Log the calls. The tools agents reach for, the arguments they get wrong, and
          the questions they ask twice all tell you what the descriptions and the surface should be. This feedback is
          not available any other way.
        </li>
        <li>
          <b>Refine the surface based on that.</b> Usually this means splitting one general tool into two specific
          ones, tightening a schema, or rewriting a description that was written for a human reader.
        </li>
        <li>
          <b>Move from local to shared when a second person needs it.</b> The moment two people are maintaining
          their own configuration for the same server is the moment a shared deployment starts paying for itself.
        </li>
        <li>
          <b>Add write capability one action at a time.</b> Each with a constrained argument surface and, where the
          action is hard to reverse, an approval path. Not a general write tool.
        </li>
        <li>
          <b>Convert existing integrations on contact.</b> When one needs changing anyway, move it. This spreads the
          cost across work already scheduled rather than creating a migration project nobody funds.
        </li>
      </ol>
      <p>
        The step teams most often skip is the third, and it is the one that determines whether the servers are good.
        A server designed entirely from the outside, without watching an agent use it, reliably has too many tools,
        descriptions written for the wrong audience, and results shaped for a dashboard rather than for reasoning.
        A week of usage logs fixes all three.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        MCP is the connection layer of the four-layer model, and it touches the other three in specific ways.
      </p>
      <p>
        It is how agents reach the data layer without holding storage credentials, since a server can authenticate to
        a catalog and expose governed query capability. It is how harnesses acquire capability without owning
        integrations, which is what keeps them replaceable. And it composes with the other standards: skills describe
        how to work, profiles describe what an agent may do, graphs describe the shape of the work, and MCP describes
        what the agent can reach while doing it.
      </p>
      <p>
        Of the four standards this reference covers, MCP is the one with the widest independent adoption, which
        matters. A specification with many independent implementations has been tested as a specification rather
        than as documentation for one implementation.
      </p>

      <p>
        There is a second-order effect worth noting. Because servers are reusable, the incentive to write a good one
        changes. An integration written for a single agent product is disposable, and it is written accordingly. A
        server that three teams and four harnesses will use is worth naming carefully, documenting properly, and
        maintaining. Standardization does not only reduce the number of integrations, it tends to raise the quality
        of the ones that remain.
      </p>

      <h2 id="limits">What the protocol does not solve</h2>
      <p>
        Being clear about the boundary prevents a category of disappointment.
      </p>
      <p>
        A protocol standardizes how a tool is described and called. It does not standardize what the tool does, how
        well it does it, what it accepts, or how it fails. Two servers exposing a query capability can behave very
        differently. Interoperability at the protocol level removes the integration cost and leaves the semantic
        work, which is why the data layer&apos;s emphasis on written meaning matters even in a fully protocol-based
        system.
      </p>
      <p>
        It also does not decide authority. A server can be reached; whether this agent should reach it, and what it
        may do there, is enforced by the client and by the server&apos;s own credentials. The protocol provides the
        seam where those decisions can be applied and does not make them.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Too many servers degrades tool selection.</b> Connecting everything available produces a tool list the model chooses badly from. Scope per agent and per task.</li>
        <li><b>Local servers drift per user.</b> Different versions and different configurations on different machines produce behavior differences that look like model variance.</li>
        <li><b>Descriptions are the interface.</b> A server with terse descriptions will be used incorrectly regardless of how well it is implemented.</li>
        <li><b>Version and capability negotiation matters.</b> Clients and servers vary in what they implement. Verify the specific features you rely on rather than assuming parity.</li>
        <li><b>Credentials in server configuration spread.</b> Local servers holding long-lived tokens recreate the scattered-credential problem the data layer warns about. Prefer short-lived, scoped credentials or a shared remote server.</li>
        <li><b>Result size is a real failure mode.</b> Unbounded output is the most common way a well-designed server breaks an agent.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Very strong. Both sides are replaceable: any conformant client works with any conformant server.</li>
        <li><b>Inspectable.</b> Strong. The protocol is published, the messages are readable, and reference implementations are open.</li>
        <li><b>Portable.</b> Very strong. This is the property the specification exists to deliver, and it has been tested by many independent implementations.</li>
        <li><b>Bounded.</b> Enabling rather than providing. It creates the seam where access policy applies; enforcement is the client&apos;s and server&apos;s job.</li>
        <li><b>Grounded.</b> Strong. Servers are how agents reach real systems rather than relying on recall.</li>
        <li><b>Auditable.</b> Good. A described interface is a natural logging point, particularly for remote servers.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        MCP is not an agent framework. It connects an agent to capability. The loop, the state, the limits, and the
        policy belong to the harness.
      </p>
      <p>
        MCP is not a capability format. A server provides reach; a skill provides know-how. An agent with a ticket
        server can query tickets and does not thereby know your organization&apos;s triage procedure.
      </p>
      <p>
        MCP is not an authentication system. It defines how connections work, not who your users are. Identity comes
        from the surrounding infrastructure, and an agent deployment that skips that question has skipped the
        important part.
      </p>
    </>
  );
}
