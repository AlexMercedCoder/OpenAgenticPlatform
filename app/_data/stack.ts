/**
 * The four-layer reference stack and the six openness tests.
 * Shared by the homepage, the openness scorecard, and scripts/build-stack-diagram.mts
 * (Node runs that script directly, so keep this file free of imports).
 */
export type Component = { name: string; role: string; slug: string; href: string; example?: boolean };
export type Layer = { number: string; label: string; title: string; slug: string; color: string; summary: string; items: Component[] };

export const layers: Layer[] = [
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
    { name:'MagAgent', role:'Memory-first personal agent', slug:'magagent', href:'https://alexmercedai.com/knowledge-base/magagent', example:true },
    { name:'Mag Command Center', role:'Desktop cockpit for MagAgent', slug:'magagent', href:'https://alexmercedai.com/knowledge-base/magagent', example:true },
    { name:'Loro', role:'Governed agent harness', slug:'loro', href:'https://alexmercedai.com/knowledge-base/loro', example:true },
    { name:'Merced AI', role:'Agent broker', slug:'merced-ai', href:'https://alexmercedai.com/knowledge-base/merced-ai', example:true },
    { name:'Hermes Agent', role:'Evolving personal agent', slug:'hermes-agent', href:'https://github.com/NousResearch/hermes-agent' },
    { name:'Prime Agent', role:'Self-improving RLM agent', slug:'prime-agent', href:'https://github.com/PrimeIntellect-ai/prime-agent' },
  ] },
  { number:'04', label:'INTEROPERABILITY', title:'Open standards', slug:'open-standards', color:'pink', summary:'Make skills, context, profiles, and graphs portable across tools.', items:[
    { name:'Agent Skills', role:'Reusable capability folders', slug:'agent-skills', href:'https://agentskills.io' },
    { name:'MCP', role:'Tools, data & workflow connection', slug:'model-context-protocol', href:'https://modelcontextprotocol.io' },
    { name:'OAP', role:'Portable agent profiles', slug:'open-agent-profile', href:'https://alexmercedai.com/knowledge-base/open-agent-profile', example:true },
    { name:'AGS', role:'Portable agentic graphs', slug:'agentic-graph-specification', href:'https://alexmercedai.com/knowledge-base/agentic-graph-specification', example:true },
    { name:'AAIS', role:'Portable human approvals', slug:'agent-approval-interchange-specification', href:'https://alexmercedai.com/knowledge-base/agent-approval-interchange-specification', example:true },
  ] },
];

export const tests: [string, string, string][] = [
  ['Replaceable','Can one component be swapped without rebuilding the system?','replaceable'],
  ['Inspectable','Can a builder understand what runs and why?','inspectable'],
  ['Portable','Can identity, skills, context, and work move?','portable'],
  ['Bounded','Are authority and approval requirements explicit?','bounded'],
  ['Grounded','Do agents share durable data and semantic meaning?','grounded'],
  ['Auditable','Can people reconstruct decisions and outcomes?','auditable'],
];
