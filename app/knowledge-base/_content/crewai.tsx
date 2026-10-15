import type { Article } from './types';

export const article: Article = {
  slug: 'crewai',
  title: 'CrewAI',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / ORCHESTRATION FRAMEWORK',
  summary: 'An MIT-licensed Python framework for multi-agent systems: crews of role-based agents for open-ended work, and event-driven Flows with state for precise control.',
  standfirst: 'CrewAI is a standalone Python framework with its own primitives for agents, tasks, crews, flows, and tools. Crews give agents autonomy; Flows give the developer control. Most production systems use both.',
  keywords: ['CrewAI', 'CrewAI Flows', 'multi-agent framework', 'AI agent framework', 'Python agents', 'agent orchestration', 'MCP', 'human in the loop'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'crews', label: 'Crews, agents, and tasks' },
    { id: 'flows', label: 'Flows' },
    { id: 'models', label: 'Model providers' },
    { id: 'mcp', label: 'MCP' },
    { id: 'telemetry', label: 'Telemetry' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'CrewAI on GitHub', href: 'https://github.com/crewAIInc/crewAI', note: 'Source under the MIT license, install instructions, and examples.' },
    { label: 'CrewAI Flows', href: 'https://docs.crewai.com/en/concepts/flows', note: 'Official docs for start, listen, and router steps, state, persistence, and human feedback.' },
    { label: 'CrewAI telemetry', href: 'https://docs.crewai.com/en/telemetry', note: 'What is collected by default and how to turn it off.' },
  ],
  related: ['harnesses-and-brokers', 'langgraph', 'model-context-protocol'],
  updated: '2026-10-15',
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        CrewAI is an open source Python framework for building multi-agent workflows, released under the MIT license.
        It is standalone, with its own primitives for agents, tasks, crews, flows, tools, and orchestration. A
        commercial product, the CrewAI AMP Suite, adds managed deployment, observability, and governance on top.
      </p>

      <h2 id="crews">Crews, agents, and tasks</h2>
      <p>
        An agent has a role, a goal, a backstory, a model, and tools. A crew is a team of agents working through tasks.
        The default process is sequential. A hierarchical process adds a manager that delegates tasks and validates
        results. Agents can also use memory, knowledge sources, and checkpointing.
      </p>

      <h2 id="flows">Flows</h2>
      <p>
        Flows are event-driven workflows for when you want control rather than autonomy. A method marked{' '}
        <code>@start()</code> begins the flow, <code>@listen()</code> runs a step when another finishes, and{' '}
        <code>@router()</code> branches on a result. State can be a plain dictionary or a typed Pydantic model,{' '}
        <code>@persist</code> saves it (SQLite by default) so a run can resume, and <code>@human_feedback</code> pauses
        for a person&apos;s approval or review. A flow can call crews as steps, which is how the two fit together.
      </p>

      <h2 id="models">Model providers</h2>
      <p>
        CrewAI uses native SDKs for OpenAI, Anthropic, Google Gemini and Vertex AI, Azure, AWS Bedrock, and Snowflake
        Cortex, and routes other providers such as Mistral, Groq, and OpenRouter through LiteLLM. Local models work
        through Ollama or any self-hosted OpenAI-compatible endpoint. The default is OpenAI, so set the model
        explicitly.
      </p>

      <h2 id="mcp">MCP</h2>
      <p>
        Agents take MCP servers through an <code>mcps</code> field, over stdio, SSE, or Streamable HTTP, and the{' '}
        <code>crewai-tools</code> package offers an <code>MCPServerAdapter</code> for manual connection management.
        The adapter mainly exposes tools rather than prompts or resources. CrewAI&apos;s own docs say to trust an MCP
        server before using it.
      </p>

      <h2 id="telemetry">Telemetry</h2>
      <p>
        CrewAI collects anonymous usage telemetry by default: versions, crew and task metadata, tool usage counts, and
        similar signals, without prompts or outputs. Set <code>CREWAI_DISABLE_TELEMETRY</code> (or{' '}
        <code>OTEL_SDK_DISABLED</code>) to turn it off. Sharing full execution data requires opting in with{' '}
        <code>share_crew</code>.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        CrewAI is a framework for building your own harness, like LangGraph, rather than a finished agent. Crews suit
        open-ended work where role-based agents can explore; Flows suit work that needs explicit steps, typed state,
        and approval points, which is most work that touches production data.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Autonomy needs bounds.</b> Hierarchical crews delegate on their own; put approval and limits in a Flow around them.</li>
        <li><b>Telemetry is on by default.</b> Decide deliberately, and set the environment variable in every deployment where it should be off.</li>
        <li><b>Agent definitions are framework specific.</b> Roles, goals, and tasks do not move to another runtime without rewriting.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Many providers, local models, and OpenAI-compatible endpoints.</li>
        <li><b>Inspectable.</b> Strong. MIT source, and Flows make control flow explicit code.</li>
        <li><b>Portable.</b> Good for tools through MCP; crew and agent definitions are CrewAI specific.</li>
        <li><b>Bounded.</b> Depends on the build. Flows and human feedback make bounds easy to express; crews alone do not enforce them.</li>
        <li><b>Grounded.</b> Depends on the tools and data you connect.</li>
        <li><b>Auditable.</b> Good with persisted Flow state, plus whatever tracing you add.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        CrewAI is not a model, not a hosted agent, and not tied to LangChain. It is a library you build agent systems
        with.
      </p>
    </>
  );
}
