/**
 * JSON-LD validity check for the built site.
 *
 * Every <script type="application/ld+json"> block in _site must parse as
 * JSON, or search engines silently drop the structured data for that
 * page. The blocks are rendered by Liquid in _includes/json-ld.html, so
 * a stray control character (e.g. the trailing newline of a folded
 * `description: >` frontmatter value) or an HTML-escaped value where a
 * JSON-escaped one was needed breaks the page without any build error.
 *
 * Each block must also be a JSON object that declares @context and
 * @type, which is the minimum for a consumer to recognise it as
 * schema.org data at all.
 *
 * Run with: bun run check:jsonld (requires a Jekyll build in _site). An
 * optional positional argument overrides the site directory.
 */
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

const problems: string[] = [];
let blockCount = 0;
let pageCount = 0;

function checkFile(path: string): void {
  const html = readFileSync(path, 'utf8');
  const blocks = [
    ...html.matchAll(/<script\b[^>]*\btype\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script\b[^>]*>/gi),
  ];
  if (blocks.length === 0) {
    return;
  }
  pageCount++;
  for (const [index, match] of blocks.entries()) {
    blockCount++;
    const label = `${path} (block ${index + 1})`;
    let data: unknown;
    try {
      data = JSON.parse(match[1]);
    } catch (error) {
      problems.push(`${label}: ${(error as Error).message}`);
      continue;
    }
    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      problems.push(`${label}: top-level value is not a JSON object`);
      continue;
    }
    const record = data as Record<string, unknown>;
    if (record['@context'] !== 'https://schema.org') {
      problems.push(`${label}: @context is ${JSON.stringify(record['@context'])}, expected "https://schema.org"`);
    }
    if (typeof record['@type'] !== 'string' || record['@type'] === '') {
      problems.push(`${label}: missing @type`);
    }
  }
}

function walk(dir: string): void {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      walk(path);
    } else if (path.endsWith('.html')) {
      checkFile(path);
    }
  }
}

const siteDir = process.argv.slice(2).find((a) => !a.startsWith('-')) ?? '_site';
try {
  statSync(siteDir);
} catch {
  console.error(`JSON-LD check: ${siteDir} not found; run a Jekyll build first.`);
  process.exit(1);
}

walk(siteDir);

if (blockCount === 0) {
  console.error(`JSON-LD check FAILED: no ld+json blocks found under ${siteDir}.`);
  process.exit(1);
}

if (problems.length > 0) {
  console.error(`JSON-LD check FAILED — ${problems.length} problem(s):`);
  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }
  process.exit(1);
}

console.log(`JSON-LD check passed: ${blockCount} blocks across ${pageCount} pages parse and declare @context/@type.`);
