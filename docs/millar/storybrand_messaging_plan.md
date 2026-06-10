# StoryBrand Messaging Overhaul v2 — Causality Homepage

## The Core Narrative

- **The Hero:** The Builder (Head of AI / CTO / Engineering Lead).
- **The Guide:** Causality.
- **The Controller:** The Compliance Team / Risk Committee / Regulators (they need to be satisfied, but they are not the enemy).
- **The Villain:** The inherent opacity and unpredictability of complex, multi-agent AI systems. ("Too many AI micro-agents getting into the decision-making process, you have to make sure not one of them deviates.")
- **The Stakes (Risk of Inaction):** Competitors are deploying AI in production and capturing ROI, while you are stuck in sandbox purgatory waiting for governance approval.
- **The Core Promise:** "The evidence your compliance team needs, so you can move your AI forward."

> [!IMPORTANT]
> **Tone directive:** Focus on trust, safety, and empowerment. No Sev-1 panic, no combative stances against regulators. We are solving a legitimate infrastructure gap that allows innovation to proceed safely. "Out of the box," "zero friction," "nothing much to do."

---

## Execution Plan by Section

### 1. Hero — `Hero.astro`
- **Headline:** Keep "Your AI is ready. Your evidence isn't." (It's punchy and sets the exact tension).
- **Sub-headline (New):** "The exact evidence your compliance team needs, so you can move your AI forward. Causality sits passively alongside your agents, translating complex decisions into the structured audit trails regulators demand."
- **CTAs:** Change secondary CTA to "See How Simple It Is".

### 2. Who It's For — `CustomerSegments.astro` (Moving to position 2)
- **Action:** Move this section immediately below the Hero.
- **Simplification:** Completely remove the Persona matrices (Champion, Buyer, Veto), sales cycle metrics, and TAM calculations.
- **New Focus:** Simple, direct message. "We focus on Financial Institutions to help them fast-forward their AI deployments by taking care of their compliance needs."
- **Structure:** Keep the two main cards (Tier 1.5/2 Banks & Regulated FinTechs) but simplify the copy inside them to focus purely on the shared pain of regulatory blockage vs. innovation speed.

### 3. Problem — `Problem.astro`
- **Section Label:** Change `⚠ The Problem` to `◈ The Challenge`.
- **Villain Framing:** Update intro text to clearly frame the villain as *AI Opacity*: "Agentic AI is powerful because it's autonomous. It's blocked because it's unexplainable. When multiple agents collaborate, mapping exactly why a decision was made becomes impossible for traditional monitoring."
- **Card Updates:**
  - *Card 1 (Pilot Purgatory):* Perfect as is. Highlights the competitive risk of stranded investment.
  - *Card 2 (DORA Clock):* Remove the red "Up to €1M personal fine" badge. Reframe around the operational reality: "When an AI deviates, compliance teams need answers immediately. Engineering teams need days to reconstruct logs."
  - *Card 3 (Governance Vacuum):* Good as is (comparing against Datadog/ServiceNow).

### 4. Solution (Architecture) — `Solution.astro`
- **Action:** Completely rewrite the 4 pillars from technical architecture to a "Compliance Checklist" format for the Head of AI.
- **New Pillars:**
  1. **Complete Visibility (was Forensic Replay):** "Our system records everything. When compliance asks 'why?', you never have to scramble for details or reconstruct logs." (Keep the visual example).
  2. **Audit-Ready Evidence (was DORA Pack):** "We make all the details available in a format regulators understand, eliminating translation overhead between engineering and compliance."
  3. **Continuous Alignment (was Ledger):** "We work with legal experts to map rules directly into the platform, alerting you immediately if we see discrepancies."
  4. **Deploy Your Way (was Hosted/Air-gapped):** "We host in-house and on cloud, so you have the choice. Backed by 24x7 online support to guide you whenever you need us."

### 5. How It Works — `HowItWorks.astro`
- **Action:** Emphasize "Out of the Box" and zero friction. Reduce to 3 simple steps.
- **Step 1: Connect:** "Point your existing monitoring to Causality. No code changes to your agents. Out-of-the-box integration." (Remove the complex YAML code block).
- **Step 2: Monitor:** "Every decision is automatically captured and structured without any manual intervention." (Combine current steps 2 & 3).
- **Step 3: Respond:** "When asked for an audit trail, click once. The evidence is ready."

### 6. About / Mission — `About.astro`
- **Action:** Completely **DELETE** the "Our Mission" section.
- **Action:** Keep the right-side cards (Founder, Tech Cred, Status) but center them or redesign slightly to fit the full width now that the left column is gone. Change "Technical Architecture" label to "Why Trust Us".

### 7. Pricing — `Pricing.astro`
- **Bug Fix:** The "Most Popular" badge on the middle tier is being clipped because `.card` in `global.css` has `overflow: hidden`.
- **Action:** Add `overflow: visible;` specifically to `.pricing-card--recommended` in `Pricing.astro` to allow the badge to break out of the card bounds.

### 8. Waitlist — `Waitlist.astro`
- **Action:** Soften the template copy slightly. Change "We are trying to solve" to "We are trying to unblock".

---

## Verification Plan
1. **Flow Check:** Verify `CustomerSegments` naturally follows `Hero`.
2. **Visual Check:** Run dev server to ensure the Pricing badge bug is resolved and no other clipping occurs.
3. **Tone Check:** Review the full page top-to-bottom to ensure the "Sev-1" panic is gone, and the "Builder empowering Controller" narrative flows logically.
