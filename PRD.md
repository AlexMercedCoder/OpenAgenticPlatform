# OpenAgenticPlatform.com Product Requirements

## Product summary

OpenAgenticPlatform.com is a vendor-neutral educational reference for building agentic AI from open components. It defines the architecture as four independently replaceable layers: data and semantics, models and routing, harnesses and brokers, and open interoperability standards.

## Product promise

Give technical builders a rigorous mental model, a curated map of primary projects, and a practical sequence for assembling agentic systems without adopting a mandatory suite.

## Audience and jobs

- Architects comparing open and vertically integrated AI stacks.
- Data platform teams extending governed infrastructure to agents.
- Agent framework authors looking for shared contracts and boundaries.
- Technical leaders who need an accurate, non-hype explanation of openness.

Visitors should be able to define an open agentic platform, identify the four layers, evaluate whether an architecture is genuinely open, and follow primary sources.

## Editorial position

Vendor-neutral, precise, and constructive. “Open” must not be used as a single undifferentiated claim: the site distinguishes open source, open weights, open formats, and open interfaces. Project inclusion is illustrative rather than an endorsement or exhaustive ranking.

## Information architecture

1. Hero definition and four-layer visual.
2. Formal definition and openness nuance.
3. Architecture directory:
   - Apache Arrow, Parquet, Iceberg, Polaris, and Apache Ossie (Incubating).
   - Open-weight models, OpenRouter, Nous Portal, local and provider endpoints.
   - OpenCode, Pi, MagAgent, Loro, Merced AI, Hermes Agent, and Prime Agent.
   - Agent Skills, MCP, OAP, and AGS.
4. Six-part openness test.
5. Four-step practical build path.
6. Source and contribution direction.

Future phases may add component detail pages, comparison matrices, patterns, glossary, contribution policy, and a machine-readable ecosystem catalog.

## Accuracy requirements

- Merced AI is categorized as a broker; execution products are harnesses.
- OpenCode belongs in the harness layer, not the model-provider layer.
- Apache incubating status is shown where applicable.
- Descriptions stay concise and link to the project’s canonical source.
- Trademark and community-project status are not implied as partnership or endorsement.

## Visual system

The design behaves like an impeccable technical field guide: near-black instrument panels, warm paper, condensed type, monospace labels, and layer accents in lime, cyan, amber, and pink. Dense information remains highly structured. Animation is optional, minimal, and never required for comprehension.

## Accessibility and responsive behavior

Semantic sections and lists, keyboard-accessible links, clear focus states, AA contrast, accessible architecture labels, reduced-motion support, and a deliberate mobile order that preserves the ground-up stack narrative.

## SEO and sharing

Canonical metadata, descriptive title, Open Graph/Twitter image, WebSite structured data, and crawlable primary-source names. Future component pages should use SoftwareApplication or TechArticle schema only where semantically justified.

## Technical requirements

- Next-compatible React on the OpenAI Sites/Vinext scaffold.
- Static-first phase one with no database, authentication, CMS, or analytics.
- Production build and lint must pass.
- Public GitHub repository is the initial delivery; domain hosting follows separately.

## Success measures

- A new visitor can explain the four-layer architecture after one page view.
- Each named component is categorized accurately and reaches a primary source.
- The design works from small mobile screens through wide desktop layouts.

## Non-goals

Certification, project rankings, exhaustive ecosystem coverage, legal definitions of open source/open weights, hosted agent execution, and domain deployment are outside phase one.
