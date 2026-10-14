import type { Article } from './types';

export const article: Article = {
  slug: 'langgraph',
  title: 'LangGraph',
  kind: 'technology',
  layer: 'harnesses-and-brokers',
  kicker: 'HARNESSES AND BROKERS / ORCHESTRATION FRAMEWORK',
  summary: 'An MIT-licensed, low-level framework for building stateful agents as graphs of nodes and edges, with checkpointed state, durable execution, and human-in-the-loop interrupts.',
  standfirst: 'LangGraph is not an agent you install and talk to. It is a library for building your own harness, where the agent loop is an explicit graph you define, and where state is saved at each step so runs can pause, resume, and be inspected.',
  keywords: ['LangGraph', 'LangChain', 'agent framework', 'stateful agents', 'agent orchestration', 'StateGraph', 'human in the loop', 'durable execution', 'multi-agent'],
  sections: [
    { id: 'what-it-is', label: 'What it is' },
    { id: 'graph', label: 'The loop as a graph' },
    { id: 'state', label: 'State and checkpoints' },
    { id: 'interrupts', label: 'Human-in-the-loop interrupts' },
    { id: 'fan-out', label: 'Fan-out and multi-agent patterns' },
    { id: 'ecosystem', label: 'LangChain, LangSmith, and deployment' },
    { id: 'framework-vs-harness', label: 'Framework or harness' },
    { id: 'agentic-relevance', label: 'Where it fits in an open stack' },
    { id: 'gotchas', label: 'Gotchas worth knowing' },
    { id: 'openness', label: 'How it scores on openness' },
    { id: 'not', label: 'What it is not' },
  ],
  learnMore: [
    { label: 'LangGraph on GitHub', href: 'https://github.com/langchain-ai/langgraph', note: 'Source, the MIT license, and the core benefits as the project states them.' },
    { label: 'LangGraph Graph API', href: 'https://docs.langchain.com/oss/python/langgraph/graph-api', note: 'StateGraph, state and reducers, nodes, edges, conditional edges, and Send.' },
    { label: 'LangGraph.js', href: 'https://github.com/langchain-ai/langgraphjs', note: 'The JavaScript and TypeScript equivalent of the library.' },
  ],
  related: ['harnesses-and-brokers', 'prime-agent', 'model-context-protocol'],
  updated: '2026-10-13',
  Body,
};

function Body() {
  return (
    <>
      <h2 id="what-it-is">What it is</h2>
      <p>
        LangGraph is a low-level orchestration framework for building, managing, and deploying long-running, stateful
        agents. It is published by LangChain under the MIT license, with a Python package and an equivalent
        JavaScript and TypeScript library. It integrates with other LangChain products and can be used without them.
      </p>

      <h2 id="graph">The loop as a graph</h2>
      <p>
        In LangGraph the agent loop is a graph you define. A <code>StateGraph</code> holds a state schema; nodes are
        functions that do work and return state updates; edges decide which node runs next. Conditional edges route
        based on the current state, which is how a graph expresses the decisions a hand-written loop would bury in
        if-statements. A graph is compiled before it runs.
      </p>
      <p>
        Making the loop explicit is the main architectural benefit. The control flow, the stopping conditions, and
        the places a person can intervene are all visible in the graph definition rather than implied by prompt
        wording.
      </p>

      <h2 id="state">State and checkpoints</h2>
      <p>
        State is shared across nodes, with reducer functions deciding how updates merge. When a graph is compiled with
        a checkpointer, LangGraph saves state at each step boundary, so a thread can be resumed later. The project
        describes this as durable execution: agents persist through failures and resume where they stopped.
      </p>
      <p>
        Saved state per step is also a record. It is what makes it possible to answer what the agent knew at the
        point it made a decision, which is the core of the inspectable and auditable tests.
      </p>

      <h2 id="interrupts">Human-in-the-loop interrupts</h2>
      <p>
        A node can call <code>interrupt()</code> to pause the run and wait for a person. The run resumes with a value
        supplied by the caller, which becomes the result of the interrupt inside the node. Because state is
        checkpointed, the pause can last as long as the approval takes.
      </p>
      <p>
        This is approval enforced by the program, not requested in a prompt: the graph cannot proceed past the
        interrupt until someone resumes it.
      </p>

      <h2 id="fan-out">Fan-out and multi-agent patterns</h2>
      <p>
        Conditional edges can return <code>Send</code> objects, each targeting a node with its own state, so the
        number of parallel branches can be decided at run time. Map-reduce style work and supervisor-and-worker
        multi-agent designs are built from this and from subgraphs.
      </p>

      <h2 id="ecosystem">LangChain, LangSmith, and deployment</h2>
      <p>
        LangChain&apos;s LangSmith is the recommended tool for tracing, evaluation, and observability, and LangSmith
        Deployment is the managed option for running long-running workflows. The project also points to Deep Agents,
        a higher-level package built on LangGraph, for teams that want a ready-made agent rather than a graph from
        scratch. The library itself does not require any of these.
      </p>

      <h2 id="framework-vs-harness">Framework or harness</h2>
      <p>
        The harnesses on this site are mostly finished agents. LangGraph is what you use when none of them fit and
        you need to build one: a support agent with a specific approval step, a data pipeline agent with fixed stages,
        a supervisor that delegates to specialized workers. You take on the harness responsibilities the harness
        layer article lists, and you get exact control over each one.
      </p>

      <h2 id="agentic-relevance">Where it fits in an open stack</h2>
      <p>
        LangGraph sits in the execution layer as a toolkit for building harnesses and simple brokers. It is
        model-agnostic through its integrations, can call tools including MCP servers through adapters, and leaves
        storage of checkpoints to backends you choose.
      </p>

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>You own the harness work.</b> Context selection, retries, tool design, and stopping rules are yours to build.</li>
        <li><b>Checkpoint storage is a data store.</b> It holds prompts, tool results, and user data. Govern and retain it accordingly.</li>
        <li><b>Graphs grow.</b> A graph with many conditional edges becomes hard to reason about; subgraphs keep it manageable.</li>
        <li><b>Managed services are separate choices.</b> Tracing and deployment products are optional; decide on them as you would any vendor.</li>
      </ul>

      <h2 id="openness">How it scores on openness</h2>
      <ul>
        <li><b>Replaceable.</b> Strong. Model-agnostic through integrations, and checkpoint backends are pluggable.</li>
        <li><b>Inspectable.</b> Strong. MIT source, an explicit graph, and per-step saved state.</li>
        <li><b>Portable.</b> Moderate. Graph definitions are code tied to the library; the state and tools they use can be portable.</li>
        <li><b>Bounded.</b> Strong where you build it: interrupts and explicit edges enforce approvals in code.</li>
        <li><b>Grounded.</b> Depends on the tools and data you connect.</li>
        <li><b>Auditable.</b> Strong when checkpoints are kept in storage you own and retained long enough.</li>
      </ul>

      <h2 id="not">What it is not</h2>
      <p>
        LangGraph is not a ready-made agent or a model. It is not a protocol; graphs built with it do not
        interoperate with other frameworks unless you expose them through one, such as MCP or A2A.
      </p>
    </>
  );
}
