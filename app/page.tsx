import Link from 'next/link';
import Image from 'next/image';
import WebMCP from './WebMCP';
import { SiteHeader } from './_components/SiteHeader';
import { NewsletterBand, SiteFooter } from './_components/SiteFooter';
import { aiBooks } from './_data/books';

type Component = { name: string; role: string; slug: string; href: string };
type Layer = { number: string; label: string; title: string; slug: string; color: string; summary: string; items: Component[] };

const layers: Layer[] = [
  { number:'01', label:'FOUNDATION', title:'Data & semantics', slug:'data-and-semantics', color:'lime', summary:'Give agents durable facts, portable records, and shared meaning.', items:[
    { name:'Apache Arrow', role:'In-memory columnar format', slug:'apache-arrow', href:'https://arrow.apache.org' },
    { name:'Apache Parquet', role:'Durable columnar files', slug:'apache-parquet', href:'https://parquet.apache.org' },
    { name:'Apache Iceberg', role:'Open table format', slug:'apache-iceberg', href:'https://iceberg.apache.org' },
    { name:'Apache Polaris', role:'Catalog & governance', slug:'apache-polaris', href:'https://polaris.apache.org' },
    { name:'Apache Ossie', role:'Semantic metadata (Incubating)', slug:'apache-ossie', href:'https://ossie.apache.org' },
  ] },
  { number:'02', label:'INTELLIGENCE', title:'Models & routing', slug:'models-and-routing', color:'cyan', summary:'Choose models by task, policy, economics, and deployment needs.', items:[
    { name:'Open-weight models', role:'Inspectable model artifacts', slug:'open-weight-models', href:'https://huggingface.co/models' },
    { name:'OpenRouter', role:'Unified model routing', slug:'openrouter', href:'https://openrouter.ai' },
    { name:'Nous Portal', role:'Models, tools & cloud', slug:'nous-portal', href:'https://portal.nousresearch.com' },
    { name:'Local endpoints', role:'Control at the boundary', slug:'local-model-endpoints', href:'https://github.com/ggml-org/llama.cpp' },
    { name:'Provider APIs', role:'Capability without lock-in', slug:'provider-apis', href:'https://docs.claude.com/en/api/overview' },
  ] },
  { number:'03', label:'EXECUTION', title:'Harnesses & brokers', slug:'harnesses-and-brokers', color:'amber', summary:'Turn intent into governed work with interchangeable runtimes.', items:[
    { name:'OpenCode', role:'Terminal coding agent', slug:'opencode', href:'https://opencode.ai' },
    { name:'Pi', role:'Agent harness', slug:'pi', href:'https://github.com/earendil-works/pi' },
    { name:'MagAgent', role:'Developer agent framework', slug:'magagent', href:'https://github.com/AlexMercedCoder/MagAgent' },
    { name:'Loro', role:'Governed agent harness', slug:'loro', href:'https://github.com/alexmerced-oss/loro' },
    { name:'Merced AI', role:'Agent broker', slug:'merced-ai', href:'https://github.com/AlexMercedCoder/merced-ai' },
    { name:'Hermes Agent', role:'Evolving personal agent', slug:'hermes-agent', href:'https://github.com/NousResearch/hermes-agent' },
    { name:'Prime Agent', role:'Self-improving RLM agent', slug:'prime-agent', href:'https://github.com/PrimeIntellect-ai/prime-agent' },
  ] },
  { number:'04', label:'INTEROPERABILITY', title:'Open standards', slug:'open-standards', color:'pink', summary:'Make skills, context, profiles, and graphs portable across tools.', items:[
    { name:'Agent Skills', role:'Reusable capability folders', slug:'agent-skills', href:'https://agentskills.io' },
    { name:'MCP', role:'Tools, data & workflow connection', slug:'model-context-protocol', href:'https://modelcontextprotocol.io' },
    { name:'OAP', role:'Portable agent profiles', slug:'open-agent-profile', href:'https://github.com/alexmerced-oss/open-agent-profile' },
    { name:'AGS', role:'Portable agentic graphs', slug:'agentic-graph-specification', href:'https://github.com/AlexMercedCoder/agentic-graph-spec' },
  ] },
];

const tests: [string, string, string][] = [
  ['Replaceable','Can one component be swapped without rebuilding the system?','replaceable'],
  ['Inspectable','Can a builder understand what runs and why?','inspectable'],
  ['Portable','Can identity, skills, context, and work move?','portable'],
  ['Bounded','Are authority and approval requirements explicit?','bounded'],
  ['Grounded','Do agents share durable data and semantic meaning?','grounded'],
  ['Auditable','Can people reconstruct decisions and outcomes?','auditable'],
];

const booksStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AI and agentic systems books by Alex Merced',
  numberOfItems: aiBooks.length,
  itemListElement: aiBooks.map((book, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: { '@type': 'Book', name: book.title, description: book.description, url: book.href, author: { '@type': 'Person', name: 'Alex Merced' } },
  })),
};

