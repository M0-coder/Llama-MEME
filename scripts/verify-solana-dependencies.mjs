import { readFile } from 'node:fs/promises';

const pkg = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8'),
);

const expected = new Map([
  ['@solana/kit', '7.0.0'],
  ['@solana-program/token', '0.15.0'],
  ['typescript', '7.0.2'],
]);

for (const [name, version] of expected) {
  const actual = pkg.dependencies?.[name] ?? pkg.devDependencies?.[name];
  if (actual !== version) {
    throw new Error(`${name} must be pinned exactly to ${version}; found ${String(actual)}`);
  }
  if (/^[~^*><=]/.test(actual)) {
    throw new Error(`${name} must not use a semver range`);
  }
}

console.log('Solana dependency contract: PASS');
