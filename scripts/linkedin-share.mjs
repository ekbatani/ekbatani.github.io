#!/usr/bin/env node
// Shares new blog posts to your LinkedIn feed through LinkedIn's official Posts API.
//
// A post is shared once when its front matter has `linkedin: true` and `draft: false`.
// Shared posts are recorded in linkedin/shared.json so they are never posted twice.
//
// Environment:
//   LINKEDIN_ACCESS_TOKEN  OAuth token with the w_member_social scope (see README).
//                          Without it the script only prints what it would share.
//   LINKEDIN_PERSON_URN    Optional, e.g. urn:li:person:AbC123. Looked up from the
//                          token (needs the openid + profile scopes) when not set.
//   LINKEDIN_VERSION       Optional API version (YYYYMM). Defaults to last month.
//   SITE_URL               Optional, defaults to the `site` in astro.config.mjs.

import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { load as parseYaml } from 'js-yaml';

const root = new URL('../', import.meta.url);
const blogDir = new URL('src/content/blog/', root);
const sharedFile = new URL('linkedin/shared.json', root);

const token = process.env.LINKEDIN_ACCESS_TOKEN;
const siteUrl = (process.env.SITE_URL || (await readFile(new URL('astro.config.mjs', root), 'utf8')).match(/site:\s*'([^']+)'/)?.[1] || '').replace(/\/$/, '');
const apiVersion = process.env.LINKEDIN_VERSION || (() => {
  const d = new Date();
  d.setUTCDate(1);
  d.setUTCMonth(d.getUTCMonth() - 1);
  return `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
})();

// Parsed as real YAML, like Astro does, so comments, quotes and CRLF line endings
// mean the same thing here as on the site.
function frontMatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return (m && parseYaml(m[1])) || {};
}

// LinkedIn's "little text format" treats these characters as markup.
const escapeCommentary = (s) => s.replace(/[\\|{}@\[\]()<>#*_~]/g, (c) => `\\${c}`);

const shared = existsSync(sharedFile) ? JSON.parse(await readFile(sharedFile, 'utf8')) : {};
const files = (await readdir(blogDir)).filter((f) => f.endsWith('.md'));
const pending = [];
for (const f of files) {
  const data = frontMatter(await readFile(new URL(f, blogDir), 'utf8'));
  const slug = f.replace(/\.md$/, '');
  if (data.linkedin === true && data.draft !== true && !shared[slug]) pending.push({ slug, ...data });
}

if (!pending.length) {
  console.log('No new posts to share on LinkedIn.');
  process.exit(0);
}

if (!token) {
  console.log('LINKEDIN_ACCESS_TOKEN is not set — dry run. Would share:');
  for (const p of pending) console.log(`  • ${p.title} → ${siteUrl}/blog/${p.slug}/`);
  process.exit(0);
}

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
  'LinkedIn-Version': apiVersion,
  'X-Restli-Protocol-Version': '2.0.0',
};

let author = process.env.LINKEDIN_PERSON_URN;
if (!author) {
  const res = await fetch('https://api.linkedin.com/v2/userinfo', { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    console.error(`Could not look up your LinkedIn member id (${res.status}). Set LINKEDIN_PERSON_URN or add the openid + profile scopes.`);
    process.exit(1);
  }
  author = `urn:li:person:${(await res.json()).sub}`;
}

let failures = 0;
for (const p of pending) {
  const url = `${siteUrl}/blog/${p.slug}/`;
  const body = {
    author,
    commentary: escapeCommentary(`New post: ${p.title}\n\n${p.description}`),
    visibility: 'PUBLIC',
    distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
    content: { article: { source: url, title: p.title, description: p.description } },
    lifecycleState: 'PUBLISHED',
    isReshareDisabledByAuthor: false,
  };
  const res = await fetch('https://api.linkedin.com/rest/posts', { method: 'POST', headers, body: JSON.stringify(body) });
  if (res.status === 201) {
    shared[p.slug] = { sharedAt: new Date().toISOString(), post: res.headers.get('x-restli-id') };
    console.log(`Shared: ${p.title}`);
  } else {
    failures++;
    console.error(`Failed to share "${p.title}" (${res.status}): ${await res.text()}`);
  }
}

await mkdir(new URL('linkedin/', root), { recursive: true });
await writeFile(sharedFile, JSON.stringify(shared, null, 2) + '\n');
process.exit(failures ? 1 : 0);
