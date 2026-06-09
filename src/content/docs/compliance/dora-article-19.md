---
title: DORA Article 19 Requirements
description: How Phronesis maps to the EU Digital Operational Resilience Act (DORA) Article 19 incident reporting requirements, including the 4-hour initial notification window.
---

import { Aside, Card, CardGrid } from '@astrojs/starlight/components';

# DORA Article 19: ICT-Related Incident Reporting

The EU **Digital Operational Resilience Act (DORA)**, effective January 17, 2025, establishes binding requirements for ICT-related incident reporting in financial services. This page explains how Phronesis enables compliance with the critical Article 19 reporting obligations — particularly the **4-hour initial notification window**.

<Aside type="caution" title="This is not legal advice">
This documentation reflects Phronesis's technical interpretation of DORA requirements for product design purposes. You should consult your legal and compliance team to determine how DORA applies to your specific institution.
</Aside>

## DORA Article 19: The Obligation

Article 19 of DORA requires financial entities to report major ICT-related incidents to their **Competent Authority** (e.g., ECB, national NCAs) in three stages:

| Report | Deadline | Purpose |
|---|---|---|
| **Initial Notification** | Within **4 hours** of classification as major | Alert authority that a significant incident has occurred |
| **Intermediate Report** | Within **72 hours** | Provide updated assessment and containment actions |
| **Final Report** | Within **1 month** | Complete root cause analysis and lessons learned |

<Aside type="danger" title="The 4-Hour Problem">
Under Article 19(1)(a), financial entities must submit an initial notification "without undue delay and in any case within 4 hours" of classifying an incident as major. 

The problem: if the incident involves an AI agent hallucination, engineers need **3+ days** to manually reconstruct what the agent did from raw OpenTelemetry logs. The 4-hour window expires before they even understand what happened.
</Aside>

## What Counts as a DORA-Relevant AI Incident?

Under DORA's framework, an AI agent hallucination or unauthorized action that causes a material impact qualifies as an **anomalous ICT activity** that may trigger the major incident classification threshold. Relevant scenarios include:

- An AML investigation agent approves a transaction that should have been flagged
- An FX routing agent executes a trade based on stale sanctions data
- A document processing agent makes a legally binding commitment based on an incorrect interpretation
- An automated decision system bypasses a required human approval step

## How Phronesis Enables 4-Hour Compliance

Phronesis reduces the incident response workflow from **days to seconds**:

```
WITHOUT PHRONESIS                    WITH PHRONESIS
─────────────────────────────────    ─────────────────────────────────
Hour 0:  Incident detected           Hour 0:  Incident detected
Hour 1:  Engineers start digging     Hour 0:  Phronesis flags anomaly
Hour 4:  DEADLINE MISSED ⚠           Hour 0:  Forensic Replay generated
Hour 12: Still searching logs        Hour 0:  DORA Pack ready → SUBMIT ✓
Hour 72: Partial reconstruction      Hour 4:  Intermediate report prep begins
Day 5+:  Word doc submitted          Hour 72: Final report (deep analysis)
```

### Phronesis 1-Click DORA Evidence Pack

When an anomaly is detected, your CRO's dashboard shows an alert. They click **"Generate DORA Evidence Pack"** and receive a structured report containing:

1. **Incident classification data** — timestamp of detection, affected workflow, impact assessment
2. **Forensic Reasoning Replay** — the full chronological timeline of what the AI agent did
3. **Root cause summary** — in plain English, why the anomaly occurred (e.g., "Agent used cached sanctions data stale by 4 hours 12 minutes")
4. **Data provenance chain** — which data sources informed each decision, with freshness indicators
5. **Integrity proof** — the cryptographic hash chain proving the evidence has not been tampered with
6. **Regulatory headers** — pre-structured fields mapping to Article 19 notification requirements

## Article 19 Field Mapping

The Phronesis DORA Evidence Pack pre-populates the following required notification fields:

| DORA Article 19 Field | Phronesis Source |
|---|---|
| Date and time of detection | `span.startTimeUnixNano` from anomaly span |
| Date and time of classification | Dashboard anomaly classification timestamp |
| Nature of the incident | Anomaly category from rule engine |
| Affected systems / functions | Workflow type + tool call taxonomy |
| Geographic scope | Tenant jurisdiction configuration |
| Initial impact assessment | Affected transaction count + value |
| Description of root cause | Forensic Reasoning Replay summary |
| Measures taken | Configurable response playbook entries |

<Aside type="note" title="Human review required">
Phronesis generates a structured evidence pack. A qualified person at your institution must review, validate, and submit the actual notification to the Competent Authority. Phronesis does not submit to regulators on your behalf.
</Aside>

## Classification Thresholds

DORA defines a "major incident" using thresholds set by the European Supervisory Authorities (ESAs). Phronesis's anomaly engine helps you determine whether a threshold has been crossed by capturing:

- **Client impact**: Number of affected users, transaction count, monetary value
- **Reputational risk indicators**: Unauthorized external communications, data exposure
- **Service availability impact**: Duration and scope of workflow disruption
- **Regulatory sensitivity**: Whether the affected workflow operates under specific regulatory mandates

## Audit Trail Requirements

DORA Article 13 also requires financial entities to maintain **logs and audit trails** of ICT incidents. The Phronesis append-only ledger directly satisfies this requirement:

- ✓ **Immutable**: Hash-chained records cannot be altered without detection
- ✓ **Complete**: All agent decisions captured from OTel ingestion
- ✓ **Timestamped**: ISO-8601 nanosecond precision on all events
- ✓ **Retained**: Configurable hot retention + long-term mirror to your own infrastructure

---

## Frequently Asked Questions

**Q: Will regulators accept Phronesis-generated evidence as sufficient for DORA notification?**

A: Phronesis is designed to provide the exact structured evidence that DORA Article 19 specifies. Our regulatory architecture was designed in consultation with DORA compliance experts. However, the sufficiency of any evidence is ultimately determined by your Competent Authority. We recommend discussing this with your legal team and proactively sharing the Phronesis architecture with your supervisor during the pilot phase.

**Q: Does Phronesis need to be on an approved vendor list before we can use it?**

A: For the Design Partner Pilot (staging data only, $25k flat fee), the data sensitivity is significantly reduced. Many banks can proceed with a vendor risk assessment rather than full approved-vendor-list inclusion. For production deployment, a formal vendor risk assessment will be required.

**Q: Can we use Phronesis evidence for the Intermediate and Final reports as well?**

A: Yes. The same Forensic Replay and ledger data that powers the initial notification can be expanded for the 72-hour intermediate report and 1-month final report. Phronesis's dashboard supports exporting enriched versions of the same incident data at each stage.

---

## Next Steps

- [SR 26-2 Alignment](/phronesis-homepage/docs/compliance/sr-26-2)
- [FAQ](/phronesis-homepage/docs/faq)
- [Contact us for a compliance architecture review](mailto:madan@quirkylabs.ai?subject=DORA%20Architecture%20Review%20Request)
