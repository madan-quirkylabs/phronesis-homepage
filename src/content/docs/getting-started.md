---
title: Connecting your OTel Exporter
description: Learn how to point your existing OpenTelemetry exporters to Phronesis in under 5 minutes. No SDK installation. No agent code changes.
---

import { Aside, Steps, Code, Tabs, TabItem } from '@astrojs/starlight/components';

# Connecting your OTel Exporter

Phronesis uses a **passive interceptor** architecture. Your AI agents do not need to be modified. You simply configure your existing [OpenTelemetry](https://opentelemetry.io/) exporters to send a copy of your agent traces to our ingestion endpoint.

<Aside type="note" title="Zero-change integration">
Phronesis ingests the **CNCF OpenTelemetry standard** — the same traces your agents already generate. If your AI framework emits OTel spans (LangChain, LlamaIndex, Semantic Kernel, custom), you are integration-ready today.
</Aside>

## Prerequisites

Before you begin, ensure:

- Your AI agent framework is instrumented with OpenTelemetry (OTel SDK)
- You have a Phronesis API key (issued during Design Partner onboarding — [contact us](mailto:madan@quirkylabs.ai))
- Your network allows outbound HTTPS to `ingest.phronesis.ai` on port 443

## Integration Steps

<Steps>

1. **Obtain your Phronesis ingestion key**

   During Design Partner onboarding, you'll receive:
   - `PHRONESIS_INGEST_ENDPOINT` — your dedicated ingestion URL
   - `PHRONESIS_API_KEY` — your authentication key

   Store these as environment variables. Never commit them to source control.

   ```bash
   export PHRONESIS_INGEST_ENDPOINT="https://ingest.phronesis.ai/v1/traces"
   export PHRONESIS_API_KEY="pk_your_key_here"
   ```

2. **Configure your OTel exporter**

   Add Phronesis as an additional OTLP exporter in your OTel pipeline. This runs **alongside** your existing exporters (Datadog, Honeycomb, etc.) — it does not replace them.

   <Tabs>
     <TabItem label="YAML (Collector)">
   ```yaml
   # otel-collector-config.yaml
   exporters:
     otlp/phronesis:
       endpoint: "${PHRONESIS_INGEST_ENDPOINT}"
       headers:
         x-phronesis-key: "${PHRONESIS_API_KEY}"
       compression: gzip
       timeout: 10s

   service:
     pipelines:
       traces:
         receivers: [otlp]
         processors: [batch, memory_limiter]
         exporters:
           - otlp/existing   # your current exporter
           - otlp/phronesis  # add Phronesis here
   ```
     </TabItem>
     <TabItem label="Python (SDK)">
   ```python
   from opentelemetry import trace
   from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
   from opentelemetry.sdk.trace import TracerProvider
   from opentelemetry.sdk.trace.export import BatchSpanProcessor

   # Your existing provider setup
   provider = TracerProvider()

   # Add Phronesis exporter alongside your existing one
   phronesis_exporter = OTLPSpanExporter(
       endpoint=os.environ["PHRONESIS_INGEST_ENDPOINT"],
       headers={"x-phronesis-key": os.environ["PHRONESIS_API_KEY"]},
   )
   provider.add_span_processor(BatchSpanProcessor(phronesis_exporter))

   trace.set_tracer_provider(provider)
   ```
     </TabItem>
     <TabItem label="Node.js (SDK)">
   ```javascript
   import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
   import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';

   // Add to your existing TracerProvider
   const phronesisExporter = new OTLPTraceExporter({
     url: process.env.PHRONESIS_INGEST_ENDPOINT,
     headers: {
       'x-phronesis-key': process.env.PHRONESIS_API_KEY,
     },
   });

   provider.addSpanProcessor(new BatchSpanProcessor(phronesisExporter));
   ```
     </TabItem>
   </Tabs>

3. **Verify ingestion**

   After deploying, trigger a test agent workflow. Within 30 seconds, your Phronesis dashboard should show the ingested spans.

   You can verify via our status endpoint:

   ```bash
   curl -H "x-phronesis-key: $PHRONESIS_API_KEY" \
     https://ingest.phronesis.ai/v1/status
   ```

   Expected response:
   ```json
   {
     "status": "connected",
     "traces_received": 1,
     "last_ingested_at": "2025-06-09T14:01:03Z"
   }
   ```

4. **Review the Forensic Replay**

   Navigate to your Phronesis dashboard. You should see your first workflow translated into a human-readable timeline. Verify that agent decisions, tool calls, and LLM inferences are being captured correctly.

</Steps>

## Supported AI Frameworks

Phronesis supports any framework that emits [OTel GenAI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/):

| Framework | OTel Support | Notes |
|---|---|---|
| LangChain | ✓ Native | Use `langchain-opentelemetry` |
| LlamaIndex | ✓ Native | Built-in OTel instrumentation |
| Semantic Kernel | ✓ Native | .NET and Python SDKs |
| Autogen | ✓ Via callback | Custom span wrapping required |
| Custom agents | ✓ Manual | Add spans to tool call boundaries |

## Data Residency & Staging Mode

<Aside type="tip" title="Staging first">
During the Design Partner Pilot ($25k), Phronesis ingests **staging data only**. This reduces your information security review burden significantly — no production telemetry leaves your environment until you're ready.
</Aside>

To enable staging mode, add the environment tag to your traces:

```yaml
# In your OTel resource attributes
resource:
  attributes:
    - key: phronesis.environment
      value: staging
      action: upsert
```

## Next Steps

- [Architecture: Forensic Reasoning Replay](/phronesis-homepage/docs/architecture/forensic-reasoning-replay)
- [Compliance: DORA Article 19 Requirements](/phronesis-homepage/docs/compliance/dora-article-19)
