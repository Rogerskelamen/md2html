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

import { headingReg, ulistReg, quoteReg } from "./regexp";
import { HeadingLevel, MDBlock, MultiLinesBlock } from "./type";

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
  let lastMultiLinesBlock: MultiLinesBlock | null = null;
  const mdBlocks: MDBlock[] = [];

  const flush = () => {
    if (lastMultiLinesBlock) {
      mdBlocks.push(lastMultiLinesBlock);
      lastMultiLinesBlock = null;
    }
  }

  for (const line of lines) {
    // Empty line
    if (!line.trim()) {
      flush();
      continue;
    }

    // Headings
    const headingM = line.match(headingReg);
    if (headingM) {
      flush();
      mdBlocks.push({
        type: 'heading',
        level: headingM[1].length as HeadingLevel,
        content: headingM[2].trim()
      });
      continue;
    }

    // Quote
    const quoteM = line.match(quoteReg);
    if (quoteM) {
      /* Last line is quote as well */
      if (lastMultiLinesBlock?.type === 'quote') {
        lastMultiLinesBlock.content += ' ' + quoteM[1].trim();
      } else {
        flush();
        lastMultiLinesBlock = {
          type: 'quote',
          content: quoteM[1].trim()
        };
      }
      continue;
    }

    // Unordered List
    const ulistM = line.match(ulistReg);
    if (ulistM) {
    }

    // Fall back to plain text
    if (
      lastMultiLinesBlock &&
      ['text', 'quote'].includes(lastMultiLinesBlock.type)
    ) {
      lastMultiLinesBlock.content += ' ' + line.trim();
    } else {
      flush();
      lastMultiLinesBlock = {
        type: 'text',
        content: line.trim()
      };
    }
  }

  // Avoid the last block is omitted
  flush();
  return mdBlocks;
}

/* traverse markdown content blocks and wrap text with tags at proper positions. */
function handleTags(mdBlocks: MDBlock[]): string {
  let result = '';

  for (const block of mdBlocks) {
    const type = block.type;
    const content = signToTag(block);

    switch (type) {
      case "text":
        result += `<p>${content}</p>` +
                  '\n';
        break;
      case "heading":
        result += `<h${block.level}>${content}</h${block.level}>` +
                  '\n';
        break;
      case "quote":
        result += `<blockquote>${content}</blockquote>` +
                  '\n';
        break;
      case 'list':
      case "code":
    }
  }

  return result;
}

function signToTag(block: MDBlock): string {
  return block.content;
}
