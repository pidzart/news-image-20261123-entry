// news-image-20261123 entry (Node 22, standard library only): its image is the
// entry.png beside this file — a generative newspaper editorial poster summing
// up Monday 23 November 2026 world news — and the program copies it to
// /output/entry.png.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
if (!existsSync(source)) {
  throw new Error('entry.png is missing beside main.ts: the entry image must ship in the repository root');
}
const destination = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
copyFileSync(source, destination);
const sourceBytes = statSync(source).size;
const deliveredBytes = statSync(destination).size;
if (deliveredBytes !== sourceBytes) {
  throw new Error(`copy verification failed: source is ${sourceBytes} bytes but delivered file is ${deliveredBytes} bytes`);
}
console.log(`delivered entry.png (${deliveredBytes} bytes) -> ${destination}`);
