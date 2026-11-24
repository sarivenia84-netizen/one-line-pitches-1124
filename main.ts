import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const SENTENCE =
  "Type your app idea the way you'd say it to a friend, and an AI agent on make.fun builds it into something you can open and use, line by line, without you writing a single line of code.";

const PRIMARY_PATH = "/output/entry.txt";
const FALLBACK_PATH = "out/entry.txt";

if (SENTENCE.length < 1 || SENTENCE.length > 240) {
  throw new Error(`Sentence length ${SENTENCE.length} out of range 1-240`);
}

try {
  mkdirSync(dirname(PRIMARY_PATH), { recursive: true });
  writeFileSync(PRIMARY_PATH, SENTENCE + "\n", "utf8");
  console.log(`Wrote ${SENTENCE.length} chars to ${PRIMARY_PATH}`);
} catch (err) {
  console.error(
    `Could not write ${PRIMARY_PATH} (${(err as Error).message}); falling back to ${FALLBACK_PATH}`,
  );
  mkdirSync(dirname(FALLBACK_PATH), { recursive: true });
  writeFileSync(FALLBACK_PATH, SENTENCE + "\n", "utf8");
  console.log(`Wrote ${SENTENCE.length} chars to ${FALLBACK_PATH}`);
}
