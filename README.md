# ekbatani.github.io

Personal website of Amir Ekbatani: home, projects, blog, about and contact. Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Everyday tasks

| I want to… | Do this |
| --- | --- |
| Run the site locally | `npm install`, then `npm run dev` → http://localhost:4321 |
| Change my experience, projects, skills or bio | Edit `src/data/profile.json` (see [Profile data](#profile-data)) |
| Write a blog post | Add `src/content/blog/my-post.md` (copy the front matter of an existing post) |
| Check for mistakes | `npm run check` (types and profile data; CI runs it too) |
| Publish | Commit and push to `main`; GitHub Actions checks, builds and deploys |
| Update LinkedIn | `npm run linkedin`, paste what changed, then `npm run linkedin:synced` |

## Profile data

`src/data/profile.json` holds everything except blog posts: bio, links, experience, education, projects and skills. It drives the home, projects, about and contact pages **and** the LinkedIn export, so the site and LinkedIn text stay in step. `src/lib/profile.mjs` validates it against a schema, so a typo (a bad date, a broken URL, a missing field) fails `npm run check` and the build with a clear message.

- `featured: true` on a project shows it on the home page and in the LinkedIn export.
- Dates are `"YYYY-MM"`. Leave `end` as `""` for a current job ("Present"). Jobs are listed newest first automatically; their order in the file doesn't matter.
- `{years}` in `intro` or `about` becomes the number of years since your first job.
- `contact.formEndpoint`: paste a [Formspree](https://formspree.io) (or compatible) form URL to turn on the contact form. Empty = email only.

## Blog posts

```markdown
---
title: My post
description: One sentence for the list and link previews.
date: 2026-10-02
tags: [architecture]
draft: false     # true = only visible in `npm run dev`
linkedin: true   # share on LinkedIn once it's published
---

Your Markdown here.
```

## Keeping LinkedIn up to date

LinkedIn's API does not let personal apps edit profile sections (headline, About, positions), and automating the website breaks its terms. So the workflow has two parts.

### 1. Profile: generated text plus a change list

```bash
npm run linkedin
```

This writes `linkedin/profile.md` with every LinkedIn field (headline, About, each position, featured projects, education), checks LinkedIn's character limits, and marks each field **NEW**, **CHANGED** or unchanged since your last sync. Paste only the changed fields at https://www.linkedin.com/in/me/, then record the sync:

```bash
npm run linkedin:synced
```

Commit `linkedin/last-sync.json` so the next comparison starts from here.

### 2. Blog posts: shared automatically

After each deploy, the `share-on-linkedin` job posts any newly published post with `linkedin: true` to your feed, using LinkedIn's official Posts API. It records shared posts in `linkedin/shared.json` so nothing is posted twice. Without a token it's a dry run.

One-time setup:

1. Create an app at https://www.linkedin.com/developers/apps (it must be linked to a LinkedIn Page; a personal placeholder Page is fine).
2. Under **Products**, add **Share on LinkedIn** and **Sign In with LinkedIn using OpenID Connect**.
3. Under **Auth → OAuth 2.0 tools**, generate a token with the scopes `openid profile w_member_social`.
4. In this GitHub repo, go to **Settings → Secrets and variables → Actions** and add the secret `LINKEDIN_ACCESS_TOKEN`.

LinkedIn tokens expire after 60 days. When sharing starts failing, generate a new token and replace the secret.

To share from your machine instead: `LINKEDIN_ACCESS_TOKEN=… npm run linkedin:share`.

## Link previews

Every page shares `public/og.png` (1200×630) as its preview image on LinkedIn, X and chat apps. If your headline changes, replace that file with a new image the same size.

## Deploying

The site is built for `https://ekbatani.github.io` (set in `astro.config.mjs`). In the `ekbatani.github.io` repo, set **Settings → Pages → Source** to **GitHub Actions**. Every push to `main` deploys.
