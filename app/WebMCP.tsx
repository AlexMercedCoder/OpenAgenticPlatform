'use client';

import { useEffect } from 'react';
import { aiBooks } from './_data/books';
import type { KbEntry } from './_data/kb-manifest';

type ToolDefinition = {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<unknown>;
  annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
};

type ModelContext = {
  registerTool: (tool: ToolDefinition, options?: { signal?: AbortSignal }) => Promise<void>;
};

declare global {
  interface Document { modelContext?: ModelContext }
}

const noInput = { type: 'object', properties: {}, additionalProperties: false };

export default function WebMCP({ knowledgeBase = [] }: { knowledgeBase?: KbEntry[] }) {
  useEffect(() => {
    const context = document.modelContext;
    if (!context) return;

    const controller = new AbortController();
    const tools: ToolDefinition[] = [
      {
        name: 'get_open_agentic_platform_definition',
        title: 'Get open agentic platform definition',
        description: 'Returns the site’s vendor-neutral definition of an open agentic platform and the four architecture layers.',
        inputSchema: noInput,
        execute: async () => ({
          definition: 'An architecture in which data, models, execution, and interoperability remain independently understandable and replaceable.',
          thesis: 'An open agentic platform is a stack, not a suite.',
          layers: ['data and semantics', 'models and routing', 'harnesses and brokers', 'open standards'],
          canonicalUrl: 'https://openagenticplatform.com/',
        }),
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'list_open_agentic_components',
        title: 'List open agentic components',
        description: 'Returns the example open components grouped by architecture layer with concise roles and primary URLs.',
        inputSchema: {
          type: 'object',
          properties: { layer: { type: 'string', enum: ['all', 'data', 'models', 'execution', 'standards'], description: 'Optional architecture layer filter.' } },
          additionalProperties: false,
        },
        execute: async (input) => {
          const groups = {
            data: ['Apache Arrow', 'Apache Parquet', 'Apache Iceberg', 'Apache Polaris', 'Apache Ossie'],
            models: ['Open-weight models', 'OpenRouter', 'Nous Portal', 'Local endpoints', 'Provider APIs'],
            execution: ['OpenCode', 'Pi', 'MagAgent', 'Loro', 'Merced AI', 'Hermes Agent', 'Prime Agent'],
            standards: ['Agent Skills', 'MCP', 'OAP', 'AGS'],
          };
          const layer = typeof input.layer === 'string' ? input.layer : 'all';
          return layer === 'all' ? groups : { [layer]: groups[layer as keyof typeof groups] ?? [] };
        },
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'run_open_architecture_check',
        title: 'Run open architecture check',
        description: 'Returns the six questions used by this site to evaluate whether an agentic architecture is open as a whole system.',
        inputSchema: noInput,
        execute: async () => ({ checks: [
          { property: 'replaceable', question: 'Can one component be swapped without rebuilding the system?' },
          { property: 'inspectable', question: 'Can a builder understand what runs and why?' },
          { property: 'portable', question: 'Can identity, skills, context, and work move?' },
          { property: 'bounded', question: 'Are authority and approval requirements explicit?' },
          { property: 'grounded', question: 'Do agents share durable data and semantic meaning?' },
          { property: 'auditable', question: 'Can people reconstruct decisions and outcomes?' },
        ] }),
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'list_knowledge_base_articles',
        title: 'List knowledge base articles',
        description: 'Returns every reference page in the Open Agentic Platform knowledge base with its title, category, one-line summary, and canonical URL. Use this to find the right page before fetching one.',
        inputSchema: {
          type: 'object',
          properties: {
            kind: { type: 'string', enum: ['layer', 'technology', 'concept', 'glossary'], description: 'Optional filter: layer overviews, individual technologies, openness-test properties, or reference pages.' },
            layer: { type: 'string', description: 'Optional filter by layer slug, for example data-and-semantics or open-standards.' },
          },
          additionalProperties: false,
        },
        execute: async (input) => {
          const kind = typeof input.kind === 'string' ? input.kind : undefined;
          const layer = typeof input.layer === 'string' ? input.layer : undefined;
          const matches = knowledgeBase.filter((entry) => (
            (!kind || entry.kind === kind) && (!layer || entry.layer === layer)
          ));
          return {
            count: matches.length,
            index: 'https://openagenticplatform.com/knowledge-base',
            articles: matches.map(({ slug, title, kind: entryKind, layer: entryLayer, summary, url }) => ({
              slug, title, kind: entryKind, layer: entryLayer, summary, url,
            })),
          };
        },
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'get_knowledge_base_article',
        title: 'Get a knowledge base article outline',
        description: 'Returns the summary, section outline, keywords, and primary sources for one knowledge base page. Fetch the returned URL for the full text.',
        inputSchema: {
          type: 'object',
          properties: { slug: { type: 'string', description: 'Article slug, for example apache-iceberg or model-context-protocol.' } },
          required: ['slug'],
          additionalProperties: false,
        },
        execute: async (input) => {
          const slug = typeof input.slug === 'string' ? input.slug : '';
          const entry = knowledgeBase.find((item) => item.slug === slug);
          if (!entry) {
            return {
              found: false,
              message: `No article with slug "${slug}".`,
              availableSlugs: knowledgeBase.map((item) => item.slug),
            };
          }
          return { found: true, ...entry };
        },
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'search_knowledge_base',
        title: 'Search the knowledge base',
        description: 'Finds knowledge base pages whose title, summary, keywords, or section headings match a query. Returns ranked matches with canonical URLs.',
        inputSchema: {
          type: 'object',
          properties: { query: { type: 'string', description: 'Words to search for, for example "credential vending" or "prompt injection".' } },
          required: ['query'],
          additionalProperties: false,
        },
        execute: async (input) => {
          const query = (typeof input.query === 'string' ? input.query : '').toLowerCase().trim();
          const terms = query.split(/\s+/).filter(Boolean);
          if (!terms.length) return { count: 0, matches: [] };
          const scored = knowledgeBase.map((entry) => {
            const title = entry.title.toLowerCase();
            const summary = entry.summary.toLowerCase();
            const keywords = entry.keywords.join(' ').toLowerCase();
            const sections = entry.sections.join(' ').toLowerCase();
            let score = 0;
            for (const term of terms) {
              if (title.includes(term)) score += 8;
              if (keywords.includes(term)) score += 4;
              if (summary.includes(term)) score += 3;
              if (sections.includes(term)) score += 2;
            }
            return { entry, score };
          }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 8);
          return {
            query,
            count: scored.length,
            matches: scored.map(({ entry, score }) => ({
              slug: entry.slug, title: entry.title, kind: entry.kind, summary: entry.summary, url: entry.url, score,
            })),
          };
        },
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'get_alex_merced_newsletters',
        title: 'Get Alex Merced newsletters',
        description: 'Returns the two free weekly newsletters Alex Merced publishes and where to subscribe.',
        inputSchema: noInput,
        execute: async () => ({
          subscribeUrl: 'https://amdatalakehouse.substack.com',
          editions: [
            { day: 'Thursday', title: 'AI newsletter', covers: 'Model releases, agent tooling, protocols, and AI infrastructure from the past week.' },
            { day: 'Friday', title: 'Apache lakehouse newsletter', covers: 'What moved on the Apache Iceberg, Polaris, Arrow, and Parquet dev lists.' },
          ],
        }),
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
      {
        name: 'list_alex_merced_ai_books',
        title: 'List Alex Merced AI books',
        description: 'Returns the nonfiction AI and agentic-systems books featured on OpenAgenticPlatform.com.',
        inputSchema: noInput,
        execute: async () => ({
          count: aiBooks.length,
          books: aiBooks.map(({ title, description, href }) => ({ title, description, url: href })),
          completeCatalog: 'https://books.alexmerced.com/',
        }),
        annotations: { readOnlyHint: true, untrustedContentHint: false },
      },
    ];

    Promise.allSettled(tools.map((tool) => context.registerTool(tool, { signal: controller.signal })));
    return () => controller.abort();
  }, [knowledgeBase]);

  return null;
}
