#!/usr/bin/env node

import { Command } from 'commander';

// Import these from package.json in the future
const name = 'md2html';
const version = '0.1.0';

function main(): void {
  const program = new Command();
  program.name(name);
  program.version(version);

  program.option('-n, --name <string>', 'your name', 'world');

  program.parse(process.argv);

  const { name: username } = program.opts();
  console.log(`hello, ${username}`);
}

main();
