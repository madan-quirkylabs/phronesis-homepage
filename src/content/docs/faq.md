---
title: Frequently Asked Questions
description: Common questions about Phronesis — the Black Box Flight Recorder for Agentic AI.
---

import { Aside } from '@astrojs/starlight/components';

# Frequently Asked Questions

## General

**Q: What exactly does "Agentic AI" mean?**

Agentic AI refers to AI systems that take autonomous, multi-step actions in the real world — beyond just answering questions. Examples include:
- An AML investigation agent that reads case files, queries sanctions lists, and recommends an outcome
- An FX routing agent that checks balances, evaluates counterparty risk, and initiates trades
- A contract review agent that reads legal documents, identifies risk clauses, and flags items for legal review

Unlike traditional AI that answers a single question, agentic systems make sequences of decisions, use external tools, and take actions with real-world consequences.

---

**Q: Does Phronesis change how my AI agents work?**

No. Phronesis is a **passive interceptor**. Your AI agents continue to run exactly as they do today. You simply route a copy of their existing [OpenTelemetry](https://opentelemetry.io/) telemetry to our ingestion endpoint. Zero code changes to your AI.

---

**Q: What AI frameworks does Phronesis support?**

Any framework that emits OpenTelemetry traces using the [GenAI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/). This includes LangChain, LlamaIndex, Semantic Kernel, Autogen, and custom agent implementations. See the [Getting Started guide](/phronesis-homepage/docs/getting-started) for details.

---

**Q: What if my AI provider (e.g., Azure OpenAI) doesn't expose reasoning traces?**

Phronesis captures what's available via OTel. For closed-box LLM APIs that don't expose chain-of-thought, Phronesis captures the decision input/output boundary (what went in, what came out, and what happened next). This is typically sufficient for DORA initial notification purposes. For deeper forensics, we recommend implementing OTel instrumentation at your tool call and retrieval boundaries.

---

## Pricing & Commercial

**Q: How does the Design Partner Pilot work?**

The Design Partner Pilot is a **$25,000 flat fee, 60-day engagement** on staging data only. We onboard your team, connect your OTel exporter to a staging Phronesis environment, and together generate at least one sample DORA Evidence Pack on simulated agent traces. If we successfully demonstrate value, you can convert to a production license. If not, you owe nothing beyond the $25k.

Contact [madan@quirkylabs.ai](mailto:madan@quirkylabs.ai) to start the conversation.

---

**Q: Does the $25k pilot trigger a full infosec review?**

By design, the pilot uses staging data only — meaning no production telemetry leaves your environment. This significantly reduces the information security footprint of the review. Many banks can proceed with a standard vendor risk assessment for a staging-only engagement at this price point, without requiring full approved-vendor-list inclusion.

---

**Q: When will Phronesis have SOC-2 Type II certification?**

SOC-2 Type II is in progress. We anticipate completion within 12 months. In the interim, we provide:
- A detailed security architecture whitepaper
- Direct access to our security documentation for vendor risk assessments
- A readiness assessment from our SOC-2 readiness consultant

Contact [madan@quirkylabs.ai](mailto:madan@quirkylabs.ai) for the security documentation package.

---

**Q: Can we negotiate custom pricing for a larger deployment?**

Yes. The Enterprise Compliance Shield tier ($350k+/year) is priced based on the number of agent workflows governed and specific deployment requirements (dedicated VPC, on-premise, etc.). Reach out to discuss.

---

## Technical

**Q: What is OpenTelemetry (OTel) and do we already have it?**

OpenTelemetry is a CNCF open-source observability framework that has become the standard for instrumenting modern software. If your engineering team uses any of the following, you likely already have OTel instrumentation:
- LangChain, LlamaIndex, or Semantic Kernel (built-in OTel support)
- A modern observability platform (Honeycomb, Datadog APM, Grafana Tempo)
- Cloud AI services (Azure AI Foundry, Google Vertex AI) — many have built-in OTel exporters

---

**Q: How much additional latency does Phronesis add to our AI agents?**

Zero latency on the agent's critical path. Phronesis ingestion is asynchronous — traces are sent via an OTel `BatchSpanProcessor` in a background thread. The agent does not wait for Phronesis to acknowledge the trace before continuing. The ingestion pipeline adds &lt;50ms to trace delivery (P99), which has no impact on agent response time.

---

**Q: Where is our data stored?**

During the pilot: in an isolated Phronesis staging environment in your preferred cloud region (AWS, GCP, or Azure).

In production: in a dedicated, single-tenant Phronesis environment. Your data is never co-mingled with other tenants. All data is also mirrored to your own infrastructure (SQL or object storage) via the [Autonomous Compliance Data Mirror](/phronesis-homepage/docs/architecture/append-only-ledger#data-retention--mirroring).

---

**Q: Can we run Phronesis entirely on-premise?**

On-premise deployment is available for Enterprise tier customers. This is particularly relevant for Tier 1.5 banks with strict data residency requirements and hedge funds with air-gapped infrastructure. Contact [madan@quirkylabs.ai](mailto:madan@quirkylabs.ai) to discuss your specific requirements.

---

## Compliance

**Q: Does Phronesis "submit" DORA reports to regulators on our behalf?**

No. Phronesis generates a structured, pre-filled evidence pack that your qualified compliance team can review and submit. Regulatory submissions must always be authorized and filed by a responsible person at your institution. Phronesis provides the evidence — your team files the report.

---

**Q: Does Phronesis work with both DORA (EU) and SR 26-2 (US) simultaneously?**

Yes. A single Phronesis deployment can serve an institution operating under both DORA and SR 26-2. The same underlying ledger data is projected into different evidence formats depending on which regulatory report you're generating. 

---

**Q: We use Datadog/Splunk already. Why isn't that sufficient?**

Datadog and Splunk are excellent IT observability tools. They show you *that* a system crashed (latency spikes, error rates, exceptions). They do not:
- Translate raw LLM inference spans into business-context decisions
- Chain multi-step agent actions into a regulatory-ready narrative
- Flag compliance-specific anomalies (stale data usage, policy bypasses)
- Generate DORA Article 19 structured reports

Phronesis is not a replacement for Datadog — it runs alongside it, consuming the same OTel data and providing the compliance-specific intelligence layer that IT observability tools were never designed to provide.

---

<Aside type="note" title="Have a question not covered here?">
Email [madan@quirkylabs.ai](mailto:madan@quirkylabs.ai) and we'll answer personally — and add it to this FAQ if it's likely to help others.
</Aside>
