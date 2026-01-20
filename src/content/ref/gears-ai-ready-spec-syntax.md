---
# SPDX-License-Identifier: CC-BY-SA-4.0
# SPDX-FileCopyrightText: 2026 SubLang International <https://www.sublang.xyz>
title: 'GEARS: the AI-Ready Spec Syntax'
description: 'An introduction to Generalized EARS, the specification syntax designed for AI-powered software development'
pubDate: 2026-01-14
categories:
  - engineering
---

Amazon's Kiro adopted the Easy Approach to Requirements Syntax (EARS) for its specification-driven development workflow. It popularized a practice idea: turn a vague prompt or context into a specification (spec) in a clear format, so both humans and agents can better understand.

The EARS was developed by Alistair Mavin and colleagues at Rolls-Royce and has become a widely adopted notation for writing clear, testable requirements. Its original paper won the 10-year most influential industry paper award in Requirements Engineering conference 2019.

However, the notation was originally designed for high-level stakeholder requirements—not for the full spectrum of software specifications that modern development demands. Working with EARS in spec practice revealed friction points.

Therefore, we propose GEARS, generalized EARS or Generalized Expression for AI-Ready Specs. It extends EARS for the age of AI coding by preserving what made EARS successful while adapting the syntax for broader use in specs.

## What Are Specs

Specs are natural-language descriptions of system requirements and behaviors. In a broader sense, specs can also describe the decisions, plans, and changes made to a system.

Specs are the new “source code”. We believe specs are essential to AI-era software development for two reasons:

- Without clear specs, misunderstandings among humans and LLMs constantly exist. Specs are the natural-language media for human and AI developers to communicate.
- There are always divisions of work in software even with the power of AI. Clear specs facilitate humans and LLMs to understand and reuse system components.

Specs are iterative. It is *not* a recall of waterfall model. Specs grow from scratch along with the code iteration by iteration.

Specs are AI-generative. It doesn't mean humans have to write every single line of specs. Usually human developers start with high-level and sometime vague intent and discuss with AI. Then AI can help specify, propose considerations, and fill in details. Finally, AI can write the specs in the right format.

## Why Use GEARS

AI needs consistency. LLMs perform better with predictable structure. A specification format acts as a protocol between human intent and AI execution. Without it, misunderstandings easily propagate across iterations and create volatility and risk.

Humans need it too. The bottleneck in AI coding is rarely the LLM’s capability—it's our ability to express what we want. A constrained syntax leads to clarity. You don't want to write a free-form prose; the structure helps us get precision.

AI reduces the “best practice tax”. GEARS is intentionally lightweight and intuitive, without the need for heavy tooling or training. Formal specifications, comprehensive test cases, traceable requirements—all valuable, all expensive. But when AI drafts and humans review, the economics change.

Test cases should use the same language. The original EARS was designed for requirements; testing frameworks use BDD-style Given-When-Then. Maintaining two mental models creates burden for LLMs. GEARS unifies both, expressed in the same syntax.

## The GEARS Syntax

> [Where `<static precondition(s)>`] [While `<stateful precondition(s)>`] [When `<trigger>`] The `<subject>` shall `<behavior>`.

Brackets denote optional clauses.

| Keyword | Purpose | Maps to GWT |
| ------- | ------- | ----------- |
| `Where` | Static precondition—configuration, feature flags, environment | Given (setup) |
| `While` | Stateful precondition—a condition that must hold during execution | Given (state) |
| `When` | Trigger—the event that initiates behavior | When |
| `shall` | Required behavior—what the subject must do | Then |

EARS uses "the system shall..." because it targeted system-level requirements. GEARS replaces this with `<subject>`—any noun: system, component, service, agent, function, artifact. This enables specifications at all levels of decomposition.

### Comparison with EARS

EARS defines five patterns based on which keywords appear:

| Pattern | EARS Syntax |
| ------- | ----------- |
| Ubiquitous | The `<system>` shall `<response>` |
| State-driven | While `<precondition>`, the `<system>` shall `<response>` |
| Event-driven | When `<trigger>`, the `<system>` shall `<response>` |
| Optional feature | Where `<feature>`, the `<system>` shall `<response>` |
| Unwanted behavior | If `<trigger>`, then the `<system>` shall `<response>` |

GEARS collapses these into one unified pattern, where the distinctions emerge from which optional clauses are present. This abstraction reduces cognitive burden and token cost for LLMs.

