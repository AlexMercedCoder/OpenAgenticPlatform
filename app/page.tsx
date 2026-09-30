import Link from 'next/link';
import Image from 'next/image';
import WebMCP from './WebMCP';
import { SiteHeader } from './_components/SiteHeader';
import { NewsletterBand, SiteFooter } from './_components/SiteFooter';
import { aiBooks, bookPage } from './_data/books';
import { kbManifest } from './_data/kb-manifest';
import { layers, tests } from './_data/stack';

export default function Home() {
  return <main>
    <WebMCP knowledgeBase={kbManifest} />
    <SiteHeader />

    <section className="hero wrap" id="top"><div className="hero-main"><p className="overline">A REFERENCE ARCHITECTURE FOR COMPOSABLE AI</p><h1>An open agentic<br/>platform is a <em>stack,</em><br/>not a suite.</h1><p className="intro">Build agentic systems from open data foundations, model choice, interchangeable harnesses, and portable standards, without surrendering the seams.</p><div className="hero-actions"><a href="#stack" className="action primary">EXPLORE THE STACK ↓</a><Link href="/knowledge-base" className="action">READ THE KNOWLEDGE BASE →</Link></div></div><div className="stack-visual" aria-label="Four layer open agentic platform architecture"><div className="visual-head"><span>REFERENCE STACK / 01</span><span>COMPOSABLE BY DESIGN</span></div>{layers.slice().reverse().map(layer=><div className={`visual-layer ${layer.color}`} key={layer.number}><span>{layer.number}</span><b>{layer.title}</b><small>{layer.items.length} OPEN COMPONENTS</small></div>)}<div className="visual-base"><span>YOUR POLICIES</span><span>YOUR INFRASTRUCTURE</span><span>YOUR CONTROL</span></div></div></section>

    <section className="anthem" id="anthem"><div className="wrap"><div className="anthem-head"><div><p className="section-label">THE ANTHEM / VIDEO</p><h2>Open the stack.<br/><em>Keep the options.</em></h2></div><p>A beat-synced visual manifesto for composable AI: open data foundations, model choice, interchangeable execution, and portable standards.</p></div><figure className="anthem-figure"><div className="anthem-frame"><video controls preload="metadata" playsInline poster="/open-the-stack-poster.jpg" width={1280} height={720}><source src="/open-the-stack.mp4" type="video/mp4"/>Your browser does not support embedded video. <a href="/open-the-stack.mp4">Download “Open the Stack.”</a></video></div><figcaption>7 minutes 37 seconds · Press play with sound for the full manifesto.</figcaption></figure></div></section>

    <section className="definition" id="definition"><div className="wrap definition-grid"><p className="section-label">DEFINITION / 00</p><div><h2>Open components.<br/>Explicit contracts.<br/><em>Operational freedom.</em></h2><p>An open agentic platform is an architecture in which data, models, execution, and interoperability remain independently understandable and replaceable. “Open” may describe source, weights, formats, or interfaces. A trustworthy architecture labels the difference instead of flattening it.</p></div></div></section>

    <section className="stack wrap" id="stack"><div className="section-intro"><p className="section-label">ARCHITECTURE / 01 TO 04</p><div><h2>Four layers.<br/>No mandatory vendor.</h2><p>Each layer answers a different question. Together they turn model capability into durable, governable work. Every name below has a full explanation in the <Link href="/knowledge-base">knowledge base</Link>. Names marked ↗ are example implementations Alex Merced builds; their full pages live on <a href="https://alexmercedai.com" rel="noopener">alexmercedai.com</a>.</p></div></div><div className="layer-list">{layers.map(layer=><article className={`layer-card ${layer.color}`} key={layer.number}><div className="layer-title"><span>{layer.number} / {layer.label}</span><h3>{layer.title}</h3><p>{layer.summary}</p><Link className="layer-kb-link" href={`/knowledge-base/${layer.slug}`}>Read the layer explainer →</Link></div><div className="component-list">{layer.items.map((item)=>item.example?<a href={item.href} rel="noopener" className="example" key={item.name}><b>{item.name}</b><span>{item.role} (example implementation)</span><i>↗</i></a>:<Link href={`/knowledge-base/${item.slug}`} key={item.name}><b>{item.name}</b><span>{item.role}</span><i>→</i></Link>)}</div></article>)}</div><aside className="diagram-download" aria-labelledby="diagram-download-title"><div><p className="section-label">DOWNLOAD / REFERENCE STACK</p><h3 id="diagram-download-title">Use the diagram in your own docs.</h3><p>The four layers and their components as one image. Free to reuse and adapt under <a href="https://creativecommons.org/licenses/by/4.0/" rel="license noopener">CC BY 4.0</a>; credit Alex Merced, openagenticplatform.com.</p></div><ul><li><a href="/open-agentic-platform-stack.svg" download data-network-event="diagram_download_svg">SVG, adapts to light and dark ↓</a></li><li><a href="/open-agentic-platform-stack-light.png" download data-network-event="diagram_download_png">PNG, light, 2400 px ↓</a></li><li><a href="/open-agentic-platform-stack-dark.png" download data-network-event="diagram_download_png">PNG, dark, 2400 px ↓</a></li></ul></aside></section>

    <section className="openness" id="tests"><div className="wrap"><div className="section-intro light"><p className="section-label">THE OPENNESS TEST / 06</p><div><h2>Open is a property<br/>of the whole system.</h2><p>A pile of open-source parts can still produce a closed architecture. Test the relationships as carefully as the licenses.</p></div></div><div className="test-grid">{tests.map(([title,body,slug],index)=><article key={title}><span>{String(index+1).padStart(2,'0')}</span><h3><Link href={`/knowledge-base/${slug}`}>{title}</Link></h3><p>{body}</p></article>)}</div><p className="openness-cta"><Link href="/openness-scorecard" className="action primary" data-network-event="openness_scorecard_open">SCORE YOUR STACK →</Link><span>Interactive, runs in your browser. Download the result as JSON or print it.</span></p></div></section>

    <section className="wrap" id="scorecards" style={{paddingBlock:'4rem'}}>
      <p className="section-label">WORKED SCORECARDS</p>
      <h2>Score two possible stacks.</h2>
      <p>These are illustrative designs, not ratings of named vendors. Give each test 0 (absent), 1 (partial), or 2 (demonstrated). Record the evidence before buying or building.</p>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:620,textAlign:'left'}}>
          <thead><tr><th>Test</th><th>Composable stack</th><th>Single-suite stack</th></tr></thead>
          <tbody>
            <tr><th>Replaceable</th><td>2: engine and model APIs are swappable</td><td>0: proprietary orchestration couples both</td></tr>
            <tr><th>Inspectable</th><td>2: prompts, tools, and traces are exported</td><td>1: console shows traces but no export</td></tr>
            <tr><th>Portable</th><td>2: profile and work use open schemas</td><td>0: agent state is trapped in the suite</td></tr>
            <tr><th>Bounded</th><td>2: explicit tool scopes and approvals</td><td>1: role permissions without per-action approval</td></tr>
            <tr><th>Grounded</th><td>2: governed metrics and versioned tables</td><td>1: connected data without shared metrics</td></tr>
            <tr><th>Auditable</th><td>2: run, approval, and data versions recorded</td><td>1: partial logs with short retention</td></tr>
            <tr><th>Total</th><td><strong>12 / 12</strong></td><td><strong>4 / 12</strong></td></tr>
          </tbody>
        </table>
      </div>
      <p>Use the <Link href="/knowledge-base">knowledge base</Link> to define each criterion, then score your own deployment with evidence in the <Link href="/openness-scorecard">interactive openness scorecard</Link>.</p>
    </section>

    <section className="build wrap" id="build"><div className="section-intro"><p className="section-label">A PRACTICAL PATH / 06</p><div><h2>Build from the ground up.</h2><p>Start with durable context. Add intelligence and execution only after control boundaries are clear.</p></div></div><ol><li><span>1</span><div><b>Ground the system</b><p>Choose open formats, a catalog, and a semantic layer that agents and people can share.</p></div></li><li><span>2</span><div><b>Define the contracts</b><p>Express identity, skills, tools, workflows, policy, and approval points in portable forms.</p></div></li><li><span>3</span><div><b>Compose the runtime</b><p>Select models, routers, brokers, and harnesses according to the work, not brand gravity.</p></div></li><li><span>4</span><div><b>Observe and evolve</b><p>Retain evidence, evaluate outcomes, and replace components as requirements change.</p></div></li></ol></section>

    <section className="books" id="books"><div className="wrap"><div className="books-head"><div><p className="section-label">THE OPEN AI LIBRARY / 07</p><h2>Read the systems<br/>behind the stack.</h2></div><div><p>Alex Merced has written {aiBooks.length} nonfiction books on AI, agents, semantic context, production architecture, and the data foundations beneath them.</p><a href="https://books.alexmerced.com" rel="noopener">Browse the complete book catalog ↗</a></div></div><div className="book-shelf" role="list" aria-label="AI books by Alex Merced">{aiBooks.map((book,index)=><article className="book-card" role="listitem" key={book.title}><a href={bookPage(book)} rel="noopener"><div className="book-cover"><Image src={book.cover} alt={`Cover of ${book.title}`} width={350} height={500} sizes="(max-width: 520px) 220px, 260px"/><span>{String(index+1).padStart(2,'0')}</span></div><div className="book-copy"><h3>{book.title}</h3><p>{book.description}</p><b>About the book ↗</b></div></a><a className="book-buy" href={book.amazon} rel="noopener" data-network-event="book_amazon_click">Buy on Amazon ↗</a></article>)}</div><p className="shelf-note">Scroll to explore all {aiBooks.length} titles →</p></div></section>

    <section className="closing"><div className="wrap"><p className="section-label">THE PRINCIPLE</p><h2>Own the architecture.<br/><em>Keep the options.</em></h2><Link href="/knowledge-base">EXPLORE THE KNOWLEDGE BASE →</Link></div></section>

    <NewsletterBand />
    <SiteFooter />
  </main>;
}