export default function Home() {
  return <main>
    <WebMCP />
    <SiteHeader />

    <section className="hero wrap" id="top"><div className="hero-main"><p className="overline">A REFERENCE ARCHITECTURE FOR COMPOSABLE AI</p><h1>An open agentic<br/>platform is a <em>stack,</em><br/>not a suite.</h1><p className="intro">Build agentic systems from open data foundations, model choice, interchangeable harnesses, and portable standards, without surrendering the seams.</p><div className="hero-actions"><a href="#stack" className="action primary">EXPLORE THE STACK ↓</a><Link href="/knowledge-base" className="action">READ THE KNOWLEDGE BASE →</Link></div></div><div className="stack-visual" aria-label="Four layer open agentic platform architecture"><div className="visual-head"><span>REFERENCE STACK / 01</span><span>COMPOSABLE BY DESIGN</span></div>{layers.slice().reverse().map(layer=><div className={`visual-layer ${layer.color}`} key={layer.number}><span>{layer.number}</span><b>{layer.title}</b><small>{layer.items.length} OPEN COMPONENTS</small></div>)}<div className="visual-base"><span>YOUR POLICIES</span><span>YOUR INFRASTRUCTURE</span><span>YOUR CONTROL</span></div></div></section>

    <section className="definition" id="definition"><div className="wrap definition-grid"><p className="section-label">DEFINITION / 00</p><div><h2>Open components.<br/>Explicit contracts.<br/><em>Operational freedom.</em></h2><p>An open agentic platform is an architecture in which data, models, execution, and interoperability remain independently understandable and replaceable. “Open” may describe source, weights, formats, or interfaces. A trustworthy architecture labels the difference instead of flattening it.</p></div></div></section>

    <section className="stack wrap" id="stack"><div className="section-intro"><p className="section-label">ARCHITECTURE / 01–04</p><div><h2>Four layers.<br/>No mandatory vendor.</h2><p>Each layer answers a different question. Together they turn model capability into durable, governable work. Every name below has a full explanation in the <Link href="/knowledge-base">knowledge base</Link>.</p></div></div><div className="layer-list">{layers.map(layer=><article className={`layer-card ${layer.color}`} key={layer.number}><div className="layer-title"><span>{layer.number} / {layer.label}</span><h3>{layer.title}</h3><p>{layer.summary}</p><Link className="layer-kb-link" href={`/knowledge-base/${layer.slug}`}>Read the layer explainer →</Link></div><div className="component-list">{layer.items.map((item)=><Link href={`/knowledge-base/${item.slug}`} key={item.name}><b>{item.name}</b><span>{item.role}</span><i>→</i></Link>)}</div></article>)}</div></section>

    <section className="openness" id="tests"><div className="wrap"><div className="section-intro light"><p className="section-label">THE OPENNESS TEST / 05</p><div><h2>Open is a property<br/>of the whole system.</h2><p>A pile of open-source parts can still produce a closed architecture. Test the relationships as carefully as the licenses.</p></div></div><div className="test-grid">{tests.map(([title,body,slug],index)=><article key={title}><span>{String(index+1).padStart(2,'0')}</span><h3><Link href={`/knowledge-base/${slug}`}>{title}</Link></h3><p>{body}</p></article>)}</div></div></section>

    <section className="build wrap" id="build"><div className="section-intro"><p className="section-label">A PRACTICAL PATH / 06</p><div><h2>Build from the ground up.</h2><p>Start with durable context. Add intelligence and execution only after control boundaries are clear.</p></div></div><ol><li><span>1</span><div><b>Ground the system</b><p>Choose open formats, a catalog, and a semantic layer that agents and people can share.</p></div></li><li><span>2</span><div><b>Define the contracts</b><p>Express identity, skills, tools, workflows, policy, and approval points in portable forms.</p></div></li><li><span>3</span><div><b>Compose the runtime</b><p>Select models, routers, brokers, and harnesses according to the work, not brand gravity.</p></div></li><li><span>4</span><div><b>Observe and evolve</b><p>Retain evidence, evaluate outcomes, and replace components as requirements change.</p></div></li></ol></section>

    <section className="books" id="books"><div className="wrap"><div className="books-head"><div><p className="section-label">THE OPEN AI LIBRARY / 07</p><h2>Read the systems<br/>behind the stack.</h2></div><div><p>Alex Merced has written {aiBooks.length} nonfiction books on AI, agents, semantic context, production architecture, and the data foundations beneath them.</p><a href="https://books.alexmerced.com" rel="noopener">Browse the complete book catalog ↗</a></div></div><div className="book-shelf" role="list" aria-label="AI books by Alex Merced">{aiBooks.map((book,index)=><article className="book-card" role="listitem" key={book.title}><a href={book.href} rel="noopener"><div className="book-cover"><Image src={book.cover} alt={`Cover of ${book.title}`} width={350} height={500} sizes="(max-width: 520px) 220px, 260px"/><span>{String(index+1).padStart(2,'0')}</span></div><div className="book-copy"><h3>{book.title}</h3><p>{book.description}</p><b>View book ↗</b></div></a></article>)}</div><p className="shelf-note">Scroll to explore all {aiBooks.length} titles →</p></div></section>

    <section className="closing"><div className="wrap"><p className="section-label">THE PRINCIPLE</p><h2>Own the architecture.<br/><em>Keep the options.</em></h2><Link href="/knowledge-base">EXPLORE THE KNOWLEDGE BASE →</Link></div></section>

    <NewsletterBand />
    <SiteFooter />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(booksStructuredData) }} />
  </main>;
}
