/**
 * CSP contract check for the built site.
 *
 * The production Content-Security-Policy lives in a Cloudflare Response
 * Header Transform Rule and allowlists each inline script by SHA-256
 * hash. This script recomputes the hashes from _site and fails when
 * they no longer match EXPECTED_INLINE_SCRIPT_HASHES below — meaning an
 * inline script changed (or a redirect page was added/removed) and the
 * Cloudflare header must be updated in lockstep or the script will be
 * blocked in browsers.
 *
 * On failure it prints the full regenerated header value to paste into
 * Cloudflare, plus the new hash list to commit here.
 *
 * Run with: bun run check:csp (requires a fresh production build in
 * _site). Use --print-header to emit the current header value. An
 * optional positional argument overrides the site directory.
 */
import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';

// Every unique inline <script> in the built site, keyed by a stable
// description. Update alongside the Cloudflare header when this check
// fails.
const EXPECTED_INLINE_SCRIPT_HASHES: Record<string, string> = {
  'fouc-guard (head, all pages)': '/H8ZKl6EqH6ND3G7aGmjT+Tz6dwTWJbj+jXbtM4D6XA=',
  'ga-gtag-init (head, all pages)': '258gBGXr39LVyWGw0o4lt8SOA1A07vBxmlPRK0UdbpE=',
  'nav-popover-sync (header, all pages)': 'G7qgzmYP4EmlTUpdE8PA294Ex1tiQnJExDOgZPiIOOs=',
  'theme-toggle (footer, all pages)': 'MIUXgPQnkZOCtETwIKMag4I1HOfyCe1D/TBORJwSwPM=',
  'redirect: a-no-nonense-guide (jekyll-redirect-from)': 'O8T+GZiQ5kt6KkDsgq0TGQnWoiHcqtUsLLWvIkrKHlk=',
  'redirect: real-vendor-lockin (jekyll-redirect-from)': 'aDG+EgGo7SHyRzC9UiIrUleqbmIRGseKgUJ/BYUFunU=',
};

function buildHeaderValue(hashes: string[]): string {
  const scriptHashes = hashes.map((h) => `'sha256-${h}'`).join(' ');
  return [
    "default-src 'self'",
    `script-src https://*.googletagmanager.com ${scriptHashes}`,
    "style-src 'self'",
    "img-src 'self' https://*.google-analytics.com https://*.googletagmanager.com https://www.google.com",
    "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
  ].join('; ');
}

function collectInlineScriptHashes(dir: string, found: Map<string, string>): void {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      collectInlineScriptHashes(path, found);
      continue;
    }
    if (!path.endsWith('.html')) {
      continue;
    }
    const html = readFileSync(path, 'utf8');
    // Closing tag matches the HTML parser's rule: "</script" followed by
    // a word boundary, tolerating whitespace/attributes before ">"
    // (e.g. "</script >"), so hashed content mirrors what browsers execute.
    for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\b[^>]*>/gi)) {
      const attrs = match[1];
      if (/\bsrc\s*=/i.test(attrs) || /application\/ld\+json/i.test(attrs)) {
        continue;
      }
      const hash = createHash('sha256').update(match[2], 'utf8').digest('base64');
      if (!found.has(hash)) {
        found.set(hash, path);
      }
    }
  }
}

const siteDir = process.argv.slice(2).find((a) => !a.startsWith('-')) ?? '_site';
try {
  statSync(siteDir);
} catch {
  console.error(`CSP check: ${siteDir} not found; run a production Jekyll build first.`);
  process.exit(1);
}

const found = new Map<string, string>();
collectInlineScriptHashes(siteDir, found);

const expected = new Set(Object.values(EXPECTED_INLINE_SCRIPT_HASHES));
const actual = new Set(found.keys());

if (process.argv.includes('--print-header')) {
  console.log(buildHeaderValue([...actual].sort()));
  process.exit(0);
}

const missing = [...expected].filter((h) => !actual.has(h));
const unexpected = [...actual].filter((h) => !expected.has(h));

if (missing.length === 0 && unexpected.length === 0) {
  console.log(`CSP hash check passed: ${actual.size} inline scripts match the committed manifest.`);
  process.exit(0);
}

console.error('CSP hash check FAILED — inline scripts changed.');
for (const h of missing) {
  console.error(`  - expected but not found: sha256-${h}`);
}
for (const h of unexpected) {
  console.error(`  - new/changed script: sha256-${h} (first seen in ${found.get(h)})`);
}
console.error('\nTo fix:');
console.error('  1. Update EXPECTED_INLINE_SCRIPT_HASHES in scripts/check-csp.ts');
console.error('  2. Update the Content-Security-Policy header in the Cloudflare');
console.error('     "security response headers" Transform Rule to:\n');
console.error(buildHeaderValue([...actual].sort()));
process.exit(1);
