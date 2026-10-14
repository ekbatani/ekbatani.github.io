---
title: One agent per product, one approval gate - how I run a product fleet alone
description: Running several products as a solo founder works when each one gets its own agent and every risky step goes through a single approval gate.
date: 2026-10-14
tags: [ai, agents, solo-founder, engineering]
draft: true
linkedin: false
---

I run six products by myself. That sounds like a recipe for dropped balls, and for a while it was. What changed things was not working harder or finding a better to-do app. It was a structure: one agent per product, and one approval gate that every risky change has to pass.

This is how it works, and where it still hurts.

## The problem with one assistant for everything

My first attempt was a single general assistant that knew about all my projects. It was convenient for about two weeks. Then it started mixing things up. Context from one product leaked into another, conventions got blended, and I could never be sure which codebase a suggestion was meant for.

The fix was the same one I'd give a team: separate responsibilities. Each product now has its own agent profile with its own memory, its own skills, and its own Telegram bot. When I message the bot for a product, I'm talking to something that only knows that product. It can't wander into another one's repo, because it doesn't know that repo exists.

This gives me a few things I didn't expect to care about:

- **Small context, better answers.** An agent that only knows one product doesn't need to be told which one I mean.
- **Contained mistakes.** If a profile goes wrong, the damage stays inside one product.
- **Different rules per product.** One of my products runs in an air-gapped environment, so its agent gets stricter rules than the rest. I always give an explicit go-ahead before it touches anything.

## Telegram as the control surface

I don't want a dashboard per product. I already live in a chat app, so that is where the agents report and where I answer. A message arrives, I read it on my phone, and I reply with a decision. Most of my "management" work is now short replies: approve, change this, skip it.

The point is that the agents come to me, in one place, when they need something. I don't go hunting through six admin panels to find out what's waiting.

## The gate

Every code change follows the same sequence:

1. The agent writes a short design brief: what it will change and why.
2. I approve it on Telegram, or I send corrections.
3. Only then does the implementation start.
4. Tests must pass.
5. The result goes up as a branch and a **draft** pull request.

The agent never merges and never pushes to a default branch on its own. Merging, deploying, and deleting are mine.

The brief step is the one that earns its keep. Reading ten lines of intent takes me thirty seconds. Reading a finished diff that went in the wrong direction takes an hour, and it's more annoying to throw away. Catching a misunderstanding before any code exists is the cheapest review I do.

This blog works the same way. A cron job drafts a post on Wednesday morning, sends it to me on Telegram, and does nothing else until I reply. If I stay silent, nothing gets published. Silence is never consent.

## What I don't automate

It's tempting to remove myself from every step. I've decided not to, for a few things:

- **Merges and deploys.** These are the moments where a wrong call costs real users something.
- **Anything destructive.** Deleting data, dropping tables, removing resources.
- **Secrets.** They never go into git, logs, or chat. The agents read them from the environment and that's all.
- **Persian copy for my users.** Several of my products serve Persian-speaking users, and wording that is technically correct but unnatural reads as cheap. I read those strings myself.

Everything else, such as scaffolding, tests, summaries, first drafts, and routine checks, I'm happy to hand over.

## Where it still hurts

I don't want to oversell this.

- **Approval fatigue is real.** If I get ten requests in a row, I start approving by reflex, which defeats the purpose. I'm still tuning what deserves a gate and what can just be reported afterwards.
- **Six profiles means six things to maintain.** Skills and memory drift apart. A fix that works in one profile has to be carried to the others by hand.
- **The agents are only as good as their written context.** When a product's conventions live in my head and not in a document, the agent guesses. Writing things down has become a real part of the job.

## My bet

I think the useful unit of AI work for a small team isn't a smarter model. It's a well-scoped agent with clear boundaries and a human decision point at the right place. Capability will keep improving anyway. What stays scarce is knowing which decisions to keep.

If you're a solo founder juggling more than one thing, start small. Give one product its own agent, put one approval step in front of anything irreversible, and see how it feels after a month. You can add the rest later.
