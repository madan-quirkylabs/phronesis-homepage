---
title: What is Phronesis?
description: Phronesis is the Black Box Flight Recorder for Agentic AI — built to help banks and regulated financial institutions meet DORA and SR 26-2 requirements without freezing their AI deployments.
---

import { Aside, Badge, Card, CardGrid } from '@astrojs/starlight/components';

# What is Phronesis?

**Phronesis** is the **Black Box Flight Recorder for Agentic AI.**

Just like a flight recorder doesn't fly the airplane — it sits quietly in the background, capturing every decision made by the autopilot, surviving any crash, and providing investigators with the exact, undeniable chronology of what happened — Phronesis does the same for your AI agents.

## The Problem It Solves

Banks and regulated financial institutions are caught in a painful trap:

<CardGrid>
  <Card title="💰 The ROI" icon="rocket">
    Advanced AI agents (fraud investigators, FX routing agents, contract reviewers) can save banks **$1M–$5M annually** per workflow.
  </Card>
  <Card title="⚖️ The Regulatory Reality" icon="warning">
    **DORA** (EU) and **SR 26-2** (US) require institutions to explain exactly *why* an AI made a specific decision — often within **4 hours** of an incident.
  </Card>
</CardGrid>

Because AI agents are probabilistic "black boxes," banks physically cannot reconstruct the logic of a misbehaving agent fast enough to meet regulatory deadlines. 

The result: **Pilot Purgatory** — millions of dollars in AI investments frozen in staging environments, never reaching production.

<Aside type="caution" title="The DORA Clock">
Under DORA Article 5(4), an AI agent hallucination that triggers an unauthorized action is classified as an **anomalous ICT incident**. Initial notification to the relevant authority must occur **within 4 hours** of classification.

Failure to comply can result in administrative fines of up to **€1,000,000 personally** for board members in certain member states.
</Aside>

## What Phronesis Does

Phronesis **does not build AI agents**. It builds the safety infrastructure that makes it legally possible for enterprises to turn their AI agents on.

It does this through four core capabilities:

### 1. Forensic Reasoning Replay
Ingests your existing [OpenTelemetry (OTel)](https://opentelemetry.io/) traces and automatically translates them into a human-readable, chronological decision timeline — step by step, in plain English. Satisfies the "Effective Challenge" evidence requirements of SR 26-2.

### 2. 1-Click DORA Evidence Pack
When an incident occurs, generates a perfectly structured, regulator-ready incident report in seconds — not the 3+ days it currently takes engineers to manually reconstruct logs.

### 3. Context-Aware Append-Only Ledger
A high-velocity event-streaming backend that chains scattered agent traces into a single, tamper-evident system of record. Hash-chained. Immutable. Cryptographically verifiable.

### 4. Autonomous Compliance Data Mirror
Automatically mirrors all execution narratives to your own infrastructure (SQL databases or NDJSON to object storage), ensuring **data sovereignty** and zero vendor lock-in.

## Who It's For

| Segment | Description | Timeline |
|---|---|---|
| **Tier 1.5/2 Banks** | $50B–$500B assets, EU/US/UK/CA regulated | Primary — Years 1–3 |
| **Regulated FinTechs** | Cloud-native, heavily regulated digital banks | Secondary — Year 2+ |
| **Quant Hedge Funds** | Prop trading, air-gapped requirements | Explicitly out of scope |

## The High-Concept Pitch

> **"The Black Box Flight Recorder for Agentic AI."**

A flight recorder doesn't prevent the plane from crashing. But when a catastrophic incident occurs, it survives the crash and provides the exact, undeniable chronology of what the pilot did.

For banks deploying AI, Phronesis is that recorder.

---

## Next Steps

<CardGrid>
  <Card title="Connect your OTel Exporter" icon="setting">
    Start ingesting AI agent traces in minutes. [Getting Started →](/phronesis-homepage/docs/getting-started)
  </Card>
  <Card title="DORA Compliance Guide" icon="document">
    Learn how Phronesis maps to DORA Article 19. [Read the guide →](/phronesis-homepage/docs/compliance/dora-article-19)
  </Card>
</CardGrid>
