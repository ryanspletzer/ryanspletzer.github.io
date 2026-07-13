/**
 * Frontmatter contract check for posts and drafts.
 *
 * Posts (_posts/*.md) must have:
 * - a YYYY-MM-DD-lowercase-kebab-slug.md filename
 * - parseable YAML frontmatter with layout, title, date, description, tags
 * - a frontmatter date whose day matches the filename date
 * - lowercase kebab-case tags (dots, +, # allowed for names like c# or .net)
 * - a header image path that exists on disk, when header is set
 *
 * Drafts (_drafts/*.md) are checked leniently: empty files are skipped and
 * only fields that are present (tags, header) are validated.
 *
 * Run with: bun run check:frontmatter
 */
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

const POST_FILENAME = /^\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.md$/;
const TAG_PATTERN = /^[a-z0-9][a-z0-9+#.-]*$/;
const REQUIRED_FIELDS = ['layout', 'title', 'date', 'description', 'tags'];

const problems: string[] = [];

function extractFrontmatter(source: string): string | null {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : null;
}

function checkTags(file: string, tags: unknown): void {
  if (!Array.isArray(tags) || tags.length === 0) {
    problems.push(`${file}: tags must be a non-empty list`);
    return;
  }
  for (const tag of tags) {
    if (typeof tag !== 'string' || !TAG_PATTERN.test(tag)) {
      problems.push(`${file}: tag "${tag}" is not lowercase kebab-case`);
    }
  }
}

function checkHeader(file: string, header: unknown): void {
  if (header === undefined) {
    return;
  }
  if (typeof header !== 'string' || !existsSync(header.replace(/^\//, ''))) {
    problems.push(`${file}: header image "${header}" does not exist`);
  }
}

function checkPost(file: string): void {
  if (!POST_FILENAME.test(file)) {
    problems.push(`${file}: filename is not YYYY-MM-DD-lowercase-kebab-slug.md`);
    return;
  }
  const source = readFileSync(join('_posts', file), 'utf8');
  const raw = extractFrontmatter(source);
  if (raw === null) {
    problems.push(`${file}: missing frontmatter block`);
    return;
  }
  let frontmatter: Record<string, unknown>;
  try {
    frontmatter = parse(raw);
  } catch (error) {
    problems.push(`${file}: frontmatter is not valid YAML (${error})`);
    return;
  }
  for (const field of REQUIRED_FIELDS) {
    if (frontmatter[field] === undefined || frontmatter[field] === null) {
      problems.push(`${file}: missing required field "${field}"`);
    }
  }
  if (frontmatter.layout !== undefined && frontmatter.layout !== 'post') {
    problems.push(`${file}: layout is "${frontmatter.layout}", expected "post"`);
  }
  // Read the date from the raw text: the yaml package may parse timestamps
  // into Date objects whose timezone handling would shift the day.
  const dateMatch = raw.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m);
  const filenameDate = file.slice(0, 10);
  if (dateMatch && dateMatch[1] !== filenameDate) {
    problems.push(`${file}: frontmatter date ${dateMatch[1]} does not match filename date ${filenameDate}`);
  }
  if (frontmatter.tags !== undefined && frontmatter.tags !== null) {
    checkTags(file, frontmatter.tags);
  }
  checkHeader(file, frontmatter.header);
}

function checkDraft(file: string): void {
  const source = readFileSync(join('_drafts', file), 'utf8');
  if (source.trim() === '') {
    return;
  }
  const raw = extractFrontmatter(source);
  if (raw === null) {
    problems.push(`_drafts/${file}: missing frontmatter block`);
    return;
  }
  let frontmatter: Record<string, unknown>;
  try {
    frontmatter = parse(raw);
  } catch (error) {
    problems.push(`_drafts/${file}: frontmatter is not valid YAML (${error})`);
    return;
  }
  if (frontmatter.tags !== undefined && frontmatter.tags !== null) {
    checkTags(`_drafts/${file}`, frontmatter.tags);
  }
  checkHeader(`_drafts/${file}`, frontmatter.header);
}

const posts = readdirSync('_posts').filter((f) => f.endsWith('.md'));
const drafts = existsSync('_drafts') ? readdirSync('_drafts').filter((f) => f.endsWith('.md')) : [];

posts.forEach(checkPost);
drafts.forEach(checkDraft);

if (problems.length > 0) {
  console.error(`Frontmatter check failed with ${problems.length} problem(s):`);
  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }
  process.exit(1);
}

console.log(`Frontmatter check passed: ${posts.length} posts, ${drafts.length} drafts.`);
