import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const basePath = '/project-krita/';
const failures = [];

const expected = [
  'index.html',
  '404.html',
  'vision/index.html',
  'architecture/index.html',
  'data-lifecycle/index.html',
  'ontology/index.html',
  'intelligence/index.html',
  'security/index.html',
  'product-preview/index.html',
  'developers/index.html',
  'roadmap/index.html',
  'products/pulse/index.html',
  'products/ledger/index.html',
  ...Array.from({ length: 12 }, (_, index) => `diagrams/${String(index + 1).padStart(2, '0')}.png`)
];

for (const target of expected) {
  if (!existsSync(join(dist, target))) failures.push(`Missing expected build output: ${target}`);
}

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory)) {
    const full = join(directory, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function resolveBuiltTarget(url) {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean) return null;

  if (clean.startsWith('/project-krita') && !clean.startsWith(basePath)) {
    return { malformed: true, clean };
  }

  if (!clean.startsWith(basePath)) return null;

  const relativeUrl = decodeURIComponent(clean.slice(basePath.length));
  if (!relativeUrl) return { path: join(dist, 'index.html') };

  const normalizedRelative = normalize(relativeUrl).replace(/^([.][.][/\\])+/, '');
  const extension = extname(normalizedRelative);

  if (normalizedRelative.endsWith('/')) {
    return { path: join(dist, normalizedRelative, 'index.html') };
  }

  if (extension) return { path: join(dist, normalizedRelative) };
  return { path: join(dist, normalizedRelative, 'index.html') };
}

if (existsSync(dist)) {
  const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));
  const attributePattern = /\b(?:href|src)=["']([^"']+)["']/g;

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    let match;
    while ((match = attributePattern.exec(html))) {
      const url = match[1];
      if (
        url.startsWith('#') ||
        url.startsWith('http://') ||
        url.startsWith('https://') ||
        url.startsWith('mailto:') ||
        url.startsWith('tel:') ||
        url.startsWith('data:') ||
        url.startsWith('javascript:')
      ) continue;

      const resolved = resolveBuiltTarget(url);
      if (!resolved) continue;

      if (resolved.malformed) {
        failures.push(`${relative(dist, file)} contains malformed project URL: ${resolved.clean}`);
      } else if (!existsSync(resolved.path)) {
        failures.push(`${relative(dist, file)} references missing target: ${url}`);
      }
    }
  }
}

if (failures.length) {
  console.error('\nProject Krita site verification failed:\n');
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error('');
  process.exit(1);
}

console.log(`Project Krita site verification passed (${expected.length} required outputs + internal link checks).`);
