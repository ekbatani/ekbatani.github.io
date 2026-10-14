---
title: "One agent per product, one approval gate: how I run six products alone"
description: Running several products as a solo founder works when each one gets its own scoped agent and every risky step passes through a single human approval gate.
date: 2026-10-14
tags: [ai, agents, solo-founder, engineering]
draft: true
linkedin: false
---

I run six products on my own. For a while that meant something was always on fire, and it was usually the thing I'd forgotten about. What fixed it wasn't longer hours or another to-do app. It was structure: one agent per product, and one approval gate that every risky change has to pass through.

Here's how it works, and where it still hurts.

## One assistant for everything didn't last

My first attempt was a single assistant that knew about all my projects. It was great for about two weeks. Then the context started bleeding. I'd ask about a migration and get an answer shaped for a different product's schema. Conventions from one codebase showed up in another. I stopped trusting that a suggestion was meant for the repo I actually had open.

So I did what I'd do with a team and split the responsibilities. Each product now has its own agent profile, with its own memory, its own skills, and its own Telegram bot. When I message a product's bot, I'm talking to something that only knows that product.

Not knowing about the other repos isn't the real boundary, though. An agent that was never told about a repo can still wander into it if it holds the credentials. The real boundary is access: each agent gets a token scoped to its own repository and nothing else, so if it tries to touch another product, the request simply fails. Prompts tell an agent what it should do. Permissions decide what it can do.

That split gave me a few things I didn't expect to care about:

- **Smaller context, better answers.** I never have to explain which product I mean.
- **Contained mistakes.** When a profile goes wrong, the damage stays inside one product.
- **Rules per product.** One of my products runs in an air-gapped environment, so its agent never touches that network at all. It works against a mirror of the code, its output is a patch I review and carry in myself, and it waits for an explicit go-ahead before every step.

## Telegram as the control surface

I didn't want six dashboards. I already live in a chat app, so that's where the agents report and where I answer. A message comes in, I read it on my phone, I reply with a decision. Most of my "management" is now one-line replies: approve, change this, skip it.

The agents come to me, in one place, when they need something. I don't go digging through six admin panels to find out what's waiting.

Two details matter more than they look. Each bot only accepts messages from my own Telegram account, so finding the bot isn't enough to approve anything. And every request carries an ID, so my "approve" is tied to one specific brief. If the agent revises the brief after I've answered, it has to ask again. An approval for version one is not an approval for version two.

## The gate

Every code change goes through the same steps:

1. The agent writes a short design brief: what it will change and why.
2. I approve it on Telegram, or send corrections.
3. Only then does implementation start.
4. Tests run in CI, not just on the agent's word.
5. The result lands as a branch and a **draft** pull request.

The agent never merges and never pushes to a default branch. That's enforced by branch protection and by what its token is allowed to do, not by asking it nicely. Merging, deploying, and deleting are mine.

The brief is the step that pays for itself. Ten lines of intent take me thirty seconds to read. A finished diff that went the wrong way takes an hour, and throwing it away hurts more. Catching a misunderstanding before any code exists is the cheapest review I do.

I also watch step 4 closely. An agent that's told to make the tests pass can do it by changing the tests. So any diff that edits or deletes a test gets called out in the PR description, and I read those parts first.

This blog runs through the same gate. A scheduled job drafts a post on Wednesday morning, sends it to me on Telegram, and does nothing else until I reply. If I don't answer, nothing gets published. Silence is never consent.

## What I don't automate

It's tempting to take myself out of every step. For a few things, I've decided not to:

- **Merges and deploys.** That's where a wrong call costs real users something.
- **Anything destructive.** Deleting data, dropping tables, tearing down infrastructure.
- **Secrets.** They never go into git, logs, or chat. Agents read them from the environment at runtime, and logs are scrubbed before they leave the machine.
- **Persian copy for my users.** Several of my products serve Persian speakers, and text that's technically correct but unnatural reads as cheap. I read those strings myself.

Everything else, like scaffolding, tests, summaries, first drafts, and routine checks, I'm glad to hand over.

## Where it still hurts

I don't want to oversell this.

**Approval fatigue is real.** Ten requests in a row and I start approving on reflex, which defeats the point. What helps is tiering: reversible, low-risk work gets reported after the fact, and only irreversible or user-facing changes wait for me. I'm still moving that line around.

**Six profiles means six things to maintain.** Skills and memory drift apart, and a fix that works in one profile has to be carried to the others by hand. The obvious answer is a shared base layer in one repo with a thin overlay per product, and that's next on my list.

**The agents are only as good as their written context.** When a product's conventions live in my head instead of a document, the agent guesses, and it guesses confidently. Writing things down has quietly become a real part of the job.

## My bet

I don't think the useful unit of AI work for a small team is a smarter model. It's a well-scoped agent with hard boundaries and a human decision point in the right place. The models will keep getting better on their own. What stays scarce is knowing which decisions to keep.

If you're a solo founder juggling more than one thing, start small. Give one product its own agent, put one approval step in front of anything irreversible, and live with it for a month. Add the rest later.
