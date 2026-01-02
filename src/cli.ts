import { program } from 'commander';
import * as fs from 'fs';
import { parse } from './index';

// Import these from package.json in the future
const name = 'md2html';
const version = '0.1.2';
const description = 'A simple tool to convert markdown content to html';

/* Command-line tool logic */
function command(): void {
  /* Set basic info */
  program
    .name(name)
    .version(version)
    .description(description);

  /* Config arguments info */
  program
    .option('-f, --file <path>', 'source file path')
    .argument('[input]', 'input content')

  /* Parse the cli options */
  program.parse(process.argv);

  /* Validation check */
  const options = program.opts<{ file?: string }>();
  const input = program.args[0] as string | undefined;

  const hasFile = typeof options.file === 'string';
  const hasInput = typeof input === 'string';

  // XOR validation
  if (hasFile === hasInput) {
    console.error(
      'error: exactly one content source must be provided (either <input> or -f, --file).'
    );
    process.exit(1);
  }

  /* Define one-source content */
  const content = hasFile
     ? (() => {
        try {
          return fs.readFileSync(options.file!, 'utf-8');
        } catch {
          console.error(`error: failed to read file "${options.file}"`);
          process.exit(1);
        }
      })()
    : input!;

  console.log(parse(content));
}

command();

