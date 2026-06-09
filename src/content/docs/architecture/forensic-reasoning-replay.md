---
title: Forensic Reasoning Replay
description: How Phronesis transforms raw OpenTelemetry traces into human-readable, chronological decision trees that satisfy SR 26-2 Effective Challenge requirements.
---

import { Aside, Card, CardGrid } from '@astrojs/starlight/components';

# Forensic Reasoning Replay

The **Forensic Reasoning Replay** is the core translation engine of Phronesis. It takes the raw, chaotic telemetry emitted by your AI agents and produces a structured, human-readable, chronological decision tree — one that both engineers and auditors can understand.

## The Translation Problem

When an AI agent runs, it emits spans that look like this in raw OpenTelemetry format:

```json
{
  "traceId": "a1b2c3d4e5f6...",
  "spanId": "00f1a2b3c4d5",
  "name": "gen_ai.chat",
  "attributes": {
    "gen_ai.system": "openai",
    "gen_ai.request.model": "gpt-4o",
    "gen_ai.prompt.0.content": "You are a financial compliance agent...",
    "gen_ai.response.0.content": "Based on the sanctions list...",
    "gen_ai.usage.prompt_tokens": 4821,
    "gen_ai.usage.completion_tokens": 312
  },
  "startTimeUnixNano": 1749480063241000000,
  "endTimeUnixNano": 1749480064112000000
}
```

This is unreadable to a Risk Officer. It tells you *that* the model ran — not *what decision was made or why*.

## How the Replay Works

<Aside type="note">
The Forensic Reasoning Replay runs entirely within Phronesis infrastructure. Your raw telemetry is never re-sent to an external LLM for interpretation — the translation is rule-based and deterministic.
</Aside>

### Step 1: Span Ingestion & Validation

As OTel spans arrive at the ingestion endpoint, Phronesis:

1. Validates against the [GenAI Semantic Conventions schema](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
2. Groups spans by `traceId` into complete workflow sessions
3. Rejects malformed or incomplete spans (reported on your dashboard)

### Step 2: Causal Graph Construction

Phronesis builds a **directed acyclic graph (DAG)** of the agent's decision sequence by:

- Linking parent/child spans via `parentSpanId`
- Identifying tool call spans (`gen_ai.tool.*`) and their outcomes
- Detecting LLM inference spans (`gen_ai.chat`, `gen_ai.completion`)
- Extracting retrieval augmentation spans (RAG document fetches)

### Step 3: Business Context Enrichment

Each node in the causal graph is enriched with:

| Attribute | Source | Example |
|---|---|---|
| Human-readable action label | Semantic convention mapping | `"Read document: sanctions_list.pdf"` |
| Timestamp in ISO-8601 | Span start time | `2025-06-09T14:01:03.241Z` |
| Data freshness warning | Cache-control headers in spans | `"⚠ Document cached 4h 12m ago"` |
| Decision outcome | Response content extraction | `"Decision: Approved — counterparty cleared"` |
| Anomaly flag | Policy rule evaluation | `"Stale data used in compliance decision"` |

### Step 4: Timeline Rendering

The enriched graph is rendered into a human-readable timeline:

```
FX Routing Workflow #4821 — 2025-06-09 14:01:03 UTC
───────────────────────────────────────────────────
14:01:03.241  AGENT_START    Workflow initiated by: compliance-agent-v2
14:01:03.489  TOOL_CALL      ReadDocument("sanctions_list_v2.pdf")
                             → Status: 200 OK, Size: 847KB
                             ⚠ WARNING: Document from cache (stale 4h 12m)
14:01:04.112  TOOL_CALL      CheckBalance(account="FX-EU-0029")
                             → Balance: €2,400,000.00 (live API)
14:01:04.891  LLM_INFERENCE  GPT-4o — Decision reasoning
                             → "Counterparty not found on sanctions list.
                                Balance sufficient. Proceed with transfer."
14:01:05.033  ANOMALY        ⚠ COMPLIANCE RISK DETECTED
                             Sanctions check performed against CACHED data.
                             Live API not consulted.
14:01:05.041  TOOL_CALL      InitiateTransfer(amount="€2,400,000")
                             → Status: PENDING
───────────────────────────────────────────────────
Workflow Duration: 1.8 seconds | Spans captured: 12 | Anomalies: 1
```

## Anomaly Detection

The Forensic Replay includes a rule-based anomaly detection layer that flags:

- **Stale data usage** — Tool calls that read from caches beyond a configurable TTL
- **Policy bypasses** — Agent decisions that skip expected validation steps
- **Hallucinated tool calls** — Spans where the agent invoked a tool with invalid parameters
- **Unexpected branching** — Agent workflow deviates from the expected decision graph
- **Timeout violations** — Steps that exceeded their SLA thresholds

<Aside type="tip" title="Custom anomaly rules">
Enterprise tier customers can define custom anomaly detection rules using our declarative policy language. Contact [madan@quirkylabs.ai](mailto:madan@quirkylabs.ai) for details.
</Aside>

## SR 26-2 Alignment

The Federal Reserve's SR 26-2 guidance explicitly requires "Effective Challenge" evidence for Generative and Agentic AI systems — meaning auditors must be able to interrogate *why* a model made a specific decision.

The Forensic Reasoning Replay directly satisfies this requirement by providing:

<CardGrid>
  <Card title="Chronological decision trace" icon="list-format">
    A complete, timestamped record of every agent action, in business-readable language.
  </Card>
  <Card title="Data provenance" icon="magnifier">
    Identifies which data sources informed each decision, including staleness warnings.
  </Card>
  <Card title="Anomaly evidence" icon="warning">
    Flags specific steps where the agent deviated from expected behavior.
  </Card>
  <Card title="Immutable ledger" icon="lock">
    The underlying data is hash-chained and tamper-evident. Auditors can verify integrity.
  </Card>
</CardGrid>

## Limitations & Known Constraints

- **Closed-box LLM APIs**: If your LLM provider does not expose reasoning traces via OTel (e.g., some proprietary enterprise APIs), token-level thought processes cannot be captured. Phronesis captures the decision input/output boundary but not internal chain-of-thought.
- **Span completeness**: Replay quality depends on your OTel instrumentation completeness. Uncaptured tool calls will show as gaps in the timeline.
- **Latency**: Replay rendering adds &lt;50ms to the trace pipeline. It does not affect your agent's real-time performance.

---

## Next Steps

- [Append-Only Ledger Architecture](/docs/architecture/append-only-ledger)
- [1-Click DORA Evidence Pack — DORA Article 19](/docs/compliance/dora-article-19)
