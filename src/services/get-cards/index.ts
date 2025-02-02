import type { dynamicIconImports } from 'lucide-react/dynamic';
import { createHash } from 'node:crypto';

type Hashes = [hashA: string, hashB: string];

type Card = {
  name: keyof typeof dynamicIconImports;
  hashes: Hashes;
};

const iconNames: (keyof typeof dynamicIconImports)[] = [
  'cat',
  'paw-print',
  'dog',
  'bone',
  'bird',
  'squirrel',
];

const calculateHashes = (name: string): Hashes => {
  const hashA = createHash('sha256').update(`${name}-a`).digest('base64');
  const hashB = createHash('sha256').update(`${name}-b`).digest('base64');

  return [hashA, hashB];
};

export const icons: Card[] = iconNames.map((name) => ({
  name,
  hashes: calculateHashes(name),
}));
