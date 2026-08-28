'use client';

import { useEffect } from 'react';

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

export default function WebMCP() {
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
    ];

    Promise.allSettled(tools.map((tool) => context.registerTool(tool, { signal: controller.signal })));
    return () => controller.abort();
  }, []);

  return null;
}
