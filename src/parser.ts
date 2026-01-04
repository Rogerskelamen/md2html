/**
 * Since AST-based parsing is too complex and not
 * suitable for a personal typescript learning project,
 * So I just let my markdown rendering engine to
 * receive a line and analysis which type it is,
 * and then output the corresponding format(with tags).
 * That means it's just a simple line-by-line parsing.
 *
 * Some special scenes still need to be handled carefully:
 * plain text -> <p>plain text</p>
 * need to consider whether there is a following empty line.
 * Cause
 * ```
 * plain text 1
 * plain text 2
 * ```
 * is one paragraph NOT two.
 * The same happens with quote text:
 * ```
 * > quote text
 * plain text
 * ```
 * is one paragraph as well.
 */

import { headerReg } from "./regexp";
import { HeaderLevel, MDBlock, TextQuoteBlock } from "./type";

/* The main parse logic */
export function parse(markdown: string): string {
  /* Split markdown content to many lines */
  const crlfReg = /\r?\n/;
  const lines = markdown.split(crlfReg);
  // console.log(lines);

  const mdBlocks = parseToBlocks(lines);
  // console.log(mdBlocks);
  const html = handleTags(mdBlocks);

  return html;
}

/**
 * Traverse lines to turn to blocks with different types
 */
function parseToBlocks(lines: string[]): MDBlock[] {
  let lastTextQuoteBlock: TextQuoteBlock = { content: '', type: 'text' };
  let pushed: boolean = true;
  const mdBlocks: MDBlock[] = [];

  for (const line of lines) {

    // Empty line
    if (!Boolean(line.trim())) {
      if (!pushed) {
        mdBlocks.push(lastTextQuoteBlock);
        pushed = true;
      }
      continue;
    }

    // Header
    const headerM = line.match(headerReg);
    if (headerM) {
      mdBlocks.push({
        type: 'header',
        level: headerM[1].length as HeaderLevel,
        content: headerM[2].trim()
      });
      continue;
    }

    // Fall back to plain text
    if (!pushed) {
      /* last line is also text */
      lastTextQuoteBlock.content += ' ' + line.trim();
    } else {
      lastTextQuoteBlock = {
        type: 'text',
        content: line.trim()
      };
      pushed = false;
    }
  }

  // Avoid the last block is omitted
  if (!pushed) {
    mdBlocks.push(lastTextQuoteBlock);
    pushed = true;
  }

  return mdBlocks;
}

/* traverse markdown content blocks and wrap text with tags at proper positions. */
function handleTags(mdBlocks: MDBlock[]): string {
  let result = '';

  for (const block of mdBlocks) {
    const type = block.type;
    const content = tagSwtich(block);

    switch (type) {
      case "text":
        result += `<p>${content}</p>` +
                  '\n';
        break;
      case "header":
        result += `<h${block.level}>${content}</h${block.level}>` +
                  '\n';
        break;
      case "quote":
      case "code":
    }
  }

  return result;
}

function tagSwtich(block: MDBlock): string {
  return block.content;
}