The "unwanted behavior" case deserves attention. EARS uses `If...then` to provide a visual signal that this is an edge case. GEARS drops this distinction. Structurally, error handling is just another trigger-response pair. The "unwantedness" lives in the semantics, not the syntax. This simplification reduces cognitive overhead and makes pattern-matching easier for AI.

EARS uses `where` for optional features and `while` for states. GEARS preserves both keywords but clarifies their semantics:

- **where** = static precondition (configuration, deployment environment, feature flag)
- **while** = stateful precondition (runtime condition that may change)

Example of the distinction:

```text
Where the deployment is production, when a request fails, the service shall retry with exponential backoff.
```

```text
While the circuit breaker is open, when a request arrives, the service shall return a cached response.
```

The first is configuration—it won't change during execution. The second is state—it may transition at any moment.

## Examples of GEARS

- Ubiquitous: The `<subject>` shall `<behavior>`.

  > The mobile phone shall have a mass of less than 150 grams.

- State-Driven: While `<stateful precondition(s)>`, the `<subject>` shall `<behavior>`.

  > While no card is inserted, the ATM shall display "insert card to begin".

- Event-Driven: When `<trigger>`, the `<subject>` shall `<behavior>`.

  > When the user selects mute, the audio controller shall suppress all output.

  > When the cache exceeds 80% capacity, the eviction policy shall remove the least recently used entries until capacity falls below 60%.

- Optional Feature: Where `<static precondition(s)>`, the `<subject>` shall `<behavior>`.

  > Where sunroof is installed, the vehicle shall include a sunroof control on the driver door.

- Complex (State + Event)

  > Where the user has granted file system access, when the user requests code generation, the coding agent shall write output to the specified directory.

- Error Handling

  > When an invalid credit card number is entered, the payment form shall display "please re-enter credit card details".

- Test Cases

  > Given the user is authenticated
  >   And the session is active
  > When the user requests their profile
  > Then the API returns the user's profile data

  Translated to GEARS:

  > Where the user is authenticated, while the session is active, when the user requests their profile, the API shall return the user's profile data.

## Tooling

To let LLM understand GEARS and use it for specs, simply put the following short text in your prompt or CLAUDE.md or AGENTS.md files.

```markdown
Each spec shall use the [GEARS](https://sublang.xyz/ref/gears-ai-ready-spec-syntax) pattern:

[Where `<static precondition(s)>`] [While `<stateful precondition(s)>`] [When `<trigger>`] The `<subject>` shall `<behavior>`.

| Clause | Purpose | Example |
| ------ | ------- | ------- |
| Where | Static preconditions (features, config) | Where debug mode is enabled |
| While | Stateful preconditions (runtime state) | While the connection is active |
| When | Trigger event (at most one) | When the user clicks submit |
| shall | Required behavior | The form shall validate inputs |

Note: Clause keywords and punctuation follow natural language conventions.

Test specs shall use the same pattern, mapping Given-When-Then:

| GWT | Clause |
| --- | ------ |
| Given | Where + While |
| When | When |
| Then | shall |
```

To apply GEARS to your project, we've created a tool to help you get started.

```sh
npm install -g @sublang-xyz/iteron
iteron init
```

Running the above, you will get a `specs` folder for scaffolding:

```sh
specs/
├── decisions/    # Decision Records (DRs)
├── iterations/   # Iteration Records (IRs)
├── user/         # User-facing specs
├── dev/          # Development specs
└── test/         # Verification specs
```

Spec files can be grouped into a directory hierarchy. Record files do not strictly follow GEARS.

⭐ If you find this tool useful, welcome to star <https://github.com/sublang-xyz/IterOn>.

## Summary

GEARS extends EARS with four adaptations:

1. **Generalized subject**: Replace "the system" with any noun—system, component, agent, artifact.

2. **Unified pattern**: One syntax covers all cases. No separate patterns for features, states, events, or errors.

3. **Clarified preconditions**: `where` for static configuration, `while` for dynamic state.

4. **Test-case equivalence**: The syntax maps directly to Given-When-Then, eliminating the need for separate specification and testing languages.

The result is a specification syntax optimized for AI-powered development: **consistent enough** for LLMs to parse reliably, **expressive enough** for humans to write naturally, and **unified enough** that specs and tests are one.

## References

Mavin, A. (2009). Easy Approach to Requirements Syntax (EARS). <https://alistairmavin.com/ears>

> AI Usage Statement: Claude Opus 4.5 and GPT-5.2 for polishing the language of the human-written full draft.
