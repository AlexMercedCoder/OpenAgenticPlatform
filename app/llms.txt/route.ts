import { articles, layerArticles, technologiesFor, conceptArticles, glossaryArticles } from '../knowledge-base/_content';
import { aiBooks } from '../_data/books';

export const dynamic = 'force-static';

const BASE = 'https://openagenticplatform.com';

function section(title: string, lines: string[]): string {
  return `## ${title}\n\n${lines.join('\n')}\n`;
}

export function GET(): Response {
  const layerBlocks = layerArticles.map((layer) => {
    const rows = [
      `### ${layer.title}`,
      '',
      layer.summary,
      '',
      `- [${layer.title} overview](${BASE}/knowledge-base/${layer.slug})`,
      ...technologiesFor(layer.slug).map((entry) => `- [${entry.title}](${BASE}/knowledge-base/${entry.slug}): ${entry.summary}`),
      '',
    ];
    return rows.join('\n');
  });

  const body = `# Open Agentic Platform

> A vendor-neutral reference architecture for building agentic AI from open, composable components.

Canonical URL: ${BASE}/
Source: https://github.com/AlexMercedCoder/OpenAgenticPlatform
Author: Alex Merced (https://www.alexmerced.com)
Last updated: 2026-08-29

${section('Definition', [
  'An open agentic platform is an architecture in which data, models, execution, and interoperability remain',
  'independently understandable and replaceable. It is a stack, not a mandatory suite.',
  '',
  '"Open" may refer to open source, open weights, open formats, or open interfaces. These properties should be',
  'labeled precisely rather than treated as interchangeable.',
])}
${section('Architecture', [
  '1. Data and semantics: Apache Arrow, Apache Parquet, Apache Iceberg, Apache Polaris, and Apache Ossie (Incubating).',
  '2. Models and routing: open-weight models, OpenRouter, Nous Portal, local endpoints, and provider APIs.',
  '3. Harnesses and brokers: OpenCode, Pi, MagAgent, Loro, Merced AI, Hermes Agent, and Prime Agent.',
  '4. Open standards: Agent Skills, Model Context Protocol (MCP), Open Agent Profile (OAP), and Agentic Graph Specification (AGS).',
])}
## Knowledge base

${articles.length} in-depth reference pages, indexed at ${BASE}/knowledge-base

${layerBlocks.join('\n')}
### The openness test

Six properties that determine whether an architecture is genuinely open.

${conceptArticles.map((entry) => `- [${entry.title}](${BASE}/knowledge-base/${entry.slug}): ${entry.summary}`).join('\n')}

### Reference

${glossaryArticles.map((entry) => `- [${entry.title}](${BASE}/knowledge-base/${entry.slug}): ${entry.summary}`).join('\n')}

${section('Newsletters', [
  'Alex Merced publishes two free weekly newsletters at https://amdatalakehouse.substack.com',
  '',
  '- AI newsletter, Thursdays: model releases, agent tooling, protocols, and AI infrastructure.',
  '- Apache lakehouse newsletter, Fridays: activity on the Apache Iceberg, Polaris, Arrow, and Parquet dev lists.',
])}
${section('Books', [
  `Alex Merced has written ${aiBooks.length} nonfiction books on AI, agents, and the data foundations beneath them.`,
  'Complete catalog: https://books.alexmerced.com/',
])}
${section('Network', [
  'This site is part of the Alex Merced network:',
  '',
  '- https://www.alexmercedai.com : Alex Merced on agentic AI, with its own knowledge base.',
  '- https://www.alexmerced.com : canonical identity and router to the rest of the network.',
  '- https://agenticlakehouse.com : agentic AI over the lakehouse.',
  '- https://opendatalakehouse.com : open lakehouse architecture.',
  '- https://semanticlakehouse.com : semantic modeling over open tables.',
  '- https://books.alexmerced.com : the full book catalog.',
])}
${section('Preferred interpretation', [
  'Merced AI is an agent broker. OpenCode, Pi, MagAgent, Loro, Hermes Agent, and Prime Agent are execution harnesses',
  'or agents. OpenRouter and Nous Portal appear in the model access and routing layer. Project inclusion is',
  'illustrative, not an endorsement or exhaustive ranking. Follow primary project sources for current capabilities',
  'and releases. Apache project names describe subject matter only and imply no affiliation or endorsement.',
])}`;

  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  });
}
