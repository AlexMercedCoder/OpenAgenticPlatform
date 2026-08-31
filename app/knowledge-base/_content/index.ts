import type { Article } from './types';

import { article as dataAndSemantics } from './data-and-semantics';
import { article as modelsAndRouting } from './models-and-routing';
import { article as harnessesAndBrokers } from './harnesses-and-brokers';
import { article as openStandards } from './open-standards';

import { article as apacheArrow } from './apache-arrow';
import { article as apacheParquet } from './apache-parquet';
import { article as apacheIceberg } from './apache-iceberg';
import { article as apachePolaris } from './apache-polaris';
import { article as apacheOssie } from './apache-ossie';

import { article as openWeightModels } from './open-weight-models';
import { article as openrouter } from './openrouter';
import { article as nousPortal } from './nous-portal';
import { article as localModelEndpoints } from './local-model-endpoints';
import { article as providerApis } from './provider-apis';

import { article as opencode } from './opencode';
import { article as pi } from './pi';
import { article as magagent } from './magagent';
import { article as loro } from './loro';
import { article as mercedAi } from './merced-ai';
import { article as hermesAgent } from './hermes-agent';
import { article as primeAgent } from './prime-agent';

import { article as agentSkills } from './agent-skills';
import { article as modelContextProtocol } from './model-context-protocol';
import { article as openAgentProfile } from './open-agent-profile';
import { article as agenticGraphSpecification } from './agentic-graph-specification';
import { article as agentApprovalInterchangeSpecification } from './agent-approval-interchange-specification';

import { article as replaceable } from './replaceable';
import { article as inspectable } from './inspectable';
import { article as portable } from './portable';
import { article as bounded } from './bounded';
import { article as grounded } from './grounded';
import { article as auditable } from './auditable';

import { article as glossary } from './glossary';

export const articles: Article[] = [
  dataAndSemantics,
  modelsAndRouting,
  harnessesAndBrokers,
  openStandards,

  apacheArrow,
  apacheParquet,
  apacheIceberg,
  apachePolaris,
  apacheOssie,

  openWeightModels,
  openrouter,
  nousPortal,
  localModelEndpoints,
  providerApis,

  opencode,
  pi,
  magagent,
  loro,
  mercedAi,
  hermesAgent,
  primeAgent,

  agentSkills,
  modelContextProtocol,
  openAgentProfile,
  agenticGraphSpecification,
  agentApprovalInterchangeSpecification,

  replaceable,
  inspectable,
  portable,
  bounded,
  grounded,
  auditable,

  glossary,
];

export const articlesBySlug = new Map(articles.map((entry) => [entry.slug, entry]));

export const layerArticles = articles.filter((entry) => entry.kind === 'layer');

export function technologiesFor(layerSlug: string): Article[] {
  return articles.filter((entry) => entry.kind === 'technology' && entry.layer === layerSlug);
}

export const conceptArticles = articles.filter((entry) => entry.kind === 'concept');
export const glossaryArticles = articles.filter((entry) => entry.kind === 'glossary');

export type { Article };
