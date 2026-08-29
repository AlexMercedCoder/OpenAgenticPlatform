export type AiBook = {
  title: string;
  description: string;
  href: string;
  cover: string;
};

export const aiBooks: AiBook[] = [
  { title: 'The 2026 Guide to Lakehouses, Apache Iceberg and Agentic AI', description: 'A comprehensive guide to lakehouse architecture and AI.', href: 'https://www.amazon.com/dp/B0GQNY21TD', cover: '/books/05.jpg' },
  { title: 'The Book on Agentic Analytics', description: 'Foundations of agentic data architecture.', href: 'https://www.amazon.com/dp/B0GQN4Q41Y', cover: '/books/06.jpg' },
  { title: 'Enabling Agentic Analytics with Apache Iceberg and Dremio', description: 'Building AI-ready lakehouse systems.', href: 'https://www.amazon.com/dp/B0GQXT6W3N', cover: '/books/07.jpg' },
  { title: 'Using AI Agents for Data Engineering and Data Analysis', description: 'A practical guide to AI-driven workflows.', href: 'https://www.amazon.com/dp/B0GR6PYJT9', cover: '/books/08.jpg' },
  { title: 'The AI Engineering Handbook', description: 'A full-stack reference for AI systems.', href: 'https://www.amazon.com/dp/B0GSS4R9FK', cover: '/books/09.jpg' },
  { title: 'AI-Ready Data', description: 'Designing data platforms for LLMs, agents, and RAG.', href: 'https://www.amazon.com/AI-Ready-Data-Designing-Platforms-Agents/dp/B0GSN7GLH2', cover: '/books/10.jpg' },
  { title: 'The 2026 Guide to AI-Assisted Development', description: 'Prompt engineering and agent workflows.', href: 'https://www.amazon.com/dp/B0GQW7CTML', cover: '/books/11.jpg' },
  { title: 'Apache Iceberg for Agentic AI', description: 'Connecting structured enterprise data to agentic systems.', href: 'https://www.amazon.com/dp/B0DYTX2WZY', cover: '/books/12.jpg' },
  { title: 'The Agentic Enterprise', description: 'Deploying AI agents across the modern organization.', href: 'https://www.amazon.com/dp/B0GSN3NNS5', cover: '/books/13.jpg' },
  { title: 'Constructing Context and Semantics for AI Agents', description: 'Building the context and meaning agents need.', href: 'https://www.amazon.com/dp/B0GSHRZNZ5', cover: '/books/14.jpg' },
  { title: 'Evaluating AI Systems', description: 'Testing LLMs, RAG, and agents.', href: 'https://www.amazon.com/dp/B0GSVPQ667', cover: '/books/16.jpg' },
  { title: 'The Economics of Labor in the AI Era', description: 'Disruption, adaptation, and the changing labor market.', href: 'https://www.amazon.com/dp/B0GSQSL344', cover: '/books/17.jpg' },
  { title: 'Governing AI Systems', description: 'Practical approaches to accountable AI governance.', href: 'https://www.amazon.com/dp/B0GSMVQ1TH', cover: '/books/18.jpg' },
  { title: 'Shipping AI', description: 'Taking AI from prototype to production systems.', href: 'https://www.amazon.com/dp/B0GSR2GRZX', cover: '/books/19.jpg' },
  { title: 'Building Knowledge Systems for AI', description: 'Graphs, RAG, memory, and context.', href: 'https://www.amazon.com/dp/B0GSWFSSRC', cover: '/books/20.jpg' },
  { title: 'The AI Lakehouse', description: 'Architecting data platforms for AI.', href: 'https://www.amazon.com/dp/B0GSMQ6M2J', cover: '/books/21.jpg' },
  { title: 'AI Application Architecture', description: 'Patterns for building intelligent systems.', href: 'https://www.amazon.com/dp/B0GSVFT3H4', cover: '/books/22.jpg' },
  { title: 'The Economics of AI', description: 'Cost, latency, and infrastructure tradeoffs.', href: 'https://www.amazon.com/dp/B0GSPGSKXC', cover: '/books/23.jpg' },
  { title: 'AI and Agents for Normal People', description: 'Everyday AI tools explained without technical jargon.', href: 'https://www.amazon.com/dp/B0H59GBTMW', cover: '/books/38.jpg' },
  { title: 'The No Lock-in Apache Iceberg Lakehouse with Agentic Analytics', description: 'Portable lakehouse architecture with open catalogs and agents.', href: 'https://www.amazon.com/dp/B0H49TDNX3', cover: '/books/39.jpg' },
  { title: 'Being Productive with Google AI', description: 'Gemini, NotebookLM, Veo, Gemini Spark, and Jules.', href: 'https://www.amazon.com/dp/B0H77DBD83', cover: '/books/40.jpg' },
  { title: 'Being Productive with Open Models', description: 'Open models with OpenCode, Pi, and Hermes.', href: 'https://www.amazon.com/dp/B0H76JQ55R', cover: '/books/41.jpg' },
  { title: 'Being Productive with Claude', description: 'Claude.ai, Claude Code, and Claude Dispatch.', href: 'https://www.amazon.com/dp/B0H76BTLMF', cover: '/books/42.jpg' },
  { title: 'Being Productive with OpenAI Codex', description: 'Building documents, media, websites, and applications with Codex.', href: 'https://www.amazon.com/dp/B0H766477L', cover: '/books/43.jpg' },
  { title: 'The Book on Data, Data Engineering, Data Analytics, and Agentic AI, Volume 2', description: 'SQL analytics, BI, and agentic AI for modern data platforms.', href: 'https://www.amazon.com/dp/B0GZVJB6ML', cover: '/books/44.jpg' },
  { title: 'The Book on Data, Data Engineering, Data Analytics, and Agentic AI, Volume 1', description: 'Modern data systems, engineering, analytics, and AI.', href: 'https://www.amazon.com/dp/B0GZTXJQ1C', cover: '/books/45.jpg' },
  { title: 'Dremio and the Semantic Layer', description: 'Providing meaning and context for AI.', href: 'https://www.amazon.com/dp/B0GWF7PFDG', cover: '/books/46.jpg' },
  { title: 'Hands-On Agentic Engineering', description: 'A practical guide to building multi-agent systems.', href: 'https://www.amazon.com/dp/B0GWTZ1394', cover: '/books/47.jpg' },
  { title: 'The Lakehouse Built for Everyone', description: 'From laptop prototypes to enterprise-scale agentic AI.', href: 'https://www.amazon.com/dp/B0GYL5Q5YV', cover: '/books/48.jpg' },
  { title: 'Being Productive with Grok and Cursor', description: 'Grok, Cursor, MCP, and local-model development workflows.', href: 'https://www.amazon.com/dp/B0H7Z6RS5Y', cover: '/books/50.jpg' },
  { title: 'Being Productive with Microsoft Copilot', description: 'The Microsoft Copilot and GitHub Copilot ecosystem.', href: 'https://www.amazon.com/dp/B0H7WZ19NJ', cover: '/books/51.jpg' },
];
