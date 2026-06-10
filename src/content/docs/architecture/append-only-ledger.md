---
title: Append-Only Ledger
description: Technical deep-dive into the Causality hash-chained, append-only ledger for tamper-evident AI audit trail storage.
---

import { Aside } from '@astrojs/starlight/components';

# The Context-Aware Append-Only Ledger

The ledger is the heart of Causality. It is the immutable, tamper-evident system of record that transforms fragmented AI telemetry into a defensible chain of evidence.

## Design Philosophy

The ledger is designed around one core constraint: **auditors must be able to prove that the log has not been altered.**

This means:
- Records can be **added** but never **modified or deleted**
- Each record cryptographically references the one before it
- Any tampering attempt produces a detectable hash mismatch

This is the same design principle used in financial ledgers (double-entry bookkeeping) and blockchain systems — applied to AI agent event streams.

## High-Velocity Architecture

The ledger backend is built from the ground up for extreme performance. Causality chose this architecture for three reasons:

| Property | Why It Matters |
|---|---|
| **Event-stream native** | Our programming model is built around immutable, append-only event logs — exactly matching ledger semantics |
| **Extreme throughput** | Our topologies handle millions of events per second with consistent low latency — critical for real-time ingestion of high-frequency agent traces |
| **Immutable semantics** | Immutable data structures and functional purity eliminate an entire class of concurrency bugs in the ingestion pipeline |


## Hash-Chaining Mechanism

Every event written to the Causality ledger contains a cryptographic proof of integrity:

```
Event N:
{
  "id":          "evt_4821_005",
  "timestamp":   "2025-06-09T14:01:05.033Z",
  "trace_id":    "a1b2c3d4e5f6...",
  "event_type":  "ANOMALY_DETECTED",
  "payload":     { ... },
  "prev_hash":   "sha256:b8f2c1d4e9a3...",  ← hash of Event N-1
  "self_hash":   "sha256:a8f2c1e7d2f4..."   ← hash of this entire record
}
```

The `prev_hash` field creates an unbreakable chain:

```
Genesis → Event 1 → Event 2 → ... → Event N
             ↑         ↑               ↑
         prev_hash  prev_hash      prev_hash
         = null     = H(Event 1)   = H(Event N-1)
```

If any historical record is altered, the hash chain breaks at that point — producing a detectable integrity violation.

<Aside type="note" title="Audit verification">
Causality exposes a verification API endpoint that allows internal auditors or external validators to independently verify the integrity of any trace sequence. The verification algorithm is open-source and does not require trusting Causality infrastructure.
</Aside>

## Materialized Views

Raw events are projected into multiple materialized views for different consumption patterns:

### 1. The Workflow Timeline View
A pre-computed, human-readable timeline for each `trace_id`. This is what powers the [Forensic Reasoning Replay](/docs/architecture/forensic-reasoning-replay). Updated in real time as new spans arrive.

### 2. The Anomaly Index
An inverted index of all flagged anomalies, indexed by:
- Agent identifier
- Workflow type
- Anomaly category
- Time range

Enables instant dashboard queries like "all stale-data anomalies in FX workflows — last 30 days."

### 3. The DORA Evidence View
A pre-structured snapshot of every event relevant to DORA Article 19 reporting, ready to be serialized into the required report format at any moment.

## Data Retention & Mirroring

All ledger data is automatically mirrored to your own infrastructure via the **Autonomous Compliance Data Mirror**:

```
Causality Ledger (Hot)
    │
    ├── Tier 1 Mirror: SQL (PostgreSQL / BigQuery)
    │   └── Real-time sync via CDC
    │   └── For: BI dashboards, compliance reporting
    │
    └── Tier 2 Mirror: NDJSON → Object Storage (S3 / GCS / Azure Blob)
        └── Hourly batch export
        └── For: Long-term archival, air-gapped forensics
```

<Aside type="tip" title="Shadow Clusters">
NDJSON archives can be "rehydrated" into **ephemeral, air-gapped Shadow Clusters** — enabling you to run complex forensic LLM analytics locally, for free, entirely outside Causality cloud infrastructure. This is particularly important for Quant funds and high-security institutions.
</Aside>

## Performance Characteristics

| Metric | Value |
|---|---|
| Ingestion latency (P99) | < 50ms |
| Write throughput | > 500,000 events/sec per topology |
| Hash verification | < 1ms per event |
| DORA Evidence Pack generation | < 5 seconds (typical workflow) |
| Hot ledger retention | 90 days (configurable) |
| Mirror sync latency (SQL) | < 500ms |
| Mirror batch frequency (NDJSON) | Hourly |

## Security Model

- **Encryption at rest**: AES-256-GCM for all stored events
- **Encryption in transit**: TLS 1.3 for all ingestion and API traffic
- **Access control**: Role-based (CRO dashboard vs. engineering API vs. read-only auditor)
- **Multi-tenancy**: Complete data isolation per customer (separate backend topology per production tenant)
- **Key management**: Customer-managed encryption keys (CMEK) available on Enterprise tier

---

## Next Steps

- [DORA Article 19 Compliance](/docs/compliance/dora-article-19)
- [SR 26-2 Alignment](/docs/compliance/sr-26-2)
