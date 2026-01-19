---
# SPDX-License-Identifier: CC-BY-SA-4.0
# SPDX-FileCopyrightText: 2026 SubLang International <https://github.com/sublang-xyz>
title: 'GEARS: the AI-Ready Spec Syntax'
description: 'An introduction to GEARS, the specification syntax designed for AI-assisted development'
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

- There are constantly misunderstandings among humans and LLMs.
- There are always devisions of work in software.

## Why Use GEARS

AI needs consistency. LLMs perform better with predictable structure. A specification format acts as a protocol between human intent and AI execution. Without it, misunderstandings easily propagate across iterations and create volatility and risk.

Humans need it too. The bottleneck in AI coding is rarely the LLM’s capability—it's our ability to express what we want. A constrained syntax leads to clarity. You cannot write a free-form prose; the structure helps us get precision.

AI reduces the “best practice tax”. GEARS is intentionally lightweight and intuitive, without the need for heavy tooling or training. Formal specifications, comprehensive test cases, traceable requirements—all valuable, all expensive. But when AI drafts and humans review, the economics change.

Test cases should use the same language. The original EARS was designed for requirements; testing frameworks use BDD-style Given-When-Then. Maintaining two mental models creates burden for LLMs. GEARS unifies both, expressed in the same syntax.

## GEARS Syntax
