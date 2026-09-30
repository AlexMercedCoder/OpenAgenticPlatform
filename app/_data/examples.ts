/**
 * Alex Merced's own projects appear on this site only as short example implementations.
 * Their full pages live on alexmercedai.com (plan task P4.5).
 */
export type ExampleImplementation = {
  name: string;
  layer: 'harnesses-and-brokers' | 'open-standards';
  role: string;
  summary: string;
  href: string;
  source: string;
};

const AI = 'https://alexmercedai.com/knowledge-base';

export const exampleImplementations: ExampleImplementation[] = [
  { name: 'MagAgent', layer: 'harnesses-and-brokers', role: 'Memory-first personal agent', summary: 'A terminal-native Python agent built around persistent graph memory, portable agent profiles, and a broad tool surface.', href: `${AI}/magagent`, source: 'https://github.com/AlexMercedCoder/MagAgent' },
  { name: 'Mag Command Center', layer: 'harnesses-and-brokers', role: 'Desktop cockpit for MagAgent', summary: 'A cross-platform desktop app for MagAgent projects, agents, memory, and plugins. It ships as a packaged desktop release, not through a package registry.', href: `${AI}/magagent`, source: 'https://github.com/AlexMercedCoder/MagCommandCenter/releases' },
  { name: 'Loro', layer: 'harnesses-and-brokers', role: 'Governed agent harness', summary: 'A Python harness organized around explicit authority, identity-bound approvals, policy decisions, and durable audit records.', href: `${AI}/loro`, source: 'https://github.com/alexmerced-oss/loro' },
  { name: 'Merced AI', layer: 'harnesses-and-brokers', role: 'Agent broker', summary: 'A local-first broker that finds the agent harnesses installed on a machine and runs portable agent profiles across them.', href: `${AI}/merced-ai`, source: 'https://github.com/AlexMercedCoder/merced-ai' },
  { name: 'Open Agent Profile (OAP)', layer: 'open-standards', role: 'Portable agent profiles', summary: 'A specification for keeping a named agent in a file: role, model, tools, permissions, and what earlier sessions learned.', href: `${AI}/open-agent-profile`, source: 'https://github.com/alexmerced-oss/open-agent-profile' },
  { name: 'Agentic Graph Specification (AGS)', layer: 'open-standards', role: 'Portable agentic graphs', summary: 'A format for writing down how a project splits into bounded agentic loops, so the plan can be reviewed and priced before it runs.', href: `${AI}/agentic-graph-specification`, source: 'https://github.com/AlexMercedCoder/agentic-graph-spec' },
  { name: 'Agent Approval Interchange Specification (AAIS)', layer: 'open-standards', role: 'Portable human approvals', summary: 'A transport-neutral contract for pausing an agent and asking a person to authorize one exact action from any trusted interface.', href: `${AI}/agent-approval-interchange-specification`, source: 'https://github.com/alexmerced-oss/agent-approval-interchange-spec' },
];

export const examplesFor = (layer: string) => exampleImplementations.filter((entry) => entry.layer === layer);
