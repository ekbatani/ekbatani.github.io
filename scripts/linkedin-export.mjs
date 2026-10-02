#!/usr/bin/env node
// Generates LinkedIn-ready profile text from the site data (src/data/profile.json) and reports
// what changed since the last time you updated LinkedIn.
//
//   npm run linkedin           -> writes linkedin/profile.md, prints a change summary
//   npm run linkedin:synced    -> same, then records this version as "synced"
//
// LinkedIn does not allow third-party apps to edit profile sections, so the last
// step is copy-paste: open linkedin/profile.md and paste only the CHANGED fields.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { getProfile } from '../src/lib/profile.mjs';

const root = new URL('../', import.meta.url);
const outDir = new URL('linkedin/', root);
const snapshotFile = new URL('last-sync.json', outDir);
const markSynced = process.argv.includes('--mark-synced');

// LinkedIn's field limits (characters).
const LIMITS = { headline: 220, about: 2600, title: 100, company: 100, description: 2000, project: 2000 };

const profile = await getProfile();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const ym = (s) => (s ? `${months[Number(s.slice(5, 7)) - 1]} ${s.slice(0, 4)}` : 'Present (tick "I am currently working in this role")');

// ---- Build the LinkedIn fields -------------------------------------------------
const fields = {};
fields['Headline'] = profile.headline;
fields['About'] = profile.about.join('\n\n');
fields['Skills (top)'] = profile.skills.flatMap((s) => s.items).join(', ');

for (const job of profile.experience) {
  const key = `Experience: ${job.title} @ ${job.company} (${job.start})`;
  const description = [job.summary, ...job.highlights.map((h) => `• ${h}`)].filter(Boolean).join('\n');
  fields[key] = [
    `Title: ${job.title}`,
    `Company: ${job.company}`,
    `Start: ${ym(job.start)}`,
    `End: ${ym(job.end)}`,
    `Description:\n${description}`,
    job.skills.length ? `Skills: ${job.skills.join(', ')}` : '',
  ].filter(Boolean).join('\n');
}

for (const p of profile.projects.filter((p) => p.featured)) {
  const link = p.url || p.repo;
  fields[`Project: ${p.name}`] = [`Name: ${p.name}`, `Description:\n${p.summary}\n\nStack: ${p.stack.join(', ')}`, link ? `URL: ${link}` : '']
    .filter(Boolean).join('\n');
}

for (const e of profile.education) {
  fields[`Education: ${e.school}`] = `School: ${e.school}\nDegree: ${e.degree}\nEnd year: ${e.year}`;
}

// ---- Validate against LinkedIn limits ------------------------------------------
const warnings = [];
const check = (label, text, limit) => {
  if (text.length > limit) warnings.push(`${label}: ${text.length}/${limit} characters — shorten it`);
};
check('Headline', profile.headline, LIMITS.headline);
check('About', fields['About'], LIMITS.about);
for (const job of profile.experience) {
  check(`${job.company} title`, job.title, LIMITS.title);
  const desc = [job.summary, ...job.highlights.map((h) => `• ${h}`)].join('\n');
  check(`${job.company} description`, desc, LIMITS.description);
}

// ---- Diff against the last synced version --------------------------------------
const previous = existsSync(snapshotFile) ? JSON.parse(await readFile(snapshotFile, 'utf8')) : null;
const changes = { added: [], changed: [], removed: [] };
if (previous) {
  for (const [k, v] of Object.entries(fields)) {
    if (!(k in previous.fields)) changes.added.push(k);
    else if (previous.fields[k] !== v) changes.changed.push(k);
  }
  for (const k of Object.keys(previous.fields)) if (!(k in fields)) changes.removed.push(k);
}
const status = (k) =>
  !previous ? '' : changes.added.includes(k) ? ' — NEW' : changes.changed.includes(k) ? ' — CHANGED' : ' — unchanged';

// ---- Write linkedin/profile.md -------------------------------------------------
const lines = [
  '# LinkedIn profile export',
  '',
  `Generated ${new Date().toISOString().slice(0, 10)} from src/data/profile.json.`,
  previous ? `Compared with the version synced on ${previous.syncedAt}.` : 'No previous sync recorded — treat every field as new.',
  '',
  'Update LinkedIn at https://www.linkedin.com/in/me/ (pencil icons on each section).',
  'Paste only the fields marked NEW or CHANGED, then run `npm run linkedin:synced`.',
  '',
];
if (warnings.length) lines.push('## ⚠ Over LinkedIn limits', '', ...warnings.map((w) => `- ${w}`), '');
if (changes.removed.length) {
  lines.push('## Remove from LinkedIn', '', ...changes.removed.map((k) => `- ${k}`), '');
}
for (const [k, v] of Object.entries(fields)) {
  lines.push(`## ${k}${status(k)}`, '', '```text', v, '```', '');
}

await mkdir(outDir, { recursive: true });
await writeFile(new URL('profile.md', outDir), lines.join('\n'));

// ---- Console summary -----------------------------------------------------------
console.log('Wrote linkedin/profile.md');
if (warnings.length) console.log(`\n⚠ ${warnings.length} field(s) over LinkedIn limits:\n  ${warnings.join('\n  ')}`);
if (!previous) {
  console.log(`\nNo previous sync recorded: all ${Object.keys(fields).length} fields need to go to LinkedIn.`);
} else if (!changes.added.length && !changes.changed.length && !changes.removed.length) {
  console.log('\nLinkedIn is up to date — nothing changed since the last sync.');
} else {
  const show = (label, list) => list.length && console.log(`\n${label}:\n  ${list.join('\n  ')}`);
  show('New', changes.added);
  show('Changed', changes.changed);
  show('Remove from LinkedIn', changes.removed);
}

if (markSynced) {
  await writeFile(snapshotFile, JSON.stringify({ syncedAt: new Date().toISOString().slice(0, 10), fields }, null, 2) + '\n');
  console.log('\nRecorded this version as synced to LinkedIn.');
} else if (!previous || changes.added.length || changes.changed.length || changes.removed.length) {
  console.log('\nAfter updating LinkedIn, run: npm run linkedin:synced');
}
