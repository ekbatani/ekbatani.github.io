---
title: Will web pages be deprecated and replaced by APIs and MCP services that talk to our agents directly?
description: Agents are a new kind of client, and they don't need our pages. But pages aren't going away. They're becoming one interface among several.
date: 2026-10-07
tags: [ai, agents, mcp, architecture]
draft: true
linkedin: false
---

A year ago I opened web pages to get things done. Today I increasingly ask an agent, and it opens nothing. It calls a tool, reads a result, and gives me an answer. That raises an obvious question for anyone who builds for the web: if the reader is a machine, why keep building pages?

My short answer: **web pages won't be deprecated, but they will stop being the only front door.** Here is how I think about it.

## What is actually changing

For thirty years the web had one assumption baked in: the consumer of a page is a human with a browser. HTML, CSS, layout, cookie banners, and "sign up for our newsletter" modals all serve that assumption.

An agent doesn't need any of it. When it wants a flight price, an order status, or the latest version of a library, it needs *structured data* and a *well-described action*. Scraping a page designed for human eyes and then guessing which button matters is a lossy, fragile way to get there. It works today because it's all we had.

APIs were always the right answer for machine-to-machine work. What's new is **MCP** (Model Context Protocol) and similar conventions: a standard way for a service to say "here are the tools I offer, here is what each one does, here are the inputs." An agent can discover those at runtime instead of someone hand-writing an integration. That removes the part of the API world that was always expensive: the glue code.

## Why pages survive

I don't buy the "everything becomes an API" story, for a few reasons.

- **Humans still want to look.** Choosing a hotel, reading an essay, comparing two products: these are experiences, not queries. The page *is* the product, and design carries meaning an agent summary strips out.
- **Trust needs a surface.** When an agent books something or moves money, people want to see and confirm it somewhere. The confirmation screen isn't going away. It might just be rendered inside the agent instead of in a browser tab.
- **The business model is attention.** Much of the web is funded by people looking at pages. If agents read the content and the human never visits, publishers lose the thing that pays for the content. This is an economic problem rather than a technical one, and it's unsolved.
- **Discovery.** MCP tells an agent how to use a service it already knows about. It doesn't tell the agent that the service exists. Search, links, and brands do that, and today they mostly live on web pages.

## What I think happens instead

A layered web, where one product exposes several interfaces over the same core:

1. **The human layer.** Pages and apps, for the moments where experience matters.
2. **The agent layer.** APIs and MCP servers with clear descriptions, tight permissions, and predictable errors.
3. **The readable layer.** Clean semantic HTML, structured data, and plain-text summaries (something like `llms.txt`), so an agent that does have to read a page can do it well.

The mistake would be to treat these as separate products. They should share one domain model and one source of truth. If the page and the tool disagree about what an order is, you've built two systems to maintain.

## What this means if you build things

I run into this directly, building [Inkest](https://inkest.natrademind.com/). It's a notes workspace meant for people, and I also want my own agents to read, search, and write to it. Exposing it as tools made that possible without a bespoke integration for each agent. The design lessons were the practical kind:

- **Describe tools like documentation for a new colleague.** The tool description is the interface. Vague descriptions produce wrong calls.
- **Make actions narrow and safe.** "Create task" is better than "run any query." Agents make mistakes, so limit what a mistake can cost.
- **Keep humans in the loop for anything irreversible.** Reads are cheap. Writes, payments, and deletions deserve a confirmation step.
- **Authenticate agents as agents.** Scoped tokens, audit logs, rate limits. An agent is not a person clicking around.

## My bet

In five years most of my *routine* interactions with software, such as checking, filing, and scheduling, will go through an agent talking to an API. Most of my *meaningful* interactions, such as reading, choosing, and creating, will still happen on a screen designed for me.

So the web isn't being replaced. It's becoming one client among many, and the services that thrive will be the ones that serve humans and agents equally well from the same core. If you're building something today, the cheapest preparation is boring: have a clean API, describe it well, and keep your pages readable.
