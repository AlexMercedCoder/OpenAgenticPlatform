import type { Article } from './types';

export const article: Article = {
  slug: 'apache-polaris',
  title: 'Apache Polaris',
  kind: 'technology',
  layer: 'data-and-semantics',
  kicker: 'DATA AND SEMANTICS / CATALOG',
  summary: 'An open catalog for Iceberg tables that resolves names, enforces access, and hands out scoped credentials, which makes it the natural control point for agent data access.',
  standfirst: 'A table format says what a table is. A catalog says which tables exist, who may touch them, and hands out the credentials to do so. Polaris is an open implementation of that role, and it is the piece that decides whether agent access to data is governable or scattered.',
  keywords: ['Apache Polaris', 'Iceberg REST catalog', 'data catalog', 'credential vending', 'RBAC', 'catalog federation', 'lakehouse governance'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'what-a-catalog-does', label: 'What a catalog actually does' },
    { id: 'why-it-matters', label: 'Why the catalog is the control point' },
    { id: 'credential-vending', label: 'Credential vending' },
    { id: 'access-control', label: 'Access control model' },
    { id: 'federation', label: 'Federation and multiple engines' },
    { id: 'request-path', label: 'What a request looks like end to end' },
    { id: 'status', label: 'Project status and governance' },
    { id: 'agentic-relevance', label: 'Where it matters for agents' },
    { id: 'deployment', label: 'Deployment considerations' },
    { id: 'adoption', label: 'Adopting it into an existing setup' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'Apache Polaris project site', href: 'https://polaris.apache.org', note: 'Documentation, releases, and the community mailing lists.' },
    { label: 'Polaris graduation announcement', href: 'https://polaris.apache.org/blog/2026/02/19/apache-polaris-graduates-to-top-level-project/', note: 'The project announcement of its move from the Apache Incubator to top-level status.' },
    { label: 'Iceberg REST catalog specification', href: 'https://github.com/apache/iceberg/blob/main/open-api/rest-catalog-open-api.yaml', note: 'The protocol Polaris implements, and the reason clients are interchangeable.' },
    { label: 'Polaris on GitHub', href: 'https://github.com/apache/polaris', note: 'Source, issues, and the deployment examples.' },
    { label: 'Apache Iceberg catalog documentation', href: 'https://iceberg.apache.org/concepts/catalog/', note: 'Background on what a catalog is required to do in the Iceberg model.' },
  ],
  related: ['apache-iceberg', 'data-and-semantics', 'bounded'],
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        Apache Polaris is an open-source catalog for Apache Iceberg tables. It implements the Iceberg REST catalog
        protocol, which means any engine or client that speaks that protocol can use it without a Polaris-specific
        driver.
      </p>
      <p>
        Its job is to answer questions about tables rather than to store data. Which tables exist. Where is the
        current metadata for this one. May this caller read it. Here are temporary credentials scoped to exactly
        that. Commit this new version of the table, but only if the version I started from is still current.
      </p>
      <p>
        Described that way it sounds like plumbing, and it is. It is also the single most important governance
        decision in the data layer, because every read and write passes through it.
      </p>

      <h2 id="what-a-catalog-does">What a catalog actually does</h2>
      <p>
        Catalog is an overloaded word. In the lakehouse sense it has a specific, small set of responsibilities.
      </p>
      <h3>Naming</h3>
      <p>
        It maps a human-usable name to a physical location. A query referring to a table by name gets resolved to the
        current metadata file, wherever that lives. Without this, every query would need a storage path, and moving
        data would break every consumer.
      </p>
      <h3>Atomic commit</h3>
      <p>
        It performs the compare-and-swap that makes a table write atomic. This is the operation that makes concurrent
        writers safe, and it is the reason a catalog cannot be a passive index. It must be able to serialize
        conflicting updates.
      </p>
      <h3>Authorization</h3>
      <p>
        It decides whether a caller may perform an operation before performing it. This is where read and write
        permission actually lives in a lakehouse, rather than in the query engine, which is easy to bypass, or in
        storage permissions alone, which are too coarse.
      </p>
      <h3>Credential handling</h3>
      <p>
        It provides the caller with credentials to reach the underlying storage, scoped and short-lived, rather than
        expecting the caller to hold long-lived storage keys.
      </p>
      <h3>Discovery</h3>
      <p>
        It lists what exists so that consumers, including agents, can find out what is available without being told
        in advance.
      </p>

      <h2 id="why-it-matters">Why the catalog is the control point</h2>
      <p>
        There are three plausible places to enforce access to lakehouse data, and only one of them works well.
      </p>
      <p>
        <b>In the query engine.</b> Attractive because engines already understand tables and columns. Weak because
        anything that can read the storage directly bypasses it, and because a second engine means a second copy of
        the rules that will drift from the first.
      </p>
      <p>
        <b>In storage permissions.</b> Attractive because it cannot be bypassed. Weak because storage permissions
        operate on paths and prefixes rather than tables, columns, and rows, so expressing anything nuanced requires
        contorting the physical layout to match the access model.
      </p>
      <p>
        <b>In the catalog.</b> Every reader must consult the catalog to find the current metadata, so it sits in the
        path by construction. It understands tables rather than paths. And because it can vend credentials rather
        than assume the caller has them, it can be the only holder of the underlying storage keys.
      </p>
      <p>
        That last property is what turns the catalog from a convenient place to enforce policy into the correct
        place. If callers cannot reach storage without the catalog, then catalog policy is not advisory.
      </p>
      <div className="kb-callout">
        <b>The question this answers</b>
        <p>
          When someone asks which systems can read a sensitive table, a catalog-centered architecture has an answer.
          A configuration-centered architecture has a search problem.
        </p>
      </div>

      <h2 id="credential-vending">Credential vending</h2>
      <p>
        This deserves its own treatment because it is the mechanism that makes the rest work, and because it is often
        turned off during setup and never turned back on.
      </p>
      <p>
        Without credential vending, a client that wants to read a table asks the catalog for the metadata location
        and then uses its own storage credentials to fetch the files. Those credentials are typically long-lived,
        broad, and stored in configuration. Every tool that reads data has a copy. Revocation means finding every
        copy.
      </p>
      <p>
        With credential vending, the client authenticates to the catalog, the catalog authorizes the operation, and
        the catalog returns temporary credentials scoped to just the storage locations that table occupies, valid for
        a short window. The client never holds general storage access.
      </p>
      <p>
        The properties this produces are worth listing plainly, because they map directly onto what an agentic system
        needs:
      </p>
      <ul>
        <li><b>One place to revoke.</b> Removing a grant in the catalog takes effect as soon as outstanding credentials expire.</li>
        <li><b>Blast radius bounded by time.</b> A leaked credential is useful for minutes rather than indefinitely.</li>
        <li><b>Blast radius bounded by scope.</b> A credential for one table cannot read another.</li>
        <li><b>One place to observe.</b> Every access request is a catalog request, so usage is visible without instrumenting every client.</li>
        <li><b>No secrets in agent configuration.</b> Which removes an entire category of exposure, since agent configuration tends to be copied, shared, and occasionally committed.</li>
      </ul>

      <p>
        There is one honest limitation to note. Vended credentials are usually scoped at the storage prefix level,
        which means they are naturally table-shaped rather than column-shaped or row-shaped. Finer-grained controls,
        such as masking a column or restricting rows to a region, are enforced by the engine or by exposing a
        restricted view as its own table. An architecture that needs row-level restriction for agents should design
        for it explicitly rather than assuming the catalog delivers it, and the view-as-a-table approach has the
        advantage that it also works for clients the engine does not mediate.
      </p>

      <h2 id="access-control">Access control model</h2>
      <p>
        Polaris organizes access around catalogs, namespaces, and tables, with roles granting privileges over those
        objects. Principals are assigned roles, and roles carry privileges such as reading a table, writing to it, or
        managing a namespace.
      </p>
      <p>
        Two design points matter more than the specifics.
      </p>
      <p>
        The first is that privileges are hierarchical. A grant at namespace level covers the tables within it, which
        keeps the number of individual grants manageable as table counts grow. Systems that require a grant per table
        become unmanageable at a few hundred tables and then get worked around with a wildcard grant that defeats the
        purpose.
      </p>
      <p>
        The second is that the principal is a first-class concept, distinct from a human user. An agent, a service, or
        a pipeline can be its own principal with its own roles. This is what makes it possible to say precisely what
        one agent may reach, and to answer questions about its access without inference. When agent access is instead
        implemented by giving the agent a human&apos;s credentials, both properties disappear at once: the agent
        inherits everything that person can do, and the record shows the person rather than the agent.
      </p>

      <h2 id="federation">Federation and multiple engines</h2>
      <p>
        Most organizations do not have one query engine. They have the one the data team uses, the one that arrived
        with a product, and the one someone adopted for a specific workload. Multi-engine access is the normal case
        rather than an advanced scenario.
      </p>
      <p>
        Because Polaris implements the Iceberg REST protocol, engines that support that protocol connect without
        engine-specific catalog work. That list includes several widely used open engines, and the specifics are
        worth checking against current documentation rather than a summary, since support matures continuously.
      </p>
      <p>
        The architectural consequence is the one that matters for this site: the catalog stops being a property of
        an engine and becomes a shared service. Governance is expressed once and observed by everything, rather than
        expressed per engine and enforced inconsistently.
      </p>

      <h2 id="request-path">What a request looks like end to end</h2>
      <p>
        Walking one read through the system makes the division of labor concrete, and it explains why several of the
        gotchas later on are gotchas.
      </p>
      <ol>
        <li>
          <b>The client authenticates.</b> An engine, notebook, or agent tool presents a credential to the catalog and
          receives a token. The identity established here is the identity everything else is judged against, which is
          why a shared agent account collapses the whole chain into one indistinguishable actor.
        </li>
        <li>
          <b>The client asks to load a table.</b> It names a namespace and table rather than a storage path.
        </li>
        <li>
          <b>The catalog authorizes.</b> It checks whether this principal holds a role granting read on that object,
          directly or through the namespace above it. A denial happens here, before anything is read.
        </li>
        <li>
          <b>The catalog returns metadata and credentials.</b> The current metadata file location, plus temporary
          credentials scoped to the storage prefix that table occupies.
        </li>
        <li>
          <b>The client reads metadata and plans.</b> It walks the manifest structure, eliminates files that cannot
          match the filter, and produces a list of byte ranges to fetch.
        </li>
        <li>
          <b>The client reads data directly from storage.</b> Using the vended credentials. Data does not pass
          through the catalog, which is why the catalog does not become a throughput bottleneck.
        </li>
      </ol>
      <p>
        Two things follow from step six. The catalog is on the control path and not the data path, so it needs to be
        highly available and low latency but not high bandwidth. And the credentials handed out in step four are the
        real enforcement, which is why disabling vending quietly removes the enforcement while leaving the
        authorization check in place as a formality that anything can route around.
      </p>

      <p>
        Federation has a second meaning worth separating from multi-engine access. Some catalogs can present tables
        that live in another catalog, so a single endpoint exposes a wider set than it owns. This is useful when an
        organization has accumulated several catalogs and wants one place for consumers to look, and it is worth
        being clear-eyed about: federation makes discovery easier and does not merge the governance models
        underneath. Permissions are still enforced by whichever catalog owns the table, so a federated view can list
        things a caller cannot actually read. For agents that is acceptable, and only if the listing is filtered by
        what the caller can reach, since an agent that repeatedly discovers tables it cannot open wastes steps and
        reports confusing failures.
      </p>

      <h2 id="status">Project status and governance</h2>
      <p>
        Polaris entered the Apache Incubator after being contributed as open source, and graduated to a top-level
        Apache project in early 2026. Graduation is a meaningful signal rather than a formality: it indicates the
        Apache Software Foundation judged the project to have a sufficiently diverse community and a working
        governance process to sustain itself independently of any single contributing company.
      </p>
      <p>
        For an architecture that intends to remain open, that governance question is as important as the feature
        list. A catalog is a long-lived dependency sitting at the centre of the data layer. Whether it is stewarded
        by a foundation with a public process, or by a company that could change direction, is a legitimate part of
        the evaluation.
      </p>

      <h2 id="agentic-relevance">Where it matters for agents</h2>
      <h3>The natural boundary for agent access</h3>
      <p>
        Agents should not hold storage credentials. Routing their data access through a catalog that authenticates
        them, authorizes the operation, and vends short-lived credentials turns a diffuse security problem into a
        single administrative surface.
      </p>
      <h3>Discovery without a hardcoded list</h3>
      <p>
        An agent asking what tables it can see gets a list filtered by its own permissions. This is better than
        maintaining a list in a prompt, which drifts, and better than exposing everything, which is unsafe. The
        catalog is already the authority, so the answer is current by construction.
      </p>
      <h3>Access records that mean something</h3>
      <p>
        Because every access passes through the catalog, catalog logs are a record of what agents actually read. This
        is a substantial part of what makes the auditable property achievable in the data layer.
      </p>
      <h3>Per-agent scoping</h3>
      <p>
        Different agents can be different principals with different grants. A customer-facing agent and an internal
        analysis agent need very different access, and expressing that in the catalog is far more reliable than
        expressing it in instructions.
      </p>
      <h3>Delegated user identity</h3>
      <p>
        The stronger pattern, where the platform supports it, is for an agent acting on behalf of a person to receive
        access scoped to that person rather than to a general agent account. Then an agent cannot become a way to see
        data the requester could not see directly, which is one of the more common quiet governance failures in
        agentic deployments.
      </p>

      <h2 id="deployment">Deployment considerations</h2>
      <p>
        A catalog is on the critical path for every query, which makes a few operational properties non-negotiable.
      </p>
      <ul>
        <li><b>Availability.</b> If the catalog is down, no table can be read. It needs the availability of a core service, not of an internal tool.</li>
        <li><b>Latency.</b> Every query starts with catalog calls. Placing it far from the engines that use it adds a fixed cost to everything.</li>
        <li><b>Durable backing store.</b> The catalog holds the pointer that defines table state. Its persistence layer needs backup and recovery treated seriously.</li>
        <li><b>Identity integration.</b> Connecting it to existing identity infrastructure is what makes per-user and per-agent principals practical rather than an administrative burden.</li>
        <li><b>Audit retention.</b> Catalog logs are the access record. Retaining them for as long as you might need to answer a question about past access is a policy decision worth making explicitly.</li>
      </ul>

      <h2 id="adoption">Adopting it into an existing setup</h2>
      <p>
        Very few teams start here. The usual situation is tables already existing under some other arrangement, with
        credentials already distributed, and a working setup nobody wants to break. A staged path works better than a
        migration project.
      </p>
      <ol>
        <li>
          <b>Stand it up alongside, read-only.</b> Register existing tables and point one non-critical consumer at
          the catalog. This validates protocol support in your engines before anything depends on it.
        </li>
        <li>
          <b>Model principals before grants.</b> Decide what the identities are: which services, which pipelines,
          which agents, and whether agents act as themselves or on behalf of users. Grants written before this
          question is settled tend to be rewritten.
        </li>
        <li>
          <b>Turn on credential vending for new consumers first.</b> New tools should never receive direct storage
          credentials, even while old ones still have them. This stops the problem growing while you shrink it.
        </li>
        <li>
          <b>Move agent access first among existing consumers.</b> Agents are the newest, least entangled, and
          highest-risk consumers, which makes them both the easiest to move and the most valuable to move.
        </li>
        <li>
          <b>Retire direct storage credentials one consumer at a time.</b> Each retirement is small. The list is what
          takes time, which is the argument for not letting it grow further.
        </li>
        <li>
          <b>Then narrow the grants.</b> Start with roughly what people already had, then reduce based on what the
          access records show is actually used. Narrowing against evidence is achievable; narrowing against
          speculation produces a stream of access requests and eventually a wildcard grant.
        </li>
      </ol>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li>
          <b>Credential vending disabled during setup.</b> The most common configuration mistake. It is easier to get
          things working with direct storage credentials, and the temporary arrangement becomes permanent.
        </li>
        <li>
          <b>One shared agent principal.</b> Convenient and it collapses every access record into one identity,
          removing the ability to attribute anything.
        </li>
        <li>
          <b>Catalog treated as a metadata search product.</b> Business glossaries and data discovery tools are also
          called catalogs. This is a different thing. Both can be useful, and only one is in the read path.
        </li>
        <li>
          <b>Permissions granted broadly to unblock work.</b> Understandable and, once done, rarely revisited. Broad
          grants tend to outlive the reason for them.
        </li>
        <li>
          <b>Protocol support assumed rather than verified.</b> Clients vary in which parts of the REST specification
          they implement, particularly around writes and newer operations. Verify the operations you need.
        </li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Because it implements a published protocol, another conformant catalog can take its place, and clients do not change.</li>
        <li><b>Inspectable.</b> Strong. Open source, with an openly specified protocol.</li>
        <li><b>Portable.</b> Good. Table metadata and data are portable already; catalog state such as grants requires deliberate migration.</li>
        <li><b>Bounded.</b> Strong. This is the component whose entire purpose is expressing and enforcing boundaries.</li>
        <li><b>Grounded.</b> Partial. It knows tables and schemas, not business meaning.</li>
        <li><b>Auditable.</b> Strong for access. Catalog logs record who asked for what, which is the hardest part to reconstruct otherwise.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        Polaris is not a query engine. It does not read data or run SQL. It tells engines where tables are and
        whether they may be read.
      </p>
      <p>
        Polaris is not a semantic layer. It carries table and column metadata, and it does not define what net
        revenue means or which of three similar tables is authoritative. That work sits above it.
      </p>
      <p>
        Polaris is not a general-purpose permission system for an organization. It governs lakehouse tables.
        Application permissions, document access, and everything else belong elsewhere, and an agent operating across
        several domains will be subject to several such systems rather than one.
      </p>
    </>
  );
}
