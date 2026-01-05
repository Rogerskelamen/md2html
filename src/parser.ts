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

import { headingReg, ulistReg, quoteReg, olistReg } from "./regexp";
import { HeadingLevel, MDBlock, MultiLinesBlock, OListDelimiter, UListSign } from "./type";

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
      if (lastMultiLinesBlock?.type === 'ulist' && lastMultiLinesBlock.sign === ulistM[1]) {
        lastMultiLinesBlock.items.push(ulistM[2].trim());
      } else {
        flush();
        lastMultiLinesBlock = {
          type: 'ulist',
          sign: ulistM[1] as UListSign,
          items: [ulistM[2].trim()]
        }
      }
      continue;
    }

    // Ordered List
    const olistM = line.match(olistReg);
    if (olistM) {
      if (lastMultiLinesBlock?.type === 'olist' && lastMultiLinesBlock.delimiter === olistM[1]) {
        lastMultiLinesBlock.items.push(olistM[2].trim());
      } else {
        flush();
        lastMultiLinesBlock = {
          type: 'olist',
          delimiter: olistM[1] as OListDelimiter,
          items: [olistM[2].trim()]
        }
      }
      continue;
    }

    // Fall back to plain text
    if (
      lastMultiLinesBlock &&
      ['text', 'quote', 'ulist', 'olist'].includes(lastMultiLinesBlock.type)
    ) {
      if (lastMultiLinesBlock.type === 'ulist' || lastMultiLinesBlock.type === 'olist') {
        lastMultiLinesBlock.items[lastMultiLinesBlock.items.length-1] += ' ' + line.trim();
      } else {
        lastMultiLinesBlock.content += ' ' + line.trim();
      }
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

    switch (type) {
      case "text":
        result += `<p>${signToTag(block.content)}</p>\n`;
        break;
      case "heading":
        result += `<h${block.level}>${signToTag(block.content)}</h${block.level}>\n`;
        break;
      case "quote":
        result += `<blockquote>${signToTag(block.content)}</blockquote>\n`;
        break;
      case 'ulist':
        result += '<ul>\n' +
          block.items
            .map(item => `  <li>${signToTag(item)}<li>`)
            .join('\n') +
          '\n</ul>\n';
        break;
      case 'olist':
        result += '<ol>\n' +
          block.items
            .map(item => `  <li>${signToTag(item)}<li>`)
            .join('\n') +
          '\n</ol>\n';
        break;
      case "code":
    }
  }

  return result;
}

function signToTag(content: string): string {
  return content;
}
