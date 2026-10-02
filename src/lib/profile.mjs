import { z } from 'astro/zod';
import data from '../data/profile.json' with { type: 'json' };

// src/data/profile.json drives the home, projects, about and contact pages and the
// LinkedIn export. It is validated here, so a typo fails the build instead of the page.

const ym = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'expected "YYYY-MM"');
const url = z.union([z.url(), z.literal('')]);

const Job = z.object({
  title: z.string(),
  company: z.string(),
  url: url.default(''),
  start: ym,
  end: z.union([ym, z.literal('')]).default(''), // '' = present
  summary: z.string(),
  highlights: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
});

const Project = z.object({
  name: z.string(),
  year: z.string(),
  featured: z.boolean().default(false),
  url: url.default(''),
  repo: url.default(''),
  summary: z.string(),
  stack: z.array(z.string()).default([]),
});

export const ProfileSchema = z.object({
  name: z.string(),
  headline: z.string(),
  email: z.email(),
  site: z.url(),
  intro: z.string(),
  about: z.array(z.string()),
  links: z.array(z.object({ label: z.string(), url: z.url() })),
  contact: z.object({ formEndpoint: url.default(''), availability: z.string() }),
  experience: z.array(Job),
  education: z.array(z.object({ school: z.string(), degree: z.string(), year: z.string() })),
  projects: z.array(Project),
  skills: z.array(z.object({ group: z.string(), items: z.array(z.string()) })),
});

/** @typedef {z.infer<typeof ProfileSchema>} Profile */
/** @typedef {z.infer<typeof Job>} Job */
/** @typedef {z.infer<typeof Project>} Project */

/** Current roles first, then most recently ended, then most recently started. */
const byRecency = (a, b) =>
  (a.end === '') !== (b.end === '') ? (a.end === '' ? -1 : 1)
    : b.end.localeCompare(a.end) || b.start.localeCompare(a.start);

/** Replaces `{years}` in text with years since the first job, so the copy never goes stale. */
function fillYears(profile) {
  const first = profile.experience.map((j) => j.start).sort()[0];
  const years = String(new Date().getFullYear() - Number(first.slice(0, 4)));
  const fill = (s) => s.replaceAll('{years}', years);
  return { ...profile, intro: fill(profile.intro), about: profile.about.map(fill) };
}

/** @type {Profile | undefined} */
let cached;

/** The whole profile, validated once per process. @returns {Promise<Profile>} */
export async function getProfile() {
  if (!cached) {
    const result = ProfileSchema.safeParse(data);
    if (!result.success) {
      throw new Error(`Invalid src/data/profile.json:\n${z.prettifyError(result.error)}`);
    }
    const profile = fillYears(result.data);
    cached = { ...profile, experience: [...profile.experience].sort(byRecency) };
  }
  return cached;
}
